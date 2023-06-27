"use client";

import { MultiplayerGameContext } from "../context/MultiplayerGameContext";
import { useContext } from "react";
import { usePanorama } from "@/app/hooks/usePanorama";

export default function Panorama() {
  const { coordinates } = useContext(MultiplayerGameContext);
  const panoRef = usePanorama({ coordinates });

  return <div ref={panoRef} className="w-full h-full z-0" />;
}
