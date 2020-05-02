'use strict';
//template, render, and event listeners
//all event listeners are on <main>

import api from './api.js';
import store from './store.js';

/**
 * templates for pages
 */

//returns the page of bookmarks
function templateBookmarkPage() {
    console.log('templateBookmarkPage was called');
    //need a forEach on this
    return `<button type="button" class="add-button js-add-button">Add</button>
    <select name="select-rating" class="select-rating js-select-rating">
        <option value="rating-all">See all Bookmarks</option>
        <option value="rating-five">See Rated 5 Bookmarks</option>
        <option value="rating-four">See Rated 4 and above</option>
        <option value="rating-three">See 3 and above</option>
        <option value="rating-two">See 2 and above</option>
        <option value="rating-one">See 1 and above</option>
    </select>     
    <div role="bookmark-list" class="js-bookmark-list">
        <p class="bookmark-title">Title</p>
        <a href="URL" class="bookmark-url hidden">Visit Site</a>
        <p class="bookmark-description hidden">DESC</p>
        <p class="bookmark-rating">RATING</p>
        <button type="button" class="delete-button js-delete-button hidden">Delete</button>
    </div>`
}

//renders the add bookmark page
function templateAddBookmarkPage() {
    console.log('templateAddBookMarkPage was called');
    return `<form class="add-bookmark-form">
        <fieldset class="add-bookmark-fieldset">
            <legend>Add Bookmark</legend>
            <label for="bookmark-title-input">Title</label>
            <input type="text" name="bookmark-title-input" id="bookmark-title-input" placeholder="Title of Page" required/>
            <label for="bookmark-url">Web Address</label>
            <input type="url" name="bookmark-url-input" id="bookmark-url-input" placeholder="Page URL" required/>
            <label for="bookmark-description-input">Description</label>
            <input type="text" name="bookmark-description-input" id="bookmark-description-input" placeholder="Description of site" />
            <label for="bookmark-rating-input">Rating 1 - 5</label>
            <input type="number" name="bookmark-rating-input" id="bookmark-rating-input" placeholder="1 - 5" />
            <button type="submit" class="add-bookmark-submit js-add-button-submit">Add Bookmark</button>
        </fieldset>
    </form>`
}

/**
 * renders pages
 */

//renders main page
function render() {
/**
 *  ERROR RENDER BOYO
 *  let bookmarks = [...store.bookmarks];
 *  if(store.bookmarks.expanded === true) {
 *      $('main').removeClass('hidden');
 * }
*/
    const bookmarkString = templateBookmarkPage();
    $('main').html(bookmarkString);

}

function getItemIdFromElement(item) {
    return $(item)
        .closest('.js-bookmark-list')
        .data('item-id');
}

/**
 * event listeners
 */

//adds bookmark to page
function addBookmark() {
    $('main').on('click', '.js-add-button-submit', event => {
        event.preventDefault();
        console.log('addBookmark worked');
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
    bindEventListeners,
    render
};