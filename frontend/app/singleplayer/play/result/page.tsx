// "use client";
// import React, { useEffect } from 'react';
// import * as d3 from 'd3';
// import Sample from "../../../../public/json/test-sample.json";



// const D3 = () => {

//     let isFirst=true;
//     useEffect(() => {
//         if(isFirst){
//             makeGraph();
//             isFirst=false;
//         }
//     }, []);

//     const makeGraph = () => {
//         // setting canvas
//         const width = 1000;
//         const height = 500;
//         const margin = { top: 100, left: 100, bottom: 40, right: 40 };

//         const svg = d3.select('body').append('svg').attr('width', width).attr('height', height);

//         // data
//         // const data = [
//         //   { month: '1월', value: 40, color: 'red' },
//         //   { month: '2월', value: 10, color: 'orange' },
//         //   { month: '3월', value: 60, color: 'yellow' },
//         //   { month: '4월', value: 95, color: 'green' },
//         //   { month: '5월', value: 30, color: 'blue' },
//         //   { month: '6월', value: 78, color: 'indigo' },
//         // ];
//         const data = Sample.data;

//         // setting axis
//         const x = d3
//             .scaleBand()
//             .domain(data.map((d) => d.place_name))
//             .range([margin.left, width - margin.right]);

//         const y = d3
//             .scaleLinear()
//             .domain([0, d3.max(data, (d) => d.visits)])
//             .nice()
//             .range([height - margin.bottom, margin.top]);

//         const xAxis = (g) => {
//             return g
//                 .attr('transform', `translate(0, ${height})`)
//                 .attr('transform', `translate(0, ${height - margin.bottom})`)
//                 .call(d3.axisBottom(x).tickSizeOuter(0))
//                 .attr('font-size','15');
//         };

//         const yAxis = (g) =>
//             g
//                 .attr('transform', `translate(${margin.left}, 0)`)
//                 .call(d3.axisLeft(y).tickValues([0, 25000, 50000, 75000, 100000, 125000, 150000,175000]).tickSize(-width))
//                 .call((g) => g.select('.domain').remove())
//                 .attr('class', 'grid');

//         // apply axis to canvas
//         svg.append('g').call(xAxis);
//         svg.append('g').call(yAxis);

//         // vertical bar chart
//         svg
//             .append('g')
//             .selectAll('rect')
//             .data(data)
//             .enter()
//             .append('rect')
//             .attr('x', (data) => x(data.place_name) + x.bandwidth() / 2 - 10)
//             .attr('y', (data) => y(data.visits))
//             .attr('width', 20)
//             .attr('height', (data) => y(0) - y(data.visits))
//             .attr('class', 'bar-chart')
//             .attr('fill', (data) => data.color);

//         svg
//             .append('g')
//             .selectAll('text')
//             .data(data)
//             .enter()
//             .append('text')
//             .text((d) => d.visits)
//             .attr('x', (data) => x(data.place_name) + x.bandwidth() / 2)
//             .attr('y', (data) => y(data.visits) - 10)
//             .attr('fill', 'black')
//             .attr('font-family', 'Tahoma')
//             .attr('font-size', '20px')
//             .attr('text-anchor', 'middle');
//     };

//     const buttonStyle={
//         marginLeft:"200px", 
//         marginTop:"550px", 
//         position:"absolute",
//         border:"solid 1px Aquamarine",
//         background:"Aliceblue"
//     }

//     const headStyle={
//         marginLeft:"450px", 
//         marginTop:"25px",
//         position:"absolute",
//         fontSize:"30px",
//         fontFamily:"d2Coding,Tahoma"
//     }

//     return (<div>
//         <h1 style={headStyle}>방문자 수</h1>
//         <></>
//         <form action="/">
//             <input type="submit" value="홈으로 가기" style={buttonStyle}/>
//         </form>
//         <script>
            
//         </script>
//     </div>);
// };
// export default D3;

export default function page() {
  return (
    <div>page</div>
  )
}