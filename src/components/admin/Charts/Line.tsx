"use client"

import { ResponsiveLine } from '@nivo/line'
import { useTheme } from 'next-themes';


const MyResponsiveLine = ({ className, properties }: any) => {
    let theme = useTheme();
    return < div className={className} >
        <ResponsiveLine
            data={[
                {
                    id: "Desktop",
                    data: [
                        { x: "Jan", y: 43 },
                        { x: "Feb", y: 137 },
                        { x: "Mar", y: 61 },
                        { x: "Apr", y: 145 },
                        { x: "May", y: 26 },
                        { x: "Jun", y: 154 },
                        { x: "july", y: 224 },
                        { x: "Aug", y: 134 },
                        { x: "Sep", y: 404 },
                    ],
                },
                {
                    id: "Mobile",
                    data: [
                        { x: "Jan", y: 60 },
                        { x: "Feb", y: 48 },
                        { x: "Mar", y: 177 },
                        { x: "Apr", y: 78 },
                        { x: "May", y: 96 },
                        { x: "Jun", y: 204 },
                        { x: "july", y: 124 },
                        { x: "Aug", y: 234 },
                        { x: "Sep", y: 204 },
                    ],
                },
            ]}

            margin={{ top: 20, right: 10, bottom: 30, left: 30 }}
            xScale={{
                type: "point",
            }}
            yScale={{
                type: "linear",
                min: 0,
                max: "auto",
            }}

            curve="monotoneX"
            enableArea={true}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 0,
                tickPadding: 10,
            }}
            axisLeft={{
                tickSize: 0,
                tickValues: 5,
                tickPadding: 10,
            }}
            enableGridX={false}
            enableGridY={false}

            colors={['#FB6D48','#FFAF45','#378CE7','#F4538A']}
            pointSize={6}
            useMesh={true}
            gridYValues={6}
            theme={{
                tooltip: {
                    chip: {
                        borderRadius: "9999px",

                    },
                    container: {
                        fontSize: "12px",
                        textTransform: "capitalize",
                        borderRadius: "6px",
                        backgroundColor: theme.theme === "light" ? "white" : "black",
                    },
                },
                grid: {
                    line: {
                        stroke: "#f3f4f6",
                    },
                },
            }}
            role="application"
            {...properties}
        />
    </div>
}

export default MyResponsiveLine;