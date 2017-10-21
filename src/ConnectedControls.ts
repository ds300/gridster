import { connect, GRID_GENERATED } from './store'
import { generateRandomGrid } from './Grid'
import Controls from './Controls'

export default connect(
  () => ({}),
  dispatch => ({
    onGenerate(row: number, columns: number) {
      dispatch({
        type: GRID_GENERATED,
        payload: {
          grid: generateRandomGrid(row, columns),
          numColumns: columns,
        },
      })
    },
  }),
)(Controls)
