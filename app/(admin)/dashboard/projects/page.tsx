'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
      }
    } catch (error) {
      alert('Failed to delete');
    }
  };

  if (loading) return <div className="p-8 text-center">Loading projects...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold dark:text-white">All Projects</h1>
        <Link 
          href="/dashboard/project/new" // You should create this route for "Add New"
          className="bg-yellow-3 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-2 transition"
        >
          + Add New Project
        </Link>
      </div>

      <div className="bg-white dark:bg-black-1 rounded-lg border dark:border-white/10 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-white/5 border-b dark:border-white/10">
            <tr>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Name</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">Type</th>
              <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-white/10">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition">
                <td className="px-6 py-4">
                  <div className="text-black dark:text-white font-medium">{project.name}</div>
                  <div className="text-xs text-gray-500">{project.projectId}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded-full border ${
                    project.status === 'live' ? 'bg-green-100 text-green-700 border-green-200' :
                    project.status === 'building' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                    'bg-gray-100 text-gray-700 border-gray-200'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {project.type?.slice(0, 2).join(', ')}{project.type?.length > 2 && '...'}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link 
                    href={`/dashboard/project/${project.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View
                  </Link>
                  <Link 
                    href={`/dashboard/project/${project.id}/edit`}
                    className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {projects.length === 0 && (
          <div className="p-8 text-center text-gray-500">No projects found.</div>
        )}
      </div>
    </div>
  );
}