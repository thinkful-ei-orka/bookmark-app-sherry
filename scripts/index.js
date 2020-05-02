'use strict';
//renders base pg at DOM ready,
//then reaches into the store to get bookmark info

//import store from './store.js';
//import api from './api.js';
//import bookmark from './bookmark.js';

function main() {
    /** 
     * function to render page
     * after getting info from api
     */
    bookmark.bindEventListeners();
    bookmark.render();
}

$(main);