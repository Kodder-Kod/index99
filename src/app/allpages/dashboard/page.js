"use client"


import React, { useEffect, useRef, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import Navi from "@/app/components/nav/page";
import Footer from "@/app/components/footer/page";




const MARKETSbig = [
    {
        id: 'BTCUSD',
        title: 'BTC/USD',
        market: 'BTCUSDT',
        alt: "Final Cut Pro 11",
        date: "Bitcoin",
    },

];


const MARKETSmedium = [

    {
        id: 'ETHUSD',
        title: 'ETH/USD',
        market: 'ETHUSDT',
        alt: "Final Cut Pro 11",
        date: "Etherium",
    },
    {
        id: 'XRPUSD',
        title: 'XRP/USD',
        market: 'XRPUSDT',
        alt: "Apple Arcade Games",
        date: "XRP",
    },
    {
        id: 'DOGEUSD',
        title: 'DOGE/USD',
        market: 'DOGEUSDT',
        alt: "Final Cut Pro 11",
        date: "DOGE Coin",
    },
    {
        id: 'BCHUSD',
        title: 'BCH/USD',
        market: 'BCHUSDT',
        alt: "Apple Arcade Games",
        date: "Bitcoin Cash",
    },

];


const MARKETSsmall = [

    {
        id: 'SOLUSD',
        title: 'SOL/USD',
        market: 'SOLUSDT',
        alt: "Apple Arcade Games",
        date: "Solona",
    },
    {
        id: 'EURUSD',
        title: 'EUR/USD',
        market: 'EURUSDT',
        alt: "Apple Arcade Games",
        date: "Euro",
    },
    {
        id: 'GBPUSD',
        title: 'GBP/USD',
        market: 'GBPUSDT',
        alt: "Apple Arcade Games",
        date: "British Pound",
    }
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
            width: chartContainerRef.current.Width,
            height: chartContainerRef.current.Height,
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
        <div className=" shadow-lg p-4 my-6 " style={{ borderRadius: 20, backgroundColor: '#303133' }}>
            <h2 className="text-center text-xl font-bold  mb-4" style={{ color: '#d6d7d7' }}>{title}</h2>
            <div ref={chartContainerRef} className=" h-96 flex justify-center align-center"></div>
        </div>
    );
};


const Dashboard = () => {

    const [interval, setInterval] = useState('1d'); // Default interval


    const [isScrolled, setIsScrolled] = useState(false);

    // Add an event listener to check the scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) { // Adjust the scroll threshold as needed
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>

            <div className="bg-newsroomGray min-h-screen">

                <Navi />

                {/* Main Content */}
                <main className="max-w-5xl mx-auto p-6" >
                    {/* Section Title */}
                    <h1 className="text-3xl font-bold my-6 py-1" style={{ color: '#1d1d1f', }}>Latest Stats</h1>

                    {/* Grid Layout */}

                    <select
                        className="bg-gray-700 text-white py-2 px-3 "
                        style={{ borderRadius: 15 }}
                        value={interval}
                        onChange={(e) => setInterval(e.target.value)}
                    >
                        {INTERVALS.map((i) => (
                            <option key={i.value} value={i.value}>{i.label}</option>
                        ))}
                    </select>
                    <div className="grid grid-cols-1 md:grid-cols-3 pt-1 ">
                        {/* Featured News */}


                        {MARKETSbig.map((content, index) => (
                        <div key={index} className="col-span-4 bg-black text-white overflow-hidden md:flex" style={{ borderRadius: 30, backgroundColor: "#fffefe" }}>   
                        {/* Container to set chart width */}
                        <div className="flex-3/4 md:w-3/4 bg-white shadow-md overflow-hidden" >
                            <IndependentChart
                                key={content.id}
                                market={content.market}
                                title={content.title}
                                interval={interval}
                                setInterval={setInterval}
                            />
                        </div>
                    
                        {/* Container for text content taking up 1/4 */}
                        <div className="p-6 flex flex-col justify-center flex-1/4 md:w-1/4">
                            <div key={index} className="mb-6">
                                <p className="text-sm uppercase mb-2 text-gray-400">{content.subtitle}</p>
                                <h2 className="text-2xl font-bold mb-4" style={{ color: '#1d1d1f' }}>{content.title}</h2>
                                <p className="text-sm text-gray-500 mt-2" style={{ color: "#77767a", fontSize: 17 }}>
                                    {content.date}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                        ))}

                        {/* Two Image Section */}


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 col-span-3 pt-8">
                            {MARKETSmedium.map((update, index) => (
                                <div
                                    key={index}
                                    className="bg-white shadow-md overflow-hidden"
                                    style={{ borderRadius: 30, backgroundColor: "#fffefe", }}>

                                    <IndependentChart
                                        key={update.id}
                                        market={update.market}
                                        title={update.title}
                                        interval={interval}
                                        setInterval={setInterval}
                                    />
                                    <div className="p-5"> {/* Increased padding for a roomier content area */}
                                        <p className="text-sm uppercase font-bold" style={{ color: "#1d1d1f", }}>
                                            {update.title}
                                        </p>

                                        <p className="text-sm text-gray-500 mt-2" style={{ color: "#77767a", }} >
                                            {update.date}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>



                    </div>

                    {/* Three Image Section */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        {MARKETSsmall.map((feature, index) => (
                            <div key={index} className="bg-white shadow-md overflow-hidden" style={{ borderRadius: 30, backgroundColor: '#fffefe' }}>
                                <IndependentChart
                                    key={feature.id}
                                    market={feature.market}
                                    title={feature.title}
                                    interval={interval}
                                    setInterval={setInterval}
                                />
                                <div className="p-6">
                                    <p className="text-sm uppercase font-bold " style={{ color: '#1d1d1f' }}>{feature.title}</p>
                                    <p className="text-sm text-gray-500 mt-2" style={{ color: '#77767a' }}>{feature.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    )
}


export default Dashboard 