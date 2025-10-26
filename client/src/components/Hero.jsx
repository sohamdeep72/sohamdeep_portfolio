import React from "react";

export default function Hero({ profile }) {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-20 px-6 max-w-6xl mx-auto">
      <div className="max-w-xl space-y-6 animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Hi, I'm <span className="text-teal-400">{profile.name}</span>
        </h1>
        <h2 className="text-xl text-gray-300">{profile.tagline}</h2>
        <p className="text-gray-400">{profile.summary}</p>
        <div className="flex gap-4 mt-6">
          <a
            href={profile.github}
            target="_blank"
            className="btn border-teal-400 hover:bg-teal-500 hover:text-black"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            className="btn border-gray-400 hover:bg-gray-300 hover:text-black"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="relative mt-12 md:mt-0 md:w-[400px] flex justify-center">
        
        <div className="absolute inset-0 animate-spin-slow blur-3xl opacity-30 rounded-full bg-gradient-to-r from-teal-500 to-blue-500"></div>
      </div>
    </section>
  );
}
