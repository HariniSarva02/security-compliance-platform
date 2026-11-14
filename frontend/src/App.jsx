import { useState, useEffect, useRef } from "react";
import {
  loginUser,
  getDashboardStats,
  getFindings,
  createFinding,
  getPolicies,
  createPolicy,
  updatePolicy,
  deletePolicy,
  getControls,
  createControl,
  updateControl,
  deleteControl,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getAssets,
  createAsset,
  updateAsset,
  deleteAsset,
  getAudits,
  createAudit,
  updateAudit,
  deleteAudit,
  getEvidence,
  uploadEvidence,
  getCorrectiveActions,
  createCorrectiveAction,
  getUsers,
  updateFinding,
  updateUser,
  deleteFinding,
} from "./dashboardService";
import {
  LayoutDashboard,
  ShieldCheck,
  FileText,
  ClipboardCheck,
  Building2,
  Laptop,
  CalendarDays,
  FolderCheck,
  AlertTriangle,
  CheckCircle,
  Users,
  Settings,
  Search,
  Bell,
  ChevronDown,
  TrendingUp,
  Clock,
  CircleAlert,
  Menu,
  LogOut,
} from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

import { Bar, Doughnut, Line } from "react-chartjs-2";

import "./App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
);

const navigation = [
  { title: "OVERVIEW" },
  { name: "Dashboard", icon: LayoutDashboard },
  { title: "COMPLIANCE" },
  { name: "Policies", icon: FileText },
  { name: "Security Controls", icon: ShieldCheck },
  { name: "Departments & Assets", icon: Building2 },
  { title: "AUDIT MANAGEMENT" },
  { name: "Audit Scheduling", icon: CalendarDays },
  { name: "Evidence Collection", icon: FolderCheck },
  { name: "Audit Findings", icon: AlertTriangle },
  { name: "Corrective Actions", icon: ClipboardCheck },
  { title: "ANALYTICS" },
  { name: "Compliance Monitoring", icon: TrendingUp },
  { name: "Reports", icon: FileText },
  { title: "ADMINISTRATION" },
  { name: "User Management", icon: Users },
  { name: "Settings", icon: Settings },
];

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const profileRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setProfileMenuOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

useEffect(() => {
  setShowPolicyForm(false);
  setShowControlForm(false);
  setShowAuditForm(false);
  setShowEvidenceForm(false);
  setShowFindingForm(false);
  setShowCorrectiveActionForm(false);
}, [activePage]);


  const [stats, setStats] = useState(null);
  const [liveFindings, setLiveFindings] = useState([]);
  const [findingTitle, setFindingTitle] = useState("");
  const [findingDescription, setFindingDescription] = useState("");
  const [findingAudit, setFindingAudit] = useState("");
  const [findingControl, setFindingControl] = useState("");
  const [findingAsset, setFindingAsset] = useState("");
  const [findingSeverity, setFindingSeverity] = useState("Medium");
  const [findingRecommendation, setFindingRecommendation] = useState("");
  const [findingStatus, setFindingStatus] = useState("Open");
  const [findingError, setFindingError] = useState("");
  const [showFindingForm, setShowFindingForm] = useState(false);
  const [editingFindingId, setEditingFindingId] = useState(null);
  const [correctiveActions, setCorrectiveActions] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserRole, setEditUserRole] = useState("");
  const [editUserDepartment, setEditUserDepartment] = useState("");
  const [userUpdateLoading, setUserUpdateLoading] = useState(false);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState("");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "null")	
  );

  const [actionForm, setActionForm] = useState({
    title: "",
    description: "",
    finding: "",
    assignedTo: "",
    dueDate: "",
    priority: "Medium",
    status: "Open",
    closureNotes: "",
  });


  const [correctiveActionError, setCorrectiveActionError] = useState("");
  const [showCorrectiveActionForm, setShowCorrectiveActionForm] = useState(false);
  const [correctiveActionLoading, setCorrectiveActionLoading] = useState(false);
  const [findingLoading, setFindingLoading] = useState(false);
  const [policies, setPolicies] = useState([]);
  const [policyLoading, setPolicyLoading] = useState(false);
  const [policyError, setPolicyError] = useState("");
  const [showPolicyForm, setShowPolicyForm] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [policyForm, setPolicyForm] = useState({
    title: "",
    description: "",
    category: "",
    version: "1.0",
    owner: "",
    status: "Draft",
    effectiveDate: "",
    reviewDate: "",
  });
const [controls, setControls] = useState([]);
const [controlLoading, setControlLoading] = useState(false);
const [controlError, setControlError] = useState("");
const [showControlForm, setShowControlForm] = useState(false);
const [editingControl, setEditingControl] = useState(null);
// Departments state
const [departments, setDepartments] = useState([]);
const [departmentLoading, setDepartmentLoading] = useState(false);
const [departmentError, setDepartmentError] = useState("");
const [showDepartmentForm, setShowDepartmentForm] = useState(false);
const [editingDepartment, setEditingDepartment] = useState(null);

const [departmentForm, setDepartmentForm] = useState({
  name: "",
  description: "",
  manager: "",
  status: "Active",
});


// Asset Management State
const [assets, setAssets] = useState([]);


const [audits, setAudits] = useState([]);
const [auditLoading, setAuditLoading] = useState(false);
const [auditError, setAuditError] = useState("");
// Evidence Collection State

const [evidence, setEvidence] = useState([]);
const [evidenceLoading, setEvidenceLoading] = useState(false);
const [evidenceError, setEvidenceError] = useState("");
const [showEvidenceForm, setShowEvidenceForm] = useState(false);

const [evidenceForm, setEvidenceForm] = useState({
  title: "",
  description: "",
  audit: "",
  control: "",
  file: null,
});
const [showAuditForm, setShowAuditForm] = useState(false);
const [editingAudit, setEditingAudit] = useState(null);

const [auditForm, setAuditForm] = useState({
  title: "",
  description: "",
  department: "",
  auditor: "",
  auditType: "Internal",
  startDate: "",
  endDate: "",
  status: "Scheduled",
  findings: "",
  overallResult: "Pending",
});



const [assetLoading, setAssetLoading] = useState(false);
const [assetError, setAssetError] = useState("");
const [showAssetForm, setShowAssetForm] = useState(false);
const [editingAsset, setEditingAsset] = useState(null);

const [assetForm, setAssetForm] = useState({
  name: "",
  assetType: "",
  description: "",
  department: "",
  owner: "",
  location: "",
  criticality: "Medium",
  status: "Active",
});


const [controlForm, setControlForm] = useState({
  controlId: "",
  title: "",
  description: "",
  category: "",
  policy: "",
  requirement: "",
  status: "Active",
});


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return;
  
    const loadDashboard = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError(err.message);
      }
  
      try {
        const findingsData = await getFindings();
        setLiveFindings(findingsData);
      } catch (err) {
        setFindingError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    loadDashboard();
  }, [isAuthenticated]);


const handleLogin = async (e) => {
  e.preventDefault();

  try {
    setLoginLoading(true);
    setLoginError("");

    const data = await loginUser(loginEmail, loginPassword);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    setIsAuthenticated(true);
    setActivePage("Dashboard");

  } catch (err) {
    setLoginError(err.message);
  } finally {
    setLoginLoading(false);
  }
};


