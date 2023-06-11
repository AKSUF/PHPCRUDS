<?php
class Database {
    private $dbserver = "localhost";
    private $dbuser = "root";
    private $dbpassword = "";
    private $dbname = "userdata";
    protected $conn;
    
    // Constructor
    public function __construct() {
      try {
        $dsn = "mysql:host={$this->dbserver};dbname={$this->dbname};charset=utf8";
        $options = array(PDO::ATTR_PERSISTENT => true, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
        $this->conn = new PDO($dsn, $this->dbuser, $this->dbpassword, $options);
      } catch(PDOException $e) {
        echo "Connection Error: " . $e->getMessage();
      }
    }
}
?>
