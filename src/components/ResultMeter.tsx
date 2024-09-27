import React from 'react'
import dynamic from "next/dynamic";
const GaugeComponent = dynamic(() => import('react-gauge-component'), { ssr: false });

interface ResultMeterProps {
    percentage: number;
}

export default function ResultMeter({ percentage }: ResultMeterProps) {
    return (
        <div className=' w-full relative'>
            <GaugeComponent
                type="semicircle"
                arc={{
                    colorArray: ['#FF2121', '#00FF15'],
                    padding: 0.02,
                    subArcs:
                        [
                            { limit: 10 },
                            { limit: 30 },
                            { limit: 50 },
                            {},
                            {},
                            {},
                            {}
                        ]
                }}
                pointer={{ type: "blob", animationDelay: 0 }}
                value={percentage}
                labels={{
                    valueLabel: {
                        style: {
                            fontSize: "35px", fill: "#000", borderStyle: 'none',
                        }
                    }
                }}
            />
        </div>
    )
}
