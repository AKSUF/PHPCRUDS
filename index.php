<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="./css/style.css">
</head>

<body>
    <h1 class="bg-dark text-light text-center py-2">PHP Advance CRUD</h1>
    <div class="container">
<div class="displaymessage"></div>
        <div class="row">
            <div class="col-10">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text "><i class="fas fa-search"></i></span>
                    </div>
                    <input type="text" class="form-control" placeholder="Search user" id="searchinput">
                </div>
            </div>
            <div class="col-2">
                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="adduserbtn">
                    Add New User
                </button>

                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Adding New User</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <?php include 'form.php' ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- table -->
        <?php include 'profile.php' ?>
        <?php include './table.php' ?>

        <!-- pagination -->
       <!-- Pagination -->
<!-- Pagination -->
<nav aria-label="Page navigation example" id="pagination">
</nav>

<input type="hidden" value="1" name="currentpage" id="currentpage">

    </div>
  

    <!-- CDN for jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- CDN for Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
    <script src="./js/script.js"></script>
</body>

</html>
