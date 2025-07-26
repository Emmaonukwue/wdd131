// Dynamic footer year and last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Hamburger menu toggle
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("hide");

  // Toggle symbol ☰ and ✖
  if (navMenu.classList.contains("hide")) {
    menuBtn.innerHTML = "&#9776;"; // ☰
  } else {
    menuBtn.innerHTML = "&times;"; // ✖
  }
});
