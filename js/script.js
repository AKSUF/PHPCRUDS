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
                <a href="" class="mr-3" title="View profile" data-id=${user.id} data-bs-toggle="modal" data-bs-target="#userViewModal"><i class="fas fa-eye"></i></a>
                <a href="" class="mr-3 text-info edituser" title="Edit" data-id=${user.id} data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fas fa-edit"></i></a>
                <a href="" class="mr-3 text-danger" title="Delete" data-id=${user.id} data-bs-toggle="modal" data-bs-target="#userViewModal"><i class="fas fa-trash-alt"></i></a>
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
        $(this).parent().addClas("active");

    });

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

    getUser();
});



//functiont to update