$(document).ready(function(){
$('a.show').on('click', function(){
var apiKey = '31b7ed68bc12616247a0f3e272fbb089';
    var url = 'https://api.forecast.io/forecast/';
    var lati = 29.652;
    var longi = -82.3250;
    var data;
    
    $.getJSON(url + apiKey + "/" + lati + "," + longi + "?callback=?", function(data) {

        $('#weather').html('Current temperature:  ' + data.currently.temperature +'!!' + data.minutely.summary + data.daily.summary);       
        
              })
});
console.log("Inside document.ready()");
	var li='',atext='';
	$('a.show').on('click', function(){
          console.log("List Item Clicked.");
          li = $(this).closest('li').attr("id");
          console.log('ID of clicked list item:',li);
           var content = $(this).text();
	atext = $(this).text()+"|"+li;
	console.log(atext);
	$('#user-detail').text(content);	
          
      });
      
     $('button.edit').on('click', function(){
          console.log("EDIT Item Clicked.");
	var arr = atext.split("|");
	console.log(arr[0]+","+arr[1]);

        var el = arr[1];
        console.log('ID of edited list item:',el);
        var name = arr[0].split(' ');
          $('#editfname').val(name[0]);
          $('#editlname').val(name[1]);
          $('#editaddress').val(name[2]);
	});


	$('#addform').on('click',function(e){
	e.preventDefault();
        console.log("Inside save button on-click");
        var d=new Date();
        var uid=d.valueOf();
	var payload = {
		fname: $('#fname').val(),
		lname:	$('#lname').val(),
		address: $('#address').val(),
		uid:uid,          
};
	console.log('Payload:',payload);
          
	$.ajax({
            url: '/users',
            type: 'POST',
            contentType: "application/json",
            processData: false,
            data: JSON.stringify(payload),	   
            success:function(){
	    console.log("done");
}
  
          })
          .done(function(data) {
	  console.log("i am in done");
          var li= '<li id="'+uid+'"><a class="show"><i class="fa fa-user fa-fw"></i>'+payload.fname+'&nbsp;'+payload.lname+'<div style="display:none">'+payload.address+'</div></a></li>';
          $('#side-menu').append(li);

          })
          .fail(function() {
            console.log("Error occured in Ajax call");
          });
        
        }); //end of on-click.*/

//Deleting an item.
      $('button.delete').on('click', function(){
        console.log("Delete Button of a list item clicked");
	if(li == 'undefined') {
		console.log('inside emptiness');	
		$('#user-detail').text('Please choose a contact');	
	}
	var arr = atext.split("|");
	console.log(arr[0]+","+arr[1]);

        var el = arr[1];
        console.log('ID of clicked list item:',el);

        var info = {
          id: el
        };
        
        $.ajax({
          url:'/users',
          type: 'DELETE',
          contentType: "application/json",
          processData: false,
          data:JSON.stringify(info),
          success: function(){
            console.log("Record deleted successfully.");
          },
	  error: function(err){
		console.log('error:',err);
	  }   
        })
        .done(function(data) {
          console.log("DELETE done.");
	  $('#user-detail').text("");
          $('#weather').text("");	
          var litem = $('#side-menu li[id='+el+']');
          console.log("List Item:",litem);
          $('#side-menu li[id='+el+']').remove();
        })
        .fail(function() {
          console.log("Error occured in DELETE Ajax call.");
        }); //End of Delete Ajax Call.

      });//End of Delete on-click method.

$('#update-user').on('click', function(e){
        e.preventDefault();
        console.log("Update User clicked.");
        var update = {
          updFname: $('#editfname').val(),
          updLname: $('#editlname').val(),
          updAddress: $('#editaddress').val(),
          Id: li,
        };

         $.ajax({
          url: '/users',
          type: 'PUT',
          contentType: "application/json",
          processData: false,
          data: JSON.stringify(update),
          success: function(){
            console.log("Record updated successfully.");
          }   
        })
        .done(function(data) {
          console.log("PUT done.");
          var litem = $('#side-menu li[id='+li+'] a');
          console.log("List Item(Old Text):",litem.text());
          var newData =update.updFname+' '+update.updLname+' '+update.updAddress;
          console.log("New Data:",newData);
	$('#user-detail').text(newData);	
	  var newText ='<i class="fa fa-user fa-fw"></i>'+update.updFname+' '+update.updLname+' <div style="display:none">'+update.updAddress+'</div>';	
          litem.html(newText);
        })
        .fail(function() {
          console.log("Error occured in PUT Ajax call.");
        }); //End of PUT Ajax Call.
});
      });//end of document.ready()
