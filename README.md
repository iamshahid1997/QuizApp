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
   git clone https://github.com/iamshahid1997/QuizApp.git

   ```

2. **Navigate to the project directory**:

   ```bash
   cd quiz-app

   ```

3. **Install dependencies**:

   ```bash
   npm install

   ```

4. **Access the app**:
   ```bash
   http://localhost:3000
   ```

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

## API Documentation

### 1. Get Quiz by ID

- **Endpoint**: `/api/quiz/[quizId]`
- **Method**: `GET`
- **Description**: This API retrieves a specific quiz using its unique identifier.

#### How It Works:

1. The `quizId` is extracted from the query parameters in the request.
2. The API searches for the quiz in the demo data using the provided `quizId`.
3. If the quiz is found, it returns the quiz details with a `200 OK` response.
4. If the quiz is not found, it returns a `404 Not Found` error message.

#### Response:

- **200 OK**: Returns the quiz details in JSON format.
- **404 Not Found**: Returns an error message indicating the quiz was not found.

#### Code:

```typescript
import { quizzes } from '@/utils/quiz/demo-data'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the quizId from the query parameters
  const { quizId } = req.query

  // Find the quiz in the demo data by matching the quizId
  const quiz = quizzes.find((q) => q.id === quizId)

  // If quiz is not found, return a 404 response
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' })
  }

  // If quiz is found, return it in the response
  return res.status(200).json(quiz)
}
```

### 2. Start a New Quiz Attempt

- **Endpoint**: `/api/quiz/start`
- **Method**: `POST`
- **Description**: This API creates a new quiz attempt for a user and returns the quiz questions along with the attempt details.

#### How It Works:

1. **Request Handling**: The API first checks if the incoming request method is `POST`. If it’s not, it returns a `405 Method Not Allowed` response.
2. **Extracting Data**: It retrieves the `quizId` and `userId` from the request body. These identifiers are necessary to associate the attempt with a specific quiz and user.
3. **Quiz Validation**: The API searches for the quiz in the existing demo data using the `quizId`. If the quiz is not found, a `404 Not Found` error response is sent back.
4. **Creating a New Attempt**: If the quiz exists, the API creates a new quiz attempt object. This object includes:
   - A unique identifier for the attempt generated using a random string.
   - The `userId` to track which user started the attempt.
   - The `quizId` to identify which quiz is being attempted.
   - The `startedAt` timestamp marking when the attempt began.
   - A placeholder for `completedAt`, initialized as `null`.
   - `totalCorrect`, initialized to `0`, to count the correct answers later.
   - `score`, also initialized to `0`, to calculate the user’s score.
   - `userResponses`, an empty array to store the user's responses as they progress through the quiz.
5. **Updating Quiz Attempts**: The new quiz attempt is pushed into the existing `quizAttempts` array, which tracks all attempts.
6. **File Path Configuration**: The API defines the path to the file where `quizAttempts` is stored. This is necessary for updating the data after each new attempt.
7. **Writing to File**: The API generates the updated content for the quiz attempts file. It converts the updated `quizAttempts` array to a JSON format string and writes this back to the file system.
8. **Responding to the Client**: Finally, the API responds with a `200 OK` status, including both the new attempt details and the questions from the quiz.

#### Response:

- **200 OK**: Returns the new quiz attempt details and the quiz questions in JSON format.
- **404 Not Found**: Returns an error message if the quiz with the specified ID is not found.
- **405 Method Not Allowed**: Returns an error message if the request method is not `POST`.

#### Code:

```typescript
import { quizzes } from '@/utils/quiz/demo-data'
import { quizAttempts } from '@/utils/quizAttempt/demo-data' // Import the existing array
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { QuizAttempt } from '@/utils/quizAttempt/type'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Get quizId and userId from the request body
    const quizId = req.body.quizId
    const userId = req.body.userId
    const quiz = quizzes.find((q) => q.id === quizId)

    // If quiz doesn't exist, return an error
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    // Create a new quiz attempt object
    const newAttempt: QuizAttempt = {
      id: 'attempt-' + Math.random().toString(36).substr(2, 9),
      userId: userId,
      quizId: quizId,
      startedAt: new Date().toString(),
      completedAt: null,
      totalCorrect: 0,
      score: 0,
      userResponses: [],
    }

    // Push the new quiz attempt into the quizAttempts array
    quizAttempts.push(newAttempt)

    // Path to the file where quizAttempts is stored
    const filePath = path.join(
      process.cwd(),
      'src/utils/quizAttempt/demo-data.ts',
    )

    // File content with only the updated quizAttempts array
    const updatedContent = `import { QuizAttempt } from "./type";

        export const quizAttempts: QuizAttempt[] = ${JSON.stringify(
          quizAttempts,
          null,
          4,
        )};`

    // Write the updated content back to the file
    fs.writeFileSync(filePath, updatedContent)

    // Respond with the new attempt and quiz questions
    res.status(200).json({ attempt: newAttempt, questions: quiz.questions })
  } else {
    // Method not allowed for requests other than POST
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
```

### 3. Retrieve a Quiz Attempt

- **Endpoint**: `/api/quizAttempt/[attemptId]`
- **Method**: `GET`
- **Description**: This API retrieves the details of a specific quiz attempt based on the attempt ID provided in the query parameters.

#### How It Works:

1. **Request Handling**: The API starts by extracting the `attemptId` from the query parameters of the incoming request.
2. **Validation of `attemptId`**: It checks if `attemptId` is provided and ensures that it is of type `string`. If the `attemptId` is missing or invalid, the API responds with a `400 Bad Request` error and an appropriate error message.
3. **Finding the Quiz Attempt**: The API searches the `quizAttempts` array (imported from the demo data) to find a quiz attempt that matches the provided `attemptId`.
4. **Error Handling**: If no quiz attempt is found with the specified ID, a `404 Not Found` error response is returned, indicating that the quiz attempt does not exist.
5. **Returning the Quiz Attempt**: If a matching quiz attempt is found, the API responds with a `200 OK` status, returning the details of the quiz attempt in JSON format.

#### Response:

- **200 OK**: Returns the details of the requested quiz attempt in JSON format.
- **400 Bad Request**: Returns an error message if the `attemptId` is invalid or missing.
- **404 Not Found**: Returns an error message if no quiz attempt is found with the specified `attemptId`.

#### Code:

```typescript
import { quizAttempts } from '@/utils/quizAttempt/demo-data' // Import your quiz attempts data
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { attemptId } = req.query // Extract attemptId from the query params

  // Validate that attemptId is provided
  if (!attemptId || typeof attemptId !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing attemptId' })
  }

  // Find the quiz attempt by id
  const quizAttempt = quizAttempts.find((attempt) => attempt.id === attemptId)

  // If no quiz attempt is found, return a 404
  if (!quizAttempt) {
    return res.status(404).json({ message: 'Quiz attempt not found' })
  }

  // Return the found quiz attempt
  return res.status(200).json({ quizAttempt })
}
```

### Update a Quiz Attempt

- **Endpoint**: `/api/quizAttempt`
- **Method**: `PUT`
- **Description**: This API updates a specific quiz attempt with user responses and calculates the updated score and correctness based on the selected options for the questions.

#### How It Works:

1. **Request Handling**: The API begins by checking if the request method is `PUT`. If not, it sets the allowed methods to `PUT` and responds with a `405 Method Not Allowed` status.

2. **Extracting Data from Request Body**: It extracts the following data from the request body:

   - `attemptId`: The unique identifier for the quiz attempt being updated.
   - `selectedOptions`: An array of options selected by the user for a specific question.
   - `questionId`: The ID of the question being answered.
   - `quizCompleted`: A boolean indicating if the quiz is completed.
   - `timeTaken`: The time taken by the user to answer the question.

3. **Finding the Quiz Attempt**: The API searches for the quiz attempt in the `quizAttempts` array using the provided `attemptId`. If the attempt is not found, it responds with a `404 Not Found` error.

4. **Retrieving the Associated Quiz**: It retrieves the quiz associated with the quiz attempt. If the quiz does not exist, it returns a `404 Not Found` error.

5. **Initializing Counters**: The API initializes counters for the total number of correct answers (`totalCorrect`) and the score (`totalScore`). It also creates a `Set` to track questions that have already been attempted to avoid duplicate scoring.

6. **Processing Selected Options**:

   - The API iterates through the `selectedOptions`, checking if the question has already been attempted.
   - For each selected option, it retrieves the corresponding question from the quiz.
   - It determines the correct options for the question and checks if the user's selections are correct.
   - The score is updated based on the correctness of the selections. Points are awarded for correct answers and deducted for wrong ones.

7. **Updating User Responses**: The user's responses for the current question are stored in the `userResponses` array of the quiz attempt.

8. **Final Score Update**: After processing all selected options, the API updates the total correct answers and the score for the quiz attempt.

9. **Completing the Quiz**: If `quizCompleted` is `true`, the API updates the `completedAt` timestamp to the current date and time.

10. **Persisting Changes**: The updated `quizAttempts` array is written back to the demo data file, ensuring that the changes are saved.

11. **Response**: The API responds with a `200 OK` status, indicating that the quiz attempt was successfully updated, along with a success message.

#### Response:

- **200 OK**: Returns a success message indicating that the quiz attempt was updated.
- **404 Not Found**: Returns an error message if the quiz attempt or quiz is not found.
- **405 Method Not Allowed**: Returns an error message if the request method is not `PUT`.

#### Code:

```typescript
import { quizzes } from '@/utils/quiz/demo-data' // Import your quiz data
import { quizAttempts } from '@/utils/quizAttempt/demo-data' // Import the quiz attempts array
import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { Option } from '@/utils/quiz/types'
import { UpdateQuizAttemptRequest } from '@/services/types'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const {
      attemptId,
      selectedOptions,
      questionId,
      quizCompleted,
      timeTaken,
    }: UpdateQuizAttemptRequest = req.body // Receive attemptId and selectedOptions

    // Find the quiz attempt
    const attemptIndex = quizAttempts.findIndex((a) => a.id === attemptId)
    if (attemptIndex === -1) {
      return res.status(404).json({ message: 'Quiz attempt not found' })
    }

    // Get the quizAttempt for updating
    const quizAttempt = quizAttempts[attemptIndex]

    // Find the quiz
    const quiz = quizzes.find((q) => q.id === quizAttempt.quizId)
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    // Initialize counters for score and correct answers
    let totalCorrect = 0
    let totalScore = 0
    const attemptedQuestions = new Set<string>() // Track questions already attempted

    // Loop through selectedOptions, assuming it is an array of objects containing questionId and selected options
    selectedOptions.forEach((option: Option) => {
      // Check if the question has already been attempted
      if (attemptedQuestions.has(questionId)) return

      const question = quiz.questions.find((q) => q.id === questionId)

      if (question) {
        // Get correct options for the question
        const correctOptions = question.options
          .filter((opt) => opt.isCorrect)
          .map((opt) => opt.optionText)

        // Check if the user's selected options are correct
        const allSelectedCorrect = selectedOptions.every((opt) =>
          correctOptions.includes(opt.optionText),
        )
        const hasWrongOptions = selectedOptions.some(
          (opt) => !correctOptions.includes(opt.optionText),
        )

        // Update score based on user's selection
        if (
          allSelectedCorrect &&
          selectedOptions.length === correctOptions.length
        ) {
          totalCorrect += 1 // Increment totalCorrect only once
          totalScore += question.correctAnswerScore // Add correct score
        } else if (hasWrongOptions) {
          totalScore += question.wrongAnswerScore // Deduct wrong score only once
        }

        // Update userResponses for the current question
        quizAttempts[attemptIndex].userResponses.push({
          questionId,
          selectedOptions: selectedOptions,
          timeTaken,
        })
        attemptedQuestions.add(questionId) // Mark this question as attempted
      }
    })

    // Update the attempt object with final scores
    quizAttempts[attemptIndex].totalCorrect += totalCorrect // Add to existing totalCorrect
    quizAttempts[attemptIndex].score += totalScore // Update score

    // If the quiz is completed, update the 'completedAt' timestamp
    if (quizCompleted) {
      quizAttempts[attemptIndex].completedAt = new Date().toString() // Set current timestamp
    }

    // Persist the updated quizAttempts to the file
    const filePath = path.join(
      process.cwd(),
      'src/utils/quizAttempt/demo/data.ts',
    )
    const fileContent = `
      import { QuizAttempt } from "./type";
      
      export const quizAttempts: QuizAttempt[] = ${JSON.stringify(
        quizAttempts,
        null,
        4,
      )};
    `

    fs.writeFileSync(filePath, fileContent)

    return res.status(200).json({ message: 'Quiz attempt updated' })
  } else {
    res.setHeader('Allow', ['PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
```
