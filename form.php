<form id="addform" method="POST" enctype="multipart/form-data" action="process.php">
    <div class="modal-body">
        <!-- username -->
        <div class="form-group">
            <label>Name:</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-user-alt"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="Enter your username" id="name" name="name">
            </div>
        </div>
        <!-- email -->
        <div class="form-group">
            <label>Email:</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-envelope-open"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="Enter your email" id="email" name="email">
            </div>
        </div>
        <!-- mobile -->
        <div class="form-group">
            <label>Mobile:</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fas fa-phone"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="Enter your mobile" id="mobile" name="mobile">
            </div>
        </div>
        <!-- photo -->
        <div class="form-group">
            <label>Photo:</label>
            <div class="input-group">
                <label class="custom-file-label" for="userphoto">Choose file</label>
                <input type="file" class="custom-file-input" name="photo" id="userphoto">
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Submit</button>
        <input type="hidden" name="action" value="adduser">
        <input type="hidden" name="userId" id="userId" value="">
    </div>
</form>
