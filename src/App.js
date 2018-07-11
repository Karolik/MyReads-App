import React from 'react';
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import Search from './Search'
import './App.css'

function BooksApp(props) {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <div>
            <Search
            />
          </div>
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <ListBooks
              />
          </div>
        )}/>
      </div>
    )
  }

export default BooksApp;
