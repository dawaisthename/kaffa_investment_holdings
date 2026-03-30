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
} from "lucide-react";
import client from "../../api/client";

export default function AdminDashboard() {
  // Authentication & Core State
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("kaffa_token"),
  );
  const [activeTab, setActiveTab] = useState("news");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Login Specific States
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // Password Update States
  const [pwdData, setPwdData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Toggle Visibility for all password fields
  const [showPasswords, setShowPasswords] = useState({
    login: false,
    current: false,
    new: false,
    confirm: false,
  });

  // UI Feedback States
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

  // Resume Preview States
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [previewResumeUrl, setPreviewResumeUrl] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  // Form Data for News/Careers
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Company News",
    location: "",
    department: "",
    jobType: "Full-time",
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
      const response = await client.get(`/${activeTab}`);
      setData(response.data);
    } catch (err) {
      if (err.response?.status === 401) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn, activeTab]);

  // --- AUTHENTICATION HANDLERS ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    try {
      const response = await client.post("/auth/login", loginData);
      localStorage.setItem("kaffa_token", response.data.token);
      setIsLoggedIn(true);
      showToast("Welcome back, Admin");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Login Failed. Please check your credentials.";
      setLoginError(msg);
      showToast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("kaffa_token");
    setIsLoggedIn(false);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (pwdData.newPassword !== pwdData.confirmPassword) {
      return showToast("Passwords do not match", "error");
    }
    setLoading(true);
    try {
      // Backend expects { currentPassword, newPassword }
      await client.put("/auth/update-password", {
        currentPassword: pwdData.currentPassword,
        newPassword: pwdData.newPassword,
      });
      showToast("Password updated successfully");
      setPwdData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      showToast(
        err.response?.data?.message || "Internal Server Error",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  // --- CRUD HANDLERS ---
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: "",
      content: "",
      category: activeTab === "news" ? "Company News" : "Investments",
      location: "",
      department: "",
      jobType: "Full-time",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      content: item.content,
      category: item.category,
      location: item.location || "",
      department: item.department || "",
      jobType: item.jobType || "Full-time",
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await client.put(`/${activeTab}/${editingId}`, formData);
        showToast("Record updated successfully");
      } else {
        await client.post(`/${activeTab}`, formData);
        showToast("New entry published");
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      showToast("Operation failed", "error");
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
      showToast("Deleted successfully");
      fetchData();
    } catch (err) {
      showToast("Delete failed", "error");
    } finally {
      setLoading(false);
      setConfirmModal({ show: false, id: null, title: "" });
    }
  };

  // --- RESUME UTILITIES ---
  const openResume = (filePath) => {
    if (!filePath) return showToast("No resume found", "error");
    const url = `http://localhost:5000/${filePath.replace(/\\/g, "/")}`;
    setPreviewResumeUrl(url);
    setShowResumeModal(true);
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(previewResumeUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute(
        "download",
        previewResumeUrl.split("/").pop() || "resume.pdf",
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      showToast("Download failed", "error");
    } finally {
      setIsDownloading(false);
    }
  };

  // --- RENDER LOGIN VIEW ---
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-[9999] bg-[#0a1622] flex items-center justify-center p-6">
        <form
          onSubmit={handleLogin}
          className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md border-t-4 border-[#c5a35d]"
        >
          <div className="flex justify-center mb-6 text-[#c5a35d] bg-[#fcf8ef] p-4 rounded-full w-fit mx-auto">
            <ShieldCheck size={40} />
          </div>
          <h2 className="text-2xl font-serif font-bold mb-8 text-[#0a1622] text-center uppercase tracking-widest">
            Kaffa Admin
          </h2>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                required
                className="w-full p-4 pl-12 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[#c5a35d]"
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
              />
              <User className="absolute left-4 top-4 text-gray-300" size={20} />
            </div>
            <div className="relative">
              <input
                type={showPasswords.login ? "text" : "password"}
                placeholder="Password"
                required
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
                {showPasswords.login ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {loginError && (
            <div className="mt-4 p-3 bg-red-50 border-l-2 border-red-500 text-red-600 text-[10px] font-bold uppercase tracking-wider">
              {loginError}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full mt-8 bg-[#0a1622] text-white py-4 rounded-md font-bold hover:bg-[#162a3d] transition-all flex justify-center items-center gap-2 tracking-widest text-xs"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              "SECURE LOGIN"
            )}
          </button>
        </form>
      </div>
    );
  }

  // --- RENDER DASHBOARD VIEW ---
  return (
    <div className="fixed inset-0 z-[9998] bg-[#fcfcfc] flex overflow-hidden">
      {/* Sidebar Navigation */}
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
            { id: "careers", label: "Careers", icon: <Briefcase size={18} /> },
            {
              id: "applications",
              label: "Job Applications",
              icon: <FileText size={18} />,
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
              className={`flex items-center gap-4 w-full p-4 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-[#c5a35d] text-[#0a1622]"
                  : "text-gray-400 hover:bg-white/5"
              }`}
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

      {/* Main Workspace */}
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
              {/* Current Password */}
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
                {/* New Password */}
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

                {/* Confirm Password */}
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

              {pwdData.confirmPassword &&
                pwdData.newPassword !== pwdData.confirmPassword && (
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">
                    Passwords do not match
                  </p>
                )}

              <button
                type="submit"
                disabled={loading}
                className="bg-[#0a1622] text-white px-10 py-4 rounded-lg font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#c5a35d] hover:text-[#0a1622] transition-all disabled:opacity-50"
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
                  {activeTab}
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
                    <tr>
                      <th className="p-6">
                        {["contacts", "applications"].includes(activeTab)
                          ? "Sender"
                          : "Details"}
                      </th>
                      <th className="p-6">
                        {["contacts", "applications"].includes(activeTab)
                          ? "Context"
                          : "Category"}
                      </th>
                      <th className="p-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {data.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="p-6">
                          <div className="font-bold text-[#0a1622] text-lg">
                            {item.fullName || item.title}
                          </div>
                          <div className="text-sm text-[#c5a35d]">
                            {item.email ||
                              (activeTab === "careers" ? item.location : "")}
                          </div>
                        </td>
                        <td className="p-6 text-sm text-gray-500 italic">
                          {item.message ||
                            item.position ||
                            item.category ||
                            item.department}
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-2">
                            {activeTab === "applications" && (
                              <button
                                onClick={() => openResume(item.resumePath)}
                                className="bg-amber-50 p-3 rounded-lg text-amber-500 hover:bg-amber-500 hover:text-white transition-all"
                              >
                                <Eye size={18} />
                              </button>
                            )}
                            {!["contacts", "applications"].includes(
                              activeTab,
                            ) && (
                              <button
                                onClick={() => handleOpenEdit(item)}
                                className="bg-blue-50 p-3 rounded-lg text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
                              >
                                <Edit3 size={18} />
                              </button>
                            )}
                            <button
                              onClick={() => triggerDelete(item)}
                              className="bg-red-50 p-3 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-all"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </main>

      {/* CRUD Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0a1622]/95 backdrop-blur-md flex items-center justify-center p-6 z-[10000]">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold text-[#0a1622]">
                {editingId ? "Edit" : "Create"} {activeTab}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-gray-400 mb-2">
                  Title / Subject
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
              {/* Conditional fields based on activeTab */}
              {activeTab === "news" ? (
                <>
                  <select
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="Company News">Company News</option>
                    <option value="Investments">Investments</option>
                  </select>
                  <textarea
                    required
                    rows="4"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none resize-none"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                  />
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Location"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
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
                  <textarea
                    required
                    rows="6"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none resize-none"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                  />
                </div>
              )}
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

      {/* Delete Confirmation */}
      {confirmModal.show && (
        <div className="fixed inset-0 z-[10005] bg-[#0a1622]/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-8 text-center border-t-4 border-red-500">
            <div className="bg-red-50 text-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trash2 size={30} />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#0a1622] mb-2">
              Delete Permanently?
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

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed bottom-10 right-10 z-[10010] flex items-center gap-4 px-6 py-4 rounded-xl shadow-2xl animate-in slide-in-from-right-10 ${toast.type === "success" ? "bg-[#0a1622] text-white" : "bg-red-600 text-white"}`}
        >
          <div className="font-bold text-sm tracking-wide">{toast.message}</div>
          <button onClick={() => setToast({ ...toast, show: false })}>
            <X size={14} />
          </button>
        </div>
      )}

      {/* Resume Viewer */}
      {showResumeModal && (
        <div className="fixed inset-0 bg-[#0a1622]/95 backdrop-blur-md flex items-center justify-center p-4 z-[10001]">
          <div className="bg-white w-full max-w-5xl h-[92vh] rounded-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-5 flex justify-between items-center bg-gray-50">
              <span className="font-serif font-bold text-[#0a1622]">
                Candidate Resume
              </span>
              <div className="flex gap-4">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="text-[11px] font-black uppercase text-gray-400 hover:text-[#c5a35d]"
                >
                  {isDownloading ? "..." : <Download size={18} />}
                </button>
                <button onClick={() => setShowResumeModal(false)}>
                  <X size={20} />
                </button>
              </div>
            </div>
            <iframe
              src={`${previewResumeUrl}#toolbar=0`}
              className="flex-1 w-full"
              title="Resume"
            />
          </div>
        </div>
      )}
    </div>
  );
}
