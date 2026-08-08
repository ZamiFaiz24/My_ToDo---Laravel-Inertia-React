import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { ListTodo, Plus, Settings, Bell, User, Home, Calendar, BarChart3, Clock, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import AppearanceToggleDropdown from './appearance-dropdown';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Tambah Tugas', href: '/tambah-tugas', icon: Plus },
  { name: 'Kalender', href: '/calendar', icon: Calendar },
  { name: 'Statistik', href: '/stats', icon: BarChart3 },
];

export default function Navbar() {
  const props = usePage().props as Record<string, any>;
  const url: string = props.url ?? (typeof window !== 'undefined' ? window.location.pathname : '');
  const auth: { user?: { name: string; email: string } } = props.auth ?? {};
  const user = auth?.user ?? { name: 'User', email: '' };

  const notifications = props.notifications ?? [];

  const unreadCount = notifications.filter(
      (notification: any) => notification.read_at === null
  ).length;

  console.log("notifications:", notifications);

  const handleLogout = () => {
    router.post('/logout');
  };

  const handleNotificationClick = (notification: any) => {
    // Kalau belum dibaca, tandai sebagai sudah dibaca
    if (!notification.read_at) {
      router.post(
        `/notifications/${notification.id}/read`,
        {},
        {
          preserveScroll: true,
          preserveState: true,
          onSuccess: () => {
            if (notification.task_id) {
              router.visit(`/task/${notification.task_id}`);
            }
          },
        }
      );

      return;
    }

    // Kalau sudah dibaca, langsung ke detail tugas
    if (notification.task_id) {
      router.visit(`/task/${notification.task_id}`);
    }
  };

  const handleMarkAllAsRead = () => {
    router.post(
      '/notifications/read-all',
      {},
      {
        preserveScroll: true,
      }
    );
  };

  return (
    <nav className="bg-app-background-secondary border-b border-app-border sticky top-0 z-50 shadow-sm transition-colors duration-300 dark:border-app-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="bg-app-primary p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <ListTodo className="h-6 w-6 text-white font-bold" />
            </div>
            <h1 className="text-xl font-bold text-app-primary hidden xs:inline">My ToDo</h1>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => {
              const isActive = url === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={`transition-all duration-300 ${
                    isActive
                      ? 'bg-app-primary text-white font-semibold cursor-default'
                      : 'text-app-primary hover:bg-app-primary-light hover:text-app-primary-dark'
                  }`}
                  >
                    <item.icon className={`h-4 w-4 mr-2 ${isActive ? 'text-white' : 'text-app-primary'}`} />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Appearance/Theme Toggle */}
            <AppearanceToggleDropdown />

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-app-primary hover:bg-app-primary-light"
              >
                <Bell className="h-5 w-5 text-app-primary" />

                {unreadCount > 0 && (
                  <Badge className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-app-error px-1.5 text-xs text-white">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-80 bg-app-background-secondary text-app-text"
            >
              {/* Header */}
              <DropdownMenuLabel className="flex items-center justify-between px-3 py-2">
                <div>
                  <p className="font-semibold text-app-text">
                    Notifikasi
                  </p>
                  <p className="text-xs font-normal text-app-text-secondary">
                    {unreadCount > 0
                      ? `${unreadCount} notifikasi belum dibaca`
                      : 'Tidak ada notifikasi baru'}
                  </p>
                </div>

                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={handleMarkAllAsRead}
                    className="flex items-center gap-1 text-xs font-medium text-app-primary hover:text-app-primary-dark"
                  >
                    <CheckCheck className="h-3.5 w-3.5" />
                    Tandai semua
                  </button>
                )}
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-app-border" />

              {/* Notification List */}
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <Bell className="mx-auto mb-2 h-8 w-8 text-app-text-muted" />
                  <p className="text-sm font-medium text-app-text">
                    Tidak ada notifikasi
                  </p>
                  <p className="mt-1 text-xs text-app-text-secondary">
                    Notifikasi tugas akan muncul di sini.
                  </p>
                </div>
              ) : (
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification: any) => (
                    <DropdownMenuItem
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`cursor-pointer items-start gap-3 px-3 py-3 ${
                        notification.read_at
                          ? 'opacity-70'
                          : 'bg-app-primary-light/30'
                      }`}
                    >
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-app-primary-light">
                        <Bell className="h-4 w-4 text-app-primary" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-app-text">
                          {notification.title}
                        </p>

                        <p className="mt-0.5 line-clamp-2 text-xs text-app-text-secondary">
                          {notification.message}
                        </p>

                        <div className="mt-1.5 flex items-center gap-1 text-[11px] text-app-text-muted">
                          <Clock className="h-3 w-3" />
                          {new Date(notification.created_at).toLocaleDateString(
                            'id-ID',
                            {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            }
                          )}
                        </div>
                      </div>

                      {!notification.read_at && (
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-app-primary" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-app-primary text-white font-semibold">
                      {user.name
                        ? user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                            .slice(0, 2)
                        : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-app-background-secondary text-app-text" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold text-app-text">{user.name}</p>
                    <p className="text-xs text-app-text-secondary">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-app-border" />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Pengaturan</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-app-border" />
                <DropdownMenuItem className="text-app-error cursor-pointer" onClick={handleLogout}>
                  <span>Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {navigation.map((item) => {
              const isActive = url === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className={`whitespace-nowrap text-app-primary hover:bg-app-primary-light transition-all ${
                      isActive
                        ? 'bg-app-primary text-white font-semibold'
                        : 'text-app-primary hover:text-app-primary-dark'
                    }`}
                  >
                    <item.icon className={`h-4 w-4 mr-2 ${isActive ? 'text-white' : 'text-app-primary'}`} />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

