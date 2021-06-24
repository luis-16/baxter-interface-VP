console.log("inicio");
//sudo kill $(sudo lsof -t -i:50000) forzar cierre del servidor
global.nombre = "";

const express = require("express");
const app = express();

const path = require('path');
const fs = require('fs');

const shell = require('shelljs');
const spawn = require('child_process');
const wmctrl = require ('wmctrl');

/*
const open_link = require('open')
const localtunnel = require('localtunnel');

(async () => {
  const tunnel = await localtunnel({ port: 60000 });
 
  // the assigned public url for your tunnel
  // i.e. https://abcdefgjhij.localtunnel.me
  link = tunnel.url;
  //open_link(link);
  console.log(link);
  tunnel.on('close', () => {
    // tunnels are closed
  });
  
})();

*/

//joining path of directory 
const directorio_carpetas = path.join(__dirname, "Carpetas");
const directorio_archivos = path.join(__dirname, "public/Archivos");
const directorio_usuario = path.join(__dirname,"");
const directorio_ejemplos = path.join(__dirname, "Ejemplos");

app.use(express.json());
app.use(express.static("public/"));

var publicPath = path.resolve(__dirname, "public/"); 
app.use(express.static(publicPath));

const comando_configuracion_baxter_simulacion = path.resolve(__dirname, 'Codigos/') + '/configuracion_baxter_simulacion.sh';
const comando_configuracion_baxter = path.resolve(__dirname, 'Codigos/') + '/configuracion_baxter.sh';
const comando_configuracion_gazebo = path.resolve(__dirname, 'Codigos/') + '/configuracion_gazebo.sh';
const comando_configuracion_python = path.resolve(__dirname, 'Codigos/') + '/configuracion_python.sh';

