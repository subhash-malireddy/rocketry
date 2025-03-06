"use client";

import { loginAction } from "@/app/actions/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function LoginForm() {
  const [state, action, isPending] = useActionState(loginAction, undefined);

  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("callbackUrl");

  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push(nextUrl || "/");
    }
  }, [state?.success, nextUrl]);

  return (
    <form className="mt-8 space-y-6" action={action}>
      <div className="space-y-4 rounded-md shadow-sm">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-100 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-100 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Password"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
