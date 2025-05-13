'use client';

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";
import Image from "next/image";

// Logout Button Component
const LogoutButton: React.FC = () => {
  const router = useRouter();

  const handleLogout = useCallback(async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/auth/login");
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [router]);

  return (
    <button
      onClick={handleLogout}
      className="text-white"
    >
      Logout
    </button>
  );
};

export const Header: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const handleLinkClick = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <>
      {/* Top Header */}
      <header className="bg-teal-900 text-white p-4 flex justify-between items-center z-10 relative">
        {/* Logo */}
        <div className="logo flex items-center">
          <Image
            src="/Logo-.png"
            alt="Quick Tech Logo"
            width={48}
            height={48}
            className="h-12 object-contain mr-4"
            priority
          />
          <h1 className="text-base sm:text-lg md:text-xl font-bold">
            Quick Tech Institute{" "}
            <span className="hidden sm:inline">Of Information Technology</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/main" className="hover:underline">Home</Link>
          <Link href="/main/courses" className="hover:underline">Courses</Link>
          <Link href="/main/admission" className="hover:underline">Admissions</Link>
          <Link href="/main/contact" className="hover:underline">Contact</Link>
          <Link href="/main/FAQ" className="hover:underline">FAQ</Link>
          <LogoutButton />
        </nav>

        {/* Hamburger Menu for Mobile */}
        <button 
          className="md:hidden cursor-pointer"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-0.5 bg-white mb-1" />
          <div className="w-6 h-0.5 bg-white mb-1" />
          <div className="w-6 h-0.5 bg-white" />
        </button>
      </header>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 right-0 h-full bg-teal-700 text-white transition-all duration-300 z-20 ${isSidebarOpen ? 'w-64' : 'w-0'} overflow-x-hidden`}
      >
        <button
          className="absolute top-4 left-4 text-2xl cursor-pointer"
          onClick={toggleSidebar}
          aria-label="Close menu"
        >
          ×
        </button>

        <div className="mt-16 flex flex-col space-y-4 px-6">
          <Link href="/main" onClick={handleLinkClick} className="py-3  rounded">Home</Link>
          <Link href="/main/courses" onClick={handleLinkClick} className="py-3 rounded">Courses</Link>
          <Link href="/main/admission" onClick={handleLinkClick} className="py-3  rounded">Admissions</Link>
          <Link href="/main/contact" onClick={handleLinkClick} className="py-3   rounded">Contact</Link>
          <Link href="/main/FAQ" onClick={handleLinkClick} className="py-3  -700 rounded">FAQ</Link>
          
          {/* Logout Button in Sidebar */}
          <div className="py-3">
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
};
