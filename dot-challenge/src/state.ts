import { Reducer } from 'react'

type Dot = {
  x: number
  y: number
}

type DotState = {
  addedDots: Dot[]
  dotsHistory: Dot[]
}

type Action =
  | {
      type: 'ADD_DOT'
      payload: Dot
    }
  | {
      type: 'UNDO' | 'REDO' | 'CLEAR'
    }

export const initialDotState: DotState = {
  addedDots: [],
  dotsHistory: [],
}

export const reducer: Reducer<DotState, Action> = (state, action): DotState => {
  const { addedDots, dotsHistory } = state

  switch (action.type) {
    case 'ADD_DOT':
      return {
        ...state,
        addedDots: [...addedDots, action.payload],
      }
    case 'UNDO':
      return {
        ...state,
        addedDots: addedDots.slice(0, -1),
        dotsHistory: [...dotsHistory, addedDots[addedDots.length - 1]],
      }
    case 'REDO':
      return {
        ...state,
        addedDots: [...addedDots, dotsHistory[dotsHistory.length - 1]],
        dotsHistory: dotsHistory.slice(0, -1),
      }
    case 'CLEAR':
      return initialDotState
    default:
      return state
  }
}
