"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChartTen from "@/components/Charts/ChartTen";
import ChartEleven from "@/components/Charts/ChartEleven";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import DataStatsThree from "@/components/DataStats/DataStatsThree";
import ChatCard2 from "@/components/Chat/ChatCard2";

export default function page() {
  return (
    <DefaultLayout>
      <div className="">
        <Breadcrumb pageName="Linked Devices" />
      </div>
      <DataStatsThree />
      <div className="flex flex-col mt-4 py-2">
        <ChartTen />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-6 2xl:gap-7.5 mt-5 py-3">
        <div className="col-span-12 lg:col-span-7">
          <ChartEleven />
        </div>
        <div className="col-span-12 lg:col-span-5">
          <ChatCard2 />
        </div>
      </div>
    </DefaultLayout>
  );
}
