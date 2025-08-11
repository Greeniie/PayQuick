# PayQuick (Interswitch task)
This is simple but functional Frontend ReactJS application for a digital payments  dashboard that demonstrates my ability to architect, build, and manage a production- ready UI using ReactJS and Redux.


## Setup Instructions

1. Clone the repository
2. cd PayQuick
3. Install dependencies using npm or yarn
4. Start the development server using npm run dev

## Login Credentials (you can find this in the profile.json as well)
username: tejiri
password: password123

## MOCK DATA

The app uses mock JSON data for profile and transactions located in the /src/mockdata/ folder. The data is imported directly, no additional backend setup required.

## SCREENSHOTS

### loading screen

![loading screen](./screenshots/ss4.png)

### login page

![login_page](./screenshots/ss3.png)

### Transactions Table with Sorting & Export

![Transactions Table](./screenshots/ss2.png)


### logout button

![logout_button](./screenshots/ss1.png)


ARCHITECHURAL DECISIONS
1. React Functional Components with Hooks:
The app is built using modern React functional components and hooks (useEffect, useMemo) for state and lifecycle management, which offers cleaner and more maintainable code.

2. Data Loading via Direct JSON Imports:
Mock data (profile and transactions) is stored as JSON files in the src/mockdata directory and imported directly. This simplifies data loading during development without needing an API server or additional fetch requests.

3. Material React Table for Transactions:
The transactions list uses Material React Table for robust data table features like sorting, pagination, filtering, and easy export options.

4. Conditional Styling for Amounts:
Amounts are color-coded dynamically — positive amounts are green, negative amounts red — improving readability and quick status recognition.

5. Responsive Layout with Tailwind CSS:
The UI uses Tailwind CSS utility classes for responsive, mobile-friendly layouts with minimal custom CSS.

6. Export Functionality:
Users can export transactions in CSV format with options to export all data, filtered rows, current page, or selected rows, enhancing usability for reporting.

7. Redux
It uses Redux as the global state management tool mostly for auth.

8.Antd and Antd icons