// Logout Handler
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUser(null);
  setIsAuthenticated(false);
  setLoginEmail("");
  setLoginPassword("");
  setLoginError("");
  setProfileMenuOpen(false);
};





  const cards = [
    {
      title: "Overall Compliance",
      value: stats ? `${stats.overallCompliance}%` : "—",
      change: stats ? `${stats.activeControls}/${stats.controls} Active Controls` : "Loading",
      description: "Based on active security controls",
      icon: ShieldCheck,
      color: "blue",
    },
    {
      title: "Total Policies",
      value: stats ? stats.policies : "—",
      change: "Live data",
      description: "Policies maintained",
      icon: FileText,
      color: "purple",
    },
    {
      title: "Total Audits",
      value: stats ? stats.audits : "—",
      change: "Live data",
      description: "Audits scheduled and tracked",
      icon: ClipboardCheck,
      color: "orange",
    },
    {
      title: "Open Findings",
      value: stats ? stats.openFindings : "—",
      change: "Live data",
      description: "Require attention",
      icon: AlertTriangle,
      color: "red",
    },
  ];

  const complianceData = {
    labels: ["IT", "Finance", "HR", "Marketing", "Operations"],
    datasets: [
      {
        label: "Compliance %",
        data: [92, 78, 88, 84, 90],
        backgroundColor: "#4169e1",
        borderRadius: 6,
        barThickness: 25,
      },
    ],
  };

  const auditData = {
    labels: ["Scheduled", "In Progress", "Completed", "Cancelled"],
    datasets: [
      {
        data: [
          stats?.scheduledAudits ?? 0,
          stats?.inProgressAudits ?? 0,
          stats?.completedAudits ?? 0,
          stats?.cancelledAudits ?? 0,
        ],
        backgroundColor: [
          "#f59e0b",
          "#3b82f6",
          "#16a34a",
          "#ef4444",
        ],
        borderWidth: 0,
      },
    ],
  };

  const trendData = {
    labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    datasets: [
      {
        label: "Compliance Score",
        data: [68, 72, 74, 79, 82, 86],
        borderColor: "#4169e1",
        backgroundColor: "rgba(65,105,225,0.12)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const openAddPolicyForm = () => {
    setEditingPolicy(null);
  
    setPolicyForm({
      title: "",
      description: "",
      category: "",
      version: "1.0",
      owner: "",
      status: "Draft",
      effectiveDate: "",
      reviewDate: "",
    });
  
    setShowPolicyForm(true);
  };
  
  const openEditPolicyForm = (policy) => {
    setEditingPolicy(policy);
  
    setPolicyForm({
      title: policy.title || "",
      description: policy.description || "",
      category: policy.category || "",
      version: policy.version || "1.0",
      owner: policy.owner || "",
      status: policy.status || "Draft",
      effectiveDate: policy.effectiveDate
        ? policy.effectiveDate.substring(0, 10)
        : "",
      reviewDate: policy.reviewDate
        ? policy.reviewDate.substring(0, 10)
        : "",
    });
  
    setShowPolicyForm(true);
  };
  
  const handlePolicyInputChange = (e) => {
    const { name, value } = e.target;
  
    setPolicyForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };
  const openAddControlForm = () => {
    setEditingControl(null);
  
    setControlForm({
      controlId: "",
      title: "",
      description: "",
      category: "",
      policy: "",
      requirement: "",
      status: "Active",
    });
  
    setShowControlForm(true);
  };
  
  const openEditControlForm = (control) => {
    setEditingControl(control);
  
    setControlForm({
      controlId: control.controlId || "",
      title: control.title || "",
      description: control.description || "",
      category: control.category || "",
      policy: control.policy?._id || control.policy || "",
      requirement: control.requirement || "",
      status: control.status || "Active",
    });
  
    setShowControlForm(true);
  };
  
  const handleControlInputChange = (e) => {
    const { name, value } = e.target;
  
    setControlForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleControlSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setControlError("");
  
      if (editingControl) {
        await updateControl(editingControl._id, controlForm);
      } else {
        await createControl(controlForm);
      }
  
      setShowControlForm(false);
      setEditingControl(null);
      await loadControls();
    } catch (err) {
      setControlError(err.message);
    }
  };
  
  const handleDeleteControl = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this security control?"
    );
  
    if (!confirmed) return;
  
    try {
      setControlError("");
      await deleteControl(id);
      await loadControls();
    } catch (err) {
      setControlError(err.message);
    }
  };

const handlePolicySubmit = async (e) => {
  e.preventDefault();

  try {
    setPolicyError("");

    const policyData = {
      ...policyForm,
      effectiveDate: policyForm.effectiveDate || null,
      reviewDate: policyForm.reviewDate || null,
    };

    if (editingPolicy) {
      await updatePolicy(editingPolicy._id, policyData);
    } else {
      await createPolicy(policyData);
    }

    setShowPolicyForm(false);
    setEditingPolicy(null);
    await loadPolicies();
  } catch (err) {
    setPolicyError(err.message);
  }
};

const handleDeletePolicy = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this policy?"
  );

  if (!confirmed) return;

  try {
    setPolicyError("");
    await deletePolicy(id);
    await loadPolicies();
  } catch (err) {
    setPolicyError(err.message);
  }
};


  const loadPolicies = async () => {
    try {
      setPolicyLoading(true);
      setPolicyError("");
  
      const data = await getPolicies();
      setPolicies(data);
    } catch (err) {
      setPolicyError(err.message);
    } finally {
      setPolicyLoading(false);
    }
  };

  const loadControls = async () => {
    try {
      setControlLoading(true);
      setControlError("");
  
      const data = await getControls();
      setControls(data);
    } catch (err) {
      setControlError(err.message);
    } finally {
      setControlLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      setDepartmentLoading(true);
      setDepartmentError("");
  
      const data = await getDepartments();
      setDepartments(data);
    } catch (err) {
      setDepartmentError(err.message);
    } finally {
      setDepartmentLoading(false);
    }
  };

  const loadAssets = async () => {
    try {
      setAssetLoading(true);
      setAssetError("");
  
      const data = await getAssets();
      setAssets(data);
    } catch (err) {
      setAssetError(err.message);
    } finally {
      setAssetLoading(false);
    }
  };

  const loadAudits = async () => {
    try {
      setAuditLoading(true);
      setAuditError("");
  
      const data = await getAudits();
      setAudits(data);
    } catch (error) {
      setAuditError(error.message);
    } finally {
      setAuditLoading(false);
    }
  };
  const loadEvidence = async () => {
    try {
      setEvidenceLoading(true);
      setEvidenceError("");
  
      const data = await getEvidence();
      setEvidence(data);
    } catch (error) {
      setEvidenceError(error.message);
    } finally {
      setEvidenceLoading(false);
    }
  };
  const openEditFindingForm = (finding) => {
    setEditingFindingId(finding._id);
    setFindingTitle(finding.title || "");
    setFindingDescription(finding.description || "");
    setFindingAudit(finding.audit?._id || finding.audit || "");
    setFindingControl(finding.control?._id || finding.control || "");
    setFindingAsset(finding.asset?._id || finding.asset || "");
    setFindingSeverity(finding.severity || "Medium");
    setFindingRecommendation(finding.recommendation || "");
    setFindingStatus(finding.status || "Open");
    setShowFindingForm(true);
  };

  const handleDeleteFinding = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this finding?"
    );
  
    if (!confirmed) return;
  
    try {
      setFindingError("");
      await deleteFinding(id);
  
      const data = await getFindings();
      setLiveFindings(data);
    } catch (err) {
      setFindingError(err.message);
    }
  };


  const handleFindingSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setFindingLoading(true);
      setFindingError("");
  
      const findingData = {
        title: findingTitle,
        description: findingDescription,
        audit: findingAudit,
        control: findingControl,
        asset: findingAsset || undefined,
        severity: findingSeverity,
        recommendation: findingRecommendation,
        status: findingStatus,
      };
  
      if (editingFindingId) {
        await updateFinding(editingFindingId, findingData);
      } else {
        await createFinding(findingData);
      }
  
      setEditingFindingId(null);
      setFindingTitle("");
      setFindingDescription("");
      setFindingAudit("");
      setFindingControl("");
      setFindingAsset("");
      setFindingSeverity("Medium");
      setFindingRecommendation("");
      setFindingStatus("Open");
      setShowFindingForm(false);
  
      const data = await getFindings();
      setLiveFindings(data);
    } catch (err) {
      setFindingError(err.message);
    } finally {
      setFindingLoading(false);
    }
  };
  
  const handleCorrectiveActionSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setCorrectiveActionLoading(true);
      setCorrectiveActionError("");
  
      await createCorrectiveAction(actionForm);
  
      const data = await getCorrectiveActions();
      setCorrectiveActions(data);
  
      setActionForm({
        title: "",
        description: "",
        finding: "",
        assignedTo: "",
        dueDate: "",
        priority: "Medium",
        status: "Open",
        closureNotes: "",
      });
  
      setShowCorrectiveActionForm(false);
    } catch (err) {
      setCorrectiveActionError(err.message);
    } finally {
      setCorrectiveActionLoading(false);
    }
  };

  const openAddDepartmentForm = () => {
    setEditingDepartment(null);
  
    setDepartmentForm({
      name: "",
      description: "",
      manager: "",
      status: "Active",
    });
  
    setShowDepartmentForm(true);
  };
  
  const openEditDepartmentForm = (department) => {
    setEditingDepartment(department);
  
    setDepartmentForm({
      name: department.name || "",
      description: department.description || "",
      manager: department.manager || "",
      status: department.status || "Active",
    });
  
    setShowDepartmentForm(true);
  };
  
  const handleDepartmentInputChange = (e) => {
    const { name, value } = e.target;
  
    setDepartmentForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleDepartmentSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setDepartmentError("");
  
      if (editingDepartment) {
        await updateDepartment(editingDepartment._id, departmentForm);
      } else {
        await createDepartment(departmentForm);
      }
  
      setShowDepartmentForm(false);
      setEditingDepartment(null);
      await loadDepartments();
    } catch (err) {
      setDepartmentError(err.message);
    }
  };
  
  const handleDeleteDepartment = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this department?"
    );
  
    if (!confirmed) return;
  
    try {
      setDepartmentError("");
      await deleteDepartment(id);
      await loadDepartments();
    } catch (err) {
      setDepartmentError(err.message);
    }
  };

  // Asset Form Functions

