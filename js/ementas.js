$(document).ready(function () {

  var today = new Date();
  var dia_atual = today.getDate();
  var mes_atual = today.getMonth() + 1;
  var ano_atual = today.getFullYear();


  if (dia_atual < 10) dia_atual = "0" + dia_atual;
  if (mes_atual < 10) mes_atual = "0" + mes_atual;

  //Ir buscar ementas.json
  var ementas = null;

  //Caso o ficheiro json n esteja em cache, ir buscá-lo e metê-lo em cache
  if (localStorage.getItem("ementas") == null) {
    //Pedido ao servidor
    var requestURL = 'js/ementas.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
      ementas = request.response;

      //Guardar em cache
      myJSON = JSON.stringify(ementas);
      localStorage.setItem("ementas", myJSON);

      getEmentas();
    }
  } else {
    getEmentas();
  }

  //Função para ir buscar a var horario à cache
  function getEmentas() {
    var jsonRequest = localStorage.getItem("ementas");
    ementas = JSON.parse(jsonRequest);
    //console.log(horario);
    //verHorario();
    return ementas;
  }


  //INICIO KNOCKOUT
  function AppViewModelEmentas() {
    var self = this;
    var ementas = getEmentas();
    var semana = "Semana ";

    self.semana = ko.observable();
    //dias entre segunda e sexta
    if (today.getDay() >= 1 && today.getDay() <= 5) {
      var d = today.getDay() - 1;
      d = parseInt(dia_atual) - d;      
    } else{
      var d=0;
      if(today.getDay()==0) d+=1;
      d+=2;
    }
    if (d < 10) d = "0" + d;
    semana += d +"/" + mes_atual + "/" + ano_atual;
    self.semana(semana);


    //Bindings
    self.ementas_display = ko.observableArray();
    self.almoco = ko.observableArray();
    self.alergias = ko.observable();

    var a = ementas['Ementas'];
    self.ementas_display(a);
    //console.log(a);

    var b = [];
    for (var i = 0; i < a.length; i++) {
      b.push(a[i].almoco);
    }
    self.almoco(b);
    //console.log(b);

    var c = ementas['Alergias'];
    self.alergias(c);

    /*
        //Bindings
        self.ementas = ko.observableArray();
        var a = ementas['Atual'].ementas;
        self.ementas(a);
    
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
    */
  }


  ko.applyBindings(new AppViewModelEmentas(), document.getElementById("pageContent"));

})



/*
                  <a href="#cardDia" data-bind="attr{href:'#'+dia, aria-controls:dia}" class="d-block card-header py-3" data-toggle="collapse" role="button"
                    aria-expanded="true" aria-controls="cardDia">
                    */