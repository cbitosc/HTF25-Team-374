import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import ItemCard from '../components/ItemCard';

// The HomePage is the first thing users see. It should be welcoming
// and guide them to the main features of the site.
const HomePage: React.FC = () => {
  const { items, loading } = useData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/items/lost?search=${encodeURIComponent(searchTerm)}`);
  };

  // Filter for recently lost and found items to display on the homepage
  const recentLost = items.filter(item => item.status === 'lost').slice(0, 3);
  const recentFound = items.filter(item => item.status === 'found').slice(0, 3);
  
  const SkeletonCard = () => (
  <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-gray-700"></div>
    <div className="p-4">
      <div className="h-6 bg-gray-600 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-600 rounded w-full mb-4"></div>
      <div className="h-4 bg-gray-600 rounded w-1/2"></div>
    </div>
    <div className="p-4 bg-gray-700">
      <div className="h-10 bg-gray-600 rounded"></div>
    </div>
  </div>
  );

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center bg-gray-800 p-10 rounded-lg shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-200 mb-4">Lost Something? Found Something?</h1>
          <p className="text-lg text-gray-300 mb-8">The central hub for reuniting owners with their lost items on campus.</p>
        <div className="flex justify-center space-x-4">
            <Link to="/report" className="bg-brand-700 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-brand-600 transition-transform hover:scale-105">
            Report an Item
          </Link>
            <Link to="/items/lost" className="bg-emerald-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-transform hover:scale-105">
            Browse Items
          </Link>
        </div>
        <form onSubmit={handleSearch} className="mt-8 max-w-lg mx-auto">
            <div className="relative">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for an item (e.g., 'wallet', 'phone')"
          className="w-full p-4 pr-12 text-black border border-gray-300 rounded-lg bg-gray-100 focus:ring-emerald-500 focus:border-emerald-500"
        />
        <button type="submit" className="absolute top-0 right-0 h-full p-4 text-sm font-medium text-white bg-emerald-700 rounded-r-lg border border-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/></svg>
                </button>
            </div>
        </form>
      </div>
      
      {/* Recently Lost Items Section */}
      <div>
        <h2 className="text-3xl font-bold text-emerald-200 mb-6 border-l-4 border-brand-700 pl-4">Recently Lost</h2>
        {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkeletonCard /><SkeletonCard /><SkeletonCard />
            </div>
        ) : recentLost.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentLost.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No lost items reported recently.</p>
        )}
      </div>

      {/* Recently Found Items Section */}
      <div>
  <h2 className="text-3xl font-bold text-emerald-200 mb-6 border-l-4 border-brand-700 pl-4">Recently Found</h2>
        {loading ? (
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkeletonCard /><SkeletonCard /><SkeletonCard />
            </div>
        ) : recentFound.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentFound.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No found items reported recently.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;