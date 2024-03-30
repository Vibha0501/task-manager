import React, { useState } from "react";
import { Modal, Button, Form, Col, Row, Card } from "react-bootstrap";
import "./App.css";

function Task({ task, onDelete }) {
  const { title, description, startDate, endDate, status, assignee, priority } =
    task;

  return (
    <div className="task card">
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{description}</p>
        <p>
          <strong>Assignee:</strong> {assignee}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Priority:</strong> {priority}
        </p>
        <p>
          <strong>Start Date:</strong> {startDate}
        </p>
        {endDate && (
          <p>
            <strong>End Date:</strong> {endDate}
          </p>
        )}
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}


function App() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    assignee: "",
    priority: "",
    fromDate: "",
    toDate: "",
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const addTask = (task) => {
    const newTaskList = [
      ...tasks,
      {
        ...task,
        startDate: new Date().toLocaleDateString(),
        status: "Pending",
      },
    ];
    setTasks(newTaskList);
  };

  const deleteTask = (index) => {
    const newTaskList = [...tasks];
    newTaskList.splice(index, 1);
    setTasks(newTaskList);
  };

  const allStatus = [
    "Pending",
    "In Progress",
    "Completed",
    "Deployed",
    "Deferred",
  ];

  // Group tasks by status
  const groupedTasks = tasks.reduce((grouped, task) => {
    const status = task.status;
    if (!grouped[status]) {
      grouped[status] = [];
    }
    grouped[status].push(task);
    return grouped;
  }, {});

  const applyFilters = (task) => {
    const { assignee, priority, fromDate, toDate } = filters;

    if (assignee && task.assignee.toLowerCase() !== assignee.toLowerCase())
      return false;
    if (priority && task.priority !== priority) return false;
    if (fromDate && new Date(task.startDate) < new Date(fromDate)) return false;
    if (toDate && new Date(task.startDate) > new Date(toDate)) return false;

    return true;
  };

  const filteredTasks = tasks.filter(applyFilters);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h1>Task Tracker</h1>
          {/* Add Task Button */}
          <Button variant="primary">Add Task</Button>
        </div>
      </div>
      {/* Filter Section */}
      <div className="row mt-3">
        <div className="col">
          <h3>Filters</h3>
          {/* Filters Form */}
          <form>
            <div className="mb-3">
              <label htmlFor="assignee" className="form-label">
                Assignee
              </label>
              <input type="text" className="form-control" id="assignee" />
            </div>
            <div className="mb-3">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <select className="form-select" id="priority">
                <option value="">Select Priority</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="fromDate" className="form-label">
                From Date
              </label>
              <input type="date" className="form-control" id="fromDate" />
            </div>
            <div className="mb-3">
              <label htmlFor="toDate" className="form-label">
                To Date
              </label>
              <input type="date" className="form-control" id="toDate" />
            </div>
            <Button variant="primary" type="submit">
              Apply Filters
            </Button>
          </form>
        </div>
      </div>
      {/* Task List */}
      <div className="row mt-3">
        {filteredTasks.map((task, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <Task task={task} onDelete={() => deleteTask(index)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
