// Evento 
document.getElementById("formulario").addEventListener("submit", crear);

// Función crear

function crear(e){
    
    ide = document.getElementById("ide").value
    apellido = document.getElementById("apellido").value
    nombre = document.getElementById("nombre").value
    puesto = document.getElementById("puesto").value
    
    let usuario= {
        ide,
        apellido,
        nombre,
        puesto
    }

    //local storage
    if(localStorage.getItem("Usuarios") === null){
        let usuarios = []
        usuarios.push(usuario)
        localStorage.setItem("Usuarios", JSON.stringify(usuarios))
    }else{
        let usuarios = JSON.parse(localStorage.getItem("Usuarios"))
        usuarios.push(usuario)
        localStorage.setItem("Usuarios", JSON.stringify(usuarios))
    }
    leer();
    document.getElementById("formulario").reset()
    console.log("usuario guardado correctamente")
    e.preventDefault()
}

//funcion leer

function leer(){
    let usuarios = JSON.parse(localStorage.getItem("Usuarios"))
    document.getElementById("tbody").innerHTML=""
    for(let i=0; i < usuarios.length; i++){
        let ide = usuarios[i].ide
        let apellido = usuarios[i].apellido
        let nombre = usuarios[i].nombre
        let puesto = usuarios[i].puesto

        document.getElementById("tbody").innerHTML +=
        ` 
        <tr>
        <td>${ide}</td>
        <td>${nombre}</td>
        <td>${apellido}</td>
        <td>${puesto}</td>
        <td>
          <!-- Button trigger modal -->
        <!-- Button trigger modal -->
        <button onclick="editar('${nombre}')" type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal">
        Editar </button>
          <button onclick="eliminar('${nombre}')" type="button"  class="btn btn-danger">Eliminar</button>
        </td>
      </tr>
        
        `
    }
}
leer()

function editar(nombre){
    let usuarios = JSON.parse(localStorage.getItem("Usuarios"));
    for(let i = 0; i < usuarios.length; i++) {
        if(usuarios[i].nombre === nombre){
            document.getElementById("body").innerHTML =  
            `
            <div class="card">
            <div class="card-header">
              <h3 class="card-title">Datos</h3>
            </div>
          <div class="container">
            <form id="formulario">
            <div class="row">
          
              <!--campos para llenar-->
            
              <div class="col-md-6">
          
                <div class="input-group mb-3">
                  <input type="number" id="newide" class="form-control" placeholder="${usuarios[i].ide}" aria-label="Username" aria-describedby="basic-addon1">
                </div>
          
                <div class="input-group mb-3">
                  <input type="text" id="newapellido" class="form-control" placeholder="${usuarios[i].apellido}" aria-label="Username" aria-describedby="basic-addon1">
                </div>
                <button class="btn btn-success" onclick="actualizar('${i}')">Actualizar</button>
              </div>
          
          
              <div class="col-md-6">
                <div class="input-group mb-3">
                  <input type="text" id="newnombre" class="form-control" placeholder="${usuarios[i].nombre}" aria-label="Username" aria-describedby="basic-addon1">
                </div>
             
          
                <div class="input-group mb-3">
                  <input type="text" id="newpuesto" class="form-control" placeholder="${usuarios[i].puesto}" aria-label="Username" aria-describedby="basic-addon1">
                </div>
              </div>
           
            </div>
          </form>
            
            `
        }
    }
}

// función actualizar
function actualizar(i){
    
    let usuarios= JSON.parse(localStorage.getItem("Usuarios"));
    usuarios[i].ide = document.getElementById("newide").value;
    usuarios[i].nombre = document.getElementById("newnombre").value;
    usuarios[i].apellido = document.getElementById("newapellido").value;
    usuarios[i].puesto = document.getElementById("newpuesto").value;

    localStorage.setItem("Usuarios", JSON.stringify(usuarios));

}


// función eliminar

function eliminar(nombre){
    let usuarios = JSON.parse(localStorage.getItem("Usuarios"));
    for(let i=0; i<usuarios.length; i++){
        if(usuarios[i].nombre === nombre){
            usuarios.splice(i,1)
        }
    }
    localStorage.setItem("Usuarios",JSON.stringify(usuarios))
    leer();
}