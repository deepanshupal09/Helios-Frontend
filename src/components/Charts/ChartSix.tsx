import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import { fetchSolarOverview } from "../../../actions/api";
import { getAuth } from "../../../actions/cookie"; 
import { parseJwt } from "../../../actions/utils"; 

interface SolarData {
  date: string; 
  total_power: number;
}

const ChartOne: React.FC = () => {
  const [series, setSeries] = useState([
    { name: "Solar Production", data: [] as number[] },
    { name: "Solar Consumption", data: [] as number[] },
  ]);

  const [categories, setCategories] = useState<string[]>([]); 
  const [user, setUser] = useState<UserType | null>(null);
  const [averageProduction, setAverageProduction] = useState<number | null>(null);
  const [averageConsumption, setAverageConsumption] = useState<number | null>(null);

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
    },
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    fill: {
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 320,
          },
        },
      },
    ],
    stroke: {
      curve: "smooth",
    },
    markers: {
      size: 3, 
      colors: ["#5750F1", "#0ABEF9"], 
      // strokeColor: "#fff", 
      strokeWidth: 2, 
      shape: "circle", 
      hover: {
        size: 5, 
      },
    },
    grid: {
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
      marker: {
        show: true,
      },
    },
    xaxis: {
      type: "category",
      categories: categories, 
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      labels: {
        formatter: function (value) {
          return value.toFixed(0)+"W"; 
        },
      },
    },
  };

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
          const timestamp = '2024-12-06';
    
          const tariffData = await fetchSolarOverview(email, timestamp);
          console.log("solar API Response:", tariffData);
    
          if (tariffData) {
            const { solar_consumption, solar_production } = tariffData;
    
            const formattedDates = solar_production.map((entry: SolarData) => {
              const date = new Date(entry.date);
              return `${date.getDate()} ${date.toLocaleString("en-US", { month: "short" })}`;
            });
            const productionData = solar_production.map((entry: SolarData) => entry.total_power);
            const consumptionData = solar_consumption.map((entry: SolarData) => entry.total_power);
            
            const avgProduction = (productionData.reduce((acc: number, val: number) => acc + val, 0) / productionData.length).toFixed(2);
            const avgConsumption = (consumptionData.reduce((acc: number, val: number) => acc + val, 0) / consumptionData.length).toFixed(2);

            setSeries([
              { name: "Solar Production", data: productionData },
              { name: "Solar Consumption", data: consumptionData },
            ]);
            setAverageProduction(parseFloat(avgProduction));
            setAverageConsumption(parseFloat(avgConsumption));
            setCategories(formattedDates); 
          }
        }
      } catch (error) {
        console.error("Error fetching tariff data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Solar Energy Overview
          </h4>
        </div>
        {/* <div className="flex items-center gap-2.5">
          <p className="font-medium uppercase text-dark dark:text-dark-6">
            Sort by:
          </p>
          <DefaultSelectOption options={["", "Yearly"]} />
        </div> */}
      </div>
      <div>
        <div className="-ml-4 -mr-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={310}
          />
        </div>
      </div>

      <div className="flex flex-col mt-10 gap-2 text-center xsm:flex-row xsm:gap-0">
        <div className="border-stroke dark:border-dark-3 xsm:w-1/2 xsm:border-r">
          <p className="font-medium">Average Solar Energy Produced</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
          {/* ₹4,507.00 */}
          {averageProduction} W
          </h4>
        </div>
        <div className="xsm:w-1/2">
          <p className="font-medium">Average Solar Energy Consumed</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
          {/* ₹3,240.00 */}
          {averageConsumption} W
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
