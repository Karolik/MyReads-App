import React, { Component } from 'react';
import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    //onDeleteBook: PropTypes.func.isRequired
  }
  state = {
    books: [],
    getInitialState: function() {
      return {
          value: 'select'
      }
    },
    change: function(event){
      this.setState({value: event.target.value});
    },
    removeBook: (book) => {
      this.setState((state) => ({
        books: state.books.filter((b) => b.id !== book.id)
      }))
    }
  }

  //Fetch the data from the database BooksAPI.js
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  handleRead = (e) => {
    e.preventDefault()
    const values = e.target
    //= serializeForm(e.target, { hash: true })
    if (this.props.onRead)
      this.props.onRead(values)
  }

  render() {
    const { books } = this.props

    return(
      <div className="bookshelf-books">
        <ol className="books-grid">
          <Book  
            onChange={this.changeShelf}
            onDeleteBook={this.removeBook}
            books={this.state.books} />
        </ol>
      </div>
    )
  }
}

  export default Bookshelf;
