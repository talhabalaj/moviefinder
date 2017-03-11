// Here's the API Key.

var key = "8ed0f7e4d2dd57a5f554b0978949d169";
var data = "{}";
var loading = document.getElementById('loading');
var url = "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&language=en-US&page=1&include_adult=false&query=";
// Function 
function getMovieVids( id ) {
	var xhr = new XMLHttpRequest();
	div = document.getElementById('movie-videos');
	div.innerHTML = `<center id="loading">
		<img src="media/images/loading.gif">
	</center>`;
	xhr.addEventListener("readystatechange", function () {
	    if (this.readyState === this.DONE) {
	    	if (this.responseText){
		    	var json = JSON.parse(this.responseText);
		    	thehtml = "";
		    	if ( json.results.length == 0){
		    		thehtml += `<center>
		    		<h3>No Vidoes Found<h3>
		    		</center>
		    		`;
		    	}

		    	for (x in json.results){
		    		key = json.results[x].key;
		    		thehtml += `
		    		<div class="col-xs-12 col-sm-6 col-md-4">	
						<div class="embed-responsive embed-responsive-16by9">
	  						<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/`+key+`"></iframe>
						</div>
					</div>
		    	`;
		    	}
	    	
		    	div.innerHTML = thehtml;
	    	}
	    	

	    }

  });

  xhr.open("GET", "https://api.themoviedb.org/3/movie/" + id + "/videos?api_key="+ key +"&language=en-US");

  xhr.send(data);
}
function getMovieDetails( url ) {
	var xhr = new XMLHttpRequest();
	div = document.getElementById('movie-data');
	div.innerHTML = `<center id="loading">
		<img src="media/images/loading.gif">
	</center>`;
	xhr.addEventListener("readystatechange", function () {
	    if (this.readyState === this.DONE) {
	    	if (this.responseText){
		    	var json = JSON.parse(this.responseText);
		    	thehtml = "";
		    	if ( json.status_code == 34){
		    		thehtml += `<center>
		    		<h3>No Result Found<h3>
		    		</center>
		    		`;
		    	}
		    	id = json.id;
		    	imdb_id = json.imdb_id;
		    	tagline= json.tagline;
		    	original_title = json.original_title;
		    	overview = json.overview;
		    	release_date = json.release_date;
		    	revenue = json.revenue;
		    	genres = json.genres;
		    	budget = json.budget;
		    	poster_path = "https://image.tmdb.org/t/p/w500" + json.poster_path;

		    	thehtml += `
					<div class="container-fluid">
						<div class="col-sm-6 col-xs-12 col-md-3">
					    	<a href="`+ poster_path + `" class="thumbnail">
						    	<div class='image-wrapper' >
						      		<img src="`+ poster_path + `" alt="`+ original_title + `">
						      	</div>
					    	</a>
					  	</div>
					  	<div class="col-sm-6 col-xs-12 col-md-9">
					  		<h3>`+ original_title + `</h3>
					  		<h5>`+ tagline + `</h5>
					  		<b>Release Date:</b><p>`+ release_date + `</p>
					  		<b>Overview:</b><p>`+ overview + `</p>
					  		<b>Budget:</b><p>$`+ (budget).formatMoney(2) + `</p>
					  		<b>Revenue:</b><p>$`+ (revenue).formatMoney(2) + `</p>
					  		<p><a href="http://www.imdb.com/title/`+ imdb_id +`" class="btn btn-info" role="button">More on IMDb</a></p>
					  	</div>

					</div>	
		    	`;
		    	div.innerHTML = thehtml;
		    	getMovieVids(id);
	    	}
	    	

	    }

  });

  xhr.open("GET", url);

  xhr.send(data);
}
function getJson( url ){
  	var xhr = new XMLHttpRequest();
  	div = document.getElementById('data');
	div.innerHTML = `<center id="loading">
		<img src="media/images/loading.gif">
	</center>`;
	xhr.addEventListener("readystatechange", function () {
	    if (this.readyState === this.DONE) {
	    	if (this.responseText){
		    	var json = JSON.parse(this.responseText);
		    	thehtml = "";
		    	if ( json.results.length == 0){
		    		thehtml += `<center>
		    		<h3>No Result Found<h3>
		    		</center>
		    		`;
		    	} else {
			    	for (i in json.results) {
			    		original_title = json.results[i].original_title;
			    		overview = json.results[i].overview;
			    		if ( overview.length > 100 ) {
			    			overview = overview.substring(0 , 100) + "...";
			    		}
			    		if ( overview == null ){
			    			overview = "No Description Available"
			    		}
			    		release_date = json.results[i].release_date;
			    		if ( release_date == null ){
			    			release_date = "No Release Date Available";
			    		}
			    		original_language = json.results[i].original_language;
			    		poster_path = "https://image.tmdb.org/t/p/w500" + json.results[i].poster_path;
			    		id = json.results[i].id;
				    	if(json.results[i].poster_path == null){
				    		poster_path = "media/images/no_image.png";
				    	}
			    		thehtml += `
			    		<div class="col-xs-12 col-s-4 col-md-3">
			    		   	<div class="thumbnail">
				    			<div class='image-wrapper' >
				    				<img src='`+ poster_path +`' alt='`+ original_title +`'>
				    			</div>
								<div class='caption'>
				        			<h5 style='height:30px;overflow:hidden;' > `+ original_title +`</h5>
				        			<i style='font-size:12px'>`+ release_date +`</i>
				       				<p style='height:100px;overflow:hidden;' > `+ overview +`</p>
				        			<p><a href="movies.php?id=`+ id +`" class="btn btn-primary" role="button">More Info</a></p>
				 				</div>
			 				</div>
			 			</div>
						`;
			    	}
			    }
		    	div.innerHTML = thehtml;
	    	}
	    	

	    }
  });

  xhr.open("GET", url);

  xhr.send(data);
}
function work(event){
	if(event.key == 'Enter'){
		moviekeywords = document.getElementById("movie-keywords").value;
		if ( window.location.pathname.split("/").pop() == "index.php" || window.location.pathname == "/movie/"  ) {
			find(moviekeywords);
		} else {	
			window.location.href = "/movie/?find=" + moviekeywords;
		}
	} 
}
function find(moviekeywords) {
	var final = url + moviekeywords;
	getJson(final);
}
var links = document.querySelectorAll(".navbar-nav li a");
Array.prototype.forEach.call(links , function (link) {
	if ( window.location.pathname.split("/").pop() == "index.php" ){
		document.getElementById('home').parentNode.className = "active";
	} else {
			if ( link.getAttribute("href") == window.location.pathname.split("/").pop() ) {
				link.parentNode.className = "active";
			}	
	}

});
Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };