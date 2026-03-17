// app/portfolio/[id]/page.js
import ProjectDetailClient from './ProjectDetailClient';
import { API_BASE } from "@/utils/api";

export default async function Page(routeParams) {
  // Await params before destructuring
  const params = await routeParams.params;
  const { id } = params;

  // Fetch project data
  const res = await fetch(`${API_BASE}/api/projects/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    return <p>Project not found</p>;
  }
  const project = await res.json();

  return <ProjectDetailClient project={project} />;
}