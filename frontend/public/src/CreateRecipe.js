import React, { useState } from 'react'
import './style/UpdateUser.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Button, Icon, Segment, Form, Table, Grid, Header, Dropdown } from 'semantic-ui-react'

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
  { key: '1' , text: 'Every month'    , value: 'every month'      },
  { key: '2' , text: 'Every 2 months' , value: 'every 2 months'   },
  { key: '3' , text: 'Every 3 months' , value: 'every 3 months'   },
  { key: '4' , text: 'Just once'      , value: 'just once'        }
]

const hairTypeOptions = [
  { key: '1' , text: 'curly'    , value: 'curly'      },
  { key: '2' , text: 'wavy'     , value: 'wavy'       },
  { key: '3' , text: 'straight' , value: 'straight'   },
]

const hairStructureOptions = [
  { key: '1' , text: 'fine'    , value: 'fine'     },
  { key: '2' , text: 'medium'  , value: 'medium'   },
  { key: '3' , text: 'coarse'  , value: 'coarse'   },
]

const scalpMoistureOptions = [
  { key: '1' , text: 'dry'    , value: 'dry'    },
  { key: '2' , text: 'normal' , value: 'normal' },
  { key: '3' , text: 'oily'   , value: 'oily'   },
]

const sizeOptions = [
  { key: '1' , text: '236ml' , value: '236ml' },
  { key: '2' , text: '473ml' , value: '473ml' },
]

const shampooColorOptions = [
  { key: '1' , text: 'olive'  , value: 'olive'    },
  { key: '2' , text: 'yellow' , value: 'yellow'   },
  { key: '3' , text: 'blue'   , value: 'blue'     },
  { key: '4' , text: 'violet' , value: 'violet'   },
  { key: '5' , text: 'teal'   , value: 'teal'     },
  { key: '6' , text: 'green'  , value: 'green'    }
]

const fragranceOptions = [
  { key: '1' , text: 'lavender & eucalyptus' , value: 'lavender & eucalyptus'   },
  { key: '2' , text: 'rose & black currant'  , value: 'rose & black currant'    },
  { key: '3' , text: 'pear & apple'          , value: 'pear & apple'            },
  { key: '4' , text: 'peach & mandarin'      , value: 'peach & mandarin'        },
  { key: '5' , text: 'eucalyptus & mint'     , value: 'eucalyptus & mint'       },
  { key: '6' , text: 'fragrance free'        , value: 'fragrance free'          }
]

