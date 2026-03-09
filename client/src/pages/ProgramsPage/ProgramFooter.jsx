import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { CheckCircle, TrendingUp, Heart, ShieldCheck, Brain } from "lucide-react";
import FullCTA from '../../assets/images/FullCTA.png'
import DarkLogo from "../../assets/images/LogoDark.svg";
import avyaktFooter from '../../assets/images/avyaktFooterWatermark.svg';

import {
    BarChart,
    Bar,
    PolarAngleAxis,
    ResponsiveContainer,
    Cell,
    RadialBarChart,
    RadialBar,
    XAxis,
    YAxis,
} from "recharts";


const ScoreCard = ({ value, color }) => {
    const data = [{ value }];
    return (
        <div>
            <RadialBarChart
                width={100}
                height={100}
                innerRadius="70%"
                outerRadius="100%"
                data={data}
                startAngle={180}
                endAngle={-180}
            >
                <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    tick={false}
                />

                <RadialBar
                    animationDuration={1200}
                    dataKey="value"
                    fill={color}
                    cornerRadius={20}
                />
            </RadialBarChart>

            <div className="text-[18px] font-dm font-medium -mt-16 ml-8">
                {value}%
            </div>
        </div>
    );
};




const ProgramFooter = () => {
    //teacher barchart
    const data = [
        { value: 30 },
        { value: 55 },
        { value: 35 },
        { value: 70 },
        { value: 60 },
        { value: 50 },
        { value: 35 },
    ];

    const colors = [
        "#EDFDE9",
        "#CAE5C2",
        "#A4C39C",
        "#BDDBB4",
        "#B6DFAB",
        "#75A268",
        "#71AC61",
    ];

    //admin radial chart 
    const adminData = [
        {
            name: "Participation",
            value: 92,
            fill: "#6DAA60",
        }
    ];

    //student data
    const studentData = [
        {
            name: "Focus",
            value: 88
        }
    ];


    return (
        <>
            <section
                className="relative z-10 w-full min-h-screen flex flex-col gap-50 items-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${FullCTA})` }}
            >
                {/* Overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 15%, rgba(255,255,255,0.6) 35%, rgba(255,255,255,0) 60%)",
                    }}
                />
                {/* Bottom Overlay */}
                <div
                    className="absolute bottom-0 left-0 w-full h-[480px] pointer-events-none z-0"
                    style={{
                        background:
                            "linear-gradient(360deg, rgba(244,249,244,1) 0%, rgba(244,249,244,0.85) 10%, transparent 100%)",
                    }}
                />
                <div className='flex flex-col gap-20'>
                    {/* Blog Section */}
                    <div className="relative z-10 mx-auto w-full max-w-[1100px] flex flex-col justify-between h-full py-28">
                        {/* Heading */}
                        <div >
                            <h2 className="text-center text-2xl sm:text-4xl md:text-5xl font-medium text-[#191919] leading-tight">
                                Tracking Growth beyond Classroom
                            </h2>
                            <p className="mt-2 text-[18px] font-medium text-center text-primary font-dm">
                                Through Cognitive Labs, students explore attention, memory, emotions, and focus using real experiments and guided observation.
                            </p>
                        </div>
                        {/* TOP ROW */}
                        <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center">
                            {/* Dashboard Cards */}
                            <div className="grid md:grid-cols-4 gap-6 mt-8 max-w-7xl w-full">
                                {/* Student Dashboard */}
                                <div className="bg-white rounded-2xl shadow p-6">
                                    <div>
                                        <h2>

                                        </h2>
                                        <p className="text-[18px] leading-[30px] text-primary font-dm" style={{ fontWeight: 600 }}>Student Dashboard</p>
                                        <p className="text-[#696969] text-[16px] mb-5 font-dm">Daily wellness pulse</p></div>

                                    <div className="flex justify-between text-sm mb-2">
                                        <span className='text-primary font-dm'>Focus Score</span>
                                        <span className="font-semibold font-dm">88%</span>
                                    </div>
                                    <div className="h-[14px] w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart
                                                data={studentData}
                                                layout="vertical"
                                                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                                            >
                                                <XAxis type="number" hide domain={[0, 100]} />
                                                <YAxis type="category" hide dataKey="name" />

                                                <Bar
                                                animationDuration={1200}
                                                    dataKey="value"
                                                    fill="#6DAA60"
                                                    radius={[10, 10, 10, 10]}
                                                    barSize={10}
                                                    background={{ fill: "#E5E7EB", radius: 10 }}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                {/* Parents Dashboard */}
                                <div className="bg-white rounded-2xl shadow p-6">
                                    <p className="text-[18px] leading-[30px] text-primary font-dm" style={{ fontWeight: 600 }}>Parents Dashboard</p>
                                    <p className="text-[#696969] text-[16px] mb-5 font-dm">Daily wellness pulse</p>
                                    <div className="flex items-center gap-2 text-primary text-[16px] bg-gray-50 p-2 rounded-lg mb-2">
                                        <CheckCircle size={16} className="text-greenbase" />
                                        Daily practice: 5/7 Days
                                    </div>
                                    <div className="flex items-center text-primary gap-2 text-[16px] bg-gray-50 p-2 rounded-lg">
                                        <TrendingUp size={16} className="text-greenbase" />
                                        Consistency: Improved
                                    </div>
                                </div>
                                {/* Teacher Dashboard */}
                                <div className="bg-white rounded-2xl shadow p-6">
                                    <p className="text-[18px] leading-[30px] text-primary font-dm" style={{ fontWeight: 600 }}>Teacher Dashboard</p>
                                    <p className="text-[#696969] text-[16px] mb-5 pr-4 font-dm">
                                        Classroom emotional climate
                                    </p>
                                    <div className="h-[70px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={data}>
                                                <Bar  
                                                animationDuration={1200}
                                                 dataKey="value" radius={[4, 4, 4, 4]}>
                                                    {data.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={colors[index]} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="bg-white rounded-2xl shadow p-6">
                                    <p className="text-[18px] leading-[30px] text-primary font-dm" style={{ fontWeight: 600 }}>Admin Dashboard</p>
                                    <p className="text-[#696969] text-[16px] mb-2 font-dm">Whole school wellness</p>

                                    <div className="flex flex-row gap-4 items-center ">

                                        <ScoreCard
                                            value={92}
                                            color="#71Ac61"
                                        />

                                        <div className="text-sm font-dm mt-8">
                                            <p className="font-semibold">Participation</p>
                                            <p className="text-primary ">High (4%)</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                       {/* BOTTOM CARD */}
<div className="flex justify-center px-3 pb-4">

  {/* NEP Section */}
  <div className="bg-[#F5F2ED] rounded-3xl p-4 mt-8 max-w-7xl w-full">

    <h2 className="text-[34px] font-medium leading-[40px] font-season">
      Aligned with <span className="text-greenbase">NEP 2020</span> Guidelines
    </h2>

    <p className="text-primary font-dm leading-[20px] mt-1 max-w-2xl">
      Avyakt fulfills the mandate for mandatory socio-emotional learning in Indian schools.
    </p>

    <div className="grid md:grid-cols-2 gap-8 mt-8">

      <div className="flex gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <Brain className="text-greenbase w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-[18px] leading-[20px] font-dm">Holistic Development</h4>
          <p className="text-[#696969] text-[16px] leading-[20px] font-dm mt-1">
            Nurturing mind, body, and spirit beyond academics.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <Heart fill='#71AC6C' className="text-greenbase w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-[18px] leading-[20px] font-dm">Socio-emotional Learning</h4>
          <p className="text-[#696969] text-[16px] leading-[20px] font-dm mt-1">
            Building empathy, resilience, and emotional intelligence.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <ShieldCheck  className="text-greenbase w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-[18px] leading-[20px] font-dm">Ethical Reasoning</h4>
          <p className="text-[#696969] text-[16px] leading-[20px] font-dm mt-1">
            Fostering value-based decision making in students.
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <Brain className="text-greenbase w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-[18px] leading-[20px] font-dm">Mental Wellbeing</h4>
          <p className="text-[#696969] text-[16px] leading-[20px] font-dm mt-1">
            Providing tools for stress management and focus.
          </p>
        </div>
      </div>

    </div>
  </div>

</div>

                    </div>

                    {/* CTA Footer */}
                    <div className='min-h-screen relative text-white text-center flex flex-col items-center justify-center gap-20 px-4'>

                        <div className=''>
                            {/* Heading */}
                            <h1 className="font-season-medium text-4xl md:text-5xl  font-medium mb-4 tracking-wide">
                                Mindfulness for every stage of life.
                            </h1>

                            {/* Subtext */}
                            <p className="max-w-5xl font-dm text-white mb-8 text-lg leading-[30px]">
                                Sign up to receive simple and effective meditation, yoga, and other wellness tips from experts with decades of experience. Occasionally, we’ll let you know about our upcoming retreats, too.
                            </p>

                            <div className="flex flex-col items-center">
                                <form>
                                    {/* Form Row 1 */}
                                    <div className="flex flex-col md:flex-row gap-4 w-xl max-w-2xl">
                                        <input
                                            type="text"
                                            placeholder="First Name"
                                            className="px-5 py-3 rounded-full font-dm font-medium bg-white text-primary w-full outline-none placeholder-[#191919]"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            className="px-5 py-3 rounded-full font-dm font-medium bg-white text-primary w-full outline-none placeholder-[#191919]"
                                        />
                                    </div>

                                    {/* Form Row 2 */}
                                    <div className="flex flex-col md:flex-row gap-4 w-xl max-w-2xl mt-4">
                                        <input
                                            type="email"
                                            placeholder={`Enter your Email `}
                                            className="px-5 py-3 rounded-full font-dm font-medium bg-white text-primary w-full outline-none placeholder-[#191919]"
                                            required
                                        />
                                    </div>
                                    <div className="h-20 flex items-center justify-center mt-4 ml-3">
                                        <button className="bg-[#71AC61] font-dm hover:scale-105 hover:text-medium transition px-8 py-3 rounded-full font-medium whitespace-nowrap">
                                            Sign up
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>




                        <div className=''>
                            {/* Footer */}
                            <div className="w-6xl flex flex-col gap-10 items-center">

                                <div className="flex justify-center gap-16 mb-4 w-20">
                                    <img src={DarkLogo} alt="Dark logo " className="text-sm" />
                                </div>

                                <div className="flex justify-center gap-16">
                                    {/* Nav */}
                                    <div className="flex justify-center text-[#191919]  font-dm font-semibold gap-8 md:gap-24 text-xs md:text-sm mb-6 flex-wrap tracking-wide">
                                        <a href="#" className="hover:text-[#71AC61]">HOME</a>
                                        <a href="#" className="hover:text-[#71AC61]">THE SCIENCE</a>
                                        <a href="#" className="hover:text-[#71AC61]">PROGRAMS</a>
                                        <a href="#" className="hover:text-[#71AC61]">ABOUT</a>
                                        <a href="#" className="hover:text-[#71AC61]">CONTACT</a>
                                        <a href="#" className="hover:text-[#71AC61]">BLOG</a>
                                    </div>

                                    {/* Social Icons */}
                                    <div className="flex gap-6 mb-3 text-xl text-[#191919] ">
                                        <FaYoutube className="cursor-pointer hover:text-[#71AC61]" />
                                        <FaFacebookF className="cursor-pointer hover:text-[#71AC61]" />
                                        <FaTwitter className="cursor-pointer hover:text-[#71AC61]" />
                                        <FaInstagram className="cursor-pointer hover:text-[#71AC61]" />
                                        <FaLinkedinIn className="cursor-pointer hover:text-[#71AC61]" />
                                    </div>
                                </div>

                                {/* Copyright */}
                                <p className="text-[16px] font-dm mb-8 text-[#191919] tracking-wide">
                                    Avyakt©2026. All rights reserved.
                                </p>
                            </div>
                            <div>
                                <img src={avyaktFooter} alt="Avyakt Footer Logo" className="w-full -z-10 absolute bottom-0 left-1/2 transform -translate-x-1/2" />
                            </div>
                        </div>

                    </div>

                </div>
            </section>
        </>
    )
}

export default ProgramFooter