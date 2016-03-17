$(document).ready(function() {
  console.log("This is connected");

  $('#get-started').click(function() {
    $('.signup').toggleClass('hidden', 2000);
    $('#home-btns').addClass('hidden');
  });

  $('.cancel').click(function() {
    $('.signup').toggleClass('hidden');
    $('#home-btns').removeClass('hidden');
  });

  $('#login').click(function() {
    $('#get-started').addClass('hidden');
    $('.login').toggleClass('hidden');
  })
  //
  $('#dreams').on('click', '.delete-dream', dreamCatcher.deleteDream);
  $('#dreams').on('click', '.edit-dream', dreamCatcher.editDream);
  $('#createDreamModal').modal('show');


$('#footer').click(function() {
    var y = $(window).scrollTop();
     $("html, body").animate({ scrollTop: y + $(window).height() }, 1200);
})

//   $('#footer').toggle(function(){
//     // $('.about-us').toggleClass('hidden');
//     // $('.about-us').css('background: red');
//
//
//     var y = $(window).scrollTop();
//     console.log("clicked on footer");
//     //
//     $("html, body").animate({ scrollTop: y + $(window).height() }, 1200);
// }


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
      // OPTIMIZE: renders the entire dom eat time a food is created
      console.log(res);
      dreamCatcher.renderDream(res);
      that.removeHide();
      // $('#createDreamModal').removeClass("show");
      // $('#createDreamModal').addClass("hide");
    })
    .fail(function(err) {
      console.log("Error:", err);
    });
};


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
