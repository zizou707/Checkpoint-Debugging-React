import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTasksContext } from '../hooks/useTasksContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  
  const { dispatch } = useTasksContext();

  const handleFilter = (e,dispatch) =>{
    const tasks = localStorage.getItem('tasks')
   if (!tasks || !Array.isArray[tasks]){
          console.error('error')
          return
    }
    if (e.target.value==="Active"){
      const AciveTasks= tasks.filter(t=>t.completed==="No");
      console.log(`active : ${AciveTasks}`);
      dispatch({type:'SET_TASKS',payload:AciveTasks})
    } else if (e.target.value==="Completed"){
      const CompletedTasks= tasks.filter(t=>t.completed==="Yes");
      console.log(`completed : `,CompletedTasks); 
      dispatch({type:'SET_TASKS',payload:CompletedTasks})}
else{
  console.log(e.target.value);
}
  
  }
  const handleClick = () => {
    logout()
  }
  
  return (
    <header>
      <div className="container">
        <select onChange={(e)=>handleFilter(e)}>
          <option>Active</option>
          <option>Completed</option>
        </select>
        <Link to="/">
          <h1>Todo App</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar