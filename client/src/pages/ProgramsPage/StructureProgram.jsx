import React from "react";
import ProgramsSection from "./ProgramsSection";

function StructureProgram({data}) {
    return (
        <>
        <h1 className="font-[580] text-5xl font-season-medium text-center">{data.title} <span className="text-greenbase">{data.spanTitle}</span> {data.title2}</h1>
        <p className="text-center font-dm font-500 text-[20px]">Each program combines meditation, cognitive experiments, and practical tools to build lifelong focus, calm, and resilience.</p>
        <ProgramsSection program = {data.cards} />
        
        </>
    );
}

export default StructureProgram;
