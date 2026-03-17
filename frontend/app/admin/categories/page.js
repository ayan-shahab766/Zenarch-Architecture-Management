"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminCategories() {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/categories");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { token } = JSON.parse(localStorage.getItem('userInfo') || '{}');
      const res = await axios.post(
        "http://localhost:5000/api/categories",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Add response', res.data);

      setName("");
      fetchCategories();

    } catch (error) {
      alert(error.response?.data?.message || "Failed to create category");
    }
  };

  const deleteCategory = async (id) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('userInfo') || '{}');
      await axios.delete(
        `http://localhost:5000/api/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      fetchCategories();

    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-playfair text-white mb-2">Categories</h1>
          <p className="text-gray-400 font-light text-sm">Manage project categories</p>
        </div>
        {/* <button className="bg-gold text-dark px-6 py-2 font-medium hover:bg-gold-light transition-colors rounded-sm text-sm">
          + Add Category
        </button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500 bg-black/20">
                  <th className="p-4 font-normal">Name</th>
                  <th className="p-4 font-normal">Projects</th>
                  <th className="p-4 font-normal text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="text-sm font-light text-gray-300">
                {categories.map((category) => (
                  <tr key={category._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-white">{category.name}</td>
                    <td className="p-4">{category.projectCount || 0} items</td>
                    <td className="p-4 text-right space-x-3">
                      {/* <button className="text-gold hover:text-white transition-colors">Edit</button> */}
                      <button
                        onClick={() => deleteCategory(category._id)}
                        className="text-burgundy-light hover:text-red-200 transition-colors"
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

        {/* Quick Add Form placeholder */}
        <div className="glass-card p-6 h-fit">
          <h3 className="text-xl font-playfair text-white mb-6">Quick Add</h3>
          <form className="space-y-4" onSubmit={submitHandler}>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Category Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-dark/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g. Sustainable Architecture"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Save Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}