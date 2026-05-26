import React from "react";
import styles from "./HourlyForecast.module.scss";
// import { Container } from "../Container/Container";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const HourlyForecast = ({ data }) => {
  return (
    <div className={styles['hourly-forecast']}>
        <div className={styles['hourly-forecast__container']}>
          
          <h3 className={styles['hourly-forecast__title']}>Hourly forecast</h3>
          
          <div className={styles['hourly-forecast__chart-wrapper']}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid/>
                
                <XAxis 
                  dataKey="time" 
                  orientation="top" 
                  tick={{ fontSize: 12, fill: "#333" }}
                  axisLine={false}
                  tickLine={false}
                  padding={{ left: 50, right: 10 }}
                />
                
                <YAxis 
                  tick={{ fontSize: 12, fill: "#333" }}
                  axisLine={false}
                  tickLine={false}
                  ticks={[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30]} 
                  domain={[0, 'auto']}
                  unit="°C"
                />
                
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                />
                
                <Line
                  type="monotone" 
                  dataKey="temp"
                  stroke="#ffad72"
                  strokeWidth={4}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
    </div>
  );
};

export default HourlyForecast;