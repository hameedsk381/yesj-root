import { Text, Paper, Button, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import purpose from "../assets/purpose.png";
import { StylizedImage } from "./styliedImage";
import { FadeIn } from "./FadeIn";
const DonationBanner = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Paper
      px={"10%"}
      py={isMobile ? "5%" : "3%"}
      style={{
        display: "flex",
        flexDirection: isMobile ? "column-reverse" : "row",
        alignItems: "center",
        gap:'50px',
        backgroundColor: "transparent",
        // backgroundImage: "url('https://salient.tailwindui.com/_next/static/media/background-faqs.55d2e36a.jpg')",
        // backgroundSize: "cover" ,
        // background: 'linear-gradient(135deg, #ff8a00 0%, #e52e71 100%)',
      }}
    >
      <div className="flex flex-col "
      >
        <h1 className="font-bold text-2xl text-center w-full text-rose-500">
          DONATE TO TRANSFORM
        </h1>
        <p className="text-gray-700" style={{ margin: "1em 0",justifyContent:'center' ,textAlign:'center'}}>
          Transform a young life today. Every donation helps break the cycle of poverty, giving underprivileged youth not just hope, but the tools, education, and mentorship they need to build their dreams. Your support doesn't just change their tomorrow—it empowers an entire generation to rise, lead, and create lasting change in our communities.
        </p>
       
        <button
          className="w-fit font-bold text-md px-3 py-2 rounded bg-rose-500 text-white"
          size="md"
          style={{ margin: "auto" }}
        >
          JOIN US
        </button>
      </div>

      <div>
        {/* <Image
          src={purpose} // replace with your actual image source
          alt="Community Center Floor Plan"
          fit="cover"
          style={{ borderRadius: '5px' }}
        /> */}
        <FadeIn className="md:w-[22rem] lg:w-[28em] w-[250px] flex-none">
          <StylizedImage
            src="https://img.freepik.com/free-photo/person-giving-chocolate-pieces-foil-wooden-backdrop_23-2147890176.jpg?t=st=1731562644~exp=1731566244~hmac=f705bc4986eccd44ca8dc410cada7e3aacd120da9dfb83f1a8f6a2f90c128c2f&w=1060"
            className="justify-center"
          />
        </FadeIn>
      </div>
    </Paper>
  );
};

export default DonationBanner;
