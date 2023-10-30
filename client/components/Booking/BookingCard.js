import Image from "next/image";

const BookingCard = ({
    status,
    imgurl,
    totalPrice,
    title,
    description,
    duration,
    date,
    adults,
    adultsPrice,
    childrens,
    childrenPrice,
}) => {
    return (
        <div className='grid grid-cols-7 gap-4 rounded-xl shadow-lg'>
            <div
                className='w-full h-40 rounded-l-xl'
                style={{
                    backgroundImage: `url(${imgurl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    objectFit: "cover",

                }}
            >
                {status === "Booked" ? (
                    <div className='rounded-xl text-white flex items-center px-2 py-1'>
                        <span className='bg-[#dd2509] p-1 pl-2 pr-1 h-7 rounded-l flex items-center text-sm'>
                            Booked
                        </span>
                        <div className='bg-[#dd2509] p-1 pr-2 pl-1 h-7 rounded-r flex items-center'>
                            <Image
                                src='/assets/svg/booking/ticket-star.svg'
                                alt='ticket-star'
                                height={20}
                                width={20}
                            />
                        </div>
                    </div>
                ) : (
                    <div className='rounded-xl text-white flex items-center px-2 py-1'>
                        <span className='bg-black p-1 pl-2 pr-1 h-7 rounded-l flex items-center text-sm'>
                            Cancelled
                        </span>
                        <div className='bg-black p-1 pr-2 pl-1 h-7 rounded-r flex items-center'>
                            <Image
                                src='/assets/svg/booking/ticket-star.svg'
                                alt='ticket-star'
                                height={20}
                                width={20}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className='col-span-5 border-r my-2'>
                {/* descriptiom */}
                <p className='font-bold mb-2'>{title}</p>
                <div className='flex gap-2 mb-1'>
                    <Image
                        src='./assets/svg/booking/ticket-red-star.svg'
                        alt='ticket-red-star'
                        height={20}
                        width={20}
                    />
                    <span className='text-sm'>{description}</span>
                </div>
                <div className='flex gap-2 mb-1'>
                    <Image
                        src='./assets/svg/booking/clock.svg'
                        alt='clock'
                        height={20}
                        width={20}
                    />
                    <span className='text-sm'>{duration}</span>
                </div>
                <div className='flex gap-2 mb-1'>
                    <Image
                        src='./assets/svg/booking/calendar.svg'
                        alt='calendar'
                        height={20}
                        width={20}
                    />
                    <span className='text-sm'>{date}</span>
                </div>
                <div className='flex gap-4'>
                    <div className='flex gap-2'>
                        <Image
                            src='./assets/svg/booking/people.svg'
                            alt='people'
                            height={20}
                            width={20}
                        />
                        <span className='text-sm'>
                            {adults} Adults &times; ${adultsPrice}
                        </span>
                    </div>
                    <div className='flex gap-2'>
                        <Image
                            src='./assets/svg/booking/people.svg'
                            alt='people'
                            height={20}
                            width={20}
                        />
                        <span className='text-sm'>
                            {childrens} Child &times; ${childrenPrice}
                        </span>
                    </div>
                </div>
            </div>
            <div className='col-span-1 flex flex-col justify-center items-center'>
                {/* price */}
                <h1>Total Price</h1>
                <span className='font-bold'>&euro; 49.00</span>
            </div>
        </div>
    );
};

export default BookingCard;