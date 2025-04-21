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
                <title>Create Product</title>
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
                                <h1 class="mt-4">Create Products</h1>
                                <ol class="breadcrumb mb-4">
                                    <li class="breadcrumb-item active"><a href="/admin/product">Product</a> / Create
                                    </li>
                                </ol>

                                <div class="row">
                                    <div class="col-md-6 col-12 mx-auto">
                                        <h3> Create a Product</h3>
                                        <hr />
                                        <form:form method="post" action="/admin/product/create"
                                            modelAttribute="newProduct" enctype="multipart/form-data">

                                            <div class="row g-3 mb-3">
                                                <div class="col">
                                                    <label class="form-label mb-1">Name</label>
                                                    <form:input type="text" class="form-control" path="name" />
                                                </div>
                                                <div class="col">
                                                    <label class="form-label mb-1">Price</label>
                                                    <form:input type="number" class="form-control" path="price" />
                                                </div>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label mb-1">Detail Description</label>
                                                <form:input type="textarea" class="form-control py-3"
                                                    path="detailDesc" />
                                            </div>
                                            <div class="row g-3 mb-3">
                                                <div class="col">
                                                    <label class="form-label mb-1">Short Description</label>
                                                    <form:input type="text" class="form-control" path="shortDesc" />
                                                </div>
                                                <div class="col">
                                                    <label class="form-label mb-1">Quantity</label>
                                                    <form:input type="number" class="form-control" path="quantity" />
                                                </div>
                                            </div>


                                            <div class="row g-3 mb-3">
                                                <div class="col">
                                                    <label class="form-label mb-1">Factory</label>
                                                    <form:select class="form-select" path="factory"
                                                        aria-label="Default select example">

                                                        <form:option value="APPLE">Apple</form:option>
                                                        <form:option value="ASUS">Asus</form:option>
                                                        <form:option value="LENOVO">Lenovo</form:option>
                                                        <form:option value="DELL">Dell</form:option>
                                                        <form:option value="LG">LG</form:option>
                                                        <form:option value="ACER">Acer</form:option>

                                                    </form:select>
                                                </div>
                                                <div class="col">
                                                    <label class="form-label mb-1">Target</label>
                                                    <form:select class="form-select" path="target"
                                                        aria-label="Default select example">

                                                        <form:option value="GAMING">Gaming</form:option>
                                                        <form:option value="SINHVIEN-VANPHONG">Sinh viên - văn phòng
                                                        </form:option>
                                                        <form:option value="THIET-KE-DO-HOA">Thiết kế đô họa
                                                        </form:option>
                                                        <form:option value="MONG-NHE">Mỏng nhẹ</form:option>
                                                        <form:option value="DOANH-NHAN">Doanh nhân</form:option>
                                                    </form:select>
                                                </div>
                                            </div>
                                            <div class="col mb-3">
                                                <div class="mb-3">
                                                    <label for="avatarFile" class="form-label">
                                                        Image</label>
                                                    <input class="form-control" type="file" id="avatarFile"
                                                        accept=".png .jpg .jpeg" name="doanphucFile" />
                                                </div>
                                            </div>
                                            <div class="col-12 mb-4">
                                                <img style="max-height: 250px; display: none;" alt="avatar preview"
                                                    id="avatarPreview" />

                                            </div>
                                            <div class="row mx-auto mt-3">
                                                <a href="/admin/product" class="btn btn-success col-2">Back</a>
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