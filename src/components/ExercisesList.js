import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ExercisesList(){
  const [exercises, setExercises] = useState([])
  const [exercisesEG, setExercisesEG] = useState([
    {username: "a",
    description: "test1",
    duration: "test1",
    date: "12/12/12",
    _id: "1111"}
  ])
  

  useEffect(() => {
    axios.get('http://localhost:5000/exercises/')
      .then(response => (setExercises(response.data)))
      // .then(response => {
      //   produce(exercises, draftexercise => {
      //     draftexercise.push(response)
      // })
      // })
      // .then(console.log(response.data))
      // .catch((error) => {
      //   console.log(error);
      // })
    
    //setExercises(response.data)
    //console.log(exercises)
  },[])

  function deleteExercise(id){
    axios.delete('http://localhost:5000/exercises/' + id)
      .then(response => { console.log(response.data)});

    setExercises([...exercises, exercises.filter(el => el._id !== id)])
  }


  function ExerciseList() {
    return (exercises.map(currentexercise => {

      const {username, description, duration, date, _id} =currentexercise
      return (
        <tr>
          <td>{username}</td>
          <td>{description}</td>
          <td>{duration}</td>
          <td>{date.substring(0,10)}</td>
          <td>
            <Link to={"/edit/"+_id}>edit</Link> | <a href="#" onClick={() => { deleteExercise(_id) }}>delete</a>
          </td>
        </tr>
      )
      
    })
  )}
  
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <ExerciseList/>
          </tbody>
        </table>
      </div>
    )
 
}