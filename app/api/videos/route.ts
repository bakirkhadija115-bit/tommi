import { NextResponse } from 'next/server';
import { db } from '@/db';
import { videos } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  const allVideos = await db.select().from(videos);
  return NextResponse.json(allVideos);
}

export async function POST(req: Request) {
  const { title, videoUrl, description } = await req.json();
  const newVideo = await db.insert(videos).values({
    title,
    videoUrl,
    description,
  }).returning();
  return NextResponse.json(newVideo[0]);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  await db.delete(videos).where(eq(videos.id, Number(id)));
  return NextResponse.json({ success: true });
}