function usuarios_carpetas() {
  con.query('SELECT usuario FROM usuarios', function(error, result, fields) {
    let rutas = "";
    result.forEach(element => {
      if (!fs.existsSync(directorio_carpetas + "/" + element.usuario)){
        fs.mkdirSync(directorio_carpetas + "/" + element.usuario);
      } 
    }); 
  });
}
function Crear_archivos(Usuario,Nombre,Contenido){
  fs.writeFile('public/Archivos/' + Nombre + '.html', Contenido, function (err) {
    if (err) throw err;
  });
  fs.writeFile('Carpetas/' + Usuario + '/' + Nombre + '.html', Contenido, function (err) {
    if (err) throw err;
  });
}
function configuraciones_simlacion() {
  //console.log(comando_configuracion_baxter,typeof(comando_configuracion_baxter));
  shell.exec(comando_configuracion_baxter_simulacion, (err, stdout, stderr) => {
    if (err) {
      //console.error(`error ejecucion configuracion_baxter: ${err}`);
      return;
    }
    console.log("BAXTER_SIM");
    //console.log(`respuesta configuracion_baxter:\n${stdout}`);
  }); 
  shell.exec(comando_configuracion_gazebo, (err, stdout, stderr) => {
    if (err) {
      //console.error(`error ejecucion configuracion_gazebo: ${err}`);
      return;
    }
    console.log("GAZEBO");
    //console.log(`respuesta configuracion_gazebo:\n${stdout}`);
  });
}
function configuraciones_real() {
  shell.exec(comando_configuracion_baxter, (err, stdout, stderr) => {
    if (err) {
      console.error(`error ejecucion configuracion_baxter: ${err}`);
      return;
    }
    console.log(`respuesta configuracion_baxter:\n${stdout}`);
  });   
}
function bloques_b_d(datos) {
  var lista_b_d = [] ;
  datos.forEach(element => {
    if (element.id.slice(0,7) == "objetoB" | element.id.slice(0,7) == "objetoD") {
      lista_b_d.push(element);
    }
  });
  return lista_b_d
}
function programa_completo(programa, lista,linea) {
  
  var lin = linea;
  console.log(lista,programa,lin,"lin");
  var C = 0;
  var cambio = 0;
  var programa_c = programa;
  var lista_c = lista;
  if (lista.length === 0 | lin == programa_c.length) {
    return programa_c;
  }
  //console.log("elemenN",programa_c.length,cambio);
  programa_c.forEach(element => {
    C ++;    
    //console.log("Ñ",element == lista_c[0].id,lista_c[0].id,element);
    if (typeof(element) == "string") {       
      elemento = element;     
    }
    else{
      
      elemento = element[0];
    }

    if (elemento == lista_c[0].id) {
      
      programa_c.splice(C-1,1);
      var a = 0;
      if(lista_c[0].contenido == "") {
        programa_c.splice(C-1 +a,0,elemento);
        a ++;
      }
      else {
        lista_c[0].contenido.split(",").forEach(element => {        
          programa_c.splice(C-1 +a,0,element);
          a ++;
        });
      }
      //console.log(elemento,"elemento",programa_c,programa_c.length);
      if (lista_c[0].opcion == "NO/SI") {
        if ( lista_c[0].contenidono != "") {          
          programa_c.splice(C-1 +a,0,["else", lista_c[0].id]);
          a ++;
          lin ++;
          lista_c[0].contenidono.split(",").forEach(element => {        
            programa_c.splice(C-1 +a,0,[element, lista_c[0].id]);
            a ++;
          });
        }
      }
      cambio = 1;
    }    
  });
  if (cambio == 1) {    
    lista_c.shift();   
    return programa_completo(programa_c, lista_c,lin);
  } 
  else {
    lista_c.push(lista_c.shift());
    return programa_completo(programa_c, lista_c,lin); 
  }  
}
function nivel(blo,NIV,dat) {
  var subio = 0;
  var elemento_ID = "";
  niv = NIV;
  dat.forEach(element => {
    vecto = element.contenido.split(",");
    vecto.shift();
    if (vecto.indexOf(blo) > -1) {
      subio = 1;
      elemento_ID = element.id; 
    }
    if (element.id[6] == "B") {      
      vecto = element.contenidono.split(",");
      vecto.shift();
      if (vecto.indexOf(blo) > -1) {
        subio = 1;
        elemento_ID = element.id; 
      }
    }
  });
  if (subio == 1) {
    niv ++;
    return nivel(elemento_ID,niv,dat);
  } else {
    return niv;
  }
}
function crear_archivo_python(programa,datos,nivel_in) {
  console.log(programa,"programa_completo");
  python_S = "";
  programa.forEach(element => {
    
    //console.log(elemento,element);
    var resultado = "";
    var datos_bloque = "";
    fragmento = "";
    var elemento = "";
    if (typeof(element) == "string") {      
      elemento = element.slice(0,7);
      Nivel = nivel(element,1,datos);      
      resultado = datos.filter(function (ID) { return ID.id == element; });
      datos_bloque = (resultado.length > 0) ? resultado[0] : "";
    }
    else{      
      elemento = element[0].slice(0,7);      
      Nivel = nivel(element[1],1,datos)+1;
      resultado = datos.filter(function (ID) { return ID.id == element[0]; });
      datos_bloque = (resultado.length > 0) ? resultado[0] : "";
    }
    console.log(element,elemento,Nivel);
    
    switch (elemento) {
      case "objetoC":
        console.log(element,"CASOC",datos_bloque.opcion);
        switch (datos_bloque.opcion) {
          case "HOME":
            fragmento = "TAB" + "robot.mover_home()" +"\n"
            break;
          case "CABEZA":
            fragmento = "TAB" + "robot.mover_cabeza(" + datos_bloque.parametros + ")" +"\n"
            break;
          case "PINZAS":            
            fragmento = "TAB" + "robot.mover_gripper([\"" + datos_bloque.parametros.replace(",","\",\"") + "\"])" +"\n"
            break;
          case "BRAZO DER.":
            //console.log(datos_bloque.parametros,typeof(datos_bloque.parametros));
            fragmento = "TAB" + "robot.mover_TCD(['D'," + datos_bloque.parametros + "])" +"\n"          
            break;
          case "BRAZO IZQ.":
            fragmento = "TAB" + "robot.mover_TCD(['I'," + datos_bloque.parametros + "])" +"\n"      
            break;
          case "SUBFUNCIÓN":
            if (datos_bloque.parametros != "") {
              fragmento = "TAB" + "robot.funcion_" + datos_bloque.parametros.replace(/ /g,"_") + " ()\n"      
            } else {
              
            }
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
          fragmento = "TAB" + "if 2 > 1:\n"
          fragmento = fragmento + "TAB    " + "print";
        }
        break;
      case "objetoD":
        if (datos_bloque.contenido != "") {
          fragmento = "TAB" + "for X in range(" + datos_bloque.parametros + "):"         
        } else {
          fragmento = "TAB" + "for X in range(" + datos_bloque.parametros + "):\n"
          fragmento = fragmento + "TAB    " + "print";
        }
        break;
      case "else":
        fragmento = "TAB" + "else:"
        Nivel = nivel(element[1],1,datos);
        break;
    
      default:
        break; 
    }
    python_S = python_S + fragmento + "\n";
    var TAB = "";
    
    if (nivel_in > 0) {
      Nivel = Nivel +nivel_in;
    }

    for (let i = 0; i < Nivel; i++) {
      TAB = TAB +"    ";      
    }
    python_S = python_S.replace(/TAB/g,TAB);
  });  
  return python_S;
}
function construir_archivo_python (programa, datos,lineas) {
  var prog = programa;
  var dat = datos;
  var python = fs.readFileSync(__dirname + "/Codigos/python_script.txt", (error, data) => {
    if(error) {
        throw error;
    }
  });
  var subfunciones = "";
  fs.readdirSync(directorio_usuario  + "/Carpetas/" + USUARIO, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
  }).forEach(element => {
    //console.log(element,"subfu");
    if (element.slice(-4) == ".txt") {
      subfunciones = subfunciones + fs.readFileSync(directorio_usuario  + "/Carpetas/" + USUARIO + "/" + element) + "\n";
      console.log(element,"TXT");
    }       
  });  
  python = python + "\n" + subfunciones;
  python = python + "def main():\n    rospy.init_node(\"programa\")\n    robot = Comandos()\n";
  var codigo_python = crear_archivo_python(programa_completo(prog,bloques_b_d(dat),lineas),dat,0);
  codigo_python = codigo_python + "    print 'EXITOSO'\n\n"
  codigo_python = codigo_python + "if __name__ == '__main__':\n \t main()";
  fs.writeFile('Codigos/scritp_programa.py', python + codigo_python, function (err) {
    if (err) throw err;
  });
}
function construir_subfuncion (nombre, programa, datos,lineas) {
  var prog = programa;
  var dat = datos;
  Name = nombre.replace(/ /g,"_");
  console.log(Name,"name");
  var python = "    def funcion_" + Name + " (self)\:\n";
  var codigo_python = crear_archivo_python(programa_completo(prog,bloques_b_d(dat),lineas),dat,1);
  console.log('Carpetas/' + USUARIO + "/"+ nombre + '.txt');
  fs.writeFile('Carpetas/' + USUARIO + "/"+ nombre + '.txt', python + codigo_python, function (err) {
    if (err) throw err;
  });
}
function pestaña_video(usuario,nombre, bandera) {
  if (bandera == 1) {
    wmctrl.list(function(err, tree) {
      var ID_ventana = "";
      tree.forEach(element => {
        //console.log(element.id);
        if (element.title.indexOf('Gazebo') != -1) {
          console.log(element,"SI");
          ID_ventana = element.id;
          ID_ventana = "0x" + ID_ventana.toString(16); 
          console.log(ID_ventana);
        }
        else{
          ID_ventana = tree[1].id.toString(16);
        }
      });
      proceso1 = spawn.exec("gst-launch-1.0  ximagesrc xid=" + "0x" + ID_ventana + " startx=0 use-damage=0 show-pointer=false ! videoscale method=0 ! video/x-raw,width=640,height=480,framerate=30/1,cursor=TRUE ! videoconvert ! ximagesink");
      //proceso1 = spawn.exec("gst-launch-1.0  ximagesrc xid=" + "0x" + ID_ventana + " startx=0 use-damage=0 show-pointer=false ! videoscale method=0 ! video/x-raw,width=640,height=480,framerate=30/1,cursor=TRUE ! videoconvert ! queue ! avimux ! filesink location= " + 'Carpetas/' + usuario + "/"+ nombre + ".avi");//Carpetas/" + usuario + "/ " + nombre + ".avi");
      proceso1.on('exit', function (code, signal) {
        console.log('child process exited with ' +
                    `code ${code} and signal ${signal}`);
      });
    
      proceso1.stdout.on('data', (data) => {
        console.log(`proceso1 salida:\n${data}`);
      });
    
      proceso1.stderr.on('data', (data) => {
        console.error(`child1 stderr:\n${data}`);
      });
      
      console.log(proceso1.pid,"PID");
      return proceso1.pid;
    });  
  } else {    
    //proceso1.kill('SIGINT');
    console.log("terminado");
    proceso2 = spawn.exec("ffmpeg -i Carpetas/" + usuario + "/" + nombre + ".avi Carpetas/" + usuario + "/" + nombre +".mp4");
    proceso2.on('exit', function (code, signal) {
      console.log('child process 2 exited with ' +
                  `code ${code} and signal ${signal}`);
    });

    proceso2.stdout.on('data', (data) => {
      console.log(`proceso2 salida:\n${data}`);
    });

    proceso2.stderr.on('data', (data) => {
      console.error(`child2 stderr:\n${data}`);
    });
  }
  return 1;
}

   /*
  (async () => {
    console.log(await wmctrl.list(function(err, tree) {
        //console.log(tree, tree[0].id, tree[0].id.toString(16),tree.length); //output all windows tree
        tree.forEach(element => {
          console.log(element.id);
          if (element.title.indexOf('Gazebo') != -1) {
            console.log(element,"SI");
            ID_ventana = element.id;
            console.log("0x" + ID_ventana.toString(16));
          }
        });
    }));
})();
*/

