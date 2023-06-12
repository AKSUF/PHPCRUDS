function pagination(totalpages, currentpage) {
    var pagelist = "";
    if (totalpages > 1) {
        currentpage = parseInt(currentpage);
        pagelist += `<ul class="pagination justify-content-center">`;
        const prevClass = currentpage == 1 ? "disabled" : "";
        pagelist += `<li class="page-item ${prevClass}"><a class="page-link" href="#" data-page="${currentpage - 1}">Previous</a></li>`;

        for (let p = 1; p <= totalpages; p++) {
            const activeClass = currentpage == p ? "active" : "";
            pagelist += `<li class="page-item ${activeClass}"><a class="page-link" data-page="${p}" href="#">${p}</a></li>`;
        }

        const nextClass = currentpage == totalpages ? "disabled" : "";
        pagelist += `<li class="page-item ${nextClass}"><a class="page-link" href="#" data-page="${currentpage + 1}">Next</a></li>`;
        pagelist += `</ul>`;
    }
    $("#pagination").html(pagelist);
}

// Function to get rows
function getUser() {
    var pageno = $("#currentpage").val();

    $.ajax({
        url: "/CrudAdvance1/ajax.php",
        type: "GET",
        dataType: "json",
        data: { page: pageno, action: 'getallusers' },
        beforeSend: function() {
            console.log("Wait data is loading");
        },
        success: function(row) {
            console.log(row);

            if (row.users) {
                var userlist = "";
                $.each(row.users, function(index, user) {
                    userlist += getuserRow(user);
                });
                $("#usertable tbody").html(userlist);
            }
            const totaluser = row.count;
            const totalpage = Math.ceil(parseInt(totaluser) / 4);
            const currentpage = $("#currentpage").val();
            pagination(totalpage, currentpage);
        },
        error: function(request, error) {
            console.log(arguments);
            console.log("Error: " + error);
        }
    });
}








function getuserRow(user) {
    var userRow = "";
    if (user) {
        userRow = `
        <tr>
            <th scope="row"><img class="" src="upload/${user.photo}"></th>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td>
                <a href="" class="mr-3 profile" title="View profile" data-id=${user.id} data-bs-toggle="modal" data-bs-target="#userViewModal"><i class="fas fa-eye"></i></a>
                <a href="" class="mr-3 text-info edituser" title="Edit" data-id=${user.id} data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-edit"></i></a>
                <a href="" class="mr-3 text-danger deleteuser"  title="Delete" data-id=${user.id}><i class="fas fa-trash-alt"></i></a>
              
            </td>
        </tr>`;
    }
    return userRow;
}



$(document).ready(function() {
    // Add form submission event
    $(document).on("submit", "#addform", function(e) {
        e.preventDefault();
        $.ajax({
            url: "/CrudAdvance1/ajax.php",
            type: "POST",
            dataType: "json",
            data: new FormData(this),
            processData: false,
            contentType: false,
            beforeSend: function() {
                console.log("Wait data is loading");
            },
            success: function(response) {
                console.log(response);
                if (response) {
                    $("#usermodal").modal('hide');
                    $("#addform")[0].reset();
                    getUser();
                }
            },
            error: function(request, error) {
                console.log(arguments);
                console.log("Error: " + error);
            }
        });
    });

    // Add click event for pagination links
    $(document).on("click", "ul.pagination li a", function(event) {
        event.preventDefault();
        const pagenum = $(this).data("page");
        $("#currentpage").val(pagenum);
        getUser();
        $(this).parent().siblings().removeClass("active");
        $(this).parent().addClass("active");

    });
    //functiont to update
    //for editing user detail
    $(document).on("click", "a.edituser", function() {
        var uid = $(this).data("id");
        $.ajax({
            url: "/CrudAdvance1/ajax.php",
            type: "GET",
            dataType: "json",
            data: { id: uid, action: 'editusersdata' },
            beforeSend: function() {
                console.log("Wait data is loading");
            },
            success: function(row) {
                console.log(row);
                if (row) {
                    $("#name").val(row.name);
                    $("#email").val(row.email);
                    $("#mobile").val(row.mobile);
                    $("#userId").val(row.id);
                }
            },
            error: function(error) {
                console.log("Error: " + error);
            }
        });
    });

    //onclick for adding use btn
    $("#adduserbtn").on("click", function() {
        $("#addform")[0].reset();
        $("#userId").val("");
    })


    //onclick event for deleting
    $(document).on("click", "a.deleteuser", function(e) {
        e.preventDefault();
        var uid = $(this).data("id");
        console.log("Check1+");
        if (confirm("Are you sure you want to delete this user?")) {
            $.ajax({
                url: "/CrudAdvance1/ajax.php",
                type: "POST", // Change the request type to POST
                dataType: "json",
                data: { id: uid, action: 'deleteuser' },

                beforeSend: function() {
                    console.log("Wait data is loading");
                },
                success: function(res) {
                    if (res.delete == 1) {
                        $(".displaymessage").html("User deleted successfully");
                        fadeIn().delay(2500).fadeOut();
                        getUser();
                    }
                },
                error: function() {
                    console.log("Oops! Something went wrong");
                }
            });
        }
    });
    //profile view
    $(document).on("click", "a.profile", function() {
        var uid = $(this).data("id");
        $.ajax({
            url: "/CrudAdvance1/ajax.php",
            type: "GET",
            dataType: "json",
            data: { id: uid, action: 'editusersdata' },
            success: function(user) {
                if (user) {
                    const profile = `
                        <div class="row">
                            <div class="col-sm-6 col-md-4">
                                <img src="upload/${user.photo}" alt="Image" class="rounded">
                            </div>
                            <div class="col-sm-6 col-md-8">
                                <h4 class="text-primary">${user.name}</h4>
                                <p>
                                    <i class="fas fa-envelope-open text-light"></i>${user.email}<br>
                                    <i class="fas fa-phone text-light"></i>${user.mobile}
                                </p>
                            </div>
                        </div>`;
                    $("#profile").html(profile);
                }
            },
            error: function() {
                console.log("Oops! Something went wrong");
            }
        });
    });
    $(document).on("keyup", "#searchinput", function() {
        const searchText = $(this).val();
        if (searchText.length > 1) {
            $.ajax({
                url: "/CrudAdvance1/ajax.php",
                type: "POST",
                dataType: "json",
                data: {
                    searchQuery: searchText,
                    action: "searchuser"
                },
                success: function(users) {
                    if (users) {
                        var usersList = "";
                        $.each(users, function(index, user) {
                            usersList += getuserRow(user);
                        });
                        $("#usertable tbody").html(usersList);
                        $("#pagination").hide();
                    }
                },
                error: function() {
                    console.log("Oops! Something went wrong");
                }
            });
        } else {
            getUser();
            $("#pagination").show();
        }
    });


    getUser();
});