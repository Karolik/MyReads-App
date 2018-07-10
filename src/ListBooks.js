import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
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
    shelf: ['read', 'currentlyReading', 'toRead'],
    read: [],
    currentlyReading: [],
    toRead: [],
    query: '',
    //For the select onChange function
    getInitialState: function() {
      return {
          value: 'select'
      }
    },
    change: function(event){
      this.setState({value: event.target.value});
    }
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

  addToRead(book) {
    BooksAPI.update(book).then(book => {
      this.setState(state => ({
        read: state.read.concat([ book])
      }))
    })
  }

  render() {
    const { books } = this.props
    //const { onDeleteBook } = this.props
    const { query } = this.state

    //For search results,search page:
    let showingBooks
    //showingBooks = books
    if (query) {
    const match = new RegExp(escapeRegExp(query), 'i')
     // const match = new RegExp((query), 'i')
      //!! REMOVE It should first show the books - it filters but doesn't show any books before.
    showingBooks = books.filter((book) => match.test(book.title))
    } else {
      showingBooks = books
    }

    //showingBooks.sort(sortBy('name')) 

    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <div>
            <Search
              books={this.state.books}
              /*
                onCreateContact={(contact) => {
                this.createContact(contact)
                history.push('/')
              }}
              */
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
                //onClick={() => this.setState({ showSearchPage: true })}
                >Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default ListBooks
