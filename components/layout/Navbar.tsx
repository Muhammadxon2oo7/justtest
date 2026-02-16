'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: '🏠 Bosh Sahifa' },
    { href: '/dashboard', label: '📊 Boshqaruv Paneli' },
    { href: '/data-input', label: '📝 Ma\'lumot Kiritish' },
    {
      label: '📈 Tahlil',
      submenu: [
        { href: '/analysis/inequality', label: '📊 Tengsizlik Tahlili' },
        { href: '/analysis/clustering', label: '🎯 Klasterizacija' },
        { href: '/analysis/clustering-advanced', label: '🎯 Butun Viloyat Tahlili' },
        { href: '/analysis/ranking', label: '🏆 Reytingi' },
        { href: '/analysis/comparison', label: '⚖️ Taqqoslash' }
      ]
    },
    { href: '/recommendations', label: '💡 Tavsiyalar' }
  ];

  return (
    <nav className="bg-linear-to-r from-emerald-600 via-green-600 to-blue-700 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-white font-bold text-xl flex items-center gap-2 hover:text-emerald-100 transition-colors">
            <span className="text-2xl">🇺🇿</span>
            <span className="hidden sm:inline">O'zbekiston Hududiy Tahlili</span>
            <span className="sm:hidden text-sm">O'z Tahlili</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-0">
            {navItems.map((item: any, idx) => (
              <div key={idx} className="relative group">
                {item.submenu ? (
                  <>
                    <button className="text-white px-4 py-2 hover:bg-emerald-700 rounded-lg transition font-semibold">
                      {item.label}
                    </button>
                    <div className="absolute hidden group-hover:block bg-white text-gray-900 shadow-xl rounded-lg w-56 py-2 top-full">
                      {item.submenu.map((sub: any, subIdx: number) => (
                        <Link
                          key={subIdx}
                          href={sub.href}
                          className="block px-4 py-3 hover:bg-emerald-50 border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-white px-4 py-2 hover:bg-emerald-700 rounded-lg transition font-semibold"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white text-2xl hover:text-emerald-100 transition-colors"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-linear-to-b from-emerald-700 to-green-700 py-4 space-y-1 max-h-96 overflow-y-auto">
            {navItems.map((item: any, idx) => (
              <div key={idx}>
                {item.submenu ? (
                  <>
                    <p className="text-white px-4 py-2 font-bold border-b border-emerald-600">{item.label}</p>
                    {item.submenu.map((sub: any, subIdx: number) => (
                      <Link
                        key={subIdx}
                        href={sub.href}
                        className="block text-white px-8 py-2 hover:bg-emerald-600 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block text-white px-4 py-3 hover:bg-emerald-600 transition-colors font-semibold"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
