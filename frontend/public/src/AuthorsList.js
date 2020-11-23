import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { Button, Icon } from 'semantic-ui-react'

function AuthorsList(props) {
    const [authors, setList] = useState([])
    const token = localStorage.getItem("token")
    const [requested, updateRequested] = useState(false)
    const [loading, updateLoading] = useState(true)

    const [firstName, setFirstName] = useState("nimic")
    const [lastName, setLastName] = useState("nimic")

    if (!requested) {
        updateRequested(true);
        axios.get(`http://192.168.99.100:3000/api/v1/authors`, {
            headers: {
                  Authorization: `Bearer ${token}`
            }
        })
        .then(response =>  {
            console.log(response.data)
            setList(response.data)
            updateLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
    }


    function onChangeFirstName(e,{value}){
      setFirstName(value);
    }

    function onChangeLastName(e,{value}){
      setLastName(value);
    }

    function handleSuccessfulNewAuthor(response) {
        console.log(response.status)
    }

    function handleSuccessfulDelete(response) {
        console.log(response.status)
    }

    function handleSubmit(){
      var payload = {
        firstName: firstName,
        lastName: lastName
      }
      console.log(payload);
      axios.post(`http://192.168.99.100:3000/api/v1/authors`, payload, {
        headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then((response) => handleSuccessfulNewAuthor(response))
          .then(updateRequested(false))
          .catch((error) => console.error(error))
    }

    function deleteAuthor(id){
      var url = `http://192.168.99.100:3000/api/v1/authors` + "/" + id;
      axios.delete(url, {
        headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then((response) => handleSuccessfulDelete(response))
          .then(updateRequested(false))
          .catch((error) => console.error(error))
    }

    return (
        <div>
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
              {authors.map(x =><Table.Row>
                  <Table.Cell><Link to={`/authors/${x._id}`}>{x.firstName} </Link></Table.Cell>
                  <Table.Cell><Link to={`/authors/${x._id}`}>{x.lastName} </Link></Table.Cell>
                  <Table.Cell><Button icon onClick={() => deleteAuthor(x._id)} curentAuthor={x._id}><Icon name="trash alternate"/></Button></Table.Cell>
                </Table.Row>)}
              </Table.Body>

            </Table>

            <Form>
              <Form.Group widths='equal'>
                <Form.Input fluid label='Name' placeholder='FirstName' onChange={onChangeFirstName} />
                <Form.Input fluid label='Title' placeholder='LastName' onChange={onChangeLastName} />
              </Form.Group>
              <Form.Button onClick={handleSubmit} >Submit</Form.Button>
            </Form>
        </div>
    )
}

export default AuthorsList
