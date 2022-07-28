const body = document.body;

const nav = document.querySelector("#nav");
const navBar = document.querySelector("#navBar");
const navHamburger = document.querySelector("#navHamburger");
const navbarMenu = document.querySelector("#navbarMenu");
const themeFilter = document.querySelector("#themeFilter");

const skillFilter = document.querySelector("#skillFilter");
const skillCharts = document.querySelectorAll("#skillCharts .chart");

const qualificationFilters = document.querySelector("#qualificationFilters");

let checkTheme = () => {
  const localStorageTheme = localStorage.getItem("theme");
  if (localStorageTheme !== null && localStorageTheme === "dark") {
    body.classList.add("dark");
  }
}

document.addEventListener("DOMContentLoaded", checkTheme);

navHamburger.addEventListener("click", () => {
  nav.classList.toggle('open');
  body.style.overflow = nav.classList.contains('open') ? "hidden" : "auto";
})

themeFilter.addEventListener("click", () => {
  body.classList.toggle("dark");
  let theme = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
})

let scrollToTarget = (el, headerOffset) => {
  let elementPosition = el.offsetTop;
  let offsetPosition = elementPosition - headerOffset;
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}

navbarMenu.addEventListener("click", (e) => {
  nav.classList.remove('open');
  body.style.overflow = "auto";
  if (e.target.nodeName === "H2") {
    let idSection = e.target.dataset.href;
    let section = document.querySelector(`#${idSection}`);
    scrollToTarget(section, 65);
  }
})



skillFilter.addEventListener("click", (e) => {
  let selectedFilter = e.target.dataset.skills
  if (selectedFilter) {
    if (selectedFilter === "all") {
      skillCharts.forEach((el) => el.classList.add("visible"));
    }
    else {
      skillCharts.forEach((el) => {
        el.dataset.skill.includes(selectedFilter) ? el.classList.add("visible") : el.classList.remove("visible")
      })
    }
  }
})

qualificationFilters.addEventListener("click", (e) => {
  let selectedFilter = e.target.closest(".qualification__filters__filter");
  let dataFilter = selectedFilter.getAttribute("data-filter");
  if (!selectedFilter.classList.contains('active')) {
    let activeFilter = document.querySelector(".qualification__filters__filter.active");
    let activeDataFilter = activeFilter.getAttribute("data-filter");
    activeFilter.classList.remove('active');
    selectedFilter.classList.add('active');
    document.querySelector(`[data-qualification="${dataFilter}"]`).classList.add('active');
    document.querySelector(`[data-qualification="${activeDataFilter}"]`).classList.remove('active');
  }
})
