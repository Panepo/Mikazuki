import React from 'react'
import PropTypes from 'prop-types'
import * as func from './Cognitive.func'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'

const styles = theme => ({
  root: {},
  hidden: {
    display: 'none'
  }
})

class CognitiveText extends React.Component {
  state = {
    imageFile: [],
    imageWidth: 640,
    imageHeight: 360,
    imageLimit: 400
  }

  constructor(props) {
    super(props)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  // ================================================================================
  // React event handler functions
  // ================================================================================

  handleUpload = event => {
    const data = []

    for (let i = 0; i < event.target.files.length; i += 1) {
      let dataTemp
      if (event.target.files[i] != null) {
        dataTemp = URL.createObjectURL(event.target.files[i])
        data.push(dataTemp)
      }
    }

    if (data.length > 0) {
      this.setState({
        imageFile: data
      })
      const image = document.getElementById('inputImage')
      const canvas = document.getElementById('inputCanvas')
      const ctx = canvas.getContext('2d')

      image.onload = () => {
        ;[canvas.width, canvas.height] = func.limitWidthHeight(
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
      </div>
    )
  }
}

CognitiveText.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(CognitiveText))
