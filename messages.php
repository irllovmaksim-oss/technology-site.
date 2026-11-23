<?php
session_start();

if (empty($_SESSION["admin"])) {
    header("Location: admin.php");
    exit;
}
?>
<?php
$db = new PDO('sqlite:' . __DIR__ . '/data/messages.db');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$messages = $db->query(
    "SELECT * FROM messages ORDER BY id DESC"
)->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Сообщения пользователей</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<a href="logout.php" class="logout-btn">Выйти</a>
    <h1>Сообщения пользователей</h1>

    <?php if (count($messages) > 0): ?>
        <?php foreach ($messages as $item): ?>
            <div>
                <h3><?= htmlspecialchars($item['name']) ?></h3>
                <p>Почта: <?= htmlspecialchars($item['email']) ?></p>
                <p><?= nl2br(htmlspecialchars($item['message'])) ?></p>
                <small><?= htmlspecialchars($item['created_at']) ?></small>
            </div>
            <hr>
        <?php endforeach; ?>
    <?php else: ?>
        <p>Сообщений пока нет.</p>
    <?php endif; ?>

    <a href="contact.php">Назад к форме</a>
</body>
</html>