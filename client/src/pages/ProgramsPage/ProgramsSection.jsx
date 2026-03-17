import React, { useEffect } from "react";
import Card from "./Card";
import first from "../../assets/images/first.png"
import second from "../../assets/images/second.png"
import third from "../../assets/images/third.png"
import fourth from "../../assets/images/fourth.png"
import fifth from "../../assets/images/fifth.png"
import sixth from "../../assets/images/sixth.png"


export default function ProgramsSection({ program }) {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
            {program ? program.map((p, index) => (
                <Card
                    key={index}
                    badge={p.weeks}
                    title={p.title}
                    description={p.subtitle}
                    list={p.activities}
                    chips={p.tags}
                    image={p.image}
                    imageSide={index % 2 === 0 ? "right" : "left"}
                />
            )): <>
            </>}
        </div>
    );
}