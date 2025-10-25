import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import ProjectModal from "./components/ProjectModal";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import BackgroundCanvas from "./components/BackgroundCanvas";

export default function App() {
  const [profile, setProfile] = useState(null);
  const [page, setPage] = useState("home");
  const [activeProject, setActiveProject] = useState(null);

    useEffect(() => {
    axios.get("http://localhost:4000/api/profile")
      .then((res) => setProfile(res.data))
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
        setProfile(null);
      });
  }, []);


  if (!profile) return <div className="h-screen flex items-center justify-center text-gray-400">Loading…</div>;

  return (
    <div className="min-h-screen bg-ink text-white relative">
      {/* Background animation */}
      <BackgroundCanvas />

      {/* Custom cursor (renders two absolutely-positioned divs) */}
      <CustomCursor />

      {/* Page UI */}
      <Navbar onNavigate={setPage} page={page} />

      <main className="max-w-6xl mx-auto px-4 relative z-10">
        {page === "home" && (
          <>
            <Hero profile={profile} />
            <Skills skillsCategories={profile.skills_categories} />
            <Projects projects={profile.projects} onOpenProject={setActiveProject} />
            <Contact profile={profile} />
          </>
        )}

        {page === "projects" && <Projects projects={profile.projects} onOpenProject={setActiveProject} />}
        {page === "contact" && <Contact profile={profile} />}
      </main>

      <footer className="text-center py-8 text-gray-500 text-sm relative z-10">
        © {new Date().getFullYear()} {profile.name}
      </footer>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
