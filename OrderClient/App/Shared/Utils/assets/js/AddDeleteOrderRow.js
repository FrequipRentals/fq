
        function addRow(tableID) {
 
            var table = document.getElementById(tableID);
 
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);
 
            var colCount = table.rows[2].cells.length;
 
            for(var i=0; i<colCount; i++) {
 
                var newcell = row.insertCell(i);
 
                newcell.innerHTML = table.rows[2].cells[i].innerHTML;
                //alert(newcell.childNodes);
                switch(newcell.childNodes[0].type) {
                    case "text":
                        newcell.childNodes[0].value = "";
                        break;
                    case "checkbox":
                        newcell.childNodes[0].checked = false;
                        break;
                    case "select-one":
                        newcell.childNodes[0].selectedIndex = 0;
                        break;
                }
            }
        }
 
        function deleteRow(btn, tableId) {

            var row = btn.parentNode.parentNode;
            var table = document.getElementById(tableId);
            var rowCount = table.rows.length;
            if (rowCount <= 3) {
                alert("Cannot delete all the rows.");
            }
            else {
                row.parentNode.removeChild(row);
            }

    //try {
    //    var table = document.getElementById(tableID);
    //    var rowCount = table.rows.length;
 
    //    for(var i=0; i<rowCount; i++) {
    //        var row = table.rows[i];
    //        var chkbox = row.cells[0].childNodes[0];
    //        if(null != chkbox && true == chkbox.checked) {
    //            if(rowCount <= 1) {
    //                alert("Cannot delete all the rows.");
    //                break;
    //            }
    //            table.deleteRow(i);
    //            rowCount--;
    //            i--;
    //        }
 
 
    //    }
    //}catch(e) {
    //    alert(e);
    //}
}
