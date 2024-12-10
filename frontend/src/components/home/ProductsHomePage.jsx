import {Button} from "@nextui-org/react";
import { MoveRight } from "lucide-react";

export default function ProductsHomePage() {
    return(
        <div className="w-full px-4 py-4 mx-auto container">
            <p className="text-2xl flex justify-center py-6">
                FREE SHIPPING WITH A PURCHASE OF 3 OR MORE PRODUCTS + FREE MERCH BAG
            </p>

            <p className="text-2xl -mb-4 relative font-semibold mt-2 ml-36">All products(15)</p>
            <div className="grid grid-cols-3 mx-20">
                <div className="col-span-3 mx-2 md:col-span-1">
                    <div className="w-full cursor-pointer">
                        <img src="https://i0.wp.com/dosei.ma/wp-content/uploads/2024/09/z1.png?w=2000&ssl=1 2000w, https://i0.wp.com/dosei.ma/wp-content/uploads/2024/09/z1.png?resize=300%2C300&ssl=1 300w, https://i0.wp.com/dosei.ma/wp-content/uploads/2024/09/z1.png?resize=1024%2C1024&ssl=1 1024w, https://i0.wp.com/dosei.ma/wp-content/uploads/2024/09/z1.png?resize=150%2C150&ssl=1 150w, https://i0.wp.com/dosei.ma/wp-content/uploads/2024/09/z1.png?resize=768%2C768&ssl=1 768w, https://i0.wp.com/dosei.ma/wp-content/uploads/2024/09/z1.png?resize=1536%2C1536&ssl=1 1536w, https://i0.wp.com/dosei.ma/wp-content/uploads/2024/09/z1.png?resize=600%2C600&ssl=1 600w, https://i0.wp.com/dosei.ma/wp-content/uploads/2024/09/z1.png?resize=100%2C100&ssl=1 100w" alt="" />
                    </div>
                    <div className="-mt-4">
                        <p className="text-center text-xl uppercase px-4">Togi cap</p>
                        <p className="text-center text-lg font-semibold mt-2 uppercase">212,00.د.م</p>
                    </div>
                </div>

                <div className="col-span-3 mx-2 md:col-span-1">
                    <div className="w-full cursor-pointer">
                        <img src="https://suicideboystore.com/cdn/shop/files/12801480305247675068_2048.jpg?v=1706570827" alt="" />
                    </div>
                    <div className="-mt-4">
                        <p className="text-center text-xl uppercase px-4">SuicideBoys 7th Hoodie</p>
                        <p className="text-center text-lg font-semibold mt-2 uppercase">212,00.د.م</p>
                    </div>
                </div>

                <div className="col-span-3 mx-2 md:col-span-1">
                    <div className="w-full cursor-pointer relative">
                        <img src="https://yeatofficial.com/cdn/shop/files/LYFESTYLEBALACLAVA1_8a7a274e-0b74-4c3b-a7cb-2a7ac3bec160_540x.png?v=1729211249" alt="" />
                        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 h-11 w-[70%] bg-gray-100 flex justify-center items-center">
                            <p className="text-red-600 uppercase text-[16px]">Out of stock</p>
                        </div>
                    </div>
                    <div className="-mt-4">
                        <p className="text-center text-xl uppercase px-4">LYFESTYLE BALACLAVA</p>
                        <p className="text-center text-lg font-semibold mt-2 uppercase">212,00.د.م</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 mx-20">
                <div className="col-span-3 mx-2 md:col-span-1">
                    <div className="w-full cursor-pointer">
                        <img src="https://suicideboystore.com/cdn/shop/files/5167398809321128922_2048_720x.jpg?v=1715722407" alt="" />
                    </div>
                    <div className="-mt-4">
                        <p className="text-center text-xl uppercase px-4">SucideBoys Suffering Hoodie</p>
                        <p className="text-center text-lg font-semibold mt-2 uppercase">212,00.د.م</p>
                    </div>
                </div>

                <div className="col-span-3 mx-2 md:col-span-1">
                    <div className="w-full cursor-pointer">
                        <img src="https://suicideboystore.com/cdn/shop/files/3985708110803085976_2048_720x.jpg?v=1731453508" alt="" />
                    </div>
                    <div className="-mt-4">
                        <p className="text-center text-xl uppercase px-4">G59 White Hat</p>
                        <p className="text-center text-lg font-semibold mt-2 uppercase">212,00.د.م</p>
                    </div>
                </div>

                <div className="col-span-3 mx-2 md:col-span-1">
                    <div className="w-full cursor-pointer">
                        <img src="https://yeatofficial.com/cdn/shop/files/LYFESTYLE_HOODIE_SIGNED_VINYL_2-id24oX6_540x.png?v=1729179532" alt="" />
                    </div>
                    <div className="-mt-4">
                        <p className="text-center text-xl uppercase px-4">LYFESTYLE HOODIE</p>
                        <p className="text-center text-lg font-semibold mt-2 uppercase">212,00.د.م</p>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <Button className="mt-8 ml-3 bg-neutral-950 !transition !duration-300 text-gray-200">
                    View More <MoveRight size={18} />
                </Button>
            </div>
            
        </div>
    )
}