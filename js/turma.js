$(document).ready(function () {

    //localStorage.removeItem("turma");


    //Ir buscar turma.json
    var turma = null;
    //Caso o ficheiro json n esteja em cache, ir buscá-lo e metê-lo em cache
    if (localStorage.getItem("turma") == null) {
        //Pedido ao servidor
        var requestURL = 'js/turma.json';
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function () {
            turma = request.response;

            //Guardar em cache
            myJSON = JSON.stringify(turma);
            localStorage.setItem("turma", myJSON);

        }
    }

    //Função para ir buscar a var turma à cache
    function getTurma() {
        var jsonRequest = localStorage.getItem("turma");
        turma = JSON.parse(jsonRequest);
        return turma;
    }

    function AppViewModelTurma() {
        var self = this;

        var turma = getTurma();

        //Bindings
        self.alunos = ko.observableArray();
        self.turma = ko.observable("");

        if (turma != null) {
            var a = turma["alunos"];
            //Criar estatisticas e dados personalizados para cada aluno
            for (var n = 0; n < a.length; n++) {
                //Contar faltas
                var faltas = a[n]["faltas"].length;
                a[n]["nFaltas"] = faltas;
                //Atribuir emoji da atitude
                switch (a[n]["atitude"]) {
                    case (5):
                        a[n]["atitudeEmoji"] = "<i class='fas fa-grin-stars'></i>";
                        break;
                    case (4):
                        a[n]["atitudeEmoji"] = "<i class='fas fa-laugh'></i>";
                        break;
                    case (3):
                        a[n]["atitudeEmoji"] = "<i class='fas fa-meh'></i>";
                        break;
                    case (2):
                        a[n]["atitudeEmoji"] = "<i class='fas fa-frown-open'></i>";
                        break;
                    case (1):
                        a[n]["atitudeEmoji"] = "<i class='fas fa-sad-tear'></i>";
                        break;

                }
            }
            self.alunos(a);
            self.turma(turma["turma"]);
        }

        //Modal editar dados
        self.modalNome = ko.observable("Editar dados do aluno");
        self.modalAluno = ko.observableArray([]);
        self.diasFaltas = ko.observableArray([]);
        var aluno;

        //Preencher dias faltas
        var today = new Date();
        var dia, mes, ano;
        for(var z=7; z>0; z--){
            //Só se podem marcar faltas para os sete dias anteriores
            dia = today.getDate();
            if(dia.toString().length==1){dia="0"+dia};
            mes = today.getMonth()+1;
            if(mes.toString().length==1){mes="0"+mes};
            ano = today.getFullYear();
            self.diasFaltas.push({"data":dia+"/"+mes+"/"+ano});
            today=new Date(today.getTime() - (24 * 60 * 60 * 1000));
        }


        self.editarAluno = function (data, event) {
            aluno = data;
            self.modalNome("Editar dados do aluno <br><small>" + aluno["nome"] + " | " + aluno["nAluno"] + "</small>");
            self.modalAluno(aluno);
            $("#notaAtitudes" + aluno["atitude"]).click();
            $("#notaPt" + aluno["disciplinas"][0]["avaliacao"]).click();
            $("#notaMat" + aluno["disciplinas"][1]["avaliacao"]).click();
            $("#notaEM" + aluno["disciplinas"][2]["avaliacao"]).click();
            $("#editarDadosAluno").modal('show');
        }

        $("#modalGuardarAlteracoes").click(function () {
            //alert($("#faltaDisciplina").val());
            //ir buscar valores do form
            var notaPt = parseInt($('input[name=notaPt]:checked').val());
            aluno["disciplinas"][0]["avaliacao"] = notaPt;//PT
            aluno["disciplinas"][0]["observacao"] = descricaoNota(notaPt, aluno["nome"]);
            var notaMat = parseInt($('input[name=notaMat]:checked').val());
            aluno["disciplinas"][1]["avaliacao"] = notaMat;//Mat
            aluno["disciplinas"][1]["observacao"] = descricaoNota(notaMat, aluno["nome"]);
            var notaEm = parseInt($('input[name=notaEM]:checked').val());
            aluno["disciplinas"][2]["avaliacao"] = notaEm;//EM
            var notaAtitude = parseInt($('input[name=notaAtitudes]:checked').val());
            aluno["atitude"] = notaAtitude;//Atitudes
            aluno["disciplinas"][2]["observacao"] = descricaoNota(notaEm, aluno["nome"]);
            //Atualizar a var turma
            var alunos = turma["alunos"];
            for (var n = 0; n < alunos.length; n++) {
                if (alunos[n]["nAluno"] == aluno["nAluno"]) {
                    alunos[n] = aluno;
                }
            }
            turma["alunos"] = alunos;
            //Atualizar em cache
            myJSON = JSON.stringify(turma);
            localStorage.setItem("turma", myJSON);
            //Atualizar tabela
            self.alunos(turma["alunos"]);
            //Fechar modal
            $("#editarDadosAluno").modal('hide');
            location.reload();
        });


    }

    $("#modalSubmeterFalta").click(function () {
        alert("clicked");
        /*console.log("submeter falta");
        //ir buscar valores do form
        var faltaDisciplina = $("#faltaDisciplina").val();
        var faltaDia = $("#faltaDia").val();
        var faltaMotivo = $("#faltaMotivo").val();
        //Atualizar a var turma
        aluno["faltas"].push({ "dia": faltaDia, "disciplina": faltaDisciplina, "motivo": faltaMotivo });
        console.log(aluno["faltas"]);
        //Atualizar a var turma
        var alunos = turma["alunos"];
        for (var n = 0; n < alunos.length; n++) {
            if (alunos[n]["nAluno"] == aluno["nAluno"]) {
                alunos[n] = aluno;
            }
        }
        turma["alunos"] = alunos;
        //Atualizar em cache
        myJSON = JSON.stringify(turma);
        localStorage.setItem("turma", myJSON);
        //Atualizar tabela
        self.alunos(turma["alunos"]);
        $("#modalAdicionarFalta").click();
        //location.reload();*/
    });

    function descricaoNota(n, nomeCompleto) {
        var nome = nomeCompleto.split(" ")[0];
        switch (n) {
            case (5):
                return " O " + nome + " é um aluno interessado e realiza com muito empenho todas as tarefas propostas.";
            case (4):
                return " O " + nome + " realiza a maioria das tarefas, conforme o esperado, apresentando algumas falhas na concretização.";
            case (3):
                return " O " + nome + " realiza algumas tarefas, conforme o esperado. Deve trabalhar para melhorar os seus resultados.";
            case (2):
                return " O " + nome + " realiza algumas tarefas, demonstrando bastantes dificuldades na sua realização. Deve trabalhar para melhorar os seus resultados.";
            case (1):
                return " O " + nome + " não demonstra qualquer empenho no desenvolvimento das tarefas. Deve repensar a sua atitude.";
        }
    }

    ko.applyBindings(new AppViewModelTurma(), document.getElementById("pageContent"));

})