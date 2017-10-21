import * as React from 'react'
import { Provider } from 'react-redux'

import ConnectedGrid from './ConnectedGrid'

import { makeStore } from './store'

class App extends React.Component {
  store = makeStore()
  render() {
    return (
      <div>
        <Provider store={this.store}>
          <ConnectedGrid />
        </Provider>
      </div>
    )
  }
}

export default App
