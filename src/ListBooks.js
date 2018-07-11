import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
  state = {
    books: [],
    shelf: ['Currently Reading', 'Want To Read', 'Read'],
    read: [],
    currentlyReading: [],
    wantToRead: [],
    query: '',
  }

  /** Fetch the data from the database BooksAPI.js */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  /** Filter books into categories */
  allocateBooks = (book) => {
    this.setState((state) => ({
      read: state.books.filter(() => "read" !== book.shelf),
      wantToRead: state.books.filter((b) => b.shelf !== book.shelf)
    }))
  } 

  render() {

    return (
      <div>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.state.shelf[0]}</h2>
              {//currentlyReadingBooks.map((book) => (
              <Bookshelf    
              onChangeShelf={this.changeShelf}
              onDeleteBook={this.removeBook}
              books={this.state.books} />
              //))
              }
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.state.shelf[1]}</h2>
              <Bookshelf    
              onChangeShelf={this.changeShelf}
              onDeleteBook={this.removeBook}
              books={this.state.books} 
              />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.state.shelf[2]}</h2>
              <Bookshelf  
              onChangeShelf={this.changeShelf}  
              onDeleteBook={this.removeBook}
              books={this.state.books}
              read={this.state.read}
              onRead={(book) => {
                this.addToRead(book)
                //history.push('/')
              }} />
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
            >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
