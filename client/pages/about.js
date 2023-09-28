import Container from "@/components/Layout/Container";

const about = () => {
  return (
    <div className=' flex flex-col gap-10 sm:gap-16 md:gap-32'>
      <Container>
        <h1 className='text-3xl font-bold mb-4'>About Tour-Ticket</h1>
        <p className='font-light mb-8'>
          Welcome to Tour-Ticket, your gateway to unforgettable travel
          experiences. We are passionate about helping you explore the world and
          create lasting memories. Whether you're a seasoned traveler or
          embarking on your first adventure, Tour-Ticket is here to make your
          journey seamless and extraordinary.
        </p>
        <h1 className='text-2xl mb-4'>Our Mission</h1>
        <p className='font-light mb-8'>
          At Tour-Ticket, our mission is simple: to connect travelers with their
          dream destinations. We believe that travel has the power to transform
          lives, broaden horizons, and foster a deeper understanding of the
          world. That's why we're dedicated to providing you with a wide range
          of carefully curated tours and tickets that cater to diverse interests
          and budgets.
        </p>

        <h2 className='text-2xl mb-4'>What Sets Us Apart</h2>

        <p className='font-light mb-2'>
          Expertise: Our team of travel enthusiasts and experts has scoured the
          globe to handpick the best tours and experiences. We bring you insider
          knowledge and local insights to ensure your trip is truly exceptional.
        </p>
        <p className='font-light mb-2'>
          Ease of Booking: Booking your dream adventure should be stress-free.
          With Tour-Ticket, you can easily browse, compare, and book tours and
          tickets online, saving you time and effort.
        </p>
        <p className='font-light mb-2'>
          Customer-Centric Approach: Your satisfaction is our top priority.
          We're here to assist you every step of the way, from planning your
          itinerary to providing support during your journey.
        </p>
        <p className='font-light mb-8'>
          Quality Assurance: We partner with reputable tour operators and
          service providers to guarantee the highest quality experiences. Your
          safety and enjoyment are paramount.
        </p>

        <h2 className='text-2xl mb-4'>Our Promise</h2>
        <p className='font-light mb-3'>
          When you choose Tour-Ticket, you're not just booking a tour or buying
          a ticket; you're investing in unforgettable moments, cultural
          discoveries, and the stories you'll share for a lifetime. We're
          committed to making your travel dreams a reality.
        </p>
        <p className='font-light mb-8'>
          Thank you for choosing Tour-Ticket for your travel adventures. Join us
          in exploring the world, one ticket at a time.
        </p>
      </Container>
    </div>
  );
};

export default about;
