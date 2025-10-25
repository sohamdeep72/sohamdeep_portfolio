import React, { useState } from "react";

export default function Contact({ profile }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${form.name}`);
    const body = encodeURIComponent(form.message);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
      <form
        onSubmit={handleSubmit}
        className="glass p-6 rounded-xl flex flex-col gap-4 max-w-xl mx-auto"
      >
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="input"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          className="input"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your message..."
          className="input h-32 resize-none"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
        <button className="btn border-teal-400 hover:bg-teal-400 hover:text-black">
          Send Message
        </button>
      </form>
    </section>
  );
}
