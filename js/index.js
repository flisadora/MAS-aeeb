$(document).ready(function () {

    //Ir buscar eventos.json
    var eventos = null;
    //Caso o ficheiro json n esteja em cache, ir buscá-lo e metê-lo em cache
    if (localStorage.getItem("eventos") == null) {
        //Pedido ao servidor
        var requestURLeventos = 'js/eventos.json';
        var requestEventos = new XMLHttpRequest();
        requestEventos.open('GET', requestURLeventos);
        requestEventos.responseType = 'json';
        requestEventos.send();
        requestEventos.onload = function () {
            eventos = requestEventos.response;

            //Guardar em cache
            myJSONeventos = JSON.stringify(eventos);
            localStorage.setItem("eventos", myJSONeventos);

            getEventos();
        }
    } else {
        getEventos();
    }

    //Função para ir buscar a var eventos à cache
    function getEventos() {
        var jsonRequestEventos = localStorage.getItem("eventos");
        eventos = JSON.parse(jsonRequestEventos);
        //console.log("isadora");
        //console.log(eventos);
        fillCardNextEvent();
    }


    function fillCardNextEvent() {
        var nextEventoData = document.getElementById("card-event-data");
        var nextEventoDesc = document.getElementById("card-event-desc");
        nextEventoData.innerHTML = eventos['Atual'].eventos[0].data;
        nextEventoDesc.innerHTML = eventos['Atual'].eventos[0].titulo;
    }


    //Ir buscar horario.json
    var horario = null;
    //Caso o ficheiro json n esteja em cache, ir buscá-lo e metê-lo em cache
    if (localStorage.getItem("horario") == null) {
        //Pedido ao servidor
        var requestURLhorario = 'js/horario.json';
        var requestHorario = new XMLHttpRequest();
        requestHorario.open('GET', requestURLhorario);
        requestHorario.responseType = 'json';
        requestHorario.send();
        requestHorario.onload = function () {
            horario = requestHorario.response;

            //Guardar em cache
            myJSONhorario = JSON.stringify(horario);
            localStorage.setItem("horario", myJSONhorario);

            getHorario();
        }
    } else {
        getHorario();
    }

    //Função para ir buscar a var horario à cache
    function getHorario() {
        var jsonRequestHorario = localStorage.getItem("horario");
        horario = JSON.parse(jsonRequestHorario);
        //console.log(horario);
        verHorario();
    }

    function verHorario() {
        var data_atual = new Date();
        var dia_atual = data_atual.getDay();
        var horarios_dia;
        var cardHorario1 = document.getElementById("card-horario-1");
        var cardHorario2 = document.getElementById("card-horario-2");
        var cardHorario3 = document.getElementById("card-horario-3");
        switch (dia_atual) {
            case 0://domingo
                horarios_dia = horario["Segunda"];
                cardHorario1.innerHTML = "09:00  " + horarios_dia[0].disciplina;
                cardHorario2.innerHTML = "10:00 " + horarios_dia[1].disciplina;
                cardHorario3.innerHTML = "11:30 " + horarios_dia[3].disciplina;
                break;
            case 1://segunda
                horarios_dia = horario["Segunda"];
                cardHorario1.innerHTML = "09:00  " + horarios_dia[0].disciplina;
                cardHorario2.innerHTML = "10:00 " + horarios_dia[1].disciplina;
                cardHorario3.innerHTML = "11:30 " + horarios_dia[3].disciplina;
                break;
            case 2://terca
                horarios_dia = horario["Terça"];
                cardHorario1.innerHTML = "09:00   " + horarios_dia[0].disciplina;
                cardHorario2.innerHTML = "10:00 " + horarios_dia[1].disciplina;
                cardHorario3.innerHTML = "11:30 " + horarios_dia[3].disciplina;
                break;
            case 3://quarta
                horarios_dia = horario["Quarta"];
                cardHorario1.innerHTML = "09:00   " + horarios_dia[0].disciplina;
                cardHorario2.innerHTML = "10:00 " + horarios_dia[1].disciplina;
                cardHorario3.innerHTML = "11:30 " + horarios_dia[3].disciplina;
                break;
            case 4://quinta
                horarios_dia = horario["Quinta"];
                cardHorario1.innerHTML = "09:00   " + horarios_dia[0].disciplina;
                cardHorario2.innerHTML = "10:00 " + horarios_dia[1].disciplina;
                cardHorario3.innerHTML = "11:30 " + horarios_dia[3].disciplina;
                break;
            case 5://sexta
                horarios_dia = horario["Sexta"];
                cardHorario1.innerHTML = "09:00   " + horarios_dia[0].disciplina;
                cardHorario2.innerHTML = "10:00 " + horarios_dia[1].disciplina;
                cardHorario3.innerHTML = "11:30 " + horarios_dia[3].disciplina;
                break;
            case 6://sabado
                horarios_dia = horario["Segunda"];
                cardHorario1.innerHTML = "09:00  " + horarios_dia[0].disciplina;
                cardHorario2.innerHTML = "10:00 " + horarios_dia[1].disciplina;
                cardHorario3.innerHTML = "11:30 " + horarios_dia[3].disciplina;
                break;
        }
    }


    //Ir buscar atividades.json
    var atividades = null;
    //Caso o ficheiro json n esteja em cache, ir buscá-lo e metê-lo em cache
    if (localStorage.getItem("atividades") == null) {
        //Pedido ao servidor
        var requestURLatividades = 'js/atividades.json';
        var requestAtividade = new XMLHttpRequest();
        requestAtividade.open('GET', requestURLatividades);
        requestAtividade.responseType = 'json';
        requestAtividade.send();
        requestAtividade.onload = function () {
            atividades = requestAtividade.response;

            //Guardar em cache
            myJSONatividades = JSON.stringify(atividades);
            localStorage.setItem("atividades", myJSONatividades);

            getAtividades();
        }
    } else {
        getAtividades();
    }

    //Função para ir buscar a var atividades à cache
    function getAtividades() {
        var jsonRequestAtividades = localStorage.getItem("atividades");
        atividades = JSON.parse(jsonRequestAtividades);
        //console.log(atividades);
        fillCardNextActivity();
    }

    function fillCardNextActivity() {
        var nextAtividadeData = document.getElementById("card-ativ-data");
        var nextAtividadeDesc = document.getElementById("card-ativ-desc");
        nextAtividadeData.innerHTML = atividades['Atual'].atividades[0].data;
        nextAtividadeDesc.innerHTML = atividades['Atual'].atividades[0].titulo;
        console.log("isadora");
    }

    getAtividades();
    getEventos();
    getHorario();

})