// GSAP animations
const mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
  gsap.set("#things", { opacity: 0 });
  gsap.to("#things", { x: 10, duration: 2, ease: "power3.out", opacity: 1, delay: 0.5 });

  gsap.set("#im", { opacity: 0 });
  gsap.to("#im", { x: -100, opacity: 1, duration: 2, ease: "power3.out", delay: .8 });

  gsap.set("#letting", { opacity: 0 });
  gsap.to("#letting", { x: 50, opacity: 1, duration: 2, ease: "power3.out", delay: 1 });

  gsap.set("#go", { opacity: 0 });
  gsap.to("#go", { x: 150, opacity: 1, duration: 2, ease: "power3.out", delay: 1.5 });
  gsap.set("#of", { opacity: 0 });
  gsap.to("#of", { x: -600, opacity: 1, duration: 2, ease: "power3.out", delay: 2 });
});

mm.add("(max-width: 767px)", () => {
  gsap.set("#things", { opacity: 0, y: -50 });
  gsap.to("#things", { y: 0, duration: 2, ease: "power3.out", opacity: 1, delay: 0.5 });

  gsap.set("#im", { opacity: 0, y: -50 });
  gsap.to("#im", { y: 0, opacity: 1, duration: 2, ease: "power3.out", delay: .8 });

  gsap.set("#letting", { opacity: 0, y: -50 });
  gsap.to("#letting", { y: 0, opacity: 1, duration: 2, ease: "power3.out", delay: 1 });

  gsap.set("#go", { opacity: 0, y: -50 });
  gsap.to("#go", { y: 0, opacity: 1, duration: 2, ease: "power3.out", delay: 1.5 });
  gsap.set("#of", { opacity: 0, y: -50 });
  gsap.to("#of", { y: 0, opacity: 1, duration: 2, ease: "power3.out", delay: 2 });
});

// 3D mouse interaction
const main = document.body;
gsap.set(main, { perspective: 800 });

const phoenixRX = gsap.quickTo("#phoenix", "rotationY", { ease: "power3" });
const phoenixRY = gsap.quickTo("#phoenix", "rotationX", { ease: "power3" });
const textRX = gsap.quickTo("h1", "rotationY", { ease: "power3" });
const textRY = gsap.quickTo("h1", "rotationX", { ease: "power3" });

main.addEventListener("pointermove", (e) => {
  phoenixRX(gsap.utils.interpolate(20, -20, e.x / window.innerWidth));
  phoenixRY(gsap.utils.interpolate(-20, 20, e.y / window.innerHeight));
  textRX(gsap.utils.interpolate(10, -10, e.x / window.innerWidth));
  textRY(gsap.utils.interpolate(-10, 10, e.y / window.innerHeight));
});

main.addEventListener("pointerleave", (e) => {
  phoenixRX(0);
  phoenixRY(0);
  textRX(0);
  textRY(0);
});

const beginBtn = document.getElementById("beginBtn");
beginBtn.addEventListener("click", () => {
  setTimeout(() => {
     window.location.href = "toburn.html";
  }, 1200);
});

