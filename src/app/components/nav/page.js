"use client"
import React, { useState, useEffect } from "react"


const Navi = () => {

    const navigationItems = [
        'BTC',
        'ETH',
        'XRP',
        'DOGE',
        'BCH',
        'SOL',
        'EURO',
        'GBP',
        'USDT',
    ];

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
            {/* Top Navbar */}
            < div className=" text-white py-3" style={{ backgroundColor: '#303133' }}>

                <div
                    className="flex items-center justify-between max-w-5xl mx-auto px-6 "
                    style={{ textAlign: 'center', }}
                >
                    {navigationItems.map((item) => (
                        <a
                            key={item}
                            href="#"
                            className=" hover:underline"
                            style={{ color: '#d6d7d7', fontSize: 12 }}
                        >
                            {item}
                        </a>
                    ))}
                </div>


            </div >


            {/* Secondary Navbar */}
            < div
                className={`shadow-md py-3 transition-opacity duration-300 ${isScrolled ? 'bg-opacity-70' : 'bg-opacity-100'}`}
                style={{
                    backgroundColor: '#fdfcfc',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                }}
            >
                <div className="flex items-center justify-between max-w-5xl mx-auto px-6">
                    <a href="/allpages/dashboard" className="text-gray-900 font-semibold hover:underline" style={{ fontSize: 20 }}>
                        Dashboard
                    </a>
                    <div className="max-w-2xl">
                        <a href="/allpages/about" className="text-gray-900 hover:underline" style={{ fontSize: 13 }}>
                            About Us
                        </a>
                        <a href="/allpages/payment" className="text-gray-900 hover:underline mx-20" style={{ fontSize: 13 }}>
                            Pricing
                        </a>
                        <a href="/allpages/settings" className="text-gray-900 hover:underline" style={{ fontSize: 13 }}>
                            Profile
                        </a>
                    </div>
                </div>
            </div >
        </>


    )
}


export default Navi