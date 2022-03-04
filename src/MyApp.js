import React, { useState, useEffect } from "react";
import { StaticRouter, useParams, BrowserRouter, Link, Route, Routes, Outlet, useNavigate, Navigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Form from "./Form";
import axios from "axios";
import Home from "./Home";
import UserPage from "./UserPage";
import ErrorPage from "./ErrorPage";
import ReviewPage from "./ReviewPage";

function MyApp() {
  const [users, setUsers] = useState([]);

  const [nameData, setName] = useState({ user: ""});
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    fetchAll().then(result => {
      if (result) { setCharacters(result) }
    })
  }, [])
  

  async function fetchAll () {
    try {
      const response = await axios.get('http://localhost:5000/users')
      return response.data.users_list
    } catch (error) {
      // We're not handling errors. Just logging into the console.
      console.log(error)
      return false
    }
  }

  async function makePostCall (person) {
    try {
      const response = await axios.post('http://localhost:5000/users', person)
      return response
    } catch (error) {
      console.log(error)
      return false
    }
  }

  async function makeDeleteCall (id) {
    try {
      const response = await axios.delete('http://localhost:5000/users/' + id)
      return response
    } catch (error) {
      console.log(error)
      return false
    }
  }

  function updateList (person) {
    makePostCall(person).then(result => {
      if (result && result.status === 201) {
        setCharacters([...characters, result.data])
      }
    })
  }

  function addUser(user) {
    makePostCall(user).then((result) => {
      if (result && result.status === 201) setUsers([...users, result.data]);
    });
    ReactDOM.render(<UserPage userData = {user}/>, document.getElementById('root'));
}

  return (
    <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Navigate replace to = "/home" /> }/>

          <Route path='/form' element={ <Form handleSubmit={addUser}/> }/>
    
          <Route path='/home' element={ <Home />}/>

          <Route path='/user/*'/>

          <Route path='*' element={ <ErrorPage />}/>

          <Route path='/reviewPage'element={<ReviewPage />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default MyApp;
