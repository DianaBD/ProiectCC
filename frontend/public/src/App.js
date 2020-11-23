import React, { useEffect } from 'react'
import './App.css'
import { HashRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import AuthorsList from './AuthorsList'
import Author from './Author'
import BooksList from './BooksList'
import Book from './Book'
import Quiz from './Quiz'
import Home from './Home'
import Subscriptions from './Subscriptions'
import Contact from './Contact'
import FAQ from './FAQ'
import Admin from './Admin'
import Suport from './Suport'
import UpdateUser from './UpdateUser'
import CreateUser from './CreateUser'
import UpdateRecipe from './UpdateRecipe'
import CreateRecipe from './CreateRecipe'

import {  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Button} from 'semantic-ui-react'

const jwt = require('jsonwebtoken');


function App() {
  const token = localStorage.getItem("token")
  const jwtOutput = token ? jwt.verify(token, global.config.JWT_SECRET_KEY) : null
  const logged = jwtOutput ? true : false
  if(logged){
    const {userId, userRole, userName } = jwtOutput
  }

  return (
    <div className="App">
      <HashRouter basename="/">
        <Switch>
          <Route exact path={"/"}> <Redirect to="/home" /> </Route>
          <Route exact path={"/home"} component={Home}></Route>
          <Route path={"/login"} component={Login}/>
          <Route path={"/register"} component={Register}/>
          <Route exact path={"/quiz"} component={Quiz}/>
          <Route exact path={"/subscriptions"} component={Subscriptions}/>
          <Route exact path={"/contact"} component={Contact}/>
          <Route exact path={"/faq"} component={FAQ}/>

          <Route exact path={"/suport"} component={Suport}/>

          <Route exact path={"/admin"} component={Admin}/>
          <Route path={"/updateUser/:id"} component={UpdateUser}/>
          <Route path={"/createUser"} component={CreateUser}/>
          <Route path={"/updateRecipe/:id"} component={UpdateRecipe}/>
          <Route path={"/createRecipe"} component={CreateRecipe}/>

          // <Route path={"/books/:id"} component={Book}/>
        </Switch>

      <Menu fixed='top' inverted>
        <Container position='center'>
          <Menu.Item header >Smart Shampoo</Menu.Item>
          <Menu.Item as={Link} to="/home" >HOME</Menu.Item>
          <Menu.Item as={Link} to="/quiz" >TAKE QUIZ</Menu.Item>
          <Menu.Item as={Link} to="/faq" >FAQ</Menu.Item>
          <Menu.Item as={Link} to="/contact" >CONTACT</Menu.Item>

          <Menu.Menu position='right'>
            {jwtOutput ? <Menu.Item>Welcome, {jwtOutput.userName} </Menu.Item> : null}
            {!logged || (logged && jwtOutput.userRole == 'user' )? null :
            <Dropdown item simple icon='setting'>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/admin" disabled={!(logged && jwtOutput.userRole == 'admin')}>Admin</Dropdown.Item>
                <Dropdown.Item as={Link} to="/suport" disabled={!(logged && jwtOutput.userRole == 'suport')}>Suport</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            }
            <Dropdown item simple text='ACCOUNT'>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                <Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/subscriptions">MyShampoos</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Container>
      </Menu>

      <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
        <Container textAlign='center'>
          <Grid divided inverted stackable>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Start here' />
              <List link inverted>
                <List.Item as='a'>Co-</List.Item>
                <List.Item as='a'>-ba-</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Then Here' />
              <List link inverted>
                <List.Item as='a'>-pa-</List.Item>
                <List.Item as='a'>-na!</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Last here' />
              <List link inverted>
                <List.Item as='a'>-ca-</List.Item>
                <List.Item as='a'> :)</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header inverted as='h4' content='Fact' />
              <p><strong>
              We've done a survey asking women what shampoo brand they used in shower.
              </strong></p>
              <p>99% of the respondents answered: "What are you doing here? Get out!"</p>
            </Grid.Column>
          </Grid>

          <Divider inverted section />

          <List horizontal inverted divided link size='small'>
            <List.Item  >
              <Link to='/contact'> Contact Us</Link>
            </List.Item>
            <List.Item as='a' href='#'>
              Terms and Conditions
            </List.Item>
          </List>
        </Container>
      </Segment>
            </HashRouter>
    </div>
  )
  // <Image centered size='mini' src='/logo.png' />
}

export default App;
