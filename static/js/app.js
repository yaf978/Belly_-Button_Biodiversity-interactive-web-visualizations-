// OUTLINE
// 1.  Webpage will have the following:
//     *  Dropdown that will allow selection of a name/id
//     *  Horizontal bar chart that shows data related to only the id
//     *  Bubble chart shows data related only to id
//     *  Summary section that only shows data related to id
// 2.  So every graphic is needs the id and the only part that is independent is the dropdown
// 3.  The dropdown has many options so it needs created dynamically based on what is in the data file
// 4.  The page will load with a default selected id but needs to update based on the dropdown selection
//     *  This tells me that I need to run code once and then same code again with only an id change.
//     *  Thi sounds like a good time to use a function like  `createPlot(id)`
// 5.  Note:  The html already has several things built-in:
//     a.  you are given empty divs with ids called:
//         *  `selDataset` ==> used for the dropdown
//         *  `sample-metadata` ==> used for the summary data section
//         *  `bar` ==> used for the horizontal bar chrt
//         *  `gauge` ==> (optional) used for gauge chart
//         *  `bubble` ==> used for bubble chart
//     b.  There is an inline event handler in the html.  It looks like this:
//         `<select id="selDataset" onchange="optionChanged(this.value)"></select>`
//         This line of code is part of the dropdown, aka in html terms a `select`
//         If you look up the code for a select it is made up of options (dropdown entries)
//         and values associated with each option.  The value for the select is based on what option is selected.
//         i.e.  Dropdown has selected 'Subject 940' and maybe the value associated with this is `940`.
//               The '940' is captured by using 'this.value'... So 'this.value' captures the current selection value.
//               The 'optionChanged()' is a function that you need to make in your app.js that updates
//               some type of data filter that filters the data only related to '940' and then that 
//               data is used in all the charts.
//     c.  On Day 3 we will cover event handlers from the js file but we do not cover inline event handlers in the html.  
//         The only differene is where we call them but otherwise they work the same.
//     d.  You already have the data connected - notice the names list matches the id's used in the 
//         other data structures below.  Inspect the data - there are several sections - which one would 
//         be used for each chart.  Look at the images in the readme and matchup the data.  There is not
//         much that needs done except filtering and ordering of the existing data.



// SAMPLE STRUCTURE
// 1.  Check inspector console to see if each function is running on page load

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// function that contains instructions at page load/refresh
// function does not run until called
// start of init
function init(){
   
    // this checks that our initial function runs.
    console.log("The Init() function ran")
    
    // loading data
    d3.json(url).then((data)=> {
    
        // check the data
        console.log(data.names)

        let selector = d3.select('#selDataset');
        selector.html("")

        // create dropdown/select
        for (let i=0; i<data.names.length; i++){
            let selOptions = selector.append("option")
            selOptions.property("value", data.names[i]);
            selOptions.text(`OTU ${data.names[i]}`);
        }
            // plots functions
            createScatter('940')
            createBar('940')
            createSummary('940')
    })
}
// end of init function


function optionChanged(newID){
    // code that updates graphics
    // one way is to recall each function
    createScatter(newID)
    createBar(newID)
    createSummary(newID)
}

// start of scatter chart
function createScatter(id){
    d3.json(url).then((data) => {
        let myData = data.samples.filter(i => i.id == id)[0]
        let trace1 = {
            x: myData.otu_ids,
            y: myData.sample_values,
            mode: "markers",
            marker: {
                color: myData.otu_ids,
                size: myData.sample_values
            }
        };
        let bdata = [trace1];
        let layout = {
            title: "Bacterias",
            xaxis: {title: "OTU"},
            yaxis: {title: " Amount"}
        };

        Plotly.newPlot('bubble', bdata, layout);
    });
    
    console.log(`This function generates scatter plot of ${id} `)
}
// end of scatter plot

// start of bar chart
function createBar(id){
    
    console.log(`This function generates bar chart of ${id} `)

}

// summary start
function createSummary(id){
    d3.json(url).then((data) => {
        let myData = data.metadata.filter(i => i.id == id)[0]
        console.log(myData)
        let summary = d3.select('#sample-metadata');
        summary.html("")
        Object.entries(myData).forEach(([k, v]) => {
        summary.append("p").text(`${k}:${v}`)    
        })
    })
    console.log(`This function generates summary info of ${id} `)
}
// summary ends


init()





