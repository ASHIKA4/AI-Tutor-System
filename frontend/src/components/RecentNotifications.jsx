const notifications = [
    {
      id: 1,
      message: 'Your quiz result is now available',
      time: '2 hours ago',
    },
    {
      id: 2,
      message: 'New lesson added to Machine Learning course',
      time: 'Yesterday',
    },
    {
      id: 3,
      message: 'Reminder: Assignment due in 3 days',
      time: 'Yesterday',
    },
  ];
  
  const RecentNotifications = () => (
    <div className="p-3 bg-white shadow-sm rounded" data-aos="fade-up" data-aos-duration="1000">
      <h5 className="fw-bold mb-3" data-aos="fade-up" data-aos-duration="1000">Recent Notifications</h5>
      {notifications.map((note) => (
        <div key={note.id} className="d-flex align-items-start gap-3 p-2 border rounded mb-2" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
          <div className="bg-success-subtle text-success fw-bold rounded-circle d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>
            AI
          </div>
          <div>
            <div>{note.message}</div>
            <div className="text-muted small">{note.time}</div>
          </div>
        </div>
      ))}
    </div>
  );

  export default RecentNotifications;