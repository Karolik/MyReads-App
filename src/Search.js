import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
    state = {
        books: [],
        query: ''
      }

    //Fetch the data from the database BooksAPI.js
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
          this.setState({ books })
        })
    }

    /** trim() - remove whitespace from both sides of a string */
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }
    
    clearQuery = () => {
        this.setState({ query: '' })
    }
    
    render() {
        const { query } = this.state

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
                    onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                <Bookshelf    
                  onDeleteBook={this.removeBook}
                  books={this.state.books} />
                </ol>
            </div>
        </div>
        )
    }
}

export default Search
