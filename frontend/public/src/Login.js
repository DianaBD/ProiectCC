import React, { useState } from "react"
import './style/Login.css'
import { Link } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap"
import { Button, Form, Segment, Message, Grid, Header, Image } from 'semantic-ui-react'
import axios from 'axios'

const _ = require("lodash")

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function onChangeUserName(e) {
        setUsername(e.target.value)
    }

    function onChangeUserPassword(e) {
        setPassword(e.target.value)
    }

    function handleSuccessfulLogin(token) {
        localStorage.setItem("token", token);
        window.location.reload();
        alert('login complete!')
    }

    function handleSubmit(e) {
        var payload = {
          username: username,
          password: password
        }
        console.log(payload)
        //const url = 'http://localhost/auth/login/';
        axios.post(`http://localhost/auth/login`, payload)
            .then((response) => handleSuccessfulLogin(response.data))
            .catch((error) => console.log(error))
    }


    return<div>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
             Log-in to your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='username' onChange={onChangeUserName}/>
              <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password'  onChange={onChangeUserPassword}/>
                <Button renderAs='button' color='teal' fluid size='large' onClick={handleSubmit}> Login </Button>
                <Link to="/quiz">
              </Link>
            </Segment>
          </Form>
            <Message>
              New to us? <Link to="/register">Sign up</Link>
            </Message>
        </Grid.Column>
      </Grid>
    </div>
}

export default Login
