const formCampo = document.querySelector("#campTudoInput");
const campoCriar = document.querySelector("#criarListaCamp");
const inputCriar = document.querySelector("#icriar");
const campEdicao = document.querySelector("#editarListaCamp");
const inputEdit = document.querySelector("#ieditar");
const botaoEdit = document.querySelector("#botaoCampoEdicao");
const botaoCancelar = document.querySelector("#cancelarButton");
const inputPesquisar = document.querySelector("#ipesquisa");
const botaoPesquisarDel = document.querySelector("#deleteButton");
const botaoFiltro = document.querySelector("#iFiltro");
const tarefasCampo = document.querySelector("#campoTarefas");


let tituloAntigoTarefa;

const criadorLista = (titulo, feitoTaref = 0, dadoSalvo = 1) => {
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

    // utilizando local storage com feitoTaref e dadoSalvo
    
    if(feitoTaref) {
        divDaLista.classList.add("tarefaCompleta")
    }

    if(dadoSalvo) {
        salvandoItensStorage({titulo, feitoTaref: 0});
    }

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

const buscaFunction = (buscaAlvo) => {
    const seletorParaBusca = document.querySelectorAll(".tarefa");

    seletorParaBusca.forEach((tarefas) => {
        let tituloListaBusca = tarefas.querySelector("p").innerText.toLowerCase();

        const procurador = buscaAlvo.toLowerCase();

        tarefas.style.display = "flex";

        if (!tituloListaBusca.includes(procurador)) {
            tarefas.style.display = "none";
        }
    })
}

const filtroFunction = (valorEscolhidoFiltro) => {

    const seletorParaFiltro = document.querySelectorAll(".tarefa");

    switch (valorEscolhidoFiltro) {
        case "Todos":
            seletorParaFiltro.forEach((tarefaExibida) => {
                tarefaExibida.style.display = "flex";
            })
            break;

        case "Feitos":
            seletorParaFiltro.forEach((tarefaExibida) => {
                tarefaExibida.classList.contains("tarefaCompleta") 
                ? (tarefaExibida.style.display = "flex") 
                : (tarefaExibida.style.display = "none")
            });
            break;

        case "PFazer":
            seletorParaFiltro.forEach((tarefaExibida) => {
                !tarefaExibida.classList.contains("tarefaCompleta") 
                ? (tarefaExibida.style.display = "flex") 
                : (tarefaExibida.style.display = "none")
                /*Depois deste forEach, nas chaves o ! é como dentro de um if, então nesse caso, caso o argumento seja diferente de ter uma classe tarefaCompleta, então if os elementos forem diferentes eles terão aqui um display = "flex" else terão um display = "none", então o ? é if e o : é else*/
            });
            break;
    
        default:
            break;
    }
}

// Local storage

const pegandoItensStorage = () => {
    const tarefaJson = JSON.parse(localStorage.getItem("tarefaJson")) || []

    return tarefaJson;
}

const salvandoItensStorage = (saves) => {
    const tarefaJson = pegandoItensStorage();

    tarefaJson.push(saves);

    localStorage.setItem("tarefaJson", JSON.stringify(tarefaJson))
}

//

formCampo.addEventListener("submit", (e) => {
    e.preventDefault();

    const criarInput = inputCriar.value;

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

inputPesquisar.addEventListener("keyup", (e) => {
    const buscaAlvo = e.target.value;

    buscaFunction(buscaAlvo);
})

botaoPesquisarDel.addEventListener("click", (e) => {
    e.preventDefault();

    inputPesquisar.value = "";

    inputPesquisar.dispatchEvent(new Event("keyup"));
})

botaoFiltro.addEventListener("change", (e) => {
    const filtroSelected = e.target.value;

    filtroFunction(filtroSelected);
})