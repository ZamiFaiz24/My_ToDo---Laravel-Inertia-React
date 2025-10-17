import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { User, Key, Palette } from 'lucide-react';

const sidebarNavItems: NavItem[] = [
	{
		title: 'Profile',
		href: '/settings/profile',
		icon: User,
	},
	{
		title: 'Password',
		href: '/settings/password',
		icon: Key,
	},
	{
		title: 'Appearance',
		href: '/settings/appearance',
		icon: Palette,
	},
];

export default function SettingsLayout({ children }: PropsWithChildren) {
	if (typeof window === 'undefined') {
		return null;
	}

	const currentPath = window.location.pathname;

	return (
		<div className="min-h-screen bg-[#F3F4F6] px-4 py-6">
			<div className="flex flex-col lg:flex-row lg:space-x-12">
				{/* Sidebar */}
				<aside className="w-full max-w-xl lg:w-64">
					<div className="mb-8 rounded-xl bg-white p-6 shadow-md">
						<h2 className="mb-1 text-2xl font-bold text-[#2563EB]">
							Settings
						</h2>
						<p className="mb-6 text-sm text-[#6B7280]">
							Manage your profile and account settings
						</p>
						<nav className="flex flex-col gap-2">
							{sidebarNavItems.map((item, index) => (
								<Button
									key={`${item.href}-${index}`}
									size="sm"
									variant={
										currentPath === item.href ? 'default' : 'ghost'
									}
									asChild
									className={cn(
										'w-full justify-start rounded-lg transition-all',
										currentPath === item.href
											? 'bg-[#3B82F6] text-white font-bold shadow'
											: 'text-[#2563EB] hover:bg-[#E0F2FE]'
									)}
								>
									<Link href={item.href} prefetch>
										<span className="flex items-center">
											{item.icon && (
												<item.icon className="mr-2 h-5 w-5 text-[#2563EB]" />
											)}
											{item.title}
										</span>
									</Link>
								</Button>
							))}
						</nav>
					</div>
				</aside>

				<Separator className="my-6 md:hidden" />

				{/* Main Content */}
				<div className="flex-1 md:max-w-2xl">
					<section className="max-w-xl space-y-12">{children}</section>
				</div>
			</div>
		</div>
	);
}
