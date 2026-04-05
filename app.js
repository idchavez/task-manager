let contadorTareas = 0;
let contadorCompletadas = 0
const tareas = [];

function contador() {
    document.getElementById("tareasAsignadas").textContent = contadorTareas;
    document.getElementById("tareasCompletadas").textContent = contadorCompletadas;
}

let tareaInput = document.getElementById("tarea");
let categoriaSelect = document.getElementById("seleccion");
let nuevaCategoria = document.getElementById("otraCategoria");

categoriaSelect.addEventListener("change", function(){
    if(categoriaSelect.value === "otra") {
        nuevaCategoria.classList.remove("ocultar");
    } else {
        nuevaCategoria.classList.add("ocultar");
    }
});

function agregarTarea() {

    let tarea = tareaInput.value.trim();
    let categoria = categoriaSelect.value;
    let categoriaPersonalizada = nuevaCategoria.value.trim();

    if (categoria.value == "otra") {
        categoria = categoriaPersonalizada;
    }

    tareas.push({
        tarea: tarea,
        categoria: categoria,
        terminada: false
    })
    contadorTareas++;
    contador();

    console.log("agregada:" , tareas);
    
    tarea.value = "";

    mostrarTareas();
}

function mostrarTareas() {
    let lista = document.getElementById("listaTareas");
    
    lista.innerHTML = "";

    tareas.forEach(tarea => {
        let listItem = document.createElement("li");
        listItem.textContent = `${tarea.tarea} - ${tarea.categoria}`;
        lista.appendChild(listItem);
    });
}

function eliminarTarea() {
    if(confirm("Deseas eliminar esta tarea?")) {
        if (tareas) {
            contadorCompletadas--;
        }
    }
}

function tareaTerminada(index) {
    let tarea = tareas[index];

    tarea.terminada = !tarea.terminada;

    if(tarea.terminada) {
        contadorCompletadas++;
    } else {
        contadorCompletadas--;
    }

    contador();
}

function tareaUrgente() {

}