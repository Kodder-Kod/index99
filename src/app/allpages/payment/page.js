import Footer from "@/app/components/footer/page"
import Navi from "@/app/components/nav/page"


const Paymentpage = () => {

    return (

        <>
            <Navi />
            <div className="bg-gray-100 py-10">
                <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="text-center py-8 px-6">
                        <h2 className="text-2xl font-semibold text-gray-800">Get Premium</h2>
                        <p className="text-gray-600 mt-2">Simple, affordable pricing for everyone.</p>
                    </div>
                    <div className="border-t border-gray-200 px-6 py-8 text-center">
                        <h3 className="text-4xl font-bold text-gray-800 mb-4">$10<span className="text-lg text-gray-600">/month</span></h3>
                        <p className="text-gray-600 mb-6">
                            Gain access to all premium features and 24/7 support.
                        </p>
                        <ul className="space-y-3 text-gray-700 mb-6">
                            <li className="flex items-center justify-center gap-2">
                                <span className="text-green-500">&#10003;</span> Unlimited access
                            </li>
                            <li className="flex items-center justify-center gap-2">
                                <span className="text-green-500">&#10003;</span> 24/7 customer support
                            </li>
                            <li className="flex items-center justify-center gap-2">
                                <span className="text-green-500">&#10003;</span> Free updates
                            </li>
                        </ul>
                        <div className="flex justify-center items-center">
                            <button className="w-1/2 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                                style={{ borderRadius: 13, backgroundColor: '#303133' }}>
                                Choose Payment method
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}


export default Paymentpage 