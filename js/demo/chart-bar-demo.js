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


  // Bar Chart Example
  function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
      };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  }


  // Function Gerar Grafico
  function gerarGrafico() {

    var alunos = turma['alunos'];
    //console.log(alunos);
    //Calcula Media de Notas de Faltas
    var por = 0;
    var mat = 0;
    var emei = 0;

    for (var i = 0; i < alunos.length; i++) {
      var disciplinas = alunos[i].disciplinas;
      for (var j = 0; j < disciplinas.length; j++) {
        var nome_disc = disciplinas[j].nome;
        switch (nome_disc) {
          case "Português":
            por += disciplinas[j].avaliacao;
            break;
          case "Matemática":
            mat += disciplinas[j].avaliacao;
            break;
          case "Estudo do Meio":
            emei += disciplinas[j].avaliacao;
            break;
        }
      }
    }

    por = por/alunos.length;
    mat = mat/alunos.length;
    emei = emei/alunos.length;

  // Bar Chart
    var ctx = document.getElementById("myBarChart");
    var myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Português", "Matemática", "Estudo do Meio"],
        datasets: [{
          label: "Média",
          backgroundColor: ["#f7dc6f", "#FA8072", "#eb559a"],
          hoverBackgroundColor: ["#f1c40f ", "#ec7063", "#d91a72"],
          borderColor: "#4e73df",
          data: [por, mat, emei],
        }],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            time: {
              unit: 'subject'
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: 6
            },
            maxBarThickness: 25,
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 5,
              maxTicksLimit: 20,
              padding: 10,
              // Include a dollar sign in the ticks
              //callback: function (value, index, values) {
                //return '$' + number_format(value);
              //}
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
          callbacks: {
            label: function (tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ': ' + number_format(tooltipItem.yLabel, 2);
            }
          }
        },
      }
    });
  }

})