import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import './BestBooks.css';
import axios from 'axios';
import Book from './component/Book.js';
import BookForm from './component/BookForm.js';
import { withAuth0 } from '@auth0/auth0-react';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      booksData: [],
      searchQuery: ''
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

    let createData = await axios.post(`${process.env.REACT_APP_SERVER}/createBook`,bookFormInfo);

    this.setState({
      booksData: createData.data
    })

  }

  // delete book function
  deleteBook = async (bookID) => {

    let email = this.props.auth0.user.email

    let deleteData = await axios.delete(`${process.env.REACT_APP_SERVER}/deleteBook?bookID=${bookID}&email=${email}`)

    console.log(deleteData);
    
    this.setState({
      booksData: deleteData.data
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
                  <Book booksData={element} index={index} deleteBookFun={this.deleteBook} />
                )
              })}
              <br />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