var userOptions = []
function CreateRecipe(props) {
    const [users, setUserData] = useState({})
    const [requested, updaterequested] = useState(false)
    const [loading, updateLoading] = useState(true)
    const { id } = props.match.params
    const token = localStorage.getItem("token")

    const [recipeForm, setState] = useState({
      clientId: '',
      hairType: '',
      hairStructure: '',
      scalpMoisture: '',
      goals: [],
      name: '',
      siliconFree: '',
      fragrance: '',
      shampooColor: '',
      size: '',
      frequency: '',
      subscription: ''
    })

    if (!requested) {
        updaterequested(true)
        axios.get(`http://localhost/auth`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setUserData(response.data)
                userOptions=response.data.map((u,i) => {return {key: i, text: "" + u.firstName + " " + u.lastName, value: u._id}})
                console.log(userOptions)
                updateLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }

    /////////////////////// Update recipe ///////////////////////
    function handleSuccessfulUpdate(response) {
        console.log(response.status)
        alert('Recipe created!')
    }

    const updateInputField = e => {
      setState({
        ...recipeForm,
        [e.target.name]: e.target.value
      });
    };

    const updateField = (e, {value, name}) => {
      setState({
        ...recipeForm,
        [name]:value
      });
    };

    function checkFormCompleted(payload){
      var checked = true
      if ( payload.clientId          == '' ||
           payload.name              == '' ||
           payload.goals             == '' ||
           payload.hairType          == '' ||
           payload.hairStructure     == '' ||
           payload.scalpMoisture     == '' ||
           payload.siliconFree       == '' ||
           payload.fragrance         == '' ||
           payload.shampooColor      == '' ||
           payload.conditionerColor  == '' ||
           payload.size              == '' ||
           payload.frequency         == '' ||
           payload.subscription      == ''
           ) checked = false
      console.log(checked)
      return checked
    }

    function handleSubmit(e) {
        console.log("AAAAAAAAA handleSubmit");
        var payload = {
          clientId          : recipeForm.clientId,
          name              : recipeForm.name,
          goals             : recipeForm.goals,
          hairType          : recipeForm.hairType,
          hairStructure     : recipeForm.hairStructure,
          scalpMoisture     : recipeForm.scalpMoisture,
          siliconFree       : recipeForm.siliconFree,
          fragrance         : recipeForm.fragrance,
          shampooColor      : recipeForm.shampooColor,
          conditionerColor  : recipeForm.shampooColor,
          size              : recipeForm.size,
          frequency         : recipeForm.frequency,
          subscription      : recipeForm.subscription
        }

        console.log(payload);
        if(checkFormCompleted(payload)){
          console.log(`recipe id to update is: ${id}`)
          axios.post(`http://localhost/recipes/` , payload, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          })
              .then((response) => handleSuccessfulUpdate(response))
              .catch((error) => alert(error))
        }
        else{
          alert("Please complete all fields to update recipe!")
        }
    };

    const autoCompleteField = (name, value) => {
      console.log(`name is: ${name}      value is: ${value}`)
      setState({
        ...recipeForm,
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
                        <Table.HeaderCell colSpan='2' style={{ fontSize: '1.2rem', paddingLeft: '40rem' }}>New recipe information</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>

                      <Table.Row>
                        <Table.Cell>Client</Table.Cell>
                        <Table.Cell> <Form.Field>
                        <Dropdown placeholder='Goals - choose one or more' fluid multiple search selection
                            options={userOptions}
                            onChange={updateField} name='clientId' id='clientId' />
                        </Form.Field>
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Formula Name</Table.Cell>
                        <Table.Cell width='7'><Form.Input fluid  id='name' name='name'   placeholder='name' onChange={updateInputField}/></Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Goals</Table.Cell>
                        <Table.Cell> <Form.Field> <Dropdown  placeholder='Goals - choose one or more'  fluid  multiple  search    selection  options={goalsOptions}  onChange={updateField}    name='goals' id='goals' /></Form.Field> </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Hair Type</Table.Cell>
                        <Table.Cell> <Form.Field> <Dropdown  placeholder='Hair Type - choose one'  fluid search selection options={hairTypeOptions}  onChange={updateField}  id='hairType'  name='hairType'  /></Form.Field></Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Hair structure</Table.Cell>
                        <Table.Cell><Form.Field><Dropdown  placeholder='Hair structure - choose one'  fluid  search selection  options={hairStructureOptions}  onChange={updateField}  id='hairStructure'  name='hairStructure'  /></Form.Field></Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Scalp Moisture</Table.Cell>
                        <Table.Cell><Form.Field><Dropdown  placeholder='Scalp Moisture - choose one'  fluid search    selection  options={scalpMoistureOptions}  onChange={updateField}  id='scalpMoisture'  name='scalpMoisture'  /></Form.Field></Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Silicon free</Table.Cell>
                        <Table.Cell><Form.Input fluid id='siliconFree' name='siliconFree' placeholder='yes / no' onChange={updateInputField}/></Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Fragrance</Table.Cell>
                        <Table.Cell><Form.Field><Dropdown  placeholder='Fragrance - choose one'  fluid search selection  options={fragranceOptions}  onChange={updateField}  id='fragrance'  name='fragrance'  /></Form.Field></Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Shampoo Color</Table.Cell>
                        <Table.Cell><Form.Field><Dropdown  placeholder='Shampoo Color - choose one'  fluid search selection  options={shampooColorOptions}  onChange={updateField}  id='shampooColor'  name='shampooColor'  /></Form.Field></Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Size</Table.Cell>
                        <Table.Cell>
                          <Form.Field>  <Dropdown  placeholder='Size - choose one'  fluid search selection  options={sizeOptions}  onChange={updateField}  id='size'  name='size'  /></Form.Field>
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Frequency</Table.Cell>
                        <Table.Cell><Form.Field><Dropdown placeholder='Delivery options' fluid search selection options={frequencyOptions} onChange={updateField}  id='frequency' name='frequency'/></Form.Field></Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>Subscription</Table.Cell>
                        <Table.Cell><Form.Input fluid id='subscription' name='subscription' placeholder='active / canceled' onChange={updateInputField}  /></Table.Cell>
                      </Table.Row>

                    </Table.Body>
                  </Table>
                  <Button renderAs='button' color='teal' size='large' onClick={handleSubmit}> Create recipe </Button>

          </Form>
        </div>
    )
}

export default CreateRecipe