/*
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is your name?', (name) => {
    console.log(`Hello ${name}!`);

    rl.close();
});
*/
var mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "base"
});

var ingreso = false;  // dende de ser false
var USUARIO = "";
var registro = [];
var activo = 0;

app.get("/",function(request,respuesta){
  console.log("login");
  respuesta.status(200);
  respuesta.sendFile(__dirname+"/public/login.html");
});

app.get("/log",function(request,respuesta){
  console.log("login");
  respuesta.status(200);
  respuesta.sendFile(__dirname+"/public/login.html");
});

app.get("/Inter",function(request,respuesta){
    console.log("Interfaz");
    console.log(ingreso,"439");
    if (ingreso) {
      respuesta.status(200);
      respuesta.sendFile(__dirname+"/public/Interfaz.html");
    }else{
      respuesta.status(400);
      respuesta.sendFile(__dirname+"/public/login.html"); 
    }
});

app.get("/luis",function(request,respuesta){
  console.log("prueba");
  USUARIO = "luis";
  ingreso = true;  
  respuesta.status(200);
  respuesta.sendFile(__dirname+"/public/Interfaz.html");
});

app.post("/login",function(request,response) {
  
  let data = request.body;
  console.log(data);
  
  if (data.user && data.pass) {
      
  con.query('SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?', [data.user, data.pass], function(error, result, fields) {
    var Usuario = result;
    console.log(result);
    if (Usuario.length > 0) {                
              ingreso = true;
              username = data.user;
              console.log(Usuario);
              response.send("OK");
              USUARIO = data.user;            

    } else {        
              response.send('Usuario y/o contraseña incorrectos!');
              ingreso = false;
    }           
  });
} else {
  response.send('ingrese usuario y contraseña!');
}
      
});

