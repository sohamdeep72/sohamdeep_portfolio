import React from "react";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass rounded-xl max-w-lg w-full p-6 relative animate-fadeInUp"
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-2xl font-bold text-teal-400 mb-2">
          {project.title}
        </h3>
        <p className="text-gray-400">{project.description}</p>
        <p className="text-sm text-gray-500 mt-3">{project.details}</p>
        <div className="flex gap-3 mt-5">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              className="btn border-teal-400 hover:bg-teal-400 hover:text-black"
            >
              Repository
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              className="btn border-gray-400 hover:bg-gray-300 hover:text-black"
            >
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
