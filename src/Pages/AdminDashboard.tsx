const AdminDashboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">لوحة تحكم الأدمن</h2>
      <div className="space-y-4">
        <a href="/new-post" className="bg-blue-500 text-white p-2 rounded inline-block">إضافة بوست جديد</a>
        {/* ممكن تضيف جدول بالبوستات هنا */}
      </div>
    </div>
  );
};

export default AdminDashboard;
