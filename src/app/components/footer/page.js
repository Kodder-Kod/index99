import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";


const Footer=()=>{

    return(
        <footer className="bg-[#303133] text-white py-6 mt-8">
        <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-wrap justify-between items-center">


                {/* Quick Links */}
                <div className="w-full md:w-1/3 mb-4 md:mb-0 flex justify-start">
                    <ul className="flex flex-wrap justify-center space-x-4">
                        <li><a href="#" className="hover:underline text-gray-400">About Us</a></li>
                        <li><a href="#" className="hover:underline text-gray-400">Pricing</a></li>
                        <li><a href="#" className="hover:underline text-gray-400">Profile</a></li>

                    </ul>
                </div>

                {/* Social Media */}
                <div className="w-full md:w-1/3 mb-4 md:mb-0 flex justify-start">
                    <a href="#" className="mx-2 text-gray-400 hover:text-white">
                        <FaSquareFacebook />
                    </a>
                    <a href="#" className="mx-2 text-gray-400 hover:text-white">
                        <FaXTwitter />
                    </a>
                    <a href="#" className="mx-2 text-gray-400 hover:text-white">
                        <FaLinkedin />
                    </a>
                    <a href="#" className="mx-2 text-gray-400 hover:text-white">
                        <FaInstagramSquare />
                    </a>
                </div>
                {/* Company Info */}
                <div className="w-full md:w-1/3 mb-4 md:mb-0 ">
                    <h3 className="text-lg font-semibold mb-2">Benchmarck Indices</h3>
                    <p className="text-sm">Bringing you the latest updates and insights in real-time.</p>
                </div>
            </div>
        </div>
        <div className="border-t border-gray-700 mt-4 pt-4 text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Benchmark Indices. All rights reserved.</p>
        </div>
    </footer>

    )
}


export default Footer