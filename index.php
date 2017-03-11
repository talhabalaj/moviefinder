<?php require 'header.php'; ?>
<div id="search" class="container">
	<div class="row" id="data">

	</div>
</div>

<div class="featured container">


</div>

<?php require 'footer.php'; ?>
<?php 
  if ( isset( $_GET['find'] ) ){
    $moviekeywords = $_GET['find'];
    echo "<script>
      find('$moviekeywords');
    </script>";
  }
 ?>