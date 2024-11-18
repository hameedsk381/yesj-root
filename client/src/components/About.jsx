import React from 'react';
import { Title, Text, Avatar, Container } from '@mantine/core';
import ourapproach from '../assets/our-approach-icon.png';
import ourgoal from '../assets/our-goals-icon.png';
import ourroots from '../assets/h3.png';
import flexible from '../assets/cont-1.png';
import managementTeam from '../assets/team'; // Assume you have team images in this folder

const management = [
  {
    name: 'Fr Bala Bollineni',
    title: 'Founder & Director',
    image: managementTeam.johndoe, // Assume you have a johndoe.png image in the assets folder
  },
  {
    name: 'Pity parker',
    title: 'Programmes Cordinator',
    image: managementTeam.janesmith, // Assume you have a janesmith.png image in the assets folder
  },
  // Add more team members here...
];

const features = [
  {
    image: ourgoal, // Replace with actual image URL
    title: 'OUR GOAL',
    description: 'To reform our youth to be men and women of Conscience, Compassion, Competence and Commitment and be active agents of change in the society they live in.',
  },
  {
    image: ourapproach, // Replace with actual image URL
    title: 'OUR APPROACH',
    description: 'At YES-J, we value RELATIONSHIPS. We, along with our target groups, want to have a vital relationship with God and His creation.',
  },
  {
    image: ourroots, // Replace with actual image URL
    title: 'OUR ROOTS',
    description: 'We are a part of the Society of Jesus, popularly known as Jesuits, which is an international Religious Order of men within the Catholic Church.',
  },
  {
    image: flexible, // Replace with actual image URL
    title: 'Flexible',
    description: 'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
  },
];

const items = features.map((feature) => (
  <div key={feature.title} className="flex flex-col items-center text-center p-4 bg-white hover:shadow-lg rounded-lg  transition-shadow duration-300">
    <img src={feature.image} alt={feature.title} className="w-12 h-12 mb-4" />
    <h3 className="text-lg font-semibold">{feature.title}</h3>
    <p className="text-gray-600 mt-2">{feature.description}</p>
  </div>
));

const ManagementTeamItem = ({ name, title, image }) => (
  <div className="flex flex-col items-center text-center p-4  rounded-lg  transition-shadow duration-300">
    <Avatar src={image} alt={name} size={120} className="mb-4" />
    <h3 className="text-xl  font-semibold">{name}</h3>
    <p className="text-gray-500 text-sm mt-2">{title}</p>
  </div>
);

