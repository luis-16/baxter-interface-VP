console.log("inicio");
//sudo kill $(sudo lsof -t -i:50000) forzar cierre del servidor
global.nombre = "";

const express = require("express");
const app = express();

const path = require('path');
const fs = require('fs');

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
const directorio_archivos = path.join(__dirname, "public/Archivos");
const directoryPathEjemplos = path.join(__dirname, "public/Ejemplos");

function ciclo(iteraciones,parametros) {
  for (var i = 1; i < iteraciones; i++) {
    parametros.forEach(function (item) {
      i = item;
    });
  }  
}

function condicional(condicion,parametros) {
  if (condicion.A) {
    parametros.forEach(function (item) {
      i = item;
    });
  }  
}

function Crear_archivos(Nombre,Contenido){
  fs.appendFile('public/Archivos/' + Nombre + '.html', Contenido, function (err) {
    if (err) throw err;
  });
}

app.use(express.json());
app.use(express.static("public/"));

var publicPath = path.resolve(__dirname, "public/"); 
app.use(express.static(publicPath));

function correr_codigo(params) {
  
}

const shell = require('shelljs');
let comando_configuracion_baxter = path.resolve(__dirname, 'Codigos/') + '/configuracion_baxter.sh';
let comando_configuracion_gazebo = path.resolve(__dirname, 'Codigos/') + '/configuracion_gazebo.sh';

function inicio_configuraciones(params) {

//console.log(comando_configuracion_baxter,typeof(comando_configuracion_baxter));
shell.exec(comando_configuracion_baxter, (err, stdout, stderr) => {
  if (err) {
    console.error(`error ejecucion configuracion_baxter: ${err}`);
    return;
  }
  console.log(`respuesta configuracion_baxter:\n${stdout}`);
}); 
shell.exec(comando_configuracion_gazebo, (err, stdout, stderr) => {
  if (err) {
    console.error(`error ejecucion configuracion_gazebo: ${err}`);
    return;
  }
  console.log(`respuesta configuracion_gazebo:\n${stdout}`);
});
}




/*
const { spawn } = require('child_process');

const proceso1 = spawn("./configuracion_baxter.sh");

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

/*
const proceso2 = spawn("./configuracion_gazebo.sh");

proceso2.on('exit', function (code, signal) {
  console.log("salida proceso2");
});

proceso2.stdout.on('data', (data) => {
  console.log("proceso2 salida");
});

proceso2.stderr.on('data', (data) => {
  console.error(`child2 stderr:\n${data}`);
});

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What is your name?', (name) => {
    console.log(`Hello ${name}!`);

    rl.close();
});

/*
const proceso3 = spawn("ls");

proceso3.on('exit', function (code, signal) {
  console.log("salida proceso3");
});

proceso3.stdout.on('data', (data) => {
  console.log(`proceso3 salida:\n${data}`);
});

proceso3.stderr.on('data', (data) => {
  console.error(`child3 stderr:\n${data}`);
});

/*
const execFile = require('child_process').execFile;

const child = execFile('./configuracion_baxter.sh', ['--version'], (error, stdout, stderr) => {
  if (error) {
      console.error('stderr', stderr);
      throw error;
  }
  console.log('stdout', stdout);
});
*/

//lectura del directorio
/*

fs.mkdir(__dirname + "/public/Archivos/test", (err) => { // ,{ recursive: true } 
  if (err) {
    return console.error(err);
  } 
    console.log('Directory created successfully!'); 
}); 

fs.readdir(__dirname + "/public/login/", function (err, archivos) {
  if (err) {
    onError(err);
    return;
  }
  console.log(archivos);
});

*/
var mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "base"
});

var ingreso = true;  // dende de ser false
var registro = [];

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
    if (ingreso) {
      respuesta.status(200);
      respuesta.sendFile(__dirname+"/public/Interfaz.html");
    }else{
      respuesta.status(400);
      respuesta.sendFile(__dirname+"/public/login.html"); 
    }
});

app.get("/Arch",function(request,respuesta){
  console.log("Arch");
  respuesta.status(400);
  console.log(nombre);
  respuesta.sendFile(__dirname+"/public/Archivos/" + nombre + ".html");
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
  fs.readdir(directorio_archivos, function (err, files) {
    
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
      Crear_archivos(datos.nombre,datos.objeto);
    }
  });  
});

app.post("/listar",function(request,respuesta) {
  
  fs.readdir(directorio_archivos, function (err, files) {
    
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
  fs.readFile(directorio_archivos + "/" + Nombre, function(err, data) {

    if (err) {
      return console.log('Unable to scan directory: ' + err);
    } 
    respuesta.status(200);    
    respuesta.send(data);
  });
});

app.post("/registrar",function(request,response) {
    
    var data = request.body;
    console.log(data);
    registro = [data.name, data.corr, data.user, data.pass];
   
    if (data.user && data.corr) {
      
    con.query('SELECT * FROM usuarios WHERE usuario = ? AND correo = ?', [data.user, data.corr], function(error, result, fields) {
      console.log(result,"hola");
      if (result.length > 0) {
        response.send('Usuario y/o correo ya existente');                
        
      } else {        
        console.log(registro);
        con.query("INSERT INTO usuarios (nombre, correo, usuario, contraseña) VALUES (?,?,?,?)", registro,function (err, result, fields) {
        });
        con.query('SELECT * FROM usuarios WHERE usuario = ? AND correo = ?', [data.user, data.corr], function(error, result1, fields) {
          if (result1.length > 0) {
            response.status(200);
            response.send("OK");
          } else {
            response.send("registro fallido");
          }  
        });
              
      }           
    });
  } else {
    response.send('ingrese usuario y correo');
  }       
});

app.post("/home",function(request,response) {
    
  let data = request.body;
  console.log(data);

  con.query("SELECT * FROM pacientes", function (err, result, fields) {
    if (err) throw err;
    response.send(JSON.stringify(result));
    console.log(result);
  });        
});

app.post("/programar",function(request,respuesta) {
  let datos = request.body;  
  //let Nombre = datos.nombre;
  console.log(datos);
});


app.maxConnections = 2;
app.listen(60000, function(){  //3000,"0.0.0.0",
    console.log("escuchando ");
});