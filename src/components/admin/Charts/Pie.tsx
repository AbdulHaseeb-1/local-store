"use client"
import { ResponsivePie } from '@nivo/pie'
import { useTheme } from 'next-themes'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


const MyResponsivePie = () => {

    const theme = useTheme();
    return <div className='aspect-[2/1]'>
        <ResponsivePie
            data={[
                {
                    "id": "January",
                    "value": 2181,
                },
                {
                    "id": "February",
                    "value": 3348,
                },
                {
                    "id": "March",
                    "value": 1291,
                },
                {
                    "id": "April",
                    "value": 4300,
                },
                {
                    "id": "May",
                    "value": 1127,
                }
            ]}
            margin={{ top: 30, right: 20, bottom: 30, left: 20 }}
            innerRadius={0.6}
            cornerRadius={10}
            activeOuterRadiusOffset={8}
            colors={['#FB6D48','#FFAF45','#378CE7','#F4538A']}
            borderWidth={0}
 
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor={{ from: 'color', modifiers: [] }}
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={"white"}

      
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
            
            legends={[]}
        />
    </div>
}

export default MyResponsivePie;