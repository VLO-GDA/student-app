import {
  EventEmitter
}
from 'events';
import {
  API_URL
}
from "../consts";

import {
  parseString
}
from "xml2js";

const request = require('superagent');

export const store = new EventEmitter();

store.fetch = function(endpoint) {
  return new Promise((resolve, reject) => {
    request.get(API_URL + endpoint).timeout(3000).end(function(err, res) {
      if (err) {
        reject(err);
        return;
      }
      if (res.status < 400) {
        resolve(res.text);
      } else {
        reject("Status code invalid");
      }
    });
  });
};

store.get = function(endpoint, validate) {
  let previous = JSON.parse(localStorage.getItem(endpoint));
  if (previous && validate(previous)) {
    return {
      valid: true,
      data: previous
    };
  }
  return {
    valid: false,
    data: previous
  };
};

store.getOrFetch = function(endpoint, validate) {
  return new Promise((resolve, reject) => {
    let result = store.get(endpoint, validate);

    if (result.valid) {
      resolve(result);
      return;
    }

    store.fetch(endpoint).then((res) => {
      let updated = JSON.parse(res);
      localStorage.setItem(endpoint, res);
      resolve({
        valid: validate(updated),
        data: updated
      });
    }).catch((e) => {
      result.error = e;
      resolve(result);
    });
  });
};

store.getLuckyNumber = function(forceUpdate = false) {
  return store.getOrFetch("lucky-number", (element) => {
    let flag = forceUpdate ? false : new Date(element.update).toDateString() == new Date().toDateString();
    forceUpdate = false;
    return flag;
  });
};

store.getTimetable = function(group, forceUpdate = false) {
  return store.getOrFetch("timetable/group/" + group, (element) => {
    return forceUpdate ? false : (new Date().getTime() - element.update < 1000 * 60 * 60 * 24);
  });
};

store.getHours = function(forceUpdate = false) {
  return store.getOrFetch("timetable/hours", (element) => {
    return forceUpdate ? false : (new Date().getTime() - element.update < 1000 * 60 * 60 * 24);
  });
};

store.getQuote = function() {
  return store.getOrFetch("quote", (element) => {
    return false;
  });
};

store.getMedia = function(forceUpdate = false) {
  return store.getOrFetch("media", (element) => {
    return forceUpdate ? false : (new Date().getTime() - new Date(element.date).getTime() < 1000 * 60 * 60);
  });
};

store.getNews = function(forceUpdate = false) {
  return new Promise((resolve, reject) => {
    let current = store.get("news", (element) => {
      return forceUpdate ? false : (new Date().getTime() - new Date(element.date).getTime() < 1000 * 60 * 60);
    });
    if (current.valid) {
      resolve(current);
      return;
    }
    request.get(API_URL + "news").timeout(3000).end(function(err, res) {
      if (err || res.status >= 400) {
        resolve(current);
        return;
      }
      res.body = parseString(res.text, function(err, res) {
        if (err) {
          resolve(current);
          return;
        }
        let result = {
          date: new Date().getTime(),
          news: []
        };
        for (let news of res.rss.channel[0].item) {
          let art = {
            title: decodeURI(news.title),
            link: encodeURI(news.link),
            date: decodeURI(news.pubDate),
            author: decodeURI(news["dc:creator"]),
            excerpt: decodeURI(news.description).replace(/(<([^>]+)>)/ig, "").replace(/&nbsp;/g, ' ').replace("czytaj więcej", "")
          };
          result.news.push(art);
        }
        localStorage.setItem("news", JSON.stringify(result));
        resolve({
          valid: true,
          data: result
        });
      });
    });
  });
};

store.getOptions = function() {
  let opts = localStorage.getItem("options");
  return opts ? JSON.parse(opts) : {};
};

store.setOptions = function(options) {
  localStorage.setItem("options", JSON.stringify(options));
  this.emit("options-update", options);
};
