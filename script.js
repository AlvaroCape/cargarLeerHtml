const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h2");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#input-file");
const htmlNuevo = document.querySelector("#preview");
const botonExcel = document.querySelector("#excel");

var files, question, ingreso;
var alumnos = [];

var worksheet;
var workbook;

//Crear excel con los datos cargados del html
botonExcel.addEventListener("click", e => {
    console.log("click");
    console.log(alumnos[0]);
    var p = ["nombre", "correo", "cedula"];

    workbook = XLSX.utils.book_new();
    
    //workbook.SheetNames.push("Presencial");

    worksheet = XLSX.utils.json_to_sheet(alumnos[0]);

    XLSX.utils.book_append_sheet(workbook, worksheet, "alumnos");

    XLSX.utils.sheet_add_aoa(worksheet, [[p[0], "", p[1]]], { origin: "A3" });
   
    XLSX.writeFile(workbook, "abdomen.xlsx", { compression: true });

    alumnos = []    //vaciar despues de agregar los alumnos
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



function processFile(file){
    const docType = file.type;
    const validExt = ["text/html", "message/rfc822"];
    
    console.log("La extension es: " + docType);

    if (validExt.includes(docType)){
        const fileReader = new FileReader();

        let columna_question=[];
        let columna_valor=[];

        fileReader.readAsText(file);
        
        fileReader.addEventListener("load", e =>{
            const filetext = fileReader.result;

            let nombre = "";//
            let usuario = "";//
            let correo = "";     //    
            let tipoCedula = "";// 
            let cedula = "";     //          
            let numero = "";//   
            let estado = "";//   
            let moneda = "";     //          
            let formaPago = "";  //          
            let monto = "";      //          
            let fechaPago = "";  //           
            let ref = "";   //              
            let curso = "";      //          
            let nivel = "";      //
            let observacion = "";//          


            htmlNuevo.innerHTML = filetext

            question = document.querySelectorAll(".questionColumn");

            for (let i = 0; i < question.length; i++){
                    columna_question[i] = question[i].textContent.split("\n").join("");
                    columna_valor[i] = document.getElementById("value_"+question[i].id.replace(/[^0-9]+/g, "")).textContent.split("\n").join("");
                    ingreso = document.querySelector("strong").textContent.toUpperCase();

            }
 
            for (let i = 0; i < columna_question.length; i++) {
                switch (columna_question[i].split(" ").join("").trim()){
                    case "Nombre":
                        nombre = columna_valor[i]
                        console.log("Nombre guardado: "+nombre)
                        break;

                    case "Nombredeusuario":
                        usuario = columna_valor[i]
                        console.log("usuario guardado "+usuario)
                        break;

                    case "CorreoElectrónico":
                        correo = columna_valor[i]
                        console.log("correo guardado "+correo)
                        break;

                    case "Tipodedocumentodeidentidad":
                        tipoCedula = columna_valor[i]
                        console.log("tipo de cedula guardado")
                        break;
                    
                    case "Nro.documentodeidentidad":
                        cedula = columna_valor[i]
                        console.log("Numero cedula guardado")
                        break;

                    case "Númerodeteléfono":
                        numero = columna_valor[i]
                        console.log("numero guardado")
                        break;
                        
                    case "Estadodondereside":
                        estado = columna_valor[i]
                        console.log("estado guardado")
                        break;

                    case "Monedadepago":
                        moneda = columna_valor[i]
                        console.log("moneda guardado")
                        break;

                    case "Formadepago":
                        formaPago = columna_valor[i]
                        console.log("forma de pago guardado")
                        break;

                    case "Montopagado":
                        monto = columna_valor[i]
                        console.log("monto guardado")
                        break;

                    case "Fechaenlaqueserealizoelpago":
                        fechaPago = columna_valor[i]
                        console.log("fecha pago guardado")
                        break;

                    case "Nro.referenciadepago":
                        ref = columna_valor[i]
                        console.log("referencia guardado")
                        break;

                    case "Niveldeexperienciaenultrasonidomedico":
                        nivel = columna_valor[i]
                        console.log("experiencia guardado "+nivel)
                        break;
                        
                    case "Observaciones":
                        observacion = columna_valor[i]
                        console.log("observación guardado")
                        break;

                    default:
                        console.log("Error de asignación. no guardado: "+columna_question[i]+" Valor: "+columna_valor[i])
                        break;
                }
            }

            let alumno = [{
                "nombre": nombre,
                "usuario": usuario,
                "correo": correo,
                "tipoCedula": tipoCedula,
                "cedula": cedula,
                "numero": numero,
                "estado": estado,
                "moneda": moneda,
                "formaPago": formaPago,
                "monto": monto,
                "fechaPago": fechaPago,
                "ref": ref,
                "nivel": nivel,
                "observacion": observacion
            }]

            console.log("alumno: " +alumno.nombre)

            

            alumnos.push(alumno);



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