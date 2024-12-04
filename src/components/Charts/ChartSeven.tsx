import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import dynamic from "next/dynamic";
import { fetchSolarProduction } from "../../../actions/api";
import { getAuth } from "../../../actions/cookie";
import { parseJwt } from "../../../actions/utils";
import SelectOption from "../SelectOption/SelectOption";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type SolarProduction = {
  timestamp: string;
  total_power: number;
};

const ChartOne: React.FC = () => {
  const [solarData, setSolarData] = useState<SolarProduction[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const optionsSolar = ["Hourly", "Weekly"];
  const [selectedOption, setSelectedOption] = useState<string>(optionsSolar[0]);


  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#5750F1", "#5750F1"],
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
      width: [2, 2], // Different widths for solid and dotted lines
      dashArray: [0, 5], // Solid line for main series, dashed line for last points
    },
    markers: {
      size: 4,
      colors: ["#5750F1"],
      strokeWidth: 2,
      shape: "circle",
      hover: {
        size: 10,
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
        show: true,
        formatter: (value) => `${value}`,
      },
      y: {
        title: {
          formatter: function (value) {
            return `${value}`;
          },
        },
      },
      marker: {
        show: false,
      },
    },
    xaxis: {
      type: "category",
      categories: categories, // Dynamic categories
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
    },
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAuth();
        const data = parseJwt(token);

        if (data && data.user) {
          const date = new Date();
          date.setMinutes(date.getMinutes() + 330); // Add 5 hours 30 minutes (330 minutes)

          const formattedDate = date
            .toISOString()
            .slice(0, 16)
            .replace("T", " ");
          console.log("date: ", formattedDate);
          const res = await fetchSolarProduction(
            data.user.email,
            '2024-12-06 12:00',
            selectedOption === "Hourly" ? "day" : "week",
          );

          console.log("res: ", res);

          // Transform data for the chart
          if (selectedOption === "Hourly") {
            const transformedData = res.map((entry: SolarProduction) => ({
              x: formatTime(entry.timestamp),
              y: entry.total_power.toFixed(1),
            }));

            setCategories(res.map((entry: SolarProduction) => formatTime(entry.timestamp)));

            // const mainSeries = transformedData.slice(0, transformedData.length); // Exclude the last 3 entries
         
          const solidSeries = transformedData.map((point:{x: string, y: number}, index: number) => ({
            x: point.x,
            y: index < transformedData.length - 3 ? point.y : null, // Null for last 3 points
          }));

          const dottedSeries = transformedData.map((point:{x: string, y: number}, index: number) => ({
            x: point.x,
            y: index >= transformedData.length - 4 ? point.y : null, // Null for others
          }));

          setSeries([
            { name: "Generated", data: solidSeries },
            { name: "Predicted", data: dottedSeries },
          ]);
          
          console.log("series: ", [
            { name: "Generated", data: solidSeries },
            { name: "Predicted", data: dottedSeries },
          ])
          setSolarData(res);
          } else {
            // Handle Weekly Data
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            
            const transformedData = res.map((entry: any) => ({
              x: new Date(entry.date).toDateString().slice(0,-5),
              y: entry.total_power.toFixed(1),
            }));

            setCategories(res.map((entry: any) => (new Date(entry.date)).toDateString().slice(0,-5)));
            const solidSeries = transformedData.map((point:{x: string, y: number}, index: number) => ({
              x: point.x,
              y: index < transformedData.length - 3 ? point.y : null, // Null for last 3 points
            }));
  
            const dottedSeries = transformedData.map((point:{x: string, y: number}, index: number) => ({
              x: point.x,
              y: index >= transformedData.length - 4 ? point.y : null, // Null for others
            }));

            console.log("categories: ", res.map((entry: any) => (new Date(entry.date)).toDateString().slice(0,-5)))
  
            setSeries([
              { name: "Generated", data: solidSeries },
              { name: "Predicted", data: dottedSeries },
            ]);

            console.log("series: ", [
              { name: "Generated", data: solidSeries },
              { name: "Predicted", data: dottedSeries },
            ])
  
            setSolarData(res);
          }
        }
      } catch (error) {
        console.log("Error fetching solar production", error);
      }
    };

    fetchData();
  }, [selectedOption]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    // Determine AM or PM
    const period = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If 0 (midnight), set to 12

    // Return formatted time
    return `${hours}${minutes === 0 ? "" : ":" + minutes} ${period}`;
  };

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Solar Energy Production Rate
          </h4>
        </div>
        <div className="flex items-center gap-2.5">
          {/* <p className="font-medium uppercase text-dark dark:text-dark-6">
            Sort by:
          </p> */}
          <SelectOption
            options={optionsSolar}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </div>
      </div>
      <div>
        <div className="-ml-4 -mr-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={310}
            width={"100%"}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 text-center xsm:flex-row xsm:gap-0">
        <div className="border-stroke dark:border-dark-3 xsm:w-1/2 xsm:border-r">
          <p className="font-medium">Current  Production</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
            {solarData[solarData.length - 4]?.total_power.toFixed(1) || 0}W
          </h4>
        </div>
        <div className="xsm:w-1/2">
          <p className="font-medium">Total Production</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
            {solarData
              .reduce((acc, curr) => acc + curr.total_power, 0)
              .toFixed(1)}
            W
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ChartOne;

