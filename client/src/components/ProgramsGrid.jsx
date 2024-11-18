import {  SimpleGrid } from "@mantine/core";
import eachone from '../assets/eachone.png'
import joyone from '../assets/joylogo.png'
import ogod from '../assets/Ogod_logo.png'
import yuva from '../assets/Yuvotsavaalu.png'
import Program from "./Program";
import p1 from '../assets/p1.png'
import p2 from '../assets/p2.png'
import p3 from '../assets/p3.png'
import p4 from '../assets/p4.png'
import p5 from '../assets/p5.png'
import p6 from '../assets/p6.png'
import p7 from '../assets/p7.png'

const programs = [
  {
    id: 1,
    title: 'PEP',
    description: 'Personal Enhancement Programmes',
    imageUrl: p1, // Replace with the actual path to the PEP image
    hoverColor: '#a2d5f2', // Example hover color, replace with actual color
  },
  {
    id: 2,
    title: 'MAGIC',
    description: 'Men & Women Aiming at Greater Initiatives for Change',
    imageUrl: p2, // Replace with the actual path to the MAGIC image
    hoverColor: '#fcbad3', // Example hover color, replace with actual color
  },
  {
    id: 3,
    title: 'MuST',
    description: 'Multi Skill Training',
    imageUrl: p3, // Replace with the actual path to the MuST image
    hoverColor: '#ffffd1', // Example hover color, replace with actual color
  },
  {
    id: 4,
    title: 'SS',
    description: 'Summer Shapes',
    imageUrl: p4, // Replace with the actual path to the SS image
    hoverColor: '#c1e1c5', // Example hover color, replace with actual color
  },
  {
    id: 5,
    title: 'Yuvaotsavaalu',
    description: 'YES-I\'s Youth Festival',
    imageUrl: p5, // Replace with the actual path to the Yuvaotsavaalu image
    hoverColor: '#beebe9', // Example hover color, replace with actual color
  },
  {
    id: 6,
    title: 'VIP',
    description: 'Voluntary Immersion Programme',
    imageUrl: p6, // Replace with the actual path to the VIP image
    hoverColor: '#fde2e4', // Example hover color, replace with actual color
  },
  {
    id: 7,
    title: 'SSP',
    description: 'Scholar support Programme',
    imageUrl: p7, // Replace with the actual path to the VIP image
    hoverColor: '#fde2e4', // Example hover color, replace with actual color
  },{
    id: 8,
    title: 'EOTT',
    description: 'Each One Teach Ten',
    imageUrl: eachone, // Replace with the actual path to the VIP image
    hoverColor: '#fde2e4', // Example hover color, replace with actual color
  },{
    id: 9,
    title: 'JOY',
    description: 'Jobs For Youth Desk',
    imageUrl: joyone, // Replace with the actual path to the VIP image
    hoverColor: '#fde2e4', // Example hover color, replace with actual color
  },{
    id: 10,
    title: 'O GOD',
    description: 'Organised GOD Oriented Days',
    imageUrl: ogod, // Replace with the actual path to the VIP image
    hoverColor: '#fde2e4', // Example hover color, replace with actual color
  },{
    id: 10,
    title: 'YUVA',
    description: 'Yuvotsavaalu',
    imageUrl: yuva, // Replace with the actual path to the VIP image
    hoverColor: '#fde2e4', // Example hover color, replace with actual color
  },
];


export default function ProgramsGrid() {
  return (
    <div>
        
          <SimpleGrid cols={{ base: 1, md: 4 }} spacing={25}>
          {programs.map((item,index)=>{
            return (
                <Program key={item.id} title={item.title} desc={item.description} poster={item.imageUrl} eventnum={index + 1}/> 
            )
          })}
              </SimpleGrid>
        </div>
  );
}