const openAddAssetForm = () => {
  setEditingAsset(null);

  setAssetForm({
    name: "",
    assetType: "",
    description: "",
    department: "",
    owner: "",
    location: "",
    criticality: "Medium",
    status: "Active",
  });
  setShowAssetForm(true);
};



const openAddAuditForm = () => {
  setEditingAudit(null);

  setAuditForm({
    title: "",
    description: "",
    department: "",
    auditor: "",
    auditType: "Internal",
    startDate: "",
    endDate: "",
    status: "Scheduled",
    findings: "",
    overallResult: "Pending",
  });

  setShowAuditForm(true);
};

const openEditAuditForm = (audit) => {
  setEditingAudit(audit);

  setAuditForm({
    title: audit.title || "",
    description: audit.description || "",
    department: audit.department?._id || audit.department || "",
    auditor: audit.auditor?._id || audit.auditor || "",
    auditType: audit.auditType || "Internal",
    startDate: audit.startDate
      ? audit.startDate.substring(0, 10)
      : "",
    endDate: audit.endDate
      ? audit.endDate.substring(0, 10)
      : "",
    status: audit.status || "Scheduled",
    findings: audit.findings || "",
    overallResult: audit.overallResult || "Pending",
  });

  setShowAuditForm(true);
};

const handleAuditInputChange = (e) => {
  const { name, value } = e.target;

  setAuditForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleAuditSubmit = async (e) => {
  e.preventDefault();

  if (new Date(auditForm.endDate) < new Date(auditForm.startDate)) {
    setAuditError("End date cannot be before start date.");
    return;
  }

  try {
    setAuditLoading(true);
    setAuditError("");

    if (editingAudit) {
      await updateAudit(editingAudit._id, auditForm);
    } else {
      await createAudit(auditForm);
    }

    setShowAuditForm(false);
    setEditingAudit(null);
    await loadAudits();
  } catch (error) {
    setAuditError(error.message);
  } finally {
    setAuditLoading(false);
  }
};

const handleDeleteAudit = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this audit?"
  );

  if (!confirmed) return;

  try {
    setAuditLoading(true);
    setAuditError("");

    await deleteAudit(id);
    await loadAudits();
  } catch (error) {
    setAuditError(error.message);
  } finally {
    setAuditLoading(false);
  }
};


const handleEvidenceInputChange = (e) => {
  const { name, value, files } = e.target;

  setEvidenceForm((prev) => ({
    ...prev,
    [name]: name === "file" ? files[0] : value,
  }));
};

const handleEvidenceSubmit = async (e) => {
  e.preventDefault();

  if (!evidenceForm.file) {
    setEvidenceError("Please select an evidence file.");
    return;
  }

  try {
    setEvidenceLoading(true);
    setEvidenceError("");

    const formData = new FormData();
    formData.append("title", evidenceForm.title);
    formData.append("description", evidenceForm.description);
    formData.append("audit", evidenceForm.audit);
    formData.append("control", evidenceForm.control);
    formData.append("file", evidenceForm.file);

    await uploadEvidence(formData);

    setEvidenceForm({
      title: "",
      description: "",
      audit: "",
      control: "",
      file: null,
    });

    setShowEvidenceForm(false);
    await loadEvidence();
  } catch (error) {
    setEvidenceError(error.message);
  } finally {
    setEvidenceLoading(false);
  }
};

const openEditAssetForm = (asset) => {
  setEditingAsset(asset);

  setAssetForm({
    name: asset.name || "",
    assetType: asset.assetType || "",
    description: asset.description || "",
    department: asset.department?._id || asset.department || "",
    owner: asset.owner || "",
    location: asset.location || "",
    criticality: asset.criticality || "Medium",
    status: asset.status || "Active",
  });

  setShowAssetForm(true);
};

const handleAssetInputChange = (e) => {
  const { name, value } = e.target;

  setAssetForm((previous) => ({
    ...previous,
    [name]: value,
  }));
};

const handleAssetSubmit = async (e) => {
  e.preventDefault();

  try {
    setAssetError("");

    if (editingAsset) {
      await updateAsset(editingAsset._id, assetForm);
    } else {
      await createAsset(assetForm);
    }

    setShowAssetForm(false);
    setEditingAsset(null);
    await loadAssets();
  } catch (err) {
    setAssetError(err.message);
  }
};

const handleDeleteAsset = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this asset?"
  );

  if (!confirmed) return;

  try {
    setAssetError("");
    await deleteAsset(id);
    await loadAssets();
  } catch (err) {
    setAssetError(err.message);
  }
};

const handleUserUpdate = async (id) => {
  try {
    setUserUpdateLoading(true);
    setUsersError("");
    setUserUpdateSuccess("");

    await updateUser(id, {
      role: editUserRole,
      department: editUserDepartment,
    });


    const data = await getUsers();
    setUsers(data);
    setUserUpdateSuccess("User updated successfully!");
    setEditingUserId(null);
    setEditUserRole("");
    setEditUserDepartment("");
  } catch (err) {
    setUsersError(err.message);
  } finally {
    setUserUpdateLoading(false);
  }
};

