"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fetchProviders, signupUser } from "../../../../actions/api";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import SelectGroupTwo from "@/components/FormElements/SelectGroup/SelectGroupTwo";
import SelectGroupThree from "@/components/FormElements/SelectGroup/SelectGroupThree";

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
  const [providers, setProviders] = useState<ProviderType[]>([]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchProviders()
      .then((providers) => {
        setProviders(providers);
      })
      .catch((error) => {
        console.log("Error fetching providers!");
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formattedData = {
        ...formData,
        battery: Number(0),
        battery_capacity: Number(500),
      };
      // console.log("data: ", formattedData);
      const response = await signupUser(formattedData);
      console.log("Signup successful:", response);
      router.push("/auth/signin");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex w-full items-center justify-center bg-white p-8 dark:bg-gray-800 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="my-6 flex items-center justify-center">
            <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
            <div className="block w-full min-w-fit bg-white px-3 text-center text-2xl font-bold dark:bg-gray-dark">
              Sign Up
            </div>
            <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              {
                label: "Name",
                name: "name",
                type: "text",
                placeholder: "Enter your name",
              },
              {
                label: "Email",
                name: "email",
                type: "email",
                placeholder: "Enter your email",
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                placeholder: "Enter your password",
              },
              {
                label: "Provider",
                name: "provider_id",
                type: "text",
                placeholder: "Enter provider",
              },
              {
                label: "Phone",
                name: "phone",
                type: "text",
                placeholder: "Enter your phone number",
              },
            ].map((field, index) => (
              <div key={index}>
                <label
                  htmlFor={field.name}
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {field.label}
                </label>
                {field.name === "provider_id" ? (
                  <div className="relative z-20 bg-transparent dark:bg-dark-2">
                    <select
                      name="provider_id"
                      value={formData.provider_id}
                      onChange={handleSelectChange}
                      className="relative z-20 w-full appearance-none rounded-[7px] border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
                    >
                      <option value="" disabled>
                        Select a provider
                      </option>
                      {providers.map((provider) => (
                        <option
                          key={provider.provider_id}
                          value={provider.provider_id}
                        >
                          {provider.name}
                        </option>
                      ))}
                    </select>

                    <span className="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.99922 12.8249C8.83047 12.8249 8.68984 12.7687 8.54922 12.6562L2.08047 6.2999C1.82734 6.04678 1.82734 5.65303 2.08047 5.3999C2.33359 5.14678 2.72734 5.14678 2.98047 5.3999L8.99922 11.278L15.018 5.34365C15.2711 5.09053 15.6648 5.09053 15.918 5.34365C16.1711 5.59678 16.1711 5.99053 15.918 6.24365L9.44922 12.5999C9.30859 12.7405 9.16797 12.8249 8.99922 12.8249Z"
                          fill=""
                        />
                      </svg>
                    </span>
                  </div>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full rounded-lg border px-5.5 py-3 text-sm focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="hover:bg-primary-dark w-full rounded-lg bg-primary px-5.5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Right Section: Content */}
      <div className="custom-gradient-1 hidden w-1/2 flex-col items-center justify-center p-12 dark:bg-dark-2 lg:flex">
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
          Please sign up to your account by completing the necessary fields
          below.
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
