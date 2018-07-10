import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'

class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    //onDeleteBook: PropTypes.func.isRequired
  }
  state = {
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

  handleRead = (e) => {
    e.preventDefault()
    const values = e.target
    //= serializeForm(e.target, { hash: true })
    if (this.props.onRead)
      this.props.onRead(values)
  }

  render() {
    const { books, onDeleteBook } = this.props
    const { query } = this.state
    let showingBooks
    if (query) {
    const match = new RegExp(escapeRegExp(query), 'i')
    //const match = new RegExp((query), 'i')
    showingBooks = books.filter((book) => match.test(book.title, book.authors))
    } else {
    showingBooks = books
    }

    return(
      <div className="bookshelf-books">
        <ol className="books-grid">
        {showingBooks.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193,
                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}></div>
                <div className="book-shelf-changer">
                  <select /*change it*/ onChange={this.handleRead} value={this.state.value} /*onChange={() => ((this.value === "none") ? onDeleteBook(book) : null)}*/>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option className="none" value="none" /*onClick={() => onDeleteBook(book)}*/>None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
        ))}
        </ol>
      </div>
    )
  }
}

  export default Bookshelf;
