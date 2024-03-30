import React, { useState } from "react";
import { Card, Dropdown, Button } from "react-bootstrap";
import EditTaskModal from "./EditTaskModal";
export default function Task({ task, onDelete,onEdit }) {
  const { title, description, status, assignee, priority } =
    task;

  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = () => {
    setShowEditModal(true);
  };
 

  const handleDelete = () => {
    // Logic to handle delete task
    onDelete(); 
  };
const renderDeleteOption = () => {
  if (status === "Completed") {
    return (
      <Dropdown.Item disabled>
        Delete Task (Completed tasks cannot be deleted)
      </Dropdown.Item>
    );
  } else {
    return <Dropdown.Item onClick={handleDelete}>Delete Task</Dropdown.Item>;
  }
};
  return (
    <>
      <Card className="mt-1" style={{ backgroundColor: "#f3f1f2" }}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>{title}</span>
          <Button className="bkg" size="sm">
            {priority}
          </Button>
        </Card.Header>
        <Card.Body>
          <p>
            <small>{description}</small>
          </p>
          <p className="d-flex justify-content-between align-items-center">
            <strong>@</strong> {assignee}
            <Dropdown size="sm">
              <Dropdown.Toggle className="bkg" id="dropdown-basic">
                &#8942;
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEdit}>Edit Task</Dropdown.Item>
                {renderDeleteOption()}
              </Dropdown.Menu>
            </Dropdown>
          </p>
          <button className="bkg">{status}</button>
        </Card.Body>
      </Card>
      <EditTaskModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        onSubmit={onEdit} // Pass the onEdit function to handle the edited task
        task={task}
      />
    </>
  );
}
