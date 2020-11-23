import axios from 'axios'
import './style/Quiz.scss'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Dropdown,
  Form,
  Button,
  Container,
  Header,
  Icon,
  Grid,
  Label,
  Divider

} from 'semantic-ui-react'

const jwt = require('jsonwebtoken');
const _ = require("lodash")

const goalsOptions = [
  { key: '1' , text: 'fix split ends'  , value: 'fix split ends'   },
  { key: '2' , text: 'hidrate'         , value: 'hidrate'          },
  { key: '3' , text: 'replenish'       , value: 'replenish'        },
  { key: '4' , text: 'strenghten'      , value: 'strenghten'       },
  { key: '5' , text: 'color protection', value: 'color protection' },
  { key: '6' , text: 'lengthen'        , value: 'lengthen'         },
  { key: '7' , text: 'volumize'        , value: 'volumize'         },
  { key: '8' , text: 'anti-frizz'      , value: 'anti-frizz'       },
  { key: '9' , text: 'curl definition' , value: 'curl definition'  },
  { key: '10', text: 'nourish roots'   , value: 'nourish roots'    },
  { key: '11', text: 'shine'           , value: 'shine'            },
  { key: '12', text: 'soothe scalp'    , value: 'soothe scalp'     },
  { key: '13', text: 'straighten'      , value: 'straighten'       },
  { key: '14', text: 'oil control'     , value: 'oil control'      }
];

const frequencyOptions = [
  { key: '1' , text: 'Every month (-20% discount per bottle)'    , value: 'every month'      },
  { key: '2' , text: 'Every 2 months (-10% discount per bottle)' , value: 'every 2 months'   },
  { key: '3' , text: 'Every 3 months (-5% discount per bottle)' , value: 'every 3 months'   },
  { key: '4' , text: 'Just once'      , value: 'just once'        }
]

