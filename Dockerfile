# --- Stage 1: Build ứng dụng ---
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# --- Stage 2: Chạy ứng dụng ---
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy file JAR đã build từ stage 1
COPY --from=builder /app/target/*.jar app.jar

# Biến môi trường sẽ được Render cung cấp — KHÔNG khai báo ở đây để bảo mật

# Chạy ứng dụng Spring Boot
CMD ["java", "-jar", "app.jar"]
