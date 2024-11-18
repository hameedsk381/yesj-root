import React from "react";
import StoryMap from "./StoryMap";
import textbackground from "../assets/text-background.png"
import FeaturedStories from "./FeaturedStories";

const locations = [
  {
    position: [16.50879740194773, 80.65869949766015],
    title: "Andhra Loyola",
    description: "Clean Water Project",
  },
  {
    position: [16.50921728801926, 80.64798418231874],
    title: "Christ The King",
    description: "School Building Project",
  },
  // Add more locations here...
];

const SuccessStories = () => {
  return (
    <section className=" py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-rose-600" style={{ backgroundImage: `url(${textbackground})`, backgroundClip:"text", color:'transparent'}}>
          Success Stories
        </h2>
        <div className="mb-12">
          <StoryMap locations={locations} />
        </div>
        {/* <FeaturedStories /> */}
      </div>
    </section>
  );
};

export default SuccessStories;
