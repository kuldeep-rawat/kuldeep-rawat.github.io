var accessToken="c02688ab9c17b9f9e985c3ec2e6b0fdef21cf24164654ca0f638fea462580ba8";$.ajax({url:"https://api.dribbble.com/v2/user/shots?access_token="+accessToken,dataType:"json",type:"GET",success:function(e){e.length>0?$.each(e.reverse(),(function(e,s){$("#shots").prepend('<a class="shot" target="_blank" href="'+s.html_url+'" title="'+s.title+'"><div class="title">'+s.title+'</div><img src="'+s.images.hidpi+'"/></a>')})):$("#shots").append("<p>No shots yet!</p>")}});