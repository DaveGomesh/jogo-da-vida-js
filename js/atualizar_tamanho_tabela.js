
const rangeLin = document.querySelector("input#qtdLin");
const rangeCol = document.querySelector("input#qtdCol");
const rangeTam = document.querySelector("input#tamCel");
const rangeVel = document.querySelector("input#vel");

function atulizarTabela() {
    const qtdLin = rangeLin.value;
    const qtdCol = rangeCol.value;
    criarTabela(qtdLin, qtdCol);
}

rangeLin.addEventListener("change", () => {
    const lblQtdLin = document.querySelector("label#lblQtdLin");
    lblQtdLin.textContent = `Quant. Lin: ${rangeLin.value}`;
    
    atulizarTabela();
});

rangeCol.addEventListener("change", () => {
    const lblQtdCol = document.querySelector("label#lblQtdCol");
    lblQtdCol.textContent = `Quant. Col: ${rangeCol.value}`;
    
    atulizarTabela();
});

rangeTam.addEventListener("change", () => {
    const lblTamCel = document.querySelector("label#lblTamCel");
    lblTamCel.textContent = `Tam. Células: ${rangeTam.value}px`;
    
    const estilo = document.querySelector("style#estilo");
    estilo.innerText = `
        td{
            padding: ${rangeTam.value}px;
        }
    `;

});

rangeVel.addEventListener("change", () => {
    const lblVel = document.querySelector("label#lblVel");
    lblVel.textContent = `Velocidade: ${rangeVel.value}ms`;
});

