import axios from 'axios'
import faker from 'faker'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './style/Suport.scss'

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
  Rating,
  Form
} from 'semantic-ui-react'

const _ = require("lodash")

function Suport(props) {
    const token = localStorage.getItem("token")
  const [requested, updateRequested] = useState(false)

  const [messages, setMessagesList] = useState([])
  const [newMessages, setNewMessagesList] = useState([])

  function handleSuccessfulGet(response) {
      console.log(response.status)
  }

  function handleError(error){
    console.error(error);
    alert(error)
  }

  if (!requested) {
      updateRequested(true)
      //get messages
      axios.get(`http://localhost/messages`)
          .then(response =>  {
              console.log(response.data)
              setMessagesList(response.data)
              setNewMessagesList(response.data)

          })
          .catch(error => {
              console.log(error)
          })
  }

  function onFaqChange(x, index, e, name, value){
    console.log(index)
    x.faq = x.faq == 'true' ? 'false' : 'true'
    setNewMessagesList({
      ...newMessages,
      [index] : x
    });
    console.log(newMessages)

    const userId = window.user.userId
    const mes = newMessages[index]
    console.log(mes)

    console.log('hahah')
    var payload = {
        authorId      : mes.author,
        message       : mes.message,
        faq           : mes.faq,
        resolved      : mes.resolved,
    }
    console.log(payload);
    axios.put(`http://localhost/messages/${mes._id}`, payload, {
      headers: {
            Authorization: `Bearer ${token}`
          },
        })
        .then((response) => handleSuccessfulPutMessage(response))
        .catch((error) => handleError(error))
  }

  function onMessageChange(x, index, e, name, value){
    console.log(index)
    x.resolved = e.target.value
    setNewMessagesList({
      ...newMessages,
      [index] : x
    });
    console.log(newMessages)
  }

  function handleSuccessfulPutMessage(response) {
      console.log(response.status)
      alert('Recipe status saved!')
  }

  function handleSubmit(x, index) {

      const userId = window.user.userId
      const mes = newMessages[index]
      console.log(mes)

      console.log("Put recipe handleSubmit");
        console.log('hahah')
        var payload = {
            authorId      : mes.author,
            message       : mes.message,
            faq           : mes.faq,
            resolved      : mes.resolved,
        }
        console.log(payload);
        axios.put(`http://localhost/messages/answer/${mes._id}`, payload, {
          headers: {
                Authorization: `Bearer ${token}`
              },
            })
            .then((response) => handleSuccessfulPutMessage(response))
            .catch((error) => handleError(error))
    }

  return(
    <Container id='mainContainer'>
     <Header as='h1'> Tehnical Support </Header>
     <Divider as='h6'className='header' horizontal style={{ margin: '3em 0em', textTransform: 'uppercase'}}>Mangage Messages & FAQ </Divider>
      {messages.map( (x, index) =>
      <Segment raised className='segment' style={{ padding: '4em 0em' }} vertical>
        <Form className='form'>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row style={{textAlign: 'left'}}>
              <Grid.Column>
                <Header className='header' as='h6' style={{ fontSize: '1rem' }}>
                  {x.message}
              </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{textAlign: 'left'}}>
              <Grid.Column>
                  <Form.Field>
                    <Form.TextArea label='Answer' placeholder={x.resolved == ''? 'Your answer...' : 'Last answered: ' + x.resolved} onChange={(e, value, index) => onMessageChange(x, index, e, value)} />
                  </Form.Field>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row style={{textAlign: 'center'}}>
              <Grid.Column floated='right' width={6}>
                <Checkbox label='Include in FAQ section' name="faq" checked={x.faq === 'true'} onChange={(e, {name, value}) => {onFaqChange(x, index, e, name, value)}}/>
              </Grid.Column>
              <Grid.Column floated='right' width={6}>
                <Button color='teal' size='normal' onClick={(e, {name, value}) => {handleSubmit(x, index)}}>Send</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    )}
    </Container>
  )
}

export default Suport
