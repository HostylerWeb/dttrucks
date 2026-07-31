"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/admin/login/actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-on-surface mb-1.5"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="w-full rounded-lg border border-outline-variant bg-white px-3 py-2.5 text-on-surface shadow-sm focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/20"
          placeholder="admin@dttrucks.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-on-surface mb-1.5"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-lg border border-outline-variant bg-white px-3 py-2.5 text-on-surface shadow-sm focus:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container/20"
        />
      </div>

      {state.error && (
        <p
          role="alert"
          className="rounded-lg border border-primary-fixed-dim bg-primary-fixed-dim/20 px-3 py-2 text-sm text-primary"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-primary-container px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary disabled:opacity-60"
      >
        {isPending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
