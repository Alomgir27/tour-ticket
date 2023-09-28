import React from "react";
import Container from "../Layout/Container";
import SearchSvg from "../Svg/SearchSvg";
import Image from "next/image";
import { WhereAreYouGoingSearchBox } from "../Utils/styledComponents";

function Hero() {
    return (
        <div className="relative z-10 w-full">
            <Container>
                <div className="flex max-md:mt-5 gap-20 max-md:gap-5 md:mt-20 flex-col lg:flex-row max-customScrOne:items-center">
                    <div className="flex-1 max-md:gap-10 max-customScrOne:w-full max-sm:px-0 max-customScrOne:px-5">
                        <div >
                            <div className="flex flex-col gap-5 max-md:gap-5 max-xs:gap-4 max-lg:items-center max-lg:text-center">
                                <h2 className="text-5xl leading-tight max-md:text-4xl max-sm:text-3xl max-sm:leading-snug max-xs:text-2xl font-extrabold capitalize max-md:leading-snug">
                                    Discover rome at special discounted prices
                                </h2>
                                <p className="max-lg:text-base max-xs:text-xs max-md:text-base max-sm:leading-relaxed max-xs:leading-relaxed max-md:w-full max-lg:w-full max-sm:w-full w-full ">
                                    Buy your Panoramic Bus tickets and explore the city. The best one-day guided tours
                                    to dive into the history of Rome with Colosseum and Vatican, Pompeii, Capri and
                                    more.
                                </p>
                            </div>
                            {/* Search Input */}
                            {/* TODO: Where Are you going api implementation */}
                            <div className="flex justify-center lg:justify-start">
                                <WhereAreYouGoingSearchBox />
                            </div>
                        </div>
                        <div className="flex flex-col max-md:hidden gap-4 items-center lg:items-start mb-10">
                            <h3 className="text-2xl font-bold leading-loose">Our Pertner’s</h3>
                            <div className="flex flex-wrap items-center gap-5">
                                <img src="/assets/hero/air-transat.png" alt="air-transat" />
                                <img src="/assets/hero/atlas-air.png" alt="atlas-air" />
                                <img src="/assets/hero/jeju-air.png" alt="jeju-air" />
                                <img src="/assets/hero/atlas-air.png" alt="atlas-air" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex  max-sm:gap-1.5">
                        <div className="flex-1 flex flex-col max-sm:gap-1.5">
                            <Image width={400} height={520} className="w-full" src="/assets/hero/hero-one.png" alt="" />
                            <Image width={400} height={520} className="w-full" src="/assets/hero/hero-two.png" alt="" />
                        </div>
                        <div className="flex-1 translate-y-20 max-md:translate-y-0">
                            <Image
                                width={400}
                                height={520}
                                className="w-full"
                                src="/assets/hero/hero-three.png"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Hero;
