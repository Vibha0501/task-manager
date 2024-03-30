import React from "react";
function Filter({ filters, onFiltersChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFiltersChange({ [name]: value }); // Pass an object with filter name and value
  };
  return (
    <form className="row gx-3">
      <div className="col-md-2">
        <h5>Filter By:</h5>
      </div>
      <div className="col-md-2">
        <input
          type="text"
          className="form-control"
          placeholder="Assignee Name"
          id="assignee"
          name="assignee"
          value={filters.assignee}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <select
          className="form-select"
          id="priority"
          name="priority"
          value={filters.priority}
          onChange={handleChange}
        >
          <option value="">Priority</option>
          <option value="P0">P0</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
        </select>
      </div>
      <div className="col-md-2">
        <input
          type="date"
          className="form-control"
          id="fromDate"
          name="fromDate"
          value={filters.fromDate}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-2">
        <input
          type="date"
          className="form-control"
          id="toDate"
          name="toDate"
          value={filters.toDate}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}

export default Filter;