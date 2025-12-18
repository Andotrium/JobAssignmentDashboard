import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setStatus(res.data.status);
      } catch (err) {
        setError("Failed to load job");
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.put(`/jobs/${id}`, {
        title,
        description,
        status
      });

      navigate("/jobs");
    } catch (err) {
      setError("Failed to update job");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>Edit Job</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label><br />
          <input
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
          Update
        </button>
      </form>
    </div>
  );
};

export default EditJob;
