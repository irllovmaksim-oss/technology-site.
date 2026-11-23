<?php
$db = new PDO('sqlite:' . __DIR__ . '/data/messages.db');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$db->exec("CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)");

$result = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = trim($_POST["name"] ?? "");
    $email = trim($_POST["email"] ?? "");
    $message = trim($_POST["message"] ?? "");

    if ($name && filter_var($email, FILTER_VALIDATE_EMAIL) && $message) {
        $stmt = $db->prepare(
            "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)"
        );
        $stmt->execute([$name, $email, $message]);
        $result = "Сообщение успешно сохранено!";
    } else {
        $result = "Проверьте правильность заполнения.";
    }
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Обратная связь</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Обратная связь</h1>

    <form method="POST">
        <input type="text" name="name" placeholder="Ваше имя" required>
        <input type="email" name="email" placeholder="Ваша почта" required>
        <textarea name="message" placeholder="Сообщение" required></textarea>
        <button type="submit">Отправить</button>
    </form>

    <p><?= htmlspecialchars($result) ?></p>
    <a href="index.html">На главную</a>
</body>
</html>