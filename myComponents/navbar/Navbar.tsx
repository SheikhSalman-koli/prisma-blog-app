"use client"; // 1. Essential for interactivity
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '../theme/ModeToggle';

export default function Navbar() {
  // 2. State to track if menu is open
  const [isOpen, setIsOpen] = useState(false);

  const menuitem = [
    { title: 'Home', url: '/' },
    { title: 'Blogs', url: '/blogs' },
    { title: 'About', url: '/about' },
    { title: 'Practice', url: '/development' },
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Login', url: '/auth/login' },
    { title: 'Register', url: '/auth/register' },
  ];

  const pathname = usePathname()
  

  return (
    <nav className=" border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="shrink-0 font-bold text-blue-600">Prisma Blog App</div>
            <ModeToggle />
          {/* Desktop Links (Hidden on mobile) */}
          <div className="hidden md:flex space-x-8">
            {menuitem.map((item, idx) => {
                const isActive = item.url === pathname
                return(
                       <Link key={idx} href={item.url} className={` hover:text-red-500 ${isActive ? 'text-red-600 underline' : ''}`}>
                {item.title}
              </Link>
                )
            })}
          </div>

          {/* 3. Mobile Button with onClick */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 4. The actual Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 pb-4">
          {menuitem.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.url} 
              onClick={() => setIsOpen(false)} // Close menu when a link is clicked
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}