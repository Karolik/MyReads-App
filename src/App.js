import React, { Component } from 'react';
import ListBooks from './ListBooks'
//import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    shelf: ['read', 'currentlyReading', 'toRead'],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: false
  }

  /* Option "None" - Remove a book from the list */
  removeBook = (book) => {
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id)
    }))

  //Update the position of the book in the shelves
  /*updateBook = (book) => {
  }*/
  }

  render() {
    return (
      <div>
        <ListBooks    
        onDeleteBook={this.removeBook}
        books={this.state.books}
        //shelf={this.state.shelf}
        //onUpdate={() => {this.setState({shelf:'read'}) }} 
        />
      </div>
    )
  }
}

export default BooksApp;
