import AboutHomePage from "./AboutHomePage"
import FeaturesBanner from "./FeaturesBanner"
import HomePageItemsWithTitles from "./HomePageItemsWithTitles"
import BannerSwiper from "./BannerSwiper"
import Recommendeditems from "./Recommendeditems"
import ReviewSwipper from "./ReviewSwipper"

export default function Home() {
    return(
        <div className="w-full">
            <BannerSwiper />
            <AboutHomePage />
            <HomePageItemsWithTitles />
            <FeaturesBanner />
            <ReviewSwipper />
        </div>
    )
}