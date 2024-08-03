<?php

class Database {
    private $host = 'localhost';
    private $db = 'yatzy';
    private $user = 'postgres';
    private $pass = 'pgSh1zue!!admin';
    private $charset = 'utf8';
    private $pdo;

    public function __construct() {
        $dsn = "pgsql:host=$this->host;dbname=$this->db;charset=$this->charset";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        try {
            $this->pdo = new PDO($dsn, $this->user, $this->pass, $options);
        } catch (\PDOException $e) {
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    public function getPDO() {
        return $this->pdo;
    }
}
