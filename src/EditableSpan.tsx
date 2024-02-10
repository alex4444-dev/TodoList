import { TextField } from "@mui/material"
import React from "react"
import { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}
export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    console.log("EditableSpan is called")
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState(props.value)

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value)

    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode
        ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
})
