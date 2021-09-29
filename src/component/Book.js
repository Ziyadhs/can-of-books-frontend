import React, { Component } from "react";
import BookRender from "./BookRender.js"

class Book extends Component {
    render() {
        return (
            <>
                <BookRender showUpdateBookForm={this.props.showUpdateBookForm} deleteBookFun={this.props.deleteBookFun}
                    key={this.props.index} id={this.props.booksData._id} booksData={this.props.booksData} />
            </>
        )
    }
}
export default Book