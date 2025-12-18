import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="container">
      <div className="page-card">
        <div className="page-title">
          <h2>Jobs</h2>
          <div>
            <button className="btn btn-ghost" onClick={logout}>Logout</button>
          </div>
        </div>

        <p className="muted">
          Logged in as <strong>{user.email}</strong> ({user.role})
        </p>

        <div className="mt-sm">
          <Link className="btn btn-primary" to="/create-job">Create Job</Link>
        </div>

        <hr />

        {jobs.length === 0 ? (
          <p>No jobs found</p>
        ) : (
          <ul className="list">
          {/* {jobs.map((job) => (
            <li key={job._id} style={{ marginBottom: "15px" }}>
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <p>Status: {job.status}</p>

              {job.owner && (
                <p>
                  Owner:{" "}
                  {typeof job.owner === "object"
                    ? job.owner.email
                    : "You"}
                </p>
              )}
            </li>
          ))} */}
          {jobs.map((job) => (
            <li key={job._id} className="list-item">
              <h4>{job.title}</h4>
              <p className="meta">{job.description}</p>
              <div className="meta">Status: {job.status}</div>

              {job.owner && (
                <div className="meta">
                  Owner: {typeof job.owner === "object" ? job.owner.email : "You"}
                </div>
              )}

              <div className="actions">
                <Link className="btn btn-ghost" to={`/edit-job/${job._id}`}>Edit</Link>

                <button
                  className="btn btn-ghost ml-sm"
                  onClick={async () => {
                    if (!window.confirm("Delete this job?")) return;

                    try {
                      await api.delete(`/jobs/${job._id}`);
                      setJobs(jobs.filter((j) => j._id !== job._id));
                    } catch (err) {
                      alert("Failed to delete job");
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}

          </ul>
        )}
      </div>
    </div>
  );
};

export default Jobs;
