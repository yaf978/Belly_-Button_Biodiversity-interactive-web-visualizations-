// data source
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
            title: "Microbes",
            xaxis: {title: "OTU"}
        };

        Plotly.newPlot('bubble', bdata, layout);
    });
    
    console.log(`This function generates scatter plot of ${id} `)
}
// end of scatter plot

// start of bar chart
function createBar(id){
    d3.json(url).then((data) => {
        let myData = data.samples.filter(i => i.id == id)
        let trace = {
            y: myData[0].otu_ids.slice(0, 10).map(i => `OTU ${i}`).reverse(),
            x: myData[0].sample_values.slice(0, 10).reverse(),
            text: myData[0].otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        };
        let barData = [trace];

        let barLayout = {
            title: "top 10 OTUs",
        };

        Plotly.newPlot('bar', barData, barLayout);
    });
    console.log(`This function generates bar chart of ${id} `)

}
// end of bar

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





