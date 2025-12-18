const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

router.post("/jobs", authMiddleware, createJob);
router.get("/jobs", authMiddleware, getJobs);
router.get("/jobs/:id", authMiddleware, getJobById);
router.put("/jobs/:id", authMiddleware, updateJob);
router.delete("/jobs/:id", authMiddleware, deleteJob);

module.exports = router;
