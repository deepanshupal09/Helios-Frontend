import { ApexOptions } from "apexcharts";
import React, { useEffect, useState , useMemo} from "react";
import ReactApexChart from "react-apexcharts";
import DefaultSelectOption from "@/components/SelectOption/DefaultSelectOption";
import { getAuth } from "../../../actions/cookie";
import { parseJwt } from "../../../actions/utils";
import { fetchLinkedDeviceInfo } from "../../../actions/api";

const ChartThree: React.FC = () => {
  const [series, setSeries] = useState<number[]>([0, 0, 0]);
  const [totalConsumption, setTotalConsumption] = useState<number>(0);
  const [subOne, setSubOne] = useState<number | null>(null);
  const [subTwo, setSubTwo] = useState<number | null>(null);
  const [subThree, setSubThree] = useState<number | null>(null);

  const options: ApexOptions = useMemo(() => ({
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: ["#8099EC", "#5475E5", "#ADBCF2"],
    labels: ["SubMeter - 1", "SubMeter - 2", "SubMeter - 3"],
    legend: {
      show: false,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          background: "transparent",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Total Consumption",
              fontSize: "16px",
              fontWeight: "400",
              formatter: () => `${totalConsumption} kW`, // Dynamic value
            },
            value: {
              show: true,
              fontSize: "28px",
              fontWeight: "bold",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 415,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  }), [totalConsumption]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getAuth();
        const data = parseJwt(token);

        if (data && data.user) {
          const email = "abcd@gmail.com"; 
          const timestamp = "2024-12-05"; 
          const linkedData = await fetchLinkedDeviceInfo(email, timestamp);

          if (linkedData && linkedData.length > 0) {
            const subMeter1 = linkedData[0].total_submeter_1 / 1000;
            const subMeter2 = linkedData[0].total_submeter_2 / 1000;
            const subMeter3 = linkedData[0].total_submeter_3 / 1000;

            const subMeter1Rounded = parseFloat(subMeter1.toFixed(2));
            setSubOne(subMeter1Rounded);
            const subMeter2Rounded = parseFloat(subMeter2.toFixed(2));
            setSubTwo(subMeter2Rounded);
            const subMeter3Rounded = parseFloat(subMeter3.toFixed(2));
            setSubThree(subMeter3Rounded);

            setSeries([subMeter1Rounded, subMeter2Rounded, subMeter3Rounded]);
            setTotalConsumption(
              parseFloat((subMeter1Rounded + subMeter2Rounded + subMeter3Rounded).toFixed(2))
            );
          }
        }
      } catch (error) {
        console.error("Error fetching linked device data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      
      <div className="mb-9 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Linked Devices
          </h4>
        </div>
        <div>
          <DefaultSelectOption options={["Daily"]} />
        </div>
      </div>
      <ReactApexChart
        key={`${series}-${totalConsumption}`} 
        options={options}
        series={series}
        type="donut"
        className="mx-auto mb-4 flex justify-center"
      />
  
      <div className="mx-auto w-full max-w-[350px]">
        <div className="-mx-7.5 flex flex-wrap items-center justify-center gap-y-2.5">
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-blue"></span>
              <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                <span> SubMeter-1 </span>
                {subOne}
              </p>
            </div>
          </div>
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-blue-light"></span>
              <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                <span> SubMeter-2 </span>
                {subTwo}
              </p>
            </div>
          </div>
          <div className="w-full px-7.5 sm:w-1/2">
            <div className="flex w-full items-center">
              <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-blue-light-2"></span>
              <p className="flex w-full justify-between text-body-sm font-medium text-dark dark:text-dark-6">
                <span> SubMeter-3 </span>
                {subThree}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default ChartThree;
