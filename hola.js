
console.log("inicio");

const express = require("express");
const app = express();

const path = require('path');
const fs = require('fs');
const indentString = require('indent-string');

function ejecutar(nombre, parametros) {
  var func = new Function('return ' + nombre)();
  console.log(func,typeof(func));
  var dato = func();
  console.log(dato);
}
ciclo = function (parametros,contenido) {
    var vector = [];
    var iteraciones = parametros
    for (var i = 1; i < iteraciones + 1; i++) {
      contenido.forEach(function (item) {
        vector.push(item);
        ejecutar(item,)
      });
    }
    return vector;
}

condicional = function (parametros,contenido) {
    //var action = '+'
    //var execute = (action, {num1, num2}) => new Function("x", "y", `return ${num1} ${action} ${num2}`)(action, num1,num2);
    //console.log(execute(action, {num1:3,num2:2}));
    var vector = [];
    var operaciones = {
        '>': function(a, b) { return a > b }, //mayor
        '>=': function(a, b) { return a >= b }, //mayor igual
        '<': function(a, b) { return a < b }, //menor
        '<=': function(a, b) { return a <= b }, //menor igual
        '==': function(a, b) { return a == b }, // igual
        '!=': function(a, b) { return a != b }, // diferente
    };
    
    var operacion = condicion.operacion;
    //console.log(operacion);
    //console.log(operaciones[operacion](condicion.A, condicion.B));
    if (operaciones[operacion](condicion.A, condicion.B)) {
      parametros.forEach(function (item) {
        vector.push(item);
      });
    }
    return vector;
}

home = function () {
  return "HOME";
}

hola1 = function () {
  return "Hola";
}

var C = {
    A: 15,
    B: 9,
    operacion: ">"
};

/*
console.log(ciclo(5,["a","b","c"]));
console.log(condicional(C,["a","b","c"]));
*/

//console.log(ciclo(2,["condicional(C,[a,b,c])"]));
console.log(ciclo(2,["home",]));


// create a python file

//for 
python = fs.readFileSync(__dirname + "/Codigos/python_script.txt", (error, data) => {
  if(error) {
      throw error;
  }
  console.log(data.toString());
});


PROGRAM = ["objetoC_2", "objetoD_3", "objetoB_4"];
DATOS = [ { id: 'objetoC_2', opcion: 'HOME', parametros: '', contenido: '' },
{ id: 'objetoD_3', opcion: 'PARA', parametros: '1', contenido: '' },
{ id: 'objetoB_4', opcion: 'SI', parametros: '', contenido: '' },
{ id: 'objetoA_5', opcion: 'FIN', parametros: '', contenido: '' },
{ id: 'objetoA_1', opcion: 'INICIO', parametros: '', contenido: '' } ];

ultimos = [ [ 'objetoC_6', 'objetoC_2', 'objetoD_3', 'objetoB_4', 'objetoA_5' ],
  [ { id: 'objetoC_2', opcion: 'HOME', parametros: '', contenido: '' },
    { id: 'objetoD_3',
      opcion: 'PARA',
      parametros: '1',
      contenido: '' },
    { id: 'objetoB_4', opcion: 'SI', parametros: '', contenido: '' },
    { id: 'objetoA_5', opcion: 'FIN', parametros: '', contenido: '' },
    { id: 'objetoA_1',
      opcion: 'INICIO',
      parametros: '',
      contenido: '' },
    { id: 'objetoC_6',
      opcion: 'CABEZA',
      parametros: '0',
      contenido: '' } ] ];
