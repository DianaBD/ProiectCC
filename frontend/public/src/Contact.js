import axios from 'axios'
import faker from 'faker'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import './style/Contact.scss'

import {
  Image,
  Button,
  Checkbox,
  Container,
  Header,
  Icon,
  Grid,
  Divider,
  Segment,
  Radio,
  Label,
  Rating
} from 'semantic-ui-react'

const _ = require("lodash")
const jwt = require('jsonwebtoken');

function Contact(props) {

  const token = localStorage.getItem("token")
  const jwtOutput = jwt.verify(token, global.config.JWT_SECRET_KEY)
  const {userId, userRole, userName } = jwtOutput

  const [form, setState] = useState({
    rating: '',
    firstName: '',
    lastName: '',
    message: ''
  })

  const updateInputField = e => {
    setState({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  function handleSuccessfulNewRecipe(response) {
      console.log(response.status)
      alert('Thank you for your feedback!')
  }

  function handleError(error){
    console.error(error);
    alert('error!')
  }

  function handleSubmit() {
      const userId = jwtOutput ? jwtOutput.userId : ""
      if(!jwtOutput){
        alert("Please login to send feedback!")
      }
      console.log("New Feedback handleSubmit");
      var payload = {
        authorId: jwtOutput.userId,
        message: form.message,
        resolved: 'false',
        faq: 'false'
      }

      console.log(payload);
      axios.post(`http://localhost/messages`, payload, {
        headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then((response) => handleSuccessfulNewRecipe(response))
          .catch((error) => handleError(error))
  }

  return(
    <Container id='mainContainer'>
      <Header as='h1'> Contact Us </Header>
      <p>We will answer all your questions via E-mail</p>
      <Divider as='h4'className='header' horizontal style={{ margin: '3em 0em', textTransform: 'uppercase'}}>Leave Us a Message </Divider><br/>
      <Segment className='segment' style={{ padding: '4em 0em' }} vertical>
      <Form>
       <Rating maxRating={5} defaultRating={3} icon='star' size='massive' onRate={updateInputField}/>
       <Form.Group widths='equal'>
         <Form.Input fluid label='First name' placeholder='First name' onChange={updateInputField}/>
         <Form.Input fluid label='Last name' placeholder='Last name' onChange={updateInputField}/>
       </Form.Group>
         <Form.TextArea label='Message' name='message' placeholder='Tell us what you think...' onChange={updateInputField} /><br/><br/>
         <Form.Checkbox label='I agree to the Terms and Conditions' />

         <Form.Button renderAs="button" basic color='teal' onClick={handleSubmit}>Send Message</Form.Button>
       </Form>
      </Segment>
    </Container>
  )
}

export default Contact
