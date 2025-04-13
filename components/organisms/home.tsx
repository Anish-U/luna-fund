"use client";

import Link from "next/link";
import { FC } from "react";
import Button from "../atoms/button";

export interface HomePageSectionProps {}

const HomePageSection: FC<HomePageSectionProps> = ({}) => {
  return (
    <div className="flex flex-col gap-6 py-4 -mt-10 md:mt-0 text-center md:text-left">
      <h1 className="text-3xl md:text-5xl font-primary mb-2 md:mb-4">
        Fuel the Next Frontier
      </h1>
      <p className="text-sm md:text-lg">
        Luna Fund is a decentralized crowdfunding platform where your ETH fuels
        the missions of tomorrow — from planetary exploration to futuristic tech
        experiments.
      </p>
      <p>
        Start or support missions, vote on outcomes, and explore a universe of
        innovation.
      </p>
      <div className="pt-4 flex items-center justify-center md:justify-normal">
        <Link href="/missions/create" className="mr-4">
          <Button type="accent">Launch a Mission</Button>
        </Link>
        <Link href="/missions">
          <Button type="primary">Explore Missions</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePageSection;
