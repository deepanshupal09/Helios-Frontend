"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";
import ChartSix from "@/components/Charts/ChartSix";

const ECommerce: React.FC = () => {
  return (
    <>
      <DataStatsOne />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <div className="col-span-12">
          <ChartOne />
        </div>
        {/* <ChartTwo /> */}
        <ChartThree />
        <ChartSix />
        <div className="col-span-12 ">
          <TableOne />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
