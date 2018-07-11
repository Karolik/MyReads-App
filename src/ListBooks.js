import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
  state = {
    books: [],
    shelf: ['Currently Reading', 'Want To Read', 'Read'],
    read: [],
    currentlyReading: [],
    toRead: [],
    query: '',
    //EMO:
    //filteredBooks: filterBook("", 20),
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

  /*static propTypes = {
    books: PropTypes.array.isRequired,
    onDeleteBook: PropTypes.func.isRequired
  }*/

  //Fetch the data from the database BooksAPI.js
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  //Update the shelf and books
  /*componentDidMount() {
    BooksAPI.update(book, shelf).then((books) => {
      this.setState({ books })
      .then((shelf) => {
        this.setState({ shelf})
      }
    )
    })
  }*/

  //EMO:
  /*filterBook(searchText, maxResults) { (book) => {
    this.setState((state) => ({
      books: state.books.filter(book => {
        if (book.title.toLowerCase().includes(searchText.toLowerCase())) {
          return true;
        }
        if (book.keywords.includes(searchText)) {
          return true;
        }
        return false;
      })
      .slice(0, maxResults)
    })
    )
  }
}*/
  //EMO:
  /*handleSearchChange = event => {
    this.setState({
      filteredBook: filterBook(event.target.value, 20)
    });
  };*/

/* Option "None" - Remove a book from the list */
  removeBook = (book) => {
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id)
    }))
  }

  //Change/update book/shelf
  changeShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(book => {
      this.setState(state => ({
        shelf: state.shelf.concat([ book])
      }))
  })
}
    
  /*addToRead(book) {
    BooksAPI.update(book).then(book => {
      this.setState(state => ({
        read: state.read.concat([ book])
      }))
    })
  }*/
  
  //Update the position of the book in the shelves
  /*updateBook = (book) => {
    this.setState((state)) => ({

    })
    componentDidMount(){
    BooksAPI.update(book, shelf).then((book) => {
      shelf: state.shelf.concat([ book ])
    })
    }
  }
  */

  render() {
    //const { books } = this.props
    //const { onDeleteBook } = this.props

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
              onChangeShelf={this.changeShelf}
              onDeleteBook={this.removeBook}
              books={this.state.books} />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.state.shelf[1]}</h2>
              <Bookshelf    
              onChangeShelf={this.changeShelf}
              onDeleteBook={this.removeBook}
              books={this.state.books} />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.state.shelf[2]}</h2>
              <Bookshelf  
              onChangeShelf={this.changeShelf}  
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
    )
  }
}

export default ListBooks
