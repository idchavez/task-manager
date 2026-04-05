let contadorTareas = 0;
let contadorCompletadas = 0
const tareas = [];

function contador() {
    document.getElementById("tareasAsignadas").textContent = contadorTareas;
    document.getElementById("tareasCompletadas").textContent = contadorCompletadas;
}

const tareaInput = document.getElementById("tarea");
const categoriaSelect = document.getElementById("seleccion");
const nuevaCategoria = document.getElementById("otraCategoria");

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
    let error = document.getElementById("campoVacio");

    if (categoria === "otra") {
        if (categoriaPersonalizada === "") {
            error.hidden = false;
            return;
        }
    }
    
    if (tarea === "" || categoria === "--Categoria--") {
        error.hidden = false;
        return;
    }
    error.hidden = true;

    if (categoria == "otra") {
        categoria = categoriaPersonalizada;
    }

    tareas.push({
        tarea: tarea,
        categoria: categoria,
        completada: false,
        urgente: false
    })
    contadorTareas++;
    contador();

    console.log("agregada:" , tareas);
    
    tareaInput.value = "";
    categoriaSelect.selectedIndex = 0;
    nuevaCategoria.classList.add("ocultar");

    mostrarTareas();
}

function mostrarTareas() {
    let lista = document.getElementById("listaTareas");
    
    lista.innerHTML = "";

    tareas.forEach((t, index) => {

        const card = document.createElement("div");
        card.classList.add("card");

        const texto = document.createElement("span");
        texto.textContent = `${t.tarea} - ${t.categoria}`;

        const btnHecha = document.createElement("button");
        btnHecha.textContent = "✔ Hecha";
        btnHecha.onclick = () => tareaTerminada(index);

        const btnUrgente = document.createElement("button");
        btnUrgente.textContent = "🕙 Urgente";
        btnUrgente.onclick = () => tareaUrgente(index);

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "✖ Eliminar";
        btnEliminar.onclick = () => eliminarTarea(index);

        const acciones = document.createElement("div");
        acciones.classList.add("acciones");

        acciones.appendChild(btnHecha);
        acciones.appendChild(btnUrgente);
        acciones.appendChild(btnEliminar);

        // 🔥 estados visuales
        if (t.completada) {
            texto.style.textDecoration = "line-through";
            card.classList.add("completada");
        }

        if (t.urgente) {
            card.classList.add("urgente");
        }

        // armar card
        card.appendChild(texto);
        card.appendChild(acciones);

        lista.appendChild(card);
    });
}

function eliminarTarea(index) {
    if (confirm("¿Eliminar tarea?")) {

        if (tareas[index].completada) {
            contadorCompletadas--;
        }

        tareas.splice(index, 1);
        contadorTareas--;

        mostrarTareas();
        contador();
    }
}

function tareaTerminada(index) {
    tareas[index].completada = !tareas[index].completada;
    if (tareas[index].completada) {
        tareas[index].urgente = false;
        contadorCompletadas++;
    } else {
        contadorCompletadas--;
    }
    mostrarTareas();
    contador();
}

function tareaUrgente(index) {
    tareas[index].urgente = !tareas[index].urgente;
    tareas[index].completada = false;
    contadorCompletadas--;
    contador();
    mostrarTareas();
}

function limpiarCompletadas() {

}