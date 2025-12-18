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
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Create Job</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Description</label><br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Status</label><br />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <button style={{ marginTop: "15px" }} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
