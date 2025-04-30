import React from 'react';

const OverviewCards = () => {
  const data = [
    { title: 'Courses Enrolled', value: 3, sub: '2 in progress, 1 completed' },
    { title: 'Average Progress', value: '58%', bar: 58 },
    { title: 'Quizzes Completed', value: 7, sub: 'Average score: 85%' },
    { title: 'Learning Streak', value: '5 days', sub: 'Keep it up!' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {data.map((item) => (
        <div key={item.title} className="bg-white p-4 rounded-xl shadow">
          <div className="text-sm text-gray-500">{item.title}</div>
          <div className="text-2xl font-bold">{item.value}</div>
          {item.sub && <div className="text-xs text-gray-400">{item.sub}</div>}
          {item.bar && (
            <div className="h-2 bg-gray-200 rounded mt-2">
              <div className="h-full bg-black rounded" style={{ width: `${item.bar}%` }}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
