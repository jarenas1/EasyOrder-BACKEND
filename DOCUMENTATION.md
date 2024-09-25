# EasyOrder

## Overview

**EasyOrder** is a SaaS solution designed to digitize and streamline the ordering process and table management in nightclubs, enhancing both customer experience and operational efficiency.

### Why EasyOrder?
Nightclubs often face delays and inefficiencies when processing customer orders and managing tables. EasyOrder digitizes this process, enabling quicker service, reducing errors, and creating a seamless experience for both patrons and staff.

### Key Objectives
- **For customers**: Provide a fast and intuitive way to place orders from their mobile devices.
- **For staff**: Simplify the management of orders and tables, enabling waiters and administrators to track and process requests more efficiently.

### Target Audience
- **Nightclub users**: Customers who want to order conveniently from their phones.
- **Waitstaff**: Waiters who need an easy way to manage table assignments and orders.
- **Nightclub administrators**: Managers responsible for overseeing order flow and table management.

---

## Core Theme
Nightclub management solution through an innovative SaaS platform, offering real-time ordering and table management.

---

## Team Members
- **Juan José Arenas**: [Email](mailto:juanjoarenas1218@gmail.com) | [LinkedIn](www.linkedin.com/in/juan-josé-arenas-gaviria-144b79249) | [GitHub](https://github.com/jarenas1)
- **Diego Jaramillo**: [Email](97jaramillo@gmail.com) | [LinkedIn](https://www.linkedin.com) | [GitHub](https://github.com/diego97jaramillo)
- **Luis Rubio**: [Email](mailto:member3@example.com) | [LinkedIn](https://www.linkedin.com) | [GitHub](https://github.com/luisruro)
- **Juan Tuiran**: [Email](mailto:member4@example.com) | [LinkedIn](https://www.linkedin.com) | [GitHub](https://github.com/PJuanTuiran)

---

## Github Repository
[GitHub](https://github.com/jarenas1/EasyOrder-BACKEND)

---

## Front-End Architecture

### Overview
The front-end of EasyOrder is designed to provide an intuitive and responsive user interface that enhances the ordering experience for nightclub patrons. The architecture is built using modern web technologies to ensure optimal performance and maintainability.

### Tech Stack
- **Framework**: React
- **State Management**:ontext API
- **Styling**: SCSS for modular and maintainable styles
- **Routing**: React Router for handling navigation
- **API Interaction**: Fetch for making HTTP requests to the backend
- **Build Tool**: Vite for fast development and build processes


### Component Design
- **Reusable Components**: Design components to be reusable across different parts of the application (e.g., buttons, input fields, cards).
- **Presentational vs. Container Components**: Separate presentational components (UI) from container components (logic and state management) to maintain a clear architecture.

### Routing
- Utilize React Router for navigating between pages:
  - **Public Routes**: Accessible to all users (e.g., login, registration).
  - **Protected Routes**: Accessible only to authenticated users (e.g., order page, admin dashboard).

### State Management
- Context API to manage application state:
  - Centralize state management to avoid prop drilling and improve state handling across components.

### API Communication
- Use Fetch for API calls to the backend:
  - Create a service layer to handle API requests, which will encapsulate all the logic for interacting with the backend.


## Back-End Architecture

### Design and Models
- **Database Model**:  
  ![Database Model](https://res.cloudinary.com/dbnfr2vm7/image/upload/v1727305030/Imagen_de_WhatsApp_2024-09-24_a_las_21.45.53_81dbd8bc_eilvtq.jpg)
  
- **Class Models**:  
  ![Class Model](https://res.cloudinary.com/dbnfr2vm7/image/upload/v1727305020/Imagen_de_WhatsApp_2024-09-24_a_las_21.45.53_3f27269c_oc9njk.jpg)
---

## Use Cases

# Use Cases

### 1. **Register Waiter**
   - **Author**: 
   - **Date**: 09/05/2024
   - **Description**: The administrator can register a new waiter in the system by entering their details and assigning them access credentials.
   - **Actors**: Administrator
   - **Preconditions**: 
     - The administrator must be authenticated in the system.
     - The system must be operational.
   - **Main Flow**:
     1. The administrator accesses the system and selects the option to register a new waiter.
     2. The system displays a form for registering a new waiter.
     3. The administrator enters the required information (name, username, password).
     4. The administrator confirms the registration.
     5. The system saves the waiter’s information and confirms the operation.
   - **Alternative Flow**:
     - **4A**: If the administrator does not enter all the required information, the system shows an error message prompting them to complete the missing fields.
   - **Postconditions**: 
     - The new waiter is registered in the system and can log in.

---

### 2. **Assign Table (QR Scan)**
   - **Author**: 
   - **Date**: 09/05/2024
   - **Description**: The waiter scans the QR code of a table to mark it as occupied and associate it with their name.
   - **Actors**: Waiter
   - **Preconditions**: 
     - The waiter must be authenticated in the system.
     - The table’s QR code must be available.
   - **Main Flow**:
     1. The waiter selects the option to scan a table's QR code.
     2. The waiter scans the table’s QR code.
     3. The system validates the code and associates the table's ID with the waiter.
     4. The system updates the table’s status to "Occupied."
   - **Alternative Flow**:
     - **2A**: If the QR code is invalid or cannot be read, the system shows an error message and allows re-scanning.
   - **Postconditions**: 
     - The table is assigned to the waiter and marked as occupied.

---

### 3. **Place Service Request**
   - **Author**: 
   - **Date**: 09/05/2024
   - **Description**: A customer places a service request from their table using the app, which is received by the assigned waiter.
   - **Actors**: Customer
   - **Preconditions**: 
     - The customer must have scanned the table’s QR code to establish the link between the table and the request.
   - **Main Flow**:
     1. The customer opens the app and selects the option to place a request.
     2. The customer enters the details of the request (e.g., "More ice").
     3. The customer confirms the request.
     4. The system receives the request and associates it with the table’s ID.
     5. The system sends the request to the waiter assigned to the table.
   - **Alternative Flow**:
     - **2A**: If the table has not been registered, the system shows an error message prompting the customer to scan the QR code.
   - **Postconditions**: 
     - The request is registered and sent to the waiter.

---

### 4. **Receive Service Request**
   - **Author**: 
   - **Date**: 09/05/2024
   - **Description**: The waiter receives service requests in real-time, identifying the table from which the request originated.
   - **Actors**: Waiter
   - **Preconditions**: 
     - The waiter must be authenticated in the system.
     - There must be pending requests from customers.
   - **Main Flow**:
     1. The system sends a notification of a new request to the waiter.
     2. The waiter views the request on their interface.
     3. The waiter identifies the table of origin and the request details.
     4. The waiter marks the request as "in process."
     5. After attending to the customer, the waiter marks the request as "completed."
   - **Alternative Flow**:
     - **1.1A**: If there are no pending requests, the system does not display notifications.
     - **2.3A**: If the waiter cannot attend to the request immediately, they can mark it as "on hold."
   - **Postconditions**: 
     - The request is processed and updated in the system.

---

### 5. **View Request History**
   - **Author**: 
   - **Date**: 09/05/2024
   - **Description**: The waiter or administrator can view a history of completed requests, filtered by date, table, or waiter.
   - **Actors**: Waiter, Administrator
   - **Preconditions**: 
     - The waiter or administrator must be authenticated in the system.
   - **Main Flow**:
     1. The waiter or administrator selects the option to view request history.
     2. The system displays a list of completed requests with details such as date, time, table, and responsible waiter.
     3. The user can filter the requests by date range, table, or waiter.
     4. The user selects a request to view its complete details.
   - **Alternative Flow**:
     - **2A**: If no requests are found in the selected date range, the system shows a message indicating no results.
   - **Postconditions**: 
     - The request history is viewed and, if necessary, exported or used for analysis.

---

## User Stories

### HU1: **User and Table Management**
- **As an administrator**, I want to manage the creation and deletion of waiters, products, and tables so that I have complete control over who has access to the system and how many tables are managed in the nightclub.
  
  **Acceptance Criteria:**
  - The administrator can create, modify, and delete users (waiters).
  - The administrator can add, modify, or remove available tables from the system.
  - The system must log all administrative activities for auditing purposes.

---

### HU2: **Waiter Authentication**
- **As a waiter**, I want to log in to the application so that I can access order management and customer request functionalities.

  **Acceptance Criteria:**
  - The system must authenticate the waiter upon login, ensuring only valid users can access the system.

---

### HU3: **Table Management**
- **As a waiter**, I want to view the status of each table (free and occupied) so that I can efficiently assign and manage customer requests.

  **Acceptance Criteria:**
  - The waiter can view a list of all assigned tables and their current status.
  - The system must allow tables to be marked as occupied when a customer scans the QR code.
  - The system must update the table's status in real-time.

---

### HU4: **Receiving Customer Requests**
- **As a waiter**, I want to receive customer requests so that I can quickly attend to their needs without delays.

  **Acceptance Criteria:**
  - The system must allow real-time reception of order requests without the need to reload the page.
  - Each request must include details such as the table number, the order, and the time it was placed.
  - Requests should automatically be marked as "new" when received.

---

### HU5: **Request Confirmation**
- **As a waiter**, I want to mark a request as "in progress" and then "completed" so that I can maintain clear control over the status of each request and manage customer expectations.

  **Acceptance Criteria:**
  - The waiter can change the status of the request to "in progress" and "completed."
  - When a request is marked as "in progress," the customer should see the update in their app.
  - When the request is completed, the customer should receive a confirmation that it has been attended to.

---

### HU6: **Submitting Requests as a Customer**
- **As a customer**, I want to submit requests quickly and easily from my table so that I can receive attention without having to physically look for a waiter.

  **Acceptance Criteria:**
  - The customer must be able to submit a request from the mobile interface, linked to the table's QR code.
  - The customer must receive a confirmation that the request was sent and is queued to be attended to.
  - The customer must be notified when their request has been accepted by the waiter.

---

### HU7: **Request History**
- **As an administrator**, I want to access the history of "completed" and "in-progress" requests so that I can review which orders have been previously attended to and which are still in progress, resolving potential discrepancies.

  **Acceptance Criteria:**
  - The administrator can access a log of all completed requests by table.
  - The history must include details of the request, the order, and the time it was attended to.
  - The history must be maintained for the entire session until the customer leaves the table.


---

## Functional Requirements

**FR1**: The system must allow users to scan a QR code to initiate a session.

**FR2**: The system must enable administrators to create, modify, and delete waiters.

**FR3**: The system must enable administrators to add, modify, or delete tables.

**FR4**: The system must authenticate waiters upon login, allowing access only to valid users.

**FR5**: The system must display a list of tables and their status (free/occupied) to waiters in real time.

**FR6**: The system must update the table's status to "occupied" when a customer scans a QR code.

**FR7**: The system must allow customers to submit requests through a mobile interface linked to the table's QR code.

**FR8**: The system must allow real-time reception of customer requests by waiters without requiring a page reload.

**FR9**: The system must notify the waiter of a new request with details such as table number, order, and timestamp.

**FR10**: The system must enable waiters to update the status of a customer request to "in progress" and "completed."

**FR11**: The system must notify customers when their request has been accepted or completed by the waiter.

**FR12**: The system must store and display the history of completed and in-progress customer requests to administrators.

**FR13**: The system must allow the administrator to filter and export the request history by table, date, or waiter for auditing purposes.

**FR14**: The system must log all administrative actions for auditing purposes.


---

## Non-Functional Requirements

## Non-Functional Requirements

**NFR1**: The system must respond to user requests (e.g., submitting orders, scanning QR codes) in less than 2 seconds.

**NFR2**: The system must be available 99.9% of the time to ensure continuous service during operating hours.

**NFR3**: The system must ensure that all data (e.g., customer orders, waiter assignments) is stored securely in compliance with data protection regulations.

**NFR4**: The system must support a minimum of 500 simultaneous users without performance degradation.

**NFR5**: The system must scale dynamically to accommodate increased traffic during peak hours.

**NFR6**: The system must implement role-based access control (RBAC) to ensure that only authorized users (e.g., administrators, waiters) can access specific features.

**NFR7**: The system must encrypt all communication between the mobile application and the backend using HTTPS.

**NFR8**: The system must log all activities related to user management and order processing for auditing purposes.

**NFR9**: The system interface must be user-friendly and intuitive, allowing users (customers, waiters, administrators) to navigate without prior training.

**NFR10**: The system must support multi-language functionality, including at least English and Spanish, for a diverse user base.

**NFR11**: The system must have a response time of less than 5 seconds for database queries related to orders, tables, and user data.

**NFR12**: The system must handle system failures gracefully, ensuring that no data is lost and that the service can recover automatically without user intervention.

**NFR13**: The system must comply with industry-standard security practices, including protection against SQL injection, cross-site scripting (XSS), and other common vulnerabilities.


---

## Project Management

You can track the development progress and assigned tasks via our [Project Management Board](https://jarenas1.atlassian.net/jira/software/c/projects/HU/boards/3?useStoredSettings=true). 
