// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';


$(document).ready(function () {

  //localStorage.removeItem("turma");


  //Ir buscar turma.json
  var turma = null;
  //Caso o ficheiro json n esteja em cache, ir buscá-lo e metê-lo em cache
  if (localStorage.getItem("js/turma") == null) {
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

      getTurma();
    }
  } else {
    getTurma();
  }

  //Função para ir buscar a var turma à cache
  function getTurma() {
    var jsonRequest = localStorage.getItem("turma");
    turma = JSON.parse(jsonRequest);
    //console.log(turma);
    gerarGrafico();

  }


  // Pie Chart Example
  function gerarGrafico() {
    var alunos = turma['alunos'];
    //onsole.log(alunos);
    //Calcula Quantidade de Faltas
    var presenca = 0;
    var comportamento = 0;
    var material = 0;

    for (var i = 0; i < alunos.length; i++) {
      var faltas = alunos[i].faltas;
      for (var j = 0; j < faltas.length; j++) {
        var motivo = faltas[j].motivo;
        switch (motivo) {
          case "Falta de presença":
            presenca += 1;
            break;
          case "Falta de comportamento":
            comportamento += 1;
            break;
          case "Falta de material":
            material += 1;
            break;
        }
      }
    }

    //Gera Chart
    var ctx = document.getElementById("myPieChart");
    var myPieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["Presença", "Comportamento", "Material"],
        datasets: [{
          data: [presenca, comportamento, material],
          backgroundColor: ['#FEAB2B', '#1cc88a', '#36b9cc'],
          hoverBackgroundColor: ['#FD9A01', '#17a673', '#2c9faf'],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },
        legend: {
          display: false
        },
        cutoutPercentage: 80,
      },
    });

  }

})