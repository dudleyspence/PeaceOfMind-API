# **Peace of Mind API**

**Description**  
The Peace of Mind API is a RESTful backend developed using Node.js, Express.js, and MongoDB, designed to support the Peace of Mind project. It facilitates seamless interaction between the front-end application and the backend to manage data for geriatric patient care, including task scheduling, progress tracking, and caregiver-patient communication. This API provides endpoints for managing tasks, comments, users, and care plans.

The project uses robust validation and flexible routing to ensure reliability and scalability while integrating Firebase for user authentication. Explore the API documentation [here](https://peaceofmind-api-production.up.railway.app/docs/).

----------

## **Features**

- **Task Management**:  
  Add, delete, and modify care tasks for patients with seamless backend integration.
  
- **Commenting System**:  
  Allow users (guardians and carers) to leave and manage comments on patient tasks.
  
- **User Authentication**:  
  Secure login and user management powered by Firebase Authentication.
  
- **Dynamic Scheduling**:  
  Generate and update care task schedules for carers based on patient needs.
  
- **Progress Tracking**:  
  Record and monitor task completion for geriatric care plans.

- **API Documentation**:  
  Fully documented endpoints for developers, available [here](https://peaceofmind-api-production.up.railway.app/docs/).

----------

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase
- **Hosting**: Railway  
  [Peace of Mind API](https://peaceofmind-api-production.up.railway.app/)

----------

## **How to Use**

### **Using the API**

1. Visit the API documentation at [https://peaceofmind-api-production.up.railway.app/docs/](https://peaceofmind-api-production.up.railway.app/docs/) to explore available endpoints.
2. Use tools like Postman or cURL to interact with the API for managing tasks, patients, and comments.
3. Include Firebase Authentication tokens in the headers for authorized endpoints.

----------

## **Key Endpoints**

### **Patients**
- `GET /patients/{patient_id}`: Retrieve patient details.
- `POST /patients`: Create a new patient profile.
- `PATCH /patients/{patient_id}`: Update patient details.
- `GET /patients/{patient_id}/tasks/{isoDate}`: Fetch tasks for a specific date.

### **Tasks**
- `POST /tasks`: Create a new task for a patient.
- `PATCH /tasks/templates/{template_id}`: Modify a task template.
- `DELETE /tasks/instances/{instance_id}`: Remove a specific task instance.

### **Comments**
- `POST /comments`: Add a comment to a task or patient.
- `GET /patients/{patient_id}/{isoDate}/comments`: Fetch all comments for a specific patient on a particular date.

For a complete list of endpoints, refer to the [API Documentation](https://peaceofmind-api-production.up.railway.app/docs/).

----------

## **Installation**

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
   Create a `.env` file with the following variables:

    ```plaintext
    MONGO_URI=your_mongodb_connection_string
    FIREBASE_CREDENTIALS=your_firebase_credentials
    ```

4. **Run the server**:

    ```bash
    npm start
    ```

----------

## **Future Enhancements**

- **Enhanced Analytics**: Introduce data visualisation features for patient progress.
- **Expanded Task Types**: Add recurring and condition-specific tasks for better care flexibility.
- **Improved User Roles**: Distinguish between different types of carers with specific permissions.

----------

## **Contributing**

Contributions are welcome! Feel free to fork the repository and submit pull requests with your enhancements.

----------

## **Related Repositories**

<div width="100%" align="center">
<a href="https://github.com/dudleyspence/PeaceOfMind-FE" align="left"><img align="left" width="45%" src="https://github-readme-stats.vercel.app/api/pin/?username=dudleyspence&repo=PeaceOfMind-FE&title_color=0891b2&text_color=ffffff&icon_color=0891b2&bg_color=0f172a&hide_border=true&locale=en" /></a>
<a href="https://github.com/dudleyspence/PeaceOfMind-API" align="right"><img align="right" width="45%" src="https://github-readme-stats.vercel.app/api/pin/?username=dudleyspence&repo=PeaceOfMind-API&title_color=0891b2&text_color=ffffff&icon_color=0891b2&bg_color=0f172a&hide_border=true&locale=en" /></a>
</div>
<br /><br /><br /><br /><br /><br /><br />
