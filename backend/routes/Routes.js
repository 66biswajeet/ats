const express = require("express");
const {
  addResume,
  getResumeDetails,
  deleteResume,
  updateResume,
} = require("../controllers/resumeController");
const router = express.Router();

router.route("/new-resume/:userId").post(addResume); // Save resume route
router.route("/new-resume/:userId").get(getResumeDetails);
router.route("/new-resume/:userId").delete(deleteResume);
router.route("/new-resume/:userId").put(updateResume);

module.exports = router;
