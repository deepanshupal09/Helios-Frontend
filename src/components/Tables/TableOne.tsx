import { BRAND2 } from "@/types/brand";
import Image from "next/image";

const brandData: BRAND2[] = [
  {
    logo: "/images/brand/brand-01.png",
    name: "BSES",
    visitors: 3.5,
    revenues: "5.768",
    sales: 5.90,
  },
  {
    logo: "/images/brand/brand-02.png",
    name: "Tata Power",
    visitors: 2.2,
    revenues: "4.635",
    sales: 4.67,
  },
  {
    logo: "/images/brand/brand-03.png",
    name: "Adani Power",
    visitors: 2.1,
    revenues: "4.290",
    sales: 4.20,
  },
  {
    logo: "/images/brand/brand-04.png",
    name: "NTPC",
    visitors: 1.5,
    revenues: "3.580",
    sales: 3.89,
  },
];

const TableOne = () => {
  return (
    <div className="rounded-[10px]   bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h4 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Top Providers
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 sm:grid-cols-4">
          <div className="px-2 pb-3.5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Provider
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Users
            </h5>
          </div>
          <div className="px-2 pb-3.5 text-center">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Tarrif Rate
            </h5>
          </div>
          <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Avg. Tarrif Rate
            </h5>
          </div>
          {/* <div className="hidden px-2 pb-3.5 text-center sm:block">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Downtime
            </h5>
          </div> */}
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-dark-3"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3.5 px-2 py-8">
              <div className="flex-shrink-0">
                <Image src={brand.logo} alt="Brand" width={48} height={48} />
              </div>
              <p className="hidden font-medium text-dark dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-dark dark:text-white">
                {brand.visitors}K
              </p>
            </div>

            <div className="flex items-center justify-center px-2 py-4">
              <p className="font-medium text-green-light-1">
              ₹{brand.revenues}
              </p>
            </div>

            <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark dark:text-white">
                {brand.sales}
              </p>
            </div>

            {/* <div className="hidden items-center justify-center px-2 py-4 sm:flex">
              <p className="font-medium text-dark dark:text-white">
                {brand.conversion}%
              </p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
