import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './component/card.css'
import './app.css'


const App = () => {
  const [notes, setNotes] = useState([]);
  const [editId, seteditId] = useState(null);
  const textRef = useRef()
  const desRef = useRef()

  function fetchData() {
    axios.get("https://backend-cohort2-0-0t3r.onrender.com/api/notes")
    .then((res)=>{
      // console.log(res);
      setNotes(res.data.notes)
    })
  }

  useEffect(()=>{
    fetchData()
  }, [])

  function submithandler(e) {
    e.preventDefault();
    // console.log(e.target.elements.title.value);
  
    axios.post("https://backend-cohort2-0-0t3r.onrender.com/api/notes", {
      title: e.target.elements.title.value,
      description: e.target.elements.description.value
    })

    fetchData();
  }

  function deletehandler(e) {
    let _id = e.target.className;
    axios.delete(`https://backend-cohort2-0-0t3r.onrender.com/api/notes/${_id}`)
    .then(()=>{ 
      console.log(_id);
      delete notes._id == _id;
      // alert("Note Deleted Successfully")
    })
    fetchData();
  }

  
  function updatehandler(e) {

    let idx = e.target.className;

    if(e.target.innerText === 'Save'){
      seteditId(idx)
    }else{
      handleSave(idx)
      seteditId(null)
    }
    
  }


  function handlechanges1(e, id){
    textRef.current = e.target.innerText;
    
    axios.patch(`https://backend-cohort2-0-0t3r.onrender.com/api/notes/${id}`,{
      title: textRef.current,
    })

    fetchData()
    
  };

  function handlechanges2(e){
    desRef.current = e.target.innerText;
  };

  function handleSave(id) {
    axios.patch(`https://backend-cohort2-0-0t3r.onrender.com/api/notes/${id}`,{
      description: desRef.current,
    }).then(()=>{
      fetchData()
    })
  }
  

  return (
    <div className='container'>
      <div className='sub-con-1'>
        <form onSubmit={(e)=>{
            submithandler(e)
          }
        }>
          <input name='title' className='noteTit' type="text" placeholder='Title goes here' />
          <input name='description' className='noteDes' type="text" placeholder='Description goes here'/>
          <button>Create</button>
        </form>
      </div>
      <div className='sub-con-2'>
        {notes.map((elem, idx)=>{

          const isEditing = editId === elem._id;
          
          return<div key={idx} className='card'>
                <h2 
                  ref={textRef}
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onInput={(e)=>{
                     handlechanges1(e, elem._id)
                    }
                  }
                >{elem.title}</h2>
                <p
                  ref={desRef}
                  contentEditable={isEditing}
                  suppressContentEditableWarning={true}
                  onInput={(e)=>{
                     handlechanges2(e, elem._id)
                    }
                  }
                >{elem.description}</p>

                <div className="btn">
                  <button className={elem._id} onClick={(e)=>{
                    deletehandler(e)
                  }} id='delete'>Delete</button>
                  <button className={elem._id} onClick={(e)=>{
                    updatehandler(e)
                  }} id='update'>{(isEditing) ? 'Save': 'Update'}</button>
                </div>
              </div>
        })}
      </div>
      
    </div>
  )
}

export default App

 