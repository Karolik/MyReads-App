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
    value: ''
  }

  /** Fetch the data from the database BooksAPI.js and filter the books into 3 categories*/
  getAllBooks(){
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      let currentlyReading = books.filter((book) => (book.shelf === "currentlyReading"));
      let wantToRead = books.filter((book) => (book.shelf === "wantToRead"));
      let read = books.filter((book) => (book.shelf === "read"));
      this.setState({read});
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

  componentDidUpdate() {
    changeShelf()
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
              <Bookshelf    
              title = {'Currently Reading'} 
              changeShelf={this.changeShelf} 
              onDeleteBook={this.removeBook}
              books={this.state.currentlyReading}
              value={this.state.value} />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.state.shelf[1]}</h2>
              <Bookshelf  
              title = {'Want To Read'} 
              changeShelf={this.changeShelf} 
              onDeleteBook={this.removeBook}
              books={this.state.wantToRead} 
              value={this.state.value}
              />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.state.shelf[2]}</h2>
              <Bookshelf  
              title = {'Read'}
              changeShelf={this.changeShelf}   
              onDeleteBook={this.removeBook}
              books={this.state.read}
              value={this.state.value}
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
