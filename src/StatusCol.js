import React from "react";
import { Card } from "react-bootstrap";
import Task from "./Task";

function TaskColumn({ status, tasks, deleteTask, onEditTask }) {
  const getStatusColorClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-pending"; 
      case "In Progress":
        return "bg-in-progress";
      case "Completed":
        return "bg-completed";
      case "Deployed":
        return "bg-deployed";
      case "Deferred":
        return "bg-deferred";
      default:
        return ""; 
    }
  };
  return (
    <div
      className="col"
      style={{
        padding: "0 10px",
        minHeight: "500px",
        overflowY: "auto", // Enable vertical scrolling if content exceeds the height
      }}
    >
      <Card
        style={{
          height: "500px !imp",
        }}
      >
        <Card.Header className={`${getStatusColorClass(status)}`}>
          {status}
        </Card.Header>
        <Card.Body style={{ minHeight: "500px" }}>
          {tasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              onDelete={() => deleteTask(index)}
              onEdit={onEditTask}
            />
          ))}
        </Card.Body>
      </Card>
    </div>
  );
}

export default TaskColumn;
