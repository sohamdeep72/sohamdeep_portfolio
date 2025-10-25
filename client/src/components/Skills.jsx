import React from "react";

export default function Skills({ skillsCategories }) {
  return (
    <section className="py-16 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>

      <div className="grid gap-10">
        {Object.entries(skillsCategories).map(([category, skills]) => (
          <div key={category} className="glass p-6 rounded-xl hover:shadow-[0_0_25px_rgba(0,255,200,0.2)] transition">
            <h3 className="text-xl font-semibold text-teal-400 mb-4">{category}</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <div
                  key={skill}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-200 hover:bg-teal-400/20 hover:text-white transition transform hover:scale-105"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
