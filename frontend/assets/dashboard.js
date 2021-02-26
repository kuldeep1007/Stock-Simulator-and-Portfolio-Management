Disp()

async function stockd(stock) {
  const response = await fetch(`http://127.0.0.1:5001/stock/${stock}`);
  const json = await response.json();

  return json;
}

async function detail(a) {
  const response = await fetch(`http://localhost:3000/all/${a}`);
  const json = await response.json();

  return json;
}

async function Disp() {
  var a = window.location.href;
  a = a.split('/');
  a = a[3];
  var cport = 0
  var port = 0
  var dp = [];
  const data2 = await detail(a);
  data1 = data2.portfolio
  for (var i = 0; i < data1.length; i++) {
    stock = data1[i].stockID;
    const data = await stockd(stock);
    var quant = data1[i].quantity;
    var rate = data1[i].rate;
    var crate = data.lastPrice;
    cport += (quant) * crate;
    port += quant * rate;
    if (quant != 0) {
      dp.push({ y: quant * crate, label: stock })
    }
  }
  dp.push({ y: data2.cash, label: "cash" })
  var pr = (port + data2.cash) - 500000
  document.getElementById("uname").innerHTML = data2.username;
  document.getElementById("uemail").innerHTML = data2.email;
  document.getElementById("cash").innerHTML = '₹ ' + parseInt(data2.cash);
  document.getElementById("pval").innerHTML = '₹ ' + cport;
  document.getElementById("pr").innerHTML = '₹ ' + pr;
  document.getElementById("pur").innerHTML = '₹ ' + (cport - port);
  graph(dp)
}



function graph(list) {

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    data: [{
      type: "pie",
      startAngle: 240,
      yValueFormatString: "₹ ##0.00\"\"",
      indexLabel: "{label} {y}",
      dataPoints: list
    }]
  });
  chart.render();

}


// Get the modal
var modal = document.getElementById("myModal");

var btn = document.getElementById("btn");
btn.onclick = async function () {
  rstock=document.getElementById("trans").value.toUpperCase()
  var a = window.location.href;
  a = a.split('/');
  a = a[3];
  var cport = 0
  var port = 0
  var dp = [];
  const data2 = await detail(a);
  data1 = data2.portfolio
  for (var i = 0; i < data1.length; i++) {
    stock = data1[i].stockID;
    if(rstock==stock){
      trans=data1[i].transactions
      var table = document.getElementById("show");
      for(var j=0; j<trans.length; j++){
        var row = table.insertRow(j+1);
        //Column 1
        var cell1 = row.insertCell(0);
        cell1.innerHTML = stock;
        //Column 2    
        var cell2 = row.insertCell(1);
        cell2.innerHTML = trans[j].quantity;
        //Column 3    
        var cell3 = row.insertCell(2);
        cell3.innerHTML = trans[j].rate;
        //Column 4    
        var cell4 = row.insertCell(3);
        cell4.innerHTML = trans[j].time;
      }
    }
  }
  modal.style.display = "block";
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
  location.reload()
}


window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    location.reload()
  }
}
