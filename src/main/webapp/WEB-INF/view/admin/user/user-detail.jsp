<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>User Detail ${id}</title>
            <!-- Latest compiled and minified CSS -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
            <!-- Latest compiled JavaScript -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
            <!-- <link href="/css/demo.css" rel="stylesheet"> -->

        </head>

        <body>
            <div class="container mt-5">
                <div class="row">
                    <div class="col-12 mx-auto">

                        <h3> User Information With ID = ${id} </h3>

                        <hr />
                        <div class="card" style="width: 60%">
                            <div class="card-header fw-bold">
                                Information of User
                            </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">ID: ${id}</li>
                                <li class="list-group-item">FullName: ${user.fullName}</li>
                                <li class="list-group-item">Email: ${user.email}</li>
                                <li class="list-group-item">Phone: ${user.phone}</li>
                                <li class="list-group-item">Address: ${user.address}</li>
                            </ul>
                        </div>
                        <a href="/admin/user" class="btn btn-success mt-3">Back</a>
                    </div>
                </div>
        </body>

        </html>