useEffect(() => {
  if (!userUpdateSuccess) return;

  const timer = setTimeout(() => {
    setUserUpdateSuccess("");
  }, 3000);

  return () => clearTimeout(timer);
}, [userUpdateSuccess]);


  useEffect(() => {
    if (activePage === "Policies") {
      loadPolicies();
    }
  }, [activePage]);
  useEffect(() => {
    if (activePage === "Security Controls") {
      loadControls();
      loadPolicies();
    }
  }, [activePage]);

  useEffect(() => {
    if (activePage === "Departments & Assets") {
      loadDepartments();
      loadAssets();
    }
  
    if (activePage === "Audit Scheduling") {
      loadDepartments();
      loadAudits();
    }
  }, [activePage]);

  useEffect(() => {
    if (activePage === "Evidence Collection") {
      loadAudits();
      loadControls();
      loadEvidence();
    }
  }, [activePage]);


  useEffect(() => {
    if (activePage === "Audit Scheduling") {
      loadAudits();
    }
  }, [activePage]);
  


  useEffect(() => {
    if (activePage === "Audit Findings") {
      loadAudits();
      loadControls();
      loadAssets();
      getFindings()
        .then((data) => setLiveFindings(data))
        .catch((err) => setFindingError(err.message));
    }
  }, [activePage]);

  useEffect(() => {
    if (activePage === "Corrective Actions") {
      getCorrectiveActions()
        .then((data) => setCorrectiveActions(data))
        .catch((err) => setCorrectiveActionError(err.message));
      getUsers()
      .then((data) => setUsers(data))
      .catch((err) => setCorrectiveActionError(err.message));
    }
  }, [activePage]);


  useEffect(() => {
    if (activePage === "User Management" && user?.role === "Admin") {
      const loadUsers = async () => {
        try {
          setUsersLoading(true);
          setUsersError("");
  
          const data = await getUsers();
          setUsers(data);
        } catch (err) {
          setUsersError(err.message);
        } finally {
          setUsersLoading(false);
        }
      };
  
      loadUsers();
    }
  }, [activePage]);


  useEffect(() => {
    if (activePage === "Reports") {
      loadDepartments();
      loadPolicies();
      loadControls();
      loadAssets();
      loadAudits();
      loadEvidence();
  
      getFindings()
        .then((data) => setLiveFindings(data))
        .catch((err) => setFindingError(err.message));
  
      getCorrectiveActions()
        .then((data) => setCorrectiveActions(data))
        .catch((err) => setCorrectiveActionError(err.message));
    }
  }, [activePage]);



  const findings = liveFindings.map((finding, index) => ({
    
    id: `FND-${String(index + 1).padStart(3, "0")}`,
    title: finding.title,
    department: finding.audit?.department?.name || "N/A",
    severity: finding.severity,
    status: finding.status,
  }));




  if (!isAuthenticated) {
    return (
      <div className="login-page">
        <div className="login-container">
          <h1>Security Compliance</h1>
          <h2>Welcome Back</h2>
          <p>Sign in to access your dashboard</p>
  
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
  
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
  
            {loginError && <p className="login-error">{loginError}</p>}
  
            <button type="submit" disabled={loginLoading}>
              {loginLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  
  const handleExportReport = () => {
    const sections = [
      ["Departments", departments],
      ["Policies", policies],
      ["Controls", controls],
      ["Assets", assets],
      ["Audits", audits],
      ["Findings", liveFindings],
      ["Evidence", evidence],
      ["Corrective Actions", correctiveActions],
    ];

    const escapeCSV = (value) => {
      if (value === null || value === undefined) return '""';

      let text = typeof value === "object"
        ? JSON.stringify(value)
        : String(value);

      if (/^[=+\-@\t\r]/.test(text)) {
        text = "'" + text;
      }

      return `"${text.replace(/"/g, '""')}"`;
    };

    const rows = [
      ["SECUREAUDIT - COMPLIANCE REPORT"],
      ["Report Generated", new Date().toLocaleString()],
      [],
      ["MODULE SUMMARY"],
      ["Module", "Total Records"],
      ...sections.map(([name, records]) => [name, records.length]),
    ];

    sections.forEach(([name, records]) => {
      rows.push([]);
      rows.push([`${name.toUpperCase()} DETAILS`]);

      if (!records.length) {
        rows.push(["No records available"]);
        return;
      }

      const columns = [
        ...new Set(records.flatMap((record) =>
          Object.keys(record).filter((key) => key !== "__v")
        )),
      ];

      rows.push(columns);

      records.forEach((record) => {
        rows.push(
          columns.map((column) => record[column])
        );
      });
    });

    const csvContent =
      "\uFEFF" +
      rows.map((row) => row.map(escapeCSV).join(",")).join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "SecureAudit-Detailed-Compliance-Report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };


  return (
    <div className="app-layout">

      <aside className={`sidebar ${sidebarOpen ? "" : "sidebar-closed"}`}>

        <div className="brand">
          <div className="brand-icon">
            <ShieldCheck size={25} />
          </div>
          <div className="brand-text">
            <h2>SecureAudit</h2>
            <span>COMPLIANCE PLATFORM</span>
          </div>
        </div>

        <div className="sidebar-menu">

          {navigation.map((item, index) => {
            if (item.title) {
              return (
                <p className="menu-heading" key={index}>
                  {item.title}
                </p>
              );
            }

            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name ? "active" : ""
                }`}
                onClick={() => setActivePage(item.name)}
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </button>
            );
          })}

        </div>

        <div className="sidebar-bottom">
          <div className="security-status">
            <ShieldCheck size={20} />
            <div>
              <strong>System Secure</strong>
              <span>All services operational</span>
            </div>
          </div>
        </div>

      </aside>

      <main className="main-content">

        <header className="topbar">

          <div className="topbar-left">
            <button
              className="menu-button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={21} />
            </button>

            <div>
              <p className="breadcrumb">Pages / {activePage}</p>
              <h2>{activePage}</h2>
            </div>
          </div>

          <div className="topbar-right">

            <div className="search-box">
              <Search size={18} />
              <input placeholder="Search anything..." />
            </div>

            <button className="notification-button">
              <Bell size={20} />
              <span></span>
            </button>

            <div className="profile-wrapper" ref={profileRef}>
  <div
    className="profile"
    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
    style={{ cursor: "pointer" }}
  >
    <div className="profile-avatar">SH</div>

    <div className="profile-info">
    <strong>{user?.name || "User"}</strong>
    <span>{user?.role || "User"}</span>
    </div>

    <ChevronDown size={16} />
  </div>

  {profileMenuOpen && (
    <div className="profile-dropdown">
      <button onClick={handleLogout}>
        <LogOut size={16} />
        Logout
      </button>
    </div>
  )}
</div>

          </div>

        </header>

        {activePage === "Dashboard" ? (

          <div className="dashboard">
            <div className="welcome-section">
              <div>
                <h1>
                  {user?.role === "Compliance Officer"
                    ? "Compliance Officer Dashboard"
                    : "Security Overview"}
                </h1>
                <p>
                {user?.role === "Compliance Officer"
                  ? "Monitor security policies, compliance status, audit findings and corrective actions."
                  : "Monitor your organization's security policies, compliance and audit activities."}
                </p>
              </div>

              <div className="date-label">
                <CalendarDays size={17} />
                November 2026
              </div>
            </div>


            {loading && <p>Loading dashboard statistics...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="stats-grid">
            

            {(user?.role === "Compliance Officer"
              ? cards.filter((card) =>
                  ["Overall Compliance", "Total Policies", "Total Audits", "Open Findings"].includes(card.title)
                )
              : cards
            ).map((card) => {
                const Icon = card.icon;

                return (
                  <div className="stat-card" key={card.title}>

                    <div className="stat-top">
                      <div className={`stat-icon ${card.color}`}>
                        <Icon size={22} />
                      </div>
                      <span className="stat-change">
                        {card.change}
                      </span>
                    </div>

                    <h3>{card.value}</h3>
                    <p className="stat-title">{card.title}</p>
                    <span className="stat-description">
                      {card.description}
                    </span>

                  </div>
                );
              })}

            </div>

            <div className="chart-grid">

              <div className="panel compliance-panel">
                <div className="panel-header">
                  <div>
                    <h3>Department Compliance</h3>
                    <p>Compliance score by department</p>
                  </div>
                  <span className="panel-tag">Monthly</span>
                </div>

                <div className="chart-container">
                  <Bar
                    data={complianceData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          grid: { color: "#edf0f5" },
                        },
                        x: {
                          grid: { display: false },
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="panel audit-panel">
                <div className="panel-header">
                  <div>
                    <h3>Audit Overview</h3>
                    <p>Current audit distribution</p>
                  </div>
                </div>

                <div className="donut-container">
                  <div className="donut-chart">
                    <Doughnut
                      data={auditData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: "72%",
                        plugins: {
                          legend: { display: false },
                        },
                      }}
                    />

                    <div className="donut-center">
                      <strong>{stats?.audits ?? 0}</strong>
                      <span>Total Audits</span>
                    </div>
                  </div>

                  <div className="legend-list">
                    <span><i className="orange-dot"></i> Scheduled ({stats?.scheduledAudits ?? 0})</span>
                    <span><i className="blue-dot"></i> In Progress ({stats?.inProgressAudits ?? 0})</span>
                    <span><i className="green-dot"></i> Completed ({stats?.completedAudits ?? 0})</span>
                    <span>Cancelled ({stats?.cancelledAudits ?? 0})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="panel trend-panel">
              <div className="panel-header">
                <div>
                  <h3>Compliance Performance</h3>
                  <p>Organization compliance trend over six months</p>
                </div>
                <span className="trend-indicator">
                  <TrendingUp size={16} /> Improving
                </span>
              </div>

              <div className="trend-chart">
                <Line
                  data={trendData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      y: {
                        min: 0,
                        max: 100,
                        grid: { color: "#edf0f5" },
                      },
                      x: {
                        grid: { display: false },
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className="panel findings-panel">

              <div className="panel-header">
                <div>
                  <h3>Recent Audit Findings</h3>
                  <p>Latest issues identified during audits</p>
                </div>

                <button
                  className="view-all"
                  onClick={() => setActivePage("Audit Findings")}
                >
                  View all
                </button>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Finding ID</th>
                      <th>Finding Description</th>
                      <th>Department</th>
                      <th>Severity</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {findings.length > 0 ? (
                      findings.map((finding) => (
                        <tr key={finding.id}>
                          <td>{finding.id}</td>
                          <td>{finding.title}</td>
                          <td>{finding.department}</td>
                          <td>
                            <span className={`severity ${finding.severity.toLowerCase()}`}>
                              {finding.severity}
                            </span>
                          </td>
                          <td>
                            <span className={`status ${finding.status.toLowerCase().replace(" ", "-")}`}>
                              {finding.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center", padding: "25px" }}>
                          No audit findings available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>

            <footer className="footer">
              © 2026 SecureAudit | Security Policy Compliance and Audit Management Platform
            </footer>

          </div>

        ) : activePage === "Policies" ? (
        <div className="dashboard policies-page">
            <div className="welcome-section">
              <div>
                <h1>Policy Management</h1>
                <p>Manage and monitor your organization's security policies.</p>
              </div>

              <button className="view-all" onClick={openAddPolicyForm}>
                + Add Policy
              </button>
            </div>

            {policyError && (
              <p style={{ color: "red", marginBottom: "15px" }}>
                {policyError}
              </p>
            )}

            {policyLoading && <p>Loading policies...</p>}

            {showPolicyForm && (
              <div className="panel" style={{ padding: "25px", marginBottom: "20px" }}>
                <h3 style={{ marginBottom: "20px" }}>
                  {editingPolicy ? "Edit Policy" : "Add New Policy"}
                </h3>

                <form onSubmit={handlePolicySubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>

                    <label>
                      Policy Title *
                      <input name="title" value={policyForm.title} onChange={handlePolicyInputChange} required style={{ width: "100%", padding: "10px", marginTop: "6px" }} />
                    </label>

                    <label>
                      Category *
                      <input name="category" value={policyForm.category} onChange={handlePolicyInputChange} required style={{ width: "100%", padding: "10px", marginTop: "6px" }} />
                    </label>

                    <label>
                      Version
                      <input name="version" value={policyForm.version} onChange={handlePolicyInputChange} style={{ width: "100%", padding: "10px", marginTop: "6px" }} />
                    </label>

                    <label>
                      Owner
                      <input name="owner" value={policyForm.owner} onChange={handlePolicyInputChange} style={{ width: "100%", padding: "10px", marginTop: "6px" }} />
                    </label>

                    <label>
                      Status
                      <select name="status" value={policyForm.status} onChange={handlePolicyInputChange} style={{ width: "100%", padding: "10px", marginTop: "6px" }}>
                        <option>Draft</option>
                        <option>Pending Approval</option>
                        <option>Approved</option>
                        <option>Archived</option>
                      </select>
                    </label>

                    <label>
                      Effective Date
                      <input type="date" name="effectiveDate" value={policyForm.effectiveDate} onChange={handlePolicyInputChange} style={{ width: "100%", padding: "10px", marginTop: "6px" }} />
                    </label>

                    <label>
                      Review Date
                      <input type="date" name="reviewDate" value={policyForm.reviewDate} onChange={handlePolicyInputChange} style={{ width: "100%", padding: "10px", marginTop: "6px" }} />
                    </label>

                  </div>

                  <label style={{ display: "block", marginTop: "16px" }}>
                    Description *
                    <textarea name="description" value={policyForm.description} onChange={handlePolicyInputChange} required rows="4" style={{ width: "100%", padding: "10px", marginTop: "6px" }} />
                  </label>

                  <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button type="submit" className="view-all">
                      {editingPolicy ? "Update Policy" : "Save Policy"}
                    </button>

                    <button type="button" className="view-all" onClick={() => setShowPolicyForm(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="panel" style={{ padding: "20px" }}>
              <div className="panel-header">
                <div>
                  <h3>Security Policies</h3>
                  <p>{policies.length} policies maintained</p>
                </div>
              </div>

              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Policy Title</th>
                      <th>Category</th>
                      <th>Version</th>
                      <th>Owner</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {policies.length > 0 ? (
                      policies.map((policy) => (
                        <tr key={policy._id}>
                          <td>{policy.title}</td>
                          <td>{policy.category}</td>
                          <td>{policy.version}</td>
                          <td>{policy.owner || "—"}</td>
                          <td>
                            <span className={`status ${policy.status.toLowerCase().replaceAll(" ", "-")}`}>
                              {policy.status}
                            </span>
                          </td>
                          <td>
                            <button className="view-all" onClick={() => openEditPolicyForm(policy)}>
                              Edit
                            </button>
                            {" "}
                            <button className="view-all" onClick={() => handleDeletePolicy(policy._id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center", padding: "25px" }}>
                          No policies available. Click Add Policy to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : activePage === "Security Controls" ? (

          <div className="dashboard controls-page">
  <div className="welcome-section">
    <div>
      <h1>Security Controls</h1>
      <p>Manage and monitor your organization's security controls.</p>
    </div>

    <button className="view-all" onClick={openAddControlForm}>
      + Add Control
    </button>
  </div>

  {controlError && (
    <p style={{ color: "red", marginBottom: "15px" }}>
      {controlError}
    </p>
  )}

  {controlLoading && <p>Loading security controls...</p>}

  {showControlForm && (
    <div className="panel" style={{ padding: "25px", marginBottom: "20px" }}>
      <h3 style={{ marginBottom: "20px" }}>
        {editingControl ? "Edit Security Control" : "Add New Security Control"}
      </h3>

      <form onSubmit={handleControlSubmit}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px"
        }}>

          <label>
            Control ID *
            <input
              name="controlId"
              value={controlForm.controlId}
              onChange={handleControlInputChange}
              required
              style={{ width: "100%", padding: "10px", marginTop: "6px" }}
            />
          </label>

          <label>
            Control Title *
            <input
              name="title"
              value={controlForm.title}
              onChange={handleControlInputChange}
              required
              style={{ width: "100%", padding: "10px", marginTop: "6px" }}
            />
          </label>

          <label>
            Category *
            <input
              name="category"
              value={controlForm.category}
              onChange={handleControlInputChange}
              required
              style={{ width: "100%", padding: "10px", marginTop: "6px" }}
            />
          </label>

          <label>
            Linked Policy *
            <select
              name="policy"
              value={controlForm.policy}
              onChange={handleControlInputChange}
              required
              style={{ width: "100%", padding: "10px", marginTop: "6px" }}
            >
              <option value="">Select a policy</option>
              {policies.map((policy) => (
                <option key={policy._id} value={policy._id}>
                  {policy.title} (v{policy.version})
                </option>
              ))}
            </select>
          </label>

          <label>
            Status
            <select
              name="status"
              value={controlForm.status}
              onChange={handleControlInputChange}
              style={{ width: "100%", padding: "10px", marginTop: "6px" }}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </label>

        </div>

        <label style={{ display: "block", marginTop: "16px" }}>
          Description *
          <textarea
            name="description"
            value={controlForm.description}
            onChange={handleControlInputChange}
            required
            rows="3"
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </label>

        <label style={{ display: "block", marginTop: "16px" }}>
          Requirement
          <textarea
            name="requirement"
            value={controlForm.requirement}
            onChange={handleControlInputChange}
            rows="3"
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </label>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button type="submit" className="view-all">
            {editingControl ? "Update Control" : "Save Control"}
          </button>

          <button
            type="button"
            className="view-all"
            onClick={() => setShowControlForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )}
  <div className="panel" style={{ padding: "20px" }}>
  <div className="panel-header">
    <div>
      <h3>Security Controls List</h3>
      <p>{controls.length} controls maintained</p>
    </div>
  </div>

  <div className="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Control ID</th>
          <th>Control Title</th>
          <th>Category</th>
          <th>Linked Policy</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {controls.length > 0 ? (
          controls.map((control) => (
            <tr key={control._id}>
              <td>{control.controlId}</td>
              <td>{control.title}</td>
              <td>{control.category}</td>
              <td>{control.policy?.title || "—"}</td>
              <td>
                <span className={`status ${control.status.toLowerCase()}`}>
                  {control.status}
                </span>
              </td>
              <td>
                <button
                  className="view-all"
                  onClick={() => openEditControlForm(control)}
                >
                  Edit
                </button>
                {" "}
                <button
                  className="view-all"
                  onClick={() => handleDeleteControl(control._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" style={{ textAlign: "center", padding: "25px" }}>
              No security controls available. Click Add Control to create one.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

</div>
        

      ) : activePage === "Audit Scheduling" ? (

        <div className="dashboard audits-page">
          <div className="welcome-section">
            <div>
              <h1>Audit Scheduling</h1>
              <p>Schedule, track and manage organizational audits.</p>
            </div>
      
            <button className="view-all" onClick={openAddAuditForm}>
              + Schedule Audit
            </button>
          </div>


          {auditError && (
  <p style={{ color: "red", marginBottom: "15px" }}>
    {auditError}
  </p>
)}

{auditLoading && <p>Loading audits...</p>}

{showAuditForm && (
  <div className="panel audit-form-panel">
    <h3 style={{ marginBottom: "20px" }}>
      {editingAudit ? "Edit Audit" : "Schedule New Audit"}
    </h3>

    <form onSubmit={handleAuditSubmit}>
    <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  }}
>
  <label>
    Audit Title *
    <input
      name="title"
      value={auditForm.title}
      onChange={handleAuditInputChange}
      required
      placeholder="Enter audit title"
      style={{ width: "100%", padding: "10px", marginTop: "6px" }}
    />
  </label>

  <label>
    Department *
    <select
      name="department"
      value={auditForm.department}
      onChange={handleAuditInputChange}
      required
      style={{ width: "100%", padding: "10px", marginTop: "6px" }}
    >
      <option value="">Select Department</option>
      {departments.map((department) => (
        <option key={department._id} value={department._id}>
          {department.name}
        </option>
      ))}
    </select>
  </label>
</div>

<label style={{ display: "block", marginTop: "16px" }}>
  Description
  <textarea
    name="description"
    value={auditForm.description}
    onChange={handleAuditInputChange}
    rows="3"
    placeholder="Describe the purpose of this audit"
    style={{ width: "100%", padding: "10px", marginTop: "6px" }}
  />
</label>



<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginTop: "16px",
  }}
>
  <label>
    Auditor *
    <input
      name="auditor"
      value={auditForm.auditor}
      onChange={handleAuditInputChange}
      required
      placeholder="Enter auditor User ID"
      style={{ width: "100%", padding: "10px", marginTop: "6px" }}
    />
  </label>

  <label>
    Audit Type
    <select
      name="auditType"
      value={auditForm.auditType}
      onChange={handleAuditInputChange}
      style={{ width: "100%", padding: "10px", marginTop: "6px" }}
    >
      <option value="Internal">Internal</option>
      <option value="External">External</option>
    </select>
  </label>
</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginTop: "16px",
  }}
>
  <label>
    Start Date *
    <input
      type="date"
      name="startDate"
      value={auditForm.startDate}
      onChange={handleAuditInputChange}
      required
      style={{ width: "100%", padding: "10px", marginTop: "6px" }}
    />
  </label>

  <label>
    End Date *
    <input
      type="date"
      name="endDate"
      value={auditForm.endDate}
      onChange={handleAuditInputChange}
      required
      min={auditForm.startDate}
      style={{ width: "100%", padding: "10px", marginTop: "6px" }}
    />
  </label>
</div>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
    marginTop: "16px",
  }}
>
  <label>
    Audit Status
    <select
      name="status"
      value={auditForm.status}
      onChange={handleAuditInputChange}
      style={{ width: "100%", padding: "10px", marginTop: "6px" }}
    >
      <option value="Scheduled">Scheduled</option>
      <option value="In Progress">In Progress</option>
      <option value="Completed">Completed</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  </label>

  <label>
    Overall Result
    <select
      name="overallResult"
      value={auditForm.overallResult}
      onChange={handleAuditInputChange}
      style={{ width: "100%", padding: "10px", marginTop: "6px" }}
    >
      <option value="Pending">Pending</option>
      <option value="Compliant">Compliant</option>
      <option value="Non-Compliant">Non-Compliant</option>
      <option value="Partially Compliant">Partially Compliant</option>
    </select>
  </label>
</div>

<label style={{ display: "block", marginTop: "16px" }}>
  Findings
  <textarea
    name="findings"
    value={auditForm.findings}
    onChange={handleAuditInputChange}
    rows="3"
    placeholder="Enter audit findings, if any"
    style={{ width: "100%", padding: "10px", marginTop: "6px" }}
  />
</label>

<div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
  <button type="submit" className="view-all" disabled={auditLoading}>
    {auditLoading
      ? "Saving..."
      : editingAudit
      ? "Update Audit"
      : "Schedule Audit"}
  </button>

  <button
    type="button"
    className="view-all"
    onClick={() => {
      setShowAuditForm(false);
      setEditingAudit(null);
      setAuditError("");
    }}
  >
    Cancel
  </button>
</div>




    </form>
  </div>
)}


<div className="panel" style={{ marginTop: "20px" }}>
  <div className="panel-header">
    <div>
      <h3>Audits List</h3>
      <p>{audits.length} audits scheduled and tracked</p>
    </div>
  </div>

  <div className="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Audit Title</th>
          <th>Department</th>
          <th>Auditor</th>
          <th>Audit Type</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
          <th>Result</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {audits.length > 0 ? (
          audits.map((audit) => (
            <tr key={audit._id}>
              <td>{audit.title}</td>
              <td>{audit.department?.name || "—"}</td>
              <td>{audit.auditor?.name || "—"}</td>
              <td>{audit.auditType}</td>
              <td>{new Date(audit.startDate).toLocaleDateString()}</td>
              <td>{new Date(audit.endDate).toLocaleDateString()}</td>
              <td>
                <span className={`status ${audit.status.toLowerCase().replace(/\s+/g, "-")}`}>
                  {audit.status}
                </span>
              </td>
              <td>{audit.overallResult}</td>
              <td>
                <button
                  className="view-all"
                  onClick={() => openEditAuditForm(audit)}
                >
                  Edit
                </button>
                {" "}
                <button
                  className="view-all"
                  onClick={() => handleDeleteAudit(audit._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9" style={{ textAlign: "center", padding: "25px" }}>
              No audits available. Click Schedule Audit to create one.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>


        </div>
    ) : activePage === "Evidence Collection" ? (

      
<div className="dashboard evidence-page">
  <div className="welcome-section">
    <div>
      <h1>Evidence Collection</h1>
      <p>Upload, organize and track evidence for security audits.</p>
    </div>

    <button
      className="view-all"
      onClick={() => setShowEvidenceForm(!showEvidenceForm)}
    >
      {showEvidenceForm ? "Close Form" : "+ Upload Evidence"}
    </button>
  </div>

  {evidenceError && (
    <p style={{ color: "red", marginBottom: "15px" }}>
      {evidenceError}
    </p>
  )}

  {showEvidenceForm && (
    <div className="panel" style={{ padding: "25px", marginBottom: "20px" }}>
      <h3 style={{ marginBottom: "20px" }}>Upload New Evidence</h3>

      <form onSubmit={handleEvidenceSubmit}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px"
        }}>
          <label>
            Evidence Title *
            <input
              name="title"
              value={evidenceForm.title}
              onChange={handleEvidenceInputChange}
              required
              placeholder="Enter evidence title"
              style={{ width: "100%", padding: "10px", marginTop: "6px" }}
            />
          </label>

          <label>
            Related Audit *
            <select
              name="audit"
              value={evidenceForm.audit}
              onChange={handleEvidenceInputChange}
              required
              style={{ width: "100%", padding: "10px", marginTop: "6px" }}
            >
              <option value="">Select Audit</option>
              {audits.map((audit) => (
                <option key={audit._id} value={audit._id}>
                  {audit.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Related Security Control *
            <select
              name="control"
              value={evidenceForm.control}
              onChange={handleEvidenceInputChange}
              required
              style={{ width: "100%", padding: "10px", marginTop: "6px" }}
            >
              <option value="">Select Control</option>
              {controls.map((control) => (
                <option key={control._id} value={control._id}>
                  {control.controlId} - {control.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label style={{ display: "block", marginTop: "16px" }}>
          Description
          <textarea
            name="description"
            value={evidenceForm.description}
            onChange={handleEvidenceInputChange}
            rows="3"
            placeholder="Describe the evidence"
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </label>

        <label style={{ display: "block", marginTop: "16px" }}>
          Attach Evidence File * (PDF, JPG, PNG — Maximum 5 MB)
          <input
            type="file"
            name="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleEvidenceInputChange}
            required
            style={{ display: "block", marginTop: "10px" }}
          />
        </label>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <button type="submit" className="view-all" disabled={evidenceLoading}>
            {evidenceLoading ? "Uploading..." : "Submit Evidence"}
          </button>

          <button
            type="button"
            className="view-all"
            onClick={() => setShowEvidenceForm(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )}

  <div className="panel" style={{ padding: "20px" }}>
    <div className="panel-header">
      <div>
        <h3>Evidence Records</h3>
        <p>{evidence.length} evidence records submitted</p>
      </div>
    </div>

    {evidenceLoading && <p>Loading evidence records...</p>}

    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Evidence Title</th>
            <th>Audit</th>
            <th>Security Control</th>
            <th>File</th>
            <th>Uploaded By</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {evidence.length > 0 ? (
            evidence.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.audit?.title || "—"}</td>
                <td>{item.control?.controlId || "—"}</td>
                <td>{item.fileName || "—"}</td>
                <td>{item.uploadedBy?.name || "—"}</td>
                <td>
                  <span className={`status ${(item.status || "Pending Review").toLowerCase().replaceAll(" ", "-")}`}>
                    {item.status || "Pending Review"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            !evidenceLoading && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "25px" }}>
                  No evidence records available. Click Upload Evidence to add one.
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>

    
    
) : activePage === "Audit Findings" ? (
  <div className="dashboard findings-page"> 
    <div className="welcome-section">
  <div>
    <h1>Audit Findings</h1>
    <p>Record, review and track security audit findings.</p>
  </div>

  <button
    className="view-all"
    onClick={() => setShowFindingForm(!showFindingForm)}
  >
    {showFindingForm ? "Close Form" : "+ Create Finding"}
  </button>
</div>

    {findingError && (
      <p style={{ color: "red", marginBottom: "15px" }}>
        {findingError}
      </p>
    )}


    {showFindingForm && (
    <div className="panel" style={{ padding: "25px", marginBottom: "20px" }}>
      <h3 style={{ marginBottom: "20px" }}>Create New Finding</h3>

      <form onSubmit={handleFindingSubmit}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px"
        }}>
          <label>
            Finding Title *
            <input
              value={findingTitle}
              onChange={(e) => setFindingTitle(e.target.value)}
              required
              placeholder="Enter finding title"
              style={{ width: "100%", padding: "10px", marginTop: "6px" }}
            />
          </label>

          <label>
            Related Audit *
            <select
              value={findingAudit}
              onChange={(e) => setFindingAudit(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", marginTop: "6px" }}
            >
              <option value="">Select Audit</option>
              {audits.map((audit) => (
                <option key={audit._id} value={audit._id}>
                  {audit.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Security Control *
            <select
              value={findingControl}
              onChange={(e) => setFindingControl(e.target.value)}
              required
              style={{ width: "100%", padding: "10px", marginTop: "6px" }}
            >
              <option value="">Select Control</option>
              {controls.map((control) => (
                <option key={control._id} value={control._id}>
                  {control.controlId} - {control.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Related Asset
            <select
              value={findingAsset}
              onChange={(e) => setFindingAsset(e.target.value)}
              style={{ width: "100%", padding: "10px", marginTop: "6px" }}
            >
              <option value="">Select Asset (Optional)</option>
              {assets.map((asset) => (
                <option key={asset._id} value={asset._id}>
                  {asset.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Severity
            <select
              value={findingSeverity}
              onChange={(e) => setFindingSeverity(e.target.value)}
              style={{ width: "100%", padding: "10px", marginTop: "6px" }}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </label>

          <label>
            Status
            <select
              value={findingStatus}
              onChange={(e) => setFindingStatus(e.target.value)}
              style={{ width: "100%", padding: "10px", marginTop: "6px" }}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </label>
        </div>

        <label style={{ display: "block", marginTop: "16px" }}>
          Description *
          <textarea
            value={findingDescription}
            onChange={(e) => setFindingDescription(e.target.value)}
            required
            rows="3"
            placeholder="Describe the audit finding"
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </label>

        <label style={{ display: "block", marginTop: "16px" }}>
          Recommendation
          <textarea
            value={findingRecommendation}
            onChange={(e) => setFindingRecommendation(e.target.value)}
            rows="3"
            placeholder="Enter recommended corrective action"
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </label>

        <button
          type="submit"
          className="view-all"
          disabled={findingLoading}
          style={{ marginTop: "20px" }}
        >
          {findingLoading ? "Saving..." : "Submit Finding"}
        </button>
      </form>
    </div>

    )}

    <div className="panel" style={{ padding: "20px" }}>
      <div className="panel-header">
        <div>
          <h3>Finding Records</h3>
          <p>{liveFindings.length} findings recorded</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Finding</th>
              <th>Audit</th>
              <th>Control</th>
              <th>Asset</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {liveFindings.length > 0 ? (
              liveFindings.map((finding) => (
                <tr key={finding._id}>
                  <td>{finding.title}</td>
                  <td>{finding.audit?.title || "—"}</td>
                  <td>{finding.control?.controlId || "—"}</td>
                  <td>{finding.asset?.name || "—"}</td>
                  <td>{finding.severity}</td>
                  <td>
                    <span className={`status ${(finding.status || "Open").toLowerCase().replaceAll(" ", "-")}`}>
                      {finding.status || "Open"}
                    </span>
                  </td>
                  <td>
  <div style={{ display: "flex", gap: "8px" }}>
    <button
      className="view-all"
      onClick={() => openEditFindingForm(finding)}
                        >
                          Edit
                        </button>

                        {user?.role === "Admin" && (
                          <button
                            className="view-all"
                            onClick={() => handleDeleteFinding(finding._id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "25px" }}>
                  No findings recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
) : activePage === "Departments & Assets" ? (
  

          <div className="dashboard departments-page">
            <div className="welcome-section">
              <div>
                <h1>Departments & Assets</h1>
                <p>Manage organizational departments and their assets.</p>

              </div>

              <button className="view-all" onClick={openAddDepartmentForm}>
                + Add Department
              </button>
            </div>

            {departmentError && (
              <p style={{ color: "red", marginBottom: "15px" }}>
                {departmentError}
              </p>
            )}

            {departmentLoading && <p>Loading departments...</p>}

            {showDepartmentForm && (
  <div className="panel" style={{ padding: "25px", marginBottom: "20px" }}>
    <h3 style={{ marginBottom: "20px" }}>
      {editingDepartment ? "Edit Department" : "Add New Department"}
    </h3>

    <form onSubmit={handleDepartmentSubmit}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px"
      }}>

        <label>
          Department Name *
          <input
            name="name"
            value={departmentForm.name}
            onChange={handleDepartmentInputChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </label>

        <label>
          Department Manager
          <input
            name="manager"
            value={departmentForm.manager}
            onChange={handleDepartmentInputChange}
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </label>

        <label>
          Status
          <select
            name="status"
            value={departmentForm.status}
            onChange={handleDepartmentInputChange}
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>

      </div>

      <label style={{ display: "block", marginTop: "16px" }}>
        Description
        <textarea
          name="description"
          value={departmentForm.description}
          onChange={handleDepartmentInputChange}
          rows="3"
          style={{ width: "100%", padding: "10px", marginTop: "6px" }}
        />
      </label>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button type="submit" className="view-all">
          {editingDepartment ? "Update Department" : "Save Department"}
        </button>

        <button
          type="button"
          className="view-all"
          onClick={() => setShowDepartmentForm(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}
<div className="panel" style={{ padding: "20px" }}>
  <div className="panel-header">
    <div>
      <h3>Departments List</h3>
      <p>{departments.length} departments maintained</p>
    </div>
  </div>

  <div className="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Department Name</th>
          <th>Description</th>
          <th>Manager</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {departments.length > 0 ? (
          departments.map((department) => (
            <tr key={department._id}>
              <td>{department.name}</td>
              <td>{department.description || "—"}</td>
              <td>{department.manager || "—"}</td>
              <td>
                <span className={`status ${department.status.toLowerCase()}`}>
                  {department.status}
                </span>
              </td>
              <td>
                <button
                  className="view-all"
                  onClick={() => openEditDepartmentForm(department)}
                >
                  Edit
                </button>
                {" "}
                <button
                  className="view-all"
                  onClick={() => handleDeleteDepartment(department._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" style={{ textAlign: "center", padding: "25px" }}>
              No departments available. Click Add Department to create one.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

{/* ASSET MANAGEMENT */}

<div className="panel" style={{ marginTop: "25px" }}>
  <div className="panel-header">
    <div>
      <h3>Asset Management</h3>
      <p>Register and manage organizational assets.</p>
    </div>

    <button className="view-all" onClick={openAddAssetForm}>
      + Add Asset
    </button>
  </div>

  {assetError && (
    <p style={{ color: "red", marginBottom: "15px" }}>
      {assetError}
    </p>
  )}

  {assetLoading && <p>Loading assets...</p>}

  {showAssetForm && (
    <form onSubmit={handleAssetSubmit}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px"
      }}>
        <label>
          Asset Name *
          <input
            name="name"
            value={assetForm.name}
            onChange={handleAssetInputChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </label>

        <label>
          Asset Type *
          <input
            name="assetType"
            value={assetForm.assetType}
            onChange={handleAssetInputChange}
            required
            placeholder="Laptop, Server, Software..."
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </label>

        <label>
          Department *
          <select
            name="department"
            value={assetForm.department}
            onChange={handleAssetInputChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Owner
          <input
            name="owner"
            value={assetForm.owner}
            onChange={handleAssetInputChange}
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </label>

        <label>
          Location
          <input
            name="location"
            value={assetForm.location}
            onChange={handleAssetInputChange}
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          />
        </label>

        <label>
          Criticality
          <select
            name="criticality"
            value={assetForm.criticality}
            onChange={handleAssetInputChange}
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </label>

        <label>
          Status
          <select
            name="status"
            value={assetForm.status}
            onChange={handleAssetInputChange}
            style={{ width: "100%", padding: "10px", marginTop: "6px" }}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
        </label>
      </div>

      <label style={{ display: "block", marginTop: "16px" }}>
        Description
        <textarea
          name="description"
          value={assetForm.description}
          onChange={handleAssetInputChange}
          rows="3"
          style={{ width: "100%", padding: "10px", marginTop: "6px" }}
        />
      </label>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button type="submit" className="view-all">
          {editingAsset ? "Update Asset" : "Save Asset"}
        </button>

        <button
          type="button"
          className="view-all"
          onClick={() => setShowAssetForm(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  )}
</div>

{/* ASSETS LIST */}

<div className="panel" style={{ marginTop: "20px" }}>
  <div className="panel-header">
    <div>
      <h3>Assets List</h3>
      <p>{assets.length} assets registered</p>
    </div>
  </div>

  <div className="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Asset Name</th>
          <th>Type</th>
          <th>Department</th>
          <th>Owner</th>
          <th>Criticality</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {assets.length > 0 ? (
          assets.map((asset) => (
            <tr key={asset._id}>
              <td>{asset.name}</td>
              <td>{asset.assetType}</td>
              <td>{asset.department?.name || "—"}</td>
              <td>{asset.owner || "—"}</td>
              <td>{asset.criticality}</td>
              <td>
                <span className={`status ${asset.status.toLowerCase().replace(/\s+/g, "-")}`}>
                  {asset.status}
                </span>
              </td>
              <td>
                <button
                  className="view-all"
                  onClick={() => openEditAssetForm(asset)}
                >
                  Edit
                </button>
                {" "}
                <button
                  className="view-all"
                  onClick={() => handleDeleteAsset(asset._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" style={{ textAlign: "center", padding: "25px" }}>
              No assets available. Click Add Asset to register one.
            </td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
  </div>
</div>

) : activePage === "Corrective Actions" ? (

  <div className="dashboard">
    <div className="welcome-section">
      <div>
        <h1>Corrective Actions</h1>
        <p>Manage and track corrective actions.</p>
      </div>
    </div>
  </div>

) : activePage === "Reports" ? (

  <div className="dashboard reports-page">
    <div className="welcome-section">
      <div>
        <h1>Reports & Analytics</h1>
        <p>
          View compliance summaries and organizational security reports.
        </p>
      </div>
      <button className="view-all" onClick={handleExportReport}>
        Export CSV
      </button>
      <button
        className="view-all"
        onClick={() => window.print()}
      >
        Print Report
      </button>
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Policies</h3>
        <h2>{policies.length}</h2>
      </div>

      <div className="stat-card">
        <h3>Total Controls</h3>
        <h2>{controls.length}</h2>
      </div>

      <div className="stat-card">
        <h3>Total Audits</h3>
        <h2>{audits.length}</h2>
      </div>

      <div className="stat-card">
        <h3>Total Findings</h3>
        <h2>{liveFindings.length}</h2>
      </div>

      <div className="stat-card">
        <h3>Evidence Records</h3>
        <h2>{evidence.length}</h2>
      </div>

      <div className="stat-card">
        <h3>Corrective Actions</h3>
        <h2>{correctiveActions.length}</h2>
      </div>
    </div>

    <div className="panel" style={{ padding: "20px", marginTop: "25px" }}>
      <h2>Compliance Report Summary</h2>
      <p>Overview of the current records in your platform.</p>

      <table>
        <thead>
          <tr>
            <th>Module</th>
            <th>Total Records</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Departments</td>
            <td>{departments.length}</td>
          </tr>
          <tr>
            <td>Policies</td>
            <td>{policies.length}</td>
          </tr>
          <tr>
            <td>Controls</td>
            <td>{controls.length}</td>
          </tr>
          <tr>
            <td>Assets</td>
            <td>{assets.length}</td>
          </tr>
          <tr>
            <td>Audits</td>
            <td>{audits.length}</td>
          </tr>
          <tr>
            <td>Findings</td>
            <td>{liveFindings.length}</td>
          </tr>
          <tr>
            <td>Evidence</td>
            <td>{evidence.length}</td>
          </tr>
          <tr>
            <td>Corrective Actions</td>
            <td>{correctiveActions.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

) : activePage === "User Management" ? (
  <div className="dashboard user-management-page">
    <div className="welcome-section">
      <div>
        <h1>User Management</h1>
        <p>View and manage platform users and their roles.</p>
      </div>
    </div>

    {user?.role !== "Admin" ? (
      <div className="panel">
        <p>Only Admin users can access User Management.</p>
      </div>
    ) : (
      <div className="panel">
        <h2>Registered Users</h2>
        {userUpdateSuccess && (
  <div className="success-message">
    {userUpdateSuccess}
  </div>
)}

        {usersLoading ? (
          <p>Loading users...</p>
        ) : usersError ? (
          <p>{usersError}</p>
        ) : users.length === 0 ? (
            <p>No registered users found.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Department</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>
                        {editingUserId === item._id ? (
                          <select
                            value={editUserRole}
                            onChange={(e) => setEditUserRole(e.target.value)}
                          >
                            <option value="Admin">Admin</option>
                            <option value="Compliance Officer">Compliance Officer</option>
                            <option value="Auditor">Auditor</option>
                            <option value="Department Owner">Department Owner</option>
                          </select>
                        ) : (
                          item.role
                        )}
                      </td>

                      <td>
                        {editingUserId === item._id ? (
                          <input
                            type="text"
                            value={editUserDepartment}
                            onChange={(e) => setEditUserDepartment(e.target.value)}
                            placeholder="Enter department"
                          />
                        ) : (
                          item.department || "Not assigned"
                        )}
                      </td>
                      <td>
                        {editingUserId === item._id ? (
                          <>
                            <button
                              type="button"
                              disabled={userUpdateLoading}
                              onClick={() => handleUserUpdate(item._id)}
                            >
                              {userUpdateLoading ? "Saving..." : "Save"}
                            </button>

                            <button
                              type="button"
                              disabled={userUpdateLoading}
                              onClick={() => {
                                setEditingUserId(null);
                                setEditUserRole("");
                                setEditUserDepartment("");
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingUserId(item._id);
                              setEditUserRole(item.role);
                              setEditUserDepartment(item.department || "");
                            }}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
    )}
  </div>
) : (
  <div className="placeholder-page">
    <div className="placeholder-icon">
      <Settings size={35} />
    </div>
    <h2>{activePage}</h2>
    <p>
      This module will be implemented in the next development phase.
    </p>
  </div>
)}



</main>
    </div>
  );
}

export default App;
