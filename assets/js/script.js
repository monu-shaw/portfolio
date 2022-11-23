let pBar = document.getElementsByClassName('progress-bar');
      
let ui = u('main');
let sub = u('sub-main');
let sClose = u('sClose');
let sOpen = u('sOpen');
let data= [];
function res(){
if( window.innerWidth>767){
  sub.style.width = `100%`;
}else{
  sub.style.width = `80%`;
}
}
function u(params) {
return document.getElementById(params);
}
function sidebar(){
sub.style.width = `0%`;

unload()
  sOpen.style.transform = `rotate(90deg)`
setTimeout(()=>{
  ui.classList.remove('d-none');
  setTimeout(()=>{
    sub.style.width = `80%`;
    sClose.style.transform = `rotate(90deg)`;
    load();
  },10)
  
},100)

}
function sidebarClose(){

sClose.style.transform = `rotate(-90deg)`
sub.style.width = `0%`;
setTimeout(()=>{
  setTimeout(()=> 
  {
    sOpen.style.transform = `rotate(90deg)`
    ui.classList.add('d-none');
    sub.style.width = `100%`;
  },400)
  
},400)
}
function unload(){
Array.from(pBar).forEach(e=>{
    e.style.width = `0%`;
  });
}
function load(){
Array.from(pBar).forEach(e=>{
    e.style.width = `${e.getAttribute('aria-valuenow')}%`;
  });
}
      const loadProject = r=>{
        u('project').innerHTML =  r[0].reduce((a,b)=> a+= `
              <div class="bg-c-gray3 col-11 col-md-3 mx-auto p-2">
                <h6 class="text-light">${b.title}</h6>
                <p class="text-c-grey c-fs-12 popLight fw-lighter">
                  ${b.description}
                </p>
                <a href="${b.link}" target="_blank" class="text-decoration-none text-c-warning popSemi">View > </a>
              </div>
            `,'');
        u('bio-link').innerHTML =  r[1].reduce((a,b)=> a+= `
        <a href="${b.link}" class="text-decration-none text-mute col text-center"><i class="bi ${b.icon}"></i></a>
            `,'');
        u('ex').innerHTML =  r[2].reduce((a,b)=> a+= `
            <div class="progress my-1">
              <div class="progress-bar bg-c-warning text-start popSemi px-2" role="progressbar" aria-label="Example with label" style="width: 00%;" aria-valuenow="${b.experience}" aria-valuemin="0" aria-valuemax="100">${b.title}</div>
            </div>
            `,'');
            setTimeout(()=>load(),100)
            
      }