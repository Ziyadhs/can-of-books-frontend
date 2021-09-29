import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import './BestBooks.css';
import axios from 'axios';
import Book from './component/Book.js';
import BookForm from './component/BookForm.js';
import UpdateBookForm from './component/UpdateBookForm.js';
import { withAuth0 } from '@auth0/auth0-react';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      booksData: [],
      searchQuery: '',
      showUpdateForm: false,
      bookInfoUpdate: {}
    }
  }

  // get book fuction
  componentDidMount = async () => {

    let email = this.props.auth0.user.email

    let bookUrl = `${process.env.REACT_APP_SERVER}/getBook?email=${email}`;

    let bData = await axios.get(bookUrl);

    this.setState({
      booksData: bData.data
    })
  }

  // create book function
  createBook = async (e) => {
    e.preventDefault()

    let bookFormInfo = {
      title1: e.target.title.value,
      author1: e.target.author.value,
      description1: e.target.description.value,
      status1: e.target.status.value,
      email1: this.props.auth0.user.email
    }

    let createData = await axios.post(`${process.env.REACT_APP_SERVER}/createBook`, bookFormInfo);

    this.setState({
      booksData: createData.data
    })

  }

  // delete book function
  deleteBook = async (bookID) => {

    let email = this.props.auth0.user.email

    let deleteData = await axios.delete(`${process.env.REACT_APP_SERVER}/deleteBook?bookID=${bookID}&email=${email}`)

    this.setState({
      booksData: deleteData.data
    })

  }

  // update book function
  updateBook = async (e) => {
    e.preventDefault();

    let bookFormUpdateInfo = {
      title: e.target.title.value,
      author: e.target.author.value,
      description: e.target.description.value,
      status: e.target.status.value,
      email: this.props.auth0.user.email,
      id: this.state.bookInfoUpdate._id
    }
  
    let updateData = await axios.put(`${process.env.REACT_APP_SERVER}/updateBook`, bookFormUpdateInfo);
    
    this.setState({
      booksData: updateData.data
    })
  }

  showUpdateBookForm = async (bookInfo) => {

    await this.setState({
      showUpdateForm: true,
      bookInfoUpdate: bookInfo
    })

  }

  // render
  render() {
    return (
      <div>
        <Card style={{ width: '30rem' }}>
          <Card.Body>
            <Card.Title>My Fav Books</Card.Title>
            <Card.Text>
              <br />
              {/* add book functions */}
              <BookForm createBookFun={this.createBook} />
              <br />
              {/* get and delete functions */}
              {this.state.booksData.map((element, index) => {
                return (
                  <Book booksData={element}
                    index={index}
                    deleteBookFun={this.deleteBook}
                    showUpdateBookForm={this.showUpdateBookForm} />
                )
              })}
              {this.state.showUpdateForm &&
                <UpdateBookForm
                  bookInfo={this.state.bookInfoUpdate}
                  updateBook={this.updateBook}
                />}
              <br />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
