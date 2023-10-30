import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProfileCard from "@/components/Index/ProfileCard";
import TourCard from "@/components/Index/TourCard";
import Container from "@/components/Layout/Container";
import BookingCard from "@/components/Booking/BookingCard";
import TourCardSection from "@/components/Index/TourCardSection";

const DashBoard = () => {
    const [activeTab, setActiveTab] = useState("wishlist");
    return (
        <Container>
            <div className='grid grid-cols-5 md:grid-cols-3 lg:grid-cols-5 gap-4'>
                <div className='col-span-2 flex flex-col gap-4 md:gap-2 px-4 py-2 w-full'>
                    <ProfileCard activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>
                {activeTab === "wishlist" && (
                    <div className='col-span-3'>
                        <TourCardSection />
                    </div>
                )}
                {activeTab === "booking" && (
                    <div className='col-span-3'>
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
                    </div>
                )}

                {activeTab === "profile" && (
                    <div className='col-span-3'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-bold'>Name</label>
                                    <input
                                        className='border border-gray-300 rounded-md px-2 py-1'
                                        type='text'
                                        placeholder='Enter your name'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-bold'>Email</label>
                                    <input
                                        className='border border-gray-300 rounded-md px-2 py-1'
                                        type='email'
                                        placeholder='Enter your email'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-bold'>Phone Number</label>
                                    <input
                                        className='border border-gray-300 rounded-md px-2 py-1'
                                        type='text'
                                        placeholder='Enter your phone number'
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <label className='text-sm font-bold'>Address</label>
                                    <input
                                        className='border border-gray-300 rounded-md px-2 py-1'
                                        type='text'
                                        placeholder='Enter your address'
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <button className='bg-[#010A15] text-white py-1 rounded-md'>Save</button>
                            </div>
                        </div>
                    </div>
                )}





            </div>
        </Container>
    );
};

export default DashBoard;