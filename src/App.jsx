import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Layout from "./components/Layout";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestOnlyRoute from "./components/GuestOnlyRoute";
import Spinner from "./components/ui/Spinner";

// Public pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Training = lazy(() => import("./pages/Training"));
const Contact = lazy(() => import("./pages/Contact"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetailPublic = lazy(() => import("./pages/CourseDetailPublic"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Auth pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

// Dashboards
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const AdminLayout = lazy(() => import("./admin/layouts/AdminLayout"));
const AdminOverview = lazy(() => import("./admin/pages/AdminOverview"));
const AdminCourses = lazy(() => import("./admin/pages/AdminCourses"));
const AdminCourseCreate = lazy(() => import("./admin/pages/AdminCourseCreate"));
const AdminCourseEdit = lazy(() => import("./admin/pages/AdminCourseEdit"));
const AdminCourseLectures = lazy(() => import("./admin/pages/AdminCourseLectures"));
const AdminUsers = lazy(() => import("./admin/pages/AdminUsers"));
const AdminUserDetail = lazy(() => import("./pages/admin/AdminUserDetail"));
const AdminEnrollments = lazy(() => import("./admin/pages/AdminEnrollments"));
const AdminContacts = lazy(() => import("./admin/pages/AdminContacts"));
const AdminServices = lazy(() => import("./admin/pages/AdminServices"));
const AdminPayments = lazy(() => import("./admin/pages/AdminPayments"));

const PageSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <Spinner size="lg" />
  </div>
);

export default function App() {
  return (
    <Suspense fallback={<PageSpinner />}>
      <Routes>
        {/* Public site */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/training" element={<Training />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetailPublic />} />
        </Route>

        {/* Auth — redirect logged-in users to dashboard */}
        <Route path="/login" element={<GuestOnlyRoute><Login /></GuestOnlyRoute>} />
        <Route path="/register" element={<GuestOnlyRoute><Register /></GuestOnlyRoute>} />
        <Route path="/forgot-password" element={<GuestOnlyRoute><ForgotPassword /></GuestOnlyRoute>} />
        <Route path="/reset-password/:token" element={<GuestOnlyRoute><ResetPassword /></GuestOnlyRoute>} />

        {/* User Dashboard — protected */}
        <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* Admin Dashboard — protected + admin role check */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminOverview />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="courses/create" element={<AdminCourseCreate />} />
          <Route path="courses/edit/:id" element={<AdminCourseEdit />} />
          <Route path="courses/:courseId/lectures" element={<AdminCourseLectures />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id" element={<AdminUserDetail />} />
          <Route path="enrollments" element={<AdminEnrollments />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="payments" element={<AdminPayments />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Analytics />
    </Suspense>
  );
}
