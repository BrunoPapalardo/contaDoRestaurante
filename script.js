preco = {
    'Comidas': 0,
    'Batata frita': 20.00,
    'Cachorro-Quente': 12.00,
    'Coxinha': 4.50,
    'Esfirra': 4.50,
    'Lasanha': 5.90,
    'Macarronada': 10.00,
    'Pastel': 6.50,
    'Pizza': 42.00,
    'Sushi': 5.00,
    'Temaki': 15.00,
    'Torta': 7.00,

    'Bebidas': 0,
    'Água': 4.00,
    'Cerveja': 10.00,
    'Refrigerante': 08.00,
    'Suco': 7.00,
    'Vinho': 11.99,
    'Whisky': 20.00,

    'Sobremesas': 0,
    'Bolo': 10.00,
    'Fruta': 2.50,
    'Pavê': 5.50,
    'Pudim': 5.00,
    'Salada de fruta': 4.50,
    'Sorvete': 5.00,
    'Torta de Limão': 6.00
}
var contador = 1;

for (c in preco) {
    listarProdutos(preco[c], c);
}

var itemNum = 1;
var valorTotal = 0;

var valorDividido = [];
var listaProdutos = [];
var listaClientes = [0];
var listaFinal = ['lista'];

var backupClientes = [0];
var idContadorColuna = 0;
var idContadorLinha = 0;
var contadorLinha2 = 0;
var gerou = false;

function listarProdutos(preco, nome) {
    var html = "";
    if (preco != 0) {
        html += "<option>" + nome + "</option>"
    } else {
        html += "<option disabled></option>"
        html += "<option disabled>" + '.'.repeat((30 - nome.length) / 2) + nome + '.'.repeat((30 - nome.length) / 2) + "</option>"
        html += "<option disabled></option>"
    }
    $("#produtos").append(html);
}

function addProduto() {
    var select = document.getElementById('produtos');
    var value = select.options[select.selectedIndex].value;
    var name = select.options[select.selectedIndex].textContent;
    if (value != -1) {
        document.getElementById('fsClientes').hidden = false;
        this.location = "#fsClientes";
        size = 20 - name.length;
        document.getElementById("pedidos").hidden = false;
        document.getElementById("pedidos").textContent += "\n" + itemNum++ + "- " + name + ' '.repeat(size) + "R$" + preco[name].toFixed(2);
        listaProdutos.push(name);
        valorTotal = valorTotal + preco[name];
        document.getElementById("total").textContent = 'Valor total:\n R$ ' + valorTotal.toFixed(2);
        var html = "";
        html += "<td>";
        html += "<label name='coluna' id='item" + ++idContadorColuna + "'>" + name + "</label>"
        html += "</td>";
        $("#linhas-tabela").append(html);
    }
    document.getElementById('produtos').selectedIndex = 'default';
}

function add10() {
    if (gerou == false) {
        gerou = true;
        listaProdutos.push("10%");
        var html = "";
        html += "<td>";
        html += "<label name='coluna' id='item" + ++idContadorColuna + "'>10%</label>"
        html += "</td>";
        $("#linhas-tabela").append(html);
    }
}

function addCliente() {
    add10();
    document.getElementById("btnFinish").disabled = false;
    document.getElementById("btnAddProduto").hidden = true;
    document.getElementById("produtos").hidden = true;
    document.getElementById("produtos").disabled = true;
    document.getElementById('infoProdutos').hidden = true;
    value = document.getElementById("inputCliente").value;
    listaClientes.push([value]);
    idContadorLinha = 0;
    var html = "";
    html += "<tr>";
    html += "<td>";
    html += "<label name='linha' id='cliente" + ++contadorLinha2 + "'>" + value + "<label>";
    html += "</td>"

    for (c in listaProdutos) {
        html += "<td>";
        html += "<input type='checkbox' name='checker' id='check" + contadorLinha2 + ++idContadorLinha + "'/>";
        html += "</td>"
    }
    html += "</tr>";
    $("#tabela").append(html);
    backupClientes = JSON.parse(JSON.stringify(listaClientes));
    document.getElementById('inputCliente').value = 'Nome do cliente';
}

function verificarCheckBox() {
    listaFinal = ['lista'];
    var checkLinha = document.getElementsByName("linha");
    var checkColuna = document.getElementsByName("coluna");

    for (var coluna = 1; coluna < checkColuna.length + 1; coluna++) {
        nomeItem = document.getElementById("item" + coluna).textContent;
        valorItem = preco[nomeItem];
        listaFinal.push([nomeItem]);

        for (var linha = 1; linha < checkLinha.length + 1; linha++) {
            var check = document.getElementById("check" + linha + coluna);
            if (check.checked == true) {
                nomeCliente = document.getElementById("cliente" + linha).textContent;
                listaFinal[coluna].push(nomeCliente);
            }
        }
    }
}

function obterDados() {
    this.location = "#fsValores";
    document.getElementById('fsValores').hidden = false;
    document.getElementById('infoClientes').hidden = true;
    document.getElementById('infoClientes').hidden = true;
    document.getElementById('inputCliente').hidden = true;
    document.getElementById('btnAddCliente').hidden = true;
    document.getElementById("btnAddCliente").disabled = true;
    document.getElementById("inputCliente").disabled = true;
    listaClientes = JSON.parse(JSON.stringify(backupClientes));
    verificarCheckBox();
    totalParaCada();
    final();
}

function totalParaCada() {

    for (var produto = 1; produto < listaFinal.length; produto++) {
        precoFinal = preco[listaFinal[produto][0]] / (listaFinal[produto].length - 1);

        for (var quem = 1; quem < listaFinal[produto].length; quem++) {

            for (var j = 1; j < listaClientes.length; j++) {
                if (listaClientes[j][0] == listaFinal[produto][quem]) {
                    if (listaFinal[produto][0] != '10%') {
                        listaClientes[j].push(precoFinal);
                    } else {
                        listaClientes[j].push('10%');
                    }
                }
            }
        }
    }
}

function final() {
    document.getElementById("clientes").textContent = "Valores por pessoa:\n\n";

    for (var c = 1; c < listaClientes.length; c++) {
        valorTotalTotal = 0;
        document.getElementById("clientes").textContent += "\n" + listaClientes[c][0];

        for (var d = 1; d < listaClientes[c].length; d++) {
            if (listaClientes[c][d] != "10%") {
                valorTotalTotal += listaClientes[c][d];
            } else {
                valorTotalTotal = valorTotalTotal * 1.1;
            }
        }
        espaco = 20 - listaClientes[c][0].length;
        document.getElementById("clientes").textContent += ' '.repeat(espaco) + "R$ " + valorTotalTotal.toFixed(2);
    }
}

function info(secao) {
    if (secao == "produtos") {
        mensagem = 'Adicione todos os produtos que foram consumidos e quando finalizar, adicione os Clientes.';
    }
    if (secao == "clientes") {
        mensagem = 'Adicione todos os Clientes que participaram dessa conta e marque seus respectivos produtos e se colaborará com os 10% da taxa de serviço.\nQuando finalizar, clique em "Gerar Cobrança".';
    }
    if (secao == "gerar") {
        mensagem = 'Após Gerar Cobrança, é possível remarcar algum item caso ocorra algum problema.'
    }
    alert(mensagem);
}

function limparInput() {
    document.getElementById("inputCliente").value = "";
}