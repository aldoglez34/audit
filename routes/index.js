const router = require("express").Router();
const auditRoutes = require("./api/auditRoutes");
const clientRoutes = require("./api/clientRoutes");
const surveyRoutes = require("./api/surveyRoutes");
const uploadRoutes = require("./api/uploadRoutes");
const userRoutes = require("./api/userRoutes");

router.use("/api/audit", auditRoutes);
router.use("/api/client", clientRoutes);
router.use("/api/survey", surveyRoutes);
router.use("/api/upload", uploadRoutes);
router.use("/api/user", userRoutes);

module.exports = router;
