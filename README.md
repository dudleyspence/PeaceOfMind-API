

# **Peace of Mind API**

**Description**  
The Peace of Mind API is the backend service for the Peace of Mind application, designed to facilitate seamless communication and task management between carers and guardians of elderly patients. This RESTful API supports patient management, task scheduling, progress tracking, user authentication, and comprehensive endpoint testing. The goal is to bridge the communication gap between carers and guardians, providing real-time updates and efficient coordination.

----------

## **Features**

-   **Dual Account Management**: Supports two distinct user roles—guardians and carers—with unique functionalities for each.
-   **Patient Profiles**: Guardians can create and manage patient profiles, including adding personal details and assigning carers.
-   **Task Scheduling**: Guardians can create, edit, and delete tasks with flexible schedules (daily, weekly, or one-time).
-   **Task Completion**: Carers can view daily tasks, mark them as complete, and leave notes for guardians.
-   **Real-Time Updates**: Guardians can track progress in real-time to stay updated on patient care.
-   **Secure Authentication**: User authentication and management via Firebase Authentication ensure robust security.
-   **Endpoint Testing**: Comprehensive endpoint testing with Jest ensures reliability and functionality.
-   **Comprehensive API Documentation**: Detailed documentation for developers to integrate and use the API efficiently.

----------

## **Technologies Used**

-   **Node.js**: JavaScript runtime for building scalable backend services.
-   **Express.js**: Lightweight framework for building RESTful APIs.
-   **MongoDB**: NoSQL database for storing user, patient, and task data.
-   **Mongoose**: ODM for managing MongoDB schemas and data relationships.
-   **Firebase Authentication**: Secure user login and account management.
-   **Jest**: JavaScript testing framework for endpoint and functionality testing.
-   **Railway**: Hosting platform for API deployment.

Access the API Documentation:  
**URL**: [Peace of Mind API Docs](https://peaceofmind-api-production.up.railway.app/docs/)

----------

## **Usage**

### **Guardian Features**
- Create a new patient profile with details like name and date of birth.
- Schedule tasks for the patient with options for daily, weekly, or one-time tasks.
- Monitor task completion status and view notes left by carers.
- Update or delete tasks as needed to reflect changing requirements.

### **Carer Features**
- View the list of tasks scheduled for the day.
- Mark tasks as completed and leave notes for guardians.
- Stay informed about the guardian's updates and task modifications.

----------

## **API Endpoints**

The API provides endpoints to handle tasks, users, patients, and authentication. Key examples include:

### **Users**
- `POST /auth/register`: Register a new guardian or carer using Firebase Authentication.
- `POST /auth/login`: Authenticate a user and retrieve a token.

### **Patients**
- `POST /patients`: Create a new patient profile.
- `GET /patients/{patient_id}`: Retrieve patient details.
- `PATCH /patients/{patient_id}`: Update patient details.
- `GET /patients/{patient_id}/tasks`: Get tasks associated with a patient.

### **Tasks**
- `POST /tasks`: Create a new task for a patient.
- `PATCH /tasks/{task_id}`: Update task details.
- `DELETE /tasks/{task_id}`: Delete a task.
- `PATCH /tasks/complete/{task_id}`: Mark a task as completed and add notes.

For a complete list of endpoints and details, refer to the [API Documentation](https://peaceofmind-api-production.up.railway.app/docs/).
### **Installation**

1. **Clone the repository**:

    ```bash
    git clone https://github.com/dudleyspence/PeaceOfMind-API.git
    cd PeaceOfMind-API
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    The project requires separate `.env` files for different environments. Follow the steps below to configure them:

    1. **Create a `.env.development` file** in the `config` folder:
        ```plaintext
        MONGO_URI=your_mongodb_connection_string_for_development
        ```

    2. **Create a `.env.test` file** in the `config` folder:
        ```plaintext
        MONGO_URI=your_mongodb_connection_string_for_testing
        ```

    3. **Create a `.env.PORT` file** in the `config` folder:
        ```plaintext
        PORT=8000
        ```

    Ensure each `.env` file is placed correctly in the `config` folder as shown in the project structure, and replace the placeholder values (`your_mongodb_connection_string_for_development`, etc.) with your actual configuration values.

4. **Seed the database (optional)**:

    If you wish to populate the database with sample data, run the following command before starting the development server:

    ```bash
    npm run seed
    ```

5. **Run the server**:

    ```bash
    npm start
    ```

6. **Access the API locally**:  

    The API will be available at `http://localhost:8000`.

---

### **Testing**

The Peace of Mind API uses Jest for comprehensive endpoint testing to ensure the integrity of all functionalities. The test cases cover:

- User authentication and role-based actions.
- CRUD operations for patients and tasks.
- Error handling for invalid requests.

To run the tests:

```bash
npm test
```
----------

## **Related Repositories**

<div width="100%" align="center">
<a href="https://github.com/dudleyspence/PeaceOfMind-FE" align="left"><img align="left" width="45%" src="https://github-readme-stats.vercel.app/api/pin/?username=dudleyspence&repo=PeaceOfMind-FE&title_color=0891b2&text_color=ffffff&icon_color=0891b2&bg_color=0f172a&hide_border=true&locale=en" /></a>
<a href="https://github.com/dudleyspence/PeaceOfMind-API" align="right"><img align="right" width="45%" src="https://github-readme-stats.vercel.app/api/pin/?username=dudleyspence&repo=PeaceOfMind-API&title_color=0891b2&text_color=ffffff&icon_color=0891b2&bg_color=0f172a&hide_border=true&locale=en" /></a>
</div>
<br /><br /><br /><br /><br /><br /><br />

----------

## **Contributing**

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add feature-name"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

----------

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.


