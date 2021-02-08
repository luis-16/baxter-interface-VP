var Usuario = "";
var Contraseña = "";
var datos = {
    user: Usuario,
    pass: Contraseña
};
    
function Iniciar_sesion() {
    datos.user = document.getElementById("Usuario").value;
    datos.pass = document.getElementById("Contraseña").value;
    $.post({
        url: "/login",        
        data: JSON.stringify(datos),
        contentType: "application/json",
        success: function(Entrada,status) {
          if(Entrada === "OK") {
            window.location.replace("/Inter");                
          }else{
            alert("Nombre de usuario y/o contraseña incorrectos");
            document.getElementById("Usuario").value = "";
            document.getElementById("Contraseña").value = "";
          }           
        }
    });
}