import React from 'react';
// import qrCode from 'qr-code.png'; // Make sure to replace with the actual path to your QR code image

const DonationDetails = () => {
  return (
    <div className="container mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Donation Contact Details
      </h2>
      <div className="bg-white shadow-md max-w-[400px] m-auto rounded-lg p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12v.01M12 12v.01M8 12v.01M5 9.75l-.864-.485a2.02 2.02 0 00-2.736 2.736L5 9.75zm0 0l.485-.864a2.02 2.02 0 012.736-2.736L5 9.75zm0 0L5.864 8.25m0 0l2.736-2.736a2.02 2.02 0 012.736 2.736L8.25 8.25zM19.5 9a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">Email</h4>
            <p className="text-gray-700">donate@yesj.in</p>
          </div>
        </div>
        <hr className="border-gray-300" />
        <div className="flex items-center space-x-4">
          <div className="text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a5 5 0 006.94-6.94L21 3M5 5l7 7m0 0v4m0 4h.01" />
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">Phone</h4>
            <p className="text-gray-700">+91 98765 43210</p>
          </div>
        </div>
        {/* <hr className="border-gray-300" />
        <div className="flex items-center space-x-4">
          <div className="text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a3 3 0 00-3-3H6a3 3 0 00-3 3v10a3 3 0 003 3h8a3 3 0 003-3v-2m4-4h-4m0 0l-3-3m3 3l-3 3" />
            </svg>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">UPI ID</h4>
            <p className="text-gray-700">yesj@upi</p>
          </div>
        </div>
        <hr className="border-gray-300" />
        <div className="text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Scan to Donate</h4>
          <img src={'https://quickchart.io/chart?cht=qr&chs=300x300&chl=https%3A%2F%2Fcommentpicker.com%2Fqr-code-generator.php&margin=2'} alt="QR Code" className="mx-auto w-40 h-40" />
        </div> */}
      </div>
    </div>
  );
};

export default DonationDetails;
