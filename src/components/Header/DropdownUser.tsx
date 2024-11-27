import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "@/components/ClickOutside";
import { deleteAuth } from "../../../actions/cookie";
import { useRouter } from 'next/navigation';
import { getAuth } from "../../../actions/cookie"; 
import { parseJwt } from "../../../actions/utils"; 

const DropdownUser = () => {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  async function handleLogout() {
    await deleteAuth();
    console.log("User logged out");
    router.push('/auth/signin');
  }

  const confirmLogout = async () => {
    setLogoutModalOpen(false);
    handleLogout();
  };

  const cancelLogout = () => {
    setLogoutModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getAuth();
      console.log(token);
      const data = parseJwt(token);
      console.log(data);
      if (data && data.user) {
        setUserName(data.user.name);
      }
    };
    fetchData();
  }, []);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={(e) => {
          e.preventDefault();
          setDropdownOpen(!dropdownOpen);
        }}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src="/images/user/user-28.png"
            alt="User"
            className="overflow-hidden rounded-full"
          />
        </span>

        <span className="flex items-center gap-2 font-medium text-dark dark:text-dark-6">
          <span className="hidden lg:block">{userName}</span>

          <svg
            className={`fill-current duration-200 ease-in ${dropdownOpen && "rotate-180"}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.6921 7.09327C3.91674 6.83119 4.3113 6.80084 4.57338 7.02548L9.99997 11.6768L15.4266 7.02548C15.6886 6.80084 16.0832 6.83119 16.3078 7.09327C16.5325 7.35535 16.5021 7.74991 16.24 7.97455L10.4067 12.9745C10.1727 13.1752 9.82728 13.1752 9.59322 12.9745L3.75989 7.97455C3.49781 7.74991 3.46746 7.35535 3.6921 7.09327Z"
            />
          </svg>
        </span>
      </Link>

      {dropdownOpen && (
        <div className="absolute right-0 mt-7.5 flex w-[280px] flex-col rounded-lg border-[0.5px] border-stroke bg-white shadow-default dark:border-dark-3 dark:bg-gray-dark">
          <div className="flex items-center gap-2.5 px-5 pb-5.5 pt-3.5">
            <span className="relative block h-12 w-12 rounded-full">
              <Image
                width={112}
                height={112}
                src="/images/user/user-28.png"
                alt="User"
                className="overflow-hidden rounded-full"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green dark:border-gray-dark"></span>
            </span>

            <span className="block">
              <span className="block font-medium text-dark dark:text-white">User</span>
              <span className="block font-medium text-dark-5 dark:text-dark-6">user@xyz.com</span>
            </span>
          </div>
          <ul className="flex flex-col gap-1 border-y-[0.5px] border-stroke p-2.5 dark:border-dark-3">
            <li>
              <Link
                href="/profile"
                className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
              >
                <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.99998 0.9375C7.03246 0.9375 5.43748 2.53249 5.43748 4.5C5.43748 6.46751 7.03246 8.0625 8.99998 8.0625C10.9675 8.0625 12.5625 6.46751 12.5625 4.5C12.5625 2.53249 10.9675 0.9375 8.99998 0.9375ZM6.56248 4.5C6.56248 3.15381 7.65378 2.0625 8.99998 2.0625C10.3462 2.0625 11.4375 3.15381 11.4375 4.5C11.4375 5.84619 10.3462 6.9375 8.99998 6.9375C7.65378 6.9375 6.56248 5.84619 6.56248 4.5Z"
                  />
                </svg>
                View profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogoutClick}
                className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
              >
                <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 0.9375L10.31 2.2475L6.558 6H12.75V9H6.558L10.31 12.2475L9 13.5625L2.4375 7.3125L9 0.9375Z" />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      {logoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 m-4 rounded-lg">
            <p>Are you sure you want to log out?</p>
            <div className="flex mx-8 gap-4 mt-8">
              <button onClick={cancelLogout} className="bg-gray-300 p-2 rounded">Cancel</button>
              <button onClick={confirmLogout} className="bg-black p-2 text-white rounded">Log Out</button>
            </div>
          </div>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
