# Segregation in MI Public Schools Data Workup and Server

  Welcome to Segregation in MI Public Schools. The goal of this project was to take demographic and resource data on Michigan Schools and use it in interactives that 
show the degree to which our school system is racially segregated. Our project contains several components. The end product was a website that contains an api, which 
serves the data we collected and processed in the early stages of the project, into three dashboard pages that allow the data to be interactively visualized.
The finished product can be found at this address: https://robertodiazbriones.github.io/Proj2_dashboard/. 

  If you want to inspect the dashboard code, you can find it at the following github repo: https://github.com/robertodiazbriones/Proj2_dashboard.

  The present repository contains mostly the code from the earlier stages of the project - the original data, the jupyter notebooks used to clean and manipulate the
 data, and the flask app used to serve the data out in JSON form. 
 
 Files and Folders:
 
 Data - This is the folder that contains all the data we ended up using in the project and our cleaning and exploration operations. The folder contains three .csv
 datafiles and a folder called 'cleaning'.
 
 Data/Cleaning - This is where the Jupyter notebooks that were used to manipulate the data reside. 
 
 Data_Cleaning.ipynb - This is a notebook used to remove percent signs from webscraped demographic values, adjust datatypes and several similar operations
 
 Data_Tables_SQL.txt - This text file contains SQL commands used to test whether the data could be added to an SQL database
 
 Education_finance_exploration.ipynb  - This notebook was used to merge demographic data collected for MI schools with financial data from the US census bureau
 on school districts. The two sets were merged by grouping the school data by district. The district names were manually adjusted in Excel to allow the files to be 
 merged. This notebook also contains some statistical analysis and exploration. 
 
 Flask - This folder is home to a copy of the git repository used to host the finished version of the flask app. The app itself is hosted on Heroku:
https://school-data-server.herokuapp.com/.
 
 app.py - This is the flask app. It reads in two .csv files (School_data.csv and district_data_full_clean.csv) converts them to JSON format and serves them
 at two different URLs.
 
 Templates - This folder containst the HTML and CSS code for the front end of the app. 
 
 index.html - This is the HTML file that controls the appearance of the UI for the flask app. 
 
