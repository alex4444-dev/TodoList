import { useCallback } from "react";
import { FilterValuesType } from "./AppWithRedux";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import React from "react";
import { Task } from "./Task";



export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string
  title: string;
  tasks: Array<TaskType>;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
};

export const Todolist = React.memo(function (props: PropsType) {
  console.log("Todolist is called")
  const addTask = useCallback((title: string) => {
    props.addTask(title, props.id);
  }, [props.addTask, props.id])

  const removeTodolist = () => {
    props.removeTodolist(props.id)
  };


  const changeTodolistTitle = useCallback((title: string) => {
    props.changeTodolistTitle(props.id, title)
  }, [props.id, props.changeTodolistTitle]);

  const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
  const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
  const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

  let tasksForTodolist = props.tasks;

  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter(t => t.isDone === false)
  }

  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter(t => t.isDone === true)
  }

  return <div>
    <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
      <IconButton onClick={removeTodolist}>
        <Delete />
      </IconButton> </h3>
    <AddItemForm addItem={addTask} />
    <div>
      {
        props.tasks.map(t => <Task 
        task={t}
        changeTaskStatus={props.changeTaskStatus}
        changeTaskTitle={props.changeTaskTitle}
        removeTask={props.removeTask}
        todolistId={props.id}
        key={t.id}
      />)
      }
    </div>
    <div>
      <Button variant={props.filter === "all" ? "contained" : "text"}
        onClick={onAllClickHandler}>All</Button>
      <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
        onClick={onActiveClickHandler}>Active</Button>
      <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
        onClick={onCompletedClickHandler}>Completed</Button>
    </div>
  </div>
})
