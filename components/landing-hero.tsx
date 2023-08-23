"use client";

import { Button } from "@/components/ui/button";

export const LandingHero = () => {
  return (
    <div className="flex text-center pb-12 md:pb-16 h-full items-center justify-center">
      <div>
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 max-w-3xl">
          Let us help you manage your{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            calisthenic
          </span>{" "}
          growth
        </h1>
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xl text-gray-600 mb-8"
            data-aos="zoom-y-out"
            data-aos-delay="150"
          >
            Track your progress during your calisthenics journey and manage your
            training schedule in one place.
          </p>
          <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center space-x-2">
            <Button variant="premium" className="rounded-full shadow-md">
              Start a free trial
            </Button>
            <Button className="rounded-full shadow-md">Learn more</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
