import React from 'react'

const DhyanLabs = ({data}) => {
    console.log(data)
  return (
    <>
        <div className="bg-yellow-100 min-h-screen ">
                <h1 className='text-center text-5xl'>hello</h1>
              <div className="flex flex-wrap gap-4 justify-center mt-4">
                  {data.cards.map( (card,index) => 
                 (
                    <>
                        <div key={index} className="bg-white/99 p-8 ">
                            <h2 className='font-dm text-xl font-semibold text-primary leading-[30px]'>{card.title}</h2>
                            <p className='font-dm text-lg '>{card.subtitle}</p>
                            {card.type === "student"}
                        </div>
                    </>
                 )
                )}
              </div>
            </div>    
    </>
  )
}

export default DhyanLabs


//  <div className="grid md:grid-cols-4 gap-6 mt-8 max-w-7xl w-full">
//                                 {/* Student Dashboard */}
//                                 <div className="bg-white rounded-2xl shadow p-6">
//                                     <div>
//                                         <h2>

//                                         </h2>
//                                         <p className="text-[18px] leading-[30px] text-primary font-dm" style={{ fontWeight: 600 }}>Student Dashboard</p>
//                                         <p className="text-[#696969] text-[16px] mb-5 font-dm">Daily wellness pulse</p></div>

//                                     <div className="flex justify-between text-sm mb-2">
//                                         <span className='text-primary font-dm'>Focus Score</span>
//                                         <span className="font-semibold font-dm">88%</span>
//                                     </div>
//                                     <div className="h-[14px] w-full">
//                                         <ResponsiveContainer width="100%" height="100%">
//                                             <BarChart
//                                                 data={studentData}
//                                                 layout="vertical"
//                                                 margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
//                                             >
//                                                 <XAxis type="number" hide domain={[0, 100]} />
//                                                 <YAxis type="category" hide dataKey="name" />

//                                                 <Bar
//                                                     animationDuration={1200}
//                                                     dataKey="value"
//                                                     fill="#6DAA60"
//                                                     radius={[10, 10, 10, 10]}
//                                                     barSize={10}
//                                                     background={{ fill: "#E5E7EB", radius: 10 }}
//                                                 />
//                                             </BarChart>
//                                         </ResponsiveContainer>
//                                     </div>
//                                 </div>
//                                 {/* Parents Dashboard */}
//                                 <div className="bg-white rounded-2xl shadow p-6">
//                                     <p className="text-[18px] leading-[30px] text-primary font-dm" style={{ fontWeight: 600 }}>Parents Dashboard</p>
//                                     <p className="text-[#696969] text-[16px] mb-5 font-dm">Daily wellness pulse</p>
//                                     <div className="flex items-center gap-2 text-primary text-[16px] bg-gray-50 p-2 rounded-lg mb-2">
//                                         <CheckCircle size={16} className="text-greenbase" />
//                                         Daily practice: 5/7 Days
//                                     </div>
//                                     <div className="flex items-center text-primary gap-2 text-[16px] bg-gray-50 p-2 rounded-lg">
//                                         <TrendingUp size={16} className="text-greenbase" />
//                                         Consistency: Improved
//                                     </div>
//                                 </div>
//                                 {/* Teacher Dashboard */}
//                                 <div className="bg-white rounded-2xl shadow p-6">
//                                     <p className="text-[18px] leading-[30px] text-primary font-dm" style={{ fontWeight: 600 }}>Teacher Dashboard</p>
//                                     <p className="text-[#696969] text-[16px] mb-5 pr-4 font-dm">
//                                         Classroom emotional climate
//                                     </p>
//                                     <div className="h-[70px]">
//                                         <ResponsiveContainer width="100%" height="100%">
//                                             <BarChart data={Bardata}>
//                                                 <Bar
//                                                     animationDuration={1200}
//                                                     dataKey="value" radius={[4, 4, 4, 4]}>
//                                                     {Bardata.map((entry, index) => (
//                                                         <Cell key={`cell-${index}`} fill={colors[index]} />
//                                                     ))}
//                                                 </Bar>
//                                             </BarChart>
//                                         </ResponsiveContainer>
//                                     </div>
//                                 </div>
//                                 <div className="bg-white rounded-2xl shadow p-6">
//                                     <p className="text-[18px] leading-[30px] text-primary font-dm" style={{ fontWeight: 600 }}>Admin Dashboard</p>
//                                     <p className="text-[#696969] text-[16px] mb-2 font-dm">Whole school wellness</p>

//                                     <div className="flex flex-row gap-4 items-center ">

//                                         <ScoreCard
//                                             value={92}
//                                             color="#71Ac61"
//                                         />

//                                         <div className="text-sm font-dm mt-8">
//                                             <p className="font-semibold">Participation</p>
//                                             <p className="text-primary ">High (4%)</p>
//                                         </div>

//                                     </div>
//                                 </div>
//                             </div>