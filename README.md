# Student Survey Application - Full Stack

A full-stack student survey application built with Angular frontend and Spring Boot backend, containerized with Docker.

## Links
- Website: http://ec2-98-91-196-12.compute-1.amazonaws.com
- Backend: http://ec2-98-91-196-12.compute-1.amazonaws.com:8080/api/surveys/count


## Architecture

- **Frontend**: Angular 17 with Bootstrap 5
- **Backend**: Spring Boot 3.2 with Spring Data JPA
- **Database**: MySQL 8.0 (AWS RDS)
- **Containerization**: Docker & Docker Compose

## Project Structure

```
assignment_3/
├── frontend/               # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/      # Services and models
│   │   │   ├── features/  # Survey
│   │   │   └── shared/    # Shared utilities
│   │   └── assets/        # Static assets (zipcodes.json)
│   ├── Dockerfile
│   └── nginx.conf
├── backend/               # Spring Boot application
│   ├── src/main/java/edu/gmu/swe642/survey/
│   │   ├── model/        # JPA entities
│   │   ├── repository/   # Data access layer
│   │   ├── service/      # Business logic
│   │   ├── controller/   # REST endpoints
│   │   └── dto/          # Data transfer objects
│   ├── Dockerfile
│   └── pom.xml
├── docker-compose.yml
├── .env
└── README.md
```

## Prerequisites

- AWS EC2 instance with Docker and Docker Compose installed
- AWS RDS MySQL instance configured
- Git


### Step 1: Setting up the Git Repository

First, you need to create a local Git repository and push it to GitHub.

1.  **Create Project Files**: Create all the files (`Dockerfile`, etc.) and directories as shown in the Project Structure section on your local machine.
2.  **Initialize Git**: Open a terminal in your project's root directory and run:

    ```bash
    git init
    git add .
    git commit -m "Initial project setup"
    ```

3.  **Create GitHub Repository**: Go to GitHub and create a new, empty repository without a `README` or `.gitignore` file.
4.  **Push to GitHub**: Follow the instructions from GitHub to push your local repository:

    ```bash
    git remote add origin [https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git](https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git)
    git branch -M main
    git push -u origin main
    ```

### Step 2: Set Up a EC2 server

1.  **Provision the Server**
    * Using the AWS Management Console, launch a new EC2 instance.
    * **AMI**: `Ubuntu Server 24.04 LTS`.
    * **Instance Type**: `t3.large`
    * **Storage**: Increase the default storage to **30 GB**.
    * **Security Group**: Create a group named `rancher-k8s-sg` and add these inbound rules:
        * **Type**: `SSH` (Port 22) | **Source**: `My IP`
        * **Type**: `HTTP` (Port 80) | **Source**: `Anywhere`
        * **Type**: `HTTPS` (Port 443) | **Source**: `Anywhere`
        * **Type**: `Custom TCP` (Port 30080) | **Source**: `Anywhere`
    * **Assign an Elastic IP**: After the instance is running, assign an Elastic IP address to it so its public IP address does not change.
2.  **Install Docker**
    ```bash
        # Update, install Java and Git
        sudo apt update && sudo apt upgrade
        sudo apt install -y openjdk-17-jdk git

        # Install Docker
        sudo apt-get install -y docker.io
    ```

### Step 3: AWS RDS MySQL Setup & Integration
-   **Using AWS Console**

    1.  **Navigate to RDS Dashboard**

        -   Log into AWS Console

        -   Go to Services → Database → RDS

        -   Click "Create database"

    2.  **Database Creation Method**

        -   Select "Standard create"

        -   Choose "MySQL" as the engine type

    3.  **Engine Options**

        -   **Engine Version**: MySQL 8.0.35 (or latest)

        -   **Templates**: Choose "Free tier" for development

    4.  **Settings Configuration**

        ```
        DB Instance Identifier: student-survey-db
        Master Username: surveyadmin
        Master Password: [Create secure password]
        Confirm Password: [Same as above]

        ```

    5.  **Instance Configuration**

        ```
        DB Instance Class: db.t3.micro (Free tier eligible)
        Storage Type: General Purpose SSD (gp2)
        Allocated Storage: 20 GiB
        Enable storage autoscaling: Yes
        Maximum storage threshold: 100 GiB

        ```

    6.  **Connectivity Settings**

        ```
        VPC: Default VPC
        Subnet group: default
        Public access: Yes
        VPC security group: Create new
        Security group name: student-survey-sg
        Availability Zone: No preference
        Database port: 3306

        ```

    7.  **Database Authentication**

        -   Database authentication: Password authentication

    8.  **Review and Create**

        -   Review all settings

        -   Click "Create database"

        -   Wait 10-15 minutes for the instance to be created.


-   **Using AWS Console**

    1.  **Navigate to EC2 → Security Groups**

    2.  **Find your security group** (student-survey-sg)

    3.  **Add Inbound Rules**:

| Type | Protocol | Port Range | Source Type | Source | Description |
| --- | --- | --- | --- | --- | --- |
| MySQL/Aurora | TCP | 3306 | My IP | Your IP/32 | Development access |
| MySQL/Aurora | TCP | 3306 | Custom | 10.0.0.0/16 | VPC access for applications |

### Step 4: Configure Environment Variables

Create `.env` file in repo and update with your AWS RDS credentials:

```
DB_HOST=your-rds-endpoint.region.rds.amazonaws.com
DB_PORT=3306
DB_NAME=survey_db
DB_USERNAME=admin
DB_PASSWORD=your-secure-password
```

### Step 5. Build and Run with Docker Compose

```bash
docker-compose up --build
```

This will:
- Build the backend Spring Boot application
- Build the frontend Angular application
- Start both containers
- Connect to your AWS RDS MySQL database



## API Endpoints

### Survey Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/surveys` | Create a new survey |
| GET | `/api/surveys` | Get all surveys |
| GET | `/api/surveys/{id}` | Get survey by ID |
| PUT | `/api/surveys/{id}` | Update survey |
| DELETE | `/api/surveys/{id}` | Delete survey |
| GET | `/api/surveys/count` | Get total survey count |

## Survey Form Fields

### Personal Information
- First Name (required)
- Last Name (required)
- Email (required, valid email format)
- Phone Number (required, format: XXX-XXX-XXXX)

### Address Information
- Street Address (required)
- City (auto-filled from ZIP code)
- State (auto-filled from ZIP code)
- ZIP Code (required, 5 digits)

### Survey Questions
- Survey Date (required)
- Recommendation (required): Very Likely / Likely / Unlikely
- Campus Liked (min 2 required): Students, Location, Campus, Atmosphere, Dorm Rooms, Sports
- Interest Source (required): Friends, Television, Internet, Other
- Additional Comments (optional)
