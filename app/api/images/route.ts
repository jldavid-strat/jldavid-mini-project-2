import fs from 'fs';
import path from 'path';

export async function GET() {
  const postsDir = path.join(process.cwd(), 'public/assets/images');
  const images = fs.readdirSync(postsDir).filter((file) => file.endsWith('.jpg'));
  return Response.json(images);
}