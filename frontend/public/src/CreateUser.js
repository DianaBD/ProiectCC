import React, { useState } from "react"
import "./style/Register.css"
import { LinkContainer } from "react-router-bootstrap"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Button, Form, Segment, Label, Grid, Header, Message } from 'semantic-ui-react'

function CreateUser() {

    const [form, setState] = useState({
      username:'',
      password:'',
      email   :'',
      phoneNumber   :'',
      address :'',
      firstName:'',
      lastName:''
    })

    function handleSuccessfulRegister(response) {
        console.log(response.status)
        alert('register complete!')
    }

    const updateInputField = e => {
      setState({
        ...form,
        [e.target.name]: e.target.value
      });
    };

    function handleSubmit(e) {
        console.log("AAAAAAAAA handleSubmit");
        var payload = {

          username:    form.username,
          password:    form.password,
          email:       form.email,
          address:     form.address,
          phoneNumber: form.phoneNumber,
          firstName:   form.firstName,
          lastName:    form.lastName
        }
        console.log(payload);
        if(checkFormCompleted(payload)){
          //const url = 'http://localhost/auth/register/';
          axios.post(`http://localhost/auth/register`, payload)
              .then((response) => handleSuccessfulRegister(response))
              .catch((error) => console.error(error))
        }
        else{
          alert("Please complete all register fields!")
        }
    };

    function checkFormCompleted(payload){
      var checked = true
      if ( payload.username     == '' ||
           payload.password     == '' ||
           payload.email        == '' ||
           payload.address      == '' ||
           payload.phoneNumber  == '' ||
           payload.firstName    == '' ||
           payload.lastName     == ''
           ) checked = false
      console.log(checked)
      return checked
    }

    return (
      <div id='mainDiv'>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
               Create a new user
            </Header>
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' name='username'   placeholder='Username' onChange={updateInputField}/>
                <Form.Input fluid icon='lock' iconPosition='left' name='password'   placeholder='Password' type='password'  onChange={updateInputField}  />
                <Form.Input fluid icon='mail' iconPosition='left' name='email'     placeholder='E-mail' onChange={updateInputField}  />
                <Form.Input fluid icon='phone' iconPosition='left'name='phoneNumber'placeholder='Phone' onChange={updateInputField}/>
                <Form.Input fluid icon='home' iconPosition='left' name='address'    placeholder='Address' onChange={updateInputField}  />
                <Form.Input fluid                                 name='firstName' placeholder='First Name' onChange={updateInputField}  />
                <Form.Input fluid                                 name='lastName'  placeholder='Last Name' onChange={updateInputField}  />

                  <Button renderAs='button' color='teal' fluid size='large' onClick={handleSubmit}> Create User </Button>
                <Link to="/quiz">
                </Link>
              </Segment>
            </Form>

          </Grid.Column>
        </Grid>
      </div>)
}

export default CreateUser
