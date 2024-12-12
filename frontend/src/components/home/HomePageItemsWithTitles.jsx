import { Button } from "@nextui-org/react";
import { MoveRight } from "lucide-react";

export default function HomePageItemsWithTitles() {
    return(
        <div className="w-full px-4 py-4 mx-auto container">
            


            <p className="text-2xl -mb-4 relative font-semibold mt-14 ml-36">New & Trending</p>
            <div className="grid grid-cols-3 mx-20">
                <div className="col-span-3 mx-2 md:col-span-1">
                    <div className="w-full cursor-pointer">
                        <img src="https://yeatofficial.com/cdn/shop/files/1-800-GO2-WORKHAT1-nQYN749h_3d8c880b-c431-400b-9a36-21d4de2a011b_540x.png?v=1729788451" alt="" />
                    </div>
                    <div className="-mt-4">
                        <p className="text-center text-xl uppercase px-4">1-800-GO2-WORK HAT</p>
                        <p className="text-center text-lg font-semibold mt-2 uppercase">212,00.د.م</p>
                    </div>
                </div>
                
                <div className="col-span-3 mx-2 md:col-span-1">
                    <div className="relative w-full cursor-pointer">
                        <img src="https://yeatofficial.com/cdn/shop/files/LYFESTYLEBOXSET12_720x.png?v=1728513157" alt="" />
                        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 h-11 w-[70%] bg-gray-100 flex justify-center items-center">
                            <p className="text-red-600 uppercase text-[16px]">Out of stock</p>
                        </div>
                    </div>
                    <div className="-mt-4">
                        <p className="text-center text-xl uppercase px-4">LYFESTYLE BOX SET 1</p>
                        <p className="text-center text-lg font-semibold mt-2 uppercase">345,00.د.م</p>
                    </div>
                </div>

                <div className="col-span-3 mx-2 md:col-span-1">
                    <div className="w-full cursor-pointer">
                        <img src="https://shop-playboicarti.com/wp-content/uploads/2021/08/MIDDLE-FINGER-SLEEVELESS-TEE-500x500.png" alt="" />
                    </div>
                    <div className="-mt-4">
                        <p className="text-center text-xl uppercase px-4">SLEEVELESS TEE</p>
                        <p className="text-center text-lg font-semibold mt-2 uppercase">212,00.د.م</p>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <Button color="primary" variant="bordered">
                    View More <MoveRight size={18} />
                </Button>
            </div>


            <p className="text-2xl -mb-4 relative font-semibold mt-14 ml-36">Pre-Order (Coming soon) <span className="ml-2 font-medium text-sm hover:no-underline cursor-pointer underline">Shop All</span></p>
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