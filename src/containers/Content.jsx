import React from 'react'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views'

import CognitiveVision from '../componments/CognitiveVision'
import CognitiveText from '../componments/CognitiveText'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import withRoot from '../withRoot'

const TabContainer = ({ children, dir }) => {
  return (
    <Typography
      component="div"
      dir={dir}
      style={{
        paddingTop: '30px',
        paddingBottom: '80px',
        paddingLeft: '56px',
        paddingRight: '56px'
      }}>
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
}

const styles = theme => ({
  root: {
    marginTop: '-55vh',
    marginBottom: '60px',
    flex: 1
  },
  grid: {
    flexGrow: 1,
    width: '100%'
  },
  paper: {
    borderRadius: '2px'
  }
})

class Content extends React.Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render() {
    const { classes, theme } = this.props

    return (
      <main className={classes.root}>
        <Grid container className={classes.grid} justify="center" spacing={16}>
          <Grid item xs={10}>
            <Paper className={classes.paper}>
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                fullWidth>
                <Tab label="Computer Vision" />
                <Tab label="Face Detection" />
                <Tab label="LUIS" />
                <Tab label="Text Analytics" />
              </Tabs>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={this.state.value}
                onChangeIndex={this.handleChangeIndex}>
                <TabContainer dir={theme.direction}>
                  <CognitiveVision />
                </TabContainer>
                <TabContainer dir={theme.direction}>Face</TabContainer>
                <TabContainer dir={theme.direction}>LUIS</TabContainer>
                <TabContainer dir={theme.direction}>
                  <CognitiveText />
                </TabContainer>
              </SwipeableViews>
            </Paper>
          </Grid>
        </Grid>
      </main>
    )
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles, { withTheme: true })(Content))
