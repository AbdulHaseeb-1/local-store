import React from "react";
import MyResponsiveLine from "../Charts/Line";

export default function Card({
  icon,
  title,
  count,
  data
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
  data: object
}) {
  return (
    <div className="border relative h-52 w-full rounded-md shadow-md bg-slate-50 dark:bg-neutral-900">
      <div className="p-3 grid grid-cols-2">
        <span className="text-lg font-bold text-neutral-500">{title}</span>
        <div className="row-span-2 flex justify-end opacity-35 ">{icon}</div>
        <span className="text-3xl font-bold">{count}</span>
        <span className="text-md flex col-span-2">
          <p className="text-md text-green-500">7.5%+</p>
          Got this month
        </span>
      </div>
      <div className="rounded-md  ">
        <MyResponsiveLine
          className={"aspect-[2/1] h-[94.5px] w-full "}
          properties={{
            margin: { top: 0 },
            enablePoints: false,
            useMesh: true,
            data: data
          }}
        />
      </div>
    </div>
  );
}