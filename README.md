# Genetec Police Data by Obi

# Deploy

Please choose to view via the online/offline versions

- Online Build: https://obi-genetec-police.netlify.app/
- Offline Build
	- Open your command line and run:  `git clone https://github.com/hashtagobi1/police-data.git`
	- Install packages via: `yarn add`
	- Start Project via:  `yarn start`
	- Open in browser: http://localhost:3000/

# How To Use
There are 2 views: **Choropleth Map** & **Bar Chart**

**Choropleth Map View**
- Click 'Retrieve Data' to pull the data from the data base. 
- Then click 'Draw Map' to view 

**Bar Chart**
- click 'Show barchart'
- displays a list of all Arson Crimes in Barking + Dagenham in the last 24 months.

# Shortcomings:
I am aware there are a few bugs, and I thought it would be considerate of me to point them out here:
- The x axis should display each month instead they all show '201905' with the correct amount of offcences 
	- additionally, it renders 1547 times which corresponds with the amount of rows pulled from the police database.
- I would have wanted to show a tooltip that shows the name of the Borough of London when you hover over it.

These errors were due to me not being able to figure out how to map thru + access a nested array of objects.

