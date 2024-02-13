
export default function modalRead() {

  const closeViewModal = () => document.getElementById("viewModal").style.display = "none";

    return (
      <>
      <div className="modal" id="viewModal">
        <div className="modal-content">
          <h2>Task details</h2>
          <p><strong>Title:</strong> <span id="vTitle"></span></p>
          <p><strong>Description:</strong> <span id="vDescription"></span></p>
          <p><strong>Date:</strong> <span id="vDate"></span></p>
          <button onClick={() =>closeViewModal()}>Close</button>
        </div>
      </div>
      </>
    )
  }