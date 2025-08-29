import React, { useEffect, useState } from 'react'
import { getNotes, createNote, deleteNote, updateNote } from '../services/note';
import type { Note } from '../types/note';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { Link } from 'react-router';


const NoteList = () => {
    const [notes, setNotes] = React.useState<Note[]>([]);
    const [msg, setMsg] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState("");

    const userInfo = useSelector((state: RootState)=> state.auth.userInfo);

    const makeRefresh = () => {
       setRefresh(!refresh);
    }
    useEffect(()=> {
        const fetchNotes = async () => {
            const data = await getNotes();
            try {
              setNotes(data);
            } catch (error) {
              throw new Error("Failed to fetch notes");
            }
        };
        fetchNotes();
    },[refresh])
    const submitHandler =async (e: React.FormEvent)=> {
      e.preventDefault();
      if (msg.trim().length === 0){
        return;
      }
      try {
        if (editMode){
          await updateNote(editId, msg);
          setEditMode(false);
        }
        else{
          await createNote(msg);
          
        }
        setMsg("");
        makeRefresh();
      } catch (error) {
         throw new Error("Failed to add note");
        
      }
    };

    const handleMoodChange = (title : string, id : string) => {
      setEditMode(true);
      setMsg(title);
      setEditId(id);
    };

   const handleDeleteNote = async(id : string) => {
      try {
        await deleteNote(id);
        makeRefresh();
      } catch (error) {
        throw new Error("Failed to delete note");
      }
    };

  return (
    <div>
      <h2 className='text-xl font-bold my-3'>Shares</h2>
      <ul>
        {
          notes.map((note, index) => 
          <li key={index} className='flex items-center justify-between my-2'>
            <p className=' font-semibold'>{note.title}</p> 
            <div className='flex gap-2'>
             {
              note.userId === userInfo?._id && (
                <>
                   <button type='button' onClick={()=>handleDeleteNote(note._id)}
                  className='text-white bg-red-500 hover:bg-red-600 border rounded-sm py-2 px-4 text-sm transition-colors duration-200'>Delete</button>
                  <button type='button' onClick={()=>handleMoodChange(note.title, note._id)}
                  className='text-white bg-blue-500 hover:bg-blue-600 border rounded-sm py-2 px-4 text-sm transition-colors duration-200'>Edit</button></>
              )
             }
            </div>
          </li>)
        }
      </ul>
      <>
      {
        userInfo ? <form onSubmit={submitHandler}>
        <input type='text' value={msg} onChange={(e) => setMsg(e.target.value)}
        className='border border-gray-300 rounded-md p-2 mr-2.5'></input>
        <button type='submit' className='text-white bg-purple-500 border rounded-sm py-2 px-4'>{editMode ? "Update" : "Create"}</button>
      </form> : 
      <p className='border-2 font-serif w-fit px-4 py-2 text-white bg-teal-950 '>
        <Link to={"/login"} className='font-semibold underline text-pink-600'>Login</Link> You must be logged in to create or edit notes.</p>
      }
      </>
    </div>
  )
}

export default NoteList