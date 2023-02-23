import { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from './TodoList';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "completed" | "active";

function App() {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: true },
    { id: v1(), title: "Rest API", isDone: false },
    { id: v1(), title: "GraphQL", isDone: false }
  ])
  console.log(tasks);

  function removeTask(id: string){ 
    let filteredTasks = tasks.filter(t => t.id !== id )
    setTasks(filteredTasks)
  }
  function addTask(title: string){
    let newTask = { 
      id: v1(), 
      title: title, 
      isDone: false
    }
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  } 


  let [filter, setFilter] = useState<FilterValuesType>("all");

  let tasksForTodoList = tasks;

  

  if (filter === "completed"){
    tasksForTodoList = tasks.filter(t => t.isDone === true)
  }
  if (filter === "active"){
    tasksForTodoList = tasks.filter(t => t.isDone === false)
  }

  function changeFilter(value: FilterValuesType){
    setFilter(value);
  }
 

  

  return (
    <div className="App">
      <TodoList title="What to learn?" 
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}

      />
      
    </div>
  );
}



export default App;
