"use client";
import { useState, useEffect } from 'react';
import { API_BASE } from "@/utils/api";
import axios from 'axios';
import LoadingScreen from '@/components/LoadingScreen';

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('userInfo') || '{}');
      console.log('Sending token:', token); // debug
      const { data } = await axios.get(`${API_BASE}/api/upload`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(data);
    } catch (error) {
      console.error(error);
      setImages([
        { id: 1, url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&w=400&q=80', name: 'villa-front.jpg' },
        { id: 2, url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&w=400&q=80', name: 'nexus-lobby.jpg' },
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      setLoading(true);
      const { token } = JSON.parse(localStorage.getItem('userInfo') || '{}');
      await axios.post(`${API_BASE}/api/upload/multiple`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });
      fetchImages();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed: Make sure you are logged in as Admin or Auth is correctly set up.');
      setLoading(false);
    }
  };

  const handleDelete = async (filename) => {
    if (!confirm('Delete this image?')) return;

    try {
      const { token } = JSON.parse(localStorage.getItem('userInfo') || '{}');
      await axios.delete(`${API_BASE}/api/upload/${filename}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchImages();
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Delete failed.');
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-playfair text-white mb-2">Media Gallery</h1>
          <p className="text-gray-400 font-light text-sm">Upload and manage project imagery</p>
        </div>
        <label className="bg-gold text-dark px-6 py-2 font-medium hover:bg-gold-light transition-colors rounded-sm text-sm cursor-pointer inline-block">
          {loading ? 'Processing...' : '+ Upload Images'}
          <input type="file" multiple className="hidden" accept="image/*" onChange={handleUpload} disabled={loading} />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {images.map((img) => (
          <div key={img.id || img.name} className="group relative overflow-hidden rounded-sm bg-dark-light border border-white/5 aspect-square">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url("${img.url.startsWith('http') ? img.url : `${API_BASE}${img.url}`}")` }}
            ></div>
            <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
              <span className="text-xs text-white text-center mb-3 truncate w-full">{img.name}</span>
              <div className="flex gap-2">
                <button onClick={() => navigator.clipboard.writeText(`${API_BASE}${img.url}`)} className="bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-sm transition-colors" title="Copy URL">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                </button>
                <button onClick={() => handleDelete(img.name)} className="bg-burgundy/80 hover:bg-burgundy text-white p-2 rounded-full backdrop-blur-sm transition-colors" title="Delete Image">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
