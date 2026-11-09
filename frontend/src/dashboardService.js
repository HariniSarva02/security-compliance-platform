import { apiRequest } from "./api";
export const loginUser = async (email, password) => {
  return await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const getDashboardStats = async () => {
  return await apiRequest("/dashboard");
};

export const getFindings = async () => {
  return await apiRequest("/findings");
};

export const getCorrectiveActions = async () => {
  return await apiRequest("/corrective-actions");
};


export const getUsers = async () => {
  return await apiRequest("/users");
};


export const createCorrectiveAction = async (actionData) => {
  return await apiRequest("/corrective-actions", {
    method: "POST",
    body: JSON.stringify(actionData),
  });
};


export const getPolicies = async () => {
  return await apiRequest("/policies");
};

export const createPolicy = async (policyData) => {
  return await apiRequest("/policies", {
    method: "POST",
    body: JSON.stringify(policyData),
  });
};

export const updatePolicy = async (id, policyData) => {
  return await apiRequest(`/policies/${id}`, {
    method: "PUT",
    body: JSON.stringify(policyData),
  });
};

export const deletePolicy = async (id) => {
  return await apiRequest(`/policies/${id}`, {
    method: "DELETE",
  });
};

// Security Controls API

export const getControls = async () => {
  return await apiRequest("/controls");
};

export const createControl = async (controlData) => {
  return await apiRequest("/controls", {
    method: "POST",
    body: JSON.stringify(controlData),
  });
};

export const updateControl = async (id, controlData) => {
  return await apiRequest(`/controls/${id}`, {
    method: "PUT",
    body: JSON.stringify(controlData),
  });
};

export const deleteControl = async (id) => {
  return await apiRequest(`/controls/${id}`, {
    method: "DELETE",
  });
};

// Departments API

export const getDepartments = async () => {
  return await apiRequest("/departments");
};

export const createDepartment = async (departmentData) => {
  return await apiRequest("/departments", {
    method: "POST",
    body: JSON.stringify(departmentData),
  });
};

export const updateDepartment = async (id, departmentData) => {
  return await apiRequest(`/departments/${id}`, {
    method: "PUT",
    body: JSON.stringify(departmentData),
  });
};

export const deleteDepartment = async (id) => {
  return await apiRequest(`/departments/${id}`, {
    method: "DELETE",
  });
};



// Assets API

export const getAssets = async () => {
  return await apiRequest("/assets");
};

export const createAsset = async (assetData) => {
  return await apiRequest("/assets", {
    method: "POST",
    body: JSON.stringify(assetData),
  });
};

export const updateAsset = async (id, assetData) => {
  return await apiRequest(`/assets/${id}`, {
    method: "PUT",
    body: JSON.stringify(assetData),
  });
};

export const deleteAsset = async (id) => {
  return await apiRequest(`/assets/${id}`, {
    method: "DELETE",
  });
};


// Audits API

export const getAudits = async () => {
  return await apiRequest("/audits");
};

export const createAudit = async (auditData) => {
  return await apiRequest("/audits", {
    method: "POST",
    body: JSON.stringify(auditData),
  });
};

export const updateAudit = async (id, auditData) => {
  return await apiRequest(`/audits/${id}`, {
    method: "PUT",
    body: JSON.stringify(auditData),
  });
};

export const deleteAudit = async (id) => {
  return await apiRequest(`/audits/${id}`, {
    method: "DELETE",
  });
};

// Evidence Collection API

export const getEvidence = async () => {
  return await apiRequest("/evidence");
};

export const uploadEvidence = async (formData) => {
  return await apiRequest("/evidence", {
    method: "POST",
    body: formData,
  });
};

export const createFinding = async (findingData) => {
  return await apiRequest("/findings", {
    method: "POST",
    body: JSON.stringify(findingData),
  });
};



export const updateFinding = async (id, findingData) => {
  return await apiRequest(`/findings/${id}`, {
    method: "PUT",
    body: JSON.stringify(findingData),
  });
};

export const deleteFinding = async (id) => {
  return await apiRequest(`/findings/${id}`, {
    method: "DELETE",
  });
};
