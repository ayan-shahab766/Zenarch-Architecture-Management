"use client";

import { useEffect, useState } from "react";
import { API_BASE } from "@/utils/api";
import axios from "axios";
import LoadingScreen from '@/components/LoadingScreen';

export default function AdminSettings() {

  const [settings, setSettings] = useState({
    email: "",
    whatsapp: "",
    address: "",
    instagram: "",
    facebook: "",
    linkedin: ""
  });
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState("");

  const fetchSettings = async () => {
    try {

      const { data } = await axios.get(
        `${API_BASE}/api/settings`
      );

      setSettings(data);

    } catch (error) {
      console.error("Failed to load settings", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const { token } = JSON.parse(localStorage.getItem("userInfo") || "{}");

      setStatus("Saving...");

      await axios.put(
        `${API_BASE}/api/settings`,
        settings,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setStatus("Settings updated successfully!");

    } catch (error) {
      console.error(error);
      setStatus("Error updating settings");
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-playfair text-white mb-2">Site Settings</h1>
          <p className="text-gray-400 font-light text-sm">
            Manage global contact information & displays
          </p>
        </div>
      </div>

      <div className="md:w-2/3 glass-card p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
              Contact Email
            </label>

            <input
              type="email"
              required
              className="w-full bg-dark/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              value={settings.email}
              onChange={(e) =>
                setSettings({ ...settings, email: e.target.value })
              }
            />
          </div>

          {/* Whatsapp */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
              WhatsApp Number
            </label>

            <input
              type="text"
              required
              className="w-full bg-dark/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors"
              value={settings.whatsapp}
              onChange={(e) =>
                setSettings({ ...settings, whatsapp: e.target.value })
              }
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
              Headquarters Address
            </label>

            <textarea
              rows="3"
              required
              className="w-full bg-dark/50 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold transition-colors resize-none"
              value={settings.address}
              onChange={(e) =>
                setSettings({ ...settings, address: e.target.value })
              }
            />
          </div>
          {/* Instagram */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
              Instagram Link
            </label>

            <input
              type="text"
              className="w-full bg-dark/50 border border-white/10 px-4 py-3 text-white"
              value={settings.instagram}
              onChange={(e) =>
                setSettings({ ...settings, instagram: e.target.value })
              }
            />
          </div>

          {/* Facebook */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
              Facebook Link
            </label>

            <input
              type="text"
              className="w-full bg-dark/50 border border-white/10 px-4 py-3 text-white"
              value={settings.facebook}
              onChange={(e) =>
                setSettings({ ...settings, facebook: e.target.value })
              }
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
              LinkedIn Link
            </label>

            <input
              type="text"
              className="w-full bg-dark/50 border border-white/10 px-4 py-3 text-white"
              value={settings.linkedin}
              onChange={(e) =>
                setSettings({ ...settings, linkedin: e.target.value })
              }
            />
          </div>

          <button type="submit" className="btn-primary">
            Save Changes
          </button>

          {status && (
            <p
              className={`mt-4 text-sm ${status.includes("success")
                  ? "text-green-400"
                  : "text-gold"
                }`}
            >
              {status}
            </p>
          )}

        </form>
      </div>
    </div>
  );
}