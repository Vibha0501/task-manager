import React from "react";
import { Button } from "react-bootstrap";

function AddButton({ toggleModal }) {
  return (
    <Button className="bkg" onClick={toggleModal}>
      Add Task
    </Button>
  );
}

export default AddButton;
