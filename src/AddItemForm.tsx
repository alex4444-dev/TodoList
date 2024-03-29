import { ControlPoint } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React from "react";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  console.log("AddItemForm is called")
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.charCode === 13) {
      addTask();
    }
  };

  const addTask = () => {
    if (title.trim() !== "") {
      props.addItem(title.trim());
      setTitle("");
    } else {
      setError("Title is required");
    }

  };

  return <div>
    <div>
      <TextField
        value={title}
        variant={'outlined'}
        label={'Type value'}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTask} color={"primary"}>
        <ControlPoint />
      </IconButton>
      {error && <div className="error-message">Field is required</div>}
    </div>
  </div>
})