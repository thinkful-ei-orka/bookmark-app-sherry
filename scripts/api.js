'use strict';
//api stuff
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Sherry';

//fetch bookmarks
const bookmarkApiFetch = function (...args) {
let error;
console.log(...args);
return fetch(...args)
    .then(res => {
        if(!res.ok) {
            error = {code: res.status};
            if(!res.headers.get('content-type').includes('json')) {
                error.message = res.statusText;
                return Promise.reject(error);
            }
        }
        return res.json();
    })
    .then(data => {
        if(error) {
            error.message = data.message;
            return Promise.reject(error);
        }
        return data;
    });
};


function getBookmarks() {
    return bookmarkApiFetch(`${BASE_URL}/bookmarks`);
}

//create bookmarks
function createBookmark(args) {
    return bookmarkApiFetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: args

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