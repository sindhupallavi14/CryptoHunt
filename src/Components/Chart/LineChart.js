import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';


export default function LineChart({hisData}) {

    const [data,setDta]=useState([["Date","Prices"]])

    useEffect(()=>
    {
       let datacpy=[["Date","Prices"]]
       if(hisData.prices)
       {
         hisData.prices.map((item)=>{
            datacpy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}`,item[1]])
         })
         setDta(datacpy);
       }
    },[hisData])

  return (
    <Chart
        chartType='LineChart'
        data={data}
        height="100%"
        legendToggle
    />
  )
}
