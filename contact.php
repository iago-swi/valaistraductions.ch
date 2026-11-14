<?php
// Valais Traductions — contact form handler.
// Sends the message by e-mail. Answers with JSON when called by js/script.js,
// or with a small confirmation page when JavaScript is off.

const MAIL_TO   = 'contact@noth.ch';                    // receives the messages
const MAIL_FROM = 'no-reply@valaistraductions.ch';      // must be an address of the hosting domain

$texts = [
  'fr' => [
    'ok'    => 'Message envoyé. Je vous réponds dès que possible.',
    'error' => 'Le message n’a pas pu être envoyé. Appelez-moi au +41 79 305 53 50.',
    'back'  => 'Retour au site',
  ],
  'en' => [
    'ok'    => 'Message sent. I will get back to you as soon as possible.',
    'error' => 'The message could not be sent. Please call me on +41 79 305 53 50.',
    'back'  => 'Back to the site',
  ],
  'de' => [
    'ok'    => 'Nachricht gesendet. Ich melde mich so bald wie möglich bei Ihnen.',
    'error' => 'Die Nachricht konnte nicht gesendet werden. Rufen Sie mich bitte an: +41 79 305 53 50.',
    'back'  => 'Zurück zur Seite',
  ],
];

function clean(string $key, int $max): string {
  $value = trim((string)($_POST[$key] ?? ''));
  // mbstring is not installed everywhere; fall back to a byte cut rather than a fatal error
  return function_exists('mb_substr') ? mb_substr($value, 0, $max, 'UTF-8') : substr($value, 0, $max);
}

$lang    = in_array($_POST['lang'] ?? '', ['fr', 'en', 'de'], true) ? $_POST['lang'] : 'en';
$name    = clean('name', 100);
$email   = clean('email', 120);
$task    = clean('task', 80);
$variant = (($_POST['variant'] ?? '') === 'fr') ? 'France' : 'Suisse';   // which French the readers expect
$message = clean('message', 4000);
$isBot   = clean('website', 200) !== '';          // honeypot: humans never see this field

$ok = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if ($isBot) {
    $ok = true;                                   // pretend success, send nothing
  } elseif ($name !== '' && $message !== '' && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $oneLine = fn(string $s): string => preg_replace('/[\r\n]+/', ' ', $s);   // no header injection
    $subject = 'Valais Traductions – ' . $oneLine($task !== '' ? $task : $name);
    $body    = "Nom: $name\nE-mail: $email\nTravail: $task\nFrançais de: $variant\nLangue du site: $lang\n\n$message\n";
    $headers = [
      'From'         => 'Valais Traductions <' . MAIL_FROM . '>',
      'Reply-To'     => $email,
      'Content-Type' => 'text/plain; charset=UTF-8',
    ];
    $ok = @mail(MAIL_TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);
  }
}

if (str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json')) {
  header('Content-Type: application/json; charset=UTF-8');
  echo json_encode(['ok' => $ok]);
  exit;
}

$t = $texts[$lang];
?>
<!DOCTYPE html>
<html lang="<?= $lang ?>">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex">
<title>Valais Traductions</title>
<link rel="icon" href="/assets/favicon.ico" sizes="any">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/scrollcraft.css">
<link rel="stylesheet" href="/css/style.css">
</head>
<body>
<div class="sc-grain" aria-hidden="true"></div>
<header class="vt-bar">
  <a class="vt-bar__logo" href="/<?= $lang ?>/"><img src="/images/logo-blanc.png" alt="Valais Traductions" width="880" height="322"></a>
</header>
<main class="sc-wrap vt-plain">
  <h1 class="sc-display vt-h2"><?= htmlspecialchars($ok ? $t['ok'] : $t['error']) ?></h1>
  <a class="vt-cta" href="/<?= $lang ?>/#contact"><?= htmlspecialchars($t['back']) ?></a>
</main>
</body>
</html>
