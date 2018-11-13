<?
    require_once 'PHPExcel/Classes/PHPExcel.php';
    $pExcel = PHPExcel_IOFactory::load('dataBase.xls');
    $i = 0;
    // Цикл по листам Excel-файла
    foreach ($pExcel->getWorksheetIterator() as $worksheet) {
      // выгружаем данные из объекта в массив
      $titles[$i] = $worksheet->getTitle();
      $i = $i + 1;
      $tables[] = $worksheet->toArray();
    }
    $i = 0;
    foreach($tables as $table) {
      echo $titles[$i].'|';
      $i = $i + 1;
      foreach($table as $row) {
        $bagInfo = '';
        foreach( $row as $col ) {
          if($col)
             $bagInfo .= $col.'&';
        }
        echo $bagInfo;
        if($row[0])
          echo '#';
      }
      echo '!';
    }
?>	