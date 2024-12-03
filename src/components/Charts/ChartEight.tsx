import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import dynamic from "next/dynamic";
import { getAuth } from "../../../actions/cookie";
import { parseJwt } from "../../../actions/utils";
import { fetchSolarYield } from "../../../actions/api";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type SolarYield = {
  day: string;
  energy_sold: number;
  energy_consumed: number;
};

const ChartTwo: React.FC = () => {
  // const series = [
  //   {
  //     name: "Direct Self Use",
  //     data: [2.4, 2.1, 1.8, 1.9, 2.2, 2.3, 1.8],
  //   },
  //   {
  //     name: "Energy Exported",
  //     data: [0.3, 0.3, 0.5, 0.4, 0.3, 0.2, 0.5],
  //   },
  // ];

  const [series, setSeries] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const options: ApexOptions = {
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 3,
              columnWidth: "25%",
            },
          },
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
    dataLabels: {
      enabled: false,
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

    xaxis: {
      categories: categories,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",

      markers: {
        radius: 99,
        width: 16,
        height: 16,
        strokeWidth: 10,
        strokeColor: "transparent",
      },
    },
    fill: {
      opacity: 1,
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
          const res = await fetchSolarYield(data.user.email, formattedDate);

          console.log("res: ", res);
          const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

          const self_use = res.map((entry: SolarYield) => ({
            x: daysOfWeek[(new Date(entry.day)).getUTCDay()],
            y: entry.energy_consumed.toFixed(1),
          }));
          const exported = res.map((entry: SolarYield)=>({
            x: daysOfWeek[(new Date(entry.day)).getUTCDay()],
            y: entry.energy_sold.toFixed(1)
          }))



          setCategories(res.map((entry: SolarYield) => daysOfWeek[(new Date(entry.day)).getUTCDay()]));

          // const mainSeries = transformedData.slice(0, transformedData.length); // Exclude the last 3 entries

    

          setSeries([
            { name: "Direct Self Use", data: self_use },
            { name: "Energy Exported", data: exported },
          ]);
        }
      } catch (error) {
        console.log("Error fetching solar production", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Energy Yield
          </h4>
        </div>
        {/* <div>
          <DefaultSelectOption options={["This Week", "Last Week"]} />
        </div> */}
      </div>

      <div>
        <div id="chartTwo" className="-ml-3.5">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={370}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
