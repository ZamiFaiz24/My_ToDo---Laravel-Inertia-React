import { Head, Link, useForm, usePage } from '@inertiajs/react'
import { FormEventHandler } from 'react'
import { Transition } from '@headlessui/react'
import { MailCheck, User } from 'lucide-react'

import InputError from '@/components/input-error'
import DeleteUser from '@/components/delete-user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'

type ProfileForm = {
    name: string
    email: string
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage().props as any

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()
        patch(route('profile.update'), { preserveScroll: true })
    }

    return (
        <AppLayout>
            <Head title="Pengaturan Profil" />
            <SettingsLayout>
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-app-border bg-app-primary-light shadow-sm">
                            <User className="h-6 w-6 text-app-primary" />
                        </div>
                        <div>
                            <h1 className="mb-1 text-3xl font-extrabold tracking-tight text-app-text">Pengaturan Profil</h1>
                            <p className="text-sm text-app-text-muted">Perbarui nama dan email akun Anda.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="overflow-hidden rounded-2xl border border-app-border bg-app-background-secondary shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                                <div className="border-b border-app-border px-6 py-5">
                                    <h2 className="text-lg font-semibold text-app-primary">Informasi Akun</h2>
                                    <p className="mt-1 text-sm text-app-text-secondary">Perbarui identitas yang ditampilkan pada akun Anda.</p>
                                </div>

                                <div className="p-6">
                                    <form onSubmit={submit} className="space-y-6">
                                        <div>
                                            <Label htmlFor="name" className="font-medium text-app-text-secondary">
                                                Nama Lengkap
                                            </Label>
                                            <Input
                                                id="name"
                                                className="mt-2 block w-full border-app-border bg-app-background text-app-text placeholder:text-app-text-muted focus:border-app-primary"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                                autoComplete="name"
                                                placeholder="Nama lengkap"
                                            />
                                            <InputError className="mt-2" message={errors.name} />
                                        </div>

                                        <div>
                                            <Label htmlFor="email" className="font-medium text-app-text-secondary">
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                className="mt-2 block w-full border-app-border bg-app-background text-app-text placeholder:text-app-text-muted focus:border-app-primary"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                                autoComplete="username"
                                                placeholder="Alamat email"
                                            />
                                            <InputError className="mt-2" message={errors.email} />
                                        </div>

                                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                                            <div className="flex items-start gap-3 rounded-xl border border-app-warning/20 bg-app-warning-light px-4 py-3">
                                                <MailCheck className="mt-0.5 h-5 w-5 text-app-warning" />
                                                <div className="text-sm text-app-text-secondary">
                                                    <span>Email Anda belum terverifikasi.</span>{' '}
                                                    <Link
                                                        href={route('verification.send')}
                                                        method="post"
                                                        as="button"
                                                        className="font-medium text-app-primary underline underline-offset-4 hover:text-app-primary-dark"
                                                    >
                                                        Kirim ulang verifikasi
                                                    </Link>
                                                    {status === 'verification-link-sent' && (
                                                        <div className="mt-1 text-xs font-medium text-app-success">Link verifikasi baru telah dikirim ke email Anda.</div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-4 pt-2">
                                            <Button
                                                disabled={processing}
                                                className="bg-app-primary px-6 font-semibold text-white hover:bg-app-primary-dark"
                                            >
                                                Simpan Perubahan
                                            </Button>
                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-app-success">Tersimpan</p>
                                            </Transition>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="rounded-2xl border border-app-border bg-app-background-secondary shadow-sm transition hover:-translate-y-0.5 hover:border-app-error/30 hover:shadow-md">
                                <div className="border-b border-app-border px-6 py-5">
                                    <h2 className="text-lg font-semibold text-app-primary">Hapus Akun</h2>
                                    <p className="mt-1 text-sm text-app-text-secondary">Tindakan ini tidak dapat dibatalkan.</p>
                                </div>
                                <div className="p-6">
                                    <DeleteUser />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    )
}
