import React from "react";

export default function Projects({ projects = [], onOpenProject = () => {} }) {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
        {projects.map((p) => (
          <article
            key={p.title}
            className="relative rounded-xl project-card group cursor-pointer"
            onClick={() => onOpenProject(p)}
          >
            {/* Title (always visible) */}
            <div className="p-6 relative z-10 project-title-area flex flex-col items-center justify-center h-full">
              <h3 className="text-xl font-semibold text-teal-300 mb-2 text-center">
                {p.title}
              </h3>
            </div>

            {/* Hover overlay */}
            <div className="project-overlay absolute inset-0 flex flex-col justify-center items-center px-6 py-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
              <div className="overlay-inner text-center px-2">
                <p className="text-gray-300 mb-4 leading-relaxed">{p.description}</p>

                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {(p.tech || []).map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center gap-4">
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="btn border-teal-400 text-sm"
                    >
                      Repo
                    </a>
                  )}
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="btn border-gray-400 text-sm"
                    >
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
