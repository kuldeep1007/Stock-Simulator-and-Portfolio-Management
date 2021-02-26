window.onload = Disp;

var dash = document.getElementById("portfolio");
dash.className = "nav-link active";


async function stockd(stock) {
    const response = await fetch(`http://127.0.0.1:5001/stock/${stock}`);
    const json = await response.json();

    return json;
}

async function detail(a) {
    const response = await fetch(`http://localhost:3000/portfolio/${a}`);
    const json = await response.json();

    return json;
}

async function Disp() {
    var a = window.location.href;
    a = a.split('/');
    a = a[3];
    const data1 = await detail(a);
    for (var i = 0; i < data1.length; i++) {
        if (data1[i].quantity != 0) {
            stock = data1[i].stockID;
            const data = await stockd(stock);
            var table = document.getElementById("show");
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);
            //Column 1
            var cell1 = row.insertCell(0);
            cell1.innerHTML = data.symbol;
            //Column 2    
            var cell2 = row.insertCell(1);
            cell2.innerHTML = data.companyName;
            //Column 3    
            var cell3 = row.insertCell(2);
            cell3.innerHTML = data1[i].quantity;
            //Column 4    
            var cell4 = row.insertCell(3);
            cell4.innerHTML = data1[i].rate;
            //Column 5
            var cell5 = row.insertCell(4);
            cell5.innerHTML = data.lastPrice;
            //Column 6
            var cell6 = row.insertCell(5);
            cell6.innerHTML = (data1[i].rate * data1[i].quantity).toFixed(2);
            //Column 7
            var cell7 = row.insertCell(6);
            cell7.innerHTML = ((data.lastPrice - data1[i].rate) * data1[i].quantity).toFixed(2);
        }
    }
}