import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './style/Admin.scss'
import { Link } from 'react-router-dom'
import { Button, Icon, Segment, Form, Table } from 'semantic-ui-react'

function Admin(props) {

    const token = localStorage.getItem("token")

    const [requested, updateRequested] = useState({users: false, recipes:false, messages:false})
    const [loading, updateLoading] = useState(true)

    const [users, setUsersList] = useState([])
    const [recipes, setRecipesList] = useState([])
    const [messages, setMessagesList] = useState([])

    if (!requested.users) {
        updateRequested({...requested, users: true});
        ///// ger users ////
        axios.get(`http://localhost/auth`, {
            headers: {
                  Authorization: `Bearer ${token}`
            }
        })
        .then(response =>  {
            console.log(response.data)
            setUsersList(response.data)
            updateLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
    }

    if (!requested.recipes) {
        ///// get recipes
        updateRequested({...requested, recipes: true});
        axios.get(`http://localhost/recipes/`, {
            headers: {
                  Authorization: `Bearer ${token}`
            }
        })
        .then(response =>  {
            console.log(response.data)
            setRecipesList(response.data)
            updateLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
    }

    if (!requested.messages) {
            ///// get recipes
            updateRequested({...requested, messages: true});
        ///// get messages /////
        axios.get(`http://localhost/messages/`, {
            headers: {
                  Authorization: `Bearer ${token}`
            }
        })
        .then(response =>  {
            console.log(response.data)
            setMessagesList(response.data)
            updateLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
    }

    function handleSuccessfulDelete(response) {
        console.log("Item deleted successfuly!")
    }

    function deleteUser(id){
      console.log(`id to delete recipes foris: ${id}`)
      var url = `http://localhost/auth` + "/" + id;
      axios.delete(url, {
        headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then((response) => handleSuccessfulDelete(response))
          .then(updateRequested({...requested, users: false, recipes: false}))
          .catch((error) => console.error(error))
    }

    function deleteRecipe(id){
      console.log(`id to delete recipes foris: ${id}`)
      var url = `http://localhost/recipes` + "/" + id;
      axios.delete(url, {
        headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then((response) => handleSuccessfulDelete(response))
          .then(updateRequested(false))
          .catch((error) => console.error(error))
    }

    function deleteMessage(id){
      console.log(`id to delete recipes foris: ${id}`)
      var url = `http://192.168.99.100:3000/api/v1/mesages` + "/" + id;
      axios.delete(url, {
        headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then((response) => handleSuccessfulDelete(response))
          .then(updateRequested(false))
          .catch((error) => console.error(error))
    }

    function deleteRecipe(id){
      console.log(`id to delete recipes for is: ${id}`)
      var url = `http://localhost/recipes` + "/" + id;
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
        <div id='mainContainer'>
            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='3' style={{ fontSize: '1.2rem', paddingLeft: '2rem' }}>
                    <strong>USERS</strong>
                  </Table.HeaderCell>
                  <Table.HeaderCell colSpan='5' style={{ fontSize: '1.2rem', paddingLeft: '2rem' }}>
                    <Link to='/createUser'>
                      <Button as='Link' style={{float: 'right'}} renderAs='button' color='teal' size='large' > Create new user </Button>
                    </Link>
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>Username</Table.HeaderCell>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Phone Number</Table.HeaderCell>
                  <Table.HeaderCell>Address</Table.HeaderCell>
                  <Table.HeaderCell>Edit</Table.HeaderCell>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
              {users.map(x =>
                <Table.Row>
                  <Table.Cell>{x.username} </Table.Cell>
                  <Table.Cell>{x.firstName}</Table.Cell>
                  <Table.Cell>{x.lastName} </Table.Cell>
                  <Table.Cell>{x.email} </Table.Cell>
                  <Table.Cell>{x.phoneNumber}</Table.Cell>
                  <Table.Cell>{x.address} </Table.Cell>
                  <Table.Cell><Link to={`/updateUser/${x._id}`} params={{ id: x._id}}><Button size='mini' icon as='Link' ><Icon size='large' name="edit outline"/></Button></Link></Table.Cell>
                  <Table.Cell><Button size='mini' icon onClick={() => deleteUser(x._id)}><Icon size='large' name="trash alternate outline"/></Button></Table.Cell>
                </Table.Row>)}
              </Table.Body>
            </Table>


            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='2' style={{ fontSize: '1.2rem', paddingLeft: '2rem' }}><strong>RECIPES</strong></Table.HeaderCell>
                  <Table.HeaderCell colSpan='11' style={{ fontSize: '1.2rem', paddingLeft: '2rem' }}>
                    <Link to='/createRecipe'>
                      <Button as='Link' style={{float: 'right'}} renderAs='button' color='teal' size='large' > Create new recipe </Button>
                    </Link>
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Goals</Table.HeaderCell>
                  <Table.HeaderCell>SiliconFree</Table.HeaderCell>
                  <Table.HeaderCell>Fragrance</Table.HeaderCell>
                  <Table.HeaderCell>ShampooColor</Table.HeaderCell>
                  <Table.HeaderCell>Size</Table.HeaderCell>
                  <Table.HeaderCell>Srequency</Table.HeaderCell>
                  <Table.HeaderCell>Subscription</Table.HeaderCell>
                  <Table.HeaderCell>Edit        </Table.HeaderCell>
                  <Table.HeaderCell>Delete      </Table.HeaderCell>

                </Table.Row>
              </Table.Header>

              <Table.Body>
              {recipes.map(x =>
                <Table.Row>
                  <Table.Cell>{x.name} </Table.Cell>
                  <Table.Cell>{x.goals.map(g => g + ', ')}</Table.Cell>
                  <Table.Cell>{x.siliconFree} </Table.Cell>
                  <Table.Cell>{x.fragrance} </Table.Cell>
                  <Table.Cell>{x.shampooColor} </Table.Cell>
                  <Table.Cell>{x.size} </Table.Cell>
                  <Table.Cell>{x.frequency} </Table.Cell>
                  <Table.Cell>{x.subscription} </Table.Cell>
                  <Table.Cell><Link to={`/updateRecipe/${x.id}`} params={{ id: x.id}}><Button size='mini' icon as='Link' ><Icon size='large' name="edit outline"/></Button></Link></Table.Cell>
                  <Table.Cell><Button size='mini' icon onClick={() => deleteRecipe(x.id)}><Icon size='large' name="trash alternate outline"/></Button></Table.Cell>
                </Table.Row>)}
              </Table.Body>
            </Table>

            <Table celled striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='8' style={{ fontSize: '1.2rem', paddingLeft: '2rem' }}><strong>Messages</strong></Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>Username</Table.HeaderCell>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Phone Number</Table.HeaderCell>
                  <Table.HeaderCell>Address</Table.HeaderCell>
                  <Table.HeaderCell>Edit</Table.HeaderCell>
                  <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
              {users.map(x =>
                <Table.Row>
                  <Table.Cell>{x.username} </Table.Cell>
                  <Table.Cell>{x.firstName}</Table.Cell>
                  <Table.Cell>{x.lastName} </Table.Cell>
                  <Table.Cell>{x.email} </Table.Cell>
                  <Table.Cell>{x.phoneNumber}</Table.Cell>
                  <Table.Cell>{x.address} </Table.Cell>
                  <Table.Cell><Link to={`/users/${x._id}`} params={{ id: x._id}}><Button size='mini' icon as='Link' ><Icon size='large' name="edit outline"/></Button></Link></Table.Cell>
                  <Table.Cell><Button size='mini' icon onClick={() => deleteUser(x._id)}><Icon size='large' name="trash alternate outline"/></Button></Table.Cell>
                </Table.Row>)}
              </Table.Body>
            </Table>
        </div>
    )
}

export default Admin
