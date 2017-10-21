import * as React from 'react'
import Grid, { randomTiles } from './Grid'

const tiles = randomTiles(9, 9)

class App extends React.Component {
  render() {
    return (
      <div>
        <Grid numColumns={9} tiles={tiles} />
      </div>
    )
  }
}

export default App
