'use client';

import React, { useState } from 'react'
import {
  PanelLeft,
  PanelLeftClose,
  Bell,
  ShoppingCart,
  Truck,
  AlertTriangle,
  UserPlus,
  CreditCard,
  Star,
  RotateCcw,
  CheckCircle,
  X,
  Home,
  LayoutDashboard,
  LogOut,
  Sun,
  Moon,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
interface HeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
  darkMode: boolean
  onToggleTheme: () => void
}
export function Header({
  sidebarOpen,
  onToggleSidebar,
  darkMode,
  onToggleTheme,
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const notifications = [
    {
      id: 1,
      icon: ShoppingCart,
      color: 'text-emerald-500 bg-emerald-50',
      text: 'New Order #ORD-7235 from Rahim Uddin — ৳2,450',
      time: '2 min ago',
      unread: true,
    },
    {
      id: 2,
      icon: Truck,
      color: 'text-blue-500 bg-blue-50',
      text: 'Order #ORD-7234 shipped to Sarah Wilson',
      time: '15 min ago',
      unread: true,
    },
    {
      id: 3,
      icon: AlertTriangle,
      color: 'text-amber-500 bg-amber-50',
      text: 'Low stock alert: USB-C Hub (3 remaining)',
      time: '32 min ago',
      unread: true,
    },
    {
      id: 4,
      icon: UserPlus,
      color: 'text-violet-500 bg-violet-50',
      text: 'New customer signup: Fatema Begum',
      time: '1 hr ago',
      unread: false,
    },
    {
      id: 5,
      icon: CreditCard,
      color: 'text-emerald-500 bg-emerald-50',
      text: 'Payment received: ৳12,500 from Kamal Hossain',
      time: '2 hr ago',
      unread: false,
    },
    {
      id: 6,
      icon: Star,
      color: 'text-amber-500 bg-amber-50',
      text: '5-star review from Mike Johnson',
      time: '3 hr ago',
      unread: false,
    },
    {
      id: 7,
      icon: RotateCcw,
      color: 'text-rose-500 bg-rose-50',
      text: 'Refund requested for #ORD-7220',
      time: '4 hr ago',
      unread: false,
    },
    {
      id: 8,
      icon: CheckCircle,
      color: 'text-emerald-500 bg-emerald-50',
      text: 'Order #ORD-7232 delivered successfully',
      time: '5 hr ago',
      unread: false,
    },
  ]
  return (
    <>
      <header
        className={`sticky top-0 z-30 flex items-center justify-between h-14 px-4 border-b transition-colors duration-300 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
      >
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-100'}`}
            title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? (
              <PanelLeftClose className="w-5 h-5" />
            ) : (
              <PanelLeft className="w-5 h-5" />
            )}
          </button>
          <div
            className={`h-5 w-px mx-3 ${darkMode ? 'bg-slate-600' : 'bg-slate-300'}`}
          ></div>
          <button
            onClick={() => setShowAdminPanel(true)}
            className={`text-sm font-semibold transition-colors ${darkMode ? 'text-slate-200 hover:text-[#FF5000]' : 'text-slate-800 hover:text-[#FF5000]'}`}
          >
            Admin Management
          </button>
        </div>

        <div className="flex items-center gap-1 relative">
          {/* Notification Bell */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 rounded-lg transition-colors relative ${darkMode ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#FF5000] rounded-full border-2 border-white"></span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg transition-colors ${darkMode ? 'text-amber-400 hover:bg-slate-700' : 'text-slate-500 hover:bg-slate-100'}`}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <AnimatePresence mode="wait">
              {darkMode ? (
                <motion.div
                  key="sun"
                  initial={{
                    rotate: -90,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: 90,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <Sun className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{
                    rotate: 90,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: -90,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <Moon className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Notification Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                ></div>
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                    scale: 0.95,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-semibold text-slate-800">
                      Notifications
                    </h3>
                    <button className="text-xs font-medium text-[#FF5000] hover:underline">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`flex gap-3 p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${notif.unread ? 'bg-orange-50/30' : ''}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notif.color}`}
                        >
                          <notif.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-700 leading-snug">
                            {notif.text}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            {notif.time}
                          </p>
                        </div>
                        {notif.unread && (
                          <div className="w-2 h-2 bg-[#FF5000] rounded-full mt-1.5 flex-shrink-0"></div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-slate-100 bg-slate-50/50 text-center">
                    <button className="text-sm font-medium text-slate-600 hover:text-[#FF5000] transition-colors">
                      View All Notifications
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Admin Panel Overlay */}
      <AnimatePresence>
        {showAdminPanel && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setShowAdminPanel(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">
                  Admin Management
                </h2>
                <button
                  onClick={() => setShowAdminPanel(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-8">
                {/* Admin Info */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl font-serif">
                    M
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Admin</h3>
                    <p className="text-sm text-slate-500">
                      mdrifathossainsinfo@gmail.com
                    </p>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Quick Actions
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-[#FF5000] hover:bg-orange-50 hover:text-[#FF5000] transition-all group">
                      <Home className="w-6 h-6 text-slate-400 group-hover:text-[#FF5000]" />
                      <span className="text-sm font-medium">Home</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-[#FF5000] hover:bg-orange-50 hover:text-[#FF5000] transition-all group">
                      <LayoutDashboard className="w-6 h-6 text-slate-400 group-hover:text-[#FF5000]" />
                      <span className="text-sm font-medium">Dashboard</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all group">
                      <LogOut className="w-6 h-6 text-slate-400 group-hover:text-rose-500" />
                      <span className="text-sm font-medium">Log out</span>
                    </button>
                  </div>
                </div>

                {/* System Info */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    System Status
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Role</span>
                      <span className="font-medium text-slate-900">
                        Super Admin
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Last Login</span>
                      <span className="font-medium text-slate-900">
                        Today, 9:30 AM
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">Status</span>
                      <span className="flex items-center gap-2 font-medium text-slate-900">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{' '}
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recent Actions */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Recent Activity
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                      <span className="text-slate-600">
                        Updated product pricing for Summer Collection
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                      <span className="text-slate-600">
                        Approved refund request #7220
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                      <span className="text-slate-600">
                        Added new admin user 'Sarah'
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