app.post("/guardar",function(request,respuesta) {
  
  let datos = request.body;
  let Nombre = datos.nombre;
  nombre = datos.nombre;
  let repetido = "";
  
  fs.readdir(directorio_usuario + "/Carpetas/" + USUARIO, function (err, files) {
    
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    files.forEach(function (file) {
        if (file == Nombre + ".html"){
          repetido = "SI";
        };
    });
    if(repetido == "SI" & datos.version < 1){
      respuesta.status(200);
      respuesta.send('NO');
    }
    else{
      respuesta.status(200);
      respuesta.send('OK');
      Crear_archivos(USUARIO,datos.nombre,datos.objeto);
    }
  });
  //fs.readdir(directorio_archivos, function (err, files) {
});

app.post("/listar",function(request,respuesta) {
  fs.readdir(directorio_usuario  + "/Carpetas/" + USUARIO, function (err, files) {
    
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    respuesta.status(200);
    var carpetas = [];
    files.forEach(element => {
      if (element.slice(-5) == ".html") {
        carpetas.push(element);
      }       
    });
    respuesta.send(carpetas);
  });
  //fs.readdir(directorio_archivos, function (err, files) {
});

app.post("/listar_subfunciones",function(request,respuesta) {
  fs.readdir(directorio_usuario  + "/Carpetas/" + USUARIO, function (err, files) {
    
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    respuesta.status(200);
    var carpetas = [];
    files.forEach(element => {
      if (element.slice(-4) == ".txt") {
        carpetas.push(element);
      }       
    });
    respuesta.send(carpetas);
  });
});

