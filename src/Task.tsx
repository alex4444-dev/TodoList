import { ChangeEvent, useCallback } from "react";
import { TaskType } from "./Todolist";
import Checkbox from "@mui/material/Checkbox";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import React from "react";

type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
    removeTask: (taskId: string, todolistId: string) => void;
    task: TaskType
    todolistId: string
  }
  
  export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistId);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked;
      props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId)
    };
    const onTitleChangeHandler = useCallback((newValue: string) => {
      props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    }, [props.task.id, props.changeTaskTitle, props.todolistId])
  
  
  return <div key={props.task.id} className={props.task.isDone ? "is-done" : ' '}>
    <Checkbox
      checked={props.task.isDone}
      onChange={onChangeHandler}
    />
  
    <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
    <IconButton onClick={onClickHandler}>
      <Delete />
    </IconButton>
  </div>
  })