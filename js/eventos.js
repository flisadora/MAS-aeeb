$(document).ready(function () {

  //Ir buscar eventos.json
  var eventos = null;
  var today = new Date();
  var dia_atual = today.getDate();
  var mes_atual = today.getMonth() + 1;
  var ano_atual = today.getFullYear();
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
    //console.log(eventos);
    verDataEventos();
    return eventos;
  }

  function verDataEventos() {

    var atuais = eventos['Atual'].eventos;
    //console.log(dia_atual, mes_atual, ano_atual);
    for (var i = 0; i < atuais.length; i++) {
      var vnt = atuais[i];
      var dia = parseInt(vnt.data.substring(0, 2));
      var mes = parseInt(vnt.data.substring(3, 5));
      var ano = parseInt(vnt.data.substring(6, 10));

      if ((ano < ano_atual) || (ano == ano_atual && mes < mes_atual) || ano == ano_atual && mes == mes_atual && dia < dia_atual) {
        eventos.Passado.eventos.push(vnt);
        eventos.Atual.eventos.splice(i, 1);
        //console.log(eventos);
        //Guardar em cache
        myJSON = JSON.stringify(eventos);
        localStorage.setItem("eventos", myJSON);
      }
    }
  }

  verDataEventos();


  $("#btn-modal").click(function () {
    $("#modelId").modal();
  });
  //seleção de data do Modal
  $('#modelId').on('show.bs.modal', function () {

    var monthtext = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    //var today = new Date();
    var dayfield = document.getElementById("daydropdown");
    var monthfield = document.getElementById("monthdropdown");
    var yearfield = document.getElementById("yeardropdown");
    var hInicio = document.getElementById("hora-inicio-dropdown");
    var mInicio = document.getElementById("min-inicio-dropdown");
    var hFim = document.getElementById("hora-fim-dropdown");
    var mFim = document.getElementById("min-fim-dropdown");

    for (var i = 0; i < 31; i++) {
      dayfield.options[i] = new Option(i + 1, i);
    }
    dayfield.options[today.getDate()] = new Option(today.getDate(), today.getDate(), true, true); //select today's day
    for (var m = 0; m < 12; m++) {
      monthfield.options[m] = new Option(monthtext[m], monthtext[m]);
    }
    monthfield.options[today.getMonth()] = new Option(monthtext[today.getMonth()], monthtext[today.getMonth()], true, true); //select today's month
    var thisyear = today.getFullYear();
    for (var y = 0; y < 1; y++) {
      yearfield.options[y] = new Option(thisyear, thisyear);
      thisyear += 1;
    }
    yearfield.options[0] = new Option(today.getFullYear(), today.getFullYear(), true, true); //select today's year

    for (var k = 0; k < 24; k++) {
      hInicio.options[k] = new Option(k, k);
      hFim.options[k] = new Option(k, k);
    }
    hInicio.options[today.getHours()] = new Option(today.getHours(), today.getHours(), true, true); //select hour
    hFim.options[today.getHours()] = new Option(today.getHours() + 3, today.getHours() + 3, true, true); //select hour

    for (var t = 0; t < 60; t++) {
      mInicio.options[t] = new Option(t, t);
      mFim.options[t] = new Option(t, t);
    }

  })

  $("#btn-guarda-evento").click(function () {

    if (($("#titulo-novo-evento").val().length < 10 || $("#desc-novo-evento").val().length < 20)) {
      $("#aviso-novo-evento").removeClass("invisible").addClass("visible");
    } else {
      $("#aviso-novo-evento").removeClass("visible").addClass("invisible");

      var titulo = $("#titulo-novo-evento").val();
      var desc = $("#desc-novo-evento").val();
      var data = "";
      if($("#daydropdown").val()<10){
        data+="0";
      }
      data += $("#daydropdown").val() + "/";
      switch ($("#monthdropdown").val()) {
        case "Jan":
          data += "01/"
          break;
        case "Fev":
          data += "02/"
          break;
        case "Mar":
          data += "03/"
          break;
        case "Abr":
          data += "04/"
          break;
        case "Mai":
          data += "05/"
          break;
        case "Jun":
          data += "06/"
          break;
        case "Jul":
          data += "07/"
          break;
        case "Ago":
          data += "08/"
          break;
        case "Set":
          data += "09/"
          break;
        case "Out":
          data += "10/"
          break;
        case "Nov":
          data += "11/"
          break;
        case "Dez":
          data += "12/"
          break;
      }
      data += $("#yeardropdown").val();

      var tInicio = $("#hora-inicio-dropdown").val() + ":";
      if ($("#min-inicio-dropdown").val() < 10) {
        tInicio += "0";
      }
      tInicio += $("#min-inicio-dropdown").val();

      var tFim = $("#hora-fim-dropdown").val() + ":";
      if ($("#min-fim-dropdown").val() < 10) {
        tFim += "0";
      }
      tFim += $("#min-fim-dropdown").val();

      var novo_evento = new Object();

      novo_evento["data"] = data;
      novo_evento["hora_inicio"] = tInicio;
      novo_evento["hora_fim"] = tFim;
      novo_evento["titulo"] = titulo;
      novo_evento["descricao"] = desc;

      eventos['Atual'].eventos.push(novo_evento);
      //Guardar em cache
      myJSON = JSON.stringify(eventos);
      localStorage.setItem("eventos", myJSON);
      verDataEventos();

      $("#titulo-novo-evento").val("");
      $("#desc-novo-evento").val("");
      $("#modelId").modal('hide');
      location.reload();
    }

  });

  /*Dropdown Menu*/
  $('.dropdown').click(function () {
    $(this).attr('tabindex', 1).focus();
    $(this).toggleClass('active');
    $(this).find('.dropdown-menu').slideToggle(300);
  });
  $('.dropdown').focusout(function () {
    $(this).removeClass('active');
    $(this).find('.dropdown-menu').slideUp(300);
  });
  $('.dropdown .dropdown-menu li').click(function () {
    $(this).parents('.dropdown').find('span').text($(this).text());
    $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
  });
  /*End Dropdown Menu*/


  //INICIO KNOCKOUT
  function AppViewModelEventos() {
    var self = this;
    var eventos = getEventos();

    //Bindings
    self.eventos_display = ko.observableArray();
    var a = eventos['Atual'].eventos;
    self.eventos_display(a);

    $('#ativo').click(function () {
      a = eventos['Atual'].eventos;
      self.eventos_display(a);
      $(".card-header h6").removeClass("text-secondary").addClass("text-primary");
    });
    $('#inativo').click(function () {
      a = eventos['Passado'].eventos;
      self.eventos_display(a);
      $(".card-header h6").removeClass("text-primary").addClass("text-secondary");
    });
  }


  ko.applyBindings(new AppViewModelEventos(), document.getElementById("pageContent"));

})