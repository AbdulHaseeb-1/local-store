import React from 'react';
import { FaShieldAlt, FaTruck, FaUndo } from 'react-icons/fa';

function ServicesSection() {
  const services = [
    {
      id: 1,
      title: 'Fast and Free Delivery',
      description: 'Enjoy quick and hassle-free shipping on all orders.',
      icon: <FaTruck className="text-4xl text-blue-500 mb-4" />,
    },
    {
      id: 2,
      title: 'Easy Returns',
      description: 'Return items within 30 days for a full refund.',
      icon: <FaUndo className="text-4xl text-green-500 mb-4" />,
    },
    {
      id: 3,
      title: 'Secure Payments',
      description: 'Safe and secure payment options.',
      icon: <FaShieldAlt className="text-4xl text-yellow-500 mb-4" />,
    },
  ];

  return (
    <section className="py-16 dark:bg-background bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center dark:text-gray-50 text-gray-800 mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-6 border  rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 bg-white dark:bg-neutral-800 text-center"
            >
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-2xl font-semibold dark:text-gray-50 text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-500">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
