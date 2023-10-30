/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

const TourCard = ({
    rating,
    reviews,
    isFavourite,
    tags,
    title,
    day,
    group,
    price,
    imgurl,
}) => {
    return (
        <div className='max-w-xs rounded-lg overflow-hidden shadow-lg m-4'>
            <div className='relative'>
                <img className='w-full' src={imgurl} alt={title} />
                <div className='row-span-3 rounded-lg p-2 flex flex-col justify-between absolute top-0 left-0 space-x-2 w-full'>
                    <div className='flex justify-between'>
                        <div className='flex text-white gap-1'>
                            <Image
                                src='/assets/svg/tour-card/star.svg'
                                alt='star'
                                width={20}
                                height={20}
                            />
                            {rating}
                            <span className='text-gray-200'>({reviews} reviews)</span>
                        </div>
                        <div>
                            {isFavourite ? (
                                <Image
                                    src='/assets/svg/tour-card/is-favourite.svg'
                                    alt='heart'
                                    width={20}
                                    height={20}
                                />
                            ) : (
                                <Image
                                    src='/assets/svg/tour-card/not-favourite.svg'
                                    alt='heart'
                                    width={20}
                                    height={20}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-4 py-2'>
                <div className='font-bold mb-2'>{title}</div>
                <div className="mb-1">
                    {tags.map((tag) => (
                        <span
                            className='text-white bg-[#dd2509] rounded-md px-2 py-1 text-xs'
                            key={tag}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <p className='text-gray-700 text-sm'>
                    {day} day - {group} group
                </p>
                <p className='text-gray-700 text-sm'>
                    <span className='text-red-500 font-bold text-base'>
                        From &euro;{price}
                    </span>{" "}
                    Per person
                </p>
            </div>
        </div>
    );
};

export default TourCard;