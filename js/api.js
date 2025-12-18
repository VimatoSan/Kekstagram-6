import {BASE_URL} from './constants.js';

const Method = {
  GET: 'GET',
  POST: 'POST',
};

function loadPosts() {
  return send('/data', Method.GET);
}

function sendForm(body) {
  return send('', Method.POST, body);
}

function send(route, method, body = null) {
  return fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch((error) => {
      throw Error(error);
    });
}


export {loadPosts, sendForm};
