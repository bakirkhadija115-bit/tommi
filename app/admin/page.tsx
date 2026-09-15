'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');

  // جلب الفيديوهات
  useEffect(() => {
    fetch('/api/videos')
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  // إضافة فيديو جديد
  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, videoUrl, description }),
    });
    if (res.ok) {
      setTitle('');
      setVideoUrl('');
      setDescription('');
      window.location.reload();
    }
  };

  // حذف فيديو
  const handleDelete = async (id: number) => {
    await fetch(`/api/videos?id=${id}`, { method: 'DELETE' });
    setVideos(videos.filter((v: any) => v.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans" dir="rtl">
      <h1 className="text-3xl font-bold mb-6 text-indigo-400">لوحة التحكم - إدارة الفيديوهات</h1>

      {/* نموذج إضافة فيديو */}
      <form onSubmit={handleAddVideo} className="bg-gray-800 p-6 rounded-xl mb-8 shadow-lg max-w-xl">
        <h2 className="text-xl font-semibold mb-4">إضافة فيديو جديد</h2>
        <input
          type="text"
          placeholder="عنوان الفيديو"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-3 p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-indigo-500"
          required
        />
        <input
          type="text"
          placeholder="رابط الفيديو (Video URL / Embed)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full mb-3 p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-indigo-500"
          required
        />
        <textarea
          placeholder="وصف الفيديو"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-3 p-3 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-indigo-500"
        />
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 w-full py-3 rounded font-bold transition">
          نشر الفيديو
        </button>
      </form>

      {/* جدول عرض الفيديوهات */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">قائمة الفيديوهات الحالية</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400">
                <th className="p-3">العنوان</th>
                <th className="p-3">المشاهدات</th>
                <th className="p-3">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video: any) => (
                <tr key={video.id} className="border-b border-gray-700 hover:bg-gray-750">
                  <td className="p-3 font-medium">{video.title}</td>
                  <td className="p-3 text-gray-400">{video.views}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition"
                    >
                      حذف
                    </button>
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
