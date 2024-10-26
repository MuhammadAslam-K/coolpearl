import Banner from "../../components/banner"
import RepairCard from "../../components/serviceCard"
import Footer from "../../components/footer"
import FooterResponsive from "../../components/footer/responsive"
import Navbar from "../../components/navbar"

function Index() {

    return (
        <div>
            <div className="z-50">
                <Navbar />
            </div>
            <Banner />

            {/* Services Section */}
            <div className="flex flex-wrap h-full gap-3 p-5 mt-20 justify-evenly">
                <RepairCard />
                <RepairCard />
                <RepairCard />
                <RepairCard />
            </div>

            <div className="hidden w-full mt-10 bg-black lg:block">
                <Footer />
            </div>
            <div className="block mt-10 mb-10 bg-black lg:hidden">
                <FooterResponsive />
            </div>

        </div>
    )
}

export default Index