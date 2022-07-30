<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exeption;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/Exception.php';

$mail = new PHPMailer (true);
$mail -> CharSet = 'UTF-8';
$mail -> setLanguage('ru', 'phpmailer/language/');
$mail -> IsHTML(true);


$mail ->addAdress('fedorovspa@gmail.com');