import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';

const MARKETS = [
  { id: 'BTCUSD', title: 'BTC/USD', market: 'BTCUSDT' },
  { id: 'ETHUSD', title: 'ETH/USD', market: 'ETHUSDT' },
  { id: 'XRPUSD', title: 'XRP/USD', market: 'XRPUSDT' },
  { id: 'DOGEUSD', title: 'DOGE/USD', market: 'DOGEUSDT' },
  { id: 'BCHUSD', title: 'BCH/USD', market: 'BCHUSDT' },
  { id: 'SOLUSD', title: 'SOL/USD', market: 'SOLUSDT' },
  { id: 'EURUSD', title: 'EUR/USD', market: 'EURUSDT' },
  { id: 'GBPUSD', title: 'GBP/USD', market: 'GBPUSDT' },
  { id: 'USDTUSD', title: 'USDT/USD', market: 'USDTUSD' },
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

const IndependentChart = ({ market, title, interval, setInterval }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: 500,
      height: 300,
      layout: {
        backgroundColor: '#111827',
        textColor: '#000000',
      },
      grid: {
        vertLines: { color: '#2F3B52' },
        horzLines: { color: '#2F3B52' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      leftPriceScale: {
        borderColor: '#2F3B52',
      },
      timeScale: {
        borderColor: '#2F3B52',
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#4caf50',
      downColor: '#f44336',
      wickUpColor: '#4caf50',
      wickDownColor: '#f44336',
    });

    const fetchData = async () => {
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=${market}&interval=${interval}&limit=100`
      );
      const data = await response.json();
      candleSeries.setData(
        data.map((item) => ({
          time: item[0] / 1000,
          open: parseFloat(item[1]),
          high: parseFloat(item[2]),
          low: parseFloat(item[3]),
          close: parseFloat(item[4]),
        }))
      );
    };

    fetchData();

    return () => chart.remove();
  }, [market, interval]);

  return (
    <div className="rounded-lg shadow-lg bg-gray-900 p-4 my-6">
      <h2 className="text-center text-xl font-bold text-blue-400 mb-4">{title}</h2>
      <div ref={chartContainerRef} className="h-96 w-full"></div>
    </div>
  );
};

const TestUIUX = () => {
  const [interval, setInterval] = useState('1d'); // Default interval

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-center text-3xl font-bold text-blue-400 mb-8">Crypto Charts</h1>
      <div className="flex justify-center gap-4 mb-4">
        {/* Interval Selector */}
        <select
          className="bg-gray-700 text-white p-2 rounded"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
        >
          {INTERVALS.map((i) => (
            <option key={i.value} value={i.value}>{i.label}</option>
          ))}
        </select>
      </div>
      {/* Render All Charts */}
      {MARKETS.map((chart) => (
        <IndependentChart
          key={chart.id}
          market={chart.market}
          title={chart.title}
          interval={interval}
          setInterval={setInterval}
        />
      ))}
    </div>
  );
};

export default TestUIUX;
