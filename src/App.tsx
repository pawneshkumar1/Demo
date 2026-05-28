import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home/Home";
import { LazyLoading } from "./components/LazyLoading";

// Lazy loaded pages
const BlogPage = React.lazy(() =>
  import("./pages/Blog/BlogPage").then((m) => ({ default: m.BlogPage })),
);
const ViewBlog = React.lazy(() =>
  import("./pages/Blog/ViewBlog").then((m) => ({ default: m.ViewBlog })),
);
const Login = React.lazy(() =>
  import("./pages/Login/Login").then((m) => ({ default: m.Login })),
);
const Registration = React.lazy(() =>
  import("./pages/Register/Registration").then((m) => ({
    default: m.Registration,
  })),
);
const Individual = React.lazy(() =>
  import("./pages/Register/Individual").then((m) => ({
    default: m.Individual,
  })),
);
const Entity = React.lazy(() =>
  import("./pages/Register/Entity").then((m) => ({ default: m.Entity })),
);
const MainDashboard = React.lazy(() =>
  import("./pages/MainDashboard").then((m) => ({ default: m.MainDashboard })),
);
const ForgotPassword = React.lazy(() =>
  import("./pages/Public/Forgot/ForgotPassword").then((m) => ({
    default: m.ForgotPassword,
  })),
);
const ContactUs = React.lazy(() =>
  import("./pages/ContactUs").then((m) => ({ default: m.ContactUs })),
);
const Policy = React.lazy(() => import("./pages/Policy"));
const PageNotFound = React.lazy(() =>
  import("./pages/PageNotFound").then((m) => ({ default: m.PageNotFound })),
);

import { Toaster } from "react-hot-toast";
import { ScrollToTop } from "./components/ScrollToTop";
import { ProtectedRoute } from "./components/ProtectedRoute";

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="relative">
      {!isDashboard && <Navbar />}
      <LazyLoading minHeight="80vh">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:title_url" element={<ViewBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/register/individual" element={<Individual />} />
          <Route path="/register/entity" element={<Entity />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/policy/:type" element={<Policy />} />

          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <MainDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </LazyLoading>

      {!isDashboard && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <Router basename="/new-ui">
      <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />
      <AppContent />
    </Router>
  );
}
