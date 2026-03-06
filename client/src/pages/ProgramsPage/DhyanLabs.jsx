import React from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer, Bar, BarChart ,Cell} from "recharts";



const ScoreCard = ({ value, label, color }) => {
    const data = [{ value }];
    

    return (
        <div className="bg-[#FFFFFF] rounded-3xl p-8 w-[180px] flex flex-col items-center justify-center shadow-sm">

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
                    dataKey="value"
                    fill={color}
                    cornerRadius={20}
                />
            </RadialBarChart>

            <div className="text-[18px] font-dm font-medium -mt-16">
                {value}%
            </div>

            <p className="text-gray-500 text-[18px] font-dm mt-10" style={{ fontWeight: 500 }}>
                {label}
            </p>

        </div>
    );
};

function DhyanLabs() {
    const BarData = [
        { value: 20 },
        { value: 40 },
        { value: 10 },
        { value: 50 },
        { value: 30 },
        { value: 22 },
        {value: 20}
    ];

    const colors = [
        "#EDFDE9",
        "#CAE5C2",
        "#6DAA60",
        "#BDDBB4",
        "#B6DFAB",
        "#75A268",
        "#71AC61"

    ];
    return (
        <section className="w-fit py-24 flex flex-col items-center px-6">

            <h1 className="font-[580] text-[56px] font-season-medium text-center leading-[70px]">
                Build a report card for your
                <span className="text-greenbase"> Mental Health</span>
            </h1>

            <p className="text-center font-dm text-[20px] text-primary leading-[30px]">
                Through Cognitive Labs, students explore attention, memory, emotions,
                and focus using real experiments and guided observation.
            </p>

            <div className="grid md:grid-cols-[40%_60%] gap-8 mt-7 max-w-7xl w-full">

                {/* LEFT CARD */}
                <div className="bg-white rounded-3xl p-8 shadow-lg">

                    <h3 className="font-medium text-2xl font-dm ">
                        Brain Data Card
                    </h3>

                    <p className="text-gray-500 text-[16px] mb-6 font-dm">
                        Real-time student metrics
                    </p>

                    {/* Score Cards */}
                    <div className="flex justify-around gap-6 mb-8">

                        <ScoreCard
                            value={85}
                            label="Focus Score"
                            color="#A9C9A3"
                        />

                        <ScoreCard
                            value={92}
                            label="Calm Score"
                            color="#6DAA5E"
                        />

                    </div>


                    {/* Streak */}
                    <div className="flex justify-between mb-4 font-dm">
                        <p className="text-[18px]" style={{fontWeight:500}}>Consistency Streak</p>
                        <p className="font-semibold">14 Days</p>
                    </div>



                        <div className="h-35">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={BarData}>
                                    <Bar dataKey="value" radius={[4,4 , 4, 4]}>
                                        {BarData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={colors[index]} />
                                                    ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                  


                    <p className="text-gray-400 text-[16px] mt-6 font-dm">
                        “Each student builds a personal brain data card over time”
                    </p>

                </div>


                {/* RIGHT CARD */}
                <div className="border border-red-500 rounded-3xl p-6">
                    60%
                </div>

            </div>

        </section>
    );
}

export default DhyanLabs;