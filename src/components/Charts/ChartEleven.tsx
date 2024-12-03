import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { fetchConsumption } from "../../../actions/api";
import { getAuth } from "../../../actions/cookie";
import { parseJwt } from "../../../actions/utils";

const ChartNine: React.FC = () => {
  const [series, setSeries] = useState([
    { name: "Submeter 1", data: [] as number[] },
    { name: "Submeter 2", data: [] as number[] },
    { name: "Submeter 3", data: [] as number[] },
  ]);

  const [categories, setCategories] = useState<string[]>([]); 

  const options: ApexOptions = {
    colors: ["#5750F1", "#0ABEF9", "#C5A7FF"],
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
      },
    },
    dataLabels: { enabled: false },
    grid: {
      strokeDashArray: 5,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    xaxis: {
      categories: categories, 
    },
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
          const timestamp = '2024-12-06'; 

          const tariffData = await fetchConsumption(email, timestamp);
          // console.log("Tariff API Response:", tariffData);

          if (tariffData) {
            const last7DaysData = tariffData.grid_consumption.slice(-7);
            const days = last7DaysData.map((item: any) => item.day_name.slice(0, 3)); 

            setCategories(days);

            const submeter1Data = last7DaysData.map((item: any) => item.submeter_1 || 0);
            const submeter2Data = last7DaysData.map((item: any) => item.submeter_2 || 0);
            const submeter3Data = last7DaysData.map((item: any) => item.submeter_3 || 0);

            // console.log("Submeter 1 Data:", submeter1Data);
            // console.log("Submeter 2 Data:", submeter2Data);
            // console.log("Submeter 3 Data:", submeter3Data);

            setSeries([
              { name: "Submeter 1", data: submeter1Data },
              { name: "Submeter 2", data: submeter2Data },
              { name: "Submeter 3", data: submeter3Data },
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
            Linked Devices Consumption
          </h4>
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
