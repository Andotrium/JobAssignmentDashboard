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
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Jobs</h2>
        <button onClick={logout}>Logout</button>
      </div>

      <p>
        Logged in as <strong>{user.email}</strong> ({user.role})
      </p>

      <Link to="/create-job">Create Job</Link>

      <hr />

      {jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        <ul>
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
  <li key={job._id} style={{ marginBottom: "20px" }}>
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

    {/* Actions */}
    <Link to={`/edit-job/${job._id}`}>Edit</Link>

    <button
      style={{ marginLeft: "10px" }}
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
  </li>
))}

        </ul>
      )}
    </div>
  );
};

export default Jobs;
