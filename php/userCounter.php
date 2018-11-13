<?
   $currentCount = file_get_contents('countOfUsers.txt');
   $fs = fopen('countOfUsers.txt', 'w');
   fwrite($fs, $currentCount + 1);
   fclose($fs);
   
   $fsOS = fopen('usersDivices.txt', 'a');
   fwrite($fsOS, $_POST['os']." ".$_POST['time']."\n");
   fclose($fsOS);
?>