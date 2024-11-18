import React from "react";
import { motion } from "framer-motion";
import textbackground from "../assets/text-background.png"
import Program from "./Program";
import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import p3 from "../assets/p3.png";
import p4 from "../assets/p4.png";
import p5 from "../assets/p5.png";
import p6 from "../assets/p6.png";
import p7 from "../assets/p7.png";

const programs = [
  {
    id: 1,
    title: "PEP",
    description: "Personal Enhancement Programmes",
    imageUrl: p1, // Replace with the actual path to the PEP image
    hoverColor: "#a2d5f2", // Example hover color, replace with actual color
  },
  {
    id: 2,
    title: "MAGIC",
    description: "Men & Women Aiming at Greater Initiatives for Change",
    imageUrl: p2, // Replace with the actual path to the MAGIC image
    hoverColor: "#fcbad3", // Example hover color, replace with actual color
  },
  {
    id: 3,
    title: "MuST",
    description: "Multi Skill Training",
    imageUrl: p3, // Replace with the actual path to the MuST image
    hoverColor: "#ffffd1", // Example hover color, replace with actual color
  },
  {
    id: 4,
    title: "SS",
    description: "Summer Shapes",
    imageUrl: p4, // Replace with the actual path to the SS image
    hoverColor: "#c1e1c5", // Example hover color, replace with actual color
  },
  {
    id: 5,
    title: "Yuvaotsavaalu",
    description: "YES-I's Youth Festival",
    imageUrl: p5, // Replace with the actual path to the Yuvaotsavaalu image
    hoverColor: "#beebe9", // Example hover color, replace with actual color
  },
  {
    id: 6,
    title: "VIP",
    description: "Voluntary Immersion Programme",
    imageUrl: p6, // Replace with the actual path to the VIP image
    hoverColor: "#fde2e4", // Example hover color, replace with actual color
  },
  {
    id: 7,
    title: "SSP",
    description: "Scholar Support Programme",
    imageUrl: p7, // Replace with the actual path to the VIP image
    hoverColor: "#fde2e4", // Example hover color, replace with actual color
  },
];

const DynamicProgrammes = () => {
  return (
    <section
      className="py-16 bg-[#f9fafc]"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl text-rose-600 font-bold mb-12" style={{ backgroundImage: `url(${textbackground})`, backgroundClip:"text", color:'transparent'}}>
          Our Programmes
        </h2>
        <div className="relative">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {programs.map((item, index) => (
              <Program
                key={item.id}
                title={item.title}
                desc={item.description}
                poster={item.imageUrl}
                eventnum={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicProgrammes;
