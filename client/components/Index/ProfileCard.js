import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const ProfileCard = ({ activeTab, setActiveTab }) => {
    const { data: session, status } = useSession();


    return (
        <div className='bg-[#010A15]/[0.03] p-2 rounded-xl mx-4'>
            <div className='rounded-xl flex flex-col'>
                <div className='flex flex-col items-center bg-white py-3 rounded-xl'>
                    <Image
                        className='rounded-full mt-4 mb-2'
                        src={'/assets/images/profile.png'}
                        alt='profile'
                        width={80}
                        height={80}
                    />
                    <p className='font-bold text-xl'>{session?.user?.name}</p>
                    <p className='text-gray-500 text-sm'>{session?.user?.email}</p>
                </div>
                <div className={`flex flex-col gap-2 mt-4`}>
                    <button className='flex gap-2 rounded-xl bg-white py-2 px-3' onClick={() => setActiveTab("wishlist")}>
                        <div className={`flex gap-2 rounded-xl bg-white py-2 px-3 ${activeTab === "wishlist" ? "bg-[#010A15]/[0.03]" : ""}`}>
                            <Image
                                src={`/assets/svg/profile-card-icon/favourite -${activeTab === "wishlist" ? "Active" : "Default"
                                    }.svg`}
                                alt='heart'
                                width={20}
                                height={20}
                            />
                            Wishlist
                        </div>
                    </button>

                    <button className='flex gap-2 rounded-xl bg-white py-2 px-3' onClick={() => setActiveTab("profile")}>
                        <div className={`flex gap-2 rounded-xl bg-white py-2 px-3 ${activeTab === "profile" ? "bg-[#010A15]/[0.03]" : ""}`}>
                            <Image
                                src={`/assets/svg/profile-card-icon/menu-circle -${activeTab === "profile" ? "Active" : "Default"
                                    }.svg`}
                                alt='heart'
                                width={20}
                                height={20}
                            />
                            Profile Settings
                        </div>
                    </button>

                    <button className='flex gap-2 rounded-xl bg-white py-2 px-3' onClick={() => setActiveTab("booking")}>
                        <div className={`flex gap-2 rounded-xl bg-white py-2 px-3 ${activeTab === "booking" ? "bg-[#010A15]/[0.03]" : ""}`}>
                            <Image
                                src={`/assets/svg/profile-card-icon/ticket-star -${activeTab === "booking" ? "Active" : "Default"
                                    }.svg`}
                                alt='heart'
                                width={20}
                                height={20}
                            />
                            Booking History
                        </div>
                    </button>

                    <button className='flex gap-2 rounded-xl bg-white py-2 px-3' onClick={() => setActiveTab("review")}>
                        <div className={`flex gap-2 rounded-xl bg-white py-2 px-3 ${activeTab === "review" ? "bg-[#010A15]/[0.03]" : ""}`}>
                            <Image
                                src={`/assets/svg/profile-card-icon/star -${activeTab === "review" ? "Active" : "Default"
                                    }.svg`}
                                alt='heart'
                                width={20}
                                height={20}
                            />
                            My Reviews
                        </div>
                    </button>

                    <button className='flex gap-2 rounded-xl bg-white py-2 px-3' onClick={() => setActiveTab("setting")}>
                        <div className='flex gap-2 rounded-xl py-2 px-3'>
                            <Image
                                src='/assets/svg/profile-card-icon/logout-04 -Default.svg'
                                alt='heart'
                                width={20}
                                height={20}
                            />
                            Logout
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;