ultimos2 = [ [ 'objetoC_6',
    'objetoC_7',
    'objetoC_2',
    'objetoD_3',
    'objetoB_4',
    'objetoA_5' ],
  [ { id: 'objetoC_2', opcion: 'HOME', parametros: '', contenido: '' },
    { id: 'objetoD_3',
      opcion: 'PARA',
      parametros: '1',
      contenido: '' },
    { id: 'objetoB_4', opcion: 'SI', parametros: '', contenido: '' },
    { id: 'objetoA_5', opcion: 'FIN', parametros: '', contenido: '' },
    { id: 'objetoA_1',
      opcion: 'INICIO',
      parametros: '',
      contenido: '' },
    { id: 'objetoC_6',
      opcion: 'CABEZA',
      parametros: '0',
      contenido: '' },
    { id: 'objetoC_7',
      opcion: 'BRAZO DER.',
      parametros: '0,0,0,0,0,0,0',
      contenido: '' } ] ];
lote = [ [ 'objetoC_6',
'objetoC_7',
'objetoC_2',
'objetoD_3',
'objetoB_4',
'objetoA_5' ],
[ { id: 'objetoC_2', opcion: 'HOME', parametros: '', contenido: '' },
{ id: 'objetoD_3',
  opcion: 'PARA',
  parametros: '1',
  contenido: 'objetoD_3,objetoC_8' },
{ id: 'objetoB_4',
  opcion: 'SI',
  parametros: '',
  contenido: 'objetoB_4,objetoC_9' },
{ id: 'objetoA_5', opcion: 'FIN', parametros: '', contenido: '' },
{ id: 'objetoA_1',
  opcion: 'INICIO',
  parametros: '',
  contenido: '' },
{ id: 'objetoC_6',
  opcion: 'CABEZA',
  parametros: '0',
  contenido: '' },
{ id: 'objetoC_7',
  opcion: 'BRAZO DER.',
  parametros: '0,0,0,0,0,0,0',
  contenido: '' },
{ id: 'objetoC_8', opcion: 'HOME', parametros: '', contenido: '' },
{ id: 'objetoC_9', opcion: 'HOME', parametros: '', contenido: '' } ] ];

function bloques_b_d(datos) {
  var lista_b_d = [] ;
  datos.forEach(element => {
    if (element.id.slice(0,7) == "objetoB" | element.id.slice(0,7) == "objetoD") {
      lista_b_d.push(element);
    }
  });
  return lista_b_d
}
function programa_completo(programa_c, lista) {

  console.log(lista, lista.length);
  if (lista.length === 0) {
    console.log("hola");
    return programa_c;
  }
  var C = 0;
  var cambio = 0;
  programa_c.forEach(element => {
    C ++;
    //console.log(C,lista[0]);
    if (element == lista[0].id) {
      programa_c.splice(C-1,1);
      var a = 0;
      lista[0].contenido.split(",").forEach(element => {        
        programa_c.splice(C-1 +a,0,element);
        a ++;
      });
      cambio = 1;
    }    
  });
  if (cambio == 1) {    
    lista.shift();   
    return programa_completo(programa_c, lista);
  } else {
    lista.push(lista.shift());
    return programa_completo(programa_c, lista) 
  }     
}
//console.log(bloques_b_d(lote[1]),"G");
//console.log(programa_completo(lote[0],bloques_b_d(lote[1])),"P");

