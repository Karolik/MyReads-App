import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
    state = {
        books: [],
        query: ''
      }
    static propTypes = {
    books: PropTypes.array.isRequired,
    //onDeleteBook: PropTypes.func.isRequired
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
          this.setState({ books })
        })
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    /*Search books
    componentDidMount() {
        BooksAPI.search().then((books) => {
            this.setState({ books })
          })
    } */
    
    render() {
        const { books, onDeleteBook } = this.props
        const { query } = this.state

        let showingBooks
        if (query) {
        const match = new RegExp(escapeRegExp(query), 'i')
        showingBooks = books.filter((book) => match.test(book.title, book.authors))
        } else {
        showingBooks = books
        }

        return (
        <div className="search-books">
            <div className="search-books-bar">
            <Link to='/' className="close-search" /*onClick={() => this.setState({ showSearchPage: false })}*/>Close</Link>
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
