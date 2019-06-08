$(document).ready(function () {

    //Ir buscar eventos.json
    var eventos = null;
    //Caso o ficheiro json n esteja em cache, ir buscá-lo e metê-lo em cache
    if (localStorage.getItem("eventos") == null) {
        //Pedido ao servidor
        var requestURL = 'js/eventos.json';
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function () {
            eventos = request.response;

            //Guardar em cache
            myJSON = JSON.stringify(eventos);
            localStorage.setItem("eventos", myJSON);

            getEventos();
        }
    } else {
        getEventos();
    }

    //Função para ir buscar a var eventos à cache
    function getEventos() {
        var jsonRequest = localStorage.getItem("eventos");
        eventos = JSON.parse(jsonRequest);
        console.log(eventos);
        fillCardNextEvent();
        return eventos;
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
        var requestURL = 'js/horario.json';
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function () {
            horario = request.response;

            //Guardar em cache
            myJSON = JSON.stringify(horario);
            localStorage.setItem("horario", myJSON);

            getHorario();
        }
    } else {
        getHorario();
    }

    //Função para ir buscar a var horario à cache
    function getHorario() {
        var jsonRequest = localStorage.getItem("horario");
        horario = JSON.parse(jsonRequest);
        console.log(horario);
        verHorario();
        return horario;
    }

    function verHorario() {
        var data_atual = new Date();
        var dia_atual = data_atual.getDay();
        var horarios_dia;
        var cardHorario1 = document.getElementById("card-horario-1");
        var cardHorario2 = document.getElementById("card-horario-2");
        var cardHorario3 = document.getElementById("card-horario-3");
        switch (dia_atual) {
            case 0:
                horarios_dia = horario["Segunda"];
                cardHorario1.innerHTML = "9:00  " + horarios_dia[0].disciplina;
                cardHorario2.innerHTML = "10:00 " + horarios_dia[1].disciplina;
                cardHorario3.innerHTML = "11:30 " + horarios_dia[3].disciplina;
                break;
            case 1:
                horarios_dia = horario["Segunda"];
                cardHorario1.innerHTML = "9:00  " + horarios_dia[0].disciplina;
                cardHorario2.innerHTML = "10:00 " + horarios_dia[1].disciplina;
                cardHorario3.innerHTML = "11:30 " + horarios_dia[3].disciplina;
                break;
            case 2:
                horarios_dia = horario["Terça"];
                cardHorario1.innerHTML = "9:00   " + horarios_dia[0].disciplina;
                cardHorario2.innerHTML = "10:00 " + horarios_dia[1].disciplina;
                cardHorario3.innerHTML = "11:30 " + horarios_dia[3].disciplina;
                break;
            case 3:
                horarios_dia = horario["Quarta"];
                cardHorario1.innerHTML = "9:00   " + horarios_dia[0].disciplina;
                cardHorario2.innerHTML = "10:00 " + horarios_dia[1].disciplina;
                cardHorario3.innerHTML = "11:30 " + horarios_dia[3].disciplina;
                break;
            case 4:
                horarios_dia = horario["Quinta"];
                cardHorario1.innerHTML = "9:00   " + horarios_dia[0].disciplina;
                cardHorario2.innerHTML = "10:00 " + horarios_dia[1].disciplina;
                cardHorario3.innerHTML = "11:30 " + horarios_dia[3].disciplina;
                break;
            case 5:
                horarios_dia = horario["Sexta"];
                cardHorario1.innerHTML = "9:00   " + horarios_dia[0].disciplina;
                cardHorario2.innerHTML = "10:00 " + horarios_dia[1].disciplina;
                cardHorario3.innerHTML = "11:30 " + horarios_dia[3].disciplina;
                break;
            case 6:
                horarios_dia = horario["Segunda"];
                cardHorario1.innerHTML = "9:00  " + horarios_dia[0].disciplina;
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
        var requestURL = 'js/atividades.json';
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function () {
            atividades = request.response;

            //Guardar em cache
            myJSON = JSON.stringify(atividades);
            localStorage.setItem("atividades", myJSON);

            getAtividades();
        }
    } else {
        getAtividades();
    }

    //Função para ir buscar a var atividades à cache
    function getAtividades() {
        var jsonRequest = localStorage.getItem("atividades");
        atividades = JSON.parse(jsonRequest);
        //console.log(atividades);
        fillCardNextActivity();
        console.log(atividades);
        return atividades;
    }

    function fillCardNextActivity() {
        var nextAtividadeData = document.getElementById("card-ativ-data");
        var nextAtividadeDesc = document.getElementById("card-ativ-desc");
        nextAtividadeData.innerHTML = atividades['Atual'].atividades[0].data;
        nextAtividadeDesc.innerHTML = atividades['Atual'].atividades[0].titulo;
    }


})