'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ViewProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/projects/${params.id}`)
        .then(res => res.json())
        .then(data => {
          setProject(data.project);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!project) return <div className="p-8 text-center">Project not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/dashboard/projects" className="text-gray-500 hover:text-black dark:hover:text-white transition text-sm">
          ← Back to Projects
        </Link>
      </div>

      <div className="bg-white dark:bg-black-1 rounded-lg border dark:border-white/10 p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold dark:text-white mb-2">{project.name}</h1>
            <div className="flex gap-2">
              <span className="text-sm px-2 py-1 bg-gray-100 dark:bg-white/10 rounded">{project.status}</span>
              {project.featured && <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Featured</span>}
            </div>
          </div>
          <Link 
            href={`/dashboard/project/${project.id}/edit`}
            className="px-4 py-2 bg-yellow-3 text-black rounded font-medium hover:bg-yellow-2"
          >
            Edit Project
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-2 dark:text-white">Details</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{project.detail}</p>
            
            <h3 className="font-semibold mb-2 dark:text-white">Links</h3>
            <div className="space-y-1 text-sm">
              <p>Live: <a href={project.link} target="_blank" className="text-blue-500 underline">{project.link || 'N/A'}</a></p>
              <p>Git: <a href={project.git} target="_blank" className="text-blue-500 underline">{project.git || 'N/A'}</a></p>
            </div>
          </div>
          
          <div>
             <h3 className="font-semibold mb-2 dark:text-white">Tech Stack</h3>
             <div className="flex flex-wrap gap-2">
               {project.tags?.map((tag: string) => (
                 <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-white/5 text-xs rounded border dark:border-white/10 dark:text-gray-300">
                   {tag}
                 </span>
               ))}
             </div>
          </div>
        </div>

        {/* Image Gallery */}
        <h3 className="font-semibold mb-4 dark:text-white">Gallery</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {project.img?.map((image: any, idx: number) => (
            <div key={idx} className="relative aspect-video bg-gray-100 dark:bg-white/5 rounded overflow-hidden">
               {/* Use standard img tag if simpler, or Next.js Image with exact dimensions */}
               <img src={image.src} alt={image.text} className="object-cover w-full h-full" />
               <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate">
                 {image.text}
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}