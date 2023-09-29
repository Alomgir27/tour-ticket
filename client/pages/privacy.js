import Container from "@/components/Layout/Container";

const privacy = () => {
  return (
    <Container>
      <div className='grid grid-cols-4'>
        <div className='col-span-1 mr-10'>
          {/* Side panel */}
          <h1 className='text-3xl font-semibold'>Terms & Condition</h1>

          <p className='text-sm font-semibold my-2 px-2 py-2 rounded-md bg-blue-50'>
            <a href='privacy'> Privacy Policy </a>
          </p>
          <p className='text-sm font-semibold my-2 px-2 py-2 rounded-md'>
            <a href='terms'> Terms and Condition </a>
          </p>
          <p className='text-sm font-semibold my-2 px-2 py-2 rounded-md'>
            <a href='cookies'> Cookie Policy </a>
          </p>
        </div>

        <div className='col-span-3 px-4'>
          {/* Privacy Description */}

          <h1 className='text-2xl font-semibold mb-8'>Privacy Policy</h1>
          <p className='font-light mb-8'>
            At Coure Tours, we value your privacy and are committed to
            protecting your personal information. This Privacy Policy outlines
            how we collect, use, disclose, and safeguard your data when you
            interact with our website, book our services, or engage with us in
            any other way. By accessing our services, you consent to the
            practices described in this policy.
          </p>

          <h1 className='text-xl font-semibold mb-4'>Information We Collect</h1>
          <p className='font-light mb-8'>
            <ul className='list-disc pl-6'>
              <li>
                Personal Information: We may collect personal information such
                as your name, email address, phone number, postal address, and
                payment details when you book a tour or subscribe to our
                newsletter.
              </li>
              <li>
                Usage Information: We automatically collect certain information
                about your interaction with our website, including IP addresses,
                browser type, device information, and pages visited.
              </li>
              <li>
                Cookies and Similar Technologies: We use cookies and similar
                technologies to enhance your browsing experience and gather data
                about how you use our website.
              </li>
            </ul>
          </p>

          <h1 className='text-xl font-semibold mb-4'>
            How We Use Your Information:
          </h1>
          <p className='font-light mb-8'>
            <ul className='list-disc pl-6'>
              <li>
                Providing Services: We use your personal information to process
                bookings, fulfill requests, and deliver the services you have
                requested from us.
              </li>
              <li>
                Communication: We may use your contact information to send you
                booking confirmations, important updates, newsletters, and
                marketing communications (where permitted by law). You can
                opt-out of marketing communications at any time.
              </li>
              <li>
                Improving our Services: We analyze usage data to enhance our
                website, services, and customer experience.
              </li>
              <li>
                Legal Compliance: We may use your information to comply with
                legal obligations or respond to lawful requests from public
                authorities.
              </li>
            </ul>
          </p>

          <h1 className='text-xl font-semibold mb-4'>
            Sharing Your Information
          </h1>
          <p className='font-light mb-8'>
            <ul className='list-disc pl-6'>
              <li>
                Third-party Service Providers: We may share your information
                with trusted third-party service providers who assist us in
                delivering our services, such as payment processors and tour
                operators.
              </li>
              <li>
                Legal Requirements: We may share your information to comply with
                applicable laws, regulations, or legal processes.
              </li>
              <li>
                Business Transfers: In the event of a merger, acquisition, or
                sale of all or a portion of our assets, your information may be
                transferred to the acquiring entity.
              </li>
            </ul>
          </p>

          <h1 className='text-xl font-semibold mb-4'>Data Security</h1>
          <p className='font-light mb-8'>
            We implement reasonable security measures to protect your personal
            information from unauthorized access, disclosure, or destruction.
            However, no data transmission over the internet or electronic
            storage is entirely secure, and we cannot guarantee absolute
            security
          </p>

          <h1 className='text-xl font-semibold mb-4'>Your Choices</h1>
          <p className='font-light mb-8'>
            <ul className='list-disc pl-6'>
              <li>
                Access and Correction: You have the right to access and correct
                your personal information held by us. Please contact us if you
                wish to exercise this right.
              </li>
              <li>
                Opt-out: You can opt-out of marketing communications by
                following the instructions in our emails or contacting us
                directly.
              </li>
              <li>
                Cookies: You can manage your cookie preferences through your web
                browser settings.
              </li>
            </ul>
          </p>

          <h1 className='text-xl font-semibold mb-4'>Children's Privacy</h1>
          <p className='font-light mb-8'>
            Our services are not directed to individuals under the age of 18. If
            you are a parent or guardian and believe your child has provided
            personal information to us, please contact us, and we will take
            appropriate steps to remove that information.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default privacy;
