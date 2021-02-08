const SVG_NS = 'http://www.w3.org/2000/svg';
const SVG_XLINK = "http://www.w3.org/1999/xlink";

// string to array 
//var array = JSON.parse("[" + string + "]");
class bloque {
//Construtor de la clase bloque
constructor () {
    this.Id = "";
    this.Categoria = "";
    this.Estado = "";
    this.Numero_bloque = 0;
    this.Numero_bloque_categoria = 0;
    this.Nodo_anterior = "";
    this.Nodo_siguiente = "";
    this.Prioridad = 0;
    this.Codigo = 0;
  }
set (id, categoria, estado, numero_bloque, numero_bloque_categoria, nodo_anterior, nodo_siguiente, prioridad, codigo) {
    this.Id = id;
    this.Categoria = categoria;
    this.Estado = estado;
    this.Numero_bloque = numero_bloque;
    this.Numero_bloque_categoria = numero_bloque_categoria;
    this.Nodo_anterior = nodo_anterior;
    this.Nodo_siguiente = nodo_siguiente;
    this.Prioridad = prioridad;
    this.Codigo = codigo;
  }
}

var objeto_A = ["INICIO", "FIN"];
var objeto_B = ["SI", "NO/SI"]; //"CASOS"];
var objeto_C = ["HOME", "CABEZA", "PINZAS", "BRAZO DER.", "BRAZO IZQ.","SUBFUNCIÓN"];
var objeto_D = ["PARA"];

//listado de variables
var Numero_bloques = [];
var Origen_Arratre;
var Destino_Arratre;
var Id_objeto;
var Numero_objeto = 0;
var nuevo_objeto;
var copia_objeto;
var posicion;
var posicion_x;
var posicion_y;
var item;
var Objeto;
var objeto;
var Tecla; //leer tecla suprimir o borrar;
var Item_anterior;
var Linea;  //linea que une los bloques;
var Padre_linea;
var Hijo_linea;
var Nodos = 0;
var Nodo_origen = "";
var condicion = 0;
var listado = ""; 

//listado de banderas
var Bandera_Destino;
var Bandera_seleccion = 0;

//variables para elcambio del cursor
var A;
var Cambia_tamaño = false;
var Y_anterior;
var Tolerancia=5;
var Y_camino;
var cambiar_posicion;

var Numero_linea = 0;

//zoom
var escala;
var Bandera_zoom;
var posicion_X;
var posicion_Y;

// variables anterirores
var objeto_anteriror = "";
var linea_anteriror = "";

// variables categoria
var objeto_a = 0;
var objeto_b = 0;
var objeto_c = 0;
var objeto_d = 0;

//variables de programar
var programa =[];
var programa_inverso =[];

//variables para nuevo
var CLON;
var TAB;
var pestaña;
var contenedor;
var contador = 1;
// mover objeto
var Mover = "";
//Cortar elemento
var Cortar = "";
//Pegar
var V = 0;

// variables para guardar
var Nombre = "null";
var objeto_guardar = "";
var peticion_guardar = {
    nombre: Nombre,
    contenido: objeto_guardar,
    version: 0
};
var g = 0;
var exito = "";
var lista = [];

//mutateobserve observador ctrl  -z
let configuracion_observador = {
    childList: true,
    attributes: true,
    characterData: false,
    subtree: false,
    attributeFilter: ["numero_linea","numero_objeto","arrastrado","opcion"],//, 'style'],
    attributeOldValue: false,
    characterDataOldValue: false
  };
let copia_z = [];
let c = 0;
let c_ctrl_z = 0;
parser = new DOMParser();
observer = new MutationObserver(funcion_observador);

function funcion_observador() {
    c_ctrl_z = 0;
    c ++;//contador
        if (c >= 6) {
            copia_z.shift();
            copia_z.push(document.getElementById("contenedor-drop").outerHTML); //.cloneNode(true)
            //copia_z.push(document.getElementById("contenedor-drop").innerHTML);
            
        }
        else{
            copia_z.push(document.getElementById("contenedor-drop").outerHTML); //.innerHTML
        }
        //console.log(copia_z.length);
        COPIA = "";
        copia_z.forEach(element => {
            if (COPIA == "") {
                COPIA = element; 
            } else {
                COPIA = COPIA + ",,,VINCULO;;;" + element; 
            }           
        });
    document.getElementById("contenedor-tab").setAttribute("ctrl-Z",COPIA);
}
function funcion_inicial() {

    CLON = document.getElementById("contenedor-drop");//document.getElementById("contenedor-drop").cloneNode(false);
    TAB = document.getElementById("tab_");//document.getElementById("tab_").cloneNode(true);    
    copia_z.push(document.getElementById("contenedor-drop").outerHTML);
    observer.observe(document.getElementById("contenedor-drop"), configuracion_observador);
    setTimeout (function name(params) { salir(0) } ,10000000);
}
function Drag_And_Drop(e) {
    
    //Asignar ID de los contenedores
    Origen_Arratre = document.getElementById("contenedor-drag");
    Destino_Arratre = document.getElementById("contenedor-drop");
    
    //observer.observe(document.getElementById("contenedor-drop"), configuracion_observador);

    Origen_Arratre.addEventListener("dragstart",Inicio_Arrastre,false);
    Destino_Arratre.addEventListener("dragstart",Inicio_Arrastre_Destino,false);
    Destino_Arratre.addEventListener("dragend",function(e){
    if (Bandera_Destino == 1) {
        var x_i = 0; 
        var y_i = 0;
        var m = 0;
        var x_f = 0;
        var y_f = 0;

        if (Mover.getAttribute("lineasuperior") != "") {
            PUNTOS = document.getElementById(Mover.getAttribute("lineasuperior")).getAttribute("points");
            PUNTOS = PUNTOS.replace(/\s/g, ',').split(",");
            pad = document.getElementById(Mover.getAttribute("lineasuperior")).getAttribute("padre");               
            x_i = document.getElementById(pad).getBoundingClientRect().left - Destino_Arratre.getBoundingClientRect().left + 5;
            y_i = document.getElementById(pad).getBoundingClientRect().top - Destino_Arratre.getBoundingClientRect().top + 5;
            hij = document.getElementById(Mover.getAttribute("lineasuperior")).getAttribute("hijo");
            x_f = document.getElementById(hij).getBoundingClientRect().left - Destino_Arratre.getBoundingClientRect().left + 5;
            y_f = document.getElementById(hij).getBoundingClientRect().top - Destino_Arratre.getBoundingClientRect().top + 5;
            m = (y_f+y_i)/2;
            document.getElementById(Mover.getAttribute("lineasuperior")).setAttribute("points", x_i + "," + y_i + " " + x_i + "," + m + " " + x_f + "," + m + " " + x_f + "," + y_f);
        }
        if (Mover.getAttribute("lineainferior") != "") {
            
            PUNTOS = document.getElementById(Mover.getAttribute("lineainferior")).getAttribute("points");
            //console.log(document.getElementById(Mover.getAttribute("lineainferior")).getAttribute("points"));
            PUNTOS = PUNTOS.replace(/\s/g, ',').split(",");
            pad = document.getElementById(Mover.getAttribute("lineainferior")).getAttribute("padre");               
            x_i = document.getElementById(pad).getBoundingClientRect().left - Destino_Arratre.getBoundingClientRect().left + 5;
            y_i = document.getElementById(pad).getBoundingClientRect().top - Destino_Arratre.getBoundingClientRect().top + 5;
            hij = document.getElementById(Mover.getAttribute("lineainferior")).getAttribute("hijo");
            x_f = document.getElementById(hij).getBoundingClientRect().left - Destino_Arratre.getBoundingClientRect().left + 5;
            y_f = document.getElementById(hij).getBoundingClientRect().top - Destino_Arratre.getBoundingClientRect().top + 5;
            m = (y_f+y_i)/2;
            document.getElementById(Mover.getAttribute("lineainferior")).setAttribute("points", x_i + "," + y_i + " " + x_i + "," + m + " " + x_f + "," + m + " " + x_f + "," + y_f);
            
        }
        if (Mover.getAttribute("lineainterna") != "" && Mover.getAttribute("lineainterna") != null ) {
            
            PUNTOS = document.getElementById(Mover.getAttribute("lineainterna")).getAttribute("points");
            PUNTOS = PUNTOS.replace(/\s/g, ',').split(",");            
            pad = document.getElementById(Mover.getAttribute("lineainterna")).getAttribute("padre");               
            x_i = document.getElementById(pad).getBoundingClientRect().left - Destino_Arratre.getBoundingClientRect().left + 5;
            y_i = document.getElementById(pad).getBoundingClientRect().top - Destino_Arratre.getBoundingClientRect().top + 5;
            hij = document.getElementById(Mover.getAttribute("lineainterna")).getAttribute("hijo");
            x_f = document.getElementById(hij).getBoundingClientRect().left - Destino_Arratre.getBoundingClientRect().left + 5;
            y_f = document.getElementById(hij).getBoundingClientRect().top - Destino_Arratre.getBoundingClientRect().top + 5;
            m = (y_f+y_i)/2;
            document.getElementById(Mover.getAttribute("lineainterna")).setAttribute("points", x_i + "," + y_i + " " + x_i + "," + m + " " + x_f + "," + m + " " + x_f + "," + y_f);
        }
        if (Mover.getAttribute("lineano") != "" && Mover.getAttribute("lineano") != null ) {
            
            PUNTOS = document.getElementById(Mover.getAttribute("lineano")).getAttribute("points");
            PUNTOS = PUNTOS.replace(/\s/g, ',').split(",");            
            pad = document.getElementById(Mover.getAttribute("lineano")).getAttribute("padre");               
            x_i = document.getElementById(pad).getBoundingClientRect().left - Destino_Arratre.getBoundingClientRect().left + 5;
            y_i = document.getElementById(pad).getBoundingClientRect().top - Destino_Arratre.getBoundingClientRect().top + 5;
            hij = document.getElementById(Mover.getAttribute("lineano")).getAttribute("hijo");
            x_f = document.getElementById(hij).getBoundingClientRect().left - Destino_Arratre.getBoundingClientRect().left + 5;
            y_f = document.getElementById(hij).getBoundingClientRect().top - Destino_Arratre.getBoundingClientRect().top + 5;
            m = (y_f+y_i)/2;
            document.getElementById(Mover.getAttribute("lineano")).setAttribute("points", x_i + "," + y_i + " " + x_i + "," + m + " " + x_f + "," + m + " " + x_f + "," + y_f);
        }
    }
        e.preventDefault();},false);
    Destino_Arratre.addEventListener("dragover",function (e) {
        if (Bandera_Destino == 1) {
            var X_I = 0; //posicion inicial en x
            var Y_I = 0; //posicion inicial en y
            var X_F = 0; //posicion final x
            var Y_F = 0; //posicion final y
            var x_i = 0; 
            var y_i = 0;
            var m = 0;
            var x_f = 0;
            var y_f = 0;

            //console.log(Mover.getAttribute("lineainferior") != "", Mover);
            if (Mover.getAttribute("lineasuperior") != "") {
                PUNTOS = document.getElementById(Mover.getAttribute("lineasuperior")).getAttribute("points");
                //console.log(document.getElementById(Mover.getAttribute("lineainferior")).getAttribute("points"));
                PUNTOS = PUNTOS.replace(/\s/g, ',').split(",");
                pad = document.getElementById(Mover.getAttribute("lineasuperior")).getAttribute("padre");               
                X_I = document.getElementById(pad).getBoundingClientRect().left - Destino_Arratre.getBoundingClientRect().left + 5;
                Y_I = document.getElementById(pad).getBoundingClientRect().top - Destino_Arratre.getBoundingClientRect().top + 5;
                x_i = Math.round(e.clientX - Destino_Arratre.getBoundingClientRect().left)-2;
                y_i = Math.round(e.clientY - Destino_Arratre.getBoundingClientRect().top)-2;
                m = (Y_I+y_i)/2;
                x_f = X_I;
                y_f = Y_I;
                document.getElementById(Mover.getAttribute("lineasuperior")).setAttribute("points", x_i + "," + y_i + " " + x_i + "," + m + " " + x_f + "," + m + " " + x_f + "," + y_f);
            }
            if (Mover.getAttribute("lineainferior") != "") {
                
                PUNTOS = document.getElementById(Mover.getAttribute("lineainferior")).getAttribute("points");
                //console.log(document.getElementById(Mover.getAttribute("lineainferior")).getAttribute("points"));
                PUNTOS = PUNTOS.replace(/\s/g, ',').split(",");
                //console.log(PUNTOS);
                X_I = PUNTOS[0];
                Y_I = PUNTOS[1];
                hij = document.getElementById(Mover.getAttribute("lineainferior")).getAttribute("hijo");
                //console.log(document.getElementById(hij).getBoundingClientRect().left,document.getElementById(Mover.getAttribute("lineainferior")).getAttribute("hijo"));                
                X_F = document.getElementById(hij).getBoundingClientRect().left - Destino_Arratre.getBoundingClientRect().left + 5;
                Y_F = document.getElementById(hij).getBoundingClientRect().top - Destino_Arratre.getBoundingClientRect().top + 5;
                if (Mover.id[6] == "B" | Mover.id[6] == "D") {                    
                    x_i = Math.round(e.clientX - Destino_Arratre.getBoundingClientRect().left)+55;
                    y_i = Math.round(e.clientY - Destino_Arratre.getBoundingClientRect().top)+10; 
                } else {
                    x_i = Math.round(e.clientX - Destino_Arratre.getBoundingClientRect().left)-2;
                    y_i = Math.round(e.clientY - Destino_Arratre.getBoundingClientRect().top)-2; 
                }
                m = (Y_F+y_i)/2;
                x_f = X_F;
                y_f = Y_F;
                document.getElementById(Mover.getAttribute("lineainferior")).setAttribute("points", x_i + "," + y_i + " " + x_i + "," + m + " " + x_f + "," + m + " " + x_f + "," + y_f);                
            }
            if (Mover.getAttribute("lineainterna") != "" && Mover.getAttribute("lineainterna") != null ) {
                
                PUNTOS = document.getElementById(Mover.getAttribute("lineainterna")).getAttribute("points");
                PUNTOS = PUNTOS.replace(/\s/g, ',').split(",");
                //console.log(PUNTOS);
                
                hij = document.getElementById(Mover.getAttribute("lineainterna")).getAttribute("hijo");                
                X_F = document.getElementById(hij).getBoundingClientRect().left - Destino_Arratre.getBoundingClientRect().left + 5;
                Y_F = document.getElementById(hij).getBoundingClientRect().top - Destino_Arratre.getBoundingClientRect().top + 5;
                x_i = Math.round(e.clientX - Destino_Arratre.getBoundingClientRect().left)-2
                y_i = Math.round(e.clientY - Destino_Arratre.getBoundingClientRect().top)-2;
                m = (Y_F+y_i)/2;
                x_f = X_F;
                y_f = Y_F;
                document.getElementById(Mover.getAttribute("lineainterna")).setAttribute("points", x_i + "," + y_i + " " + x_i + "," + m + " " + x_f + "," + m + " " + x_f + "," + y_f);                
            }
            if (Mover.getAttribute("lineano") != "" && Mover.getAttribute("lineano") != null ) {
            
                PUNTOS = document.getElementById(Mover.getAttribute("lineano")).getAttribute("points");
                //console.log(document.getElementById(Mover.getAttribute("lineainferior")).getAttribute("points"));
                PUNTOS = PUNTOS.replace(/\s/g, ',').split(",");
                //console.log(PUNTOS);
                X_I = PUNTOS[0];
                Y_I = PUNTOS[1];
                hij = document.getElementById(Mover.getAttribute("lineano")).getAttribute("hijo");
                //console.log(document.getElementById(hij).getBoundingClientRect().left,document.getElementById(Mover.getAttribute("lineainferior")).getAttribute("hijo"));                
                X_F = document.getElementById(hij).getBoundingClientRect().left - Destino_Arratre.getBoundingClientRect().left + 5;
                Y_F = document.getElementById(hij).getBoundingClientRect().top - Destino_Arratre.getBoundingClientRect().top + 5;
                x_i = Math.round(e.clientX - Destino_Arratre.getBoundingClientRect().left)-55;
                y_i = Math.round(e.clientY - Destino_Arratre.getBoundingClientRect().top)+10;
                m = (Y_F+y_i)/2;
                x_f = X_F;
                y_f = Y_F;
                document.getElementById(Mover.getAttribute("lineano")).setAttribute("points", x_i + "," + y_i + " " + x_i + "," + m + " " + x_f + "," + m + " " + x_f + "," + y_f);                
            }                   
        }
        e.preventDefault();},false);          
    Destino_Arratre.addEventListener("drop",Soltado,false);
    //Destino_Arratre.onwheel = zoom; //zoom
}
/*function zoom(e) {
    e.preventDefault();    
    escala = Math.min(Math.max(.5,-e.deltaY), 2);
    //Destino_Arratre.style.transformOrigin = 0+ "px " + 0 +"px";
    Destino_Arratre.style.transformOrigin = Math.round(e.clientX - Destino_Arratre.getBoundingClientRect().left) + "px " + Math.round(e.clientY - Destino_Arratre.getBoundingClientRect().top) +"px";
    //console.log(Destino_Arratre.getBoundingClientRect().left,Destino_Arratre.getBoundingClientRect().top);
    //console.log(escala);
    
    if (escala<1) {
        posicion_Y = Math.round(e.clientY - Destino_Arratre.getBoundingClientRect().top) + "px";// -Destino_Arratre.clientHeight*escala + "px";// getBoundingClientRect().left + "px";
        posicion_X = Math.round(e.clientX - Destino_Arratre.getBoundingClientRect().left) + "px";// -Destino_Arratre.clientWidth*escala + "px"; //getBoundingClientRect().top + "px";
    } else {
        posicion_Y = 0 + "px"; //Destino_Arratre.clientHeight/(escala) + "px";
        posicion_X =0; //Destino_Arratre.clientWidth/(escala*3) + "px";
    }   
    posicion_Y = 0 + "px"; 
    posicion_X = 0 + "px"; 
    if (Bandera_zoom == 1) {
        Destino_Arratre.style.transform = "scale(" + escala + ") translate(" + posicion_X + "," + posicion_Y + ")";         
    }
    //console.log(posicion_X);
    window.scrollTo(0,0);
}
*/

