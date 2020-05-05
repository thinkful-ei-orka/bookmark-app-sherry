'use strict';
//template, render, and event listeners
//all event listeners are on <main>

import api from './api.js';
import store from './store.js';

/**
 * templates for pages
 */

//returns the page of bookmarks
function templateBookmarks(bookmark) {
//    console.log('templateBookmarks was called');
    //need a forEach on this
    let bookmarkForm = `<div role="bookmark-list" class="bookmark-list js-bookmark-list" data-item-id="${bookmark.id}">
            <button type="button" class="bookmark-title js-expand-button">${bookmark.title}</button>
            <p class="bookmark-rating">Rating: ${bookmark.rating}</p>
        </div>`;
//        console.log(bookmarkForm);

    if(bookmark.expanded) {
       bookmarkForm = `<div role="bookmark-list" class="bookmark-list js-bookmark-list" data-item-id="${bookmark.id}">
            <button type="button" class="bookmark-title js-expand-button">${bookmark.title}</button>
            <a href="${bookmark.url}" class="bookmark-url" target="_blank">Visit Site</a>
            <p class="bookmark-description">Description: ${bookmark.desc}</p>
            <p class="bookmark-rating">Rating: ${bookmark.rating}</p>
            <button type="button" class="delete-button js-delete-button">Delete</button>
        </div>`;
     }
     return bookmarkForm
}

function templateBookmarkPage() {
    let addAndFilterButtons = `<button type="button" class="add-button js-add-button">Add</button>
    <select name="select-rating" class="select-rating js-select-rating">
        <option value="">--Minium Rating--</option>
        <option id="rating" value="5">Rated 5 </option>
        <option id="rating" value="4">Rated 4 and above</option>
        <option id="rating" value="3">Rated 3 and above</option>
        <option id="rating" value="2">Rated 2 and above</option>
        <option id="rating" value="1">Rated 1 and above</option>
    </select>`;
    return addAndFilterButtons;
    
}

function bookmarkString(newBookmarks) {
    const bookmarks = newBookmarks.map(item => templateBookmarks(item));
//    console.log(bookmarks);
    return bookmarks.join('');
}

//renders the add bookmark page
function templateAddBookmarkPage() {
    console.log('templateAddBookMarkPage was called');
    return `<form class="add-bookmark-form" name="add-bookmark-form">
        <fieldset class="add-bookmark-fieldset">
            <legend>Add Bookmark</legend>
            <label for="bookmark-title-input">Title</label>
            <input type="text" name="title" id="bookmark-title-input" placeholder="Title of Page" required/>
            <label for="bookmark-url">Web Address</label>
            <input type="url" name="url" id="bookmark-url-input" placeholder="Page URL" required/>
            <label for="bookmark-description-input">Description</label>
            <input type="text" name="desc" id="bookmark-description-input" placeholder="Description of site" required/>
            <label for="bookmark-rating-input">Rating 1 - 5</label>
            <input type="number" min="1" max="5" name="rating" id="bookmark-rating-input" placeholder="1 - 5" required/>
            <button type="button" class="cancel-button js-cancel-button">Cancel</button>
            <button type="submit" class="add-bookmark-submit js-add-button-submit">Add Bookmark</button>
        </fieldset>
    </form>`
}

/**
 * renders pages
 */

//renders main page
function render() {
//   console.log(store.bookmarks);
/**
 *  ERROR RENDER BOYO
 *  let bookmarks = [...store.bookmarks];
 * }
*/

    let bookmarks = [...store.bookmarks];
    if(store.filter > 0) {
        bookmarks = store.bookmarks.filter(item => item.rating >= store.filter);
    }

    const addAndFilter = templateBookmarkPage();
//    console.log(addAndFiler);
    const bookmarkStringified = bookmarkString(bookmarks);
//    console.log(bookmarkString);
    const mainPage = addAndFilter + bookmarkStringified;
    $('main').html(mainPage);

}

function getItemIdFromElement(item) {
//    console.log(item);
    return $(item)
        .closest('.js-bookmark-list')
        .data('item-id');
}


/**
 * event listeners
 */

function serializeJson(form) {
    const formData = new FormData(form);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    o.rating = parseInt(o.rating);
    return JSON.stringify(o);
}

//adds bookmark to page
function addBookmark() {
    $('main').on('submit', '.add-bookmark-form', event => {
        event.preventDefault();
        const newBookmark = serializeJson($('.add-bookmark-form')[0]);
//        console.log(newBookmark);
        api.createBookmark(newBookmark)
        .then(res => res.json())
        .then((items) => {
//            console.log(items);
            store.addItem(items);
            render();
        }).catch(err => console.error(err.message));
//        console.log('createBookmark worked');
        render();
    })

}

//moves to the add page
function toAddPage() {
    $('main').on('click', '.js-add-button', event => {
        event.preventDefault();
        console.log('toAddPg');
        const addBookmarkString = templateAddBookmarkPage();
        $('main').html(addBookmarkString);
    })
}

//deletes a bookmark
function deleteBookmark() {
    $('main').on('click', '.js-delete-button', event => {
        event.preventDefault();
        console.log('deleteBookmark');
        
        const id = getItemIdFromElement(event.currentTarget);
        console.log(id);
        
        api.deleteBookmark(id)
        .then(res => res.json())
        .then((items) => {
        //    console.log(items);
            store.findAndDelete(id);
            render();
        }).catch(err => console.error(err.message));

        render();
    })
}

//filters the bookmarks
function filterBookmarks() {
    $('main').on('change', '.js-select-rating', event => {
        event.preventDefault();
        store.filter = parseInt($(event.currentTarget).children("option:selected").val());

//        console.log(store.filter);
        render();
        
        /**
         * Will need to get a value from the select menu
         * Need to filter the store.bookmarks to show only
         * those rating # and above
         * How can I get the rating out of store.bookmarks
         * and how do I know which was selected from above
         * 
         * const userNum = $(event.currentTarget).find('#number-choice').val();
         * 
         * switch here?
         *  case rating-one {
         *      ratingSelect = 1;    
         *  }
         * 
         * store.bookmarks.filter(item => item.rankig >= ratingSelection)
         */
        //if(store.bookmarks[id].rating === )
        // this should be a number, but check it
        // probably a filter method here on store.bookmarks
    })
}

function cancelButtonClicked() {
    $('main').on('click', '.js-cancel-button', event => {
        event.preventDefault();
        render();
    })
}

//on clicking the title, it expands! or unexpands!
function expandBookmarks() {
    $('main').on('click', '.js-expand-button', event => {
        event.preventDefault();
        const id = getItemIdFromElement(event.currentTarget);
//        console.log(id);
        const index = store.bookmarks.findIndex(item => item.id === id);
//        console.log(store.bookmarks[index]);
        store.bookmarks[index].expanded = !store.bookmarks[index].expanded;
        render();
    })
}

/**
 * gets passed into main to do initial rendering of pg
 */ 

function bindEventListeners() {
    addBookmark();
    toAddPage();
    deleteBookmark();
    filterBookmarks();
    cancelButtonClicked();
    expandBookmarks();
}

export default {
    bindEventListeners,
    render
};