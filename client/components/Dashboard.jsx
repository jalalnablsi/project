import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Leaderboard from './Leaderboard';
import TaskCard from './TaskCard';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch user data
    fetch('/api/user/me')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => router.push('/'));

    // Fetch tasks
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  if (!user) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-indigo-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🔥 Airdrop Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">
              {user.points} Points
            </span>
            <button 
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold"
              onClick={() => navigator.clipboard.writeText(`https://${window.location.host}/?ref=${user.referralCode}`)}
            >
              Copy Referral
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center space-x-4 mb-4">
            <img 
              src={user.photoUrl || '/default-avatar.png'} 
              className="w-16 h-16 rounded-full border-2 border-indigo-500"
              alt="Profile"
            />
            <div>
              <h2 className="font-bold text-xl">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-500">@{user.username}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p><span className="font-bold">Referrals:</span> {user.referrals?.length || 0}</p>
            <p><span className="font-bold">Completed Tasks:</span> {user.completedTasks?.length || 0}</p>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">🎯 Available Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks.map(task => (
              <TaskCard 
                key={task._id} 
                task={task} 
                isCompleted={user.completedTasks?.some(t => t.taskId === task._id)}
              />
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="md:col-span-3 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">🏆 Top Participants</h2>
          <Leaderboard />
        </div>
      </main>
    </div>
  );
}