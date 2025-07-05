"use client";

import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Menu,
  MenuButton,
  Transition,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";

import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";

export const SignInButton = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    router.push("/");
    await signOut();
  };

  return (
    <>
      {session ? (
        <Menu as="div" className="relative z-50">
          <MenuButton aria-label="User menu" aria-expanded="false">
            {session?.user?.image ? (
              // Change the size of the image by changing the h-12 and w-12 classes
              <div className="relative h-12 w-12">
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User Avatar"}
                  className="rounded-full"
                  fill
                  sizes="100%"
                />
              </div>
            ) : (
              <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-stone-200">
                <svg
                  className="h-full w-full text-stone-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            )}
          </MenuButton>
          <Transition
            as={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            // change w-72 to change the width of the dropdown
            className="absolute right-0 mt-2 w-72 origin-top-right rounded-lg bg-white text-stone-700 shadow-lg dark:bg-stone-900 dark:text-white z-50"
          >
            <MenuItems className="p-4">
              <div className="mb-4 flex items-center gap-4">
                {session?.user?.image ? (
                  <div className="relative h-10 w-10">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User Avatar"}
                      className="rounded-full"
                      fill
                      sizes="100%"
                    />
                  </div>
                ) : (
                  <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-stone-200">
                    <svg
                      className="h-full w-full text-stone-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                )}
                <div>
                  <p className="font-medium">
                    {session?.user?.name || "User Name"}
                  </p>
                  <p className="text-stone-400 dark:text-stone-300">
                    {session?.user?.email}
                  </p>
                </div>
              </div>
              <MenuItem
                as="button"
                className={({ focus }) =>
                  clsx(
                    "flex w-full items-center gap-3 rounded-md px-4 py-2 text-sm",
                    focus && "bg-stone-100 dark:bg-stone-800"
                  )
                }
                onClick={handleSignOut}
              >
                <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
                Sign Out
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      ) : (
        <button
          className="rounded-md border border-stone-300 px-4 py-2 text-sm dark:border-stone-600"
          onClick={() => signIn()}
          aria-label="Sign in"
        >
          Sign In
        </button>
      )}
    </>
  );
};
