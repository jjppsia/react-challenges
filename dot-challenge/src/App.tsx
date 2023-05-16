import { useReducer } from 'react'
import { initialDotState, reducer } from './state'

function App() {
  const [dots, dispatch] = useReducer(reducer, initialDotState)
  const { addedDots, dotsHistory } = dots

  return (
    <div className='bg-zinc-800 text-white flex flex-col h-screen'>
      <div
        className='relative border-b flex-grow'
        onClick={(e) =>
          dispatch({
            type: 'ADD_DOT',
            payload: {
              x: e.clientX,
              y: e.clientY,
            },
          })
        }
      >
        {addedDots.map((dot, index) => {
          return (
            <div
              key={index}
              className='absolute w-4 h-4 bg-slate-400 rounded-full transform -translate-x-1/2 -translate-y-1/2'
              style={{ left: dot.x, top: dot.y }}
            />
          )
        })}
      </div>
      <div className='space-x-4 w-full h-20 flex items-center justify-center'>
        <button
          className='border-2 rounded-xl p-2 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={addedDots.length === 0}
          onClick={() => dispatch({ type: 'UNDO' })}
        >
          Undo
        </button>
        <button
          className='border-2 rounded-xl p-2 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={dotsHistory.length === 0}
          onClick={() => dispatch({ type: 'REDO' })}
        >
          Redo
        </button>
        <button
          className='border-2 rounded-xl p-2 disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={addedDots.length === 0}
          onClick={() => dispatch({ type: 'CLEAR' })}
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default App
