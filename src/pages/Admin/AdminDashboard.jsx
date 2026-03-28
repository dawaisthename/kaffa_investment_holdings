import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Building2,
  FileText, // Added for Applications icon
  Download, // Added for Resume download icon
} from "lucide-react";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("kaffa_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("news");
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("kaffa_token"),
  );
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loginData, setLoginData] = useState({ username: "", password: "" });

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Company News",
    location: "",
    department: "",
    jobType: "Full-time",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      // Mapping: news -> /news, careers -> /careers, contacts -> /contacts, applications -> /applications
      const response = await API.get(`/${activeTab}`);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await API.post("/auth/login", loginData);
      localStorage.setItem("kaffa_token", response.data.token);
      setIsLoggedIn(true);
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("kaffa_token");
    setIsLoggedIn(false);
  };

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
        await API.put(`/${activeTab}/${editingId}`, formData);
      } else {
        await API.post(`/${activeTab}`, formData);
      }
      setShowModal(false);
      setEditingId(null);
      fetchData();
    } catch (err) {
      alert("Action failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently delete this item?")) return;
    try {
      await API.delete(`/${activeTab}/${id}`);
      fetchData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // Helper to open the resume file
  const openResume = (filePath) => {
    const url = `http://localhost:5000/${filePath.replace(/\\/g, "/")}`;
    window.open(url, "_blank");
  };

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
          <h2 className="text-2xl font-serif font-bold mb-8 text-[#0a1622] text-center">
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
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-md outline-none focus:border-[#c5a35d]"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
          </div>
          <button
            disabled={loading}
            className="w-full mt-8 bg-[#0a1622] text-white py-4 rounded-md font-bold hover:bg-[#162a3d] transition-all flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "SIGN IN"}
          </button>
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
          <button
            onClick={() => setActiveTab("news")}
            className={`flex items-center gap-4 w-full p-4 rounded-lg text-sm font-bold ${activeTab === "news" ? "bg-[#c5a35d] text-[#0a1622]" : "text-gray-400 hover:bg-white/5"}`}
          >
            <Newspaper size={18} /> News & Media
          </button>
          <button
            onClick={() => setActiveTab("careers")}
            className={`flex items-center gap-4 w-full p-4 rounded-lg text-sm font-bold ${activeTab === "careers" ? "bg-[#c5a35d] text-[#0a1622]" : "text-gray-400 hover:bg-white/5"}`}
          >
            <Briefcase size={18} /> Careers
          </button>
          <button
            onClick={() => setActiveTab("applications")}
            className={`flex items-center gap-4 w-full p-4 rounded-lg text-sm font-bold ${activeTab === "applications" ? "bg-[#c5a35d] text-[#0a1622]" : "text-gray-400 hover:bg-white/5"}`}
          >
            <FileText size={18} /> Job Applications
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`flex items-center gap-4 w-full p-4 rounded-lg text-sm font-bold ${activeTab === "contacts" ? "bg-[#c5a35d] text-[#0a1622]" : "text-gray-400 hover:bg-white/5"}`}
          >
            <Mail size={18} /> Contact Inquiries
          </button>
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

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto p-12 bg-[#f8f9fa]">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#0a1622] mb-2 capitalize">
              {activeTab === "contacts" ? "Inquiries" : activeTab}
            </h1>
            <p className="text-gray-400 text-sm font-medium">
              Manage the firm's {activeTab} data.
            </p>
          </div>
          {/* Hide "Add New" for Contacts and Applications */}
          {activeTab !== "contacts" && activeTab !== "applications" && (
            <button
              onClick={handleOpenCreate}
              className="bg-[#0a1622] text-white px-8 py-4 rounded-md font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-[#c5a35d] hover:text-[#0a1622] transition-all shadow-xl"
            >
              <Plus size={18} /> Add New {activeTab === "news" ? "Post" : "Job"}
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
                    {activeTab === "contacts" || activeTab === "applications"
                      ? "Sender"
                      : "Details"}
                  </th>
                  <th className="p-6">
                    {activeTab === "contacts" || activeTab === "applications"
                      ? "Inquiry / Application Details"
                      : "Category / Dept"}
                  </th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="p-6">
                      {/* Render Sender/Applicant Info */}
                      {activeTab === "contacts" ||
                      activeTab === "applications" ? (
                        <div>
                          <div className="font-bold text-[#0a1622] text-lg">
                            {item.fullName}
                          </div>
                          <div className="text-sm text-[#c5a35d] font-medium">
                            {item.email}
                          </div>
                          {item.company && (
                            <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1 uppercase font-bold">
                              <Building2 size={12} /> {item.company}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="font-bold text-[#0a1622] mb-1 text-lg">
                            {item.title}
                          </div>
                          <div className="text-sm text-gray-400 line-clamp-2 max-w-xl">
                            {activeTab === "careers"
                              ? `${item.location} • ${item.jobType}`
                              : item.content}
                          </div>
                        </div>
                      )}
                    </td>

                    <td className="p-6">
                      {activeTab === "contacts" ? (
                        <div>
                          <span className="px-2 py-1 bg-blue-50 text-blue-500 rounded text-[9px] font-black uppercase tracking-tighter mb-2 inline-block border border-blue-100">
                            {item.inquiryType}
                          </span>
                          <p className="text-sm text-gray-500 line-clamp-2 italic">
                            "{item.message}"
                          </p>
                        </div>
                      ) : activeTab === "applications" ? (
                        <div>
                          <span className="px-2 py-1 bg-amber-50 text-amber-600 rounded text-[9px] font-black uppercase tracking-tighter mb-2 inline-block border border-amber-100">
                            {item.position}
                          </span>
                          <p className="text-sm text-gray-500 line-clamp-2 italic">
                            "{item.message || item.coverLetter}"
                          </p>
                        </div>
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest border border-gray-200">
                          {activeTab === "news"
                            ? item.category
                            : item.department}
                        </span>
                      )}
                    </td>

                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        {/* Resume View/Download Button for Applications */}
                        {activeTab === "applications" && (
                          <button
                            onClick={() => openResume(item.resumePath)}
                            className="bg-amber-50 p-3 rounded-lg text-amber-500 hover:bg-amber-500 hover:text-white transition-all flex items-center gap-2 font-bold text-xs"
                            title="View Resume"
                          >
                            <Download size={18} />
                          </button>
                        )}
                        {/* Hide edit for Read-only tabs */}
                        {activeTab !== "contacts" &&
                          activeTab !== "applications" && (
                            <button
                              onClick={() => handleOpenEdit(item)}
                              className="bg-blue-50 p-3 rounded-lg text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
                            >
                              <Edit3 size={18} />
                            </button>
                          )}
                        <button
                          onClick={() => handleDelete(item._id)}
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
      </main>

      {/* Modal for Creating/Editing News & Careers */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0a1622]/95 backdrop-blur-md flex items-center justify-center p-6 z-[10000]">
          <div className="bg-white w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold text-[#0a1622]">
                {editingId ? "Edit" : "Create"}{" "}
                {activeTab === "news" ? "Post" : "Job"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-[#0a1622]"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* ... (Keep your existing form fields here for news/careers) */}
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-8 py-4 rounded-md text-sm font-bold text-gray-400 hover:text-[#0a1622] uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#0a1622] text-white px-10 py-4 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-[#c5a35d] hover:text-[#0a1622] transition-all flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : editingId ? (
                    "Update Now"
                  ) : (
                    "Publish Now"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
