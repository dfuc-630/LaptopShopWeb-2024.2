<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content="" />
                <meta name="author" content="" />
                <title>Create User</title>
                <link href="/css/styles.css" rel="stylesheet" />
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
                <script>
                    $(document).ready(() => {
                        const avatarFile = $("#avatarFile");
                        avatarFile.change(function (e) {
                            const imgURL = URL.createObjectURL(e.target.files[0]);
                            $("#avatarPreview").attr("src", imgURL);
                            $("#avatarPreview").css({ "display": "block" });
                        });
                    });
                </script>
                <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossorigin="anonymous"></script>
            </head>

            <body class="sb-nav-fixed">
                <jsp:include page="../layout/header.jsp" />
                <div id="layoutSidenav">
                    <jsp:include page="../layout/sidebar.jsp" />
                    <div id="layoutSidenav_content">
                        <main>
                            <div class="container-fluid px-4">
                                <h1 class="mt-4">Create User</h1>
                                <ol class="breadcrumb mb-4">
                                    <li class="breadcrumb-item active"><a href="/admin/user">User</a> / Create</li>
                                </ol>

                                <div class="row">
                                    <div class="col-md-6 col-12 mx-auto">
                                        <h3> Create a user</h3>
                                        <hr />
                                        <form:form method="post" action="/admin/user/create" modelAttribute="newUser"
                                            enctype="multipart/form-data">

                                            <div class="row g-3">
                                                <div class="col">
                                                    <label for="exampleInputEmail1"
                                                        class="form-label mb-1">Email</label>
                                                    <form:input type="email" class="form-control" path="email" />
                                                </div>
                                                <div class="col">
                                                    <label for="exampleInputPassword1"
                                                        class="form-label mb-1">Password</label>
                                                    <form:input type="password" class="form-control" path="password" />
                                                </div>
                                            </div>
                                            <div class="row g-3 mt-1">
                                                <div class="col">
                                                    <label for="exampleInputEmail1"
                                                        class="form-label mb-1">Phone</label>
                                                    <form:input type="text" class="form-control" path="phone" />
                                                </div>
                                                <div class="col">
                                                    <label for="exampleInputEmail1"
                                                        class="form-label mb-1">FullName</label>
                                                    <form:input type="text" class="form-control" path="fullName" />
                                                </div>
                                            </div>

                                            <div class="mb-3 mt-1">
                                                <label for="exampleInputEmail1" class="form-label mb-1">Address</label>
                                                <form:input type="text" class="form-control" path="address" />
                                            </div>
                                            <div class="row g-3">
                                                <div class="col">
                                                    <label for="exampleInputEmail1" class="form-label mb-1">Role</label>
                                                    <form:select class="form-select" path="role.name"
                                                        aria-label="Default select example">

                                                        <form:option value="ADMIN">Admin</form:option>
                                                        <form:option value="USER">User</form:option>
                                                    </form:select>
                                                </div>
                                                <div class="col">
                                                    <div class="mb-3">
                                                        <label for="avatarFile" class="form-label">
                                                            Avatar</label>
                                                        <input class="form-control" type="file" id="avatarFile"
                                                            accept=".png .jpg .jpeg" name="doanphucFile" />
                                                    </div>
                                                </div>
                                                <div class="col-12 mb-3">
                                                    <img style="max-height: 250px; display: none;" alt="avatar preview"
                                                        id="avatarPreview" />

                                                </div>
                                            </div>
                                            <div class="row mx-auto">
                                                <a href="/admin/user" class="btn btn-success col-2">Back</a>
                                                <button type="submit" class="btn btn-primary col-2 mx-2">Create</button>

                                            </div>
                                        </form:form>
                                    </div>
                                </div>

                            </div>
                        </main>
                        <jsp:include page="../layout/footer.jsp" />
                    </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
                    crossorigin="anonymous"></script>
                <script src="js/scripts.js"></script>
            </body>

            </html>