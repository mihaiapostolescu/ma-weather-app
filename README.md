# Ma Weather App

Ma Weather App is a Web Application used to display current and future weather data for any major city in the world. The App has limited capabilities and can display faulty data which should be double checked with a more professional weather application.

## Table of contents

- Requirements
- Installation
- Configuration
- Maintainers

# Requirements

To deploy the Weather Web App, we need to:
1. Create a folder on your computer in which you will add the Web application
2. Open the terminal/bash/shell in order to clone the app from GitHub, which can be found at: (https://github.com/mihaiapostolescu/ma-weather-app)
3. install NodeJS, a JavaScript runtime, to run JavaScript code outside of a web browser. More information about NodeJS can be found at the following link: (https://nodejs.org/en/about);
4. run it on a localhost which we will make with the help of a BuildTool, Vite. More information about Vite can be found at the following link: (https://vitejs.dev/guide/).

# Instalation

For the instalation of NodeJS, follow these steps:
1. When the folder is created it will have a path simmilar to "D:\ma-weather-app"
2. With the terminal/bash/shell opened type the following:
- cd "D:\ma-weather-app", then press Enter;
- git clone "https://github.com/mihaiapostolescu/ma-weather-app.git", then press Enter.
3. To install NodeJS, follow these steps:
- Go to the official Node.js website at (https://nodejs.org/);
- Click the "Download" button to download the installer for your operating system (Windows, macOS, or Linux);
- once the installer is downloaded, run it and follow the installation instructions;
- After installation, you can check that Node.js is installed correctly by opening a command prompt or terminal window and typing node -v. This should display the version of Node.js that is installed on your system.
4. For the instalation of Vite you can follow online, follow these steps:
- Open Terminal/bash/shell and type the following:
- type cd "D:\ma-weather-app", then press Enter;
- type "npm install vite --save-dev", then press Enter;
- type cd "D:\ma-weather-app\ma-weather-app", then press Enter;
- type "code ." to open the index.html in Visual Studio Code (ore open manually in other programs);
- type "npm run dev" to start the server which should open a local host at (http://localhost:5173/);
- to exit from the server which was opened in Terminal/bash/shell, type "ctrl + c" / "cmd + c";
- if a local host (http://localhost:8080/) is required, type in the Terminal/bash/shell "npm run build", then press Enter;
- then type "npm run preview".

# Maintainers

- Mihai Apostolescu, can be reached by e-mail at mihaiapostolescu@aol.com for any problems.

# More Information regarding the Weather Web App

1. Kindly use the app in google chrome. It has only been tested for this browser.
2. When accessing for the first time the localhost, if prompted with "localhost would like to access/know/use your current location" kindly accept/allow in order for the App to retrieve data used to display the weather from your current location.
3. The Search for a city to retrieve weather data can be done in two ways:
- pressing Enter, after typing the city name in the search bar. It proceeds to search the database of the OpenWeatherMap in order to check if that city exists and returns more often than not to "please type a city name" error. This is a work in progress functionality.
- left clicking with the mouse on the search icon, after typing the city name in the search bar. It proceeds to search the database and has less errors than the above method. This method is also a work in progress to solve all problems. 
4. More functionalities are on the way, if something is not working, the most probable outcome is that it is work in progress.
5. I add here the API in case it does not work: VITE_API_KEY = "d2b2b380258911c2c5248ab5c7384642"
