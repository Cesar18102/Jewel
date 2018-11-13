<?
      require_once "SendMailSmtpClass.php"; // подключаем класс
      $adress = ($_POST['checkedPostWay'] == 'Укрпочта')? "Город: ".$_POST['clientCity']."; Адрес: ".$_POST['clientPost'] : "Город: ".$_POST['clientCityNewPost']."; Отделение Новой Почты: ".$_POST['clientNewPostSection'];
      $mailTextClient = "Способ доставки: ".$_POST['checkedPostWay']."; ".$adress."; ФИО: ".$_POST['clientName']."; ID заказа: ".$_POST['offerId']."; Телефон: ".$_POST['clientPhone']."; Комментарий: ".$_POST['clientComment']."; ";
      $mailTextMe = $mailTextClient."Заказанная модель: ".$_POST['clientModel']."; Материал заказа: ".$_POST['checkedMaterial']."; Количество: ".$_POST['checkedCount']."; e-mail: ".$_POST['clientMail'];
      $mailTextClient .= "Ваш заказ поступил в обработку. Проверьте эти данные, при не соответствии - напишите письмо по адресу jewelfiltermarket@gmail.com , в котором обязательно укажите свой ID заказа";

      $mailSMTP = new SendMailSmtpClass('jewelfiltermarket@gmail.com', 'a56552239B', 'ssl://smtp.gmail.com', 'Олег', 465); // создаем экземпляр класса
      // $mailSMTP = new SendMailSmtpClass('логин', 'пароль', 'хост', 'имя отправителя');

      // заголовок письма
      // заголовок письма
      $headers= "MIME-Version: 1.0\r\n";
      $headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
      $headers .= "From: Jewel <jewelfiltermarket@gmail.com>\r\n"; // от кого письмо
      $headers .= "To: Jewel <jewelfiltermarket@gmail.com>\r\n";
      $result =  $mailSMTP->send('jewelfiltermarket@gmail.com', $_POST['subject'].": ".$_POST['offerId'], $mailTextMe, $headers); // отправляем письмо
      // $result =  $mailSMTP->send('Кому письмо', 'Тема письма', 'Текст письма', 'Заголовки письма');

      $headersClient = "MIME-Version: 1.0\r\n";
      $headersClient .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
      $headersClient .= "From: Jewel <jewelfiltermarket@gmail.com>\r\n"; // от кого письмо
      $headersClient .= "To: <".$_POST['clientMail'].">\r\n";
      $result =  $mailSMTP->send($_POST['clientMail'], "Jewel - ваш заказ поступил в обработку", "Здравствуйте, ".$_POST['clientName'].". ".$mailTextClient, $headersClient); // отправляем письмо
?>	