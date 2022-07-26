const nav = document.querySelector("#nav");
const navBar = document.querySelector("#navBar");
const navHamburger = document.querySelector("#navHamburger");
const navbarMenu = document.querySelector("#navbarMenu");
const themeFilter = document.querySelector("#themeFilter");

const skillFilter = document.querySelector("#skillFilter");
const skillCharts = document.querySelectorAll("#skillCharts .chart");

const qualificationFilters = document.querySelector("#qualificationFilters");

let checkTheme = () =>{
  const localStorageTheme = localStorage.getItem("theme");
  if (localStorageTheme !== null && localStorageTheme === "dark"){
    document.body.classList.add("dark");
  }
}

document.addEventListener("DOMContentLoaded", checkTheme);

navHamburger.addEventListener("click", ()=>{
  nav.classList.toggle('open');
})

themeFilter.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
  let theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
})

// TODO: refactor this event
skillFilter.addEventListener("click", (e) =>{
  let selectedFilter = e.target.dataset.skills
  if (selectedFilter){
    if (selectedFilter === "all"){
      skillCharts.forEach((el) => el.classList.add("visible"));
    }
    else{
      skillCharts.forEach((el) =>{
        console.log(el.dataset.skill)
        el.dataset.skill.includes(selectedFilter) ? el.classList.add("visible") : el.classList.remove("visible")
      })
    }
  }
})

// TODO: refactor this event
qualificationFilters.addEventListener("click", (e) =>{
  let selectedFilter = e.target.closest(".qualification__filters__filter");
  let dataFilter = selectedFilter.getAttribute("data-filter");
  let activeFilter = document.querySelector(".qualification__filters__filter.active");
  let activeDataFilter = activeFilter.getAttribute("data-filter");
  if (!selectedFilter.classList.contains('active')){
    activeFilter.classList.remove('active');
    selectedFilter.classList.add('active');
    document.querySelector(`[data-qualification="${dataFilter}"]`).classList.add('active');
    document.querySelector(`[data-qualification="${activeDataFilter}"]`).classList.remove('active');
  }
})
