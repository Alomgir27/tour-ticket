import Image from "next/image";

import ProfileCard from "@/components/Index/ProfileCard";
import TourCard from "@/components/Index/TourCard";
import Container from "@/components/Layout/Container";
import BookingCard from "@/components/Booking/BookingCard";
import TourCardSection from "@/components/Index/TourCardSection";

const booking = () => {
    return (
        <Container>
            <div className='grid grid-cols-5'>
                <div className='col-span-1'>
                    <ProfileCard />
                </div>
                <div className='col-span-4 flex flex-col'>
                    <div className='mb-6'>
                        {/* hostory */}
                        <h1 className='text-xl font-extrabold mb-4'>Booking History</h1>
                        <div className='flex flex-col gap-4'>
                            <BookingCard
                                status='Booked'
                                imgurl='https://images.unsplash.com/photo-1583207884889-d79abf0d0aa3?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%3D%3D'
                                totalPrice={49.0}
                                title='Dubai: Tandem Skydive Experience at The Palm'
                                description='24 Hour & Digital Walking Tour'
                                duration='1 hour'
                                date='15 October 2023'
                                adults={2}
                                adultsPrice={37.68}
                                childrens={2}
                                childrenPrice={16.68}
                            />
                            <BookingCard
                                status='Canceled'
                                imgurl='https://images.unsplash.com/photo-1583207884889-d79abf0d0aa3?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%3D%3D'
                                totalPrice={49.0}
                                title='Dubai: Tandem Skydive Experience at The Palm'
                                description='24 Hour & Digital Walking Tour'
                                duration='1 hour'
                                date='15 October 2023'
                                adults={2}
                                adultsPrice={37.68}
                                childrens={2}
                                childrenPrice={16.68}
                            />
                        </div>
                    </div>
                    <div className='mb-6'>
                        <div className='flex justify-between items-center'>
                            <div className='font-extrabold text-xl mb-2'>
                                {"Check Other's Activities"}
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
            </div>
        </Container>
    );
};

export default booking;