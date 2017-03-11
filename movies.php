<?php require 'header.php'; ?>
<?php
	if ( isset( $_GET['id'] ) ) 
	{
		$movie_id = $_GET['id'];
?>
<div class="container-fluid movie">
	<script type="text/javascript">
		window.onload = function () {
			getMovieDetails("https://api.themoviedb.org/3/movie/<?php echo $movie_id ?>?api_key=<?php echo $api ?>&language=en-US");
		}
	</script>
	<div id="movie-data">
		
	</div>
	<h2>Trailers</h2>	
	<div id="movie-videos">
		

	</div>
</div>
<?php
	} else {
		echo "<h1>No Movie Selected.</h1>";
	}
 ?>
<?php require 'footer.php'; ?>