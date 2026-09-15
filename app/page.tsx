import { db } from '@/db';
import { videos } from '@/db/schema';

export default async function Home() {
  const allVideos = await db.select().from(videos);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8" dir="rtl">
      <header className="flex justify-between items-center mb-10 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-black text-indigo-500">منصتي للفيديوهات</h1>
        <a href="/admin" className="bg-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
          لوحة التحكم
        </a>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {allVideos.map((video: any) => (
          <div key={video.id} className="bg-gray-900 rounded-xl overflow-hidden shadow-md border border-gray-800">
            <div className="aspect-video bg-gray-800 flex items-center justify-center">
              <iframe src={video.videoUrl} className="w-full h-full" allowFullScreen></iframe>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{video.title}</h2>
              <p className="text-gray-400 text-sm mb-4">{video.description}</p>
              <div className="text-xs text-gray-500">{video.views} مشاهدة</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
