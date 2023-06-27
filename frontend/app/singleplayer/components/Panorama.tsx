"use client";

import { SinglePlayerGameContext } from "../context/SinglePlayerGameContext";
import { useContext } from "react";
import { usePanorama } from "@/app/hooks/usePanorama";

export default function Panorama() {
  const { coordinates } = useContext(SinglePlayerGameContext);
  const panoRef = usePanorama({ coordinates });

  return <div ref={panoRef} className="w-full h-full z-0" />;
}