app.post("/listar_ejemplos",function(request,respuesta) {
  
  fs.readdir(directorio_ejemplos, function (err, files) {
    
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    respuesta.status(200);
    respuesta.send(files);
  });
});

app.post("/abrir",function(request,respuesta) {
  let datos = request.body;  
  let Nombre = datos.nombre;
  
  fs.readFile(directorio_usuario + "/Carpetas/" + USUARIO + "/" + Nombre, function(err, data) {

    if (err) {
      return console.log('Unable to scan directory: ' + err);
    } 
    respuesta.status(200);    
    respuesta.send(data);
  });
});

app.post("/abrir_ejemplo",function(request,respuesta) {
  let datos = request.body;  
  let Nombre = datos.nombre;
  fs.readFile(directorio_ejemplos + "/" + Nombre, function(err, data) {

    if (err) {
      return console.log('Unable to scan directory: ' + err);
    } 
    respuesta.status(200);    
    respuesta.send(data);
  });
});

app.post("/salir",function(request,respuesta) {              
  ingreso = false;
  USUARIO = "";
  activo = 0;          
});

app.post("/programar",function(request,respuesta) {
  let datos = request.body;
  
  if (datos[0] == "simulacion" & activo == 0) {
    activo = 1;
    console.log("simular");
    configuraciones_simlacion()
  }
  
  //L = pestaña_video(USUARIO,datos[3],1);
  //console.log(L);
  //console.log(datos[4],"lineas");
  
  construir_archivo_python (datos[1],datos[2],datos[4]);
  shell.exec(comando_configuracion_python, (err, stdout, stderr) => {
    if (err) {
      console.error(`error ejecucion configuracion_python: ${err}`);
      return;
    }
    console.log(`respuesta configuracion_python:\n${stdout}`);
    
    respuesta.status(200);    
    respuesta.send("OK");
  });
  //pestaña_video(USUARIO,datos[3],0);
  /*
  if (datos[0] == "programar") {
    console.log("real");
    configuraciones_real()
  }
  */
});

app.post("/subfuncion",function(request,respuesta) {
  let datos = request.body;
  //console.log(datos);
  console.log(datos);
  construir_subfuncion (datos[0],datos[1],datos[2],datos[3]);  
});

app.maxConnections = 2;
app.listen(60000, function(){
    console.log("escuchando ");
});

setTimeout(function (params) {usuarios_carpetas();},1000)
