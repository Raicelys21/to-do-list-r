import { useState } from "react";
import "./App.css";

export default function App() {
  
  function clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("date").value = "";
  }

  function filterTasks() {
    var searchInput = document
      .getElementById("searchInput")
      .value.toLowerCase();

    for (var i = 0; i < tasks.length; i++) {
      var taskCard = document.getElementById("taskCard" + i);
      var title = tasks[i].title.toLowerCase();

      if (title.includes(searchInput)) {
        taskCard.classList.remove("hidden");
      } else {
        taskCard.classList.add("hidden");
      }
    }
  }

  function showAllTasks() {
    var taskCards = document.querySelectorAll(".task-card");
    for (var i = 0; i < taskCards.length; i++) {
      taskCards[i].classList.remove("hidden");
    }
  }

  return (
    <>
      <div className="title-app">
        <h1>BASIC CRUD - TO DO LIST</h1>
      </div>

      <div className="filter-task">
        <input
          type="text"
          id="searchInput"
          placeholder="Introduce the task's title"
        />
        <div className="button-group">
          <button onClick={() => filterTasks()}>Search</button>
          <button onClick={() => showAllTasks()}>Show all tasks</button>
          <button onClick={() => openAddModal()}>Add task</button>
          <button onClick={() => deleteSelected()}>Delete select items</button>
        </div>
      </div>

      <div className="content">
        <div id="taskList"></div>
      </div>
    </>
  );
}
