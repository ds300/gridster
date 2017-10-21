import * as React from 'react'
import styled from 'styled-components'

export type TileState = 'Clear' | 'Filled' | 'Start' | 'End'

export function generateRandomGrid(
  numRows: number,
  numColumns: number,
): TileState[] {
  const result = new Array<TileState>(numRows * numColumns)
  result.fill('Filled')
  const startRow = Math.floor(Math.random() * numRows)
  const endRow = Math.floor(Math.random() * numRows)

  result[startRow * numColumns] = 'Start'
  result[endRow * numColumns + (numColumns - 1)] = 'End'

  return result
}

function calculateShortestPathFromStartToEnd(
  grid: TileState[],
  numColumns: number,
): number[] | null {
  // Breadth-first search is absolutely fine for such small graphs.
  // No need to optimize prematurely.
  interface NodeRecord {
    previousNode: number
  }
  const encounteredNodes = new Array<NodeRecord>(grid.length)
  const startNode = grid.indexOf('Start')
  encounteredNodes[startNode] = { previousNode: -1 }

  const queue: number[] = [startNode]

  while (queue.length > 0) {
    const searchNode = queue.shift() as number
    const previousNode = encounteredNodes[searchNode].previousNode

    const nodeAbove = searchNode - numColumns
    const nodeBelow = searchNode + numColumns
    const nodeToTheRight =
      (searchNode + 1) % numColumns === 0 ? -1 : searchNode + 1
    const nodeToTheLeft = searchNode % numColumns === 0 ? -1 : searchNode - 1

    // this loop will be unrolled pretty quickly at runtime, I imagine.
    for (const adjacentNode of [
      // node above
      nodeAbove,
      nodeBelow,
      nodeToTheLeft,
      nodeToTheRight,
    ]) {
      if (
        adjacentNode > -1 &&
          adjacentNode < grid.length &&
        !encounteredNodes[adjacentNode]
      ) {
          encounteredNodes[adjacentNode] = { previousNode: searchNode }
        if (grid[adjacentNode] === 'Clear') {
          queue.push(adjacentNode)
        } else if (grid[adjacentNode] === 'End') {
          queue.push(adjacentNode)
          // finished, recover solution
          const reversedSolution = [searchNode]
          for (
            let _previousNode = previousNode;
            _previousNode !== startNode;
            _previousNode = encounteredNodes[_previousNode].previousNode
          ) {
            reversedSolution.push(_previousNode)
          }
          return reversedSolution.reverse()
        }
      }
    }
  }

  return null
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

export interface GridProps {
  tiles: TileState[]
  numColumns: number
  onTileClick(tileIndex: number): void
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
    const { tiles, numColumns, onTileClick } = this.props
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
          const column = index % numColumns
          return (
            <Tile
              key={index}
              style={{
                width: tileWidth + 'px',
                height: tileWidth + 'px',
                top: row * tileWidth + 'px',
                left: column * tileWidth + 'px',
              }}
              tileState={tileState}
              onClick={() => onTileClick(index)}
            />
          )
        })}
      </GridWrapper>
    )
  }
}
