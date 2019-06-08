$(document).ready(function () {

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
    //console.log(horario);
    //verHorario();
  }


})