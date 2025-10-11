# YesJ - Youth Empowering Service

Welcome to the YesJ website! This is a non-profit organization dedicated to empowering youth through various services and programs. Our platform is built using the MERN stack (MongoDB, Express, React, Node.js) and is containerized using Docker Compose for easy deployment and scalability.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Frontend-Backend Connection](#frontend-backend-connection)
- [Data Management](#data-management)
- [Image Management](#image-management)
- [Admin Panel](#admin-panel)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User-Friendly Interface**: A responsive and intuitive interface for users to navigate easily.
- **Announcements**: Stay updated with the latest news and events.
- **Courses and Events**: Access a variety of courses and events designed to empower youth.
- **Admin Panel**: Manage announcements, courses, and events efficiently.

## Technologies Used

- **Frontend**: React.js, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://gitlab.com/yesj/yesj.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd yesj
   ```

3. **Set up environment variables**:
   
   For detailed information about environment variable setup, please refer to [ENVIRONMENT.md](ENVIRONMENT.md).
   
   Quick setup:
   ```bash
   # Client environment
   cp client/.env.example client/.env
   
   # Server environment
   cp server/.env.example server/.env
   
   # Modify the values as needed for your local setup
   ```

4. **Run the application using Docker Compose**:
   
   For production deployment:
   ```bash
   docker-compose up -d
   ```
   
   For development deployment with hot reloading:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
   ```
   
   For more detailed information about Docker deployment, please refer to [DOCKER_README.md](DOCKER_README.md).

## Frontend-Backend Connection

The frontend and backend are connected through a RESTful API. For detailed information about how the connection works, please refer to [README_CONNECTION.md](README_CONNECTION.md).

### Quick Setup:

1. **Start MongoDB**:
   Ensure MongoDB is running locally on port 27017

2. **Start Backend Server**:
   ```bash
   cd server
   npm install
   npm start
   ```

3. **Start Frontend**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the Application**:
   
   With Docker deployment:
   - Frontend: http://localhost
   - Backend API: http://localhost:5000
   
   With manual deployment:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Data Management

The application includes comprehensive data validation, seeding, and management features. For detailed information, please refer to [DATA_MANAGEMENT.md](DATA_MANAGEMENT.md).

### Quick Data Management:

1. **Seed the Database** (populate with sample data):
   ```bash
   cd server
   npm run seed
   ```

2. **Reset the Database** (clear all data):
   ```bash
   cd server
   npm run reset
   ```

## Image Management

The application uses images stored in the `client/public/website/` directory. For detailed information about how to manage images, please refer to [IMAGE_MANAGEMENT.md](IMAGE_MANAGEMENT.md).

### Quick Image Management:

1. **Add new images** to `client/public/website/`
2. **Reference images** in seed data with paths like `/website/image.jpg`
3. **Seed the database** to use the new images:
   ```bash
   cd server
   npm run seed
   ```

## Admin Panel

The application includes a comprehensive admin panel for managing all website content. For detailed information about how to use the admin panel, please refer to [ADMIN_PANEL.md](ADMIN_PANEL.md).

### Quick Admin Access:

1. **Navigate to the admin login**:
   ```
   http://localhost:3000/admin/login
   ```

2. **Use default credentials**:
   - Username: `admin`
   - Password: `admin123`

3. **Manage website content**:
   - Carousel images
   - Announcements
   - Courses
   - Events
   - Programmes
   - Gallery images

## Usage

Once the application is running, you can access it at `http://localhost:3000`. Explore the various features and services we offer to empower youth.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.