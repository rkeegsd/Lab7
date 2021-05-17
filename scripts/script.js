// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

let settings = document.getElementsByTagName('img')[0];
let journal = document.getElementsByTagName('h1')[0];

// Add listeners
settings.addEventListener('click', () => {
  let state = {
    page: 'settings',
    id: -1
  };
  setState(state, false);
});

journal.addEventListener('click', () => {
  let state = {
    page: 'journal',
    id: -1
  };
  setState(state, false);
});

// Pop state
window.addEventListener('popstate', (event) => {
  setState(event.state, true);
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let i = 1;
      entries.forEach(entry => {
        let state = {
          page: 'entry',
          id: i,
          entry: entry
        };
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        // Add listener for each entry
        newPost.addEventListener('click', () => {
          setState(state, false);
        });
        i++;

        document.querySelector('main').appendChild(newPost);
      });
    });
});

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}