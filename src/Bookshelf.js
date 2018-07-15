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
          //value={this.props.value}
          changeShelf={props.changeShelf}
          onDeleteBook={this.removeBook}
          //books={this.props.books} 
          />
        )}
      </ol>
    </div>
  )
}

export default Bookshelf;
