GitHub repo link:
https://github.com/prithwishpyne/finance-tracker-full-prithwish/tree/develop

Deployed URL: http://15.207.14.111:3000 (Port 80 for Python service)
Deployed environment: AWS EC2 instance (t2.micro)

Setup Instructions:

1.	Download the codebase zip from the github link and extract it ---OR--- clone the code into the local system.
2.	Open the folder in any IDE. (Eg: VSCode)
3.	For running the service(backend) - Python is required (v3.12.6 or above):
a.	Open up the terminal
b.	Navigate to the backend folder using cd .\backend\
c.	RUN the command: pip install -r requirements.txt
d.	After the completion of the above command,
i.	RUN the command: python -m uvicorn main:app --reload 
The python service should now be running on localhost:8000.

4.	For running the UI (frontend) - Node must be installed on the machine:
a.	Open up a new terminal
b.	Navigate to the backend folder using cd .\frontend\
c.	RUN the command: npm install
d.	After the completion of the above command, RUN command: npm run dev
The Reactjs UI should now be running on localhost:3000

5.	Open up your browser and go to "localhost:3000" (If browser doesn't automatically open up)

Deployed App constraints:

1. Removed the charts feature/module from the application, as I was unable to deploy it when it was present. Was getting "JavaScript Heap Memory" Issue every time - (React App, Vite App, Chartjs, ReCharts)
2. Google Sign-In wont work in the deployed app as I have mentioned my project URL as "localhost:3000" in the Supabase configuration. (So that End-to-End working can be seen in the locally run application.)

Tech Stack Used: 

Backend: Python FASTAPI
Frontend: Reactjs (React Vite App)
Database: PostgreSQL with Supabase

Features Implemented: 

All the features required have been implemented in the application. (Implemented Redux only in the Dashboard as there were multiple states there)
Implemented bonus features as well - Dark Mode Toggle and Responsive Design for Tablet/Mobile viewing.

Additional Notes:
Created a dummy user for logging into the application. Added dummy transactions, assets, liabilities so that all data/charts are visible. (In the deployed app however, the charts will not be available, everything else is the same)
Email/username: testuser@gmail.com
Password: password
