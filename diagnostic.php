<?php
echo "<h1>Проверка сервера AspanAir</h1>";

echo "<p>PHP работает: " . PHP_VERSION . "</p>";

if (extension_loaded('pdo_sqlite')) {
    echo "<p>SQLite подключен и работает.</p>";
} else {
    echo "<p>SQLite не подключен.</p>";
}
?>
