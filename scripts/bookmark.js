//template, render, and event listeners
//all event listeners are on <main>

import api from './api.js';
import store from './store.js';

/**
 * templates for pages
 */
function renderBookmarkPage() {
    return `<button type="button" class="add-button js-add-button">Add</button>
    <select name="select-rating" class = "select-rating js-select-rating">
        <option value="rating-all">See all Bookmarks</option>
        <option value = "rating-five">See Rated 5 Bookmarks</option>
        <option value = "rating-four">See Rated 4 and above</option>
        <option value = "rating-three">See 3 and above</option>
        <option value = "rating-two">See 2 and above</option>
        <option value = "rating-one">See 1 and above</option>
    </select>
  
    <div role = "bookmark-list js-bookmark-list">
        <p class = "bookmark-title">Title</p>
        <a href="URL" class = "bookmark-url hidden">Visit Site</a>
        <p class = "bookmark-description hidden">DESCRIPTION</p>
        <p class = "bookmark-rating">RATING</p>
        <button type="button" class = "delete-button js-delete-button hidden">Delete</button>
    </div>`
}


/**
 * renders pages
 */


/**
 * event listeners
 */

//adds bookmark to page
function addBookmark() {
    $('.bookmarks-app').on('submit', '.js-add-button-submit', event => {
        event.preventDefault();
        console.log('addBookmark worked');
    })

}

//moves to the add page
function toAddPage() {
    console.log('toAddPage was called');
    $('main').on('click', '.js-add-button', event => {
        event.preventDefault();
        console.log('toAddPg');
    })
}

//deletes a bookmark
function deleteBookmark() {
    $('main').on('submit', '.js-delete-button', event => {
        event.preventDefault();
        console.log('deleteBookmark');
    })
    //js-delete-button hidden
}

//filters the bookmarks
function filterBookmarks() {
    $('main').on('click', '.js-select-rating', event => {
        event.preventDefault();
        console.log('filterBookmarks');
    })
}

//on clicking the title, it expands!
//function expandBookmarks() {
//    $('main').on('click', '.js-bookmark-list', event => {
//        event.preventDefault();
//        if(store.[something]expanded)
//    })
//]}

/**
 * gets passed into main to do initial rendering of pg
 */ 

function bindEventListeners() {
    addBookmark();
    toAddPage();
    deleteBookmark();
    filterBookmarks();
    //expandBookmarks();
}

export default {
    bindEventListeners
};