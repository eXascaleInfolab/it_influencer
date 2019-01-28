var sec1 = document.getElementById("sec1");
sec1.style.display = "none"
var appear=0
var submission=0
var submission_0=0
var submission_1=0
var submission_2=0


var button = $('#btn')
var button_2 = $('#btn_2')
var button_sub=$('#btn_sub')
var counter_exp = 0
var counter_conn = 0
var counter_mot = 0
$("#amount_expertise").slider();
$("#amount_expertise").on("change", function(slideEvt) {
	$("#amount_expertise_SliderVal").text(slideEvt.value.newValue);
	counter_exp = counter_exp + 1
});


$("#amount_connectivity").slider();
$("#amount_connectivity").on("change", function(slideEvt) {
	$("#amount_connectivity_SliderVal").text(slideEvt.value.newValue);
	counter_conn=counter_conn+1
});

$("#amount_motivation").slider();
$("#amount_motivation").on("change", function(slideEvt) {
	$("#amount_motivation_SliderVal").text(slideEvt.value.newValue);
	counter_mot=counter_mot+1
});






$(function() {
	var button_twitter = $('#btn_twitter')
	var btn_valid1 = $('#btn_valid1')
	var btn_sub=$('#btn_sub')
	button_twitter.on("click", function(e) {
		$("#amount_connectivity").slider('refresh');
		var twitter_own = $('#twitter_own').val()
		var c = twitter_own.startsWith("@");

		if (c==true)
			{twitter_own= twitter_own.substr(1);}
		if (twitter_own!='')
		{
			$('#invalid_own').hide();
			$('#valid_own').show();
			sec1.style.display = "block";
		}
		else
		{
			$('#invalid_own').show();	
		}	
		submission=submission+1      
		if(submission==2)
		{
			$('#btn_sub').prop('disabled', false)
		}


	})
	btn_valid1.on("click", function() {
		var x = $('#inf1').val()
		var m = x.startsWith("@");
		if (m==true)
			{x= x.substr(1);}

		if(counter_exp>=1 && counter_conn >=1 && counter_mot>=1 && x!='')
		{
			$('#invalid').hide();
			$('#valid').show();
		}
		else
		{
			$('#invalid').show();
		}

		submission=submission+1
		if(submission==2)
		{
			$('#btn_sub').prop('disabled', false)
		}
	})

	$(document).ready(function(){	
		var timer = setInterval(clock, 1000);
		var msec = 00;
		var sec = 00;
		var min = 00;
		var time_now;
		function clock() {
			msec += 1;
			if (msec == 60) {
				sec += 1;
				msec = 00;
				if (sec == 60) {
					sec = 00;
					min += 1;
				}
			}
			$('#timer').val(min.toString()+":"+sec.toString()+":"+msec.toString());

		}
			var next = 1;
    $(".add-more").click(function(e){
        e.preventDefault();
        var addto = "#field" + next;
        var addRemove = "#field" + (next);
        next = next + 1;
        var newIn = '<input autocomplete="off" class="input" id="field' + next + '" name="field' + next + '" type="text" placeholder="IT influencer" data-items="8">';
        var newInput = $(newIn);
        var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >-</button></div><div id="field">';
        var removeButton = $(removeBtn);
        $(addto).after(newInput);
        $(addRemove).after(removeButton);
        $("#field" + next).attr('data-source',$(addto).attr('data-source'));
        $("#count").val(next);  
            $('.remove-me').click(function(e){
                e.preventDefault();
                var fieldNum = this.id.charAt(this.id.length-1);
                var fieldID = "#field" + fieldNum;
                $(this).remove();
                $(fieldID).remove();
            });
    });

		$('#contact-form').submit(function(e) {
			var gender_val=$('input[name=gender]:checked').val()
			var age_val=$('input[name=age]:checked').val()
			var freq_val=$('input[name=freq]:checked').val()
			var exp_val=$("#amount_expertise_SliderVal").text()
			var conn_val=$("#amount_connectivity_SliderVal").text()
			var mot_val=$("#amount_motivation_SliderVal").text()
			var bonus_inf = new Array(); 
			$("#field :input").each(function(e){	
  					// show input value
  					bonus_inf.push(this.value);
  					});			
			var obj = { 
				user_acc:$('#twitter_own').val(),
				gender: gender_val,
				age: age_val,
				location:  $('#country').val(), 
				infl_acc_1: $('#inf1').val(),
				infl_acc_2: $('#inf2').val(),
				infl_acc_3: $('#inf3').val(),
				bonus_inf:bonus_inf,
				time: $('#timer').val(),
				id: $('#validationCustomUsername').val(),
				exp: exp_val,
				conn: conn_val,
				freq: freq_val,
				mot:mot_val ,
				comment_first_sec: $('#comment_sec1').val(), 
				comment_knowl: $('#comment_knowl').val(), 
			};

			$.ajax( { 
				url:"https://api.mlab.com/api/1/databases/influencer/collections/task_infl?apiKey=laQ60FuLH5E2zin-7M-m_tzpzvL-KbLU",
				data: JSON.stringify(obj),
				type: 'POST',
				contentType: "application/json"
			});
			var id;
			$.ajax({
					type: 'GET',
					url: 'https://api.mlab.com/api/1/databases/influencer/collections/task_infl?apiKey=laQ60FuLH5E2zin-7M-m_tzpzvL-KbLU',

					success: function(data, textStatus, request) {
							var str_id=JSON.stringify(data)
							id=str_id.substring(17,41)
						},
						error: function(request, textStatus, errorThrown) {
								alert("by")
							},
							async: false
						});
						location_time=$('#validationCustomUsername').val()
						location_time_id=hashString(location_time+'3dB2Tt')
						function hashString(str){
							let hash = 0;
							for (let i = 0; i < str.length; i++) {
								hash += Math.pow(str.charCodeAt(i) * 31, str.length - i);
								hash = hash & hash; // Convert to 32bit integer
							}
							return Math.abs(hash);
						}  

						
						// var str=document.getElementById('twitter_fllw').value
						// var link="https://twitter.com/"+str
						// message="Hi @"+str+"! I think you have a great fashion sense  and you can help me get a bonus on a F8 task!Please fill in this survey https://exascaleinfolab.github.io/influencer/. If you have a F8 id, you can get a reward for job 1316391 #fashion_inflcr_poll"
						// tweetUrl = "https://twitter.com/intent/tweet?text=" + message;
						// document.getElementById('all').innerHTML +='<center><h1>Thank you! Don&#39t miss your chance to get a bonus and\
						// <a id="tweet-share" class="twitter-share-button tweet-share"\
						// href="'+tweetUrl+'"target="_blank">Tweet</a> </h1></center>\
						// <iframe src="https://giphy.com/embed/CT5Ye7uVJLFtu" width="1000" height="163" frameBorder="0" class="giphy-embed"\
						// align="midlle" allowFullScreen></iframe> <br> <center><h1>Please copy this code '+location_time_id+'</h1></center>';
						$("div").empty();
						document.getElementById('all').innerHTML +='<center><h1>Thank you!\
						<iframe src="https://giphy.com/embed/CT5Ye7uVJLFtu" width="1000" height="163" frameBorder="0" class="giphy-embed"\
						align="midlle" allowFullScreen></iframe> <br> <center><h1>Please copy this code '+location_time_id+'</h1></center>';


					})

	});
});