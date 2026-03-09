import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { BlogPage } from './pages/BlogPage';
import { ViewBlog } from './pages/ViewBlog';
import { Login } from './pages/Login';
import { motion, useScroll, useSpring } from 'motion/react';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Router>
      <ErrorBoundary>
        <div className="relative">
          {/* Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-primary z-[60] origin-left"
            style={{ scaleX }}
          />

          <Navbar />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/view" element={<ViewBlog />} />
            <Route path="/login" element={<Login />} />
          </Routes>

          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}
