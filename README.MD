*************************** FOR  BACKEND ***********************

<!-- make .env file under Backend folder -->
<!-- Insert this content -->
PORT=5000
DB=UPDATE WITH YOUR MONGO DB URL/USERTABLE     <!-- update with your mongo db url -->



<!-- for run backend code in terminal-->
In USER_TABLE_APP
cd .\Backend\
npm i
npm start



**************************** FOR FRONTEND **************************

<!-- In Frontend Folder -->
<!-- make .env file under my-project folder -->
<!-- Insert this content -->
VITE_API_BASE_URL=http://localhost:5000     <!-- update with your backend port -->



<!-- for run frontend code in terminal  -->
In USER_TABLE_APP
cd .\Frontend\
cd .\my-project\
npm i
npm run dev




