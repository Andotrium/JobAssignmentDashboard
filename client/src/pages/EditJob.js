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
    <div className="container">
      <div className="page-card card-centered">
        <h2>Edit Job</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">Title</label>
            <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="form-row">
            <label className="form-label">Description</label>
            <textarea className="form-control form-textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="form-row">
            <label className="form-label">Status</label>
            <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <button className="btn btn-primary" type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
