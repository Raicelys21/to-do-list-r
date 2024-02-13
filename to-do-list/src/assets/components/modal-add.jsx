export default function modalAdd() {
  function saveTask() {
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
  }

  function updateTask(index) {
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
  }

  function closeAddModal() {
    document.getElementById("taskModal").style.display = "none";
  }

  return (
    <>
      <div className="modal" id="taskModal">
        <div className="modal-content">
          <h2>Add task</h2>
          <label for="title">
            <strong>Title:</strong>
          </label>
          <input type="text" id="title" required />
          <br />
          <label for="description">
            <strong>Description:</strong>
          </label>
          <textarea id="description" rows="5" required></textarea>
          <br />
          <label for="date">
            <strong>Date:</strong>
          </label>
          <input type="date" id="date" required />
          <br />
          <div className="button-group">
            <button id="saveButton" onClick={() => saveTask()}>
              Save
            </button>
            <button id="saveChangesButton" onClick={() => updateTask()}>
              Saves changes
            </button>
            <button id="cancelEditButton" onClick={() => closeAddModal()}>
              {" "}
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
