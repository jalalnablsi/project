import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users/leaderboard')
      .then(res => res.json())
      .then(data => {
        setLeaders(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div className="text-center py-4">Loading leaderboard...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Referrals</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leaders.map((user, index) => (
            <tr key={user._id} className={index < 3 ? 'bg-yellow-50' : ''}>
              <td className="px-6 py-4 whitespace-nowrap">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img 
                    src={user.photoUrl || '/default-avatar.png'} 
                    className="w-8 h-8 rounded-full mr-2" 
                    alt="User"
                  />
                  <span>@{user.username}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.points}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.referrals?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}