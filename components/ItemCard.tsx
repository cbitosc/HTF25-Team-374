
import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../types';

interface ItemCardProps {
  item: Item;
}

// The ItemCard is a reusable component to display a single item's summary.
// It's used on the homepage and the lost/found list pages.
// Using components like this keeps the code DRY (Don't Repeat Yourself).
const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const statusColor = item.status === 'lost'
    ? 'bg-rose-700 text-rose-100'
    : 'bg-emerald-800 text-emerald-100';

  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <img className="w-full h-48 object-cover" src={item.image} alt={item.title} />
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-100">{item.title}</h3>
            <span className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ${statusColor}`}>{item.status.toUpperCase()}</span>
        </div>
        <p className="text-gray-300 text-sm mb-4 flex-grow">{item.description.substring(0, 100)}...</p>
        <div className="text-xs text-gray-400">
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Date:</strong> {new Date(item.datetime).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="p-4 bg-gray-700">
        <Link to={`/item/${item.id}`} className="w-full text-center block bg-brand-700 text-white px-4 py-2 rounded-md hover:bg-brand-600 transition-colors">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
