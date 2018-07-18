import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
    state = {
        libraryBooks: [],
        foundBooks: [],
        query: ''
    }
    
    //Fetch the data from the database BooksAPI.js
    getAllBooks(){
        BooksAPI.getAll().then((libraryBooks) => {
          this.setState({libraryBooks});
        })
      }

    componentDidMount() {
        this.getAllBooks()
      }

    /** Change the shelf */
    changeShelf = (book,shelf) =>
        BooksAPI.update(book, shelf).then((libraryBooks) => {
            this.getAllBooks() 
    })

    /** Search books  */
    searchBooks = (query) => {
        this.setState({ query: query.trim() }       /** trim() - remove whitespace from both sides of a string */
        BooksAPI.search(query, 20).then(foundBooks => {
            if(!foundBooks.error) {
            //try{
                const match = new RegExp(escapeRegExp(query), 'i')
                this.state.foundBooks.map ((foundBook) => match.test(foundBook.title, foundBook.authors ))
                //For found books that are already on the main page, assign them the same shelf:
                .map((foundBook) => 
                (this.state.libraryBooks.filter((libraryBook) => (foundBook.id === libraryBook.id))
                .map((libraryBook) => (libraryBook.shelf = foundBook.shelf))));
                this.setState({foundBooks});
                    //if(foundBooks.length === 0){
                    //    this.clearQuery(query);
                    //}
            }
            else {
            //catch(err){
                //console.log(foundBooks.error)
                this.clearQuery(query);
                this.setState({foundBooks: []});
            }
            console.log(query);
            console.log(this.state.foundBooks);
            console.log(this.state.libraryBooks);
        })
    }

    /*updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }*/
    
    clearQuery = () => {
        this.setState({ query: '' })
    }
    
    render() {
        const { query, foundBooks } = this.state

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
                 {(foundBooks.length !== 0) ? (foundBooks.map((book, index) =>
                    <Book
                    key={index}
                    book={book}
                    value={book.shelf}
                    changeShelf={this.changeShelf}
                    title={this.state.foundBooks.title}
                    />
                    ))
                    : null}
                </ol>
            </div>
        </div>
        )
    }
}

export default Search
