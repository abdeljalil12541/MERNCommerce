import AboutHomePage from "./AboutHomePage"
import FeaturesBanner from "./FeaturesBanner"
import HomePageItemsWithTitles from "./HomePageItemsWithTitles"
import ProductsHomePage from "./ProductsHomePage"
import Recommendeditems from "./Recommendeditems"
import ReviewSwipper from "./ReviewSwipper"

export default function Home() {
    return(
        <div className="w-full">
            <ProductsHomePage />
            <AboutHomePage />
            <HomePageItemsWithTitles />
            <FeaturesBanner />
            <ReviewSwipper />
        </div>
    )
}