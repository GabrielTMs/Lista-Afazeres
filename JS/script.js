const formCampo = document.querySelector("#campTudoInput");
const campoCriar = document.querySelector("#criarListaCamp");
const inputCriar = document.querySelector("#icriar");
const campEdicao = document.querySelector("#editarListaCamp");
const botaoCancelar = document.querySelector("#cancelarButton");
const tarefasCampo = document.querySelector("#campoTarefas");

const criadorLista = (titulo) => {
    const divDaLista = document.createElement("div");
    divDaLista.classList.add("tarefa");
    
    const paragLista = document.createElement("p");
    paragLista.innerText = titulo;
    divDaLista.appendChild(paragLista);

    const divCampoIcones = document.createElement("div");
    divCampoIcones.classList.add("iconesCampo");

    divDaLista.appendChild(divCampoIcones);

    const confirmButton = document.createElement("button");
    confirmButton.classList.add("btnConcluir")
    confirmButton.innerHTML = '<i class="fa-solid fa-square-check tarefaIcon concluida"></i>'

    divCampoIcones.appendChild(confirmButton)

    const editButton = document.createElement("button");
    editButton.classList.add("btnEditar")
    editButton.innerHTML = '<i class="fa-solid fa-square-pen tarefaIcon penIcon"></i>'
    
    divCampoIcones.appendChild(editButton)

    const excluirButton = document.createElement("button");
    excluirButton.classList.add("btnExcluir")
    excluirButton.innerHTML = '<i class="fa-solid fa-square-xmark deleteIcon"></i>'

    divCampoIcones.appendChild(excluirButton)

    tarefasCampo.appendChild(divDaLista);

    inputCriar.value = "";

    inputCriar.focus();

}


formCampo.addEventListener("submit", (e) => {
    e.preventDefault();

    const criarInput = icriar.value;

    if (criarInput) {
        criadorLista(criarInput);
    }
});

document.addEventListener("click", (e) => {
    const alvoBtn = e.target;

    const paiBtnConcluir = alvoBtn.closest(".btnConcluir");

    if (paiBtnConcluir) {

        const tarefaDiv = paiBtnConcluir.closest(".tarefa");
        
        if (tarefaDiv) {
            tarefaDiv.classList.toggle("tarefaCompleta");
        }
    }
});