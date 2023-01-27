const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-file");
const htmlNuevo = document.querySelector("#preview");
const botonExcel = document.querySelector("#excel");

var files, question, alumnos, ingreso;
var columna_question=[];
var columna_valor=[];

//Crear excel con los datos cargados del html
botonExcel.addEventListener("click", e => {
    console.log("click");

});

//importar 
button.addEventListener("click", e => {
    input.click();
}); 

input.addEventListener("change", e => {
    let file = input.files;
    dropArea.classList.add("active");
    showFiles(file)
    dropArea.classList.remove("active")
});

dropArea.addEventListener("dragover", e => {
    e.preventDefault();
    dropArea.classList.add("active")
    dragText.textContent = "Suelta para cargar los archivos"
});

dropArea.addEventListener("dragleave", e => {
    e.preventDefault();
    dropArea.classList.remove("active")
    dragText.textContent = "Arrastra y suelta los archivos"
});

dropArea.addEventListener("drop", e => {
    e.preventDefault();
    files = e.dataTransfer.files;
    showFiles(files)
    dropArea.classList.remove("active")
    dragText.textContent = "Arrastra y suelta los archivos"
});

function showFiles(files) {

    if (files.length === undefined) {
        processFile(files);
    }
    else{
        for (const file of files) {
            processFile(file);
        }
    }
} 





function guardarInfo(dato, valor, i){

    let nombre, usuario, correo, tipoCedula, cedula, numero, estado, moneda, formaPago, monto, fechaPago, ref, curso, nivel, observacion;

    //console.log(dato +" - "+ valor);

    alumnos = {
        "nombre": valor,
    };

    if (i++ == question.length){

    }
}

function leerInfo(){

    console.log(typeof alumnos)
    console.log(alumnos)
    console.log(JSON.stringify(columna_valor));
    
}







function processFile(file){
    const docType = file.type;
    const validExt = ["text/html", "message/rfc822"];
    
    console.log("La extension es: " + docType);

    if (validExt.includes(docType)){
        const fileReader = new FileReader();

        fileReader.readAsText(file);
        
        fileReader.addEventListener("load", e =>{
            const filetext = fileReader.result;

            htmlNuevo.innerHTML = filetext

            question = document.querySelectorAll(".questionColumn");

            for (let i = 0; i < question.length; i++){
                    columna_question[i] = question[i].textContent.split("\n").join("");
                    columna_valor[i] = document.getElementById("value_"+question[i].id.replace(/[^0-9]+/g, "")).textContent.split("\n").join("");
                    ingreso = document.querySelector("strong").textContent.toUpperCase();

                    guardarInfo(columna_question[i], columna_valor[i], i);
            }
            
            
            leerInfo();
            
            /*
            var nombre = "";//Nuevo     value_3
            var usuario = "";//Regular  value_25
            var correo;     //          value_4
            var tipoCedula = "";//Nuevo value_6
            var cedula;     //          value_7
            var numero = "";//Nuevo     value_5
            var estado = "";//Nuevo     value_8
            var moneda;     //          value_9
            var formaPago;  //          value_10
            var monto;      //          value_21
            var fechaPago;  //          value_34 - regular 30
            var ref = "";   //          value_23    formaPago == efectivo: ref No existe. Ferificar si es zelle(33) o trans   
            var curso;      //          value_14
            var nivel;      //          value_35 - regular 32
            var observacion;//          value_16

            /*var datos = [nombre, usuario, correo, tipoCedula, cedula, numero, estado, moneda, formaPago, monto, fechaPago, ref, curso, nivel];
            alert("tiene "+datos.length)

            datos.forEach(element => {
                element = document.getElementById(element[1]).textContent;
            });

            let ingreso = document.querySelector("strong").textContent.toUpperCase();

            console.log("el ingreso es: "+ingreso);

            if (ingreso.includes("NUEVO")){
                nombre = document.getElementById("value_3").textContent.split("\n").join("");
                tipoCedula = document.getElementById("value_6").textContent;
                numero = document.getElementById("value_5").textContent;
                estado = document.getElementById("value_8").textContent;
                fechaPago = document.getElementById("value_34").textContent;
                nivel = document.getElementById("value_35").textContent;
            }
            else{
                usuario = document.getElementById("value_25").textContent;
                fechaPago = document.getElementById("value_30").textContent;
                nivel = document.getElementById("value_32").textContent;
            }

            correo = document.getElementById("value_4").textContent;
            cedula = document.getElementById("value_7").textContent;
            moneda = document.getElementById("value_9").textContent;
            formaPago = document.getElementById("value_10").textContent.toUpperCase().split("\n").join(" ");
            monto = document.getElementById("value_21").textContent;
            curso = document.getElementById("value_14").textContent;
            //observacion = document.getElementById("value_16").textContent;
            

            if (!(formaPago.includes("EFECTIVO"))){
                if (formaPago.includes("ZELLE")){
                    ref= document.getElementById("value_33").textContent;
                }
                else if(formaPago.includes("TRANSFERENCIA") || formaPago.includes("WESTER")){
                    ref= document.getElementById("value_23").textContent;
                }
            }*/
            


            //console.log("Nombre: "+nombre+"\nUsuario: "+usuario+"\ntipoCedula: "+tipoCedula+"\nCedula: "+cedula+"\nCorreo: "+correo+"\nNumero: "+numero+"\nEstado: "+estado+"\nMoneda: "+moneda+"\nForma de pago: "+formaPago+"\nMonto: "+monto+"\nFecha del pago: "+fechaPago+"\nReferencia: "+ref+"\nCurso: "+curso+"\nNivel: "+nivel);

        });
        
    }else{
        alert("La extension no es valida");
    }
}