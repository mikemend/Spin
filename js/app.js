	var baseDomain= 'http://atomicbubbleapps.com/starspin/';
	function suffix(i) {
		var j = i % 10;
		if (j == 1 && i != 11) {
        return i + "st";
		}
		if (j == 2 && i != 12) {
        return i + "nd";
		}
		if (j == 3 && i != 13) {
        return i + "rd";
		}
		return i + "th";
	}
	
	      (function($){
         $.fn.disableSelection = function() {
             return this
                      .attr('unselectable', 'on')
                      .css('user-select', 'none')
                      .on('selectstart', false);
         };
      })(jQuery); 
	  function getUserID(){
	  var id = localStorage.getItem('id');
	  if (!id){
	  id = 0;
      }
	  return id;
	  }
	  
	  function getHighScore(){
	  var hs = localStorage.getItem('highscore');
	  if (!hs){
	  hs = 0;
      }
	  return hs;
	  }
	  function update(){
      var sco = game_status.score;
	  var highsco = getHighScore();
	  if (sco < highsco) {
	  return;
	  }
	  localStorage.setItem('highscore',sco);
	  game_status.score = 0;
      var uname = $('#username_go').val();
	  var id = getUserID();
      if (!uname) {
	  alert('empty username');
	  return;
      }
	  localStorage.setItem('uname',uname);
	  			$.ajax({
				type: "POST",
				url: baseDomain + 'svs/updateScore.php',
				async: "true",
				data:{id:id,score:sco,uname:uname},
				success: function(data) {
				var ret = jQuery.parseJSON(data);
				var id = ret[0].id;
				var rank = ret[0].rank;
				var elem = $('#update');
				alert ("You are currenlty - " + suffix(rank));
				localStorage.setItem('id', id);
				$(elem ).addClass("pure-button-disabled");
				}
			});
      }
	  function getLeaderBoard(){
				nav('leader');
				$('#leaderboard').append('<div class="loading"> </div>');
				var id = getUserID();
      	  		$.ajax({
				type: "GET",
				url: baseDomain + 'svs/getLeaderBoard.php?id='+id,
				async: "true",
				success: function(data) {
				var ret = jQuery.parseJSON(data);
				var table = '<table class="pure-table pure-table-bordered leader" style="width: 100%"><thead><tr><th>Username</th><th>Rank</th></tr></thead>';
				jQuery.each(ret, function(i, val) {
				table+='<tr>';
				table+='<td>';
				table+=val.username;
				table+='</td><td>';
				table+=suffix(val.rank);
				table+='</td></tr>';
				});	
				table+='</table>';
				$('#leaderboard').empty();
				$('#leaderboard').append(table);
				},
				error: function() {
				alert('Unable to connect to the Internet');
				}
			});
      }


	
