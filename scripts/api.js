'use strict';
//api stuff
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Sherry';

//fetch bookmarks
const bookmarkApiFetch = function (...args) {
let error;
return fetch(...args)
    .then(response => {
        if(!response.ok) {
            error = {code: response.status};
            if(!response.headers.get('content-type').includes('json')) {
                error.message = response.statusText
                return Promise.reject(error);
            }
        }
    })
    .then(data => {
        if(error) {
            error.message = data.message
            return Promise.reject(error);
        }
        return data;
    });
};

function getBookmarks() {
    return bookmarkApiFetch(`${BASE_URL}/bookmarks`);
}

//create bookmarks
function createBookmark(title, url, desc, rating) {
    const newBookmark = JSON.stringify({title, url, desc, rating});
    return bookmarkApiFetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: newBookmark

    });
}


//delete bookmarks
function deleteBookmark(id) {
    return bookmarkApiFetch(BASE_URL + '/bookmarks/' + id, {
        method: 'DELETE'
    });
}



export default {
    getBookmarks,
    createBookmark,
    deleteBookmark
};