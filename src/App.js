import React, { Component } from 'react';
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
//import Search from './Search'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    read: [],
    currentlyReading: [],
    wantToRead: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  //Fetch the data from the database BooksAPI.js
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  /* Option "None" - Remove a book from the list */
  removeBook = (book) => {
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id)
    }))

  //Update the position of the book in the shelves
  /*updateBook = (book) => {

  }*/
    
    //Don't use the method below - it doesn't exist in the API and is not needed for this project - to be removed after analysing
    //BooksAPI.remove(book)
  }

  render() {
    return (
      <div>
        <ListBooks    
        onDeleteBook={this.removeBook}
        books={this.state.books} />
      </div>
    )
  }
}

export default BooksApp;
