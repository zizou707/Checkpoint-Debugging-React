import { createContext, useEffect, useReducer } from 'react'

export const TasksContext = createContext()

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS': 
      return {
        tasks: action.payload
      }
    case 'CREATE_TASK':
      return {
        tasks: [action.payload, ...state.tasks]
      }
    case 'DELETE_TASK':
      return {
        tasks: state.tasks.filter((t) => t._id !== action.payload._id)
      }
     
    default:
      return state
  }
}



export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, {
    tasks: []
  })
  useEffect(()=>{
   localStorage.setItem('tasks',JSON.stringify(state.tasks))
  },[state])

  return (
    <TasksContext.Provider value={{...state, dispatch}}>
      { children }
    </TasksContext.Provider>
  )
}