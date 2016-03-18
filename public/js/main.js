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
  //
  $('#dreams').on('click', '.delete-dream', dreamCatcher.deleteDream);
  $('#dreams').on('click', '.edit-dream', dreamCatcher.editDream);
  $('#createDreamModal').modal('show');


});
// END DOCUMENT READY

// //client-side dream logic
var dreamCatcher = {};
//
dreamCatcher.createDream = function(e) {
  e.preventDefault();
  var that = this;
  var dream = $(e.target).serialize();
  console.log("created dream," , dream);
  $.post("/dreamers/:id/dreams", dream)
    .done(function(res) {
      console.log(res);
      // OPTIMIZE: renders the entire dom dream once dreamer is created
      // $("#dreams").append("<div class='row-dream' data-dreams-id="+ res._id+" id="+res._id+">"+res.description +"<button class='btn btn-danger delete-dream'>Delete Dream</button><button type='button' class='btn btn-primary' data-toggle='modal' data-target='#dreamModal' id="+res._id+">Edit Dream</button></div>");
      console.log("HELO");
      dreamCatcher.renderDream(res);
      that.removeHide();
      // $('#createDreamModal').removeClass("show");
      // $('#createDreamModal').addClass("hide");
    })
    .fail(function(err) {
      console.log("Error:", err);
    });
};

// Al's code
dreamCatcher.editDreamer = function(e) {
  e.preventDefault();
  var dreamerId = $(e.target).data('dreamer-id');
  console.log(dreamerId);
  $.ajax({
    method: 'PUT',
    url: ('/dreamers/:id/edit/' + dreamerId),
    data: $('#edit-dreamer-form').serialize(),
    success: function(data) {
        console.log("success!");

        // $('#"dreamerUpdate"');
        window.location.href  = "/dreamers";
        //refreshes page after closing modal
    }
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



dreamCatcher.renderDream = function(dream) {

  var $dreamList = $('#dream-list');
  var dreamTemplate = Handlebars.compile($('#dream-template').html());
  var compiledHTML = dreamTemplate({dreams: [dream]});
  $dreamList.prepend(compiledHTML);
};

dreamCatcher.renderTag = function(tag) {
  var $dreamList = $('#dream-list');
  var dreamTemplate = Handlebars.compile($('dream-template').html());
  var compiledHTML = dreamTemplate({tags: [tag]})
}

// EDIT DREAM
$('#dreamModal').on('show.bs.modal', function (e) {
  var $invoker = $(e.relatedTarget).attr('id');
  // console.log($invoker.attr('id'));
  dreamCatcher.dreamId = $invoker;
});
dreamCatcher.dreamId;

dreamCatcher.editDream = function(e) {
  e.preventDefault();
  var dreamId = dreamCatcher.dreamId;

  // $('#dreamModal').on('show', function (e) {
  // var $invoker = $(e.relatedTarget);
  // console.log($invoker);
  // });

  console.log('someone wants to edit dream id= ' + dreamId);
  $.ajax({
    method: 'PUT',
    url: ('/dreamers/:id/dreams/' + dreamId),
    data: $('#edit-dreams-form').serialize(),
    success: function(data) {
        console.log("success!");
        $('#dreamModal').modal('hide');
        window.location.reload(true);
        //refreshes page after closing modal
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


//SEARCH FOR DREAMS BY TAGS
$('#search').click( function() {
    $.ajax({
      // var tag = $('#searchTag.val()');
      method: "GET",
      url: "/dreams",
      data: {tag: $('#searchTag').val()},
      success: function(data) {
        // $('#dreamers').remove();
        console.log("got data:", data);
        data.dreams.forEach(function(dream) {
          console.log(dream);
          dreamCatcher.renderDream(dream);
        })
      }
});
});

// REMOVE CLASS HIDE
dreamCatcher.removeHide = function() {
  $('#dreams-form-tag').val("");
  $('#dreams-form-description').val("");

  $('#createDreamModal').modal('hide');
  $('#createDreamModal').removeClass("show");
};
