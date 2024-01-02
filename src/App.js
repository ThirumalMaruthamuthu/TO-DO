import React,{useState,useEffect} from 'react'
import "./App.css";
import { FaCheck } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

function App() {
  const [isCompleteScreen,setIsCompleteScreen]=useState(false)
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription,setNewDescription] = useState("");
  const [completedTodo,setCompletedTodo] = useState([]);

  const handleAddTodo = ()=>{
    let newTodoItem={
      title:newTitle,  
      description:newDescription
    }
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
    
  };
  const handleDeleteTodo =(index)=>{
    let reducedTodo =[...allTodos];
    reducedTodo.splice (index);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos (reducedTodo);
  };
  const handleComplete=(index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() +1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd +'-'+ mm +'-'+ yyyy + ' at ' + h +':'+ m +':'+ s ;

    let filterdItem ={
      ...allTodos[index],
      completedOn:completedOn
    };
    let updatedCompletedArr = [...completedTodo];
    updatedCompletedArr.push(filterdItem);
    setCompletedTodo(updatedCompletedArr);
    handleDeleteTodo(index);
  };

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if (savedTodo){
      setTodos(savedTodo);
    }
  },[])
  

  return (
    <div className="App">
      <div>
        <h1>TO-DO LIST</h1>
        <div className="todo-wrap">
          <div className="todo-input">
            <div className="todo-input-item">
              <label>Title</label>
              <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="write the title" />
            </div>
            <div className="todo-input-item">
              <label>What should i do</label>
              <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What should i do" />
            </div>
            <div className="todo-input-item">
              <button type="button" onClick={handleAddTodo} className="primary-btn">
                Add
              </button>
            </div>
          </div>
          <div className="btn-area">
          <button className={`secondary-btn ${isCompleteScreen === false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>TO-DO's</button>
          <button className={`secondary-btn ${isCompleteScreen === true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>
        <div className="todo-list">

          {isCompleteScreen=== false && allTodos.map((item,index)=>{
            return(
              <div className="todo-list-item" key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            </div>
            <div>
            <FaCheck className='check-icon' onClick={()=>handleComplete(index)} title='complete?'/>
            <AiOutlineDelete className='delete-icon' onClick={()=>handleDeleteTodo(index)} title='delete?' />
            </div>
          </div>
          )
          })}
           {isCompleteScreen=== true && completedTodo.map((item,index)=>{
            return(
              <div className="todo-list-item" key={index}>
            <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p><small>completed on:{item.completedOn}</small></p>
            </div>
            <div>
            <AiOutlineDelete className='delete-icon' onClick={()=>handleDeleteTodo(index)} title='delete?' />
            </div>
          </div>
          )
          })}
        </div>
         
        </div>
        </div>
       
      </div>
    
  );
}

export default App;
