$(document).ready(function () {

  //localStorage.removeItem("anuncios");
  var today = new Date();
  var dia_atual = today.getDate();
  var mes_atual = today.getMonth() + 1;
  var ano_atual = today.getFullYear();
  //Ir buscar anuncios.json
  var anuncios = null;
  //Caso o ficheiro json n esteja em cache, ir buscá-lo e metê-lo em cache
  if (localStorage.getItem("anuncios") == null) {
    //Pedido ao servidor
    var requestURL = 'js/anuncios.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
      anuncios = request.response;

      //Guardar em cache
      myJSON = JSON.stringify(anuncios);
      localStorage.setItem("anuncios", myJSON);
      getAnuncios();
    }
  } else{
    getAnuncios();  
  }

  //Função para ir buscar a var eventos à cache
  function getAnuncios() {
    var jsonRequest = localStorage.getItem("anuncios");
    anuncios = JSON.parse(jsonRequest);
    //console.log(anuncios);
    return anuncios;
  }

  function verDataAnuncios() {
    var anuncios = getAnuncios();
    var atuais = anuncios['Atual'].anuncios;
    //console.log(dia_atual, mes_atual, ano_atual);
    for (var i = 0; i < atuais.length; i++) {
      var vnt = atuais[i];
      var dia = parseInt(vnt.data.substring(0, 2));
      var mes = parseInt(vnt.data.substring(3, 5));
      var ano = parseInt(vnt.data.substring(6, 10));
      //console.log(dia, mes, ano);
      if ((ano < ano_atual) || (ano == ano_atual && mes < mes_atual) || ano == ano_atual && mes == mes_atual && dia < dia_atual) {
        anuncios.Passado.anuncios.push(vnt);
        anuncios.Atual.anuncios.splice(i, 1);
        //console.log(eventos);
        //Guardar em cache
        myJSON = JSON.stringify(anuncios);
        localStorage.setItem("anuncios", myJSON);
      }
    }
  }

  verDataAnuncios();


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

    for (var i = 0; i < 31; i++) {
      dayfield.options[i] = new Option(i+1, i);
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
    
  })

  $("#btn-guarda-anuncio").click(function(){
    
    if(($("#titulo-novo-anun").val().length<10 || $("#desc-novo-anun").val().length<20)){
      $("#aviso-novo-anuncio").removeClass("invisible").addClass("visible");
    } else {
      $("#aviso-novo-anuncio").removeClass("visible").addClass("invisible");

      var data_atual = String(dia_atual)+"/"+String(mes_atual)+"/"+String(ano_atual);
      var titulo = $("#titulo-novo-anun").val();
      var desc = $("#desc-novo-anun").val();

      var data = "";
      if($("#daydropdown").val()<10){
        data+="0";
      }
      data += $("#daydropdown").val() + "/";
      switch ($("#monthdropdown").val()) {
        case "Jan":
            data+="01/"
          break;
          case "Fev":
            data+="02/"
          break;
          case "Mar":
            data+="03/"
          break;
          case "Abr":
            data+="04/"
          break;
          case "Mai":
            data+="05/"
          break;
          case "Jun":
            data+="06/"
          break;
          case "Jul":
            data+="07/"
          break;
          case "Ago":
            data+="08/"
          break;
          case "Set":
            data+="09/"
          break;
          case "Out":
            data+="10/"
          break;
          case "Nov":
            data+="11/"
          break;
          case "Dez":
            data+="12/"
          break;
      }
      data+=$("#yeardropdown").val();

      var novo_anuncio = new Object();

      novo_anuncio["data"] = data;
      novo_anuncio["data_atual"] = data_atual;
      novo_anuncio["titulo"] = titulo;
      novo_anuncio["descricao"] = desc;

      anuncios["Atual"].anuncios.push(novo_anuncio);
      myJSON = JSON.stringify(anuncios);
      localStorage.setItem("anuncios", myJSON);
      //console.log(anuncios);
      $("#titulo-novo-anun").val("");
      $("#desc-novo-anun").val("");
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
  function AppViewModelAnuncios() {
    var self = this;
    var anuncios = getAnuncios();

    //Bindings
    self.anuncios_display = ko.observableArray();
    var a = anuncios['Atual'].anuncios;
    self.anuncios_display(a);

    $('#ativo').click(function () {
      a = anuncios['Atual'].anuncios;
      self.anuncios_display(a);
      $(".card-header h6").removeClass("text-secondary").addClass("text-primary");
    });
    $('#inativo').click(function () {
      a = anuncios['Passado'].anuncios;
      self.anuncios_display(a);
      $(".card-header h6").removeClass("text-primary").addClass("text-secondary");
    });
    //console.log(anuncios);

  }


  ko.applyBindings(new AppViewModelAnuncios(), document.getElementById("pageContent"));

})