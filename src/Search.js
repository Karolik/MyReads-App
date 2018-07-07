import React, { Component } from 'react';
import { Link } from 'react-router-dom'
//import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'

class Search extends Component {
    state = {
        query: ''
      }
    static propTypes = {
    books: PropTypes.array.isRequired,
    //onDeleteBook: PropTypes.func.isRequired
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
      }
    
    render() {
        const { books, onDeleteBook } = this.props
        const { query } = this.state

        let showingBooks
        if (query) {
        //const match = new RegExp(escapeRegExp(query), 'i')
        const match = new RegExp((query), 'i')
        showingBooks = books.filter((book) => match.test(book.name))
        } else {
        showingBooks = books
        }

        return (
        <div className="search-books">
            <div className="search-books-bar">
            <Link to='/' className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</Link>
            <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input 
            type="text" 
            placeholder="Search by title or author"
            //ADDED 2 lines:
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
            />

            </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                </ol>
            </div>
        </div>
        )
    }
}

export default Search
