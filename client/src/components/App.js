import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LandingPage } from './LandingPage'

const theme = {
  main: {
    colors: {
      medium: '#403075',
      light: '#887CAF',
      medium_light: '#615192',
      medium_dark: '#261758',
      dark: '#13073A',
    }
  }
};

const App = ({ store }) => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
          <Route exact path="/" component={LandingPage}/>
      </Router>
    </ThemeProvider>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App
