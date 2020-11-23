import React, { useState } from 'react'
import axios from 'axios'

function Book(props) {
    const [book, setAuthorData] = useState({})
    const [requested, updaterequested] = useState(false)
    const [loading, updateLoading] = useState(true)
    const { id } = props.match.params
    const token = localStorage.getItem("token")

    console.log("BOOK ID: " + id)
    if (!requested) {
        updaterequested(true)
        axios.get(`http://192.168.99.100:3000/api/v1/books/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response.data)
                setAuthorData(response.data)
                updateLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            {(!loading) ? (<p>Book id: {book.id}</p>) : <h1>Book id loading...</h1>}
            {(!loading) ? (<p>Book Name: {book.name}</p>) : <h1>Book name loading...</h1>}
            {(!loading) ? (<p>Book Author: {book.author}</p>) : <h1>Book author loading...</h1>}
            {(!loading) ? (<p>Book Genres: {book.genres[0]}, {book.genres[1]}</p>) : <h1>Book genres loading...</h1>}
        </div>
    )
}

export default Book
