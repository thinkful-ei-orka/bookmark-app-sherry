'use strict';
// create store 

const bookmarks = [];
let adding = false;
let error = null;
let filter = 0;

// expanded: true on bookmarks [] local
// bookmarks.set('expanded', 'false') でいいかな


export default {
    bookmarks,
    adding,
    error,
    filter
}
