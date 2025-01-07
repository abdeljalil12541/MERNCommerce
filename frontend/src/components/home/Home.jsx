import AboutHomePage from "./AboutHomePage"
import FeaturesBanner from "./FeaturesBanner"
import HomePageItemsWithTitles from "./HomePageItemsWithTitles"
import BannerSwiper from "./BannerSwiper"
import Recommendeditems from "./Recommendeditems"
import ReviewSwipper from "./ReviewSwipper"
import ShopByCategories from "./ShopByCategories"
import HomePageItems1 from "./HomePageItems1"
import HomePageItems2 from "./HomePageItems2"
import HomePageItems3 from "./HomePageItems3"

export default function Home() {
    return(
        <div className="w-full">
            <BannerSwiper />
            <HomePageItems1 />
            <AboutHomePage />
            <HomePageItems2 />
            <ShopByCategories />
            <HomePageItems3 />
            <FeaturesBanner />
            <ReviewSwipper />
        </div>
    )
}