import React, { useState } from 'react'
import axios from 'axios'

function Author(props) {
    const [author, setAuthorData] = useState({})
    const [requested, updaterequested] = useState(false)
    const [loading, updateLoading] = useState(true)
    const { id } = props.match.params
    const token = localStorage.getItem("token")

    console.log("author id: " + id)

    if (!requested) {
        updaterequested(true)
        axios.get(`http://192.168.99.100:3000/api/v1/authors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setAuthorData(response.data)
                updateLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            {(!loading) ? (<p>Author id: {author._id}</p>) : <h1>Author id loading...</h1>}
            {(!loading) ? (<p>Author Name: {author.firstName + " " + author.lastName}</p>) : <h1>Author name loading...</h1>}
        </div>
    )
}

export default Author
