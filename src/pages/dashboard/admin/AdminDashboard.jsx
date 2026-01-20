import { NavLink, Routes, Route } from "react-router-dom";
import ManageCourses from "./ManageCourses";
import ManageUsers from "./ManageUsers";

export default function AdminDashboard() {
  return (
    <>
      <nav className="mb-6 space-x-4">
        <NavLink to="/dashboard/admin" end>Courses</NavLink>
        <NavLink to="/dashboard/admin/users">Users</NavLink>
      </nav>

      <Routes>
        <Route index element={<ManageCourses />} />
        <Route path="users" element={<ManageUsers />} />
      </Routes>
    </>
  );
}
