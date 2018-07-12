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

  /** Fetch the data from the database BooksAPI.js and filter the books into 3 categories*/
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      let currentlyReading = books.filter((book) => (book.shelf === "currentlyReading"));
      this.setState({currentlyReading});
      let wantToRead = books.filter((book) => (book.shelf === "wantToRead"));
      this.setState({wantToRead});
      let read = books.filter((book) => (book.shelf === "read"));
      this.setState({read}); 
    })
  }

  render() {
    //const { books } = this.props
    //const { query } = this.state

    /** Filter books into categories */
    //let currentlyReading = books.filter((book) => (book.shelf === "currentlyReading"));

    /*if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      currentlyReadingBooks = books.filter((book) => match.test(book.shelf))
    } else {
      currentlyReadingBooks = books
    } */


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
              onChangeShelf={this.changeShelf}
              onDeleteBook={this.removeBook}
              books={this.state.currentlyReading} />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.state.shelf[1]}</h2>
              <Bookshelf  
              title = {'Want To Read'} 
              onChangeShelf={this.changeShelf}
              onDeleteBook={this.removeBook}
              books={this.state.wantToRead} 
              />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.state.shelf[2]}</h2>
              <Bookshelf  
              onChangeShelf={this.changeShelf}  
              onDeleteBook={this.removeBook}
              books={this.state.read}
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
