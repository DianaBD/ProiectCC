import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './style/Home.scss'

import {
  Button,
  Container,
  Header,
  Grid,
  Segment,
  Modal
  } from 'semantic-ui-react'

var shown = false

function Home(props) {

  const [showModal, setModal] = useState(true)

  return(
    <Container id='mainContainer'>
      <div>
        { shown === false ?
          <Modal
            open={showModal}
            onClose={() => setModal(false)}
            closeOnDimmerClick='false'
            closeOnDocumentClick='false'
          >
            <Modal.Header>This site uses cookies</Modal.Header>
            <Modal.Content>
                  <p>
                    We use cookies to personalise content and ads, to provide social media features and to analyse our traffic.
                    We also share information about your use of our site with our social media, advertising and analytics partners
                    who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services
                  </p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                onClick={() => {setModal(false);shown = true}}
                positive
                labelPosition='right'
                icon='checkmark'
                content='I agree'
              />
            </Modal.Actions>
          </Modal>
        : null}
        </div>
      <Segment className='segment' style={{ padding: '0rem 0rem' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row style={{textAlign: 'center'}}>
            <Grid.Column floated='right' width={10}>
              <div className="ui fluid image">
                  <img alt='' style={{ height: '37rem', width: '35rem'}} src={`/bottles4.png`}/>
                  <div style={{position: 'absolute', bottom: '50%', width: '100%', height: 'auto', fontFamily: 'Bradley Hand, cursive'}}></div>
              </div>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as='h1'> Want to be cool and design your shampoo? </Header>
              <p style={{ fontSize: '1.3em' }}>
                Now you can! Just <Link to="/register">sign up</Link> and take the shampoo quiz to create your own personal shampoo recipe.
              </p>
              <Header as='h6' style={{ fontSize: '1.5em' }}>
                Tired of running out of shampoo?
              </Header>
              <p style={{ fontSize: '1.3em' }}>
                Make a shampoo subscription and never run out of shampoo again!
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{textAlign: 'center'}}>
            <Grid.Column width={20}>
            <Link to='/quiz'>
              <Button id='takeQuizBtn' renderAs='button' color='teal' size='massive'>Take the quiz</Button>
            </Link>

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  )
}

export default Home
