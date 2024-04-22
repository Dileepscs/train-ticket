
$(document).ready(function() {
    var maxRows = 6;
        // var x=function(){
        
        
    // }();
    $.ajax({
        url: "http://localhost:8080/train_ticket/stations",
        method: "GET", // or "POST", "PUT", etc. depending on the HTTP method you want to use
        data: {}, // Optional data to send to the server
        dataType: "json", // The type of data you're expecting back from the server
        success: function(response) {
            var fromstations = $("#from");
            var tostations = $("#to");
            for(i in response){
                let option1 = $("<option></option>").text(i+" - "+response[i]);
                option1.attr("value",i);
                let option2 = $("<option></option>").text(i+" - "+response[i]);
                option2.attr("value",i);

                fromstations.append(option1);
                tostations.append(option2);
                console.log(response); 
            }
        },
        error: function(xhr, status, error) {
            // Handle errors here
            console.error(status, error);
        }
    });
    $('#bookTicketBtn').click(function() {
        $("#addPassengerDiv").show();
        
        var container = $('<div>').addClass('container text-center');

        // Create form
        var form = $('<form>').attr({
            'action': '',
            'method': 'post',
            'id': 'passengerForm'
        });

        // Create table
        var table = $('<table>').addClass('table table-bordered').attr('id', 'passengerTable');
            
        // Create table head
        var thead = $('<thead>');
        var tr = $('<tr>');
        tr.append('<th>S No.</th>');
        tr.append('<th>PASSENGER NAME</th>');
        tr.append('<th>GENDER</th>');
        tr.append('<th>AGE</th>');
        tr.append('<th>PREFERENCE</th>');
        tr.append('<th>Action</th>'); // Added for delete button column

        // Append table head to table
        thead.append(tr);
        table.append(thead);
        var tablebody=$("<tbody>");
            
        // tablebody.attr('id','')
        table.append(tablebody);
        // Append table to form
        form.append(table);

        // Append form to container
        container.append(form);

        // Append container to body
        $("#passengerDetails").html(container);
        
        // adding first passenger
        var newRow = $('<tr>');
        newRow.append('<td>' + 1 + '</td>');
        newRow.append('<td><input type="text" class="form-control" name="passengerName[]"></td>');
        newRow.append('<td><input type="radio" name="gender['+1+']" value="Male"> Male <input type="radio" name="gender['+1+']" value="Female"> Female </td>');
        newRow.append('<td><input type="number" class="form-control" name="age[]"></td>');
        newRow.append('<td><select class="form-select" name="preference[]"><option value="LOWER">LOWER</option><option value="MIDDLE">MIDDLE</option><option value="UPPER">UPPER</option><option value="SIDE UPPER">SIDE UPPER</option><option value="SIDE LOWER">SIDE LOWER</option></select></td>');
        newRow.append('<td><button type="button" class="btn btn-outline-danger deleteRow" disabled>Delete</button></td>');
        $('#passengerTable tbody').append(newRow);

        var confirmButton = $('<button>').addClass('btn btn-primary mt-3').attr('id', 'confirmTicket').text('Confirm Ticket');
        container.append(confirmButton);
        // var button = $('<button>');
        // button.attr({
        //     'class':'btn bg-primary',
        //     'id' : 'confirmTicket',

        // })
    });

    $('#addPassenger').click(function() {
        var rowCount = $('#passengerTable tbody tr').length;
        if (rowCount < maxRows) {
            var newRow = $('<tr>');
            newRow.append('<td>' + (rowCount + 1) + '</td>');
            newRow.append('<td><input type="text" class="form-control" name="passengerName[]"></td>');
            newRow.append('<td><input type="radio" name="gender['+rowCount+']" value="Male"> Male <input type="radio" name="gender['+rowCount+']" value="Female"> Female </td>');
            newRow.append('<td><input type="number" class="form-control" name="age[]"></td>');
            newRow.append('<td><select class="form-select" name="preference[]"><option value="LOWER">LOWER</option><option value="MIDDLE">MIDDLE</option><option value="UPPER">UPPER</option><option value="SIDE UPPER">SIDE UPPER</option><option value="SIDE LOWER">SIDE LOWER</option></select></td>');
            newRow.append('<td><button type="button" class="btn btn-outline-danger deleteRow">Delete</button></td>');
            $('#passengerTable tbody').append(newRow);
        } else {
            alert('Maximum number of passengers reached.');
        }
    });

    $(document).on('click', '.deleteRow', function() {
        $(this).closest('tr').remove();
        updateSerialNumbers();
    });

    function updateSerialNumbers() {
        $('#passengerTable tbody tr').each(function(index) {
            $(this).find('td:first').text(index + 1);
        });
    }


    
});
