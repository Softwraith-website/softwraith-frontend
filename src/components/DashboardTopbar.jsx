export default function DashboardTopbar({ user, onLogout }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome, {user?.name || "User"}
        </h1>
        <p className="text-sm text-gray-500">
          {user?.email || ""}
        </p>
      </div>

      <button
        onClick={onLogout}
        className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
      >
        Logout
      </button>
    </div>
  );
}
