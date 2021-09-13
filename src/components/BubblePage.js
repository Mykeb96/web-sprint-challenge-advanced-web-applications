import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import fetchColorService from '../services/fetchColorService';
import axiosWithAuth from "../helpers/axiosWithAuth";
import axios from 'axios'




const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editColor, setEditColor] = useState()


  useEffect(() => {
    fetchColorService()
      .then(res => { setColors(res.data) })
      .catch(err => { console.log(err) })
  }, [])


  const toggleEdit = (value) => {
    setEditing(value);
  };


  const saveEdit = (editColor) => {
    axiosWithAuth().put(`http://localhost:5000/api/colors/${editColor.id}`, editColor)
      .then(res => setColors(
        colors.map(color => {
          if (color.id === res.data.id) {
            return res.data
          }
          else {
            return color
          }
        })
      ))
      .catch(err => { console.log(`editing error:`, err) })
  };


  const deleteColor = (colorToDelete) => {
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${colorToDelete.id}`)
      .then(res => console.log(res.data))
      .then(res => setColors(colors.filter(color => parseInt(color.id) !== parseInt(colorToDelete.id))))
      .catch(err => { console.log(err) })
  };


  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor} editColor={editColor} editColor={editColor} />
      <Bubbles colors={colors} />
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions