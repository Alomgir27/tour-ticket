import React from "react";
import TourCard from "./TourCard";

const TourCardSection = () => {
    return (
        <div className='xl:grid xl:grid-cols-3 lg;grid lg:grid-cols-3 md:grid md:grid-cols-2 flex flex-col items-center my-2 gap-4'>
            {Array(10)
                .fill()
                .map((_, id) => (
                    <TourCard
                        key={id}
                        rating='4.5'
                        reviews='1500'
                        isFavourite={true}
                        tags={["Adventure"]}
                        title='Dubai: Tandem Skydive Experience at The Palm'
                        day={1}
                        group='small'
                        price={250}
                        imgurl='https://images.unsplash.com/photo-1583207884889-d79abf0d0aa3?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%3D%3D'
                    />
                ))}
        </div>
    );
};

export default TourCardSection;