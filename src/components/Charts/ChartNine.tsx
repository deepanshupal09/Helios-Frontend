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

  const [categories, setCategories] = useState<string[]>([]); 
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
    xaxis: { categories: categories }, 
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

  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAuth();
        const data = parseJwt(token);

        if (data && data.user) {
          setUser(data.user);

          const email = "abcd@gmail.com"; 
          const nowUTC = new Date();
          const istOffset = 5.5 * 60 * 60 * 1000;
          const nowIST = new Date(nowUTC.getTime() + istOffset);
          const timestamp = "2024-12-06"; 

          const tariffData = await fetchConsumption(email, timestamp);
          if (tariffData) {
            const last7DaysData = tariffData.grid_consumption.slice(-7);

            const gridData = last7DaysData.map((item: any) => (item.total_power || 0) / 1000);
            const solarData = tariffData.solar_consumption.slice(-7).map((item: any) => (item.total_power || 0) / 1000);
            
            const days = last7DaysData.map((item: any) => item.day_name.slice(0, 3)); 
            setCategories(days);
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
            Total Consumption
          </h4>
        </div>
        <div>
          <DefaultSelectOption options={["This Week"]} />
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
