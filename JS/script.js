const formCampo = document.querySelector("#campTudoInput");
const campoCriar = document.querySelector("#criarListaCamp");
const inputCriar = document.querySelector("#icriar");
const campEdicao = document.querySelector("#editarListaCamp");
const inputEdit = document.querySelector("#ieditar");
const botaoEdit = document.querySelector("#botaoCampoEdicao");
const botaoCancelar = document.querySelector("#cancelarButton");
const tarefasCampo = document.querySelector("#campoTarefas");

let tituloAntigoTarefa;

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

};

const esconderFunction = () => {
    campoCriar.classList.toggle("esconder");
    botaoCancelar.classList.toggle("esconder");
    tarefasCampo.classList.toggle("esconder");
    campEdicao.classList.toggle("esconder");

};

const inputEditFunction = (paragraf) => {
    const seletorParaEdit = document.querySelectorAll(".tarefa");

    seletorParaEdit.forEach((titulAlter) => {
        let tituloListaEdit = titulAlter.querySelector("p");

        if (tituloListaEdit.innerText === tituloAntigoTarefa) {
            tituloListaEdit.innerText = paragraf;
        }
    })
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

    const btnExcluir = alvoBtn.closest(".btnExcluir")

    if (btnExcluir) {
        const excluirTarefa = btnExcluir.closest(".tarefa");
        
        if (excluirTarefa) {
            excluirTarefa.remove();
        }
    }

    let tituloListaEdit;

    const btnEdicaoTarefa = alvoBtn.closest(".btnEditar")

    if (btnEdicaoTarefa) {
        const selecionarTarefa = btnEdicaoTarefa.closest(".tarefa")

        if (selecionarTarefa) {
            
            tituloListaEdit = selecionarTarefa.querySelector("p").innerText;

            esconderFunction();
            
            inputEdit.value = tituloListaEdit
            tituloAntigoTarefa = tituloListaEdit
        }
    }
});

botaoCancelar.addEventListener("click", (e) => {
    e.preventDefault();

    esconderFunction();
});

botaoEdit.addEventListener("click", (e) => {
    e.preventDefault();

    const alterandoInputEdit = inputEdit.value;

    if (alterandoInputEdit) {
        inputEditFunction(alterandoInputEdit);
    }
    esconderFunction();
})