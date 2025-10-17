import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Transition } from '@headlessui/react';
import { User, MailCheck } from 'lucide-react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import DeleteUser from '@/components/delete-user';

type ProfileForm = {
    name: string;
    email: string;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage().props as any;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('profile.update'), { preserveScroll: true });
    };

    return (
        <AppLayout>
            <Head title="Profile settings" />
            <SettingsLayout>
                <div className="max-w-2xl mx-auto py-8">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-xl bg-[#E6F0FF] flex items-center justify-center shadow-sm">
                                <User className="h-6 w-6 text-[#2563EB]" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-[#2563EB] mb-1">Pengaturan Profil</h1>
                                <p className="text-[#6B7280]">Perbarui nama dan email akun Anda</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-md p-6 mb-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <Label htmlFor="name" className="text-[#2563EB] font-medium">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    className="mt-2 block w-full border-[#E5E7EB] focus:border-[#3B82F6]"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                    autoComplete="name"
                                    placeholder="Nama lengkap"
                                />
                                <InputError className="mt-2" message={errors.name} />
                            </div>

                            <div>
                                <Label htmlFor="email" className="text-[#2563EB] font-medium">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="mt-2 block w-full border-[#E5E7EB] focus:border-[#3B82F6]"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="username"
                                    placeholder="Alamat email"
                                />
                                <InputError className="mt-2" message={errors.email} />
                            </div>

                            {mustVerifyEmail && auth.user.email_verified_at === null && (
                                <div className="rounded-lg bg-[#FEF3C7] px-4 py-3 mt-2 flex items-center gap-2">
                                    <MailCheck className="h-5 w-5 text-[#F59E42]" />
                                    <span className="text-sm text-[#B45309]">
                                        Email Anda belum terverifikasi.{' '}
                                        <Link
                                            href={route('verification.send')}
                                            method="post"
                                            as="button"
                                            className="underline underline-offset-4 text-[#2563EB] hover:text-[#3B82F6] ml-1"
                                        >
                                            Kirim ulang verifikasi
                                        </Link>
                                    </span>
                                    {status === 'verification-link-sent' && (
                                        <span className="ml-3 text-xs font-medium text-green-600">
                                            Link verifikasi baru telah dikirim ke email Anda.
                                        </span>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center gap-4 mt-4">
                                <Button
                                    disabled={processing}
                                    className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-6"
                                >
                                    Simpan
                                </Button>
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-green-600">Tersimpan</p>
                                </Transition>
                            </div>
                        </form>
                    </div>

                    <div className="bg-white border border-[#FEE2E2] rounded-xl shadow p-6">
                        <DeleteUser />
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
