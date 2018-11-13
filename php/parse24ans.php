<?
   list($payed, $currency, $model, $details, $payWay, $orderId, $merchantId, $state, $date, $ref, $country) = split('&', $_POST['payment']);
   $mailResultText = "ID заказа: ".$orderId."; Состояние: ".$state."; Справка: ".$ref."; Дата: ".$date."; Заплачено: ".$payed." ".$currency."; Куплено: ".$model."; Страна: ".$country."; Способ оплаты: ".$payWay."; Сигнатура: ".$_POST['signature'];

   require_once "SendMailSmtpClass.php"; // подключаем класс
 
   $mailSMTP = new SendMailSmtpClass('jewelfiltermarket@gmail.com', 'a56552239B', 'ssl://smtp.gmail.com', 'Олег', 465); // создаем экземпляр класса
   // $mailSMTP = new SendMailSmtpClass('логин', 'пароль', 'хост', 'имя отправителя');

   // заголовок письма
   $headers= "MIME-Version: 1.0\r\n";
   $headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
   $headers .= "From: Jewel <jewelfiltermarket@gmail.com>\r\n"; // от кого письмо
   $headers .= "To: Jewel <jewelfiltermarket@gmail.com>\r\n";
   $result =  $mailSMTP->send('jewelfiltermarket@gmail.com', 'payed: '.$orderId, $mailResultText, $headers); // отправляем письмо
?>