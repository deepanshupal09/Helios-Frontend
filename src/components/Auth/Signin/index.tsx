"use client";
import Link from "next/link";
import React from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninWithPassword from "../SigninWithPassword";
import Image from "next/image";

export default function Signin() {
  return (
    <>
      {/* <GoogleSigninButton text="Sign in" /> */}
      {/* <Link className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray-2 p-[15px] font-medium hover:bg-opacity-50 dark:border-dark-3 dark:bg-dark-2 dark:hover:bg-opacity-50 mb-10" href="/">
        <Image
          className="hidden dark:block"
          src={"/images/logo/logo.svg"}
          alt="Logo"
          width={176}
          height={32}
        />
        <Image
          className="dark:hidden"
          src={"/images/logo/logo-dark.svg"}
          alt="Logo"
          width={176}
          height={32}
        />
      </Link> */}
      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-2xl text-center font-bold dark:bg-gray-dark">
          Sign in 
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

      <div>
        <SigninWithPassword />
      </div>

      {/* <div className="mt-6 text-center">
        <p>
          Don’t have any account?{" "}
          <Link href="/auth/signup" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div> */}
    </>
  );
}