function crear_archivo_python(programa,datos) {
  console.log(programa,"l");
  programa.forEach(element => {

    fragmento = "";
    elemento = element.slice(0,7);
    
    
    var resultado = datos.filter(function (ID) { return ID.id == element; });
    var datos_bloque = (resultado.length > 0) ? resultado[0] : "";
    console.log(elemento,element);
    switch (elemento) {
      case "objetoC":
        switch (datos_bloque.opcion) {
          case "HOME":
            fragmento = "TAB" + "robot.mover_home()" +"\n"
            break;
          case "CABEZA":
            fragmento = "TAB" + "robot.mover_cabeza(" + datos_bloque.parametros + ")" +"\n"
            break;
          case "PINZAS":
            fragmento = "TAB" + "robot.gripper(" + + ")" +"\n"
            break;
          case "BRAZO DER.":
            console.log(datos_bloque.parametros,typeof(datos_bloque.parametros));
            fragmento = "TAB" + "robot.mover_TCD(['D'," + datos_bloque.parametros + "])" +"\n"          
            break;
          case "BRAZO IZQ.":
            fragmento = "TAB" + "robot.mover_TCD(['I'," + datos_bloque.parametros + "])" +"\n"      
            break;
        
          default:
            break;
        }
        fragmento = fragmento + "TAB" + "time.sleep(0.5)";
        //indentString(fragmento,1);
        break;
      case "objetoB":
        if (datos_bloque.contenido != "") {
          fragmento = "TAB" + "if 2 > 1:"          
        } else {
          fragmento = "TAB" + "if 2 > 1:"
          fragmento = fragmento + "TAB    " + "print";
        }
        break;
      case "objetoD":
        if (datos_bloque.contenido != "") {
          fragmento = "TAB" + "for X in range(" + datos_bloque.parametros + "):"         
        } else {
          fragmento = "TAB" + "for X in range(" + datos_bloque.parametros + "):"
          fragmento = fragmento + "TAB    " + "print";
        }
        break; 
    
      default:
        break; 
    }
    python = python + fragmento + "\n";
    Nivel = nivel(element,1,datos);
    var TAB = "";

    for (let i = 0; i < Nivel; i++) {
      TAB = TAB +"    ";      
    }
    python = python.replace(/TAB/g,TAB);
  });
  
  python = python + "if __name__ == '__main__':\n \t main()";
  return python;
}
function nivel(blo,NIV,dat) {
  var subio = 0;
  var elemento_ID = "";
  niv = NIV;
  console.log(blo,"bl");
  dat.forEach(element => {
    vecto = element.contenido.split(",");
    vecto.shift();
    console.log(vecto, "vecto");
    if (vecto.indexOf(blo) > -1) {
      subio = 1;
      elemento_ID = element.id; 
    }
  });
  if (subio == 1) {
    console.log(blo,niv, "blo");
    niv ++;
    return nivel(elemento_ID,niv,dat);
  } else {
    return niv;
  }
}
function crear_contenido(contenido,indentacion,script,datos) {
  contenido.forEach(element => {
    elemento = element.slice(0,7);
    if (contenido.length === 0) {
      return script;
    }
    TAB = "";
    for (let i = 0; i < indentacion; i++) {
      TAB = TAB +"\t";      
    }
    var results = datos.filter(function (ID) { return ID.id == element; });
    var datos_bloque = (results.length > 0) ? results[0] : null;

    switch (elemento) {
      case "objetoB":
        fragmento = "TAB" + "if 2 > 1:" +"\n"

        contenido.shift()
        script = script + fragmento;
        script.replace(/TAB/g,TAB);
        return crear_contenido(datos_bloque.contenido,indentacion,script,datos);
        break;
      case "objetoC":

        switch (key) {
          case value:
            
            break;
        
          default:
            break;
        }

        fragmento = "TAB" + "robot." +"\n"

        contenido.shift()
        script = script + fragmento;
        script.replace(/TAB/g,TAB);
        return crear_contenido(contenido,indentacion,script,datos);
        break;
      case "objetoD":
        
        fragmento = "TAB" + "for X in range(" + datos_bloque.parametros + "):" +"\n"

        contenido.shift()
        script = script + fragmento;
        script.replace(/TAB/g,TAB);
        return crear_contenido(datos_bloque.contenido,indentacion,script,datos);
        break;
    
      default:
        break;
    }
  });
}

//codigo_python = crear_archivo_python(PROGRAM,DATOS);
//codigo_python = crear_archivo_python(ultimos[0],ultimos[1]);
//codigo_python = crear_archivo_python(ultimos2[0],ultimos2[1]);

//codigo_python = crear_archivo_python(lote[0],lote[1]);
codigo_python = crear_archivo_python(programa_completo(lote[0],bloques_b_d(lote[1])),lote[1]);

const directorio_archivos = path.join(__dirname, "public/Archivos");
fs.writeFile('public/Archivos/' + 'HOLAS.py', codigo_python, function (err) {
  if (err) throw err;
});

