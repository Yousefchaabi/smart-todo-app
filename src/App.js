import { useEffect, useRef, useState } from 'react';
import './App.css';
import Logo from "./assets/logo.png"
import Filter from "./components/Filter"
import { useGlobalContext } from './context/appContext';
import { DeleteModal } from './components/DeleteModal';
import { Alert } from './components/Alert';
import { TodoList } from './components/TodoList';
import { BsPencil } from 'react-icons/bs';

function App() {
   // All necessary states
   const [text, setText] = useState('')
   const [isEditing, setIsEditing] = useState(false)
   const [editID, setEditId] = useState(null)
   const editRef = useRef()
 
   const {
     isModalOpen,
     tasks,
     setTasks,
     filterdTasks,
     showAlert,
     alert,
     setAlert,
   } = useGlobalContext();

   // Form submit handler method 
   const submitHandler = (e) => {
    // reset default behavior
    e.preventDefault();

    if (!text) {
      showAlert(true,'Field is required', 'danger')
    }else if(text && isEditing) {
      //update the item and states 
      const updatedTasks = tasks.map((item) => {
        if (item.id === editID) {
          return {
            ...item,
            title: text,
            createdAt: new Date(),
            complete: false
          }
        } else {
          return item
        }
      })
      setTasks(updatedTasks)
      setText('')
      setEditId(null)
      setIsEditing(false)

      //update item alert 
      setAlert({show: true, msg:'updated successfully', type:'success'})
    } else {
      //Add item
      const newTask = {
        id: tasks.length + 1,
        createdAt: new Date(),
        complete: false,
        title: text,
      }
      setTasks([newTask, ...tasks])
      setText('')

      // Success Alert
      showAlert(true, 'Added successfully!', 'success')
    }
   }

   // edit specific task 

   const editHandler = (id) => {
    const specificItem = tasks.find((item) => item.id === id )
    setIsEditing(true)
    setEditId(id)
    setText(specificItem.title)
   }


  useEffect(() => {
    if (editRef.current) {
      const end = editRef.current.value.length
      editRef.current.setSelectionRange(end, end)
      editRef.current.focus()
    }
  }, [isEditing])
  return (
    <section className="wa_todo-list">
      {isModalOpen && <DeleteModal />}
      <div className='wa__wrapper'>
        <div className='wa__header'>
          <div className='wa__logo-area'>
            <div style={{ width: '148px' }}>
              <img width={'100%'} src={Logo} alt='to do list' />
            </div>
          </div>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={tasks} />
          )}
          <Filter />
        </div>
        <div className='wa_body'>
        {filterdTasks.length > 0 ? (
            <TodoList filterdTasks={filterdTasks} editHandler={editHandler} />
          ) : (
            <p className='wa_empty'>No item found!</p>
          )}
        </div>
        <div className='wa_footer'>
        <form onSubmit={submitHandler}>
          <div className='wa_form-group'>
            <div>
              <BsPencil fill='#fff' />
            </div>
            <div className='wa_form-control'>
              <input
              ref={editRef}
                className='wa_input-control'
                type='text'
                placeholder='Enter task'
                value={text}
                onChange={(e)=> {
                  setText(e.target.value)
                }}
              />
              <button className='wa_btn'>{isEditing ? 'Update' : 'Add Item'}</button> 
            </div>
          </div>
        </form>
      </div>
      </div>
    </section>
  );
}

export default App;
