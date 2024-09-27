## Introduction

This project is a **Quiz App** designed to facilitate users in taking assignments or quizzes based on multiple-choice questions (MCQs). The system assumes that the user is already logged in, and the `userId` is either retrieved directly or via an authentication token in the request headers (in cases where a full login process is implemented).

### Key Features:
- The app begins with a simple interface: **"Click here to start the Assignment process"**. Upon clicking, the user is directed to the pre-selected quiz assignment.
- The user can then begin the quiz by clicking the **Start** button, which loads the series of MCQ-based questions.
- Each user's quiz attempt is recorded and stored, including:
  - **User Responses**: Detailed answers provided by the user for each question.
  - **Time Tracking**: The time taken by the user for each question.
  - **Scoring System**: The total score calculated based on the quiz’s scoring scheme.
- The app enables analytics on the quiz attempts by storing detailed data for each quiz attempt and user response, allowing for further analysis of user performance and trends.

## Tech Used

This project leverages the following technologies:

### Frontend:
- **Next.js**: A React-based framework for building web applications with server-side rendering and static site generation.
- **TypeScript**: Strongly typed programming language that builds on JavaScript, providing better tooling and type safety.
- **Tailwind CSS**: A utility-first CSS framework used for designing responsive and customizable user interfaces.
- **Axios**: A promise-based HTTP client used to handle API requests and data fetching in the frontend.
- **TanStack Query (React Query)**: A powerful data-fetching library for managing server-state, caching, and synchronizing with the backend APIs.

### Backend:
- **Node.js**: A JavaScript runtime used to build scalable server-side applications.
- **Next.js API Routes**: Used for handling server-side operations like managing quiz attempts and user responses.
  
### Database (In-memory for demo purposes):
- **JSON data storage**: Data such as quiz information and quiz attempts are stored in a static JSON-like structure, mimicking a database for the demo purposes of this app.

### Additional Tools:
- **fs (File System)**: A Node.js module used to handle file operations for storing and persisting quiz attempt data.
- **Path**: A module that helps in managing file and directory paths for dynamic file access in the app.

## Installation Process

To set up and run the Quiz App on your local machine, follow the steps below:

### Prerequisites:
- **Node.js**: Make sure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).
- **npm**: Node.js comes with npm (Node Package Manager), which you'll need to install dependencies.
- **Git**: You should also have Git installed for cloning the repository.

### Steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/quiz-app.git

2. **Navigate to the project directory**:
    ```bash
    cd quiz-app

3. **Install dependencies**:
    ```bash
    npm install

3. **Access the app**:
    ```bash
    http://localhost:3000

## Project Structure

The project follows the default Next.js structure, with a focus on modular design. Below is an overview of the key directories and their contents:

- **src/**: This is the main source directory containing all application code.
  - **components/**: This folder contains various reusable components, ensuring modularity and easier maintenance of the code.
  - **pages/**: This directory holds the application's page components and routing.
    - **api/**: This folder is used to create Next.js API routes, allowing you to handle server-side logic and API requests directly within the application.
      - **quiz/**: Inside this folder:
        - **quiz/[quizId].ts**: An API endpoint that retrieves quiz details based on its `quizId`.
        - **start.ts**: An API endpoint `/quiz/start` that initiates the quiz for the user and creates an entry in `utils/quizAttempt/demo-data.ts` for each new quiz attempt that the user starts.
      - **quizAttempt/**: Inside this folder:
        - **[attemptId].ts**: An API endpoint that retrieves the data of a quiz attempt for a specific user based on the `attemptId`.
        - **update.ts**: An API endpoint `/quizAttempt/update` that updates the quiz attempt details for the user as they answer each question. It also checks if the quiz has ended; if so, it updates the key `completedAt` at the end of the quiz.
    - **quiz/**: This folder contains:
      - **[quizId].tsx**: The main page where the actual assignment is conducted. This page handles the quiz process, allowing the user to start and take the quiz, as well as displaying the final results upon completion.
  - **services/**: This folder contains files that encapsulate the logic for making API calls, handling constants, and managing type safety.
    - **constants.ts**: A file that holds all the constant values required for the services to run.
    - **api.ts**: A file where all the API calls are made using Axios.
    - **queries.ts**: A file that contains all the TanStack Query code for data fetching.
    - **mutations.ts**: A file where all the TanStack Query mutations are defined.
    - **types.ts**: A file that defines all the request and response types for API calls, queries, and mutations, ensuring type safety throughout the application.
  - **utils/**: This folder is structured to store demo data and types for various entities.
    - **user/**: This folder contains:
      - **demo-data.ts**: A file for storing demo data related to users.
      - **types.ts**: A file that defines the types of user demo data required for type safety.
    - **quiz/**: This folder contains:
      - **demo-data.ts**: A file for storing demo data related to quizzes.
      - **types.ts**: A file that defines the types of quiz demo data required for type safety.
    - **quizAttempt/**: This folder contains:
      - **demo-data.ts**: A file for storing demo data related to quiz attempts. This file acts as a database that stores user attempts each time they take a quiz, continuously updating as the user interacts with the quiz.
      - **types.ts**: A file that defines the types of quiz attempt demo data required for type safety.

> **Important:** Check the `demo-data.ts` file in the `quizAttempt` folder to monitor user progress throughout the quiz.
