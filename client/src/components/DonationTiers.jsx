import React from 'react';

const tiers = [
  {
    level: 'Bronze',
    amount: '$50',
    description: 'Supports basic supplies for our projects.',
  },
  {
    level: 'Silver',
    amount: '$100',
    description: 'Helps fund community outreach programs.',
  },
  {
    level: 'Gold',
    amount: '$500',
    description: 'Provides substantial support for our key initiatives.',
  },
  {
    level: 'Platinum',
    amount: '$1000',
    description: 'Enables us to launch new projects and expand our reach.',
  },
];

const DonationTiers = () => {
  return (
    <div className="bg-gray-100 p-8 mb-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-4">Donation Tiers</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tiers.map((tier, index) => (
          <div key={index} className=" p-4 rounded-lg shadow-md">
            <h4 className="text-xl font-bold mb-2">{tier.level}</h4>
            <p className="text-2xl font-semibold text-blue-600 mb-4">{tier.amount}</p>
            <p className="text-gray-700">{tier.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationTiers;
