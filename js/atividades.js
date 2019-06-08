$(document).ready(function () {

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
    verDataAtividades();
  }

  function verDataAtividades() {
    var data_atual = new Date();
    var dia_atual = data_atual.getDate();
    var mes_atual = data_atual.getMonth() + 1;
    var ano_atual = data_atual.getFullYear();
    var atuais = atividades['Atual'].atividades;
    //console.log(dia_atual, mes_atual, ano_atual);
    for (var i = 0; i < atuais.length; i++) {
      var vnt = atuais[i];
      var dia = parseInt(vnt.data.substring(0, 2));
      var mes = parseInt(vnt.data.substring(3, 5));
      var ano = parseInt(vnt.data.substring(6, 10));
      //console.log(dia, mes, ano);
      //console.log(atividades);
      if ((ano < ano_atual) || (ano == ano_atual && mes < mes_atual) || ano == ano_atual && mes == mes_atual && dia < dia_atual) {
        atividades.Passado.atividades.push(vnt);
        atividades.Atual.atividades.splice(i,1);
        //console.log(atividades);
        //Guardar em cache
        myJSON = JSON.stringify(atividades);
        localStorage.setItem("atividades", myJSON);
      }
    }
  }


})



//((parseInt(vnt.data.substring(6,10))<=ano)&&(parseInt(vnt.data.substring(3,5))<=mes)&&(parseInt(vnt.data.substring(0,2))<dia))

//((parseInt(vnt.data.substring(6,10))<ano)||(parseInt(vnt.data.substring(6,10))==ano && parseInt(vnt.data.substring(3,5))<mes)|| (parseInt(vnt.data.substring(6,10))==ano && parseInt(vnt.data.substring(3,5))==mes && parseInt(vnt.data.substring(0,2))<dia))