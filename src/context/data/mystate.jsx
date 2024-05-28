import React, { useState } from 'react'
import mycontext from './mycontext'
import toast from 'react-hot-toast'

function Mystate(props) {


   const [loading, setloading] = useState(false)

   const [allnotes, setallnotes] = useState([])

   const getallnotes = async () => {
    setloading(true)

    try {
      const res = await fetch(`http://localhost:4000/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
      
    const notesdata =await res.json();
    console.log(notesdata);
    setallnotes(false)
    setloading(false)


    } catch (error) {
      console.log(error);
      setloading(false)
    }
   }


   const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');

  //* Add note Function
    const addNote = async () => {
      const res = await fetch(`http://localhost:4000/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag })
      });
  
      const noteData = await res.json();
      
    getallnotes()
  
      //* condition 
      if (noteData.error) {
        toast.error(noteData.error)
        // console.log(noteData.error)
      } else {
        toast.success(noteData.success);
        // console.log(noteData.success)
      }
  
      //* after submit data all fields empty
      setTitle("");
      setDescription("");
      setTag("");
  
    }
  

  return (
    <mycontext.Provider value={{allnotes , getallnotes ,loading ,
    title, setTitle, description, 
      setDescription, tag, setTag,
      addNote
    }}>
    {props.children}

    </mycontext.Provider>
  )
}
export default Mystate