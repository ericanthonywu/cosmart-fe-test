# BookList Component

The `BookList` component is a React client-side page that displays a list of books based on a selected genre. Users can navigate between pages, book a schedule for a specific book, and set a pickup time through a popup modal.

## Features

- Displays a list of books with details such as title, authors, and edition count.
- Allows users to filter books by genre using an input field.
- Pagination to navigate through the list of books (with a configurable limit per page).
- Popup modal to book a schedule for a specific book, allowing users to set a pickup time.
- Integration with a `useGetBooksQuery` hook to fetch books and a `useAddScheduleMutation` hook to schedule pickups.

---

## Tech Stack

- **React**: Core library for building the UI.
- **Tailwind CSS**: For styling the page and components.
- **React Query**: For managing server-state data fetching and mutations.
- **Moment.js**: For handling date and time formatting.
- **React Toastify**: For displaying success and error messages.
- **Jest**: Testing framework for running unit tests.
- **React Testing Library**: For rendering components and simulating user interactions in tests.

---

## Prerequisites

1. Ensure you have the following installed:

   - **Node.js** (version 16 or later recommended)
   - **npm** or **yarn**
2. Setup `.env` file with following key:
    - NEXT_PUBLIC_API_URL=(your backend url)

---

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/ericanthonywu/cosmart-fe-test
   cd cosmart-fe-test
   ```
2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```
4. Open the application in your browser: http://localhost:3000

## Running Unit Tests
Unit tests are written using Jest and React Testing Library to validate the functionality of the BookList component.

Steps to Run Tests
1. Run the test suite:

    ```bash
    npm run test
    # or
    yarn test
    ```
   This will execute all test cases in the project, including the ones for the BookList component.

2. To run tests in watch mode (for active development):

    ```bash
    npm run test:watch
    # or
    yarn test:watch
    ```
   
3. To check code coverage:

    ```bash
    npm run test:coverage
    # or
    yarn test:coverage
    ```
   This will generate a coverage report that shows which parts of the code are tested.

## Key Tests
The following test cases are covered for the BookList component:

1. Rendering:

   - Ensures the component renders the book list and other UI elements.
2. Genre Filtering:
   - Verifies that books are filtered by genre and the query is refetched when the genre changes.

3. Popup Behavior:
   - Tests the opening and closing of the schedule booking popup.
4. Schedule Mutation:
   - Validates the schedule creation process with proper error and success handling.
5. Pagination:
   - Ensures pagination buttons behave correctly.

## Troubleshooting
If you encounter issues:
1. Dependencies: Ensure all dependencies are installed by running npm install or yarn install.
2. Test Errors: Check the test logs for detailed error messages and resolve any missing mock setups or configurations.



