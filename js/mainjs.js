 //////////////////json-ajax////////////////
 $(document).ready(function() {
     var oImage;
     var x = $.ajax({
         url: "js/json/mainjson.json",
         type: 'GET',
         dataType: 'JSON',
     });
     x.success(function(data) {
         oImage = data;
         for (var i = 1; i < oImage.Images.length; i++) {
             var model = oImage.Images[i - 1].url;
             $('#img' + i).attr('src', model);
         }
         for (var i = 0; i < oImage.items.length; i++) {
             $('.items .panel-heading').eq(i).html(oImage.items[i].head);
             $('.items').eq(i).find('img').attr('src', oImage.items[i].icon);
             $('.items').eq(i).find('h4').html(oImage.items[i].des);
         }
         $('nav img').attr('src', oImage.logo);
         $('body').css('background-image', 'url(' + oImage.bdyimg + ')');
         $('#myModal .modal-content').css('background-image', 'url(' + oImage.modalimg + ')');
         $('#myModalDetails .modal-content').css('background-image', 'url(' + oImage.modalimg + ')');
         $('.dashContent .panel').css('background-image', 'url(' + oImage.panelimg + ')');
     });
     //////////////////json-ajax////////////////
     $('.dropdown-toggle').dropdown();
     //------- To Change S.no icon------//
     var f_sl = 1;
     $('#snBtn').click(function() {
         $('#snBtn span').toggleClass('glyphicon-triangle-bottom glyphicon-triangle-top');
         f_sl *= -1;
         var n = $(this).prevAll().length;
         sortTable(f_sl, n);

     });
     //------- To Hide Update Button------//

     $('#createEmp').click(function(e) {
         $('#update').hide();
         $('#save').show();

     });
     //------- To Save Employee Details------//
     $('#save').click(function(e) {
         var employeeDetails = {
             "SNo": $('#SnoID').val(),
             "Name": $('#nameID').val(),
             "Address": $('#addID').val(),
             "ID": $('#idID').val()
         };
         $('#table1 tbody').append('<tr><td>' + employeeDetails.SNo + '</td><td>' + employeeDetails.Name + '</td><td>' + employeeDetails.Address + '</td><td>' + employeeDetails.ID + '</td><td><button type="button" id="edit" class="btn btn-link">EDIT</button></td><td><button type="button" id="delete" class="btn btn-link">DELETE</button></td><td><button type="button" id="view" class="btn btn-link">VIEW</button></td><td><img src=' + oImage.info + 'id="info" alt="image"></td></tr>');
     });

     //------- To Delete Row------//
     $(document).on("click", "#delete", function() {
         $(this).closest('td').parent()[0].remove();
     });
     //------- To Edit Row------//
     var cell1, cell2, cell3, cell4;
     $(document).on("click", "#edit", function() {
         $('#update').show();
         $('#save').hide();
         $('#myModal').modal('show');
         var tr = $(this).closest('td').parent();
         cell1 = tr.find('td').eq(0);
         cell2 = tr.find('td').eq(1);
         cell3 = tr.find('td').eq(2);
         cell4 = tr.find('td').eq(3);
         $('#SnoID').val(cell1.text());
         $('#nameID').val(cell2.text());
         $('#addID').val(cell3.text());
         $('#idID').val(cell4.text());
     });
     //------- To Update Row------//
     $('#update').click(function() {
         cell1.text($('#SnoID').val());
         cell2.text($('#nameID').val());
         cell3.text($('#addID').val());
         cell4.text($('#idID').val());
     });
     //------- To View a Row------//
     $(document).on("click", "#view", function() {
         var tr = $(this).closest('td').parent();
         $('#contentID').html('SNo:' + tr.find('td').eq(0).text() + '<br> Name:' + tr.find('td').eq(1).text() + '<br> Address:' + tr.find('td').eq(2).text() + '<br> ID:' + tr.find('td').eq(3).text());
         $('#comentsID').empty();
         $('#myModalDetails').modal('show');
     });
     //------- To Display info in ToolTip------//

     $(document).on("mouseover", "#info", function() {
         var tr1 = $(this).closest('td').parent();
         var Sno = tr1.find('td').eq(0).text();
         var Name = tr1.find('td').eq(1).text();
         var Address = tr1.find('td').eq(2).text();
         var ID = tr1.find('td').eq(3).text();
         $(this).tooltip({
             title: 'S.no:' + Sno + 'Name:' + Name + 'id:' + ID + 'Address:' + Address,
             placement: "right"
         });
     });
     //------- Click Event Of ViewDetails Button in Dashboard------//
     for (var i = 0; i < $('.dashContent').length; i++) {
         fnViewDetails(i);
     }
 });

 function fnViewDetails(k) {
     $('.dashContent').eq(k).find('button').click(function() {
         $('#contentID').html($('.dashContent').eq(k).find('p').text());
         $('#comentsID').html('<h4>Comments:</h4>' + $('.dashContent').eq(k).find('input').val());
         $('#myModalDetails').modal('show');
     });
 }
 //------- To Sort the rows------//

 function sortTable(f, n) {
     var rows = $('#table1 tbody  tr').get();
     rows.sort(function(a, b) {
         var A = Number($(a).children('td').eq(n).text());
         var B = Number($(b).children('td').eq(n).text());
         if (A < B) {
             return -1 * f;
         }
         if (A > B) {
             return 1 * f;
         }
         return 0;
     });
     $.each(rows, function(index, row) {
         $('#table1').children('tbody').append(row);
     });
 }
