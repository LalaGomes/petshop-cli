const cachorros = require('./database/cachorros.json');
const fs = require('fs')
module.exports = {
    listar: function(){
        console.table(cachorros);
    },
    descrever: function(pos){
        if(pos >= cachorros.length || pos < 0){
            console.error("Cachorro inexistente!");
            return;
        }

        let c = cachorros[pos];
        console.log(`Nome: ${c.nome}`);
        console.log(`Sexo: ${c.sexo}`);
        console.log(`Data de Nascimento: ${c.dataDeNascimento}`);
        console.log(`Peso: ${c.peso}`);
        if(c.castrado){
            console.log("Castrado: Sim")
        }else{
            console.log("Castrado: Não")
        }
        console.log("Vacinas:")
        console.table(c.vacinas);

        console.log("Serviços:")
        console.table(c.servicos);
    },
    adicionar: function($nome, $sexo, $castrado, $dataDeNascimento, $peso){
    let addCachorro = {
        Nome: $nome,
        Sexo: $sexo,
        Castrado: $castrado,
        DataDeNascimento: $dataDeNascimento,
        Peso: $peso,
        Vacinas: [],
        Servicos: [],

    }
     cachorros.push(addCachorro);
     
     fs.writeFileSync('./database/cachorros.json', JSON.stringify(cachorros));
    },
    vacinar: function(pos,nomeDaVacina){

        // Verificar se existe um cachorro na posição passada.
        if(pos >= cachorros.length || pos < 0){
            console.log("Cachorro Inexistente");
            return;
        }
        // Criar um objeto literal com as informações da vacina.
        let novaVacina = {
            nome: nomeDaVacina,
            data: (new Date()).toISOString().substr(0,10)
        }
        // Adicionar esse Objeto literal ao array de vacinas do cachorro.
        cachorros[pos].vacinas.push(novaVacina);

        // Salvar o array de cachorros novamente no arquivo.
        fs.writeFileSync('./database/cachorros.json', JSON.stringify(cachorros,null,4));
    }

}
