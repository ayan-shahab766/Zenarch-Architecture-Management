"use client";
import { useState, useEffect } from "react";
import { API_BASE } from "@/utils/api";
import axios from "axios";
import LoadingScreen from '@/components/LoadingScreen';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    year: "",
    coverImage: "",
    area: "",
    architect: "",
    gallery: [],
    featured: false,
  });
  const [newGalleryImages, setNewGalleryImages] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchProjects = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const { data } = await axios.get(`${API_BASE}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load projects");
    }
    setLoading(false);
  };

  const deleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;

    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo") || "{}");
      await axios.delete(`${API_BASE}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects(); // Refresh the list
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete project");
    }
  };

  // fetch categories
  useEffect(() => {
    fetchProjects();

    const fetchCategories = async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem("userInfo") || "{}");
        const { data } = await axios.get(
          `${API_BASE}/api/categories`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCategories(data);
      } catch (err) {
        console.error("Unable to load categories", err);
      }
    };
    fetchCategories();
  }, []);

  // start new project
  const startNewProject = () => {
    setEditingProject({ _id: null });
    setForm({
      title: "",
      description: "",
      category: "",
      location: "",
      year: "",
      coverImage: "",
      area: "",
      architect: "",
      gallery: [],
    });
    setNewGalleryImages([]);
    setCoverFile(null);
  };

  // handle edit
  const handleEdit = (project) => {
    setEditingProject(project);
    setForm({
      title: project.title || "",
      description: project.description || "",
      category: project.category?._id || project.category || "",
      location: project.location || "",
      year: project.year || "",
      coverImage: project.coverImage || "",
      area: project.area || "",
      architect: project.architect || "",
      gallery: project.gallery || [],
      featured: project.featured || false,
    });
    setNewGalleryImages([]);
    setCoverFile(null);
  };

  // handle input change
  const handleInputChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // handle gallery file input
  const handleGalleryChange = (e) => setNewGalleryImages([...e.target.files]);

  // handle cover file input
  const handleCoverChange = (e) => {
    if (e.target.files[0]) setCoverFile(e.target.files[0]);
  };

  // remove gallery image
  const removeGalleryImage = async (index) => {
    const imgPath = form.gallery[index];
    setForm({ ...form, gallery: form.gallery.filter((_, i) => i !== index) });

    // optional: delete file from server
    if (imgPath?.startsWith("/uploads/")) {
      try {
        const { token } = JSON.parse(localStorage.getItem("userInfo") || "{}");
        const filename = imgPath.split("/").pop();
        await axios.delete(`${API_BASE}/api/upload/${filename}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("failed to delete image file", err);
      }
    }
  };

  // save project
  const saveProject = async () => {
    if (!form.title || !form.description || !form.category) {
      alert("Title, description, and category are required");
      return;
    }

    setSaving(true);
    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo") || "{}");

      // 1️⃣ upload cover file if selected
      let coverPath = form.coverImage;
      if (coverFile) {
        const coverForm = new FormData();
        coverForm.append("image", coverFile);
        const { data: uploadedCover } = await axios.post(
          `${API_BASE}/api/upload`,
          coverForm,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        coverPath = uploadedCover.path; // e.g., /uploads/cover.jpg
      }

      // 2️⃣ upload new gallery images
      let uploadedGallery = [];
      if (newGalleryImages.length > 0) {
        const galleryForm = new FormData();
        newGalleryImages.forEach((file) => galleryForm.append("images", file));
        const { data } = await axios.post(
          `${API_BASE}/api/upload/multiple`,
          galleryForm,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        uploadedGallery = data; // array of paths
      }

      const payload = {
        ...form,
        coverImage: coverPath,
        gallery: [...form.gallery, ...uploadedGallery],
      };

      if (editingProject?._id) {
        await axios.put(
          `${API_BASE}/api/projects/${editingProject._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          `${API_BASE}/api/projects`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      console.error("save error", err);
      if (err.code === 'NETWORK_ERROR' || err.message === 'Network Error') {
        alert("Network error: Please check your connection and try again. The backend may be sleeping and needs a moment to wake up.");
      } else {
        alert(err.response?.data?.message || "Failed to save project. Please try again.");
      }
    }
    setSaving(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-playfair text-white mb-2">
            Manage Projects
          </h1>
        </div>
        <button
          onClick={startNewProject}
          className="bg-gold text-dark px-6 py-2 font-medium hover:bg-gold-light transition-colors rounded-sm text-sm"
        >
          + Create New Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500 bg-black/20">
                <th className="p-4 font-normal">Title</th>
                <th className="p-4 font-normal">Category</th>
                <th className="p-4 font-normal">Location</th>
                <th className="p-4 font-normal">Year</th>
                <th className="p-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light text-gray-300">
              {projects.map((p) => (
                <tr
                  key={p._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4 font-medium text-white">{p.title}</td>
                  <td className="p-4">{p.category?.name}</td>
                  <td className="p-4">{p.location}</td>
                  <td className="p-4">{p.year}</td>
                  <td className="p-4 text-right space-x-3">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-gold hover:text-white transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProject(p._id)}
                      className="text-burgundy hover:text-burgundy-light transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center p-6">
            <div className="bg-dark w-full max-w-2xl rounded-xl shadow-2xl border border-white/10 flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="sticky top-0 bg-dark border-b border-white/10 p-6 flex justify-between items-center">
                <h2 className="text-xl font-playfair text-white">
                  {editingProject._id ? "Edit Project" : "New Project"}
                </h2>
                <button
                  onClick={() => setEditingProject(null)}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  ×
                </button>
              </div>

              {/* Scrollable Form */}
              <div className="p-6 overflow-y-auto space-y-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="w-full p-3 rounded bg-dark-light text-white"
                  value={form.title}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  className="w-full p-3 rounded bg-dark-light text-white"
                  value={form.description}
                  onChange={handleInputChange}
                />
                <select
                  name="category"
                  className="w-full p-3 rounded bg-dark-light text-white"
                  value={form.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  className="w-full p-3 rounded bg-dark-light text-white"
                  value={form.location}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="year"
                  placeholder="Year"
                  className="w-full p-3 rounded bg-dark-light text-white"
                  value={form.year}
                  onChange={handleInputChange}
                />

                {/* Cover file upload */}
                <label className="text-white">Cover Image</label>
                {form.coverImage && (
                  <img
                    src={`${API_BASE}${form.coverImage}`}
                    className="w-32 h-32 object-cover mb-2 rounded"
                  />
                )}
                <input
                  type="file"
                  onChange={handleCoverChange}
                  className="text-white"
                />

                <input
                  type="text"
                  name="area"
                  placeholder="Area"
                  className="w-full p-3 rounded bg-dark-light text-white"
                  value={form.area}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="architect"
                  placeholder="Architect"
                  className="w-full p-3 rounded bg-dark-light text-white"
                  value={form.architect}
                  onChange={handleInputChange}
                />

                {/* Featured checkbox */}
                <label className="flex items-center text-white">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="mr-2"
                  />
                  Featured Project
                </label>

                {/* Gallery */}
                {form.gallery.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {form.gallery.map((img, i) => (
                      <div key={i} className="relative">
                        <img
                          src={`${API_BASE}${img}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          onClick={() => removeGalleryImage(i)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload new gallery */}
                <input
                  type="file"
                  multiple
                  onChange={handleGalleryChange}
                  className="text-white"
                />
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-dark border-t border-white/10 p-6 flex justify-end gap-3">
                <button
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProject}
                  disabled={saving}
                  className={`px-4 py-2 bg-gold rounded text-dark hover:bg-gold-light transition ${saving ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}