import React from "react";

export default function StatsBar({ stats = {} }) {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 text-center">
      <div className="glass py-6 rounded-lg">
        <h3 className="text-3xl font-bold text-teal-400">{stats.projects}</h3>
        <p className="text-gray-400">Projects</p>
      </div>
      <div className="glass py-6 rounded-lg">
        <h3 className="text-3xl font-bold text-teal-400">{stats.experience}</h3>
        <p className="text-gray-400">Experience</p>
      </div>
      <div className="glass py-6 rounded-lg">
        <h3 className="text-3xl font-bold text-teal-400">{stats.clients}</h3>
        <p className="text-gray-400">Clients</p>
      </div>
    </div>
  );
}
