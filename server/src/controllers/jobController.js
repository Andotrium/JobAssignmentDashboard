const Job = require("../models/Job");

// CREATE JOB
exports.createJob = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const job = await Job.create({
      title,
      description,
      status,
      owner: req.user.userId
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// GET JOBS
exports.getJobs = async (req, res) => {
  try {
    let jobs;

    if (req.user.role === "admin") {
      jobs = await Job.find().populate("owner", "email role");
    } else {
      jobs = await Job.find({ owner: req.user.userId });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (
      req.user.role !== "admin" &&
      job.owner.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (
      req.user.role !== "admin" &&
      job.owner.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    Object.assign(job, req.body);
    await job.save();

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (
      req.user.role !== "admin" &&
      job.owner.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await job.deleteOne();

    res.status(200).json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
