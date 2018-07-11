import React, { Component } from 'react';

class Book extends Component {
  render() {
    
    const { book } = this.props

    return(
      <div className="books-grid">
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193,
                  backgroundImage: `url(${book.imageLinks.thumbnail})`
                }}></div>
                <div className="book-shelf-changer">
                  <select onChange={event => this.props.onChangeShelf(this.props.book, event.target.value)} 
                  /*change it onChange={this.handleRead} value={this.state.value}*/ /*onChange={() => ((this.value === "none") ? onDeleteBook(book) : null)}*/>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option className="none" value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors}</div>
            </div>
          </li>
      </div>
    )
  }
}

export default Book;
