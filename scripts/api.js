'use strict';
//api stuff
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Sherry';

//fetch bookmarks
/**
 * const bookmarkApiFetch = function (...args) {
let error;
return fetch(...args)
    .then(response => {
        if(!response.ok) {
            store.error = {code: response.status};
            if(!response.headers.get('content-type').includes('json')) {
                store.error.message = response.statusText
                return Promise.reject(error);
            }
        }
    })
    .then(data => {
        if(error) {
            store.error.message = data.message
            return Promise.reject(error);
        }
        return data;
    });
};
 */

function getBookmarks() {
    return fetch(`${BASE_URL}/bookmarks`);
}

//create bookmarks
function createBookmark(...args) {
    console.log('createBookmark was called in api.js');
    const newBookmark = JSON.stringify({...args});
    return fetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: newBookmark

    });
}


//delete bookmarks
function deleteBookmark(id) {
    return fetch(BASE_URL + '/bookmarks/' + id, {
        method: 'DELETE'
    });
}



export default {
    getBookmarks,
    createBookmark,
    deleteBookmark
};