"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Menu,
  X,
  Globe,
  LogIn,
  UserPlus,
  ChevronDown,
  Search,
  Shield,
  LogOut,
  User,
} from "lucide-react";

import { API, clearAuth, getToken, getUser } from "./NavbarParts/authStorage";
import { guideItems, navItems } from "./NavbarParts/constants";

const LoginModal = dynamic(() => import("./NavbarParts/LoginModal"), {
  ssr: false,
  loading: () => null,
});

const RegisterModal = dynamic(() => import("./NavbarParts/RegisterModal"), {
  ssr: false,
  loading: () => null,
});

const SearchBar = dynamic(() => import("./NavbarParts/SearchBar"), {
  ssr: false,
  loading: () => null,
});

const UserMenu = dynamic(() => import("./NavbarParts/UserMenu"), {
  ssr: false,
  loading: () => (
    <div className="h-10 w-24 rounded-xl border border-gray-200 bg-gray-50" />
  ),
});

function runWhenIdle(callback) {
  if (typeof window === "undefined") return undefined;

  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(callback, { timeout: 1500 });
    return () => window.cancelIdleCallback(id);
  }

  const id = window.setTimeout(callback, 400);
  return () => window.clearTimeout(id);
}

export default function Navbar() {
  const router = useRouter();
  const dropdownRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [mobileGuides, setMobileGuides] = useState(false);
  const [modal, setModal] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null);

  const isAdmin = user?.role === "admin";

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openLogin = useCallback(() => {
    setModal("login");
  }, []);

  const openRegister = useCallback(() => {
    setModal("register");
  }, []);

  const openSearch = useCallback(() => {
    setSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  const handleAuthSuccess = useCallback((loggedInUser) => {
    setUser(loggedInUser);
    setModal(null);
  }, []);

  const handleLogout = useCallback(() => {
    clearAuth();
    setUser(null);
    closeMobileMenu();
    router.refresh();
  }, [closeMobileMenu, router]);

  const bodyLocked = Boolean(modal || searchOpen || isOpen);

  useEffect(() => {
    const saved = getUser();
    if (saved) setUser(saved);
  }, []);

  // Verify token after the first render so Navbar does not block initial page work.
  useEffect(() => {
    const token = getToken();
    if (!token) return undefined;

    const controller = new AbortController();

    const cancelIdleTask = runWhenIdle(() => {
      fetch(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      })
        .then((r) => r.json())
        .then((json) => {
          if (json.success) {
            setUser(json.user);
            localStorage.setItem("lp_user", JSON.stringify(json.user));
          } else {
            clearAuth();
            setUser(null);
          }
        })
        .catch(() => {
          // Keep locally cached user if backend is temporarily unavailable.
        });
    });

    return () => {
      controller.abort();
      if (typeof cancelIdleTask === "function") cancelIdleTask();
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setGuidesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick, { passive: true });
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = bodyLocked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [bodyLocked]);

  const desktopNav = useMemo(
    () =>
      navItems.map((item) => (
        <div
          key={item.name}
          className="relative"
          ref={item.hasDropdown ? dropdownRef : null}
        >
          {item.hasDropdown ? (
            <>
              <button
                type="button"
                aria-expanded={guidesOpen}
                aria-label="Open guides menu"
                onClick={() => setGuidesOpen((value) => !value)}
                onMouseEnter={() => setGuidesOpen(true)}
                className="flex cursor-pointer items-center gap-1 px-3 py-2 text-sm font-medium text-[#001327] transition-colors hover:text-[#b5d56a] focus:outline-none"
              >
                {item.name}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${
                    guidesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {guidesOpen && (
                <div
                  onMouseLeave={() => setGuidesOpen(false)}
                  className="absolute left-0 top-full z-50 mt-1 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl"
                >
                  <div className="h-1 bg-gradient-to-r from-[#001327] to-[#b5d56a]" />
                  <ul className="py-2">
                    {guideItems.map((guide, index) => (
                      <li key={guide.id}>
                        <Link
                          href={guide.href}
                          className="group flex items-center gap-3 px-4 py-2.5 text-sm text-[#001327] transition-colors hover:bg-[#b5d56a]/10"
                        >
                          <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#001327] text-xs font-bold text-white transition-colors group-hover:bg-[#b5d56a]">
                            {guide.id}
                          </span>
                          <span className="font-medium">{guide.label}</span>
                        </Link>
                        {index < guideItems.length - 1 && (
                          <div className="mx-4 border-t border-gray-50" />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <a
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-[#001327] transition-colors hover:text-[#b5d56a]"
            >
              {item.name}
            </a>
          )}
        </div>
      )),
    [guidesOpen]
  );

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-shrink-0">
              <Link href="/" aria-label="Go to homepage">
                <Image
                  src="/Logo Icons/Literary Palace SVG-01.svg"
                  alt="Literary Palace"
                  width={160}
                  height={50}
                  className="h-[46px] w-auto object-contain"
                  sizes="160px"
                />
              </Link>
            </div>

            <div className="hidden items-center space-x-1 lg:flex">
              {desktopNav}

              {isAdmin && (
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-1.5 rounded-lg bg-[#b5d56a] px-3 py-2 text-sm font-bold text-[#07294e] transition-colors hover:bg-[#a3c05a]"
                >
                  <Shield className="h-3.5 w-3.5" />
                  Admin
                </Link>
              )}
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <button
                type="button"
                onClick={openSearch}
                aria-label="Open search"
                className="cursor-pointer rounded-lg p-2 text-[#001327] transition-colors hover:text-[#b5d56a]"
              >
                <Search className="h-5 w-5" />
              </button>

              <button
                type="button"
                aria-label="Change language"
                className="cursor-pointer rounded-lg p-2 text-[#001327] transition-colors hover:text-[#b5d56a]"
              >
                <Globe className="h-5 w-5" />
              </button>

              {user ? (
                <UserMenu user={user} onLogout={handleLogout} />
              ) : (
                <>
                  <button
                    type="button"
                    onClick={openLogin}
                    className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#07294e] px-4 py-2 text-sm font-semibold text-[#001327] transition-colors hover:border-[#b5d56a] hover:text-[#b5d56a]"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </button>

                  <button
                    type="button"
                    onClick={openRegister}
                    className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#b5d56a] px-4 py-2 text-sm font-semibold text-[#001327] transition-colors hover:bg-[#a3c05a]"
                  >
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                onClick={openSearch}
                aria-label="Open search"
                className="p-2 text-[#001327] hover:text-[#b5d56a]"
              >
                <Search className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen((value) => !value)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                className="p-2 text-[#001327] hover:text-[#b5d56a]"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-y-0 left-0 z-40 mt-16 w-64 overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="space-y-1 px-3 pb-6 pt-3">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.hasDropdown ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setMobileGuides((value) => !value)}
                      aria-expanded={mobileGuides}
                      className="flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium text-[#001327] hover:bg-[#b5d56a]/5"
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          mobileGuides ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                        mobileGuides ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-3 mt-1 space-y-1 border-l-2 border-[#b5d56a] pl-3">
                        {guideItems.map((guide) => (
                          <Link
                            key={guide.id}
                            href={guide.href}
                            onClick={closeMobileMenu}
                            className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-sm text-[#001327] transition-colors hover:bg-[#b5d56a]/5 hover:text-[#b5d56a]"
                          >
                            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#001327] text-xs font-bold text-white">
                              {guide.id}
                            </span>
                            {guide.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#001327] hover:bg-[#b5d56a]/5"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}

            {user && (
              <Link
                href="/dashboard"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-[#07294e] transition-colors hover:bg-[#f9fce8]"
              >
                <User className="h-4 w-4" />
                Dashboard
              </Link>
            )}

            {isAdmin && (
              <Link
                href="/admin/dashboard"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 rounded-xl bg-[#b5d56a] px-3 py-2.5 text-sm font-bold text-[#07294e] transition-colors hover:bg-[#a3c05a]"
              >
                <Shield className="h-4 w-4" />
                Admin Panel
              </Link>
            )}

            <div className="space-y-2 border-t border-gray-100 pt-4">
              {user ? (
                <>
                  <div className="rounded-xl bg-gray-50 px-3 py-2">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="truncate text-sm font-semibold text-[#07294e]">
                      {user.email}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      openLogin();
                    }}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-xl border border-gray-300 px-3 py-2.5 text-sm font-medium text-[#001327] transition-colors hover:bg-gray-50"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      openRegister();
                    }}
                    className="flex w-full cursor-pointer items-center gap-2 rounded-xl bg-[#b5d56a] px-3 py-2.5 text-sm font-bold text-[#001327] transition-colors hover:bg-[#a3c05a]"
                  >
                    <UserPlus className="h-4 w-4" />
                    Sign Up Free
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {modal === "login" && (
        <LoginModal
          onClose={closeModal}
          onSwitchToRegister={openRegister}
          onSuccess={handleAuthSuccess}
        />
      )}

      {modal === "register" && (
        <RegisterModal
          onClose={closeModal}
          onSwitchToLogin={openLogin}
          onSuccess={handleAuthSuccess}
        />
      )}

      {searchOpen && <SearchBar onClose={closeSearch} />}
    </>
  );
}
