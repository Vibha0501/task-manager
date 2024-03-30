import React, { useState } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";

export default function EditTaskModal({ show, onHide, onSubmit, task }) {
  
  const [newTask, setNewTask] = useState(task);
  

  const handleStatusChange = (e) => {
    setNewTask({
      ...newTask,
      status: e.target.value,
    });
  };
  const handlePriorityChange = (e) => {
    setNewTask({
      ...newTask,
      priority: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    // Logic to handle submission of edited task
    if (newTask.status === "Completed") {
      // If the status is being changed to "Completed", set the endDate to the current date
      setNewTask({
        ...newTask,
        endDate: new Date().toLocaleDateString(),
      });
    }
    
    onSubmit(newTask);
    onHide(); // Close the modal
  };

 const handleReset = () => {
   setNewTask(task); // Reset the newTask state to the original task
 };

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Title
            </Form.Label>
            <Col sm="9">
              <Form.Control type="text" value={task.title} readOnly />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Description
            </Form.Label>
            <Col sm="9">
              <Form.Control as="textarea" value={task.description} readOnly />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Start Date
            </Form.Label>
            <Col sm="9">
              <Form.Control type="text" value={task.startDate} readOnly />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Assignee
            </Form.Label>
            <Col sm="9">
              <Form.Control type="text" value={task.assignee} readOnly />
            </Col>
          </Form.Group>

          

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Status
            </Form.Label>
            <Col sm="9">
              <Form.Control
                as="select"
                value={newTask.status}
                onChange={handleStatusChange}
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
                <option>Deployed</option>
                <option>Deferred</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Priority
            </Form.Label>
            <Col sm="9">
              <Form.Control
                as="select"
                value={newTask.priority}
                onChange={handlePriorityChange}
              >
                <option>P0</option>
                <option>P1</option>
                <option>P2</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
