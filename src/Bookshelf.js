import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Bookshelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    //onDeleteBook: PropTypes.func.isRequired
  }

  render() {
    const { books, onDeleteBook } = this.props

    return(
      <div className="bookshelf-books">
        <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193,
                    backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}></div>
                <div className="book-shelf-changer">
                  <select /*change it*/onChange={() => ((this.value="read") ? onDeleteBook(book) : null)}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none" /*onClick={() => onDeleteBook(book)}*/>None</option>
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