window.onload = Disp;

var dash = document.getElementById("sell");
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
            cell7.innerHTML = (data.lastPrice * data1[i].quantity).toFixed(2);
            //Column 8
            var cell8 = row.insertCell(7);
            cell8.innerHTML = ((data.lastPrice - data1[i].rate) * data1[i].quantity).toFixed(2);

            var cell9 = row.insertCell(8);
            var element1 = document.createElement("input");
            element1.type = "button";
            var btnName = (rowCount);
            element1.name = btnName;
            element1.setAttribute('value', 'Sell'); // or element1.value = "button";  
            element1.setAttribute('id', 'myBtn');
            console.log(element1);
            element1.onclick = function () { sell1(this.name); };
            cell9.appendChild(element1);
        }
    }
}


function sell1(btnName) {
    console.log(btnName)
    var table = document.getElementById('show');
    var x = parseInt(btnName)
    var row1 = table.rows[x];

    var table = document.getElementById("show1");
    var rowCount = table.rows.length;
    var row = table.insertRow(1);
    //Column 1
    var cell1 = row.insertCell(0);
    cell1.innerHTML = row1.cells[0].innerHTML;
    //Column 2    
    var cell2 = row.insertCell(1);
    cell2.innerHTML = row1.cells[1].innerHTML;
    //Column 3    
    var cell3 = row.insertCell(2);
    cell3.innerHTML = row1.cells[2].innerHTML;
    //Column 4    
    var cell4 = row.insertCell(3);
    cell4.innerHTML = row1.cells[3].innerHTML;
    //Column 5
    var cell5 = row.insertCell(4);
    cell5.innerHTML = row1.cells[4].innerHTML;
    //Column 7
    var cell6 = row.insertCell(5);
    cell6.innerHTML = row1.cells[6].innerHTML;
    //Column 8
    var cell7 = row.insertCell(6);
    cell7.innerHTML = row1.cells[7].innerHTML;


    var modal = document.getElementById("myModal");   //get the modal
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        location.reload()
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            location.reload();
        }
    }
}

function sell() {
    var table = document.getElementById("show1");
    var row = table.rows[1];
    var stock = row.cells[0].innerText
    var maxq = parseInt(row.cells[2].innerText)
    var rate = parseFloat(row.cells[4].innerText)
    var quant = parseInt(document.getElementById("quant").value)
    if (quant <= maxq) {
        quant = quant * (-1)
        var a = window.location.href;
        a = a.split('/');
        a = a[3];
        var url = `http://localhost:3000/buy/${a}`;
        data = { 'stockID': stock, 'quantity': quant, 'rate': rate };
        params = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch(url, params).then((response) => {
            return response.text();
        }).then((data) => {
            if (data) {
                console.log(data);
            }
            else {
                window.alert("Problem");
            }
        })
        document.getElementById("mssg").innerHTML = "Stock sold successfully !!!"
    }
    else {
        document.getElementById("mssg").innerHTML = ` <h3 style="color: red;" id="mssg">Insufficient stock quantity  !!!</h3> `

    }
    setTimeout(function () { location.reload(); }, 4000);

}






