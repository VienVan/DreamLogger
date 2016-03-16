$(document).ready(function() {
  console.log("This is connected");

  $('#get-started').click(function() {
    $('.signup').toggleClass('hidden');
    $('#home-btns').addClass('hidden');
  });

  $('.cancel').click(function() {
    $('.signup').toggleClass('hidden');
    $('#home-btns').removeClass('hidden');
  });

  $('#dreams').on('click', '.delete-dream', dreamCatcher.deleteDream);
  $('#dreams').on('click', '.edit-dream', dreamCatcher.editDream);


});
// END DOCUMENT READY

// $.ajax(function() {
//   url: '/dreamers/:id/dreams',
//   method: "GET",
//   success: function() {
//
//     res.render('index');
//   }
// })

// //client-side dream logic
var dreamCatcher = {};
//
dreamCatcher.createDream = function(e) {
  e.preventDefault();
  var dream = $(e.target).serialize();
  $.post("/dreamers/:id/dreams", dream)
    .done(function(res) {
      // OPTIMIZE: renders the entire dom eat time a food is created
      console.log(res);
      dreamCatcher.renderDream(res);
    })
    .fail(function(err) {
      console.log("Error:", err);
    });
};

//
// dreamCatcher.deleteDream = function(e) {
//   var id = $(e.target).parent(".dreams").attr("id");
//   var ajaxOption = {
//     url: '/dreamers/:id/dreams/' + id,
//     type: 'DELETE',
//     success: function(result) {
//       // clear it from the page upon successful delete
//       $("#" + id).remove();
//     }
//   };
//   // execute ajax
//   $.ajax(ajaxOption);
// };
//
// dreamCatcher.renderDreams = function(dreams) {
//   var $dreamList = $("#dream-list");
//   // clear out existing foods out of the list
//   $dreamList.html("");
//   // create the template
//   var dreamTemplate = Handlebars.compile($("#dream-template").html());
//   // pass the data into the template
//   var compiledHTML = dreamTemplate({dreams: dreams});
//   // append the rendered html to the page
//   $dreamList.prepend(compiledHTML);
// }();

dreamCatcher.renderDream = function(dream, tag) {
  var $dreamList = $('#dream-list');
  var dreamTemplate = Handlebars.compile($('#dream-template').html());
  var compiledHTML = dreamTemplate({dreams: [dream]});
  $dreamList.prepend(compiledHTML);
};

// EDIT DREAM
dreamCatcher.editDream = function(e) {
  e.preventDefault();
  var dreamId = $(e.relatedTarget).data('dreams-id');

  // $('#dreamModal').on('show', function (e) {
  // var $invoker = $(e.relatedTarget);
  // console.log($invoker);
  // });
  
  console.log('someone wants to edit dream id= ' + dreamId);
  $.ajax({
    method: 'PUT',
    url: ('/dreamers/:id/dreams/' + dreamId),
    data: dreamId,
    success: function() {
        console.log("success!");
    }
    });
};

// DELETE DREAM
dreamCatcher.deleteDream = function(e) {
  e.preventDefault();
  var dreamId = $(this).closest('div').data('dreams-id');
  console.log('someone wants to delete dream id= ' + dreamId);
  $.ajax({
    method: 'DELETE',
    url: ('/dreamers/:id/dreams/' + dreamId),
    data: dreamId,
    success: function() {
        $('#'+dreamId).remove();
    }
    });
};
