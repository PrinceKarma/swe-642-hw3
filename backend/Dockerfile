# Multi-stage Docker build for Spring Boot backend

# Stage 1: Build the application
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build application
RUN mvn clean package -DskipTests -B

# Stage 2: Create runtime image
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Set environment variables (will be overridden by docker-compose)
ENV DB_HOST=localhost \
    DB_NAME=survey_db \
    DB_USERNAME=root \
    DB_PASSWORD=password

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
