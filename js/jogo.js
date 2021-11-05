class Celula {
    constructor(isViva = false) {
        this.isViva = isViva;
        this.proxStatus = false;
    }

    revivier() { this.proxStatus = true; }
    morrer() { this.proxStatus = false; }
    atualizar() { this.isViva = this.proxStatus; }
}

class Tabuleiro {
    constructor(qtdLin, qtdCol) {
        this.qtdLin = qtdLin;
        this.qtdCol = qtdCol;
        this.qtdCelVivas = 0;
        this.qtdGeracoes = 1;
        this.campo = [];
        this.gerarCampo();
    }

    gerarCampo() {
        this.campo = [];

        for (let i = 0; i < this.qtdLin; i++) {
            const linha = [];

            for (let j = 0; j < this.qtdCol; j++) {
                const idCel = `td#cel${i<10?"0":""}${i}${j<10?"0":""}${j}`;
                const td = document.querySelector(idCel);
                const status = td.className == "viva";
                linha.push(new Celula(status));
                if(status) this.qtdCelVivas++;
            }

            this.campo.push(linha);
        }
    }

    gerarCampoHTML() {
        const tabuleiro = document.querySelector("div.tabuleiro");
        const detalhes = document.querySelector("div#detalhes");

        tabela = "<table><tbody>";

        for (let i = 0; i < this.qtdLin; i++) {
            tabela += "<tr>";
            for (let j = 0; j < this.qtdCol; j++) {
                const id = `cel${i<10?"0":""}${i}${j<10?"0":""}${j}`;
                const status = this.campo[i][j].isViva ? "viva" : "morta";
                tabela += `<td id="${id}" class="${status}"></td>`;
            }
            tabela += "</tr>";
        }

        tabela += "</table></tbody>";

        tabuleiro.innerHTML = tabela;
        detalhes.innerText = `Geração: ${this.qtdGeracoes} ::: População: ${this.qtdCelVivas}`;
    }

    verificarProxStatus(celula, quantVivasAdjacentes) {
        if (!celula.isViva) {
            if (quantVivasAdjacentes == 3) {
                celula.revivier();
                this.qtdCelVivas++;
            }else{
                celula.morrer();
            }
        } else {
            if (quantVivasAdjacentes < 2 || quantVivasAdjacentes > 3) {
                celula.morrer();
                this.qtdCelVivas--;
            }else{
                celula.revivier();
            }
        }
    }

    verificarAdjacentes(celula, i, j) {
        let quantVivasAdjacentes = 0;
        for (let k = i - 1; k < i + 2; k++) {
            for (let l = j - 1; l < j + 2; l++) {

                if ((k < 0 || l < 0) ||
                    (k >= this.qtdLin || l >= this.qtdCol) ||
                    (k == i && l == j)) {
                    continue;
                }

                if (this.campo[k][l].isViva) {
                    quantVivasAdjacentes++;
                }
            }
        }

        this.verificarProxStatus(celula, quantVivasAdjacentes);
    }

    atualizarProxStatus() {
        for (let i = 0; i < this.qtdLin; i++) {
            for (let j = 0; j < this.qtdCol; j++) {
                const celula = this.campo[i][j];
                this.verificarAdjacentes(celula, i, j);
            }
        }
    }

    atualizarCelulas() {
        for (let i = 0; i < this.qtdLin; i++) {
            for (let j = 0; j < this.qtdCol; j++) {
                const celula = this.campo[i][j];
                celula.atualizar();
            }
        }
    }

    atualizar() {
        this.gerarCampoHTML();
        this.atualizarProxStatus();
        this.atualizarCelulas();
        this.qtdGeracoes++;
        this.gerarCampoHTML();
    }
}

function iniciar() {
    const rangeVel = document.querySelector("input#vel");
    const vel = Number(rangeVel.value);

    console.log(vel);

    if(tabuleiro == null){
        const rangeLin = document.querySelector("input#qtdLin");
        const rangeCol = document.querySelector("input#qtdCol");
    
        const qtdLin = Number(rangeLin.value);
        const qtdCol = Number(rangeCol.value);
    
        tabuleiro = new Tabuleiro(qtdLin, qtdCol);

    }

    if(jogoAtivo == null){
        jogoAtivo = window.setInterval(atualizarJogo, vel);
    
        function atualizarJogo() {
            tabuleiro.atualizar();
        }
    }

}

function parar(){
    clearInterval(jogoAtivo);
    jogoAtivo = null;
}

function reiniciar(){
    location.reload();
}

var tabuleiro = null;
var jogoAtivo = null;
