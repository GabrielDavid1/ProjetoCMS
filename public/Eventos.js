export function Eventos () { 

const el = document.querySelector(".item");

let isResizing = false;

el.addEventListener("mousedown", mousedown);

function config (params) {

  if (params === 'cor') {
    document.getElementsByClassName("resizer ne")[0].style.backgroundColor = "#2a084e";
    document.getElementsByClassName("resizer nw")[0].style.backgroundColor = "#2a084e";
    document.getElementsByClassName("resizer wl")[0].style.backgroundColor = "#2a084e";
    document.getElementsByClassName("resizer wr")[0].style.backgroundColor = "#2a084e";
    document.getElementsByClassName("resizer sw")[0].style.backgroundColor = "#2a084e";
    document.getElementsByClassName("resizer se")[0].style.backgroundColor = "#2a084e";
  } else if(params === 'ocultar'){
    document.getElementsByClassName("resizer ne")[0].style.display = "none";
    document.getElementsByClassName("resizer nw")[0].style.display = "none";
    document.getElementsByClassName("resizer wl")[0].style.display = "none";
    document.getElementsByClassName("resizer wr")[0].style.display = "none";
    document.getElementsByClassName("resizer sw")[0].style.display = "none";
    document.getElementsByClassName("resizer se")[0].style.display = "none";
  }else if (params === 'mostrar') {
    document.getElementsByClassName("resizer ne")[0].style.display = "block";
    document.getElementsByClassName("resizer nw")[0].style.display = "block";
    document.getElementsByClassName("resizer wl")[0].style.display = "block";
    document.getElementsByClassName("resizer wr")[0].style.display = "block";
    document.getElementsByClassName("resizer sw")[0].style.display = "block";
    document.getElementsByClassName("resizer se")[0].style.display = "block";  
  } 

}

function linha (rectW, rectH) {
        /* Fixa posição das laterais */
        document.getElementsByClassName("resizer wl")[0].style.top=((rectH/2.2)+"px");
        document.getElementsByClassName("resizer wr")[0].style.top=((rectH/2.2)+"px");

        /* Topo_1 */
        document.getElementsByClassName("line wl2")[0].style.width = (rectW*0.90) + "px";
        document.getElementsByClassName("line wl2")[0].style.marginLeft  = (parseInt(rectW)*0.055)+ "px";
        document.getElementsByClassName("line wl2")[0].style.marginTop=((0-(rectH*0.45))+"px");

        /* Topo_2 */
        document.getElementsByClassName("line wr2")[0].style.width =  (parseInt(rectW)*0.90) + "px";
        document.getElementsByClassName("line wr2")[0].style.marginLeft  = (0-(parseInt(rectW)*0.92))+ "px";
        document.getElementsByClassName("line wr2")[0].style.marginTop=((rectH*0.5098039215686275)+"px");

        /* Esquerda_1 */
        document.getElementsByClassName("line nw2")[0].style.height = (rectH*0.30) + "px";
        document.getElementsByClassName("line nw2")[0].style.marginTop=(rectH*0.10)+"px";
        document.getElementsByClassName("line nw2")[0].style.marginLeft  = (parseInt(rectW)*0.01)+ "px";

        /* Esquerda_2 */
        document.getElementsByClassName("line sw2")[0].style.height=((rectH*0.3494623655913978)+"px");
        document.getElementsByClassName("line sw2")[0].style.marginTop=(0-((rectH*0.39))+"px");
        document.getElementsByClassName("line sw2")[0].style.marginLeft  = (parseInt(rectW)*0.01)+ "px";

        /* Direita_1 */
        document.getElementsByClassName("line ne2")[0].style.height=((rectH*0.3494623655913978)+"px");
        document.getElementsByClassName("line ne2")[0].style.marginTop=(rectH*0.1)+"px";
        document.getElementsByClassName("line ne2")[0].style.marginLeft  = (parseInt(rectW)*0.0061855670103093)+ "px";

        /* Direita_2 */
        document.getElementsByClassName("line se2")[0].style.height=((rectH*0.3494623655913978)+"px");
        document.getElementsByClassName("line se2")[0].style.marginTop=(0-((rectH*0.39))+"px");
        document.getElementsByClassName("line se2")[0].style.marginLeft  = (parseInt(rectW)*0.0061855670103093)+ "px";
}

function mousedown(e) {
  window.addEventListener("mousemove", mousemove);
  window.addEventListener("mouseup", mouseup);

  let prevX = e.clientX;
  let prevY = e.clientY;

  function mousemove(e) {    
    if (!isResizing) {
      let newX = prevX - e.clientX;
      let newY = prevY - e.clientY;

      const rect = el.getBoundingClientRect();

      el.style.left = rect.left - newX + "px";
      el.style.top = rect.top - newY + "px";

      prevX = e.clientX;
      prevY = e.clientY;
    }
  }

  function mouseup(e) {

    const posicao = el.getBoundingClientRect();

    config('ocultar');

    window.removeEventListener("mousemove", mousemove);
    window.removeEventListener("mouseup", mouseup);

    if (posicao.left < 0 || posicao.left > 1100 || posicao.top > 250 || posicao.top < 0 ) {
      el.style.top = 100 + "px";
      el.style.left = 500 + "px";
      e.preventDefault();
    }

  }
}


const resizers = document.querySelectorAll(".resizer");
let currentResizer;

for (let resizer of resizers) {
  resizer.addEventListener("mousedown", mousedown);

  function mousedown(e) {
    currentResizer = e.target;
    isResizing = true;

    let prevX = e.clientX;
    let prevY = e.clientY;

    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    function mousemove(e) {
      const rect = el.getBoundingClientRect();

      /*  Direita_2 */
      if (currentResizer.classList.contains("se")) {  
        el.style.width = rect.width - (prevX - e.clientX) + "px";
        el.style.height = rect.height - (prevY - e.clientY) + "px";
        document.getElementsByClassName("resizer se")[0].style.backgroundColor = "#6c1cc1";

        linha(rect.width, rect.height);
      } 

      /*  Esquerda_2 */
      else if (currentResizer.classList.contains("sw")) {
        el.style.width = rect.width + (prevX - e.clientX) + "px";
        el.style.height = rect.height - (prevY - e.clientY) + "px";
        el.style.left = rect.left - (prevX - e.clientX) + "px";
        document.getElementsByClassName("resizer sw")[0].style.backgroundColor = "#6c1cc1";

        linha(rect.width, rect.height);
      } 
      
      /*  Direita_1 */
      else if (currentResizer.classList.contains("ne")) {
        el.style.width = rect.width - (prevX - e.clientX) + "px";
        el.style.height = rect.height + (prevY - e.clientY) + "px";
        el.style.top = rect.top - (prevY - e.clientY) + "px";
        document.getElementsByClassName("resizer ne")[0].style.backgroundColor = "#6c1cc1";

        linha(rect.width, rect.height);
        
      } 

      /* laterais */
      else if (currentResizer.classList.contains("wr")) {
        linha(rect.width, rect.height);

        el.style.width = rect.width - (prevX - e.clientX) + "px";
        document.getElementsByClassName("resizer wr")[0].style.backgroundColor = "#6c1cc1";
      }
      
      else if (currentResizer.classList.contains("wl")) {
        linha(rect.width, rect.height);

        el.style.width = rect.width + (prevX - e.clientX) + "px";
        el.style.left = rect.left - (prevX - e.clientX) + "px";
        document.getElementsByClassName("resizer wl")[0].style.backgroundColor = "#6c1cc1";
      }
      
      /*  Esquerda_1 */
      else {
        linha(rect.width, rect.height);
        
        el.style.width = rect.width + (prevX - e.clientX) + "px";
        el.style.height = rect.height + (prevY - e.clientY) + "px";
        el.style.top = rect.top - (prevY - e.clientY) + "px";
        el.style.left = rect.left - (prevX - e.clientX) + "px";
        document.getElementsByClassName("resizer nw")[0].style.backgroundColor = "#6c1cc1";
      }

      prevX = e.clientX;
      prevY = e.clientY;
    }

    function mouseup(e) {
      e.preventDefault();

      config('ocultar');
      config('cor');
      
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", mouseup);
      
      isResizing = false;
    }
  }

}

  return (
    <>
    
    </>
  )

}