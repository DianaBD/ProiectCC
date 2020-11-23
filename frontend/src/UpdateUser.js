import React, { useState } from 'react'
import './style/UpdateUser.scss'
import axios from 'axios'
import { Button, Icon, Form, Table } from 'semantic-ui-react'

function UpdateUser(props) {
    const [user, setUserData] = useState({})
    const [requested, updaterequested] = useState(false)
    const [loading, updateLoading] = useState(true)
    const { id } = props.match.params
    const token = localStorage.getItem("token")

    const [userForm, setState] = useState({
      username:'',
      password:'',
      email   :'',
      phoneNumber   :'',
      address :'',
      firstName:'',
      lastName:''
    })

    if (!requested) {
        updaterequested(true)
        axios.get(`http://localhost/auth/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setUserData(response.data)
                updateLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    /////////////////////// Update user ///////////////////////
    function handleSuccessfulUpdate(response) {
        console.log(response.status)
        alert('User updated!')
    }

    const updateInputField = e => {
      setState({
        ...userForm,
        [e.target.name]: e.target.value
      });
    };

    function checkFormCompleted(payload){
      var checked = true
      if ( payload.username     === '' ||
           payload.password     === '' ||
           payload.email        === '' ||
           payload.address      === '' ||
           payload.phoneNumber  === '' ||
           payload.firstName    === '' ||
           payload.lastName     === ''
           ) checked = false
      console.log(checked)
      return checked
    }

    function handleSubmit(e) {
        console.log("AAAAAAAAA handleSubmit");
        var payload = {

          username:    userForm.username,
          password:    userForm.password,
          email:       userForm.email,
          address:     userForm.address,
          phoneNumber: userForm.phoneNumber,
          firstName:   userForm.firstName,
          lastName:    userForm.lastName
        }
        console.log(payload);
        if(checkFormCompleted(payload)){
          console.log(`user id to update is: ${id}`)
          axios.put(`http://localhost/auth/${id}` , payload, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
              .then((response) => handleSuccessfulUpdate(response))
              .catch((error) => alert(error))
        }
        else{
          alert("Please complete all fields to update user!")
        }
    };

    const autoCompleteField = (name, value) => {
      console.log(`name is: ${name}      value is: ${value}`)
      setState({
        ...userForm,
        [name]:value
      });
      document.getElementById(name).value = value
    }

    return (
        <div id='mainContainer'>

          <Form>

                  <Table definition>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell colSpan='3' style={{ fontSize: '1.2rem', paddingLeft: '2rem' }}>User information</Table.HeaderCell>
                        <Table.HeaderCell colSpan='1' style={{ fontSize: '1.2rem', paddingLeft: '2rem' }}>Update user information</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>

                      <Table.Row>
                        <Table.Cell>Username</Table.Cell>
                        <Table.Cell>
                            {user.username}
                        </Table.Cell>
                        <Table.Cell>
                          <Button className='fillBtn grow' circular size='tiny' style={{float: 'right', marginTop: '-1rem', marginBottom: '-1rem'}} inverted onClick={() => autoCompleteField('username', user.username)}><Icon name='arrow circle right'  color='teal' size='large' > </Icon></Button>
                        </Table.Cell>
                        <Table.Cell width='7'><Form.Input fluid icon='user' iconPosition='left' id='username' name='username'   placeholder='Username' onChange={updateInputField}/></Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Password</Table.Cell>
                        <Table.Cell>************</Table.Cell>
                        <Table.Cell>
                          <Button className='fillBtn grow' circular size='tiny' style={{float: 'right', marginTop: '-1rem', marginBottom: '-1rem'}} inverted onClick={() => autoCompleteField('password', user.password)}><Icon name='arrow circle right'  color='teal' size='large' > </Icon></Button>
                        </Table.Cell>
                        <Table.Cell>  <Form.Input fluid icon='lock' iconPosition='left' id='password' name='password'   placeholder='Password' type='password'  onChange={updateInputField}  /></Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>First Name</Table.Cell>
                        <Table.Cell>{user.firstName}</Table.Cell>
                        <Table.Cell>
                          <Button className='fillBtn grow' circular size='tiny' style={{float: 'right', marginTop: '-1rem', marginBottom: '-1rem'}} inverted onClick={() => autoCompleteField('firstName', user.firstName)}><Icon name='arrow circle right'  color='teal' size='large' > </Icon></Button>
                        </Table.Cell>
                        <Table.Cell><Form.Input fluid                                id='firstName' name='firstName' placeholder='First Name' onChange={updateInputField}  /></Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Last Name</Table.Cell>
                        <Table.Cell>{user.lastName}</Table.Cell>
                        <Table.Cell>
                          <Button className='fillBtn grow' circular size='tiny' style={{float: 'right', marginTop: '-1rem', marginBottom: '-1rem'}} inverted onClick={() => autoCompleteField('lastName', user.lastName)}><Icon name='arrow circle right'  color='teal' size='large' > </Icon></Button>
                        </Table.Cell>
                        <Table.Cell><Form.Input fluid                                id='lastName' name='lastName'  placeholder='Last Name' onChange={updateInputField}  /></Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>E-mail</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>
                          <Button className='fillBtn grow' circular size='tiny' style={{float: 'right', marginTop: '-1rem', marginBottom: '-1rem'}} inverted onClick={() => autoCompleteField('email', user.email)}><Icon name='arrow circle right'  color='teal' size='large' > </Icon></Button>
                        </Table.Cell>
                        <Table.Cell><Form.Input fluid icon='mail' iconPosition='left' id='email' name='email'     placeholder='E-mail' onChange={updateInputField}  /></Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Phone</Table.Cell>
                        <Table.Cell>{user.phoneNumber}</Table.Cell>
                        <Table.Cell>
                          <Button className='fillBtn grow' circular size='tiny' style={{float: 'right', marginTop: '-1rem', marginBottom: '-1rem'}} inverted onClick={() => autoCompleteField('phoneNumber', user.phoneNumber)}><Icon name='arrow circle right'  color='teal' size='large' > </Icon></Button>
                        </Table.Cell>
                        <Table.Cell><Form.Input fluid icon='phone' iconPosition='left' id='phoneNumber' name='phoneNumber' placeholder='Phone' onChange={updateInputField}/></Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Address</Table.Cell>
                        <Table.Cell>{user.address}</Table.Cell>
                        <Table.Cell>
                          <Button className='fillBtn grow' circular size='tiny' style={{float: 'right', marginTop: '-1rem', marginBottom: '-1rem'}} inverted onClick={() => autoCompleteField('address', user.address)}><Icon name='arrow circle right'  color='teal' size='large' > </Icon></Button>
                        </Table.Cell>
                        <Table.Cell><Form.Input fluid icon='home' iconPosition='left' id='address' name='address' placeholder='Address' onChange={updateInputField}  /></Table.Cell>
                      </Table.Row>

                    </Table.Body>
                  </Table>
                  <Button renderAs='button' color='teal' size='large' onClick={handleSubmit}> Update user </Button>

          </Form>
        </div>
    )
}

export default UpdateUser
