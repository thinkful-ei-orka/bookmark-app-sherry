'use strict';

import item from './item.js';
// create store 

const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

// expanded: true on bookmarks [] local
// bookmarks.set('expanded', 'false') でいいかな


function addItem(newItem) {
    console.log(newItem);
    console.log(item.create(newItem));
    this.bookmarks.push(item.create(newItem));
//    console.log(array);
/**
 * this.bookmarks.map(() => {
        item.create(array);
        bookmarks.expanded = false;
    })
 */
//    console.log(bookmarks);
}

export default {
    bookmarks,
    adding,
    error,
    filter,
    addItem
}
