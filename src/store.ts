import { TileState } from './Grid'
import { generateRandomGrid } from './Grid'
import { createStore } from 'redux'
import { connect as reactReduxConnect } from 'react-redux'

export const TILE_CLICKED = 'TILE_CLICKED'
export const GRID_GENERATED = 'GRID_GENERATED'

type Action =
  | {
      type: typeof TILE_CLICKED
      payload: { tileIndex: number }
    }
  | {
      type: typeof GRID_GENERATED
      payload: { grid: TileState[]; numColumns: number }
    }

interface State {
  tiles: TileState[]
  numColumns: number
}

const initialState: State = {
  tiles: generateRandomGrid(10, 10),
  numColumns: 10,
}

function toggleTile(tiles: TileState[], index: number) {
  let newState: TileState
  switch (tiles[index]) {
    case 'Clear':
      newState = 'Filled'
      break
    case 'Filled':
      newState = 'Clear'
      break
    default:
      return tiles
  }
  const newTiles = tiles.slice(0)
  newTiles[index] = newState
  return newTiles
}

function reduce(state: State = initialState, action: Action) {
  switch (action.type) {
    case TILE_CLICKED:
      return {
        ...state,
        tiles: toggleTile(state.tiles, action.payload.tileIndex),
      }
    case GRID_GENERATED:
      return {
        tiles: action.payload.grid,
        numColumns: action.payload.numColumns,
      }
    default:
      return state
  }
}

export function makeStore() {
  return createStore(reduce)
}

// define own connect function to make app-speicific state and dispatch types
// available automatically
export function connect<
  StateProps,
  DispatchProps,
  Props = StateProps & DispatchProps
>(
  mapStateToProps: (state: State) => StateProps,
  mapDispatchToProps: (dispatch: (action: Action) => void) => DispatchProps,
): (
  component: React.ComponentClass<Props> | React.StatelessComponent<Props>,
) => React.ComponentClass
export function connect() {
  return reactReduxConnect.apply(null, arguments)
}
