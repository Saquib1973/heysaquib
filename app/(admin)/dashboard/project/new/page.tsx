'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Basic Fields
  const [baseForm, setBaseForm] = useState({
    id: '', 
    name: '',
    status: 'building',
    detail: '',
    link: '',
    git: '',
    date: '',
    featured: false,
    minor: false,
  });

  // Dynamic Array Fields
  const [descriptions, setDescriptions] = useState<string[]>(['']);
  const [tags, setTags] = useState<string[]>(['']);
  const [types, setTypes] = useState<string[]>(['fullstack']);
  
  // Image Handling
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [captions, setCaptions] = useState<string[]>([]);

  // --- Handlers ---
  const handleArrayChange = (setter: any, list: string[], index: number, value: string) => {
    const newList = [...list];
    newList[index] = value;
    setter(newList);
  };

  const addArrayItem = (setter: any, list: string[]) => setter([...list, '']);
  
  const removeArrayItem = (setter: any, list: string[], index: number) => {
    setter(list.filter((_, i) => i !== index));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles([...selectedFiles, ...newFiles]);
      setCaptions([...captions, ...newFiles.map(() => '')]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    setCaptions(captions.filter((_, i) => i !== index));
  };

  const handleCaptionChange = (index: number, val: string) => {
    const newCaptions = [...captions];
    newCaptions[index] = val;
    setCaptions(newCaptions);
  };

  // --- Submit Handler ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // 1. Basic Fields
      Object.entries(baseForm).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      // 2. Arrays
      formData.append('description', JSON.stringify(descriptions.filter(d => d.trim() !== '')));
      formData.append('tags', JSON.stringify(tags.filter(t => t.trim() !== '')));
      formData.append('type', JSON.stringify(types.filter(t => t.trim() !== '')));
      
      // 3. Images
      selectedFiles.forEach((file) => {
        formData.append('images', file);
      });
      formData.append('imgCaptions', JSON.stringify(captions));

      const res = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        router.push('/dashboard/projects');
      } else {
        const err = await res.json();
        alert(`Error: ${err.error || 'Failed to create'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/dashboard/projects" className="text-gray-500 hover:text-black dark:hover:text-white transition text-sm">
          ← Cancel
        </Link>
      </div>

      <div className="bg-white dark:bg-black-1 rounded-lg border dark:border-white/10 p-8">
        <h1 className="text-2xl font-bold dark:text-white mb-8">Create New Project</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2 dark:border-white/10 dark:text-gray-200">Basic Info</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">Project Name</label>
                <input required type="text" className="input-field" 
                  value={baseForm.name} onChange={e => setBaseForm({...baseForm, name: e.target.value})} />
              </div>
              <div>
                <label className="label">Unique ID (URL Slug)</label>
                <input required type="text" className="input-field font-mono text-sm" placeholder="e.g. diaryof"
                  value={baseForm.id} onChange={e => setBaseForm({...baseForm, id: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label">Status</label>
                <select className="input-field" 
                  value={baseForm.status} onChange={e => setBaseForm({...baseForm, status: e.target.value})}>
                  <option value="building">Building</option>
                  <option value="live">Live</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className="label">Date</label>
                <input type="text" className="input-field" placeholder="e.g. Jan 2025"
                  value={baseForm.date} onChange={e => setBaseForm({...baseForm, date: e.target.value})} />
              </div>
              <div className="flex items-center gap-4 pt-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={baseForm.featured} onChange={e => setBaseForm({...baseForm, featured: e.target.checked})} />
                  <span className="text-sm dark:text-gray-300">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={baseForm.minor} onChange={e => setBaseForm({...baseForm, minor: e.target.checked})} />
                  <span className="text-sm dark:text-gray-300">Minor Project</span>
                </label>
              </div>
            </div>

             <div>
                <label className="label">One-line Detail</label>
                <textarea rows={2} className="input-field" 
                  value={baseForm.detail} onChange={e => setBaseForm({...baseForm, detail: e.target.value})} />
              </div>
          </div>

          {/* Section 2: Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Live Link</label>
              <input type="url" className="input-field" placeholder="https://..."
                value={baseForm.link} onChange={e => setBaseForm({...baseForm, link: e.target.value})} />
            </div>
            <div>
              <label className="label">GitHub Repo</label>
              <input type="url" className="input-field" placeholder="https://github.com/..."
                value={baseForm.git} onChange={e => setBaseForm({...baseForm, git: e.target.value})} />
            </div>
          </div>

          {/* Section 3: Dynamic Arrays */}
          <div className="space-y-6">
            <ArrayInput title="Paragraph Descriptions" items={descriptions} 
              onChange={(i: number, v: string) => handleArrayChange(setDescriptions, descriptions, i, v)}
              onAdd={() => addArrayItem(setDescriptions, descriptions)}
              onRemove={(i: number) => removeArrayItem(setDescriptions, descriptions, i)}
              isTextArea
            />
            
            <ArrayInput title="Tags / Tech Stack" items={tags} 
              onChange={(i: number, v: string) => handleArrayChange(setTags, tags, i, v)}
              onAdd={() => addArrayItem(setTags, tags)}
              onRemove={(i: number) => removeArrayItem(setTags, tags, i)}
            />

            <ArrayInput title="Project Type (e.g., frontend, fullstack)" items={types} 
              onChange={(i: number, v: string) => handleArrayChange(setTypes, types, i, v)}
              onAdd={() => addArrayItem(setTypes, types)}
              onRemove={(i: number) => removeArrayItem(setTypes, types, i)}
            />
          </div>

          {/* Section 4: Images */}
          <div className="space-y-4 border-t pt-6 dark:border-white/10">
            <h3 className="font-semibold text-lg dark:text-gray-200">Gallery Images</h3>
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
                hover:file:bg-yellow-100`}
            />
            
            <div className="grid grid-cols-1 gap-4 mt-4">
              {selectedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-white/5 rounded border dark:border-white/10">
                  <span className="text-sm truncate w-1/4 dark:text-gray-300">{file.name}</span>
                  <input 
                    type="text" 
                    placeholder="Caption / Alt text"
                    value={captions[idx]}
                    onChange={(e) => handleCaptionChange(idx, e.target.value)}
                    className="flex-1 p-2 text-sm border rounded bg-white dark:bg-black-1 dark:border-white/20 dark:text-white"
                  />
                  <button type="button" onClick={() => removeFile(idx)} className="text-red-500 hover:text-red-700">✕</button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6 border-t dark:border-white/10">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-yellow-3 text-black font-bold rounded-lg hover:bg-yellow-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Uploading & Creating...' : 'Create Project'}
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

// Helper Component for Arrays
function ArrayInput({ title, items, onChange, onAdd, onRemove, isTextArea = false }: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="label">{title}</label>
        <button type="button" onClick={onAdd} className="text-xs text-yellow-600 hover:text-yellow-500 font-bold">+ Add Item</button>
      </div>
      <div className="space-y-2">
        {items.map((item: string, idx: number) => (
          <div key={idx} className="flex gap-2">
            {isTextArea ? (
              <textarea value={item} onChange={(e) => onChange(idx, e.target.value)} className="input-field" rows={2} />
            ) : (
              <input type="text" value={item} onChange={(e) => onChange(idx, e.target.value)} className="input-field" />
            )}
            <button type="button" onClick={() => onRemove(idx)} className="text-red-500 px-2">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}