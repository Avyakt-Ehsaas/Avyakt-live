import React from "react";
import Mandala from '../../assets/images/Mandala.png'
import './gridPattern.css'

const RootedSection = () => {
  return (
    <section className="relative w-full min-h-screen md:min-h-[600px] py-20 bg-white overflow-hidden">
    <div className="absolute inset-0 grid-pattern grid-fade-top pointer-events-none z-0 opacity-50" />

    <div className="pt-[1.2rem]">
      {/* Background Mandala */}
      <div className="inset-0 flex justify-center items-start pointer-events-none">
        <img
          src={Mandala} 
          alt="mandala"
          className="w-[360px] md:w-[600px] "
        />
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto text-center px-6">
        
        {/* Heading */}
        <h1 className="font-season-medium text-primary leading-[40px] md:leading-[70px] heading-main font-med">
          Rooted in an Indian understanding of <br />
          awareness
        </h1>

        {/* Description */}
        <p className="mt-1 text-primary paragraph-body font-dm font-med md:leading-[30px] max-w-5xl mx-auto px-4 md:px-0">
          The word Avyakt refers to what is subtle or not yet expressed. Ehsaas
          means awareness or feeling. India has a long tradition of studying the
          mind through direct observation. Avyakt draws from that sensibility
          while presenting meditation in a secular, practical form.
        </p>

        {/* Bottom Section */}
        <div className=" mt-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
          
          {/* Avyakt */}
          <div className="text-center">
            <h3 className="text-greenbase heading-large font-season font-med">Avyakt</h3>
            <p className="text-primary subheading mt-1  font-dm">
              The subtle, unexpressed
            </p>
          </div>

          {/* Plus */}
          <div className="text-greenbase heading-large font-smbold">+</div>

          {/* Ehsaas */}
          <div className="text-center">
            <h3 className="text-greenbase heading-large font-season font-med">Ehsaas</h3>
            <p className="text-primary subheading mt-1 font-dm">
              Awareness, felt experience
            </p>
          </div>

        </div>
            </div>
      </div>
    </section>
  );
};

export default RootedSection;