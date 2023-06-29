import React, { useContext, useEffect, useRef } from "react";
import * as d3 from "d3";
import { SingleplayerGameContext } from "../context/SingleplayerGameContext";
import Link from "next/link";

interface Data {
  name: string;
  visits: number;
}

export function Result() {
  const { playList } = useContext(SingleplayerGameContext);

  const data: Data[] = playList ?? [];

  const max = Math.max(...(data.map(d => d.visits)));
  const maxList = max < 10000 ? 10000 : max < 50000 ? 50000 : max < 100000 ? 100000 : max < 200000 ? 200000 : max < 500000 ? 500000 : max < 1000000 ? 1000000 : 2000000;
  const list = Array.from({ length: 5 }, (_, i) => maxList * ((i + 1) / 5));

  const svgRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) makeGraph();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const makeGraph = () => {
    const width = 1000;
    const height = 500;
    const margin = { top: 200, left: 100, bottom: 40, right: 40 };

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = d3
      .scaleBand()
      .domain(data!.map((d) => d.name))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.visits) as number])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g: any) => {
      return g
        .attr("transform", `translate(0, ${height})`)
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0))
        .attr("font-size", "15");
    };

    const yAxis = (g: any) =>
      g
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).tickValues(list).tickSize(-width))
        .call((g: any) => g.select(".domain").remove())
        .attr("class", "grid");

    // apply axis to canvas
    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    // vertical bar chart
    svg
      .append("g")
      .selectAll("rect")
      .data(data || [])
      .enter()
      .append("rect")
      // @ts-ignore
      .attr("x", (data) => x(data.name) + x.bandwidth() / 2 - 10)
      .attr("y", (data) => y(data.visits))
      .attr("width", 20)
      .attr("height", (data) => y(0) - y(data.visits))
      .attr("class", "bar-chart")
      .attr("fill", (data) => "blue");

    svg
      .append("g")
      .selectAll("text")
      .data(data || [])
      .enter()
      .append("text")
      .text((d) => d.visits)
      // @ts-ignore
      .attr("x", (data) => x(data.name) + x.bandwidth() / 2)
      .attr("y", (data) => y(data.visits) - 10)
      .attr("fill", "black")
      .attr("font-family", "Tahoma")
      .attr("font-size", "20px")
      .attr("text-anchor", "middle");
  };


  const buttonStyle: React.CSSProperties = {
    marginLeft: "200px",
    marginTop: "550px",
    position: "absolute",
    border: "solid 1px Aquamarine",
    background: "Aliceblue",
  };

  const headStyle: React.CSSProperties = {
    marginLeft: "450px",
    marginTop: "25px",
    position: "absolute",
    fontSize: "30px",
    fontFamily: "d2Coding,Tahoma",
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-3xl font-mono">5월 한달간 방문자 수</h1>
      <svg ref={svgRef}></svg>
      <Link href="/">
        <button className="mt-4 bg-gray-950 text-white text-sm px-3 py-1 rounded-md font-bold hover:bg-gray-700 transition-colors duration-200">
          Home
        </button>
      </Link>
    </div>
  );
}

export default Result;