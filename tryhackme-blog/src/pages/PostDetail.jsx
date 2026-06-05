import React from 'react';

export default function PostDetail({ post, onClose, darkMode }) {
  if (!post) return null;

  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'bg-[#0f0f0f] text-gray-200' : 'bg-white text-gray-900'}`}>
      <div className="max-w-3xl mx-auto">
        <button onClick={onClose} className="mb-6 px-3 py-1 rounded bg-gray-200 text-gray-900">Back</button>

        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-400 mb-6">{post.date} — {post.categories.join(', ')}</p>

        <div className="mb-6">
          <img src={post.imageUrl} alt="post" className="w-full rounded" />
        </div>

        <p className="text-base text-gray-300">{post.excerpt}</p>

        <section className="mt-6 prose prose-invert">
          <h2>Full writeup</h2>
          <p>Add the full post content for this writeup here.</p>
        </section>
      </div>
    </div>
  );
}
