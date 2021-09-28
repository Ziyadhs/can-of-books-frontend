import React, { Component } from "react";
import BookRender from "./BookRender.js"

class Book extends Component {
    render() {
        return (
            <>
                <BookRender deleteBookFun={this.props.deleteBookFun} key={this.props.index}
                    title={this.props.booksData.title} author={this.props.booksData.author}
                    description={this.props.booksData.description} status={this.props.booksData.status}
                    email={this.props.booksData.email} id={this.props.booksData._id}/>
            </>
        )
    }
}
export default Book