import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const createTask = () => {
      var taskList = document.getElementById("taskList");
      taskList.innerHTML = "";
    
      for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i];
    
        var taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        taskCard.id = "taskCard" + i;
    
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onchange = function () {
          toggleSelectAll();
        };
        taskCard.appendChild(checkbox);
    
        var title = document.createElement("h4");
        title.textContent = task.title;
    
        var description = document.createElement("p");
        description.textContent = task.description;
    
        var date = document.createElement("h5");
        date.textContent = task.date;
    
        var editButton = document.createElement("button");
        editButton.textContent = "Update";
        editButton.onclick = (function (index) {
          return function () {
            openUpdateModal(index);
          };
        })(i);
    
        var viewButton = document.createElement("button");
        viewButton.textContent = "Read";
        viewButton.onclick = (function (index) {
          return function () {
            openViewTaskModal(index);
          };
        })(i);
    
        taskCard.appendChild(title);
        taskCard.appendChild(description);
        taskCard.appendChild(date);
        taskCard.appendChild(editButton);
        taskCard.appendChild(viewButton);
    
        taskList.appendChild(taskCard);
      }
  };

  const saveTask = () => {
    var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var date = document.getElementById("date").value;

  if (title && description && date) {
    tasks.push({
      title: title,
      description: description,
      date: date,
    });

    createTask();
    closeAddModal();
  } else {
    alert("Todos los campos son obligatorios");
  }
  };

  const updateTask = (index) => {
      var title = document.getElementById("title").value;
      var description = document.getElementById("description").value;
      var date = document.getElementById("date").value;
    
      if (title && description && date) {
        tasks[index] = {
          title: title,
          description: description,
          date: date,
        };
    
        createTask();
        closeAddModal();
      } else {
        alert("Todos los campos son obligatorios");
      }
    
  };

  const deleteSelected = () => {
      var checkboxes = document.querySelectorAll(
        '.task-card input[type="checkbox"]'
      );
      var selectedIndexes = [];
    
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          selectedIndexes.push(i);
        }
      }
    
      for (var i = selectedIndexes.length - 1; i >= 0; i--) {
        tasks.splice(selectedIndexes[i], 1);
      }
    
      createTask();
  };

  const deleteTask = () => {
    var index = parseInt(
      document.getElementById("viewTitle").getAttribute("data-index")
    );
  
    if (!isNaN(index) && index >= 0 && index < tasks.length) {
      tasks.splice(index, 1);
      createTask();
    }
  }

  const clearFields = () => {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";
  };

  const filterTasks = () => {
    for (var i = 0; i < tasks.length; i++) {
      var taskCard = document.getElementById("taskCard" + i);
      var title = tasks[i].title.toLowerCase();
  
      if (title.includes(searchInput)) {
        taskCard.classList.remove("hidden");
      } else {
        taskCard.classList.add("hidden");
      }
    }
  };

  const showAllTasks = () => {
    var taskCards = document.querySelectorAll(".task-card");
  for (var i = 0; i < taskCards.length; i++) {
    taskCards[i].classList.remove("hidden");
  }
  };

  const openAddModal = () => {
      clearFields();
    
      var taskModal = document.getElementById("taskModal");
      var saveChangesButton = taskModal.querySelector("#saveChangesButton");
      var saveButton = taskModal.querySelector("#saveButton");
      var cancelEditButton = taskModal.querySelector("#cancelEditButton");
    
      if (saveChangesButton) {
        saveChangesButton.style.display = "none";
      }
      if (cancelEditButton) {
        cancelEditButton.style.display = "flex";
      }
      if (saveButton) {
        saveButton.style.display = "flex";
      }
    
      taskModal.style.display = "flex";
  };

  const closeAddModal = () => {
    document.getElementById("taskModal").style.display = "none";
  };

  const openUpdateModal = (index) => {
      clearFields();
    
      var taskModal = document.getElementById("taskModal");
      var saveButton = taskModal.querySelector("#saveButton");
      var saveChangesButton = taskModal.querySelector("#saveChangesButton");
      var cancelEditButton = taskModal.querySelector("#cancelEditButton");
    
      if (saveChangesButton) {
        saveChangesButton.style.display = "flex";
      }
      if (cancelEditButton) {
        cancelEditButton.style.display = "flex";
      }
      if (saveButton) {
        saveButton.style.display = "none";
      }
    
      document.getElementById("title").value = tasks[index].title;
      document.getElementById("description").value = tasks[index].description;
      document.getElementById("date").value = tasks[index].date;
    
      taskModal.style.display = "flex";
    
      saveChangesButton.onclick = function () {
        updateTask(index);
      };
  };

  const openViewTaskModal = (index) => {
    document.getElementById("vTitle").textContent = tasks[index].title;
    document.getElementById("vDescription").textContent =
      tasks[index].description;
    document.getElementById("vDate").textContent = tasks[index].date;
  
    document.getElementById("viewModal").style.display = "flex";
  };

  const closeViewModal = () => {
    document.getElementById("viewModal").style.display = "none";
  };

  const toggleSelectAll = () => {
    var checkboxes = document.querySelectorAll(
      '.task-card input[type="checkbox"]'
    );
    var selectAllCheckbox = document.querySelector(
      '#taskList thead input[type="checkbox"]'
    );
  
    var allChecked = true;
    for (var i = 0; i < checkboxes.length; i++) {
      if (!checkboxes[i].checked) {
        allChecked = false;
        break;
      }
    }
    selectAllCheckbox.checked = allChecked;
  }

  return (
    <>
      <div className="title-app">
        <h1>BASIC CRUD - TO DO LIST</h1>
      </div>

      <div className="filter-task">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Introduce the task's title"
        />
        <div className="button-group">
          <button onClick={filterTasks}>Search</button>
          <button onClick={showAllTasks}>Show all tasks</button>
          <button onClick={openAddModal}>Add task</button>
          <button onClick={deleteSelected}>Delete select items</button>
        </div>
      </div>

      <div className="content">
        <div id="taskList">
        </div>
      </div>

      <div className="modal" id="taskModal">
        <div className="modal-content">
          <h2>Add task</h2>
          <label htmlFor="title">
            <strong>Title:</strong>
          </label>
          <input type="text" id="title" required />
          <br />
          <label htmlFor="description">
            <strong>Description:</strong>
          </label>
          <textarea id="description" rows="5" required></textarea>
          <br />
          <label htmlFor="date">
            <strong>Date:</strong>
          </label>
          <input type="date" id="date" required />
          <br />
          <div className="button-group">
            <button id="saveButton" onClick={saveTask}>
              Save
            </button>
            <button id="saveChangesButton" onClick={updateTask}>
              Save changes
            </button>
            <button id="cancelEditButton" onClick={closeAddModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="modal" id="viewModal">
        <div className="modal-content">
          <h2>Task details</h2>
          <p>
            <strong>Title:</strong> <span id="vTitle"></span>
          </p>
          <p>
            <strong>Description:</strong> <span id="vDescription"></span>
          </p>
          <p>
            <strong>Date:</strong> <span id="vDate"></span>
          </p>
          <button onClick={closeViewModal}>Close</button>
        </div>
      </div>
    </>
  );
};

export default App;
