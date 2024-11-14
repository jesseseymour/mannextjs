"use client";

import { SessionProvider } from "next-auth/react";
import Login from "./login";

export default function Page() {
  return (
    <SessionProvider>
      <Login />
    </SessionProvider>
  );
}
