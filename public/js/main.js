$(document).ready(function(){
 checkUrl();



function checkUrl(){
 var url = window.location.href;
 // "dreamers/234932842/dreams"
 var splitUrl = url.split('/');
 var something = splitUrl[splitUrl.length - 1];

 if (something === "dreams"){
   dreamCatcher.getDreams();
 }
}
  // var homeButton;
  // $('#get-started').click(function() {
  //   $('.about-us').css('margin-top', '150px');
  //
  //   console.log("replace home btns with signup", homeButton)
  //   $('.signup').toggleClass('hidden');
  //   $('.signup').css('z-index', '999');
  //   // $('#home-btns').addClass('hidden');
  //   $('#home-btns').before($('.signup')).detach();
  //   return homeButton = $('#home-btns').replaceWith($('.signup'))

    // console.log(homeButton);
  // });

  $('.cancel').click(function() {
    $('#home-btns').toggleClass('hidden');
    $('.login').toggleClass('hidden');
  });

  $('#login').click(function() {
     $('.login').toggleClass('hidden');
     $('#home-btns').toggleClass('hidden');
    // $('#home-btns').replaceWith($('.login'));
    $('.about-us').css('margin-top', '400px');
    //
  });

  // $('#login').click(function() {
  //   $('#home-btns').replaceWith($('.login'));
  //   $('.about-us').css('margin-top', '325px');
  //   //
  //   $('#get-started').addClass('hidden');
  //   $('#login').addClass('hidden');
  // })
  //
  $('#dreams').on('click', '.delete-dream', dreamCatcher.deleteDream);
  $('#dreams').on('click', '.edit-dream', dreamCatcher.editDream);
  // $('#createDreamModal').modal('show');

  var lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  $("#timeline").timeCube({
  data: pastDreams,
  granularity: "day",
  startDate: lastWeek,
  endDate: new Date(),
  transitionAngle: 60,
  transitionSpacing: 100,
  nextButton: $("#next-link"),
  previousButton: $("#prev-link"),
  showDate: false
  });

var counter = 0;

$('#footer').click(function() {
  console.log("hitting the counter");
  counter+=1;
  console.log(counter);
  if(counter % 2 !== 0) {
    console.log("odd count");
    var y = $(window).scrollTop();
    // $("#footer-text").innerText("Sing Up Now");
     $("html, body").animate({ scrollTop: y + $(window).height() }, 1200);
     $(".twitter-follow-button").hide();
  } else if (counter % 2 === 0){
    console.log("even counter", counter);
    $("html, body").animate({scrollTop: 0}, 1200);
    $(".twitter-follow-button").show();
  }
});



});
// END DOCUMENT READY
var pastDreams;
// //client-side dream logic
var dreamCatcher = {};
//
dreamCatcher.timeLine = [];

dreamCatcher.getDreams = function(){
  // console.log(dreams);
    dreamCount= dreams.children.length;

    pastDreams = [];
    for (var i=0; i < dreamCount; i++){
      var string = dreams.children[i].innerText;
      var array = string.split(".");
      var descriptionArray = array.splice(0, array.length-2);
      var description = descriptionArray.join('.');
      var fullDate = array[array.length - 2];
      // changed full date to -2 and dream added dreamId
      var dreamId = array[array.length-1];
      var dateArray = fullDate.split(" ");
      var wantedDate = dateArray.splice(0, 3);
      var date = wantedDate.join(' ');

      pastDreams.push({
        title: date,
        description: description,
        id: dreamId,
        remove: "",
        edit: "",
        startDate: (new Date(fullDate)),
        endDate: null
      });
    }



  // $.get('/dreamers/:id/dreams')
  //   .done(function(res){
  //     console.log(res);
  //   });
};

dreamCatcher.createDream = function(e) {
  e.preventDefault();
  var that = this;
  var dream = $(e.target).serialize();
  var formData = JSON.stringify($(e.target).serializeArray());
  console.log('formdata', formData["0"]);
  window.formData = formData;
  var currentUrl = window.location.href;

  console.log("created dream," , dream);
  $.post(currentUrl, dream)
    .done(function(res) {
      // OPTIMIZE: renders the entire dom eat time a food is created
      // dreamCatcher.renderDream(res);
      that.removeHide();
      console.log("res,", res)
      window.location.reload(true);
      // $('#createDreamModal').removeClass("show");
      // $('#createDreamModal').addClass("hide");
    })
    .fail(function(err) {
      console.log("Error:", err);
    });
};

dreamCatcher.renderDream = function(dream) {
  var $dreamList = $('#dream-list');
  $('#dream-list').html('');
  var dreamTemplate = Handlebars.compile($('#dream-template').html());
  var compiledHTML = dreamTemplate({dreams: [dream]});
  $dreamList.prepend(compiledHTML);
};

dreamCatcher.renderDreamer = function(dreamer) {
  var $dreamList = $('#dream-list');
  var dreamTemplate = Handlebars.compile($('#dream-template').html());
  var compiledHTML = dreamTemplate({dreamers: [dreamer]});
  $dreamList.prepend(compiledHTML);
};



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
  // e.preventDefault();
  console.log($(e.target).attr('id'));
  var dreamId = $(e.target).attr('id');
  console.log('someone wants to delete dream id= ' + dreamId);
  $.ajax({
    method: 'DELETE',
    url: ('/dreamers/:id/dreams/' + dreamId),
    data: dreamId,
    success: function() {
        $('#'+dreamId).remove();
        window.location.reload(true);
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
        // console.log(dream);
        dreamCatcher.renderDream(dream);
      })
      data.dreamers.forEach(function(dreamer){
        console.log("hittin that dreamer shit")
        dreamCatcher.renderDreamer(dreamer);
      })
}
      });

});


// REMOVE CLASS HIDE
dreamCatcher.removeHide = function() {
  $('#dreams-form-tag').val("");
  $('#dreams-form-description').val("");

  $('#createDreamModal').modal('hide');
  // $('#createDreamModal').removeClass("show");
};

///////////////////////////Timeline

// Prevent scrolling
document.body.addEventListener('touchstart', function(e){
// allow clicks on links within the moveable area
if($(e.target).is('a, iframe')) {
return true;
}
e.preventDefault();
});

document.body.addEventListener('touchmove', function(e){
e.preventDefault();
});
