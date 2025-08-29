import type { Note } from "../types/note";
import axios from "axios";

let API_URL = "";
if (import.meta.env.VITE_MODE === "development") {
    API_URL = import.meta.env.VITE_LOCAL_API_URL;
}
if (import.meta.env.VITE_MODE === "production") {
    API_URL = import.meta.env.VITE_API_URL;
}


// export const getNotes = async ():Promise<Note[]> => {
//     const response = await fetch(`${API_URL}/todos`);
//     const data = await response.json();
//     return data.todos;
    
// }
export const getNotes = async (): Promise<Note[]> => {
    const {data} = await axios.get(`${API_URL}/todos`);
    return data.todos;
};

// export const createNote = async(title : string) => {
//     await fetch(`${API_URL}/create`,{
//         method: "POST",
//         headers: {
//             "Content-type" : "application/json"
//         },
//         body: JSON.stringify({ title }),
//     } );
// };

export const createNote = async (title: string) => {
    await axios.post(`${API_URL}/create`, { title }, { withCredentials: true });
}

// export const updateNote = async(id : string, title : string) => {
//     await fetch(`${API_URL}/todos/${id}`, {
//         method: "PUT",
//         headers: {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify({ title }),
//     })
// }
export const updateNote = async(id : string, title : string) => {
    await axios.put(`${API_URL}/todos/${id}`, { title }, {withCredentials : true});
}

// export const deleteNote = async(id : string) => {
//      await fetch(`${API_URL}/todos/${id}`, {
//         method: "DELETE",
//     })
// };

export const deleteNote = async(id : string)=> {
    await axios.delete(`${API_URL}/todos/${id}`, {withCredentials: true});
}
