import axios from 'axios'
import React, { useState } from 'react'
import './style/FAQ.scss'

import {
  Container,
  Header,
  Grid,
  Divider,
  Segment,
  } from 'semantic-ui-react'

function FAQ(props) {

  const [requested, updateRequested] = useState(false)
  const [messages, setList] = useState([])

  if (!requested) {
      updateRequested(true)
      //get messages
      axios.get(`http://localhost/messages`)
          .then(response =>  {
              console.log(response.data)
              setList(response.data)
          })
          .catch(error => {
              console.log(error)
              alert(error.response.data.error)
          })
  }

  return(
    <Container id='mainContainer'>
      <Header as='h1'> Frequent Questions & Answers </Header>
     <Divider as='h6'className='header' horizontal style={{ margin: '3em 0em', textTransform: 'uppercase'}}>Don't hesitate to ask us anything else on owr Contact page</Divider><br/>
      {messages.map( mes => mes.faq != 'false' ?
      <Segment className='segment' style={{ padding: '4em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row style={{textAlign: 'center'}}>
            <Grid.Column>
              <Header as='h6' style={{ fontSize: '1.33em' }}>
                {mes.message}
              </Header>
              <p style={{ fontSize: '1.1em' }}>
                {mes.resolved}
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      : null
    )}
    </Container>
  )
}

export default FAQ
