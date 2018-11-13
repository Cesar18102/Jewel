<?
    require_once 'PHPExcel/Classes/PHPExcel.php';
    $pExcel = PHPExcel_IOFactory::load('dataBase.xls');
    // Цикл по листам Excel-файла
    foreach ($pExcel->getWorksheetIterator() as $worksheet) {
      // выгружаем данные из объекта в массив
      $tables[] = $worksheet->toArray();
    }
	$isFound = false;
    foreach($tables as $table) {
      foreach($table as $row) {
		if($row[0] == $_POST['id']){
			foreach( $row as $col ) {
			  if($col)
				 echo $col.'&';
			}
			$isFound = true;
			break;
		}
      }
	  if($isFound){
		  break;
	  }
    }
?>	