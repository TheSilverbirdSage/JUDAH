"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const services = [
  ["01", "AI strategy", "A focused path from possibility to a useful first move."],
  ["02", "Intelligent systems", "Tools that work inside the way your team already works."],
  ["03", "Capability building", "The clarity, confidence, and governance to keep moving."],
];

function clamp(value: number, min = 0, max = 1) { return Math.min(Math.max(value, min), max); }

export default function Home() {
  const stageRef = useRef<HTMLDivElement>(null);
  const moveDotField = (event: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    stage.style.setProperty("--dot-x", `${(x - 0.5) * -28}px`);
    stage.style.setProperty("--dot-y", `${(y - 0.5) * -28}px`);
    stage.style.setProperty("--pointer-x", `${x * 100}%`);
    stage.style.setProperty("--pointer-y", `${y * 100}%`);
  };
  const resetDotField = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--dot-x", "0px");
    stage.style.setProperty("--dot-y", "0px");
  };
  useEffect(() => {
    let frame = 0;
    const render = () => {
      frame = 0;
      const stage = stageRef.current;
      if (!stage) return;
      const raw = clamp((window.scrollY - 18) / (window.innerHeight * 0.72));
      const eased = raw === 1 ? 1 : 1 - Math.pow(1 - raw, 3);
      stage.style.setProperty("--lockup-scale", String(1 - eased * 0.72));
      stage.style.setProperty("--lockup-y", `${eased * -46}vh`);
      stage.style.setProperty("--lockup-opacity", String(1 - eased * 0.88));
      stage.style.setProperty("--nav-opacity", String(eased));
      stage.style.setProperty("--copy-opacity", String(1 - clamp(raw * 2.8)));
      stage.style.setProperty("--lockup-blur", `${eased * 1.2}px`);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(render); };
    render(); window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-scroll-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return <main className="site-shell" ref={stageRef}>
    <nav className="site-nav" aria-label="Main navigation">
      <a className="nav-brand" href="#top" aria-label="Judah home"><span className="nav-symbol"><Image src="/judah-logo.png" alt="" width={54} height={44} priority /></span><span>JUDAH</span></a>
      <div className="nav-links"><a href="#work">What we do</a><a href="#belief">Our belief</a><a href="#contact">Contact</a></div>
      <a className="nav-cta" href="mailto:hello@judah.ai">Start a conversation <span>↗</span></a>
    </nav>
    <section id="top" className="intro"><div className="intro-sticky" onPointerMove={moveDotField} onPointerLeave={resetDotField}>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <div className="dot-field" aria-hidden="true" /><div className="dot-field dot-field-active" aria-hidden="true" />
      <p className="intro-kicker">Intelligence, put to work</p>
      <div className="hero-lockup" aria-label="Judah"><div className="hero-symbol"><Image src="/judah-logo.png" alt="JUDAH symbol" width={558} height={448} priority /></div><span className="hero-name">JUDAH</span></div>
      <div className="intro-copy"><p>We help ambitious teams find their next intelligent advantage.</p><span className="scroll-cue"><i /> Scroll to enter</span></div><p className="intro-index">01 — 04</p>
    </div></section>
    <section id="work" className="statement section-frame" data-scroll-reveal><p className="eyebrow section-label">What we make possible</p><div className="statement-grid section-body"><h1>Work that moves<br /><em>with you.</em></h1><div className="statement-detail"><p>JUDAH brings strategy, systems, and real-world context together to make AI useful from day one.</p><a href="#contact">Explore how we work <span>→</span></a></div></div></section>
    <section className="services section-frame" data-scroll-reveal><div className="services-title section-label"><p className="eyebrow">A practical kind of intelligence</p><p>Built to make a difference in the work that is already in front of you.</p></div><div className="service-list section-body">{services.map(([number, title, description]) => <article key={number} className="service"><span>{number}</span><h2>{title}</h2><p>{description}</p><b>↗</b></article>)}</div></section>
    <section id="belief" className="belief" data-scroll-reveal><div className="belief-orbit" /><p className="eyebrow section-label">Our belief</p><h2 className="section-body">Technology should give<br />good judgment <em>more room.</em></h2><p className="belief-copy section-tail">The most valuable systems are not the loudest ones. They make the human work clearer, lighter, and more possible.</p></section>
    <section id="contact" className="contact section-frame" data-scroll-reveal><p className="eyebrow section-label">Start with what matters</p><div className="section-body"><h2>Let’s make<br /><em>progress useful.</em></h2><a href="mailto:hello@judah.ai">hello@judah.ai <span>↗</span></a></div><footer className="section-tail"><span>© 2026 JUDAH</span><span>Lagos · Working everywhere</span><a href="#top">Back to top ↑</a></footer></section>
  </main>;
}
