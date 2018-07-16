import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
    state = {
        books: [],
        read: [],
        currentlyReading: [],
        wantToRead: [],
        foundBooks: [],
        query: ''
    }
    
    getAllBooks(){
        BooksAPI.getAll().then((books) => {
          let currentlyReading = books.filter((book) => (book.shelf === "currentlyReading"));
          let wantToRead = books.filter((book) => (book.shelf === "wantToRead"));
          let read = books.filter((book) => (book.shelf === "read"));
          this.setState({currentlyReading, wantToRead, read});
        })
      }

    //Fetch the data from the database BooksAPI.js
    componentDidMount() {
        this.getAllBooks()
      }

    /** Change the shelf */
    changeShelf = (book,shelf) =>
        BooksAPI.update(book, shelf).then((books) => {
            this.getAllBooks() 
    })

    /** Search the books  */
    searchBooks = (query) => {
        this.setState({ query: query.trim() })
        BooksAPI.search(query, 20).then(query => {
            this.setState({foundBooks: query}) 
            console.log(query);
        })
    }
    
    /*searchBooks = (query) => {
        BooksAPI.search(query).then(books => {
            this.getAllBooks()
        })
    }*/

    /** trim() - remove whitespace from both sides of a string */
    /*updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }*/
    
    clearQuery = () => {
        this.setState({ query: '' })
    }
    
    render() {
        const { query, foundBooks } = this.state
        const { books } = this.state
        
        let showingBooks
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            showingBooks = foundBooks.map((book) => match.test(book.title, book.authors))
            //showingBooks = getAllBooks((book) => match.test(book.title, book.authors))
        } else {      //Show no books
            showingBooks = books
        }

        return (
        <div className="search-books">
            <div className="search-books-bar">
            <Link to='/' className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                */}
                    <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={query}
                    onChange={(event) => this.searchBooks(event.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                {showingBooks.map((book, index) =>
                    <Book
                    key={index}
                    book={book}
                    value={book.shelf}
                    changeShelf={this.changeShelf}
                    />
                    )}
                </ol>
            </div>
        </div>
        )
    }
}

export default Search
