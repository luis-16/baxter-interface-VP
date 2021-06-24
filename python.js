console.log("inicio");
//sudo kill $(sudo lsof -t -i:50000) forzar cierre del servidor
global.nombre = "";

const express = require("express");
const app = express();

const path = require('path');
const fs = require('fs');

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

const {promisify} = require('util');
const {exec} = require('child_process');
const execAsync = promisify(exec);
C = 0;

const sequentialExecution = async (commands) => {
  C++;
  if (commands.length === 0) {
    return 0;
  }
  const {stderr ,stdout} = await execAsync(commands.shift());
  if (stderr) {
    throw stderr;
  }
  console.log(C,stdout);  
  //return sequentialExecution(commands);
  
  setTimeout(function () {
    return sequentialExecution(commands);
  }, 2000);
  
}

COM = [];
for (let i = 0; i < 1; i++) {
  COM.push("Codigos/configuracion_python.sh");  
}
// Will execute the commands in series
sequentialExecution(COM);





/*
var spawn = require('child_process').spawn;


//var child = spawn('Codigos/configuracion_python.sh && pwd',{  'Codigos/configuracion_python.sh && python Codigos/home.py'
COM = "Codigos/configuracion_python.sh";
for (let i = 0; i < 100; i++) {
  COM = COM + " && Codigos/configuracion_python.sh";  
}
//console.log(COM);
//var child = spawn("Codigos/configuracion_python.sh",{ 
var child = spawn(COM,{ //&& source ~/ros_ws/devel/setup.sh && python Codigos/home.py
  shell: true
});
child.stderr.on('data', function (data) {
  console.error("STDERR:", data.toString());
});
child.stdout.on('data', function (data) {
  console.log("STDOUT:", data.toString());
});
child.on('exit', function (exitCode) {
  console.log("Child exited with code: " + exitCode);
});






/*
const { spawn, spawnSync } = require('child_process');

//const proceso = spawn("python", ["Codigos/home.py"]);

//var echo = spawn("/home/baxter/Documentos/baxter/intento20/Codigos/configuracion_python.sh", []);
//var grep = spawn("python", ["home.py"]);

//var echo = spawn("/home/baxter/Documentos/baxter/intento20/Codigos/configuracion_python.sh", []);
var echo = spawn("source",["/opt/ros/indigo/setup.bash"]);
//var grep = spawn("source",["~/ros_ws/devel/setup.sh"]);
//var process = spawn("python", ["/Codigos/home.py"]);
codigo.on('exit', function (code, signal) {
    console.log('child process exited with ' +
                `code ${code} and signal ${signal}`);
});

echo.stdout.on('data', (data) => {
    console.log(`proceso1 salida:\n${data}`);
});
const shell = require('shelljs');

shell.exec(comando_configuracion_baxter, (err, stdout, stderr) => {
    if (err) {
      console.error(`error ejecucion configuracion_baxter: ${err}`);
      return;
    }
    console.log(`respuesta configuracion_baxter:\n${stdout}`);
  }); 


//echo.stdout.pipe(grep.stdin);
/*
grep.stdout.on('data', (data) => {
    console.log(`proceso1 salida:\n${data}`);
});
grep.stdout.pipe(process.stdin);


/*
var echo = spawn("ls", []);
var grep = spawn("python", ["home.py"]);
echo.stdout.pipe(grep.stdin);
console.log(echo.stdout);
grep.stdout.pipe(process.stdin);



/*
var command = "/home/baxter/Documentos/baxter/intento20/Codigos/configuracion_python.sh";
var args = [];
function name1(comando,argumento) {
    J = spawnSync(comando, argumento, {
        cwd: process.cwd(),
        env: process.env,
        stdio: 'pipe',
        encoding: 'utf-8'
    });
    console.log(J.output);   
}
name1(command,args);
name1("ls",args);
name1("cd",["Codigos"]);
name1("pwd",args);
//name1("python", ["Codigos/home.py"]);





/*
const proceso1 = spawn("/home/baxter/Documentos/baxter/intento20/Codigos/configuracion_python.sh");
var HJ = spawnSync.spawnSync("ls",[],function (err, stdout, stderr) {
    console.log("FG");
});
function ejecutar(comando,argumentos) {
    var codigo = spawn(comando,argumentos);

    codigo.on('exit', function (code, signal) {
        console.log('child process exited with ' +
                    `code ${code} and signal ${signal}`);
    });

    codigo.stdout.on('data', (data) => {
    console.log(`proceso1 salida:\n${data}`);
    });
    
    codigo.stderr.on('data', (data) => {
    console.error(`child1 stderr:\n${data}`);
    });
}
//F = "python", ["Codigos/home.py"];
J = "ls";
/*
const execSync = require('child_process').execSync;
code = execSync('node -v',function (err, stdout, stderr) {
    console.log("H");
});
console.log(code);

/*
const execSync = require('child_process').execSync;
Hola = execSync("ls", function (err, stdout, stderr) {
    if (err) {
     console.error(err);
     return;
    }
    console.log("F");
    console.log(stdout);
});
console.log(Hola);

function ejecutar2(comando) {
    code = execSync(comando, function (err, stdout, stderr) {
        if (err) {
         console.error(err);
         return;
        }
        console.log("F");
        console.log(stdout);
    });
    

    console.log("A");
}



ejecutar2("ls");
//ejecutar2("cd");


/*
var p1 = Promise.resolve(ejecutar("/home/baxter/Documentos/baxter/intento20/Codigos/configuracion_python.sh",[]));
var p2 = Promise.resolve(ejecutar("python", ["Codigos/home.py"]));
//ejecutar(J,[]);
Promise.all([p1, p2]).then(values => { 
    console.log(values); 
});

/*
var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 10000);
}); 

Promise.all([p1, p2, p3]).then(values => { 
  console.log(values); // [3, 1337, "foo"] 
});
*/



