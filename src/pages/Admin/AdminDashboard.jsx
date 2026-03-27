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

  // UPDATED: Added career-specific fields to initial state
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Company News",
    location: "",
    department: "",
    jobType: "Full-time",
  });

  const fetchData = async () => {
    try {
      console.log("Fetching data for:", activeTab);
      const response = await API.get(`/${activeTab}`);
      setData(response.data);
    } catch (err) {
      if (err.response?.status === 401) handleLogout();
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

      <main className="flex-1 h-full overflow-y-auto p-12 bg-[#f8f9fa]">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold text-[#0a1622] mb-2 capitalize">
              {activeTab}
            </h1>
            <p className="text-gray-400 text-sm font-medium">
              Update the firm's digital footprint.
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="bg-[#0a1622] text-white px-8 py-4 rounded-md font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-[#c5a35d] hover:text-[#0a1622] transition-all shadow-xl"
          >
            <Plus size={18} /> Add New {activeTab === "news" ? "Post" : "Job"}
          </button>
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50/50 border-b border-gray-100 text-left text-[10px] uppercase tracking-widest font-bold text-gray-400">
              <tr>
                <th className="p-6">Details</th>
                <th className="p-6">Category / Dept</th>
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
                    <div className="font-bold text-[#0a1622] mb-1 text-lg">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-400 line-clamp-2 max-w-xl">
                      {activeTab === "careers"
                        ? `${item.location} • ${item.jobType}`
                        : item.content}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest border border-gray-200">
                      {activeTab === "news" ? item.category : item.department}
                    </span>
                  </td>
                  <td className="p-6 text-right flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="bg-blue-50 p-3 rounded-lg text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-50 p-3 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-[#0a1622]/95 backdrop-blur-md flex items-center justify-center p-6 z-[10000]">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-serif font-bold text-2xl text-[#0a1622]">
                {editingId ? "Edit" : "Create"} {activeTab}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-[#c5a35d]">
                    Title
                  </label>
                  <input
                    required
                    value={formData.title}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                {/* CONDITIONAL CATEGORY / DEPT */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-[#c5a35d]">
                    {activeTab === "news" ? "Category" : "Department"}
                  </label>
                  {activeTab === "news" ? (
                    <select
                      value={formData.category}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <option>Company News</option>
                      <option>Investments</option>
                      <option>Insights</option>
                      <option>Press</option>
                    </select>
                  ) : (
                    <input
                      required
                      value={formData.department}
                      placeholder="e.g. Kaffa Tech"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                    />
                  )}
                </div>
              </div>

              {/* CAREER SPECIFIC FIELDS */}
              {activeTab === "careers" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-[#c5a35d]">
                      Location
                    </label>
                    <input
                      required
                      value={formData.location}
                      placeholder="e.g. Dubai, UAE"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase text-[#c5a35d]">
                      Job Type
                    </label>
                    <select
                      value={formData.jobType}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                      onChange={(e) =>
                        setFormData({ ...formData, jobType: e.target.value })
                      }
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Remote</option>
                      <option>Contract</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-[#c5a35d]">
                  Content / Description
                </label>
                <textarea
                  required
                  rows="4"
                  value={formData.content}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg outline-none focus:border-[#c5a35d]"
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-5 text-gray-400 font-bold uppercase text-xs"
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  className="flex-[2] bg-[#0a1622] text-white py-5 rounded-md font-bold uppercase text-xs hover:bg-[#c5a35d] hover:text-[#0a1622] transition-all flex justify-center items-center"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : editingId ? (
                    "Save Changes"
                  ) : (
                    "Confirm & Publish"
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
