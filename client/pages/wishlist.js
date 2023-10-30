import React from "react";

import Container from "@/components/Layout/Container";
import ProfileCard from "@/components/Index/ProfileCard";
import Image from "next/image";
import TourCardSection from "@/components/Index/TourCardSection";

const index = () => {
    return (
        <Container>
            <div className='xl:grid xl:grid-cols-5 flex flex-col'>
                <div className='col-span-1 hidden xl:block'>
                    <ProfileCard />
                </div>
                <div className='xl:col-span-4'>
                    <div className='flex justify-between items-center'>
                        <div className='font-bold text-xl'>
                            Wishlist(<span className='text-[#dd2509]'>8</span>)
                        </div>
                        <div className='text-gray-500 text-sm flex gap-1'>
                            <Image
                                className='text-gray-500'
                                src='/assets/svg/eraser.svg'
                                alt='eraser'
                                width={20}
                                height={20}
                            />
                            Clear All
                        </div>
                    </div>

                    <TourCardSection />
                </div>
            </div>
        </Container>
    );
};

export default index;