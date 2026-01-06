'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Basic Form
  const [baseForm, setBaseForm] = useState({
    name: '',
    status: '',
    detail: '',
    link: '',
    git: '',
    featured: false,
    minor: false,
  });

  // Dynamic Lists
  const [tags, setTags] = useState<string[]>([]);
  
  // Image Management
  const [existingImages, setExistingImages] = useState<any[]>([]); 
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  
  // New Uploads
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newCaptions, setNewCaptions] = useState<string[]>([]);

  // --- 1. Fetch Data ---
  useEffect(() => {
    if (params.id) {
      fetch(`/api/projects/${params.id}`)
        .then(res => res.json())
        .then(data => {
          if(data.project) {
             const p = data.project;
             setBaseForm({
               name: p.name || '',
               status: p.status || '',
               detail: p.detail || '',
               link: p.link || '',
               git: p.git || '',
               featured: p.featured || false,
               minor: p.minor || false,
             });
             setTags(p.tags || []);
             setExistingImages(p.img || []);
          }
          setLoading(false);
        });
    }
  }, [params.id]);

  // --- 2. Handlers ---

  const handleDeleteExisting = (publicId: string, index: number) => {
    if (confirm('Delete this image? It will be removed when you click Save.')) {
      if (publicId) {
        setImagesToDelete((prev) => [...prev, publicId]);
      }
      const updated = [...existingImages];
      updated.splice(index, 1);
      setExistingImages(updated);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewFiles([...newFiles, ...files]);
      setNewCaptions([...newCaptions, ...files.map(() => '')]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const formData = new FormData();
      
      Object.entries(baseForm).forEach(([key, value]) => formData.append(key, String(value)));
      formData.append('tags', JSON.stringify(tags));
      formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
      formData.append('newCaptions', JSON.stringify(newCaptions));
      
      newFiles.forEach(file => {
        formData.append('newImages', file);
      });

      const res = await fetch(`/api/projects/${params.id}`, {
        method: 'PUT',
        body: formData, 
      });
      
      if (res.ok) {
        router.push(`/dashboard/project/${params.id}`);
      } else {
        alert('Update failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving project');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/dashboard/project/${params.id}`} className="text-gray-500 hover:text-black dark:hover:text-white text-sm">
          ← Cancel
        </Link>
      </div>

      <div className="bg-white dark:bg-black-1 rounded-lg border dark:border-white/10 p-8">
        <h1 className="text-2xl font-bold dark:text-white mb-6">Edit Project: {baseForm.name}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section: Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold border-b pb-2 dark:border-white/10 dark:text-gray-200">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Project Name</label>
                <input 
                  type="text" 
                  value={baseForm.name}
                  onChange={(e) => setBaseForm({...baseForm, name: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="label">Status</label>
                <select 
                  value={baseForm.status}
                  onChange={(e) => setBaseForm({...baseForm, status: e.target.value})}
                  className="input-field"
                >
                  <option value="building">Building</option>
                  <option value="live">Live</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="label">Detail / Description</label>
              <textarea 
                rows={3}
                value={baseForm.detail}
                onChange={(e) => setBaseForm({...baseForm, detail: e.target.value})}
                className="input-field"
              />
            </div>
          </div>

          {/* Section: Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Live Link</label>
              <input 
                type="text" 
                value={baseForm.link}
                onChange={(e) => setBaseForm({...baseForm, link: e.target.value})}
                className="input-field"
              />
            </div>
            <div>
              <label className="label">GitHub Link</label>
              <input 
                type="text" 
                value={baseForm.git}
                onChange={(e) => setBaseForm({...baseForm, git: e.target.value})}
                className="input-field"
              />
            </div>
          </div>

          {/* Section: Existing Images */}
          <div className="border-t pt-6 dark:border-white/10">
            <h3 className="font-semibold mb-4 dark:text-white">Existing Images</h3>
            
            {existingImages.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No images uploaded yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {existingImages.map((img, idx) => (
                  <div key={idx} className="flex gap-4 p-3 border dark:border-white/10 rounded-lg bg-gray-50 dark:bg-white/5">
                    {/* Thumbnail */}
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={img.src} alt="Thumbnail" className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Details */}
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <span className="text-xs text-gray-500 uppercase font-bold">Caption</span>
                        <p className="text-sm dark:text-gray-300 truncate">{img.text}</p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => handleDeleteExisting(img.publicId, idx)}
                        className="text-xs flex items-center gap-1 text-red-600 hover:text-red-800 font-medium mt-2"
                      >
                        Delete Image
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: Add New Images */}
          <div className="border-t pt-6 dark:border-white/10">
            <h3 className="font-semibold mb-4 dark:text-white">Upload New Images</h3>
            
            {/* FIXED: Replaced Quotes with Backticks below */}
            <input 
              type="file" 
              multiple 
              accept="image/*"
              onChange={handleFileSelect}
              className={`block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-yellow-50 file:text-yellow-700
                hover:file:bg-yellow-100 mb-4`}
            />
            
            {newFiles.length > 0 && (
              <div className="space-y-2">
                {newFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 bg-yellow-50/50 dark:bg-white/5 rounded">
                     <span className="text-xs font-mono dark:text-gray-400 w-32 truncate">{file.name}</span>
                     <input 
                       type="text" 
                       placeholder="Enter Caption"
                       value={newCaptions[idx]}
                       onChange={(e) => {
                         const copy = [...newCaptions];
                         copy[idx] = e.target.value;
                         setNewCaptions(copy);
                       }}
                       className="flex-1 p-1 text-sm border rounded dark:bg-black-2 dark:border-white/10 dark:text-white"
                     />
                     <button 
                       type="button" 
                       onClick={() => {
                         setNewFiles(newFiles.filter((_, i) => i !== idx));
                         setNewCaptions(newCaptions.filter((_, i) => i !== idx));
                       }}
                       className="text-red-500 px-2 font-bold"
                     >
                       ✕
                     </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="border-t pt-6 dark:border-white/10">
            <button 
              type="submit" 
              disabled={saving}
              className="w-full py-3 bg-yellow-3 text-black font-bold rounded-lg hover:bg-yellow-2 transition disabled:opacity-50"
            >
              {saving ? 'Saving Changes...' : 'Save Updates'}
            </button>
          </div>
        </form>
      </div>
      
      <style jsx global>{`
        .label {
          @apply block text-sm font-medium mb-1 dark:text-gray-300;
        }
        .input-field {
          @apply w-full p-2 border border-gray-300 dark:border-white/20 rounded-md bg-transparent dark:text-white focus:ring-2 focus:ring-yellow-3 focus:outline-none transition;
        }
      `}</style>
    </div>
  );
}