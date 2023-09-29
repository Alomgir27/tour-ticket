import Container from "@/components/Layout/Container";
import BreadCrumb from "@/components/Utils/BreadCrumb";

const contact = () => {
  return (
    <div className=' flex flex-col gap-10 sm:gap-16 md:gap-32'>
      <Container>
        <BreadCrumb />
        <div className='grid md:grid-cols-5 sm:grid-cols-1'>
          <div className='mb-8 pr-3 md:col-span-3'>
            <div className='text-3xl font-bold my-4'>Let's talk</div>
            <p className='text-md'>
              If you have any problem or any clearification. Don’t wory we are
              here you just send us a message. We are available all time.
            </p>
          </div>
          <div className='bg-[#F0F3FB] rounded-lg p-5 md:col-span-2'>
            <form>
              <div className='mb-3'>
                <label
                  htmlFor='fullname'
                  className='block w-full font-semibold mb-2'
                >
                  Full Name
                </label>
                <input
                  className='block w-full p-3 rounded-lg outline-none'
                  id='fullname'
                  name='fullname'
                  type='text'
                  required
                  placeholder='Enter your full name'
                />
              </div>

              <div className='mb-3'>
                <label
                  htmlFor='email'
                  className='block w-full font-semibold mb-2'
                >
                  Email
                </label>
                <input
                  className='block w-full p-3 rounded-lg outline-none'
                  id='email'
                  name='email'
                  type='email'
                  required
                  placeholder='Enter email'
                />
              </div>

              <div className='mb-3'>
                <label
                  htmlFor='message'
                  className='block w-full font-semibold mb-2'
                >
                  Message
                </label>
                <textarea
                  className='block w-full p-3 rounded-lg h-40 resize-none outline-none'
                  id='message'
                  name='message'
                  required
                  placeholder='Type message'
                />
              </div>

              <div className='flex justify-center'>
                <button
                  className='bg-red-500 text-white py-2.5 px-[35px] rounded-lg justify-center items-center inline-flex'
                  type='submit'
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default contact;
