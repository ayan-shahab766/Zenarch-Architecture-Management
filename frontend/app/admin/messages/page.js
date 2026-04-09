"use client";

import { useEffect, useState } from "react";
import { API_BASE } from "@/utils/api";
import axios from "axios";

export default function AdminMessages() {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null); // Message to view
  const [modalOpen, setModalOpen] = useState(false);

  const fetchMessages = async () => {
    try {

      const { token } = JSON.parse(localStorage.getItem("userInfo") || "{}");

      const { data } = await axios.get(
        `${API_BASE}/api/messages`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessages(data);
      setLoading(false);

    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  };

  const viewMessage = async (msg) => {
    try {
      // Mark as read
      if (!msg.read) {
        await axios.put(`${API_BASE}/api/messages/${msg._id}/read`);
      }
      setMessages((prev) =>
        prev.map((m) =>
          m._id === msg._id ? { ...m, read: true } : m
        )
      );

      // Open modal with full message
      setSelectedMessage(msg);
      setModalOpen(true);

      fetchMessages(); // Refresh messages (unread count)
    } catch (error) {
      console.error("Error opening message", error);
    }
  };

  const deleteMessage = async (id) => {

    if (!confirm("Delete this message?")) return;

    try {

      const { token } = JSON.parse(localStorage.getItem("userInfo") || "{}");

      await axios.delete(
        `${API_BASE}/api/messages/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchMessages();

    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>

      <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-playfair text-white mb-2">
            Inquiries & Messages
          </h1>
          <p className="text-gray-400 font-light text-sm">
            View client contact requests
          </p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">

          <table className="w-full text-left border-collapse">

            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-500 bg-black/20">
                <th className="p-4 font-normal">Name</th>
                <th className="p-4 font-normal">Contact</th>
                <th className="p-4 font-normal">Message</th>
                <th className="p-4 font-normal">Date</th>
                <th className="p-4 font-normal">Status</th>
                <th className="p-4 font-normal text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="text-sm font-light text-gray-300">

              {loading ? (
                <tr>
                  <td className="p-4">Loading...</td>
                </tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td className="p-4">No messages found</td>
                </tr>
              ) : (

                messages.map((message) => (

                  <tr
                    key={message._id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >

                    <td className="p-4 font-medium text-white">
                      {message.name}
                    </td>

                    <td className="p-4">
                      <a
                        href={`mailto:${message.email}`}
                        className="text-gold hover:text-white"
                      >
                        {message.email}
                      </a>
                    </td>

                    <td className="p-4 max-w-[300px] truncate">
                      {message.message}
                    </td>

                    <td className="p-4">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${!message.read
                          ? "bg-burgundy/20 text-red-500"
                          : "bg-white/5 text-gray-500"
                          }`}
                      >
                        {!message.read ? "Unread" : "Read"}
                      </span>
                    </td>

                    <td className="p-4 text-right space-x-3">
                      <button
                        className="text-gold hover:text-white transition-colors"
                        onClick={() => viewMessage(message)}
                      >
                        View
                      </button>

                      <button
                        onClick={() => deleteMessage(message._id)}
                        className="text-red-500 hover:text-burgundy-light"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>
      </div>
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