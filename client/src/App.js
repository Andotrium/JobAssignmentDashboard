import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import ProtectedRoute from "./components/ProtectedRoute";
import EditJob from "./pages/EditJob";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/jobs" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
  path="/edit-job/:id"
  element={
    <ProtectedRoute>
      <EditJob />
    </ProtectedRoute>
  }
/>


      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-job"
        element={
          <ProtectedRoute>
            <CreateJob />
          </ProtectedRoute>
        }

      />
    </Routes>
    

  );
}

export default App;
