import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/jobs", {
        title,
        description,
        status
      });

      // Redirect back to jobs list
      navigate("/jobs");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create job"
      );
    }
  };

  return (
    <div className="container">
      <div className="page-card card-centered">
        <h2>Create Job</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">Title</label>
            <input
              className="form-control"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label">Description</label>
            <textarea
              className="form-control form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label className="form-label">Status</label>
            <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <button className="btn btn-primary" type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
