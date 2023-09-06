"use strict";
let pBar = document.getElementsByClassName("progress-bar"),
  ui = u("main"),
  sub = u("sub-main"),
  sClose = u("sClose"),
  sOpen = u("sOpen"),
  data = [];
function res() {
  sub.style.width = 767 < window.innerWidth ? `100%` : `80%`;
}
function u(a) {
  return document.getElementById(a);
}
function sidebar() {
  (sub.style.width = `0%`),
    unload(),
    (sOpen.style.transform = `rotate(90deg)`),
    setTimeout(() => {
      ui.classList.remove("d-none"),
        setTimeout(() => {
          (sub.style.width = `80%`),
            (sClose.style.transform = `rotate(90deg)`),
            load();
        }, 10);
    }, 100);
}
function sidebarClose() {
  (sClose.style.transform = `rotate(-90deg)`),
    (sub.style.width = `0%`),
    setTimeout(() => {
      setTimeout(() => {
        (sOpen.style.transform = `rotate(90deg)`),
          ui.classList.add("d-none"),
          (sub.style.width = `100%`);
      }, 400);
    }, 400);
}
function unload() {
  Array.from(pBar).forEach((a) => {
    a.style.width = `0%`;
  });
}
function load() {
  Array.from(pBar).forEach((a) => {
    a.style.width = `${a.getAttribute("aria-valuenow")}%`;
  });
}
const loadProject = (a) => {
  data = a[0];
  let short = a[0].slice(0,6).reduce(
    (c, a) =>
      (c += `
            <div class="col-11 col-md-4 col-lg-3 p-2">
              <div class="bg-c-gray3 p-2 rounded-3 hvr-card c-screenBreakPoint">
                <h6 class="text-light">${a.title}</h6>
                <p class="text-c-grey c-fs-12 popLight fw-lighter text-capitalize">
                  ${a.description}
                </p>
                <a href="${a.link}" target="_blank" class="text-decoration-none text-c-warning popSemi">View > </a>
              </div>
              </div>
            `),
    ""
  );
  (u("project").innerHTML = short+`<div class="col-10 mx-auto my-2"><div class="col-10 col-md-6 col-lg-4 mx-auto"><button class="btn btn-outline-warning rounded-pill w-100 smore" onclick="showAll()">Show More </button></div></div>`),
    (u("bio-link").innerHTML = a[1].reduce(
      (c, a) =>
        (c += `
        <a href="${a.link}" target="_blank" class="text-decration-none text-mute col text-center"><i class="bi ${a.icon}"></i></a>
            `),
      ""
    )),
    (u("ex").innerHTML = a[2].reduce(
      (c, a) =>
        (c += `
            <div class="progress my-1">
              <div class="progress-bar bg-c-warning text-start popSemi px-2" role="progressbar" aria-label="Example with label" style="width: 00%;" aria-valuenow="${a.experience}" aria-valuemin="0" aria-valuemax="100">${a.title}</div>
            </div>
            `),
      ""
    )),
    setTimeout(() => load(), 100);
};

const showAll =()=>{
  let short = data.reduce(
    (c, a) =>
      (c += `
            <div class="col-11 col-md-4 col-lg-3 p-2">
              <div class="bg-c-gray3 p-2 rounded-3 hvr-card c-screenBreakPoint">
                <h6 class="text-light">${a.title}</h6>
                <p class="text-c-grey c-fs-12 popLight fw-bolder text-capitalize">
                  ${a.description}
                </p>
                <a href="${a.link}" target="_blank" class="text-decoration-none text-c-warning popSemi">View > </a>
              </div>
              </div>
            `),
    ""
  );
  u("project").innerHTML = short
}
const showLess =()=>{
  let short = data.slice(0,6).reduce(
    (c, a) =>
      (c += `
            <div class="col-11 col-md-4 p-2">
              <div class="bg-c-gray3 p-2 rounded-3 hvr-card c-screenBreakPoint">
                <h6 class="text-light">${a.title}</h6>
                <p class="text-c-grey c-fs-12 popLight fw-lighter text-capitalize">
                  ${a.description}
                </p>
                <a href="${a.link}" target="_blank" class="text-decoration-none text-c-warning popSemi">View > </a>
              </div>
              </div>
            `),
    ""
  );
  u("project").innerHTML = short+`<div class="col-10 col-md-6 col-lg-4 mx-auto my-2"><button class="btn btn-outline-warning rounded-pill w-100 smore" onclick="showAll()">Show More </button></div>`
}
