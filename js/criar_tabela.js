function criarTabela(qtdLin = 15, qtdCol = 15) {
    const tab = document.querySelector("div.tabuleiro");

    tabela = "<table><tbody>";

    for (let i = 0; i < qtdLin; i++) {
        tabela += "<tr>";
        for (let j = 0; j < qtdCol; j++) {
            let id = `cel${i<10?"0":""}${i}${j<10?"0":""}${j}`;
            tabela += `<td id="${id}" class="morta" onclick="mudarClasse('${id}');" onmouseover="mudarClasse('${id}', true);"></td>`;
        }
        tabela += "</tr>";
    }

    tabela += "</table></tbody>";

    tab.innerHTML = tabela;
}