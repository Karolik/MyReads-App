import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'
import Bookshelf from './Bookshelf'
import Search from './Search'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onDeleteBook: PropTypes.func.isRequired
  }
  
  state = {
    books: [],
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  // trim() - remove whitespace from both sides of a string
  /*updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }*/
/*
  clearQuery = () => {
    this.setState({ query: '' })
  }*/
  removeBook = (book) => {
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id)
    }))
  }

  render() {
    const { books } = this.props

    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <div>
            <Search
              books={this.state.books}
            />
          </div>
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <Bookshelf    
                  onDeleteBook={this.removeBook}
                  books={this.state.books} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <Bookshelf    
                  onDeleteBook={this.removeBook}
                  books={this.state.books} />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <Bookshelf    
                  onDeleteBook={this.removeBook}
                  books={this.state.books} />
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link
                to='/search'
                >Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default ListBooks
