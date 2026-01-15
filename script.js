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
