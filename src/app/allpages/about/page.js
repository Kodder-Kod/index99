import Navi from "@/app/components/nav/page"
import Contact from "../contact/page"
import Footer from "@/app/components/footer/page"


const About = () => {

    return (
        <>
            <Navi />
            <div className="bg-gray-100 pt-10 pb-10">
                <div className="max-w-5xl mx-auto bg-white shadow-lg p-8" style={{ borderRadius: 20 }}>
                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">About Us</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        {/* Image Section */}
                        <div className="overflow-hidden rounded-lg shadow-md">
                            <img
                                src="/btc.png"
                                alt="About Us"
                                style={{ borderRadius: 20 }}
                                className="w-full h-72 object-cover"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="text-gray-700 space-y-4">
                            <p className="text-md leading-relaxed">
                                Welcome to our platform! We are committed to providing top-notch services
                                tailored to meet your unique needs. Our mission is to deliver solutions that
                                empower individuals and businesses to thrive in a dynamic world.
                            </p>
                            <p className="text-md leading-relaxed">
                                With a dedicated team of professionals, we strive to foster innovation,
                                reliability, and excellence in everything we do. Whether youre here to
                                explore, collaborate, or grow, we have something special to offer you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            <Contact />

            <Footer/>
        </>

    )
}


export default About 