
import './App.css';
import { useState, useEffect } from 'react'
import Axios from 'axios'

function App() {

  const [listOfUsers, setListOfUsers] = useState([])
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [username, setUsername] = useState("")


  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data)
    })
  }, [])

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser",
      {
        name: name,
        age: age,
        username: username
    }).then((response) => {
      setListOfUsers([...listOfUsers, {
        name: name,
        age: age,
        username: username
      }])
    })
  }


  return (
    <div className="App">
      <div className="user-form">
        <input type="text" placeholder="Name..." onChange={(event) => {
          setName(event.target.value)
        } }/>
        <input type="number" placeholder="Age..." onChange={(event) => {
          setAge(event.target.value)
        }}/>
        <input type="text" placeholder="Username..." onChange={(event) => {
          setUsername(event.target.value)
        }} />
        <div className="user-form-button">
          <button onClick={createUser}>Create User</button>
        </div>
      </div>
      <div className="user-display">
        {listOfUsers.map((user) => {
          return (
            <div className="card-container">
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Username: {user.username}</h1>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
