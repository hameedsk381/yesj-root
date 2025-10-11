import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import echoes1 from '../assets/echoes/ECHOESI.jpg'
import echoes2 from '../assets/echoes/ECHOESII.jpg';
import echoes3 from '../assets/echoes/ECHOESIII.jpg';
import echoes4 from '../assets/echoes/ECHOESIV.jpg';
import echoes5 from '../assets/echoes/ECHOESV.jpg';
import echoes6 from '../assets/echoes/ECHOESVI.jpg';
// import echoes7 from '../assets/echoes/ECHOESVII.jpg';
// import echoes8 from '../assets/echoes/ECHOESVIII.jpg';
import echoes9 from '../assets/echoes/ECHOESIX.jpg';
import echoes10 from '../assets/echoes/ECHOESX.jpg';
import echoes11 from '../assets/echoes/ECHOESXI.jpg';
// import echoes12 from '../assets/echoes/ECHOESXII.jpg';
import echoes13 from '../assets/echoes/ECHOESXIII.jpg';
import echoes14 from '../assets/echoes/ECHOESXIV.jpg';
import bannerprogrammes from "../assets/banner-programmes.jpg"
const YesjEchos = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribed with email:', email);
    setEmail('');
  };

  const books = [
    {
      id: 1,
      title: 'ECHOES-I',
      date: '2016-08-01',
      image: echoes1,
      pdfUrl: 'https://cloud.yesj.in/s/PCocCzBkExGMPSB'
    },
    {
      id: 2,
      title: 'ECHOES-II',
      date: '2016-12-01',
      image: echoes2,
      pdfUrl: 'https://cloud.yesj.in/s/JsY8X8Rkn5tLAsa'
    },
    {
      id: 3,
      title: 'ECHOES-III',
      date: '2017-06-01',
      image: echoes3,
      pdfUrl: 'https://cloud.yesj.in/s/9cHHjm4X65JZbJy'
    },
    {
      id: 4,
      title: 'ECHOES-IV',
      date: '2017-10-01',
      image: echoes4,
      pdfUrl: 'https://cloud.yesj.in/s/25q2DY7tPdL2L8F'
    },
    {
      id: 5,
      title: 'ECHOES-V',
      date: '2018-02-01',
      image: echoes5,
      pdfUrl: 'https://cloud.yesj.in/s/jEdW8QX6CFT2mpJ'
    },
    {
      id: 6,
      title: 'ECHOES-VI',
      date: '2018-06-01',
      image: echoes6,
      pdfUrl: 'https://cloud.yesj.in/s/6SkwwoAjr7TfmDo'
    },
    // {
    //   id: 7,
    //   title: 'ECHOES-VII',
    //   date: '1937-09-22',
    //   image: echoes6,
    //   pdfUrl: 'https://example.com/the-hobbit.pdf'
    // },
    // {
    //   id: 8,
    //   title: 'ECHOES-VIII',
    //   date: '2023-03-22',
    //   image: echoes6,
    //   pdfUrl: 'https://example.com/the-da-vinci-code.pdf'
    // },
    {
      id: 9,
      title: 'ECHOES-IX',
      date: '2023-04-01',
      image: echoes9,
      pdfUrl: 'https://cloud.yesj.in/s/LkH5FBExNpA9e5J'
    },
    {
      id: 10,
      title: 'ECHOES-X',
      date: '2023-07-01',
      image: echoes10,
      pdfUrl: 'https://cloud.yesj.in/s/WjjPgsn4z6E5GTb'
    },
    {
      id: 11,
      title: 'ECHOES-XI',
      date: '2023-10-01',
      image: echoes11,
      pdfUrl: 'https://cloud.yesj.in/s/PeycjmtBmBLZaFK'
    },
    {
      id: 12,
      title: 'ECHOES-XII',
      date: '2024-01-01',
      image: echoes6,
      pdfUrl: 'https://cloud.yesj.in/s/bL39Rt4wqPXJESM'
    },
    {
      id: 13,
      title: 'ECHOES-XIII',
      date: '2024-04-01',
      image: echoes13,
      pdfUrl: 'https://cloud.yesj.in/s/jxQ89BtWCJ64HoP'
    },
  
  ];

  const handleReadBook = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Full-width image */}
      <div className="w-full">
        <img
          src={bannerprogrammes}
          alt="Book Library"
          className="w-full h-full object-fill"
        />
      </div>
      {/* <div className="flex items-center justify-center mt-5">
        <h1 className="text-2xl md:text-4xl text-black font-bold text-center">
          Discover Your Next Great Read
        </h1>
      </div> */}

      {/* Book cards */}
      <div className="container mx-auto p-16 my-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg h-100 shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-50  object-contain"
              />
              <div className="p-4 flex flex-col items-center justify-center">
                <h3 className="text-[1rem] text-center font-semibold mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-4">Published: {book.date}</p>
                <button
                  onClick={() => handleReadBook(book.pdfUrl)}
                  className="bg-gradient-to-r from-red-500 to-blue-600 hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded-md inline-flex justify-center items-center transition duration-300 ease-in-out"
                >
                  <span>Read</span>
                  <FaArrowRight className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter section */}
      <section className="bg-gradient-to-r from-red-500 to-blue-600 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Subscribe to Our Newsletter
          </h2>
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email for newsletter"
              className="flex-grow px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default YesjEchos;
