import React, { useState } from 'react';
import { Calendar, Folder } from 'lucide-react';
import { mockPosts as initialPosts } from './data/mockPosts';

export default function App2() {
  const [posts, setPosts] = useState(initialPosts);
  const [form, setForm] = useState({ title: '', excerpt: '', date: '', categories: '', imageUrl: '', bgColor: 'bg-green-900/20' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addPost = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title: form.title || 'Untitled',
      excerpt: form.excerpt || '',
      date: form.date || new Date().toLocaleDateString('en-US'),
      categories: form.categories ? form.categories.split(',').map(s => s.trim()) : [],
      imageUrl: form.imageUrl || 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&q=80&w=400',
      bgColor: form.bgColor || 'bg-green-900/20'
    };
    setPosts([newPost, ...posts]);
    setForm({ title: '', excerpt: '', date: '', categories: '', imageUrl: '', bgColor: 'bg-green-900/20' });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Post (App2)</h2>

      <form onSubmit={addPost} className="space-y-3 mb-6">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" />
        <input name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Excerpt" className="w-full p-2 border rounded" />
        <input name="date" value={form.date} onChange={handleChange} placeholder="Date" className="w-full p-2 border rounded" />
        <input name="categories" value={form.categories} onChange={handleChange} placeholder="Categories (comma separated)" className="w-full p-2 border rounded" />
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
        <div className="flex items-center gap-2">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Add Post</button>
        </div>
      </form>

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="p-4 border rounded flex justify-between items-start">
            <div>
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-sm text-gray-500">{post.excerpt}</p>
              <div className="text-xs text-gray-400 mt-2 flex gap-4 items-center">
                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                <span className="flex items-center gap-1"><Folder size={14} /> {post.categories.join(', ')}</span>
              </div>
            </div>
            <img src={post.imageUrl} alt="thumb" className="w-24 h-16 object-cover rounded ml-4" />
          </div>
        ))}
      </div>
    </div>
  );
}
