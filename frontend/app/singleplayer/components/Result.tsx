import { useContext, useEffect, useRef } from "react";
import { select, max, scaleBand, scaleLinear, axisBottom, axisLeft } from "d3";
import { SingleplayerGameContext } from "../context/SingleplayerGameContext";
import Link from "next/link";

interface Data {
  name: string;
  visits: number;
}

export function Result() {
  const { playList } = useContext(SingleplayerGameContext);

  const data: Data[] = playList ?? [];

  const svgRef = useRef(null);

  useEffect(() => {
    if (data.length > 0) makeGraph();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const makeGraph = () => {
    const width = 1000;
    const height = 500;
    const margin = { top: 10, left: 100, bottom: 40, right: 100 };
    const maxData = max(data, (d) => d.visits);

    const svg = select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const x = scaleBand()
      .domain(data!.map((d) => d.name))
      .range([margin.left, width - margin.right]);

    const y = scaleLinear()
      .domain([0, max(data, (d) => d.visits) as number])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = (g: any) => {
      return g
        .attr("transform", `translate(0, ${height})`)
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(axisBottom(x).tickSizeOuter(0))
        .attr("font-size", "12");
    };

    const yAxis = (g: any) =>
      g
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(axisLeft(y).ticks(5))
        .call((g: any) => g.select(".domain").remove())
        .attr("class", "grid");

    // apply axis to canvas
    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    // Vertical bar chart
    svg
      .append("g")
      .selectAll("rect")
      .data(data || [])
      .enter()
      .append("rect")
      // @ts-ignore
      .attr("x", (data) => x(data.name) + x.bandwidth() / 2 - 10)
      .attr("y", y(0))
      .attr("width", 20)
      .attr("height", 0)
      .attr("fill", (data) => (data.visits === maxData ? "purple" : "orange"))
      .transition()
      .duration(800)
      .delay((d, i) => i * 100) // Delay for sequential animation
      .attr("y", (data) => y(data.visits))
      .attr("height", (data) => y(0) - y(data.visits));

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

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-1">
      <h1 className="text-3xl font-mono">방문자 수</h1>
      <p className="text-xl font-mono">(2023년 5월 기준)</p>
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
