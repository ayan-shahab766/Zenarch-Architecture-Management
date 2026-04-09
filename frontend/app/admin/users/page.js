"use client";
import { useState, useEffect } from "react";
import { API_BASE } from "@/utils/api";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo") || "{}");

      const { data } = await axios.get(
        `${API_BASE}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(data);
    } catch (error) {
      console.error("Fetch users error", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo") || "{}");

      await axios.delete(
        `${API_BASE}/api/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (err) {
      console.error("Delete error", err);
      alert("Failed to delete user");
    }
  };

  const makeAdmin = async (id) => {
    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo") || "{}");

      await axios.put(
        `${API_BASE}/api/users/${id}/role`,
        { role: "admin" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (err) {
      console.error("Admin error", err);
      alert("Failed to promote user");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-playfair text-white mb-2">
            User Management
          </h1>
          <p className="text-gray-400 font-light text-sm">
            Manage registered users and roles
          </p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500 bg-black/20">
                <th className="p-4 font-normal">Name</th>
                <th className="p-4 font-normal">Email</th>
                <th className="p-4 font-normal">Role</th>
                <th className="p-4 font-normal">Joined</th>
                <th className="p-4 font-normal text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="text-sm font-light text-gray-300">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4 font-medium text-white">
                    {user.name}
                  </td>

                  <td className="p-4">{user.email}</td>

                  <td className="p-4 uppercase tracking-wider text-[10px] font-bold">
                    <span
                      className={
                        user.role === "admin"
                          ? "text-gold"
                          : "text-gray-400"
                      }
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-right space-x-3">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => makeAdmin(user._id)}
                        className="text-gold hover:text-white transition-colors"
                      >
                        Make Admin
                      </button>
                    )}

                    {user.role !== "admin" && (
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="text-red-500 hover:text-burgundy-light transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}