"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChartSeven from "@/components/Charts/ChartSeven";
import ChartEight from "@/components/Charts/ChartEight";
import DataStatsTwo from "@/components/DataStats/DataStatsTwo";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export default function page() {
  return (
    <DefaultLayout>
      <div className="">
        <Breadcrumb pageName="Solar Tracking" />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <DataStatsTwo />
        <div className="col-span-9 col-start-1 row-start-1   row-span-1">
          <ChartSeven />
        </div>
        <div  className="col-span-9 col-start-1 row-start-2 ">
          <ChartEight />
        </div>
      </div>
    </DefaultLayout>
  );
}
