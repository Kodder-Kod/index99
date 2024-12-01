import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode, LineStyle } from 'lightweight-charts';

const MARKETS = [
  'BTCUSD', 'ETHUSD', 'XRPUSD', 'DOGEUSD', 'BCHUSD',
  'SOLUSD', 'EURUSD', 'GBPUSD', 'USDTUSD',
];

const INTERVALS = [
  { value: '1m', label: '1 Minute' },
  { value: '5m', label: '5 Minutes' },
  { value: '15m', label: '15 Minutes' },
  { value: '30m', label: '30 Minutes' },
  { value: '1h', label: '1 Hour' },
  { value: '4h', label: '4 Hours' },
  { value: '1d', label: '1 Day' },
];

const IndependentChart = ( ) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const [market, setMarket] = useState(MARKETS[0]);
  const [interval, setInterval] = useState(INTERVALS[4].value); // Default to '1d'

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
        width: 500,
        height: 300,
        layout: {
          backgroundColor: '#111827', // Chart background
          textColor: '#000000', // General text color for labels
        },
        grid: {
          vertLines: { color: '#2F3B52' },
          horzLines: { color: '#2F3B52' },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        leftPriceScale: {
          borderColor: '#2F3B52', // Border color for the Y-axis
          textColor: '#4caf50', // Specific Y-axis label color
        },
        timeScale: {
          borderColor: '#2F3B52', // Border color for the X-axis
          textColor: '#f44336', // Specific X-axis label color
        },
      });
    const candleSeries = chart.addCandlestickSeries({
      upColor: '#4caf50', downColor: '#f44336',
      wickUpColor: '#4caf50', wickDownColor: '#f44336',
    });

    const fetchData = async () => {
      const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${market.replace('USD', 'USDT')}&interval=${interval}&limit=100`);
      const data = await response.json();
      candleSeries.setData(data.map(item => ({
        time: item[0] / 1000,
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
        close: parseFloat(item[4]),
      })));
    };

    fetchData();
    chartRef.current = chart;

    return () => chart.remove();
  }, [market, interval]);

  return (
    <div className="rounded-lg shadow-lg bg-gray-900 p-4 my-6">
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {/* Market Selector */}
        <select className="bg-gray-700 text-white p-2 rounded" value={market} onChange={(e) => setMarket(e.target.value)}>
          {MARKETS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        {/* Interval Selector */}
        <select className="bg-gray-700 text-white p-2 rounded" value={interval} onChange={(e) => setInterval(e.target.value)}>
          {INTERVALS.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
        </select>
      </div>
      {/* Chart Container */}
      <div ref={chartContainerRef} className="h-96 w-full"></div>
    </div>
  );
};

const TestUIUX = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-center text-3xl font-bold text-blue-400 mb-8">Crypto and Forex Chart</h1>
      {/* Render One Chart */}
      <IndependentChart containerId="single-chart" />
    </div>
  );
}

export default TestUIUX;
