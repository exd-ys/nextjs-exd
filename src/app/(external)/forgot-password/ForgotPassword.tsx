"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'phosphor-react';

const ForgotPassword = () => {
    const router = useRouter();

    return (
        <div className="grid min-h-svh lg:grid-cols-2 font-['Inter',sans-serif]">
            <div className="flex flex-col gap-4 p-6 md:p-10 h-full">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-md mx-auto">
                        <button className="mb-6 text-[#868686] text-md flex items-center gap-2 cursor-pointer" onClick={() => router.back()}>
                            <ArrowLeft size={18} /> Back
                        </button>
                        <h1 className="text-[18px] font-semibold text-[#363636] mb-2">Reset Password</h1>
                        <p className="text-[14px] text-[#868686] mb-4">Enter your email address below, and we'll send you a link to reset your password.</p>
                        <label htmlFor="email" className="text-[14px] font-medium text-[#363636] mb-1 block">Email</label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="w-full h-[42px] px-[16px] rounded-[6px] border border-[#d9d9d9] !text-[14px] placeholder:text-[14px] placeholder:text-[#d9d9d9] font-normal"
                        />
                        <Button
                            type="submit"
                            className="w-full h-[42px] bg-[#383ad8] text-[white] text-[14px] font-semibold rounded-[6px] mt-6 cursor-pointer"
                        >
                            Send reset password link
                        </Button>
                        <div className="text-[13px] text-[#868686] mt-2">
                            Are you having trouble? <a href="#" className="text-[#383ad8] font-semibold">Contact us</a>
                        </div>
                    </div>
                </div>
                <div className="text-center text-sm text-muted-foreground mt-8">
                    © 2024 Powered by You_Source
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <img
                    src="/images/bg-authentication.png"
                    alt="Forgot password cover"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
                <div className="absolute bottom-[110px] left-1/2 -translate-x-1/2 text-center text-white w-[370px] z-10">
                    <div className="flex flex-col gap-1 items-center w-full text-[#363636] text-center">
                        <h2 className="font-['Inter',_sans-serif] text-[24px] font-semibold mb-1 leading-normal">Turn your idea to reality</h2>
                        <p className="font-['Inter',_sans-serif] text-[14px] font-normal leading-[1.5]">Consistent quality and experience across all platforms.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ForgotPassword;
