import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import { getAuth } from "../../../actions/cookie";
import { parseJwt } from "../../../actions/utils";
import { fetchConsumptionPrediction } from "../../../actions/api";

const ChartTen: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [forecastRates, setForecastRates] = useState<number[]>([]);
  const [currConsumptionRate, setCurrConsumptionRate] = useState<number | null>(null);
  const [forcastedConsumptionRate, setForecastedConsumptionRate] = useState<number | null>(null);
  const [series, setSeries] = useState([
    { name: "Current Rate", data: [] },
    { name: "Forecasted Rate", data: [] },
  ]);

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
    },
    colors: ["#5750F1", "#0ABEF9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 410,
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
      size: 4, 
      colors: ["#5750F1", "#0ABEF9"], 
      // strokeColor: "#fff", 
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
        enabled: !1,
      },
      x: {
        show: !1,
      },
      y: {
        title: {
          formatter: function (e) {
            return "";
          },
        },
      },
      marker: {
        show: !1,
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
          return value !== null && value !== undefined ? value.toFixed(0) + "W" : "-";
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
          const email = "abcd@gmail.com";
          const nowUTC = new Date();
          const istOffset = 5.5 * 60 * 60 * 1000;
          const nowIST = new Date(nowUTC.getTime() + istOffset);
  
          const hours = nowIST.getHours();
          let roundedHour = hours;
          if (nowIST.getMinutes() >= 30) {
            roundedHour += 1;
          }
          if (roundedHour === 24) {
            roundedHour = 0;
          }
          nowIST.setHours(roundedHour, 0, 0, 0);
  
          const timestampUTC = new Date(nowIST.getTime() - istOffset);
          const timestamp = timestampUTC.toISOString();
  
          const cData = await fetchConsumptionPrediction(email, timestamp);
          console.log("data: ", cData)
          if (cData) {
            const forecastTariff = cData.forecast_consumption || [];
            const actualTariff = cData.actual_consumption || []; 
  
            if (actualTariff.length === 0) {
              // console.error("No actual tariff data available.");
              return; 
            }
  
            const formattedHours = forecastTariff.map((item: any) => {
              const hourString = item.datetime.substring(11, 13);
              const hour = parseInt(hourString, 10);
              const period = hour >= 12 ? "PM" : "AM";
              const formattedHour = hour % 12 || 12;
              return `${formattedHour} ${period}`;
            });
            setCategories(formattedHours);
            const lastActualTariff = actualTariff[actualTariff.length - 1];
            const { timestamp: lastTimestamp, total_power: lastActualRate } =
              lastActualTariff || { timestamp: null, total_power: null };
  
            if (lastActualRate !== null) {
              setCurrConsumptionRate(Number((lastActualRate).toFixed(2)));
            }
            const matchingForecast = forecastTariff.find(
              (item: any) => item.datetime === lastTimestamp
            );
            const matchingForecastRate = matchingForecast
              ? matchingForecast.forecast_consumption
              : null;
            setForecastedConsumptionRate(
              matchingForecastRate ? Number((matchingForecastRate).toFixed(2)) : null
            );
  
            const forecastRates = forecastTariff.map(
              (item: any) => parseFloat(item.forecast_consumption.toFixed(4))
            );
  
            const forecastHourToIndex: { [key: string]: number } = {};
            formattedHours.forEach((hour: string, index: number) => {
              forecastHourToIndex[hour] = index;
            });
  
            const actualRates = new Array(formattedHours.length).fill(null);
            actualTariff.forEach((item: any) => {
              const hourString = item.timestamp.substring(11, 13);
              const hour = parseInt(hourString, 10);
              const period = hour >= 12 ? "PM" : "AM";
              const formattedHour = hour % 12 || 12;
              const formattedTime = `${formattedHour} ${period}`;
  
              const index = forecastHourToIndex[formattedTime];
              if (index !== undefined) {
                actualRates[index] = parseFloat(item.total_power.toFixed(4)); 
              }
            });
  
            setSeries([
              { name: "Current Rate", data: actualRates },
              { name: "Forecasted Rate", data: forecastRates },
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
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Hourly Consumption Analytics
          </h4>
        </div>
        <div className="flex items-center gap-2.5">
          <p className="font-medium uppercase text-dark dark:text-dark-6">
            Sort by:
          </p>
          <DefaultSelectOption options={["Hourly",]} />
        </div>
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

      <div className="flex flex-col gap-4 text-center xsm:flex-row xsm:gap-0">
        <div className="border-stroke dark:border-dark-3 xsm:w-1/2 xsm:border-r">
          <p className="font-medium">Actual Consumption Rate</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
            {currConsumptionRate} W/hr
          </h4>
        </div>
        <div className="xsm:w-1/2">
          <p className="font-medium">Predicted Consumption Rate</p>
          <h4 className="mt-1 text-xl font-bold text-dark dark:text-white">
           {forcastedConsumptionRate}W/hr
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ChartTen;
