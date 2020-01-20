const router = require("express").Router();
const auditRoutes = require("./api/auditRoutes");
const clientRoutes = require("./api/clientRoutes");
const surveyRoutes = require("./api/surveyRoutes");
const userRoutes = require("./api/userRoutes");
const balanzaRoutes = require("./api/balanzaRoutes");

router.use("/api/audit", auditRoutes);
router.use("/api/client", clientRoutes);
router.use("/api/survey", surveyRoutes);
router.use("/api/balanza", balanzaRoutes);
router.use("/api/user", userRoutes);

module.exports = router;
