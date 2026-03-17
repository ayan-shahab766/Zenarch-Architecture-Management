"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalUsers: 0,
    unreadMessages: 0,
    recentMessages: []
  });

  const [selectedMessage, setSelectedMessage] = useState(null); // Message to view
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch dashboard stats
  const fetchDashboard = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem("userInfo") || "{}");
      const { data } = await axios.get("http://localhost:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats(data);
    } catch (error) {
      console.error("Dashboard fetch failed", error);
    }
  };

  // View message details
  const viewMessage = async (msg) => {
    try {
      // Mark as read
      if (!msg.read) {
        await axios.put(`http://localhost:5000/api/messages/${msg._id}/read`);
      }

      // Open modal with full message
      setSelectedMessage(msg);
      setModalOpen(true);

      fetchDashboard(); // Refresh stats (unread count)
    } catch (error) {
      console.error("Error opening message", error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-playfair text-white mb-2">Dashboard Overview</h1>
      <p className="text-gray-400 font-light text-sm mb-10">Welcome to Zenarch Admin Panel</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card flex flex-col items-center justify-center p-8">
          <span className="text-4xl font-playfair text-gold mb-2">{stats.totalProjects}</span>
          <h3 className="text-sm uppercase tracking-wider text-gray-400">Total Projects</h3>
        </div>
        <div className="glass-card flex flex-col items-center justify-center p-8">
          <span className="text-4xl font-playfair text-white mb-2">{stats.totalUsers}</span>
          <h3 className="text-sm uppercase tracking-wider text-gray-400">Total Users</h3>
        </div>
        <div className="glass-card flex flex-col items-center justify-center p-8">
          <span className="text-4xl font-playfair text-white mb-2">{stats.unreadMessages}</span>
          <h3 className="text-sm uppercase tracking-wider text-gray-400">Unread Messages</h3>
        </div>
      </div>

      {/* Recent Messages */}
      <div className="glass-card">
        <h2 className="text-xl font-playfair text-white mb-6 border-b border-white/10 pb-4">
          Recent Inquiries
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500">
                <th className="pb-4 font-normal">Name</th>
                <th className="pb-4 font-normal">Email</th>
                <th className="pb-4 font-normal">Date</th>
                <th className="pb-4 font-normal">Status</th>
                <th className="pb-4 font-normal"></th>
              </tr>
            </thead>

            <tbody className="text-sm font-light text-gray-300">
              {stats.recentMessages?.map((msg) => (
                <tr key={msg._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4">{msg.name}</td>
                  <td className="py-4">{msg.email}</td>
                  <td className="py-4">{new Date(msg.createdAt).toLocaleDateString()}</td>
                  <td className="py-4">
                    {msg.read ? (
                      <span className="text-gray-500 px-2 py-1 bg-white/5 rounded-full text-xs">Read</span>
                    ) : (
                      <span className="text-red-500 px-2 py-1 bg-burgundy/20 rounded-full text-xs">Unread</span>
                    )}
                  </td>
                  <td className="py-4 text-right">
                    <button
                      className="text-gold hover:text-white transition-colors"
                      onClick={() => viewMessage(msg)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for full message */}
      {/* Modal for full message */}
      {modalOpen && selectedMessage && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-y-auto p-6">
          <div className="bg-[#121110] p-6 rounded-2xl w-11/12 max-w-lg text-gray-300">
            <h3 className="text-xl font-playfair text-white mb-4">Message Details</h3>
            <p>
              <strong>Name:</strong> {selectedMessage.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedMessage.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedMessage.phone}
            </p>
            <p>
              <strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}
            </p>
            <div className="mt-4">
              <strong>Message:</strong>

              <div className="mt-2 max-h-64 overflow-y-auto bg-black/20 p-3 rounded-lg">
                {selectedMessage.message}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 bg-gold rounded-lg hover:bg-yellow-500 text-black font-semibold"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}