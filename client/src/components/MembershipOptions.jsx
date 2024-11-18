import React from 'react';

const membershipOptions = [
  {
    type: 'Annual Member',
    fee: '$100/year',
    benefits: [
      'Monthly newsletter',
      'Exclusive event invitations',
      'Special recognition on our website',
    ],
  },
  {
    type: 'Lifetime Member',
    fee: '$1000 one-time',
    benefits: [
      'All benefits of Annual Membership',
      'Lifetime recognition',
      'Priority access to events and programs',
    ],
  },
];

const MembershipOptions = () => {
  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Membership Options</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {membershipOptions.map((option, index) => (
          <div key={index} className=" p-4 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-2">{option.type}</h4>
            <p className="text-2xl font-semibold text-green-600 mb-4">{option.fee}</p>
            <ul className="text-gray-700 list-disc list-inside">
              {option.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembershipOptions;
