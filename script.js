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
  gsap.to("#go", { x: 200, opacity: 1, duration: 2, ease: "power3.out", delay: 1.5 });
  gsap.set("#of", { opacity: 0 });
  gsap.to("#of", { x: -200, opacity: 1, duration: 2, ease: "power3.out", delay: 2 });
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

const beginBtn = document.getElementById("beginBtn");
const landing = document.getElementById("landing");
const writing = document.getElementById("writing");
const list = document.getElementById("list");
const burnBtn = document.getElementById("burnBtn");
const burnOverlay = document.getElementById("burnOverlay");

let count = 1;

beginBtn.addEventListener("click", () => {
  burnOverlay.style.opacity = 1;

  setTimeout(() => {
    landing.classList.remove("active");
    writing.classList.add("active");
    burnOverlay.style.opacity = 0;
  }, 1200);
});

list.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const input = e.target;

    if (!input.value.trim()) return;

    input.disabled = true;
    count++;

    const line = document.createElement("div");
    line.className = "line";
    line.innerHTML = `<span>${count}.</span><input type="text" />`;

    list.appendChild(line);
    line.querySelector("input").focus();

    burnBtn.disabled = false;
  }
});

burnBtn.addEventListener("click", () => {
  burnOverlay.style.opacity = 1;

  setTimeout(() => {
    document.body.innerHTML = "";
    document.body.style.background = "#fbf7f2";
  }, 1500);
});