function Quiz() {
    var token = localStorage.getItem("token") ? localStorage.getItem("token") : null
    var jwtOutput = null
    if(token) {
     jwtOutput = jwt.verify(token, global.config.JWT_SECRET_KEY)
      const {userId, userRole } = jwtOutput
    }

    const [form, setState] = useState({
      hairType: '',
      hairStructure: '',
      scalpMoisture: '',
      goals: [],
      formulaName: '',
      siliconFree: '',
      fragrance: '',
      shampooColor: '',
      size: '',
      frequency: ''
    });

    const updateField = (e, {value, name}) => {
      setState({
        ...form,
        [name]:value
      });
      console.log(form.hairType, form. hairStructure, form.scalpMoisture,
        form.goals, form.siliconFree, form.formulaName, form.fragrance,
        form.size, form.frequency);
    };

    const updateInputField = e => {
      setState({
        ...form,
        [e.target.name]: e.target.value
      });
      //console.log(`user in quiz is: ${jwtOutput.userId}`)
    };

    function handleSuccessfulNewRecipe(response) {
        console.log(response.status)
        alert('Saved shampoo recipe!')
    }

    function handleError(error){
      console.error(error);
      alert(error.response.data.error)
    }

    function handleSubmit(e) {
        if(!token){
          alert("Please login to design a new shampoo!")
        }
        else{
          console.log("New Recipe handleSubmit");
          console.log(`window.user._id is: ${global.config._id}`)
          var payload = {
            clientId          : jwtOutput.userId,
            name              : form.formulaName,
            goals             : form.goals,
            hairType          : form.hairType,
            hairStructure     : form.hairStructure,
            scalpMoisture     : form.scalpMoisture,
            siliconFree       : form.siliconFree,
            fragrance         : form.fragrance,
            shampooColor      : form.shampooColor,
            conditionerColor  : form.shampooColor,
            size              : form.size,
            frequency         : form.frequency,
            subscription      : "canceled"
          }

          console.log(payload);
          if(checkFormCompleted(payload) && token){
            axios.post(`http://localhost/recipes`, payload, {
              headers: {
                    Authorization: `Bearer ${token}`
                  },
                })
                .then((response) => handleSuccessfulNewRecipe(response))
                .catch((error) => handleError(error))
          }
          else{
            if(!checkFormCompleted(payload))
              alert("Please complete all fields before submit!")
            else {
              alert("Please login to save recipe!")
            }
          }
        }
      }

      function checkFormCompleted(payload){
        var checked = true
        if ( payload.name             === '' ||
             payload.goals.length     === 0 ||
             payload.hairType         === '' ||
             payload.hairStructure    === '' ||
             payload.scalpMoisture    === '' ||
             payload.siliconFree      === '' ||
             payload.fragrance        === '' ||
             payload.shampooColor     === '' ||
             payload.conditionerColor === '' ||
             payload.size             === '' ||
             payload.frequency        === '' ||
             payload.subscription     === '') checked = false
        console.log(checked)
        return checked
      }

      const attributes1 = form.fragrance === 'lavender & eucalyptus'? {basic:false} : {basic:true}
      const attributes2 = form.fragrance === 'rose & black currant'?  {basic:false} : {basic:true}
      const attributes3 = form.fragrance === 'pear & apple'        ?  {basic:false} : {basic:true}
      const attributes4 = form.fragrance === 'peach & mandarin'    ?  {basic:false} : {basic:true}
      const attributes5 = form.fragrance === 'eucalyptus & mint'   ?  {basic:false} : {basic:true}
      const attributes6 = form.fragrance === 'fragrance free'      ?  {basic:false} : {basic:true}
      const fragranceBtnAtributes = {className:'fragrancebtn', color:'teal', name:'fragrance', onClick:updateField}

      return (
          <Container id='mainContainer'>
              <Header as='h1'>Take the shampoo quiz </Header>
              <p>Blablablabla.</p>
              <Form id="quizForm">

                <Divider as='h4'className='header' horizontal style={{ margin: '3em 0em', textTransform: 'uppercase' }}> your hair characteristics </Divider>
                <Form.Group inline >
                   <Label color='teal' horizontal>Hair Type</Label>
                   <Form.Radio label='Straight' value='straight' checked={form.hairType === 'straight'} onChange={updateField} name='hairType' />
                   <Form.Radio label='Wavy' value='wavy' checked={form.hairType === 'wavy'} onChange={updateField} name='hairType' />
                   <Form.Radio label='Curly' value='curly' checked={form.hairType === 'curly'} onChange={updateField} name='hairType' />
                </Form.Group><br/>

                <Form.Group inline>
                   <Label color='teal' horizontal>Hair Structure</Label>
                   <Form.Radio label='Fine' value='fine' checked={form.hairStructure === 'fine'} onChange={updateField} name='hairStructure' />
                   <Form.Radio label='Medium' value='medium' checked={form.hairStructure === 'medium'} onChange={updateField} name='hairStructure' />
                   <Form.Radio label='Coarse' value='coarse' checked={form.hairStructure === 'coarse'} onChange={updateField} name='hairStructure' />
                </Form.Group><br/>

                <Form.Group inline>
                   <Label color='teal' horizontal>Scalp Moisture</Label>
                   <Form.Radio label='Dry' value='dry' checked={form.scalpMoisture === 'dry'} onChange={updateField} name='scalpMoisture' />
                   <Form.Radio label='Normal' value='normal' checked={form.scalpMoisture === 'normal'}   onChange={updateField}   name='scalpMoisture'   />
                   <Form.Radio label='Oily' value='oily' checked={form.scalpMoisture === 'oily'} onChange={updateField}   name='scalpMoisture'   />
                </Form.Group><br/>

                <Form.Group widths='equal' block widths='equal'>
                  <Label color='teal' horizontal>Hair Goals</Label>
                  <Dropdown  placeholder='Goals - choose one or more'  fluid  multiple  search    selection  options={goalsOptions}  onChange={updateField}    name='goals'  />
                </Form.Group><br/>

                <Form.Group inline>
                   <Label color='teal' horizontal>Silicon Free</Label>
                   <Form.Radio label='Yes'   value='yes'     name='siliconFree'   checked={form.siliconFree === 'yes'}   onChange={updateField}   />
                   <Form.Radio   label='No'   value='no'   name='siliconFree'   checked={form.siliconFree === 'no'}   onChange={updateField} />
                </Form.Group><br/><br/>

                <Divider as='h4'className='header' horizontal style={{ margin: '3em 0em', textTransform: 'uppercase' }}> Name & Fragrance </Divider>

                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>Formula Name</label>
                    <input placeholder='My Cool Shampoo' name='formulaName' value={form.formulaName} onChange={updateInputField}/>
                  </Form.Field>
                </Form.Group><br/><br/>

                <Form.Group widths='equal'>
                  <Form.Field id="fragranceButtons">
                    <label>Fragrance</label><Grid.Row><br/>

                      <Button {...attributes1} {...fragranceBtnAtributes} value='lavender & eucalyptus' > lavender & eucalyptus {form.fragrance === 'lavender & eucalyptus' ? <Icon name='check circle'/>: null}</Button>  </Grid.Row><Grid.Row>
                      <Button {...attributes2} {...fragranceBtnAtributes} value='rose & black currant'  > rose & black currant {form.fragrance === 'rose & black currant' ? <Icon name='check circle'/>: null}</Button> </Grid.Row><Grid.Row>
                      <Button {...attributes3} {...fragranceBtnAtributes} value='pear & apple'          > pear & apple {form.fragrance === 'pear & apple' ? <Icon name='check circle'/>: null}</Button> </Grid.Row><Grid.Row>
                      <Button {...attributes4} {...fragranceBtnAtributes} value='peach & mandarin'      > peach & mandarin {form.fragrance === 'peach & mandarin' ? <Icon name='check circle'/>: null}</Button> </Grid.Row><Grid.Row>
                      <Button {...attributes5} {...fragranceBtnAtributes} value='eucalyptus & mint'     > eucalyptus & mint {form.fragrance === 'eucalyptus & mint' ? <Icon name='check circle'/>: null}</Button> </Grid.Row><Grid.Row>
                      <Button {...attributes6} {...fragranceBtnAtributes} value='fragrance free'        > fragrance free {form.fragrance === 'fragrance free' ? <Icon name='check circle'/>: null}</Button> </Grid.Row>
                  </Form.Field>
                </Form.Group> <br/><br/>

                <label>Shampoo Color</label><br/><br/>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <Button size='massive' circular color='yellow' name='shampooColor' value='yellow'  toggle={form.shampooColor === 'yellow'? true : false} onClick={updateField}>{form.shampooColor === 'yellow'? <Icon name='check circle'/>: null}</Button>
                    <Button size='massive' circular color='olive'  name='shampooColor' value='olive'   toggle={form.shampooColor === 'olive'? true : false} onClick={updateField}>{form.shampooColor === 'olive'? <Icon name='check circle'/>: null}</Button>
                    <Button size='massive' circular color='green'  name='shampooColor' value='green'   toggle={form.shampooColor === 'green'? true : false} onClick={updateField}>{form.shampooColor === 'green'? <Icon name='check circle'/>: null}</Button>
                    <Button size='massive' circular color='teal'   name='shampooColor' value='teal'   toggle={form.shampooColor === 'teal'? true : false} onClick={updateField}>{form.shampooColor === 'teal'? <Icon name='check circle'/>: null}</Button>
                    <Button size='massive' circular color='blue'   name='shampooColor' value='blue'    toggle={form.shampooColor === 'blue'? true : false} onClick={updateField}>{form.shampooColor === 'blue'? <Icon name='check circle'/>: null}</Button>
                    <Button size='massive' circular color='violet' name='shampooColor' value='violet'  toggle={form.shampooColor === 'violet'? true : false} onClick={updateField}>{form.shampooColor === 'violet'? <Icon name='check circle'/>: null}</Button>
                  </Form.Field>
                </Form.Group><br/><br/>

                <Divider as='h4'className='header' horizontal style={{ margin: '3em 0em', textTransform: 'uppercase' }}> Some tehnical details </Divider>

                <Form.Group inline>
                   <label>Size</label>
                   <Form.Radio   label='236ml'   value='236ml'   name='size'   checked={form.size === '236ml'}   onChange={updateField}   />
                   <Form.Radio   label='473ml' value='473ml'   name='size'   checked={form.size === '473ml'}   onChange={updateField}   />
                </Form.Group><br/>

                <Form.Field>
                  <label>Delivery Frequency</label>
                  <Dropdown placeholder='Delivery options' fluid search selection options={frequencyOptions} onChange={updateField} name='frequency'/></Form.Field><br/><br/>


                    <Form.Button renderAs="button" color='teal' onClick={handleSubmit}>Save Recipe</Form.Button>
                  <Link to={checkFormCompleted(form) ? "/subscriptions" : {}} >
                  </Link>
              </Form>
          </Container>
      )
}
// <Link to={global.user ? "/subscriptions" : {}}>
export default Quiz
