import { Link, usePage } from '@inertiajs/react'
import { ListTodo, Plus, Settings, Bell, User, Home, Calendar, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Tambah Tugas', href: '/tambah-tugas', icon: Plus },
  { name: 'Kalender', href: '/calendar', icon: Calendar },
  { name: 'Statistik', href: '/stats', icon: BarChart3 },
]

export default function Navbar() {
  const props = usePage().props as Record<string, any>
  const url: string = props.url ?? ''
  const auth: { user?: { name: string, email: string } } = props.auth ?? {}

  const user = auth?.user ?? { name: "User", email: "" }

  return (
    <nav className="bg-[#F3F4F6] text-[#2563EB] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <Link href="/dashboard" className="flex items-center space-x-4">
            <div className="bg-[#3B82F6] p-2 rounded-lg">
              <ListTodo className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#2563EB]">My ToDo</h1>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = url === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`text-[#2563EB] hover:bg-[#3B82F6]/20 hover:text-[#2563EB] transition-colors ${
                      isActive ? 'bg-[#3B82F6] text-white font-bold' : ''
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#2563EB] hover:bg-[#3B82F6]/20 hover:text-[#2563EB]"
              >
                <Bell className="h-5 w-5" />
              </Button>
              <Badge className="absolute -top-1 -right-1 bg-[#3B82F6] text-white text-xs px-1 min-w-[1.25rem] h-5">
                3
              </Badge>
            </div>

            {/* Settings */}
            <Link href="/settings">
              <Button
                variant="ghost"
                size="icon"
                className={`text-[#2563EB] hover:bg-[#3B82F6]/20 hover:text-[#2563EB] ${
                  url === '/settings' ? 'bg-[#3B82F6] text-white font-bold' : ''
                }`}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-[#3B82F6] text-white">
                      {user.name
                        ? user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                        : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#F3F4F6] text-[#2563EB]" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-[#3B82F6]">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-1 overflow-x-auto">
            {navigation.map((item) => {
              const isActive = url === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`text-[#2563EB] hover:bg-[#3B82F6]/20 hover:text-[#2563EB] whitespace-nowrap ${
                      isActive ? 'bg-[#3B82F6] text-white font-bold' : ''
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
