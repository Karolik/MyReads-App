import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import Search from './Search'
import './App.css'

class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        {//this.state.screen === "list"
        }
        <Route path='/search' render={({ history }) => (
          <div>
            <Search
              //books={this.state.books}
              //textChange={this.handleSearchChange}
              /*
                onCreateContact={(contact) => {
                this.createContact(contact)
                history.push('/')
              }} */
            />
          </div>
        )}/>
        <Route exact path='/' render={() => (
          <div className="list-books">
            <ListBooks    
              //onDeleteBook={this.removeBook}
              //books={this.state.books}
              //read={this.state.read}
              //shelf={this.state.shelf}
              //onUpdate={() => {this.setState({shelf:'read'}) }} 
              />
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp;
