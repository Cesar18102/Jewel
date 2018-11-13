<?php
	if(isset($_POST['data']))
		echo sha1(md5($_POST['data']."B5d1YRv8rRfw8Slx3e96WZ7yjkS10462"));
	else
		echo "NO DATA";
?>