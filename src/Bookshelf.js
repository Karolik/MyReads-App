import React from 'react';
import Book from './Book'

const Bookshelf = (props) => {
  return(
    <div className="bookshelf-books">
      <ol className="books-grid">
      {props.books.map((book, index) =>
        <Book
          key={index}
          book={book}
          value={book.shelf}
          changeShelf={props.changeShelf}
          //books={this.props.books} 
          />
        )}
      </ol>
    </div>
  )
}

export default Bookshelf;
