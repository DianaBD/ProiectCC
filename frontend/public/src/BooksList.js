import axios from 'axios'
import faker from 'faker'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'

const _ = require("lodash")

const addressDefinitions = faker.definitions.address
const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  key: addressDefinitions.state_abbr[index],
  text: state,
  value: addressDefinitions.state_abbr[index],
}))

const genresOptions = [
  { key: '1', text: 'horror', value: 'horror' },
  { key: '2', text: 'fiction', value: 'fiction' },
  { key: '3', text: 'romance', value: 'romance' },
  { key: '4', text: 'science-fiction', value: 'science-fiction' },
  { key: '5', text: 'fantasy', value: 'fantasy' },
  { key: '6', text: 'philosophy', value: 'philosophy' },
  { key: '7', text: 'biography', value: 'biography' },
  { key: '8', text: 'wrong-genre-for-error', value: 'wrong-genre-for-error' }
];

function BooksList(props) {
    const [books, setList] = useState([])
    const token = localStorage.getItem("token")
    const [requested, updateRequested] = useState(false)
    const [loading, updateLoading] = useState(true)

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("nimic");
    const [genres, setGenres] = useState([]);

    const [authors, setAuthorsList] = useState([])

    if (!requested) {
        updateRequested(true)
        //get books
        axios.get(`http://192.168.99.100:3000/api/v1/books`, {
            headers: {
                  Authorization: `Bearer ${token}`
            }
        })
            .then(response =>  {
                console.log(response.data)
                setList(response.data)

            })
            .then(updateLoading(false))
            .catch(error => {
                console.log(error)
            })

        //get authors
        axios.get(`http://192.168.99.100:3000/api/v1/authors`, {
            headers: {
                  Authorization: `Bearer ${token}`
            }
        })
        .then(response =>  {
            console.log(response.data)
            setAuthorsList(response.data)
        })
        .catch(error => {
            console.log(error)
        })

    }


    global.config.authorsList = authors.map(x => ({ key: x._id, text: x.firstName + " " + x.lastName, value: x.firstName + " " + x.lastName}));

    function onChangeTitle(e) {
      console.log("onChangeTitle");
        setTitle(e.target.value)
    }

    function onChangeAuthor(e, {value}) {
      console.log("onChangeAuthor");
      setAuthor(value);
    }

    function onChangeGenres(e, {value}){
      console.log("onChangeGenres");
      setGenres(value);
    }

    function handleSuccessfulNewBook(response) {
        console.log(response.status)
        alert('new boook works!')
    }

    function handleError(error){
      console.error(error);
      alert('very bad genre!')
    }

    function handleSubmit(e) {
        console.log("New Book handleSubmit");
        var authorArr = _.filter(global.config.authorsList, x => x.text === author);
        var authorObj = _.first(authorArr);
        var payload = {
          name: title,
          authorId: authorObj.key,
          genres:  genres
        }
        // refresh table so new book is visible
        // updateRequested(false);

        console.log(payload);
        axios.post(`http://192.168.99.100:3000/api/v1/books`, payload, {
          headers: {
                Authorization: `Bearer ${token}`
              },
            })
            .then((response) => handleSuccessfulNewBook(response))
            .then(updateRequested(false))
            .catch((error) => handleError(error))
      }

    return (
        <div>
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Author</Table.HeaderCell>
                  <Table.HeaderCell>Genres</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
              {books.map(x =><Table.Row>
                  <Table.Cell><Link to={`/books/${x.id}`} params={{ id: x.id}}>{x.name} </Link></Table.Cell>
                  <Table.Cell><Link to={`/books/${x.id}`} params={{ id: x.id}}>{x.author} </Link></Table.Cell>
                  <Table.Cell><Link to={`/books/${x.id}`} params={{ id: x.id}}>{x.genres.map(g => g +"  ")} </Link></Table.Cell>
                </Table.Row>)}
              </Table.Body>

            </Table>

            <Form>
              <legend>New Book:</legend>
              <fieldset>
              <Form.Group widths='equal'>
                <Form.Input fluid label='Title' placeholder='Title' onChange={onChangeTitle} />
                <Form.Select
                  fluid
                  label='Select Author'
                  id='dropdown'
                  options={global.config.authorsList}
                  placeholder='Gender'
                  onChange={onChangeAuthor}
                  value={author}
                />
                <Dropdown
                  placeholder='Genres - choose one or more'
                  fluid
                  multiple
                  search
                  selection
                  options={genresOptions}
                  onChange={onChangeGenres}
                />
              </Form.Group>
              <Form.Button onClick={handleSubmit} >Submit</Form.Button>
              </fieldset>
            </Form>
        </div>
    )
}

export default BooksList
