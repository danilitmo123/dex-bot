import React from "react";
import {Brush, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const data = [
  {
    name: "24 Jul",
    MVDA: 4000,
    MVDALC: 2400,
    MVDAMC: 3600,
    MVDASC: 1200,
  },
  {
    name: "25 Jul",
    MVDA: 8000,
    MVDALC: 1400,
    MVDAMC: 2600,
    MVDASC: 3200,
  },
  {
    name: "26 Jul",
    MVDA: 5000,
    MVDALC: 3400,
    MVDAMC: 4600,
    MVDASC: 6200,
  },
  {
    name: "27 Jul",
    MVDA: 7000,
    MVDALC: 3400,
    MVDAMC: 7600,
    MVDASC: 5200,
  },
  {
    name: "28 Jul",
    MVDA: 4000,
    MVDALC: 2400,
    MVDAMC: 3600,
    MVDASC: 1200,
  },
  {
    name: "29 Jul",
    MVDA: 6000,
    MVDALC: 3400,
    MVDAMC: 4600,
    MVDASC: 5200,
  },
  {
    name: "30 Jul",
    MVDA: 4500,
    MVDALC: 2200,
    MVDAMC: 3100,
    MVDASC: 1900,
  }
];

export default function App() {
  return (
    <div>
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{
            top: 25,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" fill="#ffffff"/>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Legend
            verticalAlign="top"
            iconSize={12}
            height={36}
            align="left"
            iconType="plainline"
            wrapperStyle={{top: 0}}
          />
          <Line type="curveLinear" dataKey="MVDA" stroke="#5790FF" fill="#82ca9d"/>
          <Line type="curveLinear" dataKey="MVDALC" stroke="#04C35C"/>
          <Line type="curveLinear" dataKey="MVDAMC" stroke="#F3BA2F"/>
          <Line type="curveLinear" dataKey="MVDASC" stroke="#C32604"/>
          <Brush/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
