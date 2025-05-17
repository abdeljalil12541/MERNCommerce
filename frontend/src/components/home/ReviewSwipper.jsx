"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import modules from swiper
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaStar } from "react-icons/fa";
import ReactStars from 'react-stars';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Button, Checkbox } from "@nextui-org/react";
import { MessageCirclePlus } from "lucide-react";
import api from '../../lib/api';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Loader from "../Loader";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

const cars = [
    { id: 1, name: 'Car 1' },
    { id: 2, name: 'Car 2' },
    { id: 3, name: 'Car 3' },
    { id: 4, name: 'Car 4' },
];

export default function ReviewSwipper({ product }) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [stars, setStars] = useState(0);
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewDescription, setReviewDescription] = useState('');
    const [image, setImage] = useState('');

    const [isChecked, setIsChecked] = useState(false);
    const [loader, setLoader] = useState(false);
    const { isAuthenticated, user } = useAuth();
    const [userId, setUserId] = useState(null);
    
    const pathname = usePathname();

    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        width: '400px',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });

    const ratingChanged = (newRating) => {
        setStars(newRating);
        console.log('stars..', stars);
    };

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              throw new Error('No token found, please log in');
            }
    
            console.log('Fetching user data with token:', token);
            const response = await api.get('/users/me', {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
    
            console.log('Response data:', response.data);
            setUserId(response.data.id)
            
          } catch (err) { // No type annotation
            return
          } finally {
            // setIsLoading(false);
          }
        };
    
        fetchUserData();
      }, []);
    console.log('user in review: ', userId)

    const handleSubmit = async () => {
        setLoader(true);
      
        try {
          const response = await api.post('/reviews/create-review', { 
            userId,
            product,
            reviewCount: stars,
            reviewTitle,
            reviewDescription,
            image
          });
      
            console.log('response: ', response.data);
            Toast.fire({
                icon: "success",
                title: "Review submitted successfully",
              });

            // ✅ Close the modal after successful submission
            onOpenChange(false);

            // Optionally: reset form fields
            setStars(0);
            setReviewTitle('');
            setReviewDescription('');
            setImage('');
        } catch (err) {
          console.log('error submitting review: ', err?.message);
        } finally {
          setLoader(false);
        }
      };

    return (
        <div className='w-full container mx-auto px-20 mt-16 mb-24 text-gray-700'>
            {loader && <Loader /> }
            <p className='text-2xl text-center mt-10 text-[#E74683]'>Let customers speak for us</p>
            <p className='text-2xl flex justify-center my-2 text-yellow-400'><FaStar size={20} /> <FaStar size={20} /> <FaStar size={20} /> <FaStar size={20} /> <FaStar size={20} /></p>
            <p className='text-center'>from <span className="text-[#E74683]">41 reviews</span></p>
            <Swiper
                className=" my-6"
                spaceBetween={30}
                slidesPerView={1}
                speed={2000}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{clickable: true}}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {cars.map(car => (
                    <SwiperSlide key={car.id}>
                        <div className="w-full flex justify-center flex-col">
                            <p className='text-2xl flex justify-center my-2 text-yellow-400'><FaStar size={20} /> <FaStar size={20} /> <FaStar size={20} /> <FaStar size={20} /> <FaStar size={20} /></p>
                            <p className="text-lg text-center text-[#E74683]">quality is just amazing !</p>
                            <p className="text-center px-6 text-sm mt-1.5">It's so comfy and soft on the inside and the customer service was incredible. Thank you !</p>
                            <p className="text-center px-6 text-xs text-gray-500 mt-8">Felix Harmon</p>
                            <div className="w-full flex justify-center items-center">
                                <img className="w-24" src="https://suicideboystore.com/cdn/shop/files/12801480305247675068_2048.jpg?v=1706570827" alt="" />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {isAuthenticated && (
                <div className={`w-full mt-10 flex justify-center ${pathname === '/' ? 'hidden' : ''}`}>
                    <Button
                        onClick={onOpen}
                        variant="ghost"
                        className="rounded border-default data-[hover=true]:!bg-gray-100"
                    >
                        Add Review <MessageCirclePlus strokeWidth={1.5} />
                    </Button>
                </div>
                )
            }


            <Modal
                classNames={{
                wrapper: "z-[9999]",
                backdrop: "z-[9998]",
                base: "z-[9999]",
                body: "z-[9999] max-h-[80vh] overflow-y-auto",  // Add these properties
                content: "z-[9999] relative max-h-[90vh]",  // Add max-height
                header: "z-[9999]",
                footer: "z-[9999]"
                }}
                motionProps={{
                    variants: {
                      enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.3,
                          ease: "easeOut",
                        },
                      },
                      exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                          duration: 0.2,
                          ease: "easeIn",
                        },
                      },
                    },
                  }}
                className='!z-[9999] h-[550px]' size='3xl' hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onCloses) => (
                    <>
                    <ModalHeader>
                        <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700 md:p-5">
                            <div>
                            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Add a review for:</h3>
                            <a href="#" className="font-medium text-[#E74683] hover:underline dark:text-primary-500">{product.title}</a>
                            </div>
                            <button onClick={onCloses} type="button" className="absolute right-5 top-5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="review-modal">
                                <svg className="h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <form className="p-4 md:pt-2">
                            <div className="mb-4 grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <div className="flex items-center">
                                   <ReactStars value={stars} onChange={ratingChanged} size={30}  />    
                                   <span className="ms-2 text-lg font-bold text-gray-900 dark:text-white">{stars} out of 5</span>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Review title</label>
                                <input value={reviewTitle} onChange={(e) => {setReviewTitle(e.target.value)}} type="text" name="title" id="title" className="block w-full outline-none rounded-lg border-2 duration-300 border-gray-300 focus:border-2 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#E74683]  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-[#E74683] dark:focus:ring-[#E74683]" required="" />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Review description</label>
                                <textarea value={reviewDescription} onChange={(e) => {setReviewDescription(e.target.value)}} id="description" rows="6" className="block w-full outline-none rounded-lg border-2 duration-300 border-gray-300 bg-gray-50 focus:border-2 p-2.5 text-sm text-gray-900 focus:border-[#E74683]  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-[#E74683] dark:focus:ring-[#E74683]" required=""></textarea>
                                <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Problems with the product or delivery? <a href="#" className="text-primary-600 hover:underline dark:text-primary-500">Send a report</a>.</p>
                            </div>
                            <div className="col-span-2">
                                <p className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Add real photos of the product to help other customers <span className="text-gray-500 dark:text-gray-400">(Optional)</span></p>
                                <div className="flex w-full items-center justify-center">
                                <label htmlFor="dropzone-file" className="dark:hover:bg-bray-800 flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    <svg className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input value={image} onChange={(e) => {setImage(e.target.value)}} id="dropzone-file" type="file" className="hidden" />
                                </label>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="flex items-center">
                                    <Checkbox isSelected={isChecked} onValueChange={setIsChecked} color="primary" id="review-checkbox" defaultSelected>Option</Checkbox>
                                    <label htmlFor="review-checkbox" className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400">By publishing this review you agree with the <a href="#" className="text-primary-600 hover:underline dark:text-primary-500">terms and conditions</a>.</label>
                                </div>
                            </div>
                            </div>
                            <div className="border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="rounded-lg" isDisabled={!isChecked} onPress={handleSubmit}>
                            Add review
                        </Button>
                        <Button className="text-black bg-white border border-gray-300 rounded-lg" onPress={onCloses}>
                            Cancel
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    );
}