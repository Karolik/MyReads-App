import React, { Component } from 'react';

class Search extends Component {
    //ADDED
    state = {
        query: ''
      }
    //ADDED
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
      }
    
    render() {
        //ADDED
        const { query } = this.state

        //ADDED For search results,search page:
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
            <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
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
                <ol className="books-grid"></ol>
            </div>
        </div>
        )
    }
}

export default Search