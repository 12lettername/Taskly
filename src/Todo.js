import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
  Input,
} from "@mui/material";
import { React, useState } from "react";
import "./Todo.css";
import db from "./firebase";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fab from "@mui/material/Fab";
import Checkbox from "@mui/material/Checkbox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Todo(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };
  const updateCheck = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        check: !props.todo.check,
      },
      { merge: true }
    );
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Task
          </Typography>
          <Input
            value={input}
            placeholder={props.todo.todo}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button disabled={!input} onClick={updateTodo}>
            Update Task
          </Button>
        </Box>
      </Modal>
      <List className="todo_list">
        <ListItem>
          <ListItemText
            className="list_text"
            primary={props.todo.todo}
            secondary={props.todo.deadline}
          />
        </ListItem>
        <Checkbox onClick={updateCheck} {...label} checked={props.todo.check} />
        <Fab size="small" color="secondary" aria-label="edit">
          <EditIcon onClick={handleOpen}>Edit</EditIcon>
        </Fab>
        <Fab size="small" color="error" aria-label="edit">
          <DeleteForeverIcon
            onClick={(event) =>
              db.collection("todos").doc(props.todo.id).delete()
            }
          />
        </Fab>
      </List>
    </>
  );
}

export default Todo;
