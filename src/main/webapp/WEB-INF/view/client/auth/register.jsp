<%@page contentType="text/html" pageEncoding="UTF-8" %>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
        <%@taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
            <html lang="en">

            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Register </title>
                <!-- Google Web Fonts -->
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Raleway:wght@600;800&display=swap"
                    rel="stylesheet">

                <!-- Icon Font Stylesheet -->
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
                    rel="stylesheet">

                <!-- Libraries Stylesheet -->
                <link href="/client/lib/lightbox/css/lightbox.min.css" rel="stylesheet">
                <link href="/client/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">


                <!-- Customized Bootstrap Stylesheet -->
                <link href="/client/css/bootstrap.min.css" rel="stylesheet">

                <!-- Template Stylesheet -->
                <link href="/client/css/style.css" rel="stylesheet">
            </head>

            <body>
                <section class="vh-100 bg-image"
                    style="background-image: url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp');">
                    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                        <div class="container h-100">
                            <div class="row d-flex justify-content-center align-items-center h-100">
                                <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div class="card" style="border-radius: 15px;">
                                        <div class="card-body p-5">
                                            <h2 class="text-uppercase text-center mb-5">Create an account</h2>

                                            <form:form method="post" action="/register" modelAttribute="registerUser">

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <form:input type="text" id="form3Example1cg"
                                                        class="form-control form-control-lg" path="fullName"
                                                        placeholder="Enter your name" />
                                                    <label class="form-label" for="form3Example1cg">Your Name</label>
                                                </div>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <form:input type="email" id="form3Example3cg"
                                                        class="form-control form-control-lg" path="email"
                                                        placeholder="Enter your email" />
                                                    <label class="form-label" for="form3Example3cg">Your Email</label>
                                                </div>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <form:input type="password" id="form3Example4cg"
                                                        class="form-control form-control-lg" path="password"
                                                        placeholder="Enter your password" />
                                                    <label class="form-label" for="form3Example4cg">Password</label>
                                                </div>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <form:input type="password" id="form3Example4cdg"
                                                        class="form-control form-control-lg" path="confirmPassword"
                                                        placeholder="Confirm your password" />
                                                    <label class="form-label" for="form3Example4cdg">Repeat your
                                                        password</label>
                                                </div>

                                                <!-- <div class="form-check d-flex justify-content-center mb-5">
                                                    <input class="form-check-input me-2" type="checkbox" value=""
                                                        id="form2Example3cg" />
                                                    <label class="form-check-label" for="form2Example3g">
                                                        I agree all statements in <a href="#!"
                                                            class="text-body"><u>Terms of service</u></a>
                                                    </label> -->
                                                <!-- </div> -->

                                                <div class="d-flex justify-content-center">
                                                    <button type="submit" class="btn btn-success">Register</button>
                                                </div>

                                                <p class="text-center text-muted mt-5 mb-0">Have already an account? <a
                                                        href="/login" class="fw-bold text-body"><u>Login here</u></a>
                                                </p>

                                            </form:form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <script>
                    document.querySelector("form").addEventListener("submit", function (e) {
                        const password = document.getElementById("form3Example4cg").value;
                        const confirmPassword = document.getElementById("form3Example4cdg").value;

                        if (password !== confirmPassword) {
                            e.preventDefault(); // ngăn form submit
                            alert("Mật khẩu xác nhận không khớp với mật khẩu!");
                        }
                    });
                </script>

            </body>

            </html>