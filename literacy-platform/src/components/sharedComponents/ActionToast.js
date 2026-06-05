"use client";

import { useCallback, useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";

export function useActionToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((type = "info", message = "") => {
    setToast({ type, message });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const Toast = toast ? (
    <div className="fixed right-4 top-4 z-[9999] max-w-sm animate-[toastIn_180ms_ease-out]">
      <div
   className={`flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur bg-white ${
          toast.type === "success"
            ? "border-green-200"
            : toast.type === "error"
            ? "border-red-200"
            : "border-[#b5d56a]"
        }`}
        role="status"
        aria-live="polite"
      >
        <div
     className={`mt-0.5 rounded-full p-1 ${
            toast.type === "success"
              ? "bg-green-100 text-green-700"
              : toast.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-[#f9fce8] text-[#07294e]"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle className="h-4 w-4" />
          ) : toast.type === "error" ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <Info className="h-4 w-4" />
          )}
        </div>

        <p className="flex-1 text-sm font-medium text-gray-800">{toast.message}</p>

        <button
          type="button"
          aria-label="Close notification"
          onClick={() => setToast(null)}
     className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  ) : null;

  return { Toast, showToast };
}
