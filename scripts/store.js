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
//    console.log(newItem);
    this.bookmarks.push(item.create(newItem));
}

function findAndDelete(id) {
    this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
}

function setError(error) {
    this.error = error;
}

export default {
    bookmarks,
    adding,
    error,
    filter,
    addItem,
    findAndDelete,
    setError
}
