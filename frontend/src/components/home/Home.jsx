import AboutHomePage from "./AboutHomePage"
import FeaturesBanner from "./FeaturesBanner"
import HomePageItemsWithTitles from "./HomePageItemsWithTitles"
import BannerSwiper from "./BannerSwiper"
import Recommendeditems from "./Recommendeditems"
import ReviewSwipper from "./ReviewSwipper"
import HomePageItems1 from "./HomePageItems1"
import ShopByCategories from "./ShopByCategories"
import HomePageItems2 from "./HomePageItems2"

export default function Home() {
    return(
        <div className="w-full">
            <BannerSwiper />
            <HomePageItems1 />
            <AboutHomePage />
            <ShopByCategories />
            <HomePageItems2 />
            <FeaturesBanner />
            <ReviewSwipper />
        </div>
    )
}