import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { ListTodo, Plus, Settings, Bell, User, Home, Calendar, BarChart3 } from 'lucide-react';
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

  return (
    <nav className="bg-app-background-secondary border-b border-app-border sticky top-0 z-50 shadow-sm transition-colors duration-300 dark:border-app-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="bg-app-primary p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <ListTodo className="h-6 w-6 text-white" />
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
                    className={`text-app-primary hover:bg-app-primary-light transition-all ${
                      isActive
                        ? 'bg-app-primary text-white font-semibold'
                        : 'text-app-primary hover:text-app-primary-dark'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
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
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-app-primary hover:bg-app-primary-light"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Badge className="absolute -top-2 -right-2 bg-app-error text-white text-xs px-1.5 min-w-[1.25rem] h-5 flex items-center justify-center">
                3
              </Badge>
            </div>

            {/* Settings */}
            <Link href="/settings">
              <Button
                variant={url === '/settings' ? 'default' : 'ghost'}
                size="icon"
                className={`text-app-primary hover:bg-app-primary-light ${
                  url === '/settings' ? 'bg-app-primary text-white' : ''
                }`}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </Link>

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
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-app-border" />
                <DropdownMenuItem className="text-app-error cursor-pointer">
                  <span>Log out</span>
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
                    <item.icon className="h-4 w-4 mr-2" />
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

