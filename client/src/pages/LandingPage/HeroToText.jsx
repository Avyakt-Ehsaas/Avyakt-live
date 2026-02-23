import React ,{useRef ,useState ,useEffect}from "react";
import { Typewriter } from "../../components/ui/TypeWriter";
import "./HeroText.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroText = () => {
  const avyaktText = [
    "अव्यक्त-अहसास",
    "অব্যক্ত এহসাস",
    "અવ્યક્ત એહસાસ",
    "அவ்யக்த் எஹ்ஸாஸ்",
    "అవ్యక్త్ ఎహ్సాస్",
    "അവ്യക്ത് എഹ്സാസ്",
    "اویکت احساس",
    "অৱ্যক্ত এহসাস",
    "Avyakt Ahsaas",
  ];

    const textRef = useRef(null);
    const [startTyping, setStartTyping] = useState(false);

 useEffect(() => {
    const el = textRef.current;
    gsap.fromTo(
      el,
      {
        scale: 20,       
        opacity: 0,
      },
      {
        scale: 1,        
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 10%",
          end: "bottom 150%",
          scrub: true,   
           onLeave: () => {
            setStartTyping(true);
          },
          onLeaveBack: () => {
            setStartTyping(true);
          },
        },
        
      }
    );
  }, []); 

   return (
    <div className="py-[18rem] h-[60vh] md:h-[70vh] flex items-center justify-center bg-white overflow-hidden">
      <div className="text-center w-[732px]">
        <h1 
        ref={textRef}
        className="text-2xl md:text-6xl font-semibold z-50 text-[#191919] tracking-tight">
          Introducing
        </h1>

        <h2 className="text-3xl text-greenbase md:text-5xl mt-[3rem]">
         {startTyping && <Typewriter texts={avyaktText} />}
        </h2>
      </div>
    </div>
  );
};

export default HeroText;
