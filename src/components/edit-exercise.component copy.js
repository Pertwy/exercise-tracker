import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function EditExercise(props){
  
  const [username, setusername] = useState("")
  const [description, setdescription] = useState("")
  const [duration, setduration] = useState(0)
  const [date, setdate] = useState(new Date())
  const [users, setUsers] = useState([])
  const [exercise, setexercise] = useState(
    {username: "",
    description: "",
    duration: 0,
    date: new Date(),
  })
  const [users, setUsers] = useState([])
  
  

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/'+props.match.params.id)
      .then(response => {
        setexercise({...exercise,  username:  response.data.username})
        setexercise({...exercise,  description: response.data.description})
        setexercise({...exercise,  duration: parseInt(response.data.duration)})
        setexercise({...exercise,  date: new Date(response.data.date)})
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username))
        }
      })
      .catch((error) => {
        console.log(error);
      })

  },[])

  function onChangeUsername(e) {
    setusername(e.target.value)
    setexercise({...exercise,  username: e.target.value})
}
 

  function onChangeDescription(e) {
    setdescription(e.target.value)
    setexercise({...exercise,  description: e.target.value})
  }

  function onChangeDuration(e) {
    setduration(parseInt(e.target.value))
    setexercise({...exercise,  duration: parseInt(e.target.value)})
  }

  function onChangeDate(date) {
    setdate(date)
    setexercise({...exercise,  date: date})
  }

  function onSubmit(e) {
    e.preventDefault();

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }


  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={username}
              onChange={onChangeUsername}>
              {
                users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={description}
              onChange={onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={duration}
              onChange={onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={date}
              onChange={onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
}