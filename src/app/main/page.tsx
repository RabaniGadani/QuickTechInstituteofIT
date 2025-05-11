'use client';

import React from "react";
import Hero from "../components/heroSection";
import Advertising from "../components/SpecialOffers";
import Courses from "../components/course";


const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-cyan-100">
      <main className="flex-grow">
        <Hero />
        <Advertising />
        <Courses />
      </main>
    </div>
  );
};

export default HomePage;
