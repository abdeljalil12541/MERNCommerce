import { Button } from "@nextui-org/react";

export default function ShopByCategories() {

    const categoryImgs = [
        { alt: "category image 1", src: "https://mrbeast.store/cdn/shop/files/0091_0007_377.jpg?v=1714499554&width=1250" },
        { alt: "category image 2", src: "https://mrbeast.store/cdn/shop/files/Basketball-F_01b3dfe7-b738-47f4-bdf3-4183a765a056.jpg?v=1706307110&width=1250" },
        { alt: "category image 3", src: "https://mrbeast.store/cdn/shop/files/MrBeast_TROPICSSTEE_100923_MRB15566__Cropped_0000_Layer8.jpg?v=1701248728&width=1250" },
        { alt: "category image 4", src: "https://mrbeast.store/cdn/shop/files/MrBeast_BEASTORIGINALSHOODIEDigitalLavendar_100923_MRB15125_Cropped_0001_Layer13.jpg?v=1700248225&width=1250" },
        { alt: "category image 5", src: "https://mrbeast.store/cdn/shop/files/crop_0002_1357-F.jpg?v=1688245137&width=1250" },
        { alt: "category image 6", src: "https://mrbeast.store/cdn/shop/files/MrBeast_KIDSGLOWINTHEDARKPANTHERHOODIE_MB0078-BLK_Cropped_0030_Background.jpg?v=1722935842&width=1250" },
    ]
    return(
        <section className="w-full">
            <div className="flex mt-8 mb-4 justify-center">
                <p className="text-3xl">Explore Collections</p>
            </div>
            <div className="w-full grid grid-cols-3 gap-6 px-14 py-12">
                {categoryImgs.length > 0 && (
                    categoryImgs.map((catImg, index) => (
                        <div key={index} className="col-span-1 h-96 rounded-lg relative group overflow-hidden">
                            <img 
                                className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-1000 hover:scale-110"
                                src={catImg.src}
                                alt={catImg.alt} 
                            />
                            <Button variant="ghost" className="absolute left-1/2 bottom-4 -translate-x-1/2 rounded-full">
                                EXPLORE NOW
                            </Button>
                        </div>
                    ))
                )}

            </div>
        </section>
    );
}