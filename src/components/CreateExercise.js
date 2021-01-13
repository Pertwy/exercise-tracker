import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import {produce} from "immer"

export default function CreateExercise(){

  const [username, setusername] = useState("")
  const [description, setdescription] = useState("")
  const [duration, setduration] = useState(0)
  const [date, setdate] = useState(new Date())
  const [users, setusers] = useState([])
    const [exercise, setexercise] = useState(
      {username: "",
      description: "",
      duration: 0,
      date: new Date()})

// let testExercise = {
  //   username: "test1",
  //   description: "test2",
  //   duration: 111,
  //   date: new Date()}



  useEffect(() => {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          setusers(response.data.map(user => user.username))
          setusername(response.data[0].username)
        }
      })
      .catch((error) => {
        console.log(error);
      })

  },[])

  function onChangeUsername(e) {
    setusername(e.target.value)
    setexercise({...exercise,  username: e.target.value})
  //   produce(exercise, draftexercise => {
  //     draftexercise.username = (e.target.value)
  // })
}
    //setexercise({...exercise,  username: e.target.value})
  

  function onChangeDescription(e) {
    setdescription(e.target.value)
    setexercise({...exercise,  description: e.target.value})
  //   produce(exercise, draftexercise => {
  //     draftexercise.description = (e.target.value)
  // })
  }

  function onChangeDuration(e) {
    setduration(parseInt(e.target.value))
    setexercise({...exercise,  duration: parseInt(e.target.value)})
  //   produce(exercise, draftexercise => {
  //     draftexercise.duration = (e.target.value)
  // })
  }

  function onChangeDate(date) {
    setdate(date)
    setexercise({...exercise,  date: date})
  //   produce(exercise, draftexercise => {
  //     draftexercise.date = (date)
  // })
  }

  function onSubmit(e) {
    e.preventDefault();

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

    return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select 
            // ref="userInput"
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
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
}