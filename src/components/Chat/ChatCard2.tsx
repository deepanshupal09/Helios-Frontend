import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Chat2 } from "@/types/chat";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

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
  const [globalToggle, setGlobalToggle] = useState("Manual");
  const [childToggles, setChildToggles] = useState(chatData.map(() => "Manual"));
  const [disableChildButtons, setDisableChildButtons] = useState(false);
  const [childWithTime, setChildWithTime] = useState(chatData.map(() => false));
  
  const [showGlobalModal, setShowGlobalModal] = useState(false);
  const [showChildModal, setShowChildModal] = useState<{ index: number; visible: boolean }>({
    index: -1,
    visible: false,
  });

  const [globalDuration, setGlobalDuration] = useState("");
  const [childDuration, setChildDuration] = useState("");

  const handleGlobalDurationSet = () => {
    if (!isNaN(Number(globalDuration)) && Number(globalDuration) > 0) {
      const durationInMs = Number(globalDuration) * 60000;
      setGlobalToggle("Auto");
      setDisableChildButtons(true);
      setChildToggles(chatData.map(() => "Auto"));
      setTimeout(() => {
        setGlobalToggle("Manual");
        setChildToggles(chatData.map(() => "Manual"));
        setDisableChildButtons(false);
      }, durationInMs);
      setShowGlobalModal(false);
    } else {
      alert("Please enter a valid number!");
    }
  };

  const handleChildDurationSet = () => {
    if (!isNaN(Number(childDuration)) && Number(childDuration) > 0) {
      const newChildWithTime = [...childWithTime];
      newChildWithTime[showChildModal.index] = true;
      setChildWithTime(newChildWithTime);
      setShowChildModal({ index: -1, visible: false });
    } else {
      alert("Please enter a valid number!");
    }
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
      <div className="flex items-center justify-between px-7.5 mb-5.5">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Smart Scheduling
        </h4>
        <button
          className={`rounded-full px-3 py-1 border text-sm font-medium ${
            globalToggle === "Manual"
              ? "bg-green-800 text-white"
              : "bg-red-800 text-white"
          }`}
          onClick={() => setShowGlobalModal(true)}
        >
          {globalToggle}
        </button>
      </div>

      <div>
        {chatData.map((chat, index) => (
          <Link
            href="/"
            className="flex items-center gap-4.5 px-7.5 py-3 hover:bg-gray-1 dark:hover:bg-dark-2"
            key={index}
          >
            <button
              className={`rounded-full px-2 py-0.5 border text-xs font-medium ${
                childToggles[index] === "Manual"
                  ? childWithTime[index]
                    ? "bg-orange-400 text-white"
                    : "bg-green-800 text-white"
                  : "bg-red-800 text-white"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setShowChildModal({ index, visible: true });
              }}
              disabled={disableChildButtons}
            >
              {childToggles[index]} {childWithTime[index] && "(Timed)"}
            </button>

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
              <div className="mt-1 flex items-center gap-2">
                {chat.valu && (
                  <span
                    className={`rounded-md px-2 py-0.5 text-xs font-medium ${
                      chat.valu === "max"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
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
      {/* Global Duration Modal */}

      <Dialog
        open={showGlobalModal}
        onClose={() => setShowGlobalModal(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel className="max-w-lg gap-2 rounded-lg border-[0.5px]  border-stroke bg-white px-6 pb-5.5  pt-5.5 shadow-default dark:border-dark-3 dark:bg-gray-dark ">
            <DialogTitle className="text-xl font-bold text-dark dark:text-white">
              Autoschedule{" "}
            </DialogTitle>
            <Description className="mb-7  mt-2 font-medium text-dark-5">
              Enter duration (in mins)
            </Description>

            <div className="">
              <div className="relative mb-6">
                <input
                  type="energy"
                  placeholder={`25`}
                  name="email"
                  value={globalDuration}
                  onChange={(e) => setGlobalDuration(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-light hover:bg-primary-dark w-full rounded-lg  dark:bg-dark py-3 font-medium bg-gray-2 dark:text-white focus:outline-none"
                  onClick={() => {
                    setShowGlobalModal(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="hover:bg-primary-dark w-full rounded-lg bg-primary py-3 font-medium text-white focus:outline-none"
                  onClick={handleGlobalDurationSet}
                >
                  Okay
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

<Dialog
        open={showChildModal.visible}
        onClose={() => setShowChildModal({ index: -1, visible: false })}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel className="max-w-lg gap-2 rounded-lg border-[0.5px]  border-stroke bg-white px-6 pb-5.5  pt-5.5 shadow-default dark:border-dark-3 dark:bg-gray-dark ">
            <DialogTitle className="text-xl font-bold text-dark dark:text-white">
              Autoschedule{" "}
            </DialogTitle>
            <Description className="mb-7  mt-2 font-medium text-dark-5">
              Enter duration (in mins)
            </Description>

            <div className="">
              <div className="relative mb-6">
                <input
                  type="energy"
                  placeholder={`25`}
                  name="email"
                  value={childDuration}
                  onChange={(e) => setChildDuration(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-[15px] pl-6 pr-11 font-medium text-dark outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-light hover:bg-primary-dark w-full rounded-lg  dark:bg-dark py-3 font-medium bg-gray-2 dark:text-white focus:outline-none"
                  onClick={() => {
                    setShowChildModal({ index: -1, visible: false });
                  }}
                >
                  Cancel
                </button>
                <button
                  className="hover:bg-primary-dark w-full rounded-lg bg-primary py-3 font-medium text-white focus:outline-none"
                  onClick={handleChildDurationSet}
                >
                  Okay
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default ChatCard;