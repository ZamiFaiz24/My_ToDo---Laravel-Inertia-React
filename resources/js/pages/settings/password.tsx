import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Password settings" />

            <SettingsLayout>
                <div className="max-w-2xl mx-auto py-8">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#E6F0FF] flex items-center justify-center shadow-sm">
                            <Lock className="h-6 w-6 text-[#2563EB]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[#2563EB] mb-1">Pengaturan Password</h1>
                            <p className="text-[#6B7280]">Pastikan akun Anda menggunakan password yang kuat dan unik.</p>
                        </div>
                    </div>

                    <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-md p-6">
                        <form onSubmit={updatePassword} className="space-y-6">
                            <div>
                                <Label htmlFor="current_password" className="text-[#2563EB] font-medium">Password Saat Ini</Label>
                                <Input
                                    id="current_password"
                                    ref={currentPasswordInput}
                                    value={data.current_password}
                                    onChange={(e) => setData('current_password', e.target.value)}
                                    type="password"
                                    className="mt-2 block w-full border-[#E5E7EB] focus:border-[#3B82F6]"
                                    autoComplete="current-password"
                                    placeholder="Password saat ini"
                                />
                                <InputError className="mt-2" message={errors.current_password} />
                            </div>

                            <div>
                                <Label htmlFor="password" className="text-[#2563EB] font-medium">Password Baru</Label>
                                <Input
                                    id="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    type="password"
                                    className="mt-2 block w-full border-[#E5E7EB] focus:border-[#3B82F6]"
                                    autoComplete="new-password"
                                    placeholder="Password baru"
                                />
                                <InputError className="mt-2" message={errors.password} />
                            </div>

                            <div>
                                <Label htmlFor="password_confirmation" className="text-[#2563EB] font-medium">Konfirmasi Password</Label>
                                <Input
                                    id="password_confirmation"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    type="password"
                                    className="mt-2 block w-full border-[#E5E7EB] focus:border-[#3B82F6]"
                                    autoComplete="new-password"
                                    placeholder="Konfirmasi password baru"
                                />
                                <InputError className="mt-2" message={errors.password_confirmation} />
                            </div>

                            <div className="flex items-center gap-4 mt-4">
                                <Button
                                    disabled={processing}
                                    className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-6"
                                >
                                    Simpan Password
                                </Button>
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-green-600">Password berhasil disimpan</p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
