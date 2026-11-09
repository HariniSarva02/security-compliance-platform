const Department = require("../models/Department");
const Policy = require("../models/Policy");
const Control = require("../models/Control");
const Asset = require("../models/Asset");
const Audit = require("../models/Audit");
const Evidence = require("../models/Evidence");
const Finding = require("../models/Finding");
const CorrectiveAction = require("../models/CorrectiveAction");

const getDashboardStats = async (req, res) => {
  try {
    const [
      departments,
      policies,
      controls,
      assets,
      audits,
      evidence,
      findings,
      correctiveActions,
      openFindings,
      scheduledAudits,
      inProgressAudits,
      completedAudits,
      cancelledAudits,
    ] = await Promise.all([
      Department.countDocuments(),
      Policy.countDocuments(),
      Control.countDocuments(),
      Asset.countDocuments(),
      Audit.countDocuments(),
      Evidence.countDocuments(),
      Finding.countDocuments(),
      CorrectiveAction.countDocuments(),
      Finding.countDocuments({ status: "Open" }),
      Audit.countDocuments({ status: "Scheduled" }),
      Audit.countDocuments({ status: "In Progress" }),
      Audit.countDocuments({ status: "Completed" }),
      Audit.countDocuments({ status: "Cancelled" }),
    ]);
    // Calculate overall compliance
    const activeControls = await Control.countDocuments({ status: "Active" });

    const overallCompliance =
      controls === 0
        ? 0
        : Number(((activeControls / controls) * 100).toFixed(1));

    res.status(200).json({
      overallCompliance,
      activeControls,
      departments,
      policies,
      controls,
      assets,
      audits,
      evidence,
      findings,
      correctiveActions,
      openFindings,
      scheduledAudits,
      inProgressAudits,
      completedAudits,
      cancelledAudits,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };