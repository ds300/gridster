import { connect, TILE_CLICKED } from './store'
import Grid from './Grid'

export default connect(
  ({ tiles, numColumns }) => ({ tiles, numColumns }),
  dispatch => ({
    onTileClick(tileIndex: number) {
      dispatch({ type: TILE_CLICKED, payload: { tileIndex } })
    },
  }),
)(Grid)
