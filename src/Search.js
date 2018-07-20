import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
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

    clearQuery = () => {
        this.setState({ query: '' })
    }

    /** Search the books  */
    searchBooks = (query) => {
        this.setState({ query: query })

        BooksAPI.search(query).then(foundBooks => {
            if(!foundBooks.error) {
                //For found books that are not on the main page, assign them the shelf "none":
                foundBooks.map((foundBook) => (foundBook.shelf = "none"));
                //For found books that are already on the main page, assign them the same shelf:
                foundBooks.map((foundBook) => 
                (this.state.libraryBooks.filter((libraryBook) => (foundBook.id === libraryBook.id))
                .map(libraryBook => (libraryBook.shelf = foundBook.shelf))));
                this.setState({foundBooks});
                    //if(foundBooks.length === 0){
                    //    this.clearQuery(query);}
            }
            else {
                this.clearQuery(query);
                this.setState({foundBooks: []});
            }
            console.log(query);
            console.log(this.state.foundBooks);
            console.log(this.state.libraryBooks);
        })
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
