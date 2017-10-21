import * as React from 'react'
import styled from 'styled-components'

type TileState = 'Clear' | 'Filled' | 'Start' | 'End'

export function generateRandomGrid(rows: number, cols: number) {
  const result = new Array<TileState>(rows * cols)
  result.fill('Filled')
  const startRow = Math.floor(Math.random() * rows)
  const endRow = Math.floor(Math.random() * rows)

  result[startRow * cols] = 'Start'
  result[endRow * cols + (cols - 1)] = 'End'

  return result
}

const isTileMutable = (tileState: TileState) =>
  tileState !== 'Start' && tileState !== 'End'

const tileColors: Record<TileState, string> = {
  Clear: 'white',
  Filled: '#f1f1f1',
  Start: '#7ed321',
  End: '#639530',
}

const tileBorderColor = '#d9d9d9'

interface GridProps {
  tiles: TileState[]
  numColumns: number
}

const IDEAL_GRID_WIDTH = 480

const GridWrapper = styled.div`
  background-color: papayawhip;
  position: relative;
  border: 0px solid ${tileBorderColor};
  border-top-width: 1px;
  border-left-width: 1px;
`

interface TileProps {
  tileState: TileState
}

const Tile = styled.div`
  position: absolute;
  border: 0px solid ${tileBorderColor};
  border-bottom-width: 1px;
  border-right-width: 1px;
  box-sizing: border-box;
  ${({ tileState }: TileProps) =>
    `
    background-color: ${tileColors[tileState]};

    ${isTileMutable(tileState) &&
      `
      &:hover {
        cursor: pointer;
        background-color: #f8f8f8;
      }
      &:active {
        background-color: #e2e2e2;
      }
    `}
  `};
`

export default class Grid extends React.Component<GridProps> {
  render() {
    const { tiles, numColumns } = this.props
    const tileWidth = Math.round(IDEAL_GRID_WIDTH / numColumns)

    return (
      <GridWrapper
        style={{
          width: tileWidth * numColumns + 'px',
          height: tileWidth * (tiles.length / numColumns) + 'px',
        }}
      >
        {tiles.map((tileState, index) => {
          const row = Math.floor(index / numColumns)
          const col = index % numColumns
          return (
            <Tile
              key={index}
              style={{
                width: tileWidth + 'px',
                height: tileWidth + 'px',
                top: row * tileWidth + 'px',
                left: col * tileWidth + 'px',
              }}
              tileState={tileState}
            />
          )
        })}
      </GridWrapper>
    )
  }
}
