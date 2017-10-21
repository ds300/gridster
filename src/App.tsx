import * as React from 'react'
import { Provider } from 'react-redux'
import styled from 'styled-components'

import ConnectedGrid from './ConnectedGrid'
import ConnectedControls from './ConnectedControls'

import { makeStore } from './store'

const logo = require('./Gridster-Logo.png')

const Page = styled.div`
  width: 480px;
  margin: 0 auto;
`

const Header = styled.div`
  margin: 50px 0 35px 0;
`

class App extends React.Component {
  store = makeStore()
  render() {
    return (
      <Provider store={this.store}>
        <Page>
          <Header>
            <img src={logo} alt="Gridster" width="225px" />
          </Header>
          <ConnectedControls />
          <ConnectedGrid />
        </Page>
      </Provider>
    )
  }
}

export default App
