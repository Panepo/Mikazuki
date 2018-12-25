import React from 'react'
import PropTypes from 'prop-types'
import { configText } from '../cognitive/Cognitive.config'
import { cognitiveApi, genTextBody } from '../cognitive/Cognitive.util'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconClear from '@material-ui/icons/Clear'
import IconCast from '@material-ui/icons/Cast'
import IconCloudCircle from '@material-ui/icons/CloudCircle'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'

const styles = theme => ({
  root: {},
  hidden: {
    display: 'none'
  },
  border: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  },
  list: {
    color: '#FFD54F'
  }
})

const headers = new Headers({
  'Ocp-Apim-Subscription-Key': configText.apiKey,
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:3000',
  'Access-Control-Allow-Credentials': true
})

const errMessage =
  'Hmmm something seems to be wrong... Maybe the file (at least 50*50px)? The Internet?'

class CognitiveVision extends React.Component {
  state = {
    server: 'Azure',
    textInput: '',
    isError: false,
    message: '',
    results: {}
  }

  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleCognitive = this.handleCognitive.bind(this)
  }

  // ================================================================================
  // React event handler functions
  // ================================================================================

  handleClear = () => {
    this.setState({
      textInput: ''
    })
  }

  handleInput = event => {
    this.setState({
      textInput: event.target.value
    })
  }

  handleSwitch = () => {
    if (this.state.server === 'Azure') {
      this.setState({
        server: 'Docker'
      })
    } else {
      this.setState({
        server: 'Azure'
      })
    }
  }

  // ================================================================================
  // Cognitive service
  // ================================================================================

  handleCognitive = () => {
    let url
    if (this.state.server === 'Azure') {
      url = configText.azure
    } else {
      url = configText.docker
    }

    if (this.state.textInput.length > 0) {
      cognitiveApi(
        url,
        headers,
        genTextBody(this.state.textInput),
        errMessage
      ).then(data => {
        if (data.err) {
          this.setState({
            message: errMessage
          })
        } else {
          this.setState({
            message: 'Success.'
          })
        }
        console.log(data)
      })
    }
  }

  // ================================================================================
  // React render functions
  // ================================================================================
  render() {
    const { classes } = this.props
    return (
      <Grid container justify="center" alignItems="center">
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <IconCloudCircle />
            </ListItemIcon>
            <ListItemText
              primary={this.state.server}
              onClick={this.handleSwitch}
            />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <IconClear />
            </ListItemIcon>
            <ListItemText primary="Clear" onClick={this.handleClear} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <IconCast />
            </ListItemIcon>
            <ListItemText primary="Congnitive" onClick={this.handleCognitive} />
          </ListItem>
        </List>
        <TextField
          id="input-text"
          label="Input Text"
          multiline
          rows="4"
          value={this.state.textInput}
          onChange={this.handleInput}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="output-text"
          label="Results"
          multiline
          rows="4"
          value={this.state.message}
          className={classes.textField}
          margin="normal"
        />
      </Grid>
    )
  }
}

CognitiveVision.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(CognitiveVision))
