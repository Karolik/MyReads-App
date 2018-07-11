import React, { Component } from 'react';
import Book from './Book'

class Bookshelf extends Component {
  render() {

    return(
      <div className="bookshelf-books">
        <ol className="books-grid">
        {this.props.books.map((book, index) =>
          <Book  
            key={index}
            book={book}
            onChangeShelf={this.changeShelf}
            onDeleteBook={this.removeBook}
            //books={this.props.books} 
            />
          )}
        </ol>
      </div>
    )
  }
}

export default Bookshelf;