function Inicio_Arrastre(e) {
    e.dataTransfer.setData("text/plain",e.target.id);
    e.dataTransfer.dropEffect = "copy";
    Bandera_Destino=0;
}
function Inicio_Arrastre_Destino(e) {
    e.dataTransfer.setData("text/plain",e.target.id);
    e.dataTransfer.dropEffect = "copy";
    Bandera_Destino=1;
    Mover = e.target;           
}
function Soltado(e) {
    e.preventDefault();
    if(Bandera_Destino==1){
        posicion =Destino_Arratre.getBoundingClientRect();
        posicion_x = Math.round(e.clientX - posicion.left - 50);
        posicion_y = Math.round(e.clientY - posicion.top - 20);
        document.getElementById(e.dataTransfer.getData("text/plain")).style.left = posicion_x + "px";
        document.getElementById(e.dataTransfer.getData("text/plain")).style.top = posicion_y + "px";        
        Destino_Arratre.setAttribute("arrastrado", posicion_x + Math.random()*10);
    }else{
        //llamar funcion crear objeto
        Crear_Objeto(e.dataTransfer.getData("text/plain"));
        Cortar = "";
        V = 0;

        //Posicion del mouse
        //Destino_Arratre.addEventListener("mouseon",Crear_Objeto,false);   

        posicion =Destino_Arratre.getBoundingClientRect();
        posicion_x = Math.round(e.clientX - posicion.left - copia_objeto.clientWidth/2);
        posicion_y = Math.round(e.clientY - posicion.top - copia_objeto.clientHeight/2);// arreglar recepcion
        
        copia_objeto.style.position = "absolute";
        copia_objeto.style.left = posicion_x + "px";
        copia_objeto.style.top = posicion_y + "px";
    }
    //Mover = "";
}
function Crear_Objeto(bloque) {
    //Crear objeto definir propiedades    
    Numero_objeto = Destino_Arratre.getAttribute("Numero_objeto");
    Numero_objeto ++;
    Destino_Arratre.setAttribute("Numero_objeto",Numero_objeto);
    Numeros = [];
    Numero = 0;

    if (Numero_objeto >= 1) {
        document.querySelectorAll("[id^='objeto']").forEach(item => {
            if (item.id.length > 7) {                
                Numeros.push(item.id.slice(8));                
            }
        });
        Numeros.sort();
        for (let index = 1; index < Numeros.length+1; index++) {
            if(Numeros[index-1] != index){
                Numero = index;
                break
            }            
            //console.log(Numeros[index-1] != index, Numeros.length, Numeros[index-1], index);
        }       
        //console.log(Numeros,Numero);    
    }

    if (Numero != 0) {
        Numero_objeto= Numero;
    } 
    
    nuevo_objeto = document.getElementById(bloque);
    
    copia_objeto=nuevo_objeto.cloneNode(bloque);
    copia_objeto.id= bloque + "_" + Numero_objeto;
    copia_objeto.style.textAlign ="center";       
    copia_objeto.draggable = "true"; 
    copia_objeto.setAttribute("onclick","Click_bloque(" + copia_objeto.id + ")");
    copia_objeto.setAttribute("codigo",0);
    copia_objeto.setAttribute("parametros","");
    copia_objeto.setAttribute("opcion","");
    copia_objeto.setAttribute("padre","");
    copia_objeto.setAttribute("hijo","");
    copia_objeto.setAttribute("lineasuperior","");
    copia_objeto.setAttribute("lineainferior","");    
    copia_objeto.setAttribute("contenido","");

    //Id nodo superior
    copia_objeto.childNodes[3].id = "nodo_superior" + Numero_objeto;
    copia_objeto.childNodes[3].setAttribute("estado",0);
    copia_objeto.childNodes[3].setAttribute("onclick","Click_nodo(" + copia_objeto.childNodes[3].id + ")");

    //Id nodo inferior
    copia_objeto.childNodes[5].id = "nodo_inferior" + Numero_objeto;
    copia_objeto.childNodes[5].setAttribute("estado",0);
    copia_objeto.childNodes[5].setAttribute("onclick","Click_nodo(" + copia_objeto.childNodes[5].id + ")");

    if (copia_objeto.childNodes.length >= 9) {
        copia_objeto.childNodes[7].id = "nodo_izquierdo" + Numero_objeto;
        copia_objeto.childNodes[7].setAttribute("estado",0);
        copia_objeto.childNodes[7].setAttribute("onclick","Click_nodo(" + copia_objeto.childNodes[7].id + ")");
        copia_objeto.setAttribute("lineainterna","");
        copia_objeto.setAttribute("dentro","");
        copia_objeto.setAttribute("nodo_inf",1);
    }

    if (copia_objeto.childNodes.length == 11) {
        copia_objeto.childNodes[9].id = "nodo_derecho" + Numero_objeto;
        copia_objeto.childNodes[9].setAttribute("estado",0);
        copia_objeto.childNodes[9].setAttribute("onclick","Click_nodo(" + copia_objeto.childNodes[9].id + ")");
        copia_objeto.setAttribute("lineano","");
        copia_objeto.setAttribute("dentrono","");
        copia_objeto.setAttribute("nodo_der",1);
    } 
    
    switch (copia_objeto.id[6]) {
        case 'A':
            objeto_a = Destino_Arratre.getAttribute("objeto_a");
            objeto_a ++;
            Destino_Arratre.setAttribute("objeto_a",objeto_a);
            copia_objeto.setAttribute("opcion","INICIO");
            if (objeto_a <=2) {
                Destino_Arratre.appendChild(copia_objeto);
            }
            break;
        case 'B':
            objeto_b = Destino_Arratre.getAttribute("objeto_b");
            objeto_b ++;
            Destino_Arratre.setAttribute("objeto_b",objeto_b ++);
            copia_objeto.setAttribute("opcion","SI");            
            copia_objeto.setAttribute("dentrono","");          
            Destino_Arratre.appendChild(copia_objeto);
            copia_objeto.setAttribute("contenidono","");
            copia_objeto.setAttribute("parametros",["Numero",0,"==",0]);
            break;
        case "C":
            objeto_c = Destino_Arratre.getAttribute("objeto_c");
            objeto_c ++;
            Destino_Arratre.setAttribute("objeto_c",objeto_c ++);
            copia_objeto.childNodes[4].data = "HOME";                     
            copia_objeto.setAttribute("opcion","HOME");
            Destino_Arratre.appendChild(copia_objeto);
            break;
        case "D":            
            objeto_d = Destino_Arratre.getAttribute("objeto_d");
            objeto_d ++;
            Destino_Arratre.setAttribute("objeto_d",objeto_d ++);            
            copia_objeto.setAttribute("opcion","PARA");
                                
            copia_objeto.setAttribute("parametros",1);
            Destino_Arratre.appendChild(copia_objeto);
            break;
    }

    if (objeto_a >= 2) {
        document.getElementById("objetoA").draggable = false;
        document.getElementById("objetoA").style.opacity = 0.6;
        /*
        Destino_Arratre.removeChild(copia_objeto);
        Numero_objeto = Destino_Arratre.getAttribute("Numero_objeto");
        Numero_objeto --;
        Destino_Arratre.setAttribute("Numero_objeto",Numero_objeto);
        objeto_a = Destino_Arratre.getAttribute("objeto_a");
        objeto_a --;
        Destino_Arratre.setAttribute("objeto_a",objeto_a);
        */
    } 
    if (objeto_a > 2) {
        Destino_Arratre.setAttribute("objeto_a",2);
        return "";
    } 
    
    document.getElementById("parametro_funcion").style.visibility = "hidden";
    if (document.getElementsByClassName("seleccionado").length > 0) {
        document.getElementsByClassName("seleccionado")[0].classList.remove("seleccionado");
    }
    if (document.getElementsByClassName("linea_seleccionada").length > 0) {
        document.getElementsByClassName("linea_seleccionada")[0].classList.remove("linea_seleccionada");
    }

    return copia_objeto;
}
function Crear_Linea(PADRE,HIJO) {
    Numero_linea = Destino_Arratre.getAttribute("numero_linea");
    Numero_linea ++;    
    Destino_Arratre.setAttribute("numero_linea",Numero_linea);
    Numeros_L = [];
    Numero_L = 0;

    if (Numero_linea >= 1) {
        document.querySelectorAll("[id^='Linea_']").forEach(item => {
            if (item.id.length > 6) {                
                Numeros_L.push(item.id.slice(6));
            }
        });
        Numeros_L.sort();
        for (let inde = 1; inde < Numeros_L.length+1; inde++) {
            if(Numeros_L[inde-1] != inde){
                Numero_L = inde;
                break
            }
        }
    }
    if (Numero_L != 0) {
        Numero_linea = Numero_L;
    } 
    let Punto_inicio_X = PADRE.getBoundingClientRect().left - Destino_Arratre.getBoundingClientRect().left + 5;
    let Punto_inicio_Y = PADRE.getBoundingClientRect().top - Destino_Arratre.getBoundingClientRect().top + 5;
    let Punto_final_X  = HIJO.getBoundingClientRect().left - Destino_Arratre.getBoundingClientRect().left + 5;
    let Punto_final_Y = HIJO.getBoundingClientRect().top - Destino_Arratre.getBoundingClientRect().top + 5;
    LINEA = document.createElementNS(SVG_NS,"polyline");
    LINEA.id= "Linea_" + Numero_linea;
    LINEA.setAttribute('draggable', false);        
    LINEA.setAttribute("points", Punto_inicio_X+","+Punto_inicio_Y +" "+ Punto_inicio_X +","+ (Punto_final_Y + Punto_inicio_Y)/2  +" "+ Punto_final_X +","+ (Punto_final_Y + Punto_inicio_Y)/2 +" "+ Punto_final_X +","+ Punto_final_Y);
    LINEA.setAttribute("fill", "none");
    LINEA.setAttribute("stroke", "black");
    LINEA.setAttribute("stroke-width", "5px");
    LINEA.setAttribute("onclick","Click_linea(\"" + LINEA.id + "\")");    
    LINEA.setAttribute("hijo", HIJO.id);
    LINEA.setAttribute("padre", PADRE.id);
    
    document.getElementById("SVG").appendChild(LINEA);

    PADRE.style.backgroundColor="black";
    HIJO.style.backgroundColor="black";    
    PADRE.setAttribute("estado",1);
    HIJO.setAttribute("estado",1);
    
    
    document.getElementById("parametro_funcion").style.visibility = "hidden";
    if (document.getElementsByClassName("seleccionado").length > 0) {
        document.getElementsByClassName("seleccionado")[0].classList.remove("seleccionado");
    }
    if (document.getElementsByClassName("linea_seleccionada").length > 0) {
        document.getElementsByClassName("linea_seleccionada")[0].classList.remove("linea_seleccionada");
    }
    Cortar = "";
    
    console.log("EE");

    return LINEA.id
}
function Hacer_camino(e) {
    if (Nodos == 1){
        let Punto_inicio_X = Padre_linea.getBoundingClientRect().left - Destino_Arratre.getBoundingClientRect().left + 5;
        let Punto_inicio_Y = Padre_linea.getBoundingClientRect().top - Destino_Arratre.getBoundingClientRect().top + 5;
        let Punto_final_X  = Math.round(e.clientX - Destino_Arratre.getBoundingClientRect().left)-2;
        let Punto_final_Y = Math.round(e.clientY - Destino_Arratre.getBoundingClientRect().top)-2;  
        Linea.setAttribute("points", Punto_inicio_X+","+Punto_inicio_Y +" "+ Punto_inicio_X +","+ (Punto_final_Y + Punto_inicio_Y)/2  +" "+ Punto_final_X +","+ (Punto_final_Y + Punto_inicio_Y)/2 +" "+ Punto_final_X +","+ Punto_final_Y);
        Linea.setAttribute("fill", "none");
        Linea.setAttribute("stroke", "black");
        Linea.setAttribute("stroke-width", "5px");        
        Destino_Arratre.onmousemove =Hacer_camino; 
        Destino_Arratre.onmouseleave = Soltar_linea; 
        
        
        document.getElementById("parametro_funcion").style.visibility = "hidden";
        if (document.getElementsByClassName("seleccionado").length > 0) {
            document.getElementsByClassName("seleccionado")[0].classList.remove("seleccionado");
        }
        if (document.getElementsByClassName("linea_seleccionada").length > 0) {
            document.getElementsByClassName("linea_seleccionada")[0].classList.remove("linea_seleccionada");
        }
        Cortar = "";
    }
}
//funcion selector
function crear_selector(vector,OBJETO) { 
    document.getElementById("Selector_centrado").removeChild(document.getElementById("selector"));
    Selector = document.createElement("select");
    Selector.id = "selector";
    Selector.setAttribute("onchange","seleccionar_opcion("+ OBJETO +")");
    document.getElementById("Selector_centrado").appendChild(Selector);
    vector.forEach(element => {    
        //crear option dentro del select
        opcion_selector = document.createElement("option");
        opcion_selector.text = element;
        opcion_selector.value = element;
        Selector.add(opcion_selector);        
    });
    
    //document.getElementById("selector").style.visibility = "visible";
    //console.log(document.getElementById("selector").selectedIndex,document.getElementById("selector").name);
    document.getElementById("selector").value = document.getElementById(OBJETO).getAttribute("opcion");
    //objeto.setAttribute("opcion",document.getElementById("selector").selectedIndex);
}
//funcion seleccionar
function seleccionar_opcion(OBJETO) {
    OBJETO.setAttribute("opcion",document.getElementById("selector").value);
    OBJETO.childNodes[4].data = document.getElementById("selector").value;    
    Destino_Arratre.setAttribute("opcion", Math.random()*10);
    switch (OBJETO.id[6]) {
        case 'A':
            bloque_inicio(OBJETO,document.getElementById("selector").value);
            break;
        case 'B':
            bloque_desicion(OBJETO,document.getElementById("selector").value);
            break;
        case "C":            
            bloque_funcion(OBJETO,document.getElementById("selector").value);
            break;
        case "D":
            bloque_ciclo(OBJETO,document.getElementById("selector").value);
            break;
    
        default:
            break;
    }
}
function Click_bloque(bloque_click){
    OBJETO = bloque_click;
    if(OBJETO.parentNode.classList.value == "svg"){
        OBJETO = e.target.parentNode.parentNode;
    }    
    document.getElementById("opciones_bloques").innerHTML = "";
    switch (OBJETO.id[6]) {
        case 'A':
            crear_selector(objeto_A,OBJETO.id);        
            break;
        case 'B':
            crear_selector(objeto_B,OBJETO.id);            
            bloque_desicion(OBJETO,OBJETO.getAttribute("opcion"));
            break;
        case "C":
            crear_selector(objeto_C,OBJETO.id);
            if (OBJETO.getAttribute("opcion") != "") {
                bloque_funcion(OBJETO,OBJETO.getAttribute("opcion"));
            }else{
                bloque_funcion(OBJETO,"");
            }
            break;
        case "D":
            crear_selector(objeto_D,OBJETO.id);
            bloque_ciclo(OBJETO,"PARA");
            break;
    
        default:
            break;
    }
    objeto_seleccionado = OBJETO.firstElementChild.firstElementChild;
    if (objeto_anteriror!= ""){
        //eliminar clase
        objeto_anteriror.classList.remove('seleccionado');
        if (document.getElementsByClassName("linea_seleccionada").length > 0){
            linea_anteriror.classList.remove('linea_seleccionada');
        }
    }
    else{
        if (document.getElementsByClassName("linea_seleccionada").length > 0){
            linea_anteriror.classList.remove('linea_seleccionada');
        }
    }
    objeto_seleccionado.classList.add('seleccionado');
    document.getElementById("parametro_funcion").style.visibility = "visible";
    objeto_anteriror = objeto_seleccionado;
    //console.log(OBJETO);
}
function Click_linea(linea){
    
    if (linea_anteriror!= ""){
        //eliminar clase
        linea_anteriror.classList.remove('linea_seleccionada');
        if (document.getElementsByClassName("seleccionado").length > 0){
            objeto_anteriror.classList.remove('seleccionado');
        }
    }
    else{
        if (document.getElementsByClassName("seleccionado").length > 0){
            objeto_anteriror.classList.remove('seleccionado');
        }
    }
    document.getElementById(linea).classList.add('linea_seleccionada');
    linea_anteriror = document.getElementById(linea);

    if (document.getElementsByClassName("linea_seleccionada").length > 0){                
        document.getElementById("parametro_funcion").style.visibility = "hidden";
    }
    console.log("RR");
}
function Click_nodo(nodo){    
    Nodos++;
    
    console.log(nodo.id);
    if (document.getElementById("Linea_") != null){
        document.getElementById("SVG").removeChild(document.getElementById("Linea_"));
        Padre_linea.style = "";
    }
    console.log(nodo.getAttribute("estado"));
    if (Nodos==2 && nodo.getAttribute("estado")==0) {
        Hijo_linea=document.getElementById(nodo.id);
        
        if ( (((Padre_linea.parentNode.id[6] == "B") || (Padre_linea.parentNode.id[6] == "D")) && (Padre_linea.id[6] == "n")) || (((Hijo_linea.parentNode.id[6] == "B") || (Hijo_linea.parentNode.id[6] == "D")) && (Hijo_linea.id[6] == "n")) ) {
            Nodo_origen = Padre_linea.id[6]+Hijo_linea.id[6]+1;
        }else{
            Nodo_origen = Padre_linea.id[6]+Hijo_linea.id[6];
        }
        if (Padre_linea.parentNode.id == Hijo_linea.parentNode.id) {
            Nodo_origen = "";
        }
        if (Padre_linea.getAttribute("estado") == "1" | Hijo_linea.getAttribute("estado") == "1") {
            Nodo_origen = "";
        }
        console.log(Padre_linea.getAttribute("estado"),Hijo_linea.getAttribute("estado"));
        //Nodo_origen = Padre_linea.id.slice(5,9)+Hijo_linea.id.slice(5,9);
        console.log(Nodo_origen);
        Nodos=1;
        Soltar_linea();
        Nodos=0;      
        switch (Nodo_origen) {
            case "un": //"supeinfe":
            case "uz": //"supeizqu":
                Nombre_linea = Crear_Linea(Hijo_linea,Padre_linea);
                Padre_linea.parentNode.setAttribute("padre",Hijo_linea.parentNode.id);
                Hijo_linea.parentNode.setAttribute("hijo",Padre_linea.parentNode.id);
                
                Hijo_linea.parentNode.setAttribute("lineainferior",Nombre_linea);
                Padre_linea.parentNode.setAttribute("lineasuperior",Nombre_linea);
    
                break;
            case "nu": //"infesupe":
            case "zu": //"izqusupe":
                Nombre_linea = Crear_Linea(Padre_linea,Hijo_linea);
                Padre_linea.parentNode.setAttribute("hijo",Hijo_linea.parentNode.id);
                Hijo_linea.parentNode.setAttribute("padre",Padre_linea.parentNode.id);
                
                Hijo_linea.parentNode.setAttribute("lineasuperior",Nombre_linea);
                Padre_linea.parentNode.setAttribute("lineainferior",Nombre_linea);                
                break;
            case "nu1":                
                Nombre_linea = Crear_Linea(Padre_linea,Hijo_linea);
                Padre_linea.parentNode.setAttribute("dentro",Hijo_linea.parentNode.id);
                Hijo_linea.parentNode.setAttribute("padre",Padre_linea.parentNode.id);
                
                Hijo_linea.parentNode.setAttribute("lineasuperior",Nombre_linea);
                Padre_linea.parentNode.setAttribute("lineainterna",Nombre_linea);                
                break;
            case "un1":                
                Nombre_linea = Crear_Linea(Hijo_linea,Padre_linea);
                Padre_linea.parentNode.setAttribute("padre",Hijo_linea.parentNode.id);
                Hijo_linea.parentNode.setAttribute("dentro",Padre_linea.parentNode.id);
                
                Hijo_linea.parentNode.setAttribute("lineainterna",Nombre_linea);
                Padre_linea.parentNode.setAttribute("lineasuperior",Nombre_linea);                
                break;
            case "eu":
                Nombre_linea = Crear_Linea(Padre_linea,Hijo_linea);
                Padre_linea.parentNode.setAttribute("dentrono",Hijo_linea.parentNode.id);
                Hijo_linea.parentNode.setAttribute("padre",Padre_linea.parentNode.id);
                
                Hijo_linea.parentNode.setAttribute("lineasuperior",Nombre_linea);
                Padre_linea.parentNode.setAttribute("lineano",Nombre_linea);                
                break;
            case "ue":
                Nombre_linea = Crear_Linea(Padre_linea,Hijo_linea);
                Padre_linea.parentNode.setAttribute("padre",Hijo_linea.parentNode.id);
                Hijo_linea.parentNode.setAttribute("dentrono",Padre_linea.parentNode.id);
                
                Hijo_linea.parentNode.setAttribute("lineano",Nombre_linea);
                Padre_linea.parentNode.setAttribute("lineasuperior",Nombre_linea);                
                break;
            default:
                break;
            }
            Nodo_origen = "";
    }
    
    if(Nodos==1 && nodo.getAttribute("estado")==0){        
        padre_nodo = nodo.parentNode;
        Padre_linea = document.getElementById(nodo.id);
        Padre_linea.style.backgroundColor="black";
        Linea = document.createElementNS(SVG_NS,"polyline");
        Linea.id = "Linea_";
        Linea.setAttribute('draggable', false);        
        document.getElementById("SVG").appendChild(Linea);
        Linea.style.position = "absolute";
    }
    if (Nodos >2) {
        Nodos = 0;
    }
}
//teclado teclas
/*https://keycode.info/ para consultar las teclas
8 borrar
46 supr
27 esc
18 alt
*/
var Definir_objeto = "";
document.onclick = function(event) {
    Definir_objeto = event.target.id.slice(0,6);
};
function Teclado_arriba(e) {   
    
    Tecla=e.which || e.keyCode;
    if (Tecla==8 || Tecla==46 || Tecla==27) {
        Soltar_linea();
    }     
    if ((Tecla==8 || Tecla==46)) {
        
        if (Definir_objeto == "objeto" ) {
            Borrar_objeto();
        }
        //console.log(Definir_objeto);
        
        Borrar_linea();
    }
    if (Tecla==18) {
        Bandera_zoom = 0;
    }
}
function Teclado_abajo(e) {
    Tecla=e.which || e.keyCode;;
    if (Tecla==18) {
        Bandera_zoom = 1;
    }
    if (Tecla==27 & document.getElementsByClassName("vacio_gris").length == 1) { 
        document.body.removeChild(document.getElementsByClassName("vacio_gris")[0]); 
    }
    //undo ctrl+z ctrlz
    if (e.ctrlKey && e.key === 'z') {        
        c_ctrl_z ++;
        observer.disconnect();        
        copia_Z = document.getElementById("contenedor-tab").getAttribute("ctrl-z");
        if (copia_Z != null) {
            //console.log(typeof(copia_Z[copia_Z.length-1]),copia_Z.split("</div></div>,"));
            //console.log(c_ctrl_z,copia_Z.split(",,,VINCULO;;;").length);
            if (c_ctrl_z < copia_Z.split(",,,VINCULO;;;").length){
                //document.getElementById("contenedor-drop").innerHTML = copia_Z.split("</div>,")[copia_Z.split("</div>,").length-c_ctrl_z-1];
                //document.getElementById("contenedor-drop").innerHTML = copia_Z.split("</div></div>,")[copia_Z.split("</div></div>,").length-c_ctrl_z-1];
                
                document.getElementById("contenedor-tab").removeChild(document.getElementById("contenedor-drop"));
                let doc = new DOMParser().parseFromString(copia_Z.split(",,,VINCULO;;;")[copia_Z.split(",,,VINCULO;;;").length-c_ctrl_z -1], 'text/html');
                //console.log(copia_Z.split(",,,VINCULO;;;").length-c_ctrl_z-1);
                //console.log(copia_Z.split(",,,VINCULO;;;")[copia_Z.split(",,,VINCULO;;;").length-c_ctrl_z-1],doc, doc.body.firstChild);
                document.getElementById("contenedor-tab").appendChild(doc.body.firstChild);
                console.log(copia_Z.split("</div>,"),c_ctrl_z);
                
            }
            if (document.getElementsByClassName("seleccionado").length > 0) {
                document.getElementsByClassName("seleccionado")[0].classList.remove("seleccionado");
            }
            if (document.getElementsByClassName("linea_seleccionada").length > 0) {
                document.getElementsByClassName("linea_seleccionada")[0].classList.remove("linea_seleccionada");
            }
            
            document.getElementById("parametro_funcion").style.visibility = "hidden";
            observer.observe(document.getElementById("contenedor-drop"), configuracion_observador);
            //document.getElementById("contenedor-drop").setAttribute("opcion", Math.random()*10); //peligro
            if (c_ctrl_z > copia_Z.split(",,,VINCULO;;;").length-1) {
                c_ctrl_z = copia_Z.split(",,,VINCULO;;;").length-1;            
            }
            //console.log(c_ctrl_z);
        }
    }
    //redo ctrl+y ctrly
    if (e.ctrlKey && e.key === 'y') {        
        c_ctrl_z --;
        copia_Z = document.getElementById("contenedor-tab").getAttribute("ctrl-z");
        if (c_ctrl_z < 0) {
            c_ctrl_z = 0;            
        }
        observer.disconnect();
        if (copia_Z != null) {
            copia_Z = document.getElementById("contenedor-tab").getAttribute("ctrl-z");
            //console.log(c_ctrl_z,copia_Z.split(",,,VINCULO;;;").length);
            if (c_ctrl_z < copia_Z.split(",,,VINCULO;;;").length & copia_Z != ""){
                document.getElementById("contenedor-tab").removeChild(document.getElementById("contenedor-drop"));
                let doc = new DOMParser().parseFromString(copia_Z.split(",,,VINCULO;;;")[copia_Z.split(",,,VINCULO;;;").length-c_ctrl_z -1], 'text/html');
                //console.log(copia_Z.split(",,,VINCULO;;;").length-c_ctrl_z-1);
                //console.log(copia_Z.split(",,,VINCULO;;;")[copia_Z.split(",,,VINCULO;;;").length-c_ctrl_z-1],doc, doc.body.firstChild);
                document.getElementById("contenedor-tab").appendChild(doc.body.firstChild);
            }
            if (document.getElementsByClassName("seleccionado").length > 0) {
                document.getElementsByClassName("seleccionado")[0].classList.remove("seleccionado");
            }
            if (document.getElementsByClassName("linea_seleccionada").length > 0) {
                document.getElementsByClassName("linea_seleccionada")[0].classList.remove("linea_seleccionada");
            }
            document.getElementById("parametro_funcion").style.visibility = "hidden";
            observer.observe(document.getElementById("contenedor-drop"), configuracion_observador);
        }        
        //console.log(c_ctrl_z,copia_Z.split("</div></div>,").length-c_ctrl_z-1,copia_Z.split("</div></div>,").length);
    }
    //cortar elemento
    if (e.ctrlKey && e.key === 'x') {
        if (document.getElementsByClassName("seleccionado").length > 0) {
            Cortar =  document.getElementsByClassName("seleccionado")[0].parentNode.parentNode;
            Borrar_objeto();
            V = 0;
        }
    }
    //copiar elemento
    if (e.ctrlKey && e.key === 'c') {
        if (document.getElementsByClassName("seleccionado").length > 0) {            
            //Copiar =  document.getElementsByClassName("seleccionado")[0].parentNode.parentNode;    
            Cortar =  document.getElementsByClassName("seleccionado")[0].parentNode.parentNode;
            V = 0;
        }
    }
    // pegar elemento
    if (e.ctrlKey && e.key === 'v') {
        if (Cortar != "") {
            if (!(Cortar.id[6] == "A" & objeto_a >= 2)) {                
                V ++;            
                Pegar = Crear_Objeto(Cortar.id.slice(0,7));
                //console.log(V,Pegar);
                Pegar.style.position = "absolute";
                Pegar.setAttribute("opcion",Cortar.getAttribute("opcion"));
                Pegar.setAttribute("parametros",Cortar.getAttribute("parametros"));
                Pegar.childNodes[4].data = Cortar.innerText;
                if (V > 0) {
                    Pegar.style.left = (parseInt(Cortar.style.left.slice(0,-2)) + 20* V) + "px" ;
                    Pegar.style.top = (parseInt(Cortar.style.top.slice(0,-2)) + 40* V) + "px";
                }      
            }        
        }       
    }
    //abrir open ctrl+o ctrlo  
    if (e.ctrlKey && e.key === '0') {        
        abrir();
    }
    //guardar safe ctrl+s ctrls  
    if (e.ctrlKey && e.key === 's') {        
        guardar();
    }
    //nuevo new ctrl+n ctrln  
    if (e.ctrlKey && e.key === 'n') {        
        nuevo();
    }
    //e.preventDefault();
    Drag_And_Drop();
}
function Borrar_objeto() {    
    document.getElementById("opciones_bloques").innerHTML = "";
    if (document.getElementsByClassName("seleccionado").length > 0) {
        OBJETO = document.getElementsByClassName("seleccionado")[0].parentNode.parentNode;
        Numero_objeto = Destino_Arratre.getAttribute("Numero_objeto");
        Numero_objeto --;
        Destino_Arratre.setAttribute("Numero_objeto",Numero_objeto);
    
        console.log(OBJETO.getAttribute("lineasuperior"),OBJETO.getAttribute("lineainferior"),OBJETO.getAttribute("lineainterna"));
        if (OBJETO.getAttribute("lineasuperior") != "") {
            document.getElementById(OBJETO.getAttribute("lineasuperior")).classList.add("linea_seleccionada");
            Borrar_linea();
        }
        if (OBJETO.getAttribute("lineainferior") != "") {   
            document.getElementById(OBJETO.getAttribute("lineainferior")).classList.add("linea_seleccionada");         
            Borrar_linea();        
        }
        if (OBJETO.id[6] == "D") {
            if (OBJETO.getAttribute("lineainterna") != "") {
                document.getElementById(OBJETO.getAttribute("lineainterna")).classList.add("linea_seleccionada");
                console.log(OBJETO.getAttribute("lineainterna"));
                Borrar_linea();
            }
        }
        if (OBJETO.id[6] == "B") {
            if (OBJETO.getAttribute("lineainterna") != "") {
                document.getElementById(OBJETO.getAttribute("lineainterna")).classList.add("linea_seleccionada");
                console.log(OBJETO.getAttribute("lineainterna"));
                Borrar_linea();
            }
            if (OBJETO.getAttribute("lineano") != "") {         
                document.getElementById(OBJETO.getAttribute("lineano")).classList.add("linea_seleccionada");
                Borrar_linea();
            }
        }
        switch (OBJETO.id[6]) {
            case 'A':
                objeto_a = Destino_Arratre.getAttribute("objeto_a");
                objeto_a --;
                Destino_Arratre.setAttribute("objeto_a",objeto_a);
                if (objeto_a <= 2) {
                    document.getElementById("objetoA").draggable = true;
                    document.getElementById("objetoA").style.opacity = 100;
                } 
                break;
            case 'B':
                objeto_b = Destino_Arratre.getAttribute("objeto_b");
                objeto_b --;
                Destino_Arratre.setAttribute("objeto_b",objeto_b);
                break;
            case "C":
                objeto_c = Destino_Arratre.getAttribute("objeto_c");
                objeto_c --;
                Destino_Arratre.setAttribute("objeto_c",objeto_c);
                break;
            case "D":
                objeto_d = Destino_Arratre.getAttribute("objeto_d");
                objeto_d --;
                Destino_Arratre.setAttribute("objeto_d",objeto_d);
                break;
        }
        document.querySelectorAll("[id^='bloque']").forEach(item => {
            document.getElementById(item.id).classList.add("oculto");
        });
        
        if (OBJETO.id != "") {   
            Destino_Arratre.removeChild(OBJETO);
        }        
        document.getElementById("parametro_funcion").style.visibility = "hidden";        
    }
}
function Borrar_linea() {
    
    if (document.getElementsByClassName("linea_seleccionada").length > 0) {
        Numero_linea -= 1;
        LINEA = document.getElementsByClassName("linea_seleccionada")[0];
        document.getElementById(LINEA.getAttribute("padre")).style="";
        document.getElementById(LINEA.getAttribute("hijo")).style="";
        Nodos = 0;
        document.getElementById(LINEA.getAttribute("padre")).setAttribute("estado",0);
        document.getElementById(LINEA.getAttribute("hijo")).setAttribute("estado",0);
        document.getElementById(LINEA.getAttribute("hijo")).parentNode.setAttribute("padre","");        
        //document.getElementById(LINEA.getAttribute("padre")).parentNode.setAttribute("lineainferior","");
        document.getElementById(LINEA.getAttribute("hijo")).parentNode.setAttribute("lineasuperior","");
        document.getElementById(LINEA.getAttribute("padre")).parentNode.getAttribute("lineasuperior");
        //console.log(document.getElementById(LINEA.getAttribute("padre")).parentNode,"padre",LINEA);
        if (document.getElementById(LINEA.getAttribute("padre")).parentNode.getAttribute("lineasuperior") == LINEA.id) {
            document.getElementById(LINEA.getAttribute("padre")).parentNode.setAttribute("lineasuperior","");
            document.getElementById(LINEA.getAttribute("padre")).parentNode.setAttribute("padre","");
        }
        if (document.getElementById(LINEA.getAttribute("padre")).parentNode.getAttribute("lineainferior") == LINEA.id) {
            document.getElementById(LINEA.getAttribute("padre")).parentNode.setAttribute("lineainferior","");
            document.getElementById(LINEA.getAttribute("padre")).parentNode.setAttribute("hijo","");
        }
        if (document.getElementById(LINEA.getAttribute("padre")).parentNode.getAttribute("lineainterna") == LINEA.id) {
            document.getElementById(LINEA.getAttribute("padre")).parentNode.setAttribute("lineainterna","");
            document.getElementById(LINEA.getAttribute("padre")).parentNode.setAttribute("dentro","");
        }
        if (document.getElementById(LINEA.getAttribute("padre")).parentNode.getAttribute("lineano") == LINEA.id) {
            document.getElementById(LINEA.getAttribute("padre")).parentNode.setAttribute("lineano","");
            document.getElementById(LINEA.getAttribute("padre")).parentNode.setAttribute("dentrono","");
        }
        /*
        if (document.getElementById(LINEA.getAttribute("padre")).parentNode.id[6] == "D") {
            document.getElementById(LINEA.getAttribute("padre")).parentNode.setAttribute("lineainterna","");
            document.getElementById(LINEA.getAttribute("padre")).parentNode.setAttribute("dentro","");
        }
        if (document.getElementById(LINEA.getAttribute("padre")).parentNode.id[6] == "B") {
            
            document.getElementById(LINEA.getAttribute("padre")).parentNode.setAttribute("lineainterna","");
            document.getElementById(LINEA.getAttribute("padre")).parentNode.setAttribute("dentro","");
            document.getElementById(LINEA.getAttribute("padre")).parentNode.setAttribute("lineano","");
            document.getElementById(LINEA.getAttribute("padre")).parentNode.setAttribute("dentrono","");
        }
        */
        document.getElementById("SVG").removeChild(LINEA);
        document.getElementById("parametro_funcion").style.visibility = "hidden";
        
        Numero_linea = Destino_Arratre.getAttribute("numero_linea");
        Numero_linea --;    
        Destino_Arratre.setAttribute("numero_linea",Numero_linea);
    }
}
function Soltar_linea() {
    if (Nodos == 1) {
        Numero_linea --;
        document.getElementById("SVG").childNodes.forEach(element => {
            if (element.id == Linea.id) {
                document.getElementById("SVG").removeChild(Linea);
                Padre_linea.style = "";//('hover');
                Nodos = 0;
            }
        });
    }
}
function bloque_inicio(OBJETO,valor) {
    OBJETO.setAttribute("opcion",valor);
    OBJETO.childNodes[3].classList.remove("Hidden");
    switch (valor){
        case "INICIO":
            if (OBJETO.getAttribute("lineasuperior") != "") {
                document.getElementById(OBJETO.getAttribute("lineasuperior")).classList.add("linea_seleccionada");
                Borrar_linea();
            }            
            OBJETO.childNodes[3].style.visibility = "hidden";
            OBJETO.childNodes[5].style.visibility = "visible";
            break;
        case "FIN":
            if (OBJETO.getAttribute("lineainferior") != "") {                
                document.getElementById(OBJETO.getAttribute("lineainferior")).classList.add("linea_seleccionada");
                Borrar_linea();
            }            
            OBJETO.childNodes[3].style.visibility = "visible";
            OBJETO.childNodes[5].style.visibility = "hidden";
            break;            
        default:
            break;
    }
}
function selectores_si(entrad) {
    VECTOR = [];    
    Def = document.getElementById(OBJETO.id).getAttribute("parametros").split(",");
    //console.log(Def[0],document.getElementById("Elemento A").value);
    if (Def[0] == "Texto" & document.getElementById("Elemento A").value == "Numero") {
        document.getElementById("Entrada A").value = 0;
        document.getElementById("Entrada B").value = 0;
    }
    switch (document.getElementById("Elemento A").value) {
        case "Numero":
            document.getElementById("Entrada A").setAttribute("type","number");
            document.getElementById("Entrada B").setAttribute("type","number");
            break;
        case "Texto":
            document.getElementById("Entrada A").setAttribute("type","text");
            document.getElementById("Entrada B").setAttribute("type","text");
            break;
        case "Logico":
            document.getElementById("Entrada A").setAttribute("type","number");
            document.getElementById("Entrada B").setAttribute("type","number");                    
            break;
    
        default:
            break;
    }
    if (entrad != "Condicion") {        
        document.getElementById("Condicion").innerHTML = "";
        switch (document.getElementById("Elemento A").value) {
            
            case "Texto":
                VECTOR = ["==","!="];
                document.getElementById(OBJETO.id).setAttribute("parametros",[Def[0],Def[1],"==",Def[3]]);
                break;
            case "Numero":
                VECTOR = [">",">=","<","<=","!=","=="];
                document.getElementById(OBJETO.id).setAttribute("parametros",[Def[0],Def[1],"==",Def[3]]);
                break;
            case "Logico":
                VECTOR = ["or","and"];
                document.getElementById(OBJETO.id).setAttribute("parametros",[Def[0],Def[1],"or",Def[3]]);
                break;
        
            default:
                break;
        }    
        VECTOR.forEach(element => {
            OPCION_SELECTOR = document.createElement("option");
            OPCION_SELECTOR.text = element;
            OPCION_SELECTOR.value = element;
            document.getElementById("Condicion").add(OPCION_SELECTOR); 
            document.getElementById("Condicion").value = document.getElementById(OBJETO.id).getAttribute("parametros").split(",")[2];    
        });
    }
    //ENTRADAS = Array.from(document.getElementById("opciones_bloques").getElementsByTagName(TIPO));
    ENTRADAS = document.getElementById("opciones_bloques").childNodes;
    DATOS = [];
    ENTRADAS.forEach(element => {
        if (element.tagName == "INPUT" | element.tagName == "SELECT" ) {
            DATOS.push(element.value);
        }
    });
    //console.log(DATOS);
    OBJETO.setAttribute("parametros",DATOS);
    Destino_Arratre.setAttribute("opcion", Math.random()*10);

}
function bloque_desicion(OBJETO,valor) {        
    document.getElementById("opciones_bloques").innerHTML = "";
    if (document.getElementById(OBJETO.id).getAttribute("parametros") == "") {
        document.getElementById(OBJETO.id).setAttribute("parametros",["Numero",0,"==",0]);
    }
    Def = document.getElementById(OBJETO.id).getAttribute("parametros").split(",");
    //console.log(Def);
    [["Elemento A","select",Def[0]],["Entrada A","input",Def[1]],["Condicion","select",Def[2]],["Entrada B","input",Def[3]]].forEach(element => {
        LECTOR = document.createElement(element[1]);
        LECTOR.id = element[0];
        if (element[1] == "input") {
            switch (Def[0]) {
                case "Numero":
                    LECTOR.setAttribute("type","number");
                    break;
                case "Texto":
                    LECTOR.setAttribute("type","text");
                    break;
                case "Logico":
                    LECTOR.setAttribute("type","number");                    
                    break;
            
                default:
                    break;
            }
        }
        document.getElementById("opciones_bloques").appendChild(document.createTextNode(element[0]));
        document.getElementById("opciones_bloques").appendChild(document.createElement("br"));
        document.getElementById("opciones_bloques").appendChild(LECTOR);
        document.getElementById("opciones_bloques").appendChild(document.createElement("br"));   
        LECTOR.setAttribute("onchange","selectores_si(\"" + element[0] + "\")");
        LECTOR.value = element[2];       
    });

    ["Texto", "Numero"].forEach(element => {
        OPCION_SELECTOR = document.createElement("option");
        OPCION_SELECTOR.text = element;
        OPCION_SELECTOR.value = element;
        document.getElementById("Elemento A").add(OPCION_SELECTOR);  
        document.getElementById("Elemento A").value = Def[0];      
    });
    
    selectores_si("L");
    switch (valor){
        case "SI":
            OBJETO.childNodes[9].style.visibility = "hidden";
            Borrar_linea();
            break;
        case "NO/SI":
            OBJETO.childNodes[9].style.visibility = "visible";
            OBJETO.childNodes[9].classList.remove("Hidden");
            break;
            /*
        case "CASOS":
            objeto.childNodes[9].style.visibility = "hidden";
            break; 
            */
        default:
            break;
    }
}
function bloque_funcion(OBJETO,valor) { 
    document.getElementById("opciones_bloques").innerHTML = "";
    switch (valor){        
        /*       
        generador_entradas("select",valor,["Cabeza","Brazo Derecho","Brazo Izquierdo","Pinzas"],[],OBJETO);
        console.log(document.getElementById("opciones_bloques").getElementsByTagName("select")[0]);
        document.getElementById("opciones_bloques").getElementsByTagName("select")[0].addEventListener("change",console.log("HOLA"));
        CASO MOVER
        */
        case "CABEZA":
            document.getElementById("opciones_bloques").innerHTML = "";
            Imagen_TCD = document.createElement("div");
            Imagen_TCD.id = "CABEZA";
            document.getElementById("opciones_bloques").appendChild(Imagen_TCD);
            if (OBJETO.getAttribute("parametros").split(",").length != 1) {
                OBJETO.setAttribute("parametros",0);
            }         
            generador_entradas("input",valor,["cabeza"],[["-85°","85°"]],OBJETO); 
            break;
        case "PINZAS":            
            document.getElementById("opciones_bloques").innerHTML = "";
            Imagen_TCD = document.createElement("div");
            Imagen_TCD.id = "PINZAS_1";
            document.getElementById("opciones_bloques").appendChild(Imagen_TCD);
            if (OBJETO.getAttribute("parametros") == "") {
                OBJETO.setAttribute("parametros","Pinza derecha,Abrir");
            }
            if (OBJETO.getAttribute("parametros").split(",").length != 2) {
                OBJETO.setAttribute("parametros","Pinza derecha,Abrir");
            }
            CONTENEDOR = document.createElement("div");
            CONTENEDOR.id = valor; 
            document.getElementById("opciones_bloques").appendChild(CONTENEDOR);
            C = 0;
            ["Pinza","Estado pinza"].forEach(element => {
                C ++;
                LECTOR = document.createElement("select");
                LECTOR.id = element;
                CONTENEDOR.appendChild(document.createTextNode(element));
                CONTENEDOR.appendChild(document.createElement("br"));
                CONTENEDOR.appendChild(LECTOR);
                CONTENEDOR.appendChild(document.createElement("br"));
                document.getElementById(element).setAttribute("onchange","actualizar(" + OBJETO.id + ", \"select\" )");
                
            });
            ["Pinza derecha", "Pinza izquierda"].forEach(element => {
                OPCION_SELECTOR = document.createElement("option");
                OPCION_SELECTOR.text = element;
                OPCION_SELECTOR.value = element;
                document.getElementById("Pinza").add(OPCION_SELECTOR);
                document.getElementById("Pinza").value = OBJETO.getAttribute("parametros").split(",")[0];
            });
            ["Abrir", "Cerrar"].forEach(element => {
                OPCION_SELECTOR = document.createElement("option");
                OPCION_SELECTOR.text = element;
                OPCION_SELECTOR.value = element;
                document.getElementById("Estado pinza").add(OPCION_SELECTOR);
                document.getElementById("Estado pinza").value = OBJETO.getAttribute("parametros").split(",")[1];      
            });               
            break;
        case "BRAZO IZQ.":
            document.getElementById("opciones_bloques").innerHTML = "";
            Imagen_TCD = document.createElement("div");
            Imagen_TCD.id = "TCD"; 
            document.getElementById("opciones_bloques").appendChild(Imagen_TCD);
            if (OBJETO.getAttribute("parametros").split(",").length != 1) {
                OBJETO.setAttribute("parametros","0,0,0,0,0,0,0");
            }
            articulaciones = ["SO","S1","E0","E1","W0","W1","W2"];
            limites = [["-97°", "97°"],["-123°", "60°"],["-174°", "174°"],["-2°", "150°"],["-175°", "175°"],["-90°", "120°"],["-175°", "175°"]];
            generador_entradas_TCD("input",valor,articulaciones,limites,OBJETO,["ART1","ART2","ART3","ART4","ART5","ART6","ART7"]);
            
            document.getElementById("opciones_bloques").classList.add("opciones_bloques");
            document.getElementById("opciones_bloques").appendChild(document.createElement("br"));
            
            boton_TCD = document.getElementById("opciones_bloques").appendChild(document.createElement("button"));
            document.getElementById("opciones_bloques").appendChild(document.createElement("br"));
            document.getElementById("opciones_bloques").appendChild(document.createElement("br"));
            boton_TCI = document.getElementById("opciones_bloques").appendChild(document.createElement("button"));
            
            boton_TCD.textContent = "Calcular TCD";
            boton_TCD.setAttribute("onclick", "TCD('izquierdo')");

            //boton_TCI.textContent = "Calcular TCI ";
            //boton_TCI.setAttribute("onclick", " TCI_menu('izquierdo')");
            break 

        case "BRAZO DER.":
            document.getElementById("opciones_bloques").innerHTML = "";
            Imagen_TCD = document.createElement("div");
            Imagen_TCD.id = "TCD_derecho";
            //Imagen_TCD.style.transform = "scaleX(-1)";
            document.getElementById("opciones_bloques").appendChild(Imagen_TCD);
            if (OBJETO.getAttribute("parametros").split(",").length != 1) {
                OBJETO.setAttribute("parametros", "0,0,0,0,0,0,0");
            }   
            articulaciones = ["SO","S1","E0","E1","W0","W1","W2"];
            limites = [["-97°", "97°"],["-123°", "60"],["-174°", "174"],["-2°", "150°"],["-175°", "175°"],["-90°", "120°"],["-175°", "175°"]];
            generador_entradas_TCD("input",valor,articulaciones,limites,OBJETO,["ART1","ART2","ART3","ART4","ART5","ART6","ART7"]);
            
            document.getElementById("opciones_bloques").appendChild(CONTENEDOR);
            
            document.getElementById("opciones_bloques").classList.add("opciones_bloques");
            document.getElementById("opciones_bloques").appendChild(document.createElement("br"));
            
            boton_TCD = document.getElementById("opciones_bloques").appendChild(document.createElement("button"));
            document.getElementById("opciones_bloques").appendChild(document.createElement("br"));
            document.getElementById("opciones_bloques").appendChild(document.createElement("br"));
            boton_TCI = document.getElementById("opciones_bloques").appendChild(document.createElement("button"));
            
            boton_TCD.textContent = "Calcular TCD";
            boton_TCD.setAttribute("onclick", "TCD('derecho')");

            //boton_TCI.textContent = "Calcular TCI";
            //boton_TCI.setAttribute("onclick", "TCI_menu('derecho')");
                    break    
        case "HOME":
            OBJETO.setAttribute("parametros","");
            break;
        case "SUBFUNCIÓN":
            OBJETO.setAttribute("parametros", "");
            listar_subfuncion(OBJETO.id);
            //OBJETO.setAttribute("parametros","");
            document.getElementById("opciones_bloques").innerHTML = "";
            CONTENEDOR = document.createElement("div");
            CONTENEDOR.id = valor; 
            document.getElementById("opciones_bloques").appendChild(CONTENEDOR);

            ["Subfunciones"].forEach(element => {
                LECTOR = document.createElement("select");
                LECTOR.id = element; 
                CONTENEDOR.appendChild(document.createTextNode(element));
                CONTENEDOR.appendChild(document.createElement("br"));
                CONTENEDOR.appendChild(LECTOR);
                CONTENEDOR.appendChild(document.createElement("br"));
                document.getElementById(element).setAttribute("onchange","actualizar(" + OBJETO.id + ", \"select\" )");   
            });
            
            console.log(OBJETO.getAttribute("parametros"));
            LECTOR.value = OBJETO.getAttribute("parametros"); 
            break;           
    }
}
function bloque_ciclo(OBJETO,valor) {
    switch (valor){
        case "PARA":
            generador_entradas("input",valor,["iteraciones"],[[1]],OBJETO);
        case "MIENTRAS":
            break;       
    }
}
function generador_entradas(TIPO,VALOR,VECTOR,LIMITES,INICIALES) {    
    CONTENEDOR = document.createElement("div");
    CONTENEDOR.Id = VALOR;
    C = 0;
    
    switch (TIPO) {
        case "select":
            SELECTOR = document.createElement("select");
            VECTOR.forEach(element => {
                OPCION_SELECTOR = document.createElement("option");
                OPCION_SELECTOR.text = element;
                OPCION_SELECTOR.value = element;
                SELECTOR.add(OPCION_SELECTOR);        
            });
            SELECTOR.setAttribute("onchange","actualizar(" + INICIALES.id + "," + "\"select\"" + ")");
            if (INICIALES.getAttribute("parametros") != "") {
                SELECTOR.value = INICIALES.getAttribute("parametros");
            }
            CONTENEDOR.appendChild(SELECTOR);         
            break;
        case "input":
            DATOS = [];
            VECTOR.forEach(element => {
                ENTRADA = document.createElement("input");
                ENTRADA.setAttribute("type","number");
                //ENTRADA.setAttribute("oninput","this.value|=0");
                CONTENEDOR.appendChild(document.createTextNode(element));
                
                if (LIMITES.length > 0){
                    ENTRADA.setAttribute("min",LIMITES[C][0]);
                    ENTRADA.setAttribute("max",LIMITES[C][1]);
                    CONTENEDOR.appendChild(document.createTextNode(" min: " + LIMITES[C][0] + " max:" + LIMITES[C][1]));
                }
                if (INICIALES.getAttribute("parametros") != "") {
                    if (JSON.parse("[" + INICIALES.getAttribute("parametros") + "]").length == VECTOR.length) {
                        ENTRADA.value = JSON.parse("[" + INICIALES.getAttribute("parametros") + "]")[C];
                        DATOS.push(ENTRADA.value);
                    }else{
                        ENTRADA.value = 0;
                        DATOS.push(ENTRADA.value);
                    }                    
                }else{
                    ENTRADA.value = 0;
                    DATOS.push(ENTRADA.value);
                }
                ENTRADA.setAttribute("onchange","actualizar(" + INICIALES.id + "," + "\"input\"" + ")");
                CONTENEDOR.appendChild(document.createElement("br"));        
                CONTENEDOR.appendChild(ENTRADA);        
                CONTENEDOR.appendChild(document.createElement("br"));    
                C ++; 
            });
            OBJETO.setAttribute("parametros",DATOS);        
            break;
    
        default:
            break;
    }    
    document.getElementById("opciones_bloques").appendChild(CONTENEDOR);
}
function generador_entradas_TCD(TIPO,VALOR,VECTOR,LIMITES,INICIALES,Imagenes) { 
    CONTENEDOR = document.createElement("div");
    CONTENEDOR.Id = VALOR;
    C = 0;
    
    switch (TIPO) {
        case "select":
            SELECTOR = document.createElement("select");
            VECTOR.forEach(element => {
                OPCION_SELECTOR = document.createElement("option");
                OPCION_SELECTOR.text = element;
                OPCION_SELECTOR.value = element;
                SELECTOR.add(OPCION_SELECTOR);        
            });
            SELECTOR.setAttribute("onchange","actualizar(" + INICIALES.id + "," + "\"select\"" + ")");
            if (INICIALES.getAttribute("parametros") != "") {
                SELECTOR.value = INICIALES.getAttribute("parametros");
            }
            CONTENEDOR.appendChild(SELECTOR);         
            break;
        case "input":
            DATOS = [];
            VECTOR.forEach(element => {
                ENTRADA = document.createElement("input");
                ENTRADA.setAttribute("type","number");
                //ENTRADA.setAttribute("oninput","this.value|=0");
                
                CONTENEDOR.appendChild(document.createElement("br"));
                CONTENEDOR_imagen = document.createElement("div");
                CONTENEDOR_imagen.id = Imagenes[C];
                CONTENEDOR.appendChild(CONTENEDOR_imagen); 
                CONTENEDOR.appendChild(document.createTextNode(element));
                
                if (LIMITES.length > 0){
                    ENTRADA.setAttribute("min",LIMITES[C][0]);
                    ENTRADA.setAttribute("max",LIMITES[C][1]);
                    CONTENEDOR.appendChild(document.createTextNode(" min: " + LIMITES[C][0] + " max:" + LIMITES[C][1]));
                }
                if (INICIALES.getAttribute("parametros") != "") {
                    if (JSON.parse("[" + INICIALES.getAttribute("parametros") + "]").length == VECTOR.length) {
                        ENTRADA.value = JSON.parse("[" + INICIALES.getAttribute("parametros") + "]")[C];
                        DATOS.push(ENTRADA.value);
                    }else{
                        ENTRADA.value = 0;
                        DATOS.push(ENTRADA.value);
                    }                    
                }else{
                    ENTRADA.value = 0;
                    DATOS.push(ENTRADA.value);
                }
                ENTRADA.setAttribute("onchange","actualizar(" + INICIALES.id + "," + "\"input\"" + ")");
                CONTENEDOR.appendChild(document.createElement("br"));        
                CONTENEDOR.appendChild(ENTRADA);        
                CONTENEDOR.appendChild(document.createElement("br"));    
                C ++; 
            });
            OBJETO.setAttribute("parametros",DATOS);        
            break;
    
        default:
            break;
    }    
    document.getElementById("opciones_bloques").appendChild(CONTENEDOR);  
}
function actualizar(OBJETO,TIPO) {   
    ENTRADAS = Array.from(document.getElementById("opciones_bloques").getElementsByTagName(TIPO));
    //console.log(ENTRADAS);
    DATOS = [];
    ENTRADAS.forEach(element => {
        console.log(element.value);
        if (OBJETO.id[6] == "C") {
            if (element.value == "") {
                DATOS.push(0);                
            } else {
                DATOS.push(element.value);
            }
        } else {
            DATOS.push(element.value);
        }       
        if (element.value == "Pinza izquierda") {
            document.getElementById("PINZAS_1").style.transform = "scaleX(-1)";
        }
        if (element.value == "Pinza derecha") {
            document.getElementById("PINZAS_1").style.transform = "scaleX(1)";
        }
    });
    //console.log(DATOS);
    if (OBJETO.id[6] == "D") {
        if (DATOS[0] < 1) {
            DATOS[0] = 1;
        }
    }

    OBJETO.setAttribute("parametros",DATOS);
    Destino_Arratre.setAttribute("opcion", Math.random()*10);
}
function actualizar1() {
    document.getElementById("valor_variable").innerHTML = "";
    valor_variable = document.createElement("input");
    switch (document.getElementsByClassName("menu_opciones")[0].getElementsByTagName("select")[0].value) {
        case "Entero":
            valor_variable.type = "number";
            break;
        case "Texto":
            valor_variable.type = "text";
            break;
        case "Lógico":
            valor_variable.type = "checkbox";
            break;
    
        default:
            break;
    }

    document.getElementById("valor_variable").appendChild(document.createTextNode("Ingrese el valor de la variable"));            
    document.getElementById("valor_variable").appendChild(document.createElement("br"));
    document.getElementById("valor_variable").appendChild(valor_variable);
}
function añadir_variable() {
    cuadro_dialogo("añadir",[]);
}
function click_boton_abrir(link) {
    if (document.getElementsByClassName("elemento_abrir_escogido").length >0) {
        NOMBRE =document.getElementsByClassName("elemento_abrir_escogido")[0].id;        
        
        $.post({
            url: link,        
            data: JSON.stringify(peticion_abrir = {nombre:NOMBRE}),
            contentType: "application/json",
            success: function(respuesta_abrir,status) {
                observer.disconnect();
                let documento = new DOMParser().parseFromString(respuesta_abrir, "text/html");
                document.getElementById("contenedor-drop").innerHTML = documento.body.firstChild.innerHTML;
                
                for (let i = 0; i < documento.body.firstChild.attributes.length; i++) {
                    if (documento.body.firstChild.attributes[i].nodeName != "id") {
                        document.getElementById("contenedor-drop").setAttribute(documento.body.firstChild.attributes[i].nodeName,documento.body.firstChild.attributes[i].nodeValue);
                    }
                }
                document.getElementById("parametro_funcion").style.visibility = "hidden";
                if (document.getElementsByClassName("seleccionado").length > 0) {
                    document.getElementsByClassName("seleccionado")[0].classList.remove("seleccionado");
                }
                if (document.getElementsByClassName("linea_seleccionada").length > 0) {
                    document.getElementsByClassName("linea_seleccionada")[0].classList.remove("linea_seleccionada");
                }
                if (NOMBRE.length >= 8) {
                    document.getElementById("tab_").textContent = NOMBRE.slice(0,5) + "...";
                }
                else{
                    document.getElementById("tab_").textContent = NOMBRE.slice(0,-5);
                }
                document.getElementById("tab_").setAttribute("title",NOMBRE.slice(0,-5));
                g = 1;
                if (link == "/abrir_ejemplo") {
                    g = 0;
                }
                document.getElementById("contenedor-tab").setAttribute("ctrl-z","");
                observer.observe(document.getElementById("contenedor-drop"), configuracion_observador);
                copia_z = [];
                copia_z.push(document.getElementById("contenedor-drop").outerHTML);
            }
        });
        document.body.removeChild(document.getElementsByClassName("vacio_gris")[0]); 
        /*
        document.getElementById("contenedor-tab").setAttribute("ctrl-z","");
        console.log(document.getElementById("contenedor-tab").getAttribute("ctrl-z"));
        */
    }
}
function cuadro_dialogo(funcion, lista) {
    ventana_variable = document.createElement("div");   
    document.body.appendChild(ventana_variable);
    dialogo_variable = document.createElement("div");
    ventana_variable.appendChild(dialogo_variable);
    ventana_variable.addEventListener('click', function (event) {
        if(event.target.classList[0] == 'vacio_gris'){
            document.body.removeChild(ventana_variable);
        }
    });
    ventana_variable.classList.add('vacio_gris');
    dialogo_variable.classList.add('vacio_blanco');
    titulo = dialogo_variable.appendChild(document.createElement("div"));
    titulo.classList.add('titulo_');
    boton = dialogo_variable.appendChild(document.createElement("button"));
    boton.classList.add('boton_');
    switch (funcion) {
        case "abrir":            
            titulo.textContent ="Seleccione el archivo que desea abrir:";            
            //X = document.getElementById("X").cloneNode(true);
            //titulo.appendChild(X);
            //icono=Div.classList.add('elemento_abrir');            
            menu_opciones = document.createElement("div");
            menu_opciones.classList.add("menu_opciones");
            L = ["","","","","","","","","","","","","","","","","","","","","","","","",""];
            lista.forEach(item => {
                //console.log(item,typeof(item));
                icono = document.createElement("div");
                icono.classList.add("elemento_abrir");
                icono.id = item;
                icono.setAttribute("onclick","oprimir(\"" + item.slice(0,-5) + "\")");
                icono.setAttribute("ondblclick","click_boton_abrir('/abrir')");
                icono.setAttribute("tittle",item.slice(0,-5));
                if (item.length >= 15) {
                    icono.innerHTML = "<div class=" + "icono" + "></div>" + item.slice(0,8) + "...";
                }
                else{
                    icono.innerHTML = "<div class=" + "icono" + "></div>" + item.slice(0,-5);
                }
                menu_opciones.appendChild(icono);
            });
            dialogo_variable.appendChild(menu_opciones);            
            //dialogo_variable.appendChild(document.createElement("button"));            
            //dialogo_variable.appendChild(document.createElement("button"));
            //return 
            boton.textContent = "Abrir archivo";
            boton.setAttribute("onclick", "click_boton_abrir('/abrir')");
            break;
        
        case "ejemplo":            
            titulo.textContent ="Seleccione el ejemplo que desea abrir:";      
            menu_opciones = document.createElement("div");
            menu_opciones.classList.add("menu_opciones");
            lista.forEach(item => {
                icono = document.createElement("div");
                icono.classList.add("elemento_abrir");
                icono.id = item;
                icono.setAttribute("onclick","oprimir(\"" + item.slice(0,-5) + "\")");
                icono.setAttribute("ondblclick","click_boton_abrir('/abrir_ejemplo')");
                icono.setAttribute("tittle",item.slice(0,-5));
                if (item.length >= 8) {
                    icono.innerHTML = "<div class=" + "icono" + "></div>" + item.slice(0,5) + "...";
                }
                else{
                    icono.innerHTML = "<div class=" + "icono" + "></div>" + item.slice(0,-5);
                }
                menu_opciones.appendChild(icono);
            });
            dialogo_variable.appendChild(menu_opciones);
            boton.textContent = "Abrir Ejemplo";
            boton.setAttribute("onclick", "click_boton_abrir('/abrir_ejemplo')");
            break;
        case "añadir":            
            titulo.textContent ="Configure la variable que desea añadir:";
            dialogo_variable.appendChild(document.createElement("br"));                       
            menu_opciones = document.createElement("div");            
            menu_opciones.classList.add("menu_opciones");
            
            nombre_variable = document.createElement("input");
            tipo_variable = document.createElement("select");

            menu_opciones.appendChild(document.createTextNode("Asigne nombre a la variable"));            
            menu_opciones.appendChild(document.createElement("br"));
            menu_opciones.appendChild(nombre_variable);
            menu_opciones.appendChild(document.createElement("br"));
            
            menu_opciones.appendChild(document.createTextNode("Escoja el tipo de variable"));            
            menu_opciones.appendChild(document.createElement("br"));
            menu_opciones.appendChild(tipo_variable);
            menu_opciones.appendChild(document.createElement("br"));
            
            VECTOR = ["Entero", "Texto", "Lógico"];
            VECTOR.forEach(element => {
                OPCION_SELECTOR = document.createElement("option");
                OPCION_SELECTOR.text = element;
                OPCION_SELECTOR.value = element;
                tipo_variable.add(OPCION_SELECTOR);        
            });
            tipo_variable.value = "";
            tipo_variable.setAttribute("onchange","actualizar1()");
            VALOR_variable = document.createElement("div");
            VALOR_variable.id = "valor_variable";
            menu_opciones.appendChild(VALOR_variable);
            dialogo_variable.appendChild(menu_opciones);
            boton.textContent = "Crear variable";
            boton.setAttribute("onclick", "click_boton()");
            break;
        case "cargando":
            ventana_variable.removeChild(document.getElementsByClassName("vacio_blanco")[0]);        
            break;
        case "configurar simulacion":
            titulo.textContent ="Configure si desea  añadir mesa y un objeto para la simulación:";
            dialogo_variable.appendChild(document.createElement("br"));
            opciones_ = document.createElement("div");
            opciones_.classList.add("opciones_simulacion");                              
            opciones_simulacion = document.createElement("input");
            opciones_simulacion.id = "check_mesa"; 
            opciones_simulacion.setAttribute("type","checkbox");            
            opciones_simulacion.setAttribute("onclick", "click_configuracion_simulacion()");
            opciones_simulacion.classList.add("opciones_simulacion"); 
            opciones_.appendChild(opciones_simulacion);
            opciones_.appendChild(opciones_simulacion);
            dialogo_variable.appendChild(opciones_);
            boton.textContent = "Configurar";
            boton.setAttribute("onclick", "click_boton_abrir('/abrir')");
            break;
        case "TCI":
            titulo.textContent ="Calcular el TCI del brazo:";
            menu_opciones = document.createElement("div");
            menu_opciones.classList.add("menu_opciones");
            menu_opciones.id ="cont";
            VECTOR = ["X","Y","Z","Roll","Pitch","Yaw"];
            C = 0;
            INICIALES = Array.from(document.getElementById("opciones_bloques").getElementsByTagName("input"));
            i2 = 0;
            INICIALES.forEach(element => {
                //console.log(element.value);
                //grados_libertad[i1] = element.value;
                i2 ++;  
            });
            VECTOR.forEach(element => {
                ENTRADA = document.createElement("input");
                ENTRADA.setAttribute("type","number");
                //ENTRADA.setAttribute("oninput","this.value|=0");
                menu_opciones.appendChild(document.createTextNode(element));
                menu_opciones.appendChild(document.createElement("br"));        
                menu_opciones.appendChild(ENTRADA);        
                menu_opciones.appendChild(document.createElement("br"));
                ENTRADA.value = 0;    
                C ++; 
            });
            brazo = lista;

            dialogo_variable.appendChild(menu_opciones);
            boton.textContent = "Calcular TCI";
            boton.setAttribute("onclick", "TCI('" + brazo[0] + "')");
            break;
    
        default:
            break;
    }

}
let configuracion_simulacion = 0;
function programar(orden) {

    document.querySelectorAll("[id^='objetoA_']").forEach(item => {

        if (item.getAttribute("hijo") != "" ) { //&& item.getAttribute("opcion") == 0
            programa = leer_orden(item,item.getAttribute("hijo"),"hijo");
            //console.log(item);  
        }
        if (item.getAttribute("padre") != "" ) { //&& item.getAttribute("opcion") == 0
            programa_inverso = leer_orden(item,item.getAttribute("padre"),"padre");
            //console.log(item);
        }
    });
    programa.shift();
    console.log(programa,programa_inverso,programa_inverso.reverse());

    document.querySelectorAll("[id^='objetoB_']").forEach(item => {
        if (item.getAttribute("dentro") != "") {
            item.setAttribute("contenido",leer_orden(item,item.getAttribute("dentro"),"hijo"));
        } else{
            item.setAttribute("contenido","");
        }
        let K = "";
        if (item.getAttribute("dentrono") != "") {
            K = leer_orden(item,item.getAttribute("dentrono"),"hijo");
            K.shift();
            console.log(K);
            item.setAttribute("contenidono",K);
        } else{
            item.setAttribute("contenidono","");
        }
    });

    document.querySelectorAll("[id^='objetoD_']").forEach(item => {
        if (item.getAttribute("dentro") != "") {
            item.setAttribute("contenido",leer_orden(item,item.getAttribute("dentro"),"hijo"));
        } else{
            item.setAttribute("contenido","");
        }
    });
    
    tabla_bloques = [];
    document.querySelectorAll("[id^='objeto']").forEach(item => {
        F = new Object();
        F.id = item.id;
        F.opcion = item.getAttribute("opcion");
        F.parametros = item.getAttribute("parametros");
        F.contenido = item.getAttribute("contenido");
        if (item.id[6] == "B") {
            F.contenidono = item.getAttribute("contenidono");
        }       
        tabla_bloques.push(F);
    });
    for (let i = 0; i < 4; i++) {
        tabla_bloques.shift();
    }
    console.log(tabla_bloques);
    if (programa.length > 0 & programa[programa.length - 1].indexOf("objetoA_") != -1) {
        if (orden == "simulacion") {        
            fondo_cargando = document.createElement("div");
            fondo_cargando.id = "fondo_cargando";
            document.body.appendChild(fondo_cargando);            
        }
        lineas = Destino_Arratre.getAttribute("numero_linea");
        $.post({
            url: "/programar",        
            data: JSON.stringify([orden,programa,tabla_bloques,document.getElementById("tab_").getAttribute("title"),lineas],configuracion_simulacion),
            contentType: "application/json",
            success: function(respuesta) {
                console.log(respuesta);
                if (respuesta == "OK") {                        
                    alert("Simulacion exitosa");
                    document.body.removeChild(document.getElementById("fondo_cargando"));
                }
                if (respuesta == "NO") {                        
                    alert("Robot no conectado");
                    document.body.removeChild(document.getElementById("fondo_cargando"));
                }
            }
        });
    }
    else{
        alert("flujo del programa incompleto asegurese de tener un inicio y un fin");
    }
}
function subfuncion(link) {
    document.querySelectorAll("[id^='objetoA_']").forEach(item => {

        if (item.getAttribute("hijo") != "" ) { //&& item.getAttribute("opcion") == 0
            programa = leer_orden(item,item.getAttribute("hijo"),"hijo");
            //console.log(item);  
        }
        if (item.getAttribute("padre") != "" ) { //&& item.getAttribute("opcion") == 0
            programa_inverso = leer_orden(item,item.getAttribute("padre"),"padre");
            //console.log(item);
        }
    });
    programa.shift();
    console.log(programa,programa_inverso,programa_inverso.reverse());

    document.querySelectorAll("[id^='objetoB_']").forEach(item => {
        if (item.getAttribute("dentro") != "") {
            item.setAttribute("contenido",leer_orden(item,item.getAttribute("dentro"),"hijo"));
        } else{
            item.setAttribute("contenido","");
        }
        let K = "";
        if (item.getAttribute("dentrono") != "") {
            K = leer_orden(item,item.getAttribute("dentrono"),"hijo");
            K.shift();
            console.log(K);
            item.setAttribute("contenidono",K);
        } else{
            item.setAttribute("contenidono","");
        }
    });

    document.querySelectorAll("[id^='objetoD_']").forEach(item => {
        if (item.getAttribute("dentro") != "") {
            item.setAttribute("contenido",leer_orden(item,item.getAttribute("dentro"),"hijo"));
        } else{
            item.setAttribute("contenido","");
        }
    });
    
    tabla_bloques = [];
    document.querySelectorAll("[id^='objeto']").forEach(item => {
        F = new Object();
        F.id = item.id;
        F.opcion = item.getAttribute("opcion");
        F.parametros = item.getAttribute("parametros");
        F.contenido = item.getAttribute("contenido");
        if (item.id[6] == "B") {
            F.contenidono = item.getAttribute("contenidono");
        }       
        tabla_bloques.push(F);
    });
    for (let i = 0; i < 4; i++) {
        tabla_bloques.shift();
    }
    console.log(tabla_bloques);
    
    if (g >0 & programa.length > 0 & programa[programa.length - 1].indexOf("objetoA_") != -1) {        
        
        lineas = Destino_Arratre.getAttribute("numero_linea");
        $.post({
            url: link,//"/subfuncion",        
            data: JSON.stringify([document.getElementById("tab_").getAttribute("title"),programa,tabla_bloques]),
            contentType: "application/json",
            success: function(respuesta) {
                //console.log(respuesta);
                console.log(typeof(respuesta));
                if (link = "/descarga") {                    
                    var doc = new jsPDF();
                    var C = 0;
                    respuesta.split("\n").forEach(element => {
                        C++;
                        doc.text(element, 10, 10*C);
                        if (C == 35) {
                            doc.addPage ();
                            doc.text(element, 10, 10*C);
                        }
                    });                    
                    doc.save(document.getElementById("tab_").getAttribute("title")+".pdf");
                }
            }
        });
    }    
    else{
        alert("flujo del programa incompleto asegurese de tener un inicio y un fin");
    }
    if (g <= 0) {
        alert("Guarde el archivo, para crear la subfunción.");
    }
}
function leer_orden(inicial,origen,atributo) {
    condicion = 1;
    INICIO = origen;
    var VECTOR_CONTENIDO = [inicial.id, INICIO];
    if (INICIO != "" || document.getElementById(INICIO).getAttribute(atributo) != "") {
        while (condicion == 1) {
            if (document.getElementById(INICIO).getAttribute(atributo) == "") {
                condicion = 0;
            }else{
                VECTOR_CONTENIDO.push(document.getElementById(INICIO).getAttribute(atributo));
                INICIO = document.getElementById(INICIO).getAttribute(atributo);
            }
        }
    }
    return VECTOR_CONTENIDO; 
} 
function guardar() {
    objeto_guardar = document.getElementById("contenedor-drop");
    if (g<1){
        peticion_guardar.nombre = prompt("Ingrese el nombre del archivo:");
    }
    else{
        peticion_guardar.nombre = document.getElementById("tab_").getAttribute("title");
    }
    peticion_guardar.objeto = objeto_guardar.outerHTML;
    peticion_guardar.version = g;
    if (peticion_guardar.nombre != null & peticion_guardar.nombre != ""){
        g ++;
        $.post({
            url: "/guardar",        
            data: JSON.stringify(peticion_guardar),
            contentType: "application/json",
            success: function(respuesta_guardar,status) {
                if(respuesta_guardar === "OK") {
                    exito = "exito";
                    alert("Archivo guardado exitosamente.");
                    if (peticion_guardar.nombre.length >= 8) {
                        document.getElementById("tab_").textContent = peticion_guardar.nombre.slice(0,5) + "...";
                    }
                    else{
                        document.getElementById("tab_").textContent = peticion_guardar.nombre;
                    }
                    document.getElementById("tab_").setAttribute("title",peticion_guardar.nombre);
                    //window.location.replace("/Arch");      
                }else{
                    alert("El nombre del archivo ya existe.");
                    g --;
                }
                console.log(respuesta_guardar,g);        
            }
        });
    }
    else{
        alert("Asigne un nombre.");
    }

    /*
    var request =$.ajax({
        type:"POST", // la variable type guarda el tipo de la peticion GET,POST,..
        url:"/guardar", //url guarda la ruta hacia donde se hace la peticion
        data: JSON.stringify({P:objeto_guardar.outerHTML}), // data recive un objeto con la informacion que se enviara al servidor
        //dataType: "text" // El tipo de datos esperados del servidor. Valor predeterminado: Intelligent Guess (xml, json, script, text, html).
        contentType: "application/Json"
    });
    request.done(function(respuesta) {
        console.log(request);
        console.log(respuesta);
        console.log(respuesta.foo); //foo es una propiedad (clave), del json que devuelve el servidor
        //Tratamos a respuesta según sea el tipo  y la estructura               
    });
    
    request.fail(function(jqXHR, textStatus) {
        alert("Hubo un error: " + textStatus);
    });
    */
}
function guardar_como() {
    objeto_guardar = document.getElementById("contenedor-drop");
    peticion_guardar.nombre = prompt("Ingrese el nombre del archivo:");
    peticion_guardar.objeto = objeto_guardar.outerHTML;
    if (peticion_guardar.nombre != null & peticion_guardar.nombre != ""){
        $.post({
            url: "/guardar",        
            data: JSON.stringify(peticion_guardar),
            contentType: "application/json",
            success: function(respuesta_guardar,status) {
                if(respuesta_guardar === "OK") {
                    exito = "exito";
                    alert("Archivo guardado exitosamente.");
                    if (peticion_guardar.nombre.length >= 8) {
                        document.getElementById("tab_").textContent = peticion_guardar.nombre.slice(0,5) + "...";
                    }
                    else{
                        document.getElementById("tab_").textContent = peticion_guardar.nombre;
                    }
                    document.getElementById("tab_").setAttribute("title",peticion_guardar.nombre);
                        
                }else{
                    alert("El nombre del archivo ya existe.");
                }
                //console.log(respuesta_guardar,g);        
            }
        });
    }
    if (peticion_guardar.nombre == "") {        
        alert("Asigne un nombre.");
    }
}
function cuadricula() {    
    estado_cuadricula =  (Destino_Arratre.getAttribute("cuadricula") === "true");
    estado_cuadricula = !estado_cuadricula;
    Destino_Arratre.setAttribute("cuadricula", estado_cuadricula);
    if (estado_cuadricula == true) {
        Chulo = document.createElement("div");
        Chulo.id ="Chulo";
        document.getElementById("cuadricula").appendChild(Chulo);
        Destino_Arratre.classList.add("cuadricula");
    }
    else{
        Destino_Arratre.classList.remove("cuadricula");
        document.getElementById("cuadricula").removeChild(document.getElementById("Chulo"));
    }

}
function abrir() {
    //document.getElementById("contenedor-tab").setAttribute("lista","");
    $.post({
        url: "/listar",        
        data: JSON.stringify(),
        contentType: "application/json",
        success: function(respuesta) {
            //document.getElementById("contenedor-tab").setAttribute("lista",respuesta);
            //console.log(respuesta);
            cuadro_dialogo("abrir",respuesta);
            console.log(respuesta);
        }
    });   
}
function abrir_ejemplo() {
    //document.getElementById("contenedor-tab").setAttribute("lista","");
    $.post({
        url: "/listar_ejemplos",        
        data: JSON.stringify(),
        contentType: "application/json",
        success: function(respuesta) {
            //document.getElementById("contenedor-tab").setAttribute("lista",respuesta);
            console.log(respuesta);
            cuadro_dialogo("ejemplo",respuesta);
            g = 1;
            console.log(g);
        }
    });   
}
function oprimir(params) {
    if (document.getElementsByClassName("elemento_abrir_escogido").length >0) {        
        document.getElementsByClassName("elemento_abrir_escogido")[0].classList.add("elemento_abrir");
        document.getElementsByClassName("elemento_abrir_escogido")[0].classList.remove("elemento_abrir_escogido");
    }
    document.getElementById(params + ".html").classList.remove("elemento_abrir");
    document.getElementById(params + ".html").classList.add("elemento_abrir_escogido");
}
function actualizar_lista(params) {
    // idea para la list sin lack
    if (document.getElementsByClassName("vacio_gris").length == 1){
        cuadro_dialogo("abrir")
    }
}
function listar_subfuncion(OBJETO) {
    //document.getElementById("contenedor-tab").setAttribute("lista","");
    $.post({
        url: "/listar_subfunciones",        
        data: JSON.stringify(),
        contentType: "application/json",
        success: function(respuesta) {
            document.getElementById(OBJETO).setAttribute("lista",respuesta);         
            respuesta.forEach(element => {
                OPCION_SELECTOR = document.createElement("option");
                OPCION_SELECTOR.text = element.slice(0,-4);
                OPCION_SELECTOR.value = element.slice(0,-4);
                document.getElementById("Subfunciones").add(OPCION_SELECTOR);      
            });             
            document.getElementById("Subfunciones").value = document.getElementById(OBJETO).getAttribute("parametros"); 
        }
    });
}
function descargar() {
    $.post({
        url: "/descargar",        
        data: JSON.stringify([document.getElementById("tab_").getAttribute("title")]),
        contentType: "application/json",
        success: function(respuesta) {
            //console.log(respuesta);
            console.log(typeof(respuesta));
        }
    });

    //subfuncion("/descarga");
    //html2canvas(Destino_Arratre).then(canvas => {
        //document.body.appendChild(canvas);
        /*
        //const doc = new jsPDF();
        //doc.text("Hello world!", 10, 10);
        
        var pdf = new jsPDF("p", "pt", "a4");
        pdf.addImage(canvas, 'PNG', 0, 0, 135, 75);
        pdf.save('div.pdf');

        //doc.save("a4.pdf");
        */
       //var img    = canvas.toDataURL("image/png");
       //document.write('<img src="'+img+'"/>');
    //});
    /*
   html2canvas(Destino_Arratre, {
    onrendered: function (canvas) {
        document.getElementById("contenedor-funciones").append(canvas);
        console.log(canvas);
        getCanvas = canvas;
        }
    });*/
    
}
// crear nuevo documento
function nuevo() {    
    if (confirm("¿Desea crear un nuevo archivo?\n Sino a guardado perdera el avance.")){        
        window.location.replace("/Inter");
    }
    else{
        guardar();
        //console.log(exito,exito == "exito");
        if(exito == "exito"){
            window.location.reload();
            window.location.replace("/Inter");
            exito = "";
        }
    }
}
function color() {
    //document.getElementById("COLOR").value = "#FF0000"; 
    let A = document.getElementById("COLOR").value; 
    //yourNumber.toString(16);
    //parseInt(hexString, 16);
    R = parseInt(A.slice(1,3),16)/255;
    G = parseInt(A.slice(3,5),16)/255;
    B = parseInt(A.slice(5,7),16)/255;

    Cmax = Math.max(R, G, B);
    Cmin = Math.min(R, G, B);

    Delta = Cmax - Cmin; 

    if (Delta == 0) {
        H = 0;
    } else {
        switch (Cmax) {
            case R:
                H = 60*(((G-B)/Delta)%6);
                break;
            case G:
                H = 60*((B-R)/Delta+2);
                break;
            case B:
                H = 60*((R-G)/Delta+4);
                break;
        }
    }

    L = (Cmax + Cmin)/2;

    if (Delta == 0) {
        S = 0;
    } else {
        S = Delta/(1-Math.abs(2*L-1));
    }

    H1 = H + 90; 
    H2 = H + 180; 
    H3 = H + 270;
    Hnodo1 = H + 120;
    Hnodo2 = H + 240;

    RGB = HSL_A_HEX(H,L,S);
    var elements = document.querySelectorAll('.objetoA');
    for(var i=0; i<elements.length; i++){
        elements[i].style.fill = RGB;
        elements[i].style.stroke = RGB;
    }
    
    RGB1 = HSL_A_HEX(H1,L,S); 
    var elements = document.querySelectorAll('.objetoB');
    for(var i=0; i<elements.length; i++){
        elements[i].style.fill = RGB1;
        elements[i].style.stroke = RGB1;
    }

    RGB2 = HSL_A_HEX(H2,L,S); 
    var elements = document.querySelectorAll('.objetoC');
    for(var i=0; i<elements.length; i++){
        elements[i].style.fill = RGB2;
        elements[i].style.stroke = RGB2;
    }

    RGB3 = HSL_A_HEX(H3,L,S); 
    var elements = document.querySelectorAll('.objetoD');
    for(var i=0; i<elements.length; i++){
        elements[i].style.fill = RGB3;
        elements[i].style.stroke = RGB3;
    }
}
function HSL_A_HEX(H,L,S) {
    if (H > 360) {
        H = H - 360;
    }
    if(H < 0){
        H = 360 + H;
    }
    C = (1 - Math.abs(2*L-1))*S;
    X = C*(1 - Math.abs((H/60)%2 - 1));
    M = L - (C/2);

    C = Math.round((C+M)*255);
    X = Math.round((X+M)*255);

    switch (true) {
        case (H>=0 && H<60):
            HSL = [C,X,Math.round(M*255)];
            break;
        case (H>=60 && H<120):
            HSL = [X,C,Math.round(M*255)];
            break;
        case (H>=120 && H<180):
            HSL = [Math.round(M*255),C,X];
            break;
        case (H>=180 && H<240):
            HSL = [Math.round(M*255),X,C];
            break;
        case (H>=240 && H<300):
            HSL = [X,Math.round(M*255),C];
            break;
        case (H>=300 && H<360):
            HSL = [C,Math.round(M*255),X];
            break;
    }
    RGB = "#";
    HSL.forEach(element => {
        if (element.toString(16).length < 2) {
            RGB = RGB + "0" + element.toString(16);
        }else{
            RGB = RGB+element.toString(16);
        }        
    });   
    return RGB;
}
function añadir_pestaña() {
    contador += 1;
    pestaña = document.getElementById(TAB.id).cloneNode(true);
    contenedor = document.getElementById(CLON.id).cloneNode(true);
    pestaña.id = pestaña.id + contador;
    pestaña.firstChild.data = "proyecto" + contador;
    contenedor.id = contenedor.id + contador;
    document.getElementById("tabs").insertBefore(pestaña,document.getElementById("tabs").childNodes[document.getElementById("tabs").childNodes.length - 2]);
    document.getElementById("contenedor-tab").appendChild(contenedor);
    console.log(TAB.id,pestaña,contenedor);
}
function matrixDot (A, B) {
    var result = new Array(A.length).fill(0).map(row => new Array(B[0].length).fill(0));

    return result.map((row, i) => {
        return row.map((val, j) => {
            return A[i].reduce((sum, elm, k) => sum + (elm*B[k][j]) ,0)
        })
    })
}
function matrixInv (A) {    
    DET = determinante(A);
    console.log(DET);
    ADJ = matrixAdj(A);    
    console.log(ADJ[0] + "\n" + ADJ[1] + "\n" + ADJ[2] + "\n" + ADJ[3]);
    TRA = matrixTra(ADJ);    
    console.log(TRA[0] + "\n" + TRA[1] + "\n" + TRA[2] + "\n" + TRA[3]);
    INV = createMatriz(A.length);
    for (let I1 = 0; I1 < A.length; I1++) {     
        for (let J1 = 0; J1 < A.length; J1++) {
              INV[I1][J1] = TRA[I1][J1]/DET;          
        }        
    }
    return INV;
}
function matrixAdj (A) {
    ADJ = createMatriz(A.length);       
    //console.log(A[0] + "\n" + A[1] + "\n" + A[2] + "\n" + A[3],A );
    M = createMatriz(A.length);
    for (let I0 = 0; I0 < A.length; I0++) {
        for (let J0 = 0; J0 < A.length; J0++) {
            M[I0][J0]= A[I0][J0];            
        }
    }
    for (let I1 = 0; I1 < A.length; I1++) {     
        //console.log(M[0] + "\n" + M[1] + "\n" + M[2] + "\n" + M[3] );
        
        M.splice(I1,1);        
        //console.log(A[0] + "\n" + A[1] + "\n" + A[2] + "\n" + A[3],A );
        //console.log(M[0] + "\n" + M[1] + "\n" + M[2] + "\n" + M[3],I1 );
        AUX_M = createMatriz(M.length);
        for (let I0 = 0; I0 < M.length; I0++) {
            for (let J0 = 0; J0 < M[0].length; J0++) {
                AUX_M[I0][J0]= M[I0][J0];            
            }
        }
        //console.log(AUX_M[0] + "\n" + AUX_M[1] + "\n" + AUX_M[2] + "\n" + AUX_M[3], I1 );
        for (let J1 = 0; J1 < A.length; J1++) {
            
            for (let A1 = 0; A1 < AUX_M.length; A1++) {
                AUX_M[A1].splice(J1,1);                
            }         
            R = Math.pow(-1,(I1+J1+2))*determinante(AUX_M);
            //console.log(AUX_M[0] + "\n" + AUX_M[1] + "\n" + AUX_M[2] + "\n" + AUX_M[3], I1 );
            //console.log(R,determinante(AUX_M));
            ADJ[I1][J1] = R;
            AUX_M = createMatriz(M.length);
            for (let I0 = 0; I0 < M.length; I0++) {
                for (let J0 = 0; J0 < M[0].length; J0++) {
                    AUX_M[I0][J0]= M[I0][J0];            
                }
            }
            //F = AUX_M;
            //console.log(F[0] + "\n" + F[1] + "\n" + F[2] + "\n" + F[3], J1,I1 );
        }
        M = createMatriz(A.length);
        for (let I0 = 0; I0 < A.length; I0++) {
            for (let J0 = 0; J0 < A.length; J0++) {
                M[I0][J0]= A[I0][J0];            
            }
        }        
    }
    return ADJ;
}
function matrixTra (A) {
    Transpuesta = createMatriz(A.length);
    for (let I1 = 0; I1 < A.length; I1++) {     
        for (let J1 = 0; J1 < A.length; J1++) {
              Transpuesta[I1][J1] = A[J1][I1];          
        }        
    }
    return Transpuesta;
}
function createMatriz(size){
    var matriz = new Array(size);
    for (i = 0; i < size ; i++){ 
      matriz[i]=new Array(size); 
    } 
    return matriz;
}
function determinante (matriz) {
    if(matriz.length==2){
        var det=(matriz[0][0]*matriz[1][1])-(matriz[1][0]*matriz[0][1]);
        return det;
    }               
    var suma = 0;
    for(var i = 0; i<matriz.length; i++){
        var nm = createMatriz(matriz.length-1);
        for(var j=0; j<matriz.length; j++){
            if(j!=i){
                for(var k=1; k<matriz.length; k++){
                    var indice=-1;
                    if(j<i)
                        indice=j;
                    else if(j>i)
                        indice=j-1;
                    nm[indice][k-1] = matriz[j][k];
                }
            }
        }
        if(i%2==0){                            
            suma += matriz[i][0] * determinante(nm);                            
        }                            
        else{                            
            suma -= matriz[i][0] * determinante(nm);
        }                        
    }
    return suma;
}
function TCD(brazo) {
    var theta1 = 0;
    var theta2 = 0;
    var theta3 = 0;
    var theta4 = 0;
    var theta5 = 0;
    var theta6 = 0;
    var theta7 = 0;
    var grados_libertad = [theta1,theta2,theta3,theta4,theta5,theta6,theta7];
    ENTRADAS1 = Array.from(document.getElementById("opciones_bloques").getElementsByTagName("input"));
    //console.log(ENTRADAS);
    
    i1 = 0;
    ENTRADAS1.forEach(element => {
        //console.log(element.value);
        grados_libertad[i1] = element.value;
        i1 ++;  
    });

    var HW0 = 1.104;
    var L = 0.278;
    var h = 0.064;

    var L0 =0.27035;
    var L1 = 0.069;
    var L2 = 0.36435;
    var L3 = 0.069;
    var L4 = 0.37429;
    var L5 = 0;
    var L6 = 0.36830;
    var Lh = Math.sqrt(L2**2+L3**2);

    T01 = [[Math.cos(theta1), -Math.sin(theta1), 0, 0],
              [Math.sin(theta1), Math.cos(theta1) , 0, 0],
              [0               , 0                , 1, 0],
              [0               , 0                , 0, 1]];

    T12 = [[-Math.cos(theta2) , -Math.sin(theta2), 0, L1],
              [0                , 0                , 1, 0 ],
              [-Math.sin(theta2), -Math.cos(theta2), 0, 0 ],
              [0                , 0                , 0, 1 ]];
    
    T23 = [[Math.cos(theta3) , -Math.sin(theta3), 0, 0],
              [0                , 0                , -1, -L2 ],
              [Math.sin(theta3), Math.cos(theta3), 0, 0 ],
              [0                , 0                , 0, 1 ]];

    T34 = [[Math.cos(theta4) , -Math.sin(theta4), 0, L3],
              [0                , 0                , 1, 0],
              [-Math.sin(theta4), -Math.cos(theta4), 0, 0 ],
              [0                , 0                , 0, 1 ]];

    T45 = [[Math.cos(theta5), -Math.sin(theta5), 0 ,  0 ],
              [0               , 0                , -1, -L4],
              [Math.sin(theta5), Math.cos(theta5) , 0 ,   0],
              [0               , 0                , 0 ,   1]];

    T56 = [[Math.cos(theta6) , -Math.sin(theta6), 0, L5],
              [0                , 0                , 1, 0 ],
              [-Math.sin(theta6), -Math.cos(theta6), 0, 0 ],
              [0                , 0                , 0, 1 ]];

    T67 = [[Math.cos(theta7), -Math.sin(theta7),  0, 0],
               [0               , 0                , -1, 0],
               [Math.sin(theta7), Math.cos(theta7) ,  0, 0],
               [0               , 0                ,  0, 1]];
    //matriz gripper
    T7G = [[1, 0, 0, 0 ],
               [0, 1, 0, 0 ],
               [0, 0, 1, L6],
               [0, 0, 0, 1 ]];
    //matriz base      
    TB0 = [[1, 0, 0, 0 ],
               [0, 1, 0, 0 ],
               [0, 0, 1, L0],
               [0, 0, 0, 1 ]];
    //matriz brazo izquierdo           
    TWBL = [[Math.sqrt(2)/2 , Math.sqrt(2)/2, 0, L],
                [-Math.sqrt(2)/2, Math.sqrt(2)/2, 0, -h],
                [0              , 0             , 1, HW0],
                [0              , 0             , 0, 1]];
    //matriz brazo derecho
    TWBR = [[Math.sqrt(2)/2 , Math.sqrt(2)/2, 0, L],
                [-Math.sqrt(2)/2, Math.sqrt(2)/2, 0, -h],
                [0              , 0             , 1, HW0],
                [0              , 0             , 0, 1]];
    Matrices = [T12,T23,T34,T45,T56,T67,T7G];
    PRODUCTO = matrixDot (TB0, T01); 
    Matrices.forEach(element => {
        PRODUCTO = matrixDot (PRODUCTO, element);
    });
    if (brazo == "izquierdo") {
        PRODUCTO = matrixDot (PRODUCTO, TWBL);
    }
    if (brazo == "derecho") {
        PRODUCTO = matrixDot (PRODUCTO, TWBR);
    }
    console.log(PRODUCTO);
    alert("la TCD del brazo " + brazo + " es: \nX: " + PRODUCTO[0][3] + "\nY: "  + PRODUCTO[1][3] + "\nZ: "  + PRODUCTO[2][3]);   
}
function TCI_menu(brazo) {
    cuadro_dialogo("TCI",[brazo]);
    AK = [[1, 1, 0, 0 ],
          [0, -1, -2, 0 ],
          [0, 0, 1, -1],
          [0, 0, 0, 1 ]];

    console.log(AK[0] + "\n" + AK[1] + "\n" + AK[2] + "\n" + AK[3]);
    DET_AK = determinante(AK);
    console.log(DET_AK);
    ADJ_AK = matrixAdj(AK);
    console.log(ADJ_AK[0] + "\n" + ADJ_AK[1] + "\n" + ADJ_AK[2] + "\n" + ADJ_AK[3]);
    
    TRA = matrixTra(AK);    
    console.log(TRA[0] + "\n" + TRA[1] + "\n" + TRA[2] + "\n" + TRA[3]);
    
    INV_AK = matrixInv(AK);    
    console.log(INV_AK[0] + "\n" + INV_AK[1] + "\n" + INV_AK[2] + "\n" + INV_AK[3]);
}
function TCI(brazo) {
    TCI_b=0.1;
    TCI_HW0=1101/1000;
    TCI_L=278/1000;
    TCI_h=64/1000;
    TCI_L0=270.35/1000;
    TCI_L1=69/1000;
    TCI_L2=364.35/1000;
    TCI_L3=69/1000;
    TCI_L4=374.29/1000;
    TCI_L5=0;
    TCI_L6=368.30/1000;
    TCI_Lh=Math.sqrt(TCI_L2**2+TCI_L3**2);

    Roll = 0;
    Pitch = 0;
    Yaw = 0;
    TCI_X = 0;
    TCI_Y = 0;
    TCI_Z = 0;

    Entradas2 = [TCI_X,TCI_Y,TCI_Z,Roll,Pitch,Yaw];

    ENTRADAS2 = Array.from(document.getElementById("opciones_bloques").getElementsByTagName("input"));
    //console.log(ENTRADAS);
    i2 = 0;
    ENTRADAS2.forEach(element => {
        //console.log(element.value);
        Entradas2[i2] = element.value;
        i2 ++;  
    });

    console.log(Entradas2);

    TWG = [[0.733, 0.653   ,0.190  ,0.843 ]  ,
           [ 0.384, -0.628  ,0.677  ,-0.162]  ,
           [ 0.562, -0.423  ,-0.711 ,0.661 ]  ,
           [ 0    , 0       ,0       ,1.0000 ]];

    TWB = [[Math.sqrt(2)/2 , Math.sqrt(2)/2, 0, TCI_L],
               [-Math.sqrt(2)/2, Math.sqrt(2)/2, 0, - TCI_h],
               [0              , 0             , 1, TCI_HW0],
               [0              , 0             , 0, 1]];
 
    TB0 = [[1, 0, 0, 0 ],
               [0, 1, 0, 0 ],
               [0, 0, 1, TCI_L0],
               [0, 0, 0, 1 ]];
 
    T6GL = [[1, 0, 0, 0 ],
                [0, 1, 0, 0 ],
                [0, 0, 1, TCI_L6],
                [0, 0, 0, 1 ]];

    TLeida = [[1, 0, 0, 0 ],
                [0, 1, 0, 0 ],
                [0, 0, 1, TCI_L6],
                [0, 0, 0, 1 ]];
                
    TRoll = [[1, 0, 0 ],
                [0, Math.cos(Roll), -Math.sin(Roll) ],
                [0, Math.sin(Roll), Math.cos(Roll) ]];

    TPitch = [[Math.cos(Pitch), 0, -Math.sin(Pitch) ],
                [0, 1, 0 ],
                [Math.sin(Pitch), 0, Math.cos(Pitch)]];

    TYaw = [[Math.cos(Yaw), -Math.sin(Yaw), 0 ],
                [Math.sin(Yaw), Math.cos(Yaw), 0 ],
                [0, 0, 1 ]];

    PRODUCTO = matrixDot (TRoll, TPitch);
    PRODUCTO = matrixDot (PRODUCTO, TYaw);
    PRODUCTO[0].push(TCI_X);
    PRODUCTO[1].push(TCI_X);
    PRODUCTO[2].push(TCI_X);
    PRODUCTO[4] = [0,0,0,1];
    console.log(PRODUCTO);
    //T06=np.linalg.inv(TB0)@ np.linalg.inv(TWB)@ TWG @ np.linalg.inv(T6GL);
    //T06=np.linalg.inv(TB0)@ np.linalg.inv(TWB)@ TWG @ np.linalg.inv(T6GL);
    T06 = PRODUCTO;

    R06 = [[1, 0, 0 ],
           [0, 1, 0 ],
           [0, 0, 1 ]];

    R06[0]=T06[0].slice(0,3);
    R06[1]=T06[1].slice(0,3);
    R06[2]=T06[2].slice(0,3);

    theta1 = Math.atan2(T06[1][3],T06[0][3]);

    E=2*TCI_Lh*(TCI_L1-(T06[0,3]/Math.cos(theta1)));
    F=2*TCI_Lh*T06[2,3];
    G=T06[0,3]**2/Math.cos(theta1)**2+TCI_L1**2+TCI_Lh**2-TCI_L4**2+T06[2,3]**2-2*TCI_L1*T06[0,3]/Math.cos(theta1);
    
    console.log(E);
    console.log(F);
    console.log(G);
    
    t12 = (-F-Math.sqrt(E**2+F**2-G**2))/(G-E);
    
    theta2 = 2*Math.atan2(t12);
    theta4 = Math.atan2(-T06[2,3]-TCI_Lh*Math.sin(theta2),T06[0,3]/Math.cos(theta1)-TCI_L1-TCI_Lh*Math.cos(theta2))-theta2;

    R03=[[ -Math.sin(theta2 + theta4)*Math.cos(theta1), -Math.cos(theta2 + theta4)*Math.cos(theta1), -Math.sin(theta1)],
         [ -Math.sin(theta2 + theta4)*Math.sin(theta1), -Math.cos(theta2 + theta4)*Math.sin(theta1),  Math.cos(theta1)],
         [ -Math.cos(theta2 + theta4)                 , Math.sin(theta2 + theta4)                  ,  0         ]];
  
    R36 = matrixDot (matrixInv(R03), R06);

    theta5 = Math.atan2(R36[2][2],R36[0][2]);
    theta7 = Math.atan2(-R36[1][1],R36[1][0]);
    theta6 = Math.atan2(R36[1][0]/Math.cos(theta7),-R36[1][2]);
    console.log(theta1,theta2,theta4,theta5,theta6,theta7)
}
function configurar_simulacion() {
    cuadro_dialogo("configurar simulacion",[]);
}
function click_configuracion_simulacion() {
    if (document.getElementById("check_mesa").checked == true) {
        configuracion_simulacion = 1;
    } else {
        configuracion_simulacion = 0;
    }
}
//Confirmar refrescar /recargar
/*
window.onbeforeunload = function ()
 {
     return "";
 };
*/
function salir(orden) {
    if (orden == 1) {
        if (confirm("¿Desea cerrar la sesion actual?")){        
            window.location.replace("/log");
        }  
    }
    else{
        alert("El tiempo de la sesión ha terminado");
        window.location.replace("/log");
    }    
}

window.onload = funcion_inicial;
window.addEventListener("load",Drag_And_Drop,false);
window.addEventListener("keyup",Teclado_arriba,false);
window.addEventListener("keydown",Teclado_abajo,false);