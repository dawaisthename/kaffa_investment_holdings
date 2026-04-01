import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Newspaper,
  Briefcase,
  X,
  Loader2,
  LogOut,
  ShieldCheck,
  User,
  Mail,
  FileText,
  Download,
  EyeOff,
  Eye,
  Globe,
  Users,
  Camera,
  Phone,
} from "lucide-react";
import client from "../../api/client";

export default function AdminDashboard() {
  // --- CORE STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("kaffa_token"),
  );
  const [activeTab, setActiveTab] = useState("news");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // --- AUTH & SECURITY STATES ---
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [forgotData, setForgotData] = useState({ username: "" });
  const [resetData, setResetData] = useState({
    username: "",
    token: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [authMode, setAuthMode] = useState("login");
  const [pwdData, setPwdData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    login: false,
    current: false,
    new: false,
    confirm: false,
  });

  // --- UI FEEDBACK & MODALS ---
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    id: null,
    title: "",
  });
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [editingId, setEditingId] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [previewResumeUrl, setPreviewResumeUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  // --- NEW: FILE STATE FOR TEAM IMAGES ---
  const [selectedFile, setSelectedFile] = useState(null);

  // --- FORM DATA (Unified for News, Careers, Portfolio, and TEAM) ---
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    description: "",
    category: "Company News",
    location: "",
    department: "General",
    jobType: "Full-time",
    sector: "Real Estate",
    region: "East Africa",
    featured: false,
    // Team Specific Fields
    fullName: "",
    roleTitle: "",
    yearsExperience: 0,
    biography: "",
    //Contact information
    city: "",
    country: "",
    addressLine: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  const toggleVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const showToast = (msg, type = "success") => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 4000);
  };

  const fetchData = async () => {
    if (activeTab === "settings") return;
    setLoading(true);
    try {
      {
        console.log(`Fetching data for: ${activeTab}`);
      }
      const response = await client.get(`/${activeTab}`);
      setData(response.data);
    } catch (err) {
      if (err.response?.status === 401) handleLogout();
      showToast("Failed to fetch data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn, activeTab]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("resetToken");
    const username = params.get("username");
    if (token) {
      setAuthMode("reset");
      setResetData((prev) => ({
        ...prev,
        token,
        username: username || prev.username,
      }));
    }
  }, []);

  // --- HANDLERS ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    try {
      const response = await client.post("/auth/login", loginData);
      localStorage.setItem("kaffa_token", response.data.token);
      setIsLoggedIn(true);
      showToast("Access Granted. Welcome, Admin.");
    } catch (err) {
      setLoginError(err.response?.data?.message || "Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("kaffa_token");
    setIsLoggedIn(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    try {
      const response = await client.post("/auth/forgot-password", {
        username: forgotData.username,
      });
      showToast(response.data?.message || "Reset email sent");
      setAuthMode("reset");
      setResetData((prev) => ({
        ...prev,
        username: forgotData.username || prev.username,
      }));
    } catch (err) {
      setLoginError(
        err.response?.data?.message || "Failed to send reset email",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (resetData.newPassword !== resetData.confirmPassword) {
      setLoginError("New passwords do not match");
      return;
    }
    setLoading(true);
    setLoginError("");
    try {
      const response = await client.post("/auth/reset-password", {
        username: resetData.username,
        token: resetData.token,
        newPassword: resetData.newPassword,
      });
      showToast(response.data?.message || "Password reset successful");
      setAuthMode("login");
      setResetData({
        username: "",
        token: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setLoginError(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (pwdData.newPassword !== pwdData.confirmPassword) {
      return showToast("Passwords do not match", "error");
    }
    setLoading(true);
    try {
      await client.put("/auth/update-password", {
        currentPassword: pwdData.currentPassword,
        newPassword: pwdData.newPassword,
      });
      showToast("Security credentials updated");
      setPwdData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      showToast(err.response?.data?.message || "Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setSelectedFile(null);
    setFormData({
      title: "",
      content: "",
      description: "",
      category: activeTab === "news" ? "Company News" : "Management",
      location: "",
      department: "General",
      jobType: "Full-time",
      sector: "Real Estate",
      region: "East Africa",
      featured: false,
      fullName: "",
      roleTitle: "",
      yearsExperience: 0,
      biography: "",
      //contact information
      city: "",
      country: "",
      addressLine: "",
      zipCode: "",
      phone: "",
      email: "",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item._id);
    setSelectedFile(null);
    setFormData({
      ...item,
      title: item.title || "",
      content: item.content || "",
      description: item.description || "",
      sector: item.sector || "Real Estate",
      region: item.region || "East Africa",
      fullName: item.fullName || "",
      roleTitle: item.roleTitle || "",
      yearsExperience: item.yearsExperience || 0,
      biography: item.biography || "",
      department: item.department || "General",
      city: item.city || "",
      country: item.country || "",
      addressLine: item.addressLine || "",
      zipCode: item.zipCode || "",
      phone: item.phone || "",
      email: item.email || "",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payload;
      let config = {};

      if (activeTab === "team") {
        // Use FormData for Team Image Upload
        payload = new FormData();
        payload.append("fullName", formData.fullName);
        payload.append("roleTitle", formData.roleTitle);
        payload.append("yearsExperience", formData.yearsExperience);
        payload.append("biography", formData.biography);
        payload.append("department", formData.department);
        if (selectedFile) {
          payload.append("profileImage", selectedFile);
        }
        config = { headers: { "Content-Type": "multipart/form-data" } };
      } else {
        // Normal JSON payload for other tabs
        payload = { ...formData };
        if (activeTab === "portfolio") delete payload.content;
        else delete payload.description;
      }

      if (editingId) {
        await client.put(`/${activeTab}/${editingId}`, payload, config);
        showToast("Record updated");
      } else {
        await client.post(`/${activeTab}`, payload, config);
        showToast("Entry published successfully");
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || "Submission error", "error");
    } finally {
      setLoading(false);
    }
  };

  const triggerDelete = (item) => {
    setConfirmModal({
      show: true,
      id: item._id,
      title: item.title || item.fullName,
    });
  };

  const executeDelete = async () => {
    setLoading(true);
    try {
      await client.delete(`/${activeTab}/${confirmModal.id}`);
      showToast("Record deleted");
      fetchData();
    } catch (err) {
      showToast("Deletion failed", "error");
    } finally {
      setLoading(false);
      setConfirmModal({ show: false, id: null, title: "" });
    }
  };

  const openResume = (path) => {
    if (!path) return showToast("No file attached", "error");
    const url = `http://localhost:5000/${path.replace(/\\/g, "/")}`;
    setPreviewResumeUrl(url);
    setShowResumeModal(true);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(previewResumeUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Candidate_Resume.pdf";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      showToast("Download failed", "error");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0a1622] flex items-center justify-center p-6">
        <form
          onSubmit={
            authMode === "login"
              ? handleLogin
              : authMode === "forgot"
                ? handleForgotPassword
                : handleResetPassword
          }
          className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-[#c5a35d]"
        >
          <div className="flex justify-center mb-6 text-[#c5a35d] bg-[#fcf8ef] p-4 rounded-full w-fit mx-auto">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-serif font-bold mb-8 text-[#0a1622] text-center uppercase tracking-widest">
            {authMode === "login"
              ? "Kaffa Admin"
              : authMode === "forgot"
                ? "Forgot Password"
                : "Reset Password"}
          </h2>
          <div className="space-y-4">
            {(authMode === "login" ||
              authMode === "forgot" ||
              authMode === "reset") && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={
                    authMode === "login"
                      ? loginData.username
                      : authMode === "forgot"
                        ? forgotData.username
                        : resetData.username
                  }
                  className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[#c5a35d]"
                  onChange={(e) => {
                    if (authMode === "login") {
                      setLoginData({ ...loginData, username: e.target.value });
                    } else if (authMode === "forgot") {
                      setForgotData({ username: e.target.value });
                    } else {
                      setResetData({ ...resetData, username: e.target.value });
                    }
                  }}
                />
                <User
                  className="absolute left-4 top-4 text-gray-300"
                  size={20}
                />
              </div>
            )}
            {authMode === "login" && (
              <div className="relative">
                <input
                  type={showPasswords.login ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={loginData.password}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[#c5a35d] pr-12"
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => toggleVisibility("login")}
                  className="absolute right-4 top-4 text-gray-300 hover:text-[#c5a35d]"
                >
                  {showPasswords.login ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            )}
            {authMode === "reset" && (
              <>
                <input
                  type="text"
                  placeholder="Reset token"
                  required
                  value={resetData.token}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[#c5a35d]"
                  onChange={(e) =>
                    setResetData({ ...resetData, token: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="New password"
                  required
                  value={resetData.newPassword}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[#c5a35d]"
                  onChange={(e) =>
                    setResetData({ ...resetData, newPassword: e.target.value })
                  }
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  required
                  value={resetData.confirmPassword}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[#c5a35d]"
                  onChange={(e) =>
                    setResetData({
                      ...resetData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </>
            )}
          </div>
          {loginError && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider">
              {loginError}
            </div>
          )}
          <button
            disabled={loading}
            className="w-full mt-8 bg-[#0a1622] text-white py-4 rounded-md font-bold hover:bg-[#162a3d] transition-all flex justify-center items-center gap-2 tracking-widest text-xs"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : authMode === "login" ? (
              "SECURE LOGIN"
            ) : authMode === "forgot" ? (
              "SEND RESET LINK"
            ) : (
              "RESET PASSWORD"
            )}
          </button>
          <div className="mt-5 text-center text-xs">
            {authMode === "login" ? (
              <button
                type="button"
                className="text-[#0a1622] hover:text-[#c5a35d] font-bold uppercase tracking-wider"
                onClick={() => {
                  setAuthMode("forgot");
                  setLoginError("");
                }}
              >
                Forgot password?
              </button>
            ) : (
              <button
                type="button"
                className="text-[#0a1622] hover:text-[#c5a35d] font-bold uppercase tracking-wider"
                onClick={() => {
                  setAuthMode("login");
                  setLoginError("");
                }}
              >
                Back to login
              </button>
            )}
          </div>
          <div className="mt-4 text-center text-xs">
            <a
              href="/"
              className="text-gray-500 hover:text-[#c5a35d] font-bold uppercase tracking-wider"
            >
              Back to main site
            </a>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9998] bg-[#fcfcfc] flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0a1622] text-white flex flex-col shadow-2xl">
        <div className="p-8 border-b border-white/5">
          <span className="text-[#c5a35d] font-bold tracking-[0.3em] text-[10px] uppercase block mb-1">
            Kaffa Holdings
          </span>
          <span className="text-xl font-serif font-bold">Internal Portal</span>
        </div>
        <nav className="flex-1 p-6 space-y-3">
          {[
            {
              id: "news",
              label: "News & Media",
              icon: <Newspaper size={18} />,
            },
            { id: "portfolio", label: "Portfolio", icon: <Globe size={18} /> },
            { id: "team", label: "Leadership Team", icon: <Users size={18} /> },
            { id: "careers", label: "Careers", icon: <Briefcase size={18} /> },
            {
              id: "applications",
              label: "Job Applications",
              icon: <FileText size={18} />,
            },
            {
              id: "contactInfo",
              label: "Office Locations",
              icon: <Phone size={18} />,
            },
            {
              id: "contacts",
              label: "Contact Inquiries",
              icon: <Mail size={18} />,
            },
            {
              id: "settings",
              label: "Account Security",
              icon: <ShieldCheck size={18} />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-4 w-full p-4 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id ? "bg-[#c5a35d] text-[#0a1622]" : "text-gray-400 hover:bg-white/5"}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full p-4 rounded-lg text-red-400 hover:bg-red-500/10 text-sm font-bold"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 h-full overflow-y-auto p-12 bg-[#f8f9fa]">
        {activeTab === "settings" ? (
          <div className="max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100 p-10">
            <h2 className="text-3xl font-serif font-bold text-[#0a1622] mb-2">
              Account Security
            </h2>
            <p className="text-gray-400 text-sm mb-10">
              Update your administrative access credentials.
            </p>
            <form onSubmit={handlePasswordUpdate} className="space-y-6">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    required
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                    value={pwdData.currentPassword}
                    onChange={(e) =>
                      setPwdData({
                        ...pwdData,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => toggleVisibility("current")}
                    className="absolute right-4 top-4 text-gray-300 hover:text-[#c5a35d]"
                  >
                    {showPasswords.current ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      required
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                      value={pwdData.newPassword}
                      onChange={(e) =>
                        setPwdData({ ...pwdData, newPassword: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => toggleVisibility("new")}
                      className="absolute right-4 top-4 text-gray-300 hover:text-[#c5a35d]"
                    >
                      {showPasswords.new ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400">
                    Confirm New
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      required
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                      value={pwdData.confirmPassword}
                      onChange={(e) =>
                        setPwdData({
                          ...pwdData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => toggleVisibility("confirm")}
                      className="absolute right-4 top-4 text-gray-300 hover:text-[#c5a35d]"
                    >
                      {showPasswords.confirm ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#0a1622] text-white px-10 py-4 rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#c5a35d] hover:text-[#0a1622] transition-all"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  "Update Credentials"
                )}
              </button>
            </form>
          </div>
        ) : (
          <>
            <header className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-4xl font-serif font-bold text-[#0a1622] mb-2 capitalize">
                  {activeTab === "team" ? "Leadership Team" : activeTab}
                </h1>
                <p className="text-gray-400 text-sm font-medium">
                  Manage the firm's data records.
                </p>
              </div>
              {!["contacts", "applications"].includes(activeTab) && (
                <button
                  onClick={handleOpenCreate}
                  className="bg-[#0a1622] text-white px-8 py-4 rounded-md font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-[#c5a35d] transition-all shadow-xl"
                >
                  <Plus size={18} /> Add New
                </button>
              )}
            </header>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {loading ? (
                <div className="p-20 flex justify-center">
                  <Loader2 className="animate-spin text-[#c5a35d]" size={40} />
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50/50 border-b border-gray-100 text-left text-[10px] uppercase tracking-widest font-bold text-gray-400">
                    {activeTab === "contactInfo" ? (
                      <tr>
                        <th className="p-6">Location</th>
                        <th className="p-6">Address</th>
                        <th className="p-6">Contact</th>
                        <th className="p-6 text-right">Actions</th>
                      </tr>
                    ) : (
                      <tr>
                        <th className="p-6">
                          {activeTab === "portfolio"
                            ? "Asset Details"
                            : activeTab === "team"
                              ? "Member Name"
                              : ["contacts", "applications"].includes(activeTab)
                                ? "Sender"
                                : "Details"}
                        </th>
                        <th className="p-6">
                          {activeTab === "portfolio"
                            ? "Classification"
                            : activeTab === "team"
                              ? "Role / Title"
                              : ["contacts", "applications"].includes(activeTab)
                                ? "Context"
                                : "Category"}
                        </th>
                        <th className="p-6 text-right">Actions</th>
                      </tr>
                    )}
                  </thead>

                  <tbody className="divide-y divide-gray-50">
                    {data.map((item) =>
                      activeTab === "contactInfo" ? (
                        <tr key={item._id} className="hover:bg-gray-50/50">
                          <td className="p-6 font-bold text-[#0a1622]">
                            {item.city}, {item.country}
                          </td>

                          <td className="p-6 text-gray-500">
                            {item.addressLine}
                          </td>

                          <td className="p-6 text-gray-500">
                            {item.phone} | {item.email}
                          </td>

                          <td className="p-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => handleOpenEdit(item)}
                                className="bg-blue-50 p-3 rounded-lg text-blue-400 hover:bg-blue-500 hover:text-white"
                              >
                                <Edit3 size={18} />
                              </button>

                              <button
                                onClick={() => triggerDelete(item)}
                                className="bg-red-50 p-3 rounded-lg text-red-400 hover:bg-red-500 hover:text-white"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        <tr key={item._id} className="hover:bg-gray-50/50">
                          <td className="p-6">
                            <div className="font-bold text-[#0a1622] text-lg">
                              {item.fullName || item.title}
                            </div>
                            <div className="text-sm text-[#c5a35d]">
                              {item.email ||
                                item.location ||
                                (activeTab === "portfolio" && item.region) ||
                                (activeTab === "team" && item.department)}
                            </div>
                          </td>

                          <td className="p-6 text-sm text-gray-500 italic">
                            {activeTab === "portfolio"
                              ? item.sector
                              : activeTab === "team"
                                ? item.roleTitle
                                : item.message ||
                                  item.position ||
                                  item.category ||
                                  item.department}
                          </td>

                          <td className="p-6 text-right">
                            <div className="flex justify-end gap-2">
                              {activeTab === "applications" && (
                                <button
                                  onClick={() => openResume(item.resumePath)}
                                  className="bg-amber-50 p-3 rounded-lg text-amber-500 hover:bg-amber-500 hover:text-white"
                                >
                                  <Eye size={18} />
                                </button>
                              )}

                              {!["contacts", "applications"].includes(
                                activeTab,
                              ) && (
                                <button
                                  onClick={() => handleOpenEdit(item)}
                                  className="bg-blue-50 p-3 rounded-lg text-blue-400 hover:bg-blue-500 hover:text-white"
                                >
                                  <Edit3 size={18} />
                                </button>
                              )}

                              <button
                                onClick={() => triggerDelete(item)}
                                className="bg-red-50 p-3 rounded-lg text-red-400 hover:bg-red-500 hover:text-white"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </main>

      {/* CRUD MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0a1622]/95 backdrop-blur-md flex items-center justify-center p-6 z-[10000]">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-serif font-bold text-[#0a1622]">
                {editingId ? "Edit" : "Create"}{" "}
                {activeTab === "team" ? "Member" : activeTab}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* --- SHARED TITLE / NAME FIELD --- */}
              {activeTab !== "team" && activeTab !== "contactInfo" && (
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
                    Title / Asset Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
              )}

              {activeTab === "team" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">
                      Role Title
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                      value={formData.roleTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, roleTitle: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              )}

              {/* --- TEAM SPECIFIC PHOTO & EXPERIENCE --- */}
              {activeTab === "team" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none"
                      value={formData.yearsExperience}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          yearsExperience: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2 flex items-center gap-2">
                      <Camera size={14} /> Profile Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs"
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                  </div>
                </div>
              )}

              {/* --- PORTFOLIO SPECIFIC --- */}
              {activeTab === "portfolio" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
                        Sector
                      </label>
                      <select
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none"
                        value={formData.sector}
                        onChange={(e) =>
                          setFormData({ ...formData, sector: e.target.value })
                        }
                      >
                        {[
                          "Real Estate",
                          "Technology",
                          "Logistics",
                          "Agriculture",
                          "Financial Services",
                          "Energy",
                        ].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
                        Region
                      </label>
                      <select
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none"
                        value={formData.region}
                        onChange={(e) =>
                          setFormData({ ...formData, region: e.target.value })
                        }
                      >
                        {["East Africa", "Middle East", "Southeast Asia"].map(
                          (r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                  </div>
                </>
              )}
              {activeTab === "contactInfo" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                        value={formData.country}
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">
                      Address Line
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                      value={formData.addressLine}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          addressLine: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                        value={formData.zipCode}
                        onChange={(e) =>
                          setFormData({ ...formData, zipCode: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-gray-400 mb-2">
                      Office Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              )}
              {activeTab === "news" && (
                <select
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="Company News">Company News</option>
                  <option value="Investments">Investments</option>
                  <option value="Insights">Insights</option>
                </select>
              )}

              {(activeTab === "careers" || activeTab === "team") && (
                <div className="grid grid-cols-2 gap-4">
                  {activeTab === "careers" && (
                    <input
                      type="text"
                      placeholder="Location"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  )}
                  <input
                    type="text"
                    placeholder="Department"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                  />
                </div>
              )}

              {/* --- CONTENT / BIO --- */}
              <div>
                {activeTab !== "contactInfo" && (
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
                    {activeTab === "portfolio"
                      ? "Description"
                      : activeTab === "team"
                        ? "Biography"
                        : "Content"}
                  </label>
                )}
                {activeTab !== "contactInfo" && (
                  <textarea
                    required
                    rows="5"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none resize-none"
                    value={
                      activeTab === "portfolio"
                        ? formData.description
                        : activeTab === "team"
                          ? formData.biography
                          : formData.content
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [activeTab === "portfolio"
                          ? "description"
                          : activeTab === "team"
                            ? "biography"
                            : "content"]: e.target.value,
                      })
                    }
                  />
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-8 py-4 text-[10px] font-black uppercase text-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0a1622] text-white px-10 py-4 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-[#c5a35d] transition-all"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {confirmModal.show && (
        <div className="fixed inset-0 z-[10005] bg-[#0a1622]/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-8 text-center border-t-4 border-red-500">
            <Trash2 className="mx-auto mb-6 text-red-500" size={50} />
            <h3 className="text-xl font-serif font-bold text-[#0a1622] mb-2">
              Confirm Delete?
            </h3>
            <p className="text-gray-500 text-sm mb-8 italic">
              "{confirmModal.title}"
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmModal({ show: false })}
                className="flex-1 py-3 text-[10px] font-black uppercase text-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="flex-1 bg-red-500 text-white py-3 rounded-lg font-bold text-[10px] uppercase tracking-widest"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESUME PREVIEW MODAL */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-[#0a1622]/95 backdrop-blur-md flex items-center justify-center p-4 z-[10001]">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-xl overflow-hidden flex flex-col shadow-2xl">
            <div className="p-5 flex justify-between items-center bg-gray-50 border-b">
              <span className="font-serif font-bold text-[#0a1622]">
                Document Preview
              </span>
              <div className="flex gap-4">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="text-gray-400 hover:text-[#c5a35d]"
                >
                  {isDownloading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Download size={18} />
                  )}
                </button>
                <button
                  onClick={() => setShowResumeModal(false)}
                  className="text-gray-400"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            <iframe
              src={`${previewResumeUrl}#toolbar=0`}
              className="flex-1 w-full"
            />
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toast.show && (
        <div
          className={`fixed bottom-10 right-10 z-[10010] flex items-center gap-4 px-6 py-4 rounded-xl shadow-2xl ${toast.type === "success" ? "bg-[#0a1622] text-white" : "bg-red-600 text-white"}`}
        >
          <span className="font-bold text-sm">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
