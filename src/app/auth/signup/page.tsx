"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signupUser } from "../../../../actions/api";

export default function SignupWithPassword() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    provider_id: "",
    name: "",
    battery: "",
    battery_capacity: "",
    phone: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formattedData = {
        ...formData,
        battery: Number(formData.battery),
        battery_capacity: Number(formData.battery_capacity),
      };

      const response = await signupUser(formattedData);
      console.log("Signup successful:", response);
      router.push("/auth/signin");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8 bg-white dark:bg-gray-800">
        <div className="w-full max-w-md">
        <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-2xl text-center font-bold dark:bg-gray-dark">
          Sign Up
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
              { label: "Password", name: "password", type: "password", placeholder: "Enter your password" },
              { label: "Provider ID", name: "provider_id", type: "text", placeholder: "Enter provider ID" },
              { label: "Name", name: "name", type: "text", placeholder: "Enter your name" },
              { label: "Battery", name: "battery", type: "number", placeholder: "Enter battery type" },
              { label: "Battery Capacity", name: "battery_capacity", type: "number", placeholder: "Enter battery capacity" },
              { label: "Phone", name: "phone", type: "text", placeholder: "Enter your phone number" },
            ].map((field, index) => (
              <div key={index}>
                <label
                  htmlFor={field.name}
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border rounded-lg focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Right Section: Content */}
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 p-12 custom-gradient-1 dark:bg-dark-2">
        <Link href="/" className="mb-10">
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
        </Link>
        <p className="mb-3 text-xl font-medium text-dark dark:text-white">
          Sign up to register your account
        </p>
        <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
          Welcome to Helios!
        </h1>
        <p className="w-full max-w-md text-center font-medium text-dark-4 dark:text-dark-6">
          Please sign up to your account by completing the necessary fields below.
        </p>
        <div className="mt-8">
          <Image
            src={"/images/grids/grid-02.svg"}
            alt="Illustration"
            width={405}
            height={325}
            className="mx-auto dark:opacity-30"
          />
        </div>
      </div>
    </div>
  );
}
