import DashboardLayout from '../components/DashboardLayout';
import dynamic from 'next/dynamic';

// تحميل المكونات بشكل ديناميكي لتحسين الأداء
const TasksSection = dynamic(() => import('../components/TasksSection'));
const ReferralSection = dynamic(() => import('../components/ReferralSection'));
const LeaderboardSection = dynamic(() => import('../components/LeaderboardSection'));

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* العمود الأيسر */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">ملفي الشخصي</h2>
            <UserProfileCard />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">إحصائيات سريعة</h2>
            <QuickStats />
          </div>
        </div>

        {/* العمود الأيمن */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <TasksSection />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <ReferralSection />
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <LeaderboardSection />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// مكونات مساعدة
function UserProfileCard() {
  const { user } = useUser();
  
  return (
    <div className="flex items-center space-x-4">
      <img 
        src={user?.photoUrl || '/default-avatar.png'} 
        className="w-16 h-16 rounded-full border-2 border-indigo-500"
        alt="صورة المستخدم"
      />
      <div>
        <h3 className="font-bold">{user?.firstName} {user?.lastName}</h3>
        <p className="text-gray-500">@{user?.username}</p>
        <p className="text-indigo-600 font-bold mt-1">
          {user?.points || 0} نقطة
        </p>
      </div>
    </div>
  );
}

function QuickStats() {
  const { user } = useUser();
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <StatCard 
        title="الإحالات" 
        value={user?.referrals?.length || 0}
        icon="👥"
      />
      <StatCard 
        title="المهام المكتملة" 
        value={user?.completedTasks?.length || 0}
        icon="✅"
      />
      <StatCard 
        title="النقاط اليوم" 
        value={user?.todayPoints || 0}
        icon="✨"
      />
      <StatCard 
        title="المستوى" 
        value={Math.floor((user?.points || 0) / 100) + 1}
        icon="🏆"
      />
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-bold text-lg">{value}</div>
      <div className="text-gray-500 text-sm">{title}</div>
    </div>
  );
}