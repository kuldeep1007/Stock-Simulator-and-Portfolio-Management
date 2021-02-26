var dash=document.getElementById("watch");
dash.className="nav-link active";


function AddRow() {

    var stock = document.getElementById("stock").value;
    var a = window.location.href;
    a = a.split('/');
    a = a[3];
    var url = `http://localhost:3000/${a}`;

    data = { 's': stock };
    params = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    //console.log(params)

    fetch(url, params).then((response) => {
        return response.text();
    }).then((data) => {
        if (data != "false") {
            location.reload();
        }
        else {
            //document.getElementById("test").innerHTML = "Invalid Credentials";
        }
    })
}

window.onload = Disp;

function Disp() {
    var a = window.location.href;
    a = a.split('/');
    a = a[3];
    var url = `http://localhost:3000/${a}`;
    var data1;
    var stock;
    fetch(url).then((response) => {
        return response.text();
    }).then((data1) => {
        data1 = JSON.parse(data1);
        for (var i = 0; i < data1.length; i++) {
            stock = data1[i].stockID;
            console.log(stock);
            var url1 = `http://127.0.0.1:5001/stock/${stock}`;
            fetch(url1).then((response) => {
                return response.text();
            }).then((data) => {
                data = JSON.parse(data);
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
                cell3.innerHTML = data.lastPrice;
                //Column 4    
                var cell4 = row.insertCell(3);
                cell4.innerHTML = data.previousClose;
                //Column 5
                var cell5 = row.insertCell(4);
                cell5.innerHTML = data.dayHigh;
                //Column 6
                var cell6 = row.insertCell(5);
                cell6.innerHTML = data.dayLow;
                //Column 7
                var cell7 = row.insertCell(6);
                
                var element1 = document.createElement("input");
                element1.type = "button";
                var btnName = (rowCount);
                element1.name = btnName;
                element1.setAttribute('value', 'Delete'); // or element1.value = "button";  
                element1.onclick = function () { removeRow(btnName); }
                cell7.appendChild(element1);
            })
        }
    })
}

function removeRow(btnName) {  
    console.log(btnName)
    try {  
        var table = document.getElementById('show');  
        var x=parseInt(btnName)
        var row = table.rows[x];  
        var rowObj = row.cells[0];
        var stock = rowObj.innerHTML;
        stock=stock.toLowerCase();
        console.log(stock);
        var a = window.location.href;
        a = a.split('/');
        a = a[3];
        var url = `http://localhost:3000/delete/${a}`;
    
        data = { 's': stock };
        params = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    
        //console.log(params)
    
        fetch(url, params).then((response) => {
            return response.text();
        }).then((data) => {
            if (data != "false") {
                location.reload();
            }
            else {
                //document.getElementById("test").innerHTML = "Invalid Credentials";
            }
        })

    }  
    catch (e) {  
        alert(e);  
    }  
} 


