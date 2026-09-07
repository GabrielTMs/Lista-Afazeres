const formCampo = document.querySelector("#campTudoInput");
const campoCriar = document.querySelector("#criarListaCamp");
const inputCriar = document.querySelector("#icriar");
const campEdicao = document.querySelector("#editarListaCamp");
const botaoCancelar = document.querySelector("#cancelarButton");


formCampo.addEventListener("submit", (e) => {
    e.preventDefault();

    const criarInput = icriar.value;

    if (criarInput) {
        console.log(criarInput);
    }
})