import React, { useState, useEffect } from 'react';
import avatarImg from './assets/avarta.jpg';
import { 
  Home, 
  FolderOpen, 
  Tags, 
  Archive, 
  Info, 
  Search, 
  Moon, 
  Sun, 
  GitBranch, 
  Globe, 
  Mail, 
  Rss,
  Calendar,
  Folder
} from 'lucide-react';

import { mockPosts, recentUpdates, trendingTags } from './data/mockPosts';

// --- COMPONENTS ---

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('Trang chủ');

  const filteredPosts = mockPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));

  useEffect(() => {
    // reset to first page when search query changes
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    // ensure current page is within range if filteredPosts shrinks
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages]);

  const displayedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  const navItems = [
    { name: 'Trang chủ', icon: <Home size={18} /> },
    { name: 'Danh mục', icon: <FolderOpen size={18} /> },
    { name: 'Thẻ', icon: <Tags size={18} /> },
    { name: 'Lưu trữ', icon: <Archive size={18} /> },
    { name: 'Giới thiệu', icon: <Info size={18} /> },
  ];

  return (
    <div className={`min-h-screen flex justify-center ${darkMode ? 'bg-[#1a1a1a] text-gray-300' : 'bg-gray-50 text-gray-800'} font-sans transition-colors duration-300`}>
      <div className="max-w-[1400px] w-full flex flex-col md:flex-row">
        
        {/* === LEFT SIDEBAR === */}
        <aside className={`w-full md:w-64 p-6 flex flex-col border-r ${darkMode ? 'border-gray-800' : 'border-gray-200'} shrink-0 md:sticky md:top-0 md:h-screen md:self-start`}>
          {/* Profile Section */}
          <div className="flex flex-col items-center md:items-start mb-8 text-center md:text-left">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-700 ">
              <img 
                src={avatarImg} 
                alt="Profile" 
                className="w-full h-full object-cover "
              />
            </div>
            <h1 className={`text-xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Appleww</h1>
            <p className="text-sm text-gray-500 italic">
              Hacker, Coder<br/>
              Network Security Specialist<br/>
              
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 mb-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveNav(item.name)}
                className={`w-full flex items-center space-x-4 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium
                  ${activeNav === item.name 
                    ? (darkMode ? 'bg-[#2a2a2a] text-gray-100' : 'bg-gray-200 text-gray-900') 
                    : (darkMode ? 'hover:bg-[#252525] text-gray-400 hover:text-gray-200' : 'hover:bg-gray-100 text-gray-600')
                  }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Footer Icons */}
          <div className="flex items-center justify-start space-x-4 text-gray-500 mt-auto">
            <button onClick={() => setDarkMode(!darkMode)} className="hover:text-gray-300 transition-colors">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href="https://github.com/Hoang456-crush" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors">
              <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors"><Globe size={18} /></a>
            <a href="#" className="hover:text-gray-300 transition-colors"><Mail size={18} /></a>
            <a href="#" className="hover:text-gray-300 transition-colors"><Rss size={18} /></a>
          </div>
        </aside>

        {/* === MAIN CONTENT === */}
        <main className="flex-1 p-4 md:p-8 flex flex-col min-w-0">
          {/* Header & Search */}
          <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-sm text-gray-400 font-medium tracking-wider uppercase">Trang chủ</h2>
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-3 py-1.5 rounded-full text-sm border focus:outline-none focus:ring-1 focus:ring-gray-500 transition-colors
                  ${darkMode 
                    ? 'bg-[#1a1a1a] border-gray-700 text-gray-200 placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'}`}
              />
            </div>
          </header>

          {/* Posts List */}
          <div className="space-y-6">
            {filteredPosts.length > 0 ? (
              displayedPosts.map((post) => (
                <article 
                  key={post.id} 
                  className={`flex flex-col md:flex-row rounded-xl overflow-hidden border transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer
                    ${darkMode ? 'bg-[#222222] border-gray-800 hover:border-gray-700' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                >
                  {/* Post Content */}
                  <div className="flex-1 p-6 flex flex-col">
                    <h3 className={`text-xl font-bold mb-3 leading-tight ${darkMode ? 'text-gray-100 hover:text-green-400' : 'text-gray-900 hover:text-green-600'} transition-colors`}>
                      {post.title}
                    </h3>
                    <p className={`text-sm mb-6 flex-1 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {post.excerpt}
                    </p>
                    
                    {/* Post Meta */}
                    <div className="flex items-center text-xs text-gray-500 space-x-6 mt-auto">
                      <div className="flex items-center space-x-1.5">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Folder size={14} />
                        <span>{post.categories.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Post Image */}
                  <div className={`w-full md:w-1/3 h-48 md:h-auto border-t md:border-t-0 md:border-l relative overflow-hidden ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                    {/* Overlay pattern for visual interest (like the image) */}
                    <div className={`absolute inset-0 ${post.bgColor} opacity-50 z-10 mix-blend-overlay`}></div>
                    <img 
                      src={post.imageUrl} 
                      alt={post.title}
                      
                    />
                  </div>
                </article>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                Không tìm thấy bài viết nào phù hợp.
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={`px-3 py-1 rounded-md text-sm font-medium ${darkMode ? 'bg-[#222] text-gray-300 hover:bg-[#2a2a2a]' : 'bg-white text-gray-700 hover:bg-gray-100'} border`}
                disabled={currentPage === 1}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md text-sm font-medium border ${currentPage === page ? (darkMode ? 'bg-green-800 text-white' : 'bg-green-200 text-gray-900') : (darkMode ? 'bg-[#1a1a1a] text-gray-300 hover:bg-[#252525]' : 'bg-white text-gray-700 hover:bg-gray-100')}`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className={`px-3 py-1 rounded-md text-sm font-medium ${darkMode ? 'bg-[#222] text-gray-300 hover:bg-[#2a2a2a]' : 'bg-white text-gray-700 hover:bg-gray-100'} border`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </main>

        {/* === RIGHT SIDEBAR === */}
        <aside className={`w-full lg:w-72 p-6 lg:border-l ${darkMode ? 'border-gray-800' : 'border-gray-200'} shrink-0 hidden lg:block`}>
          
          {/* Recently Updated */}
          <div className="mb-10">
            <h3 className={`text-sm font-bold mb-4 uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Mới cập nhật</h3>
            <ul className="space-y-3">
              {recentUpdates.map((title, idx) => (
                <li key={idx}>
                  <a href="#" className={`text-sm block truncate transition-colors ${darkMode ? 'text-gray-500 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`}>
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Trending Tags */}
          <div>
            <h3 className={`text-sm font-bold mb-4 uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Thẻ thịnh hành</h3>
            <div className="flex flex-wrap gap-2">
              {trendingTags.map((tag, idx) => (
                <a 
                  key={idx} 
                  href="#"
                  className={`text-xs px-3 py-1 rounded-full border transition-colors
                    ${darkMode 
                      ? 'border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 bg-[#1a1a1a]' 
                      : 'border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900 bg-white'}`}
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}