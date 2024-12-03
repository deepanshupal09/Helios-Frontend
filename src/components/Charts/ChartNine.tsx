import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import { fetchConsumption } from "../../../actions/api";
import { getAuth } from "../../../actions/cookie"; 
import { parseJwt } from "../../../actions/utils"; 

const ChartNine: React.FC = () => {
  const [series, setSeries] = useState([
    { name: "Grid", data: [] as number[] },
    { name: "Solar", data: [] as number[] },
  ]);

  const options: ApexOptions = {
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: { bar: { borderRadius: 3, columnWidth: "25%" } },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 3,
        columnWidth: "25%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: { enabled: false },
    grid: {
      strokeDashArray: 5,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri","Sat","Sun"] },
    yaxis: {
      labels: {
        formatter: (value) => Math.round(value).toString(), 
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",
      markers: { radius: 99, width: 16, height: 16, strokeWidth: 10, strokeColor: "transparent" },
    },
    fill: { opacity: 1 },
  };
  
  const [user, setUser]  = useState<UserType | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAuth();
        // console.log("Token:", token);

        const data = parseJwt(token);
        // console.log("Decoded Token Data:", data);

        if (data && data.user) {
          setUser(data.user);

          const email = "abcd@gmail.com";
          // const email = data.user.email;
          const nowUTC = new Date();
          const istOffset = 5.5 * 60 * 60 * 1000; 
          const nowIST = new Date(nowUTC.getTime() + istOffset);
          // const timestamp = nowIST.toISOString().split('T')[0];
          const timestamp = '2024-12-04';
          // console.log("Fetching tariff for:", { email, timestamp });

          const tariffData = await fetchConsumption(email, timestamp);
          // console.log("Tariff API Response:", tariffData);
          if (tariffData) {
            const gridData = tariffData.grid_consumption.map(
              (item: any) => (item.total_power || 0) / 1000 
            );
            const solarData = tariffData.solar_consumption.map(
              (item: any) => (item.total_power || 0) / 1000 
            );

            setSeries([
              { name: "Grid", data: gridData },
              { name: "Solar", data: solarData },
            ]);
          }
        }
      } catch (error) {
        console.error("Error fetching tariff data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Linked Device Consumption
          </h4>
        </div>
        <div>
          <DefaultSelectOption options={["This Week", "Last Week"]} />
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-3.5">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={430}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartNine;
