<?php
require_once 'Database.php';

class User extends Database{
    protected $tableName = "usertable";
  // Function to add user
  public function add($data) {
    if (!empty($data)) {
        $fields = $placeholders = [];
        foreach ($data as $field => $value) {
            $fields[] = $field;
            $placeholders[] = ":{$field}";
        }
        $sql = "INSERT INTO {$this->tableName} (" . implode(',', $fields) . ") VALUES (" . implode(',', $placeholders) . ")";
        $stmt = $this->conn->prepare($sql);
        try {
            $this->conn->beginTransaction();
            $stmt->execute(array_combine($placeholders, $data));
            $lastInsertedId = $this->conn->lastInsertId();
            $this->conn->commit();
            return $lastInsertedId;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            $this->conn->rollBack();
        }
    }
}


// Function to get rows
public function getRows($start = 0, $limit = 4)
{
    $sql = "SELECT * FROM {$this->tableName} ORDER BY id LIMIT :start, :limit";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindValue(':start', $start, PDO::PARAM_INT);
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $results;
}


// Function to get single row
public function getRow($field, $value)
{
    $sql = "SELECT * FROM {$this->tableName} WHERE {$field} = :value";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindValue(':value', $value);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result;
}

    // Function to count number of rows
    public function getCount(){
        $sql = "SELECT count(*) as pcount FROM {$this->tableName}";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['pcount'];
    }

    // Function to upload photo
public function uplaodPhoto($file){
if(!empty($file)){
    $fileTempPath=$file['tmp_name'];
$fileName=$file['name'];
$fileType=$file['type'];
$fileNameCmps=explode('.',$fileName);
$fileExtension=strtolower(end($fileNameCmps));
$newFileName=md5(time().$fileName).'.'.$fileExtension;
$allowedExtn=["png","jpg","jpeg"];
if(in_array($fileExtension,$allowedExtn)){
    $uploadFileDir=getcwd().'/upload/';
    $desFilePath=$uploadFileDir.$newFileName;
    if(move_uploaded_file($fileTempPath,$desFilePath)){
return $newFileName;
    }
}
}
}
    // Function to update
    // Function to delete

    // Function for search
}
?>