const About = () => (
  <Container className="my-10 " size={'xl'}>
    <div className="px-10">
      <h2 className="text-red-500 text-center text-3xl font-bold mb-6">
        YOUTH EMPOWERING SERVICE - JESUITS
      </h2>
      <p className="text-justify text-gray-700 mb-4">
        In India, the Telugu speaking states of Andhra Pradesh and Telangana consist of almost 85 million people of which a vast majority are young. Most of the youth living in rural, semi-urban and urban slum areas encounter the harsh realities of poverty, lack of education, unemployment, casteism, gender discrimination and social inequality. We exist to bring social, psychological, spiritual and practical help to young people in need, irrespective of their caste, religion and social background.
      </p>
      <p className="text-justify text-gray-700 mb-4">
        Youth Empowering Service – Jesuits (YES-J) is one of the ministries of the Andhra Jesuit Province of the Society of Jesuits that serves the needy, young people from Telangana and Andhra Pradesh in India. Young people in our society can not only be the object of formation but could themselves become active agents of change if their energies, aptitudes, and talents are better channeled. We firmly believe that all young people, irrespective of their educational, social, religious, and economic backgrounds, are capable of fulfilling their potential for a better and meaningful life. Unfortunately, due to the unjust social structure in Indian society, lack of opportunities, resources, guidance, and support, many young people are pushed to margins and impoverished life situations.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
        {items}
      </div>
    </div>

    <div className=" p-10 mt-10">
      <h2 className=" text-red-500 text-center text-3xl font-bold mb-6">
        OUR MANAGEMENT TEAM
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {management.map((member) => (
          <ManagementTeamItem key={member.name} {...member} />
        ))}
      </div>
    </div>
    
    <div className="px-10 mt-10">
      <h2 className="text-red-500 text-center text-3xl font-bold mb-6">PURPOSE</h2>
      <p className="text-justify text-gray-700 mb-4">
        Our purpose is to assist in building a just world by transforming the lives of young people. Educating and encouraging them to understand and analyze the socio-economic, cultural and political aspects of society will help to stimulate their conscience to bring in a social commitment to build the Kingdom of God in India and the globalized world.
      </p>
      <p className="text-justify text-gray-700 mb-4">
        We aspire to light the aspirational torch for young people who do not have the resources and the guidance to a better life. We work towards the empowerment of our youth and hope to help them find the purpose and meaning of their lives.
      </p>

      <h2 className="text-red-500 text-center text-3xl font-bold mb-6">PROCESS</h2>
      <p className="text-justify text-gray-700 mb-4">
        With the right resources, support, and training, people can be enabled to solve their own problems. Rather than following random and impulsive approaches, we follow a long-term systematic approach with spiritual, social, psychological, contextual, intellectual and creative integration.
      </p>
      <p className="text-justify text-gray-700 mb-4">
        We follow the praxis of experience, reflection, involvement and transformation. With respect to networking and partnering for our processes, we firmly believe in collaborating with other individuals and organizations who share our values.
      </p>

      <h2 className="text-red-500 text-center text-3xl font-bold mb-6">PROGRAMMES</h2>
      <p className="text-justify text-gray-700 mb-4">
        Through our programmes we empower young people who are attending schools and colleges and even those who have dropped out.
      </p>
      <ul className="list-disc pl-5 text-gray-700 text-justify mb-10">
        <li className="my-2"><strong>PEP</strong> – Personal Enhancement Programmes</li>
        <li className="my-2"><strong>MAGIC</strong> – Men & Women Aiming at Greater Initiatives for Change</li>
        <li className="my-2"><strong>MuST</strong> – Multi Skill Training</li>
        <li className="my-2"><strong>SS</strong> – Summer Shapes</li>
        <li className="my-2"><strong>Yuvoṣṭsavaalu</strong> – YES-J's Youth Festival</li>
        <li className="my-2"><strong>VIIP</strong> – Voluntary Immersion Programme</li>
        <li className="my-2"><strong>SSP</strong> – Scholar Support Programme</li>
      </ul>

      <h2 className="text-red-500 text-center text-3xl font-bold mb-6">PARTNERSHIPS</h2>
      <h5 className=" text-blue-500 uppercase font-extrabold text-xl text-center mb-4">
        YES-J believes: <i>"Alone we can do so little; together we can do so much" – Helen Keller</i>
      </h5>
      <p className="text-justify text-gray-700 mb-4">
        True to our belief, we sincerely welcome opportunities to foster a culture of collaboration, cooperation and partnership with all like-minded individuals, organizations, business houses, governments – across the state and beyond – who would like to join us to encourage, employ and empower young people to say 'YES' to their dreams.
      </p>

      <h2 className="text-red-500 text-center text-3xl font-bold mb-6">PERSEVERANCE</h2>
      <p className="text-justify text-gray-700 mb-4">
        Empowering the youth is a never-ending job. There is always another 'young person' to begin our journey with. We are deeply convinced that this mission of empowering the youth is tough and challenging.
      </p>
      <p className="text-justify text-gray-700 mb-4">
        We are aware of the fact that persevering the effort well, through the strain of youth ministry, is a serious responsibility. We resolve to PERSEVERE with faith, hope and love.
      </p>
    </div>
  </Container>
);

export default About;
