# Sử dụng image Java 17 hoặc version bạn cần
FROM openjdk:17-jdk-slim

# Tạo thư mục để lưu trữ ứng dụng
WORKDIR /app

# Sao chép file JAR của bạn vào container
COPY target/laptopshop-web-backend.jar /app/app.jar

# Cấu hình môi trường (nếu cần)
ENV DB_URL jdbc:mysql://trolley.proxy.rlwy.net:47837/railway
ENV DB_USERNAME root
ENV DB_PASSWORD iLEVkVjGmAZUfvvEslQtWUhbTXBkiuGy
ENV SPRING_DATASOURCE_URL jdbc:mysql://trolley.proxy.rlwy.net:47837/railway
ENV SPRING_DATASOURCE_USERNAME root
ENV SPRING_DATASOURCE_PASSWORD iLEVkVjGmAZUfvvEslQtWUhbTXBkiuGy
ENV SPRING_DATASOURCE_DRIVER_CLASS_NAME com.mysql.cj.jdbc.Driver

# Chạy ứng dụng Java
CMD ["java", "-jar", "app.jar"]