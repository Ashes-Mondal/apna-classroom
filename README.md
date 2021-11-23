# Apna Classroom

Welcome to Apna Classroom, a specialized online classroom system for ABV-IIITM.

![](./docs/images/classroompage.png)

> More screenshots at the end

## Features

### General

- Secure authentication
- Email-based password updation
- Registration-free
- Site-integrated VC service

### Students

- Automatic enrollment in relevant classrooms
- Make announcements
- Comment on posts
- Submit assignments
- See subject-wise results and compare with the class averages
- Join VC room for a class they are enrolled in

### Teachers

- Create new classrooms for their subject
- Make both announcements and assignments
- Add and remove students
- Add and remove class assistants
- Mark student submissions
- View class performance
- Join VC room for a class they teach

### Administration

- Add new users to the system
- Bulk add users through CSV
- View users by role
- Update user data
- Disable users

## Security, Authentication and Verification

Apna Classroom uses a secure JWT system to maintain user sessions and ensure authorized usage. Users are divided into roles - `student`, `teacher` and `admin` which determine access control for the various features.

Sensitive keys, such as for database access and google services, are kept in an untracked `.env` environment file.

The application is restricted to the `.iiitm.ac.in` domain to prevent interference from external sources.

## Running The Application (Local Setup)

Clone the repository

```bash
git clone https://github.com/Ashes-Mondal/apna-classroom.git
```

Install the node modules

```bash
cd frontend/
npm i

cd ../backend/
npm i
```
At this point you can add a .env file in the backend directory. Ensure that you arer still in the backend directpry, and now we can run the application by running:

```bash
npm run dev
```

## API Reference

### Public Routes

- `/login` : User authentication with email and password for new session
- `/files/download` : Uploaded files access links
- `/sendResetPasswordEmail` : Request forgot password email
- `/resetPassword` : Send password change request

### Student Routes

- `/logout` : User end session
- `/getUserInfo` : Get user details including enrolled classrooms
- `/unrollStudentFromClassroom` : Unenroll from a classroom
- `/postAnnouncement` : Create a new announcement if authorized
- `/getAssignmentDetails` : Get assignment details if authorized
- `/getUpcomingAssignments` : Get detalis for pending work (unsubmitted only)
- `/getUserClassAssignments` : Get aggregate data of submissions for an assignment for a class for all users
- `/getClassroomDetails` : Get details of a classroom if authoroized
- `/getPostFeed` : Get a chronological list of announcements and assignments
- `/validMeetAccess` : Authorize user to access a VC room
- `/postComment` : Post a comment under a post
- `/postSubmission` : Make a submission for an assignment. Includes files upload
- `/getSubmission` : Get details for a specific submission if authorized
- `/getSubmissions` : Get details for all submissions in a classroom if authorized
- `/getPeopleInClassroom` : Get list of users that can access specified classroom
- `/getStudentAverageGraphData` : Get normalized results data for graph 1
- `/getStudentAssignmentsGraphData` : Get normalized results data for graph 2

### Teacher Routes

- `/createClassroom` : Create a new classroom. VC room is assigned automatically. Relevant students are enrolled automatically
- `/postAssignment` : Post an assignment in a classroom
- `/removeStudentFromClassroom` : Remove a student from the classroom
- `/addStudentToClassroom` : Add a student into the classroom
- `/addAssistantToClassroom` : Add an assistant to the classroom
- `/removeAssistantFromClassroom` : Remove an assistant from the classroom
- `/saveMarks` : Update marks on a student's submission

### Admin Routes

- `/register` : Register a new user or users
- `/disable` : Disable a specific user
- `/getUserList` : Get a list of all users in the system
- `/updateUser` : update details for a user
- `/getAllBatchCodes` : Get a list of batch codes available for students

## Reports
- [Software Engineering Proposal](./docs/reports/Group%202%20Software%20Engineering%20Proposal.pdf)
- [SRS Document](./docs/reports/Group%202%20SRS%20Document.pdf)
- [Software Project Management Document](./docs/reports/Group%202%20Software%20Project%20Management%20Document.pdf)
- [Software Design Document](./docs/reports/Group%202%20Software%20Design%20Document.pdf)
- [Software Testing Report](./docs/reports/Group%202%20Software%20Testing%20Report.pdf)

## Screenshots

![](./docs/images/auth.png)
![](./docs/images/admin.png)
![](./docs/images/adminupload.png)
![](./docs/images/adminupload.png)
![](./docs/images/admin2.png)
![](./docs/images/newclass.png)
![](./docs/images/classroompage.png)
![](./docs/images/classroompeople.png)
![](./docs/images/newann.png)
![](./docs/images/newasg.png)
![](./docs/images/assignmentpage.png)
![](./docs/images/attachment.png)
![](./docs/images/submissions.png)
![](./docs/images/marking.png)
![](./docs/images/classperformance.png)
![](./docs/images/meeting.png)
