import React, { useState } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import Filter from "./Filter";
import AddButton from "./AddButton";
import TaskColumn from "./StatusCol";
import AddTaskModal from "./AddTaskModal";
import "./App.css";
function App() {
  const [tasks, setTasks] = useState([
    {
      title: "Task 1",
      description: "This is a dummy task kept to check the functionality of code",
      startDate: new Date().toLocaleDateString(),
      status: "Pending",
      assignee: "John Doe",
      priority: "P1",
    },
  ]);
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
const editTask = (editedTask) => {
  // Logic to edit the task
  console.log(editedTask);
  const updatedTasks = tasks.map((task) =>
    task.title === editedTask.title ? editedTask : task
  );
  setTasks(updatedTasks);
};
  const deleteTask = (index) => {
    const newTaskList = [...tasks];
    newTaskList.splice(index, 1);
    setTasks(newTaskList);
  };

  const applyFilters = (task) => {
    const { assignee, priority, fromDate, toDate } = filters;

    if (assignee && task.assignee.toLowerCase() !== assignee.toLowerCase())
      return false;
    if (priority && task.priority !== priority) return false;
    if (fromDate && new Date(task.startDate) < new Date(fromDate)) return false;
    if (toDate && new Date(task.startDate) > new Date(toDate)) return false;

    return true;
  };

  const filteredTasks = tasks.filter(applyFilters); // Apply filters here
 const sortByPriority = () => {
   setTasks(
     [...tasks].sort((a, b) => {
       const priorityOrder = { P0: 0, P1: 1, P2: 2 };
       return priorityOrder[a.priority] - priorityOrder[b.priority];
     })
   );
 };

 const sortByStartDate = () => {
   setTasks(
     [...tasks].sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
   );
 };

 const sortByEndDate = () => {
   setTasks(
     [...tasks].sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
   );
 };
  const allStatuses = [
    "Pending",
    "In Progress",
    "Completed",
    "Deployed",
    "Deferred",
  ];

  // Group tasks by status
  const groupedTasks = allStatuses.reduce((grouped, status) => {
    grouped[status] = filteredTasks.filter((task) => task.status === status);
    return grouped;
  }, {});

 return (
   <div>
     <h1 className="App-header">Task Tracker</h1>
     <Container className="mt-5 border border-white border-5 rounded">
       <Row>
         <Col xs={12} sm={12} md={12} lg={12} xl={12}>
           <div className="p-4">
             <Row className="align-items-center">
               <Col xs={12} sm={12} md={10} lg={10} xl={10}>
                 <Filter filters={filters} onFiltersChange={setFilters} />
               </Col>
               <Col xs={12} sm={12} md={2} lg={2} xl={2}>
                 <AddButton toggleModal={toggleModal} />
               </Col>
             </Row>
             <Row className="align-items-center mt-3 mb-3">
               <Col xs={12} sm={12} md={2} lg={2} xl={2}>
                 <h5>Sort By:</h5>
               </Col>
               <Col xs={12} sm={12} md={2} lg={2} xl={2}>
                 <Dropdown>
                   <Dropdown.Toggle className="bkg">Sort By</Dropdown.Toggle>
                   <Dropdown.Menu>
                     <Dropdown.Item onClick={sortByPriority}>
                       Priority
                     </Dropdown.Item>
                     <Dropdown.Item onClick={sortByStartDate}>
                       Start Date
                     </Dropdown.Item>
                     <Dropdown.Item onClick={sortByEndDate}>
                       End Date
                     </Dropdown.Item>
                   </Dropdown.Menu>
                 </Dropdown>
               </Col>
             </Row>
             <Row>
               {allStatuses.map((status) => (
                 <TaskColumn
                   key={status}
                   status={status}
                   tasks={groupedTasks[status] || []}
                   deleteTask={deleteTask}
                   onEditTask={editTask}
                 />
               ))}
             </Row>
             <AddTaskModal
               show={showModal}
               onHide={toggleModal}
               onSubmit={addTask}
             />
           </div>
         </Col>
       </Row>
     </Container>
   </div>
 );
}

export default App;
