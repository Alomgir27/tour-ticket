import Container from "@/components/Layout/Container";

const terms = () => {
  return (
    <Container>
      <div className='grid grid-cols-4'>
        <div className='col-span-1 mr-10'>
          {/* Side panel */}
          <h1 className='text-3xl font-semibold'>Terms & Condition</h1>

          <p className='text-sm font-semibold my-2 px-2 py-2 rounded-md'>
            <a href='privacy'> Privacy Policy </a>
          </p>
          <p className='text-sm font-semibold my-2 px-2 py-2 rounded-md bg-blue-50'>
            <a href='terms'> Terms and Condition</a>
          </p>
          <p className='text-sm font-semibold my-2 px-2 py-2 rounded-md'>
            <a href='cookies'> Cookie Policy </a>
          </p>
        </div>

        <div className='col-span-3 px-4'>
          <h1 className='text-2xl font-semibold mb-8'>Terms and Condition</h1>
          <p className='font-light mb-8'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default terms;
