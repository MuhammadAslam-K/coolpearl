import Navbar from "../../components/navbar"
import Banner from "../../components/banner"
import Footer from "../../components/footer"
import FooterResponsive from "../../components/footer/responsive"
import { Suspense, lazy } from "react"
const Services = lazy(() => import("../../components/services"))
const RecentWorks = lazy(() => import("../../components/recentWorks"))


function Index() {

    return (
        <div className="overflow-x-hidden bg-gray-100 max-w-screen"        >
            <div className="z-50">
                <Navbar />
            </div>
            <Banner />

            {/* Services Section */}
            <Suspense fallback={<div>Loading...</div>}>
                <Services />
            </Suspense>

            {/* RecentWorks */}
            <Suspense fallback={<div>Loading...</div>}>
                <RecentWorks />
            </Suspense>

            <div className="hidden w-full mt-10 bg-black lg:block">
                <Footer />
            </div>
            <div className="block mt-10 bg-black lg:hidden">
                <FooterResponsive />
            </div>

        </div>
    )
}

export default Index