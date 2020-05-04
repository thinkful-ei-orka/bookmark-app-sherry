'use strict';
//renders base pg at DOM ready,
//then reaches into the store to get bookmark info

import store from './store.js';
import api from './api.js';
import bookmark from './bookmark.js';

function main() {
    /** 
     * function to render page
     * after getting info from api
     */
    api.getBookmarks()
        .then(res => res.json())
        .then((items) => {
//            console.log(items);
            items.forEach((item) => store.addItem(item));
            bookmark.render();
        }).catch(err => console.error(err.message));

//    console.log(store.bookmarks);
    bookmark.bindEventListeners();
    bookmark.render();
}

$(main);