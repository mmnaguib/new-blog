const Register = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">تسجيل أدمن جديد</h2>
      <form>
        <input
          type="text"
          placeholder="اسم المستخدم"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          className="w-full p-2 mb-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          تسجيل
        </button>
      </form>
    </div>
  );
};

export default Register;
