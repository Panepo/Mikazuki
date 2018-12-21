import React from 'react'
import PropTypes from 'prop-types'
import { configVision } from '../cognitive/Cognitive.config'
import { fetchApi, limitWidthHeight } from '../cognitive/Cognitive.func'
import MucText from './MucText'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
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
  }
})

class CognitiveText extends React.Component {
  state = {
    imageFile: [],
    imageFile2: [],
    imageWidth: 640,
    imageHeight: 360,
    imageLimit: 400,
    isError: false,
    message: '',
    results: {}
  }

  constructor(props) {
    super(props)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleCognitive = this.handleCognitive.bind(this)
  }

  // ================================================================================
  // React event handler functions
  // ================================================================================

  handleUpload = event => {
    const data = []
    const dataFile = []
    for (let i = 0; i < event.target.files.length; i += 1) {
      let dataTemp
      if (event.target.files[i] != null) {
        dataTemp = URL.createObjectURL(event.target.files[i])
        data.push(dataTemp)
        dataFile.push(event.target.files[i])
      }
    }

    if (data.length > 0) {
      this.setState({
        imageFile: data,
        imageFile2: dataFile
      })
      const image = document.getElementById('inputImage')
      const canvas = document.getElementById('inputCanvas')
      const ctx = canvas.getContext('2d')

      image.onload = () => {
        ;[canvas.width, canvas.height] = limitWidthHeight(
          image.naturalWidth,
          image.naturalHeight,
          this.state.imageLimit
        )

        ctx.drawImage(
          image,
          0,
          0,
          image.naturalWidth,
          image.naturalHeight,
          0,
          0,
          canvas.width,
          canvas.height
        )
        this.setState({
          imageWidth: image.naturalWidth,
          imageHeight: image.naturalHeight
        })
      }
    } else {
      this.setState({
        imageFile: []
      })
    }
  }

  handleClear = () => {
    this.setState({
      imageFile: []
    })
    const canvasi = document.getElementById('inputCanvas')
    const ctxi = canvasi.getContext('2d')
    ctxi.clearRect(0, 0, this.state.imageWidth, this.state.imageHeight)

    // const canvaso = document.getElementById('outputCanvas')
    // const ctxo = canvaso.getContext('2d')
    // ctxo.clearRect(0, 0, 256, 256)
  }

  // ================================================================================
  // Cognitive service
  // ================================================================================

  handleCognitive = () => {
    if (this.state.imageFile2.length > 0) {
      fetchApi(this.state.imageFile2[0], 'mscs', configVision).then(data => {
        if (data.err) {
          this.setState({
            message: 'An error occured.'
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

  renderButton = () => {
    const { classes } = this.props
    const renderClear = () => {
      if (this.state.imageFile.length > 0) {
        return (
          <Button color="primary" onClick={this.handleClear}>
            Clear
          </Button>
        )
      }
    }

    const renderCognitive = () => {
      if (this.state.imageFile.length > 0) {
        return (
          <Button color="primary" onClick={this.handleCognitive}>
            Analysis
          </Button>
        )
      }
    }

    return (
      <div>
        <Button color="primary" component="label">
          Select Image
          <input
            className={classes.hidden}
            type="file"
            accept="image/*"
            onChange={this.handleUpload}
            required
          />
        </Button>
        {renderClear()}
        {renderCognitive()}
      </div>
    )
  }

  renderImage = () => {
    return (
      <div>
        <img
          className={this.props.classes.hidden}
          id="inputImage"
          src={this.state.imageFile[0]}
          width="100%"
          height="100%"
          alt={this.state.text}
        />
        <Grid container justify="center" alignItems="center">
          <canvas className={this.props.classes.canvas} id="inputCanvas" />
        </Grid>
      </div>
    )
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        {this.renderButton()}
        <Divider className={classes.border} />
        {this.renderImage()}
        <Divider className={classes.border} />
        <MucText
          modelId="text-message"
          modelLabel="Message"
          modelValue={this.state.message}
        />
      </div>
    )
  }
}

CognitiveText.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(CognitiveText))
