import Link from "next/link";
import Image from "next/image";
import { Chat2 } from "@/types/chat";

const chatData: Chat2[] = [
  {
    active: true,
    avatar: "/images/user/fz.png",
    name: "Refrigerator",
    textCount: "202 W",
    dot: 1,
    valu: null,
    meterType: "SubMeter 3",
  },
  {
    active: true,
    avatar: "/images/user/ac2.png",
    name: "Air Conditioner",
    textCount: "1050 W",
    dot: 1,
    valu: "max",
    meterType: "SubMeter 3",
  },
  {
    active: null,
    avatar: "/images/user/wm.png",
    name: "Washing Machine",
    textCount: "210 W",
    dot: 1,
    valu: null,
    meterType: "SubMeter 2",
  },
  {
    active: false,
    avatar: "/images/user/dw2.png",
    name: "Dish Washer",
    textCount: "180 W",
    dot: 3,
    valu: "min",
    meterType: "SubMeter 1",
  },
  {
    active: false,
    avatar: "/images/user/ov.png",
    name: "Oven",
    textCount: "368 W",
    dot: 1,
    valu: null,
    meterType: "SubMeter 1",
  },
];

const ChatCard = () => {
  return (
    <div className="col-span-12 rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
      <h4 className="mb-5.5 px-7.5 text-body-2xlg font-bold text-dark dark:text-white">
        Savings
      </h4>

      <div>
        {chatData.map((chat, key) => (
          <Link
            href="/"
            className="flex items-center gap-4.5 px-7.5 py-3 hover:bg-gray-1 dark:hover:bg-dark-2"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              <Image
                width={56}
                height={56}
                src={chat.avatar}
                alt="User"
                style={{
                  width: "auto",
                  height: "auto",
                }}
              />
              <span
                className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-dark-2 ${
                  chat.active === true
                    ? "bg-green"
                    : chat.active === false
                    ? "bg-red-light"
                    : "bg-orange-light"
                }`}
              ></span>
            </div>
            <div className="flex flex-1 flex-col">
              <h5 className="font-medium text-dark dark:text-white">
                {chat.name}
              </h5>
              {/* <p className="text-sm text-dark-3 dark:text-dark-6">
                {chat.text} <span className="text-xs">· {chat.time}</span>
              </p> */}

              {/* Tags */}
              <div className="mt-1 flex items-center gap-2">
                {chat.valu && (
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                      chat.valu === "max"
                        ? "bg-green-100 text-green-700"
                        : chat.valu === "min"
                        ? "bg-red-100 text-red-700"
                        : ""
                    }`}
                  >
                    {chat.valu === "max" ? "High" : "Low"}
                  </span>
                )}
                {chat.meterType && (
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                      chat.meterType === "SubMeter 1"
                        ? "bg-blue-100 text-blue-700"
                        : chat.meterType === "SubMeter 2"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {chat.meterType}
                  </span>
                )}
              </div>
            </div>
            {chat.textCount && (
              <div className="flex items-center justify-center rounded-full bg-primary px-2 py-0.5">
                <span className="text-sm font-medium text-white">
                  {chat.textCount}
                </span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatCard;
