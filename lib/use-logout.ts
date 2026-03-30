"use client";

import { useState, useCallback } from "react";
import { removeToken } from "@/lib/auth";

export function useLogout() {
  const [loggingOut, setLoggingOut] = useState(false);

  const logout = useCallback(async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    await removeToken();
    window.location.replace("/login");
  }, [loggingOut]);

  return { logout, loggingOut };
}
