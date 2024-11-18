import React from "react";
import DonationDetails from "./DonationDetails";
import background from "../assets/donate-background.jpg";

const Contribute = () => {
  return (
    <div
      className="min-h-screen  text-gray-900"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* <img src={ourgoals} alt="our goals" /> */}
      {/* Main Section */}
      <main className="container mx-auto py-16 px-4">
        <section className="text-center mb-16">
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Make a Difference Today
          </h1>
          <p className="text-md md:text-lg lg:text-xl text-gray-600 mb-2">
            Your donation can change lives. Every contribution, no matter how
            small, helps us create a better world.
          </p>
        </section>

        {/* Donation Form */}
        {/* <section className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-lg shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-red-500">Donate Now</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor='name'>Name</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded-md" id='name' />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor='email'>Email</label>
              <input type="email" className="w-full p-3 border border-gray-300 rounded-md" id='email' />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor='phoneNumber'>Phone Number</label>
              <input type="tel" className="w-full p-3 border border-gray-300 rounded-md" id='phoneNumber' />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Donation Amount</label>
              <div className="flex flex-wrap gap-3">
                <button type="button" className="flex-1 bg-blue-600 text-white p-3 rounded-md">$10</button>
                <button type="button" className="flex-1 bg-blue-600 text-white p-3 rounded-md">$20</button>
                <button type="button" className="flex-1 bg-blue-600 text-white p-3 rounded-md">$50</button>
                <button type="button" className="flex-1 bg-blue-600 text-white p-3 rounded-md">$100</button>
              </div>
              <input type="number" placeholder="Other Amount" className="w-full mt-3 p-3 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor='paymentDetails'>Payment Details</label>
              <input type="text" placeholder="Card Number" className="w-full p-3 border border-gray-300 rounded-md" id='paymentDetails' />
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2 mt-1" id="donate" />
              <label className="text-gray-700" htmlFor='donate'>Donate anonymously</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2 mt-1" id="subscribe" />
              <label className="text-gray-700" htmlFor='subscribe'>Subscribe to our newsletter</label>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-4 rounded-md font-bold hover:bg-blue-700">Donate</button>
          </form>
        </section> */}
        <DonationDetails />
        {/* Testimonials */}
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gary-9000">
            What Our Donors Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-700">
                "This organization is doing an amazing job!"
              </p>
              <p className="text-gray-900 font-semibold mt-4">- John Doe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-700">
                "I am happy to support such a worthy cause."
              </p>
              <p className="text-gray-900 font-semibold mt-4">- Jane Smith</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-700">
                "Making a donation was easy and the impact is visible."
              </p>
              <p className="text-gray-900 font-semibold mt-4">
                - Emily Johnson
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contribute;
