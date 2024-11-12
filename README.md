Segment Creator
This project is a web application for creating and managing custom segments with user-defined schemas. It is deployed on Netlify and styled using Tailwind CSS. A serverless function is implemented to handle POST requests through a proxy, helping to avoid CORS issues.

Features
Dynamic Segment Creation: Add custom schemas to build your query.
Styled with Tailwind CSS: Clean and responsive design for a seamless user experience.
Serverless Proxy: A Netlify serverless function is used to send POST requests while avoiding CORS errors.
Webhook Testing: Integration with webhook.site for testing server requests. Visit Webhook Testing Link to check incoming data.
Technologies Used
React: For building the user interface.
Tailwind CSS: For styling the application.
Axios: For making HTTP requests.
Netlify Functions: To handle serverless backend logic.
Webhook.site: For testing API requests.
Setup Instructions
Clone the Repository

bash
Copy code
git clone https://github.com/<your-username>/<repo-name>.git  
cd <repo-name>  
Install Dependencies

bash
Copy code
npm install  
Run Locally

bash
Copy code
npm start  
Build and Deploy
To create a production build:

bash
Copy code
npm run build  
Deploy the build folder to Netlify or any static hosting service.

Netlify Deployment
The application is deployed on Netlify, and serverless functions are used for backend tasks. Ensure the following file structure for Netlify deployment:

bash
Copy code
/project-root  
  ├── public/  
  ├── src/  
  ├── netlify/  
      └── functions/  
          └── proxy.js
Serverless Proxy
The serverless function (proxy.js) is located in the netlify/functions directory. It handles POST requests and forwards payloads to the specified endpoint.

Proxy URL:
Development: http://localhost:8888/.netlify/functions/proxy
Production: https://your-netlify-site.netlify.app/.netlify/functions/proxy
Test API:
Data is forwarded to webhook.site. Visit the link to view incoming requests.

Testing the Application
Add a segment name and schemas in the UI.
Save the segment.
The data is sent as a POST request to the serverless proxy, which forwards it to the webhook site.
View the submitted payload at webhook.site.
Acknowledgments
Webhook.site for providing a reliable testing environment.
Netlify for free deployment and serverless function support.
Tailwind CSS for effortless styling.
Feel free to fork and contribute to this project!
