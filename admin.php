<?php
session_start();

$error = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $password = $_POST["password"] ?? "";

    if ($password === "Admin2026!") {
        $_SESSION["admin"] = true;
        header("Location: messages.php");
        exit;
    } else {
        $error = "Неверный пароль!";
    }
}
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Вход администратора</title>
</head>
<body>
    <h1>Вход администратора</h1>

    <form method="POST">
        <input type="password" name="password"
               placeholder="Введите пароль" required>
        <button type="submit">Войти</button>
    </form>

    <p><?= htmlspecialchars($error) ?></p>
</body>
</html>