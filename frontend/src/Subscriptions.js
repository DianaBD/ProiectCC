import axios from 'axios'
import './style/Subscriptions.scss'
import React, { useState } from 'react'

import {
  Button,
  Container,
  Header,
  Grid,
  Divider,
  Segment,
  Radio
} from 'semantic-ui-react'

const _ = require("lodash")
const jwt = require('jsonwebtoken');

function Subscriptions(props) {

    const token = localStorage.getItem("token")
    const jwtOutput = jwt.verify(token, global.config.JWT_SECRET_KEY)
    const {userId, userRole, userName } = jwtOutput

    const [requested, updateRequested] = useState(false)
    const [loading, updateLoading] = useState(true)

    const [recipes,setRecipesList] = useState([])
    const [newRecipes,setNewRecipesList] = useState([])

    if (!requested) {
        updateRequested(true)
        const userId= jwtOutput.userId
        console.log(`userId in subscription is: ${userId}`)
        axios.get(`http://localhost/recipes/users/${userId}`, {
            headers: {
                  Authorization: `Bearer ${token}`
            }
        })
            .then(response =>  {
                console.log("get recipes in subscription:")
                console.log(response.data)
                setRecipesList(response.data)
                setNewRecipesList(response.data)
            })
            .then(() => { updateLoading(false);   console.log(_.first(recipes))})
            .catch(error => {
                console.log(error)
                alert(error.response.data.error)
            })
    }

    function handleSuccessfulPutRecipe(response) {
        console.log(response.status)
        alert('Recipe status saved!')
    }

    function handleError(error){
      console.error(error);
      alert(error.response.data.error)
    }

    function handleSubmit(x, index) {

        const userId = global.user ? global.user._id : ""
        const recipe = newRecipes[index]
        console.log(recipe)

        console.log("Put recipe handleSubmit");
          console.log('hahah')
          var payload = {
              clientId          : jwtOutput.userId,
              name              : recipe.name,
              goals             : recipe.goals,
              hairType          : recipe.hairType,
              hairStructure     : recipe.hairStructure,
              scalpMoisture     : recipe.scalpMoisture,
              siliconFree       : recipe.siliconFree,
              fragrance         : recipe.fragrance,
              shampooColor      : recipe.shampooColor,
              conditionerColor  : recipe.shampooColor,
              size              : recipe.size,
              frequency         : recipe.frequency,
              subscription      : recipe.subscription
          }
          console.log(payload);
          axios.put(`http://localhost/recipes/${recipe.id}`, payload, {
            headers: {
                  Authorization: `Bearer ${token}`
                },
              })
              .then((response) => handleSuccessfulPutRecipe(response))
              .catch((error) => handleError(error))

      }

    function onSubscriptionChange(x, index, e, name, value){
      console.log(index)
      x.subscription = x.subscription === 'active' ? 'canceled' : 'active'
      setNewRecipesList({
        ...newRecipes,
        [index] : x
      });
      console.log(newRecipes)
    }

    return(
      <Container id='mainContainer'>
        <Header as='h1'>Your Shampoos </Header>
        <p></p>
        <Divider as='h4'className='header' horizontal style={{ margin: '3em 0em', textTransform: 'uppercase'}}> {recipes.length == 0 ? 'you have no subscriptions yet' : 'manage your subscriptions'} </Divider><br/>
        {recipes.length === 0 ? null : recipes.map((x,index) =>
        <Segment raised className='segment' style={{ padding: '4em 0em' }} vertical>
          <Header as='h3' style={{ fontSize: '2em' }}>
             {x.name}
          </Header>
          <Divider as='h5'className='header' horizontal style={{ margin: '3em 0em', textTransform: 'uppercase'}}> {x.subscription}</Divider>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column floated='right' width={6}>
                <div className="ui fluid image">
                    <img alt='' src={`/${x.shampooColor}.png`}/>
                    <div style={{position: 'absolute', bottom: '50%', width: '100%', height: 'auto', fontFamily: 'Bradley Hand, cursive'}}>{x.name}</div>
                </div>
              </Grid.Column>
              <Grid.Column width={8}>

                <div style={{ fontSize: '1.4rem', textAlign: 'left'}}><strong> Shampoo Details: </strong> </div><br/>
                <div style={{ fontSize: '1.2rem', textAlign: 'left' }}> <b>Hair Type:         </b> {x.hairType}           </div>
                <div style={{ fontSize: '1.2rem', textAlign: 'left' }}> <b>Hair Structure:    </b> {x.hairStructure} </div>
                <div style={{ fontSize: '1.2rem', textAlign: 'left' }}> <b>Scalp moisture:    </b> {x.scalpMoisture} </div>
                <div style={{ fontSize: '1.2rem', textAlign: 'left' }}> <b>Hair Goals:        </b> {x.goals.map( g => g + ", ")} </div>
                <div style={{ fontSize: '1.2rem', textAlign: 'left' }}> <b>Silicon free:      </b> {x.siliconFree}     </div>
                <div style={{ fontSize: '1.2rem', textAlign: 'left' }}> <b>Fragrance:         </b> {x.fragrance}          </div>
                <div style={{ fontSize: '1.2rem', textAlign: 'left' }}> <b>Formula Name:      </b> {x.name}    </div>
                <div style={{ fontSize: '1.2rem', textAlign: 'left' }}> <b>Shampoo Color:     </b> {x.shampooColor}   </div>
                <div style={{ fontSize: '1.2rem', textAlign: 'left' }}> <b>Size:              </b> {x.size}                    </div>
                <div style={{ fontSize: '1.2rem', textAlign: 'left' }}> <b>Delivery frequency:</b> {x.frequency} </div>
                <div style={{ fontSize: '1.2rem', textAlign: 'left' }}> <b>Discount:</b>
                    {x.frequency == 'every month' ? '-20% discount per bottle' :
                     x.frequency == 'every 2 months' ? '-10% discount per bottle' :
                     x.frequency == 'every 3 months' ? '-5% discount per bottle' : 'only for frequent subscriptions'
                  }
                </div>
                <Header as='h3' style={{ fontSize: '1.3em' }}>
                 You can cancel or activate your subscription anytime
                </Header>
              </Grid.Column>

            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='center'>
                <Grid.Row>
                  <p style={{ fontSize: '1.6rem' }}> {x.subscription == 'active' ? 'Cancel subscription' : 'Activate Subscription'}</p>
                </Grid.Row>
                <Grid.Row>
                  <Radio toggle checked={x.subscription === 'active'} onChange={(e, {name, value}) => {onSubscriptionChange(x, index, e, name, value)}}/>
                </Grid.Row><br/>
                <Grid.Row>
                  <Button basic color='teal' onClick={(e, {name, value}) => {handleSubmit(x, index)}} size='big'>Save</Button>
                </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )}
      </Container>
    )
  }

  export default Subscriptions
