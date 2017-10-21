import * as React from 'react'
import { Provider } from 'react-redux'

import ConnectedGrid from './ConnectedGrid'

import { makeStore } from './store'

const logo = require('./Gridster-Logo.png')

class App extends React.Component {
  store = makeStore()
  render() {
    return (
      <Provider store={this.store}>
        <div>
          <img src={logo} alt="Gridster" />
          <ConnectedGrid />
        </div>
      </Provider>
    )
  }
}

export default App
