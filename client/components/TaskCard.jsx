import { useState } from 'react';
import { motion } from 'framer-motion';

export default function TaskCard({ task, isCompleted }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = () => {
    setIsLoading(true);
    fetch(`/api/tasks/${task._id}/complete`, {
      method: 'POST'
    })
      .then(res => res.json())
      .then(data => {
        window.location.reload();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{task.name}</h3>
            <p className="text-gray-600 text-sm mt-1">{task.description}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-bold">
            +{task.points} pts
          </span>
        </div>

        <div className="mt-4">
          {isCompleted ? (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800">
              ✅ Completed
            </span>
          ) : (
            <button
              onClick={handleComplete}
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {isLoading ? 'Processing...' : 'Complete Task'}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}