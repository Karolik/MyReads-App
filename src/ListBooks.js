import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
  state = {
    read: [],
    currentlyReading: [],
    wantToRead: [],
  }

  /** Fetch the data from the database BooksAPI.js and filter the books into 3 categories*/
  getAllBooks(){
    BooksAPI.getAll().then((books) => {
      let currentlyReading = books.filter((book) => (book.shelf === "currentlyReading"));
      let wantToRead = books.filter((book) => (book.shelf === "wantToRead"));
      let read = books.filter((book) => (book.shelf === "read"));
      this.setState({currentlyReading, wantToRead, read});
    })
  }

  componentDidMount() {
    this.getAllBooks()
  }

  /** Change the shelf */
  changeShelf = (book,shelf) =>
    BooksAPI.update(book, shelf).then((books) => {
      this.getAllBooks() 
  })

  render() {
    return (
      <div>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <Bookshelf    
              title = {'Currently Reading'} 
              changeShelf={this.changeShelf}
              books={this.state.currentlyReading}
              />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to read</h2>
              <Bookshelf  
              title = {'Want To Read'} 
              changeShelf={this.changeShelf}
              books={this.state.wantToRead}
              />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <Bookshelf  
              title = {'Read'}
              changeShelf={this.changeShelf}
              books={this.state.read}
              />
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
