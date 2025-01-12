# React Dashboard with CRUD Functionality

Welcome to the React Dashboard project! This application demonstrates a simple yet powerful CRUD (Create, Read, Update, Delete) dashboard implemented using React and Redux. It interacts with a fake API for demonstration purposes, showcasing various features such as data manipulation, filtering, sorting, validation, and notifications.

---

## Features

- **CRUD Operations**:
  - **Create**: Add new users with real-time validation (no external library used).
  - **Read**: Fetch and display user data from a fake API.
  - **Update**: Edit user details with form inputs and save changes back to the API.
  - **Delete**: Remove users with a confirmation modal before deletion.
- **Filtering and Sorting**:
  - Filter users by name or username.
  - Sort users based on:
    - **Name**
    - **Username**
    - **Email**
    - **Company Name**
- **Validation**:

  - Input validation implemented without a library to ensure proper data handling during the creation of users.

- **Toaster Notifications**:

  - Toast messages for successful or failed CRUD operations, ensuring users are always informed about the application's actions.

- **Redux Store**:

  - Redux is used to manage the application's state, making the code cleaner, more maintainable, and easier to scale.

- **Responsive UI**:

  - Fully responsive design using Bootstrap, ensuring a seamless experience on both desktop and mobile devices.

- **Pagination**:
  - Data is displayed with pagination for improved readability.

---

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**: >=14.x
- **npm**: >=6.x

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate into the project directory::

   ```bash
   cd react-dashboard

   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev

   ```

   File Structure
   Here's an overview of the project's key files and folders:

src/components:

modals: Contains modal components (CreateUserModal, DeleteConfirmationModal).
Header.js & Footer.js: Layout components for the application.
src/pages:

DashboardPage.js: The main dashboard page with CRUD operations, filtering, and sorting.
DetailPage.js: Displays detailed information for a specific user with editing functionality.
src/store:

modules/usersSlice.js: Contains Redux logic for user data (CRUD operations and state management).
src/App.js:

Configures routing for the application.
Key Features in Detail

1. CRUD Operations
   Create: Add new users with a modal form. Includes inline input validation to ensure proper data before submission.
   Read: Fetches user data from the Fake API and displays it in a table with pagination.
   Update: Edit user details and make PUT requests to update the data in the API.
   Delete: Delete one or multiple users with a confirmation modal and real-time updates.
2. Filtering and Sorting
   Filter users by name or username using the search bar.
   Clickable headers allow sorting based on name, username, email, or company name.
3. Validation
   Input fields are validated without using any third-party libraries, ensuring high customizability and lightweight code.
4. Notifications
   Integrated with react-toastify for user-friendly notifications after successful or failed operations.
5. State Management
   All application state is managed using Redux Toolkit for improved structure and readability.
   Libraries and Tools Used
   React: Frontend library for building the user interface.
   Redux Toolkit: State management for predictable and clean code.
   Bootstrap: Responsive design and layout.
   React-Toastify: Notifications for better user feedback.
   JSONPlaceholder: Fake API for demonstration purposes.
   Future Enhancements
   Add support for more advanced filtering options.
   Improve user experience with animations and transitions.
   Integrate a backend API for production-grade use.
   Contributing
   We welcome contributions to improve this project! Feel free to submit a pull request or open an issue.
