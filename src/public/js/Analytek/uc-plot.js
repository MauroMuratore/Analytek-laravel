const blue = "#1f77b4";
const green = "#14f544";
const red = "#f51414";
const orange = "#ff7f0e";
const ring_color = [blue, orange, green, red];
const layout = {
    plot_bgcolor: '#040220',
    paper_bgcolor: '#040220',
    font: {
        color: "#f2f2f2"
    }
};
$('document').ready(drawPlot());


async function drawPlot() {
    let index = window.location.pathname.split("/").slice(-1);
    let address = "/api/data_uc/" + index;
    const dataplot = await $.get(address);
    $('#div-time').ready(plotMaxAvgTime(dataplot));
    $('#div-success').ready(plotSuccessRate(dataplot));
    $('#div-path-count').ready(plotPathCount(dataplot));
    $('#div-path-time').ready(plotPathTime(dataplot));
    

}

function plotMaxAvgTime(dataplot){
//create plot for time average and max time
    const max_time = dataplot["max_time"];
    const avg_time = dataplot["avg_time"];
    let data = [{
        y: ["max_time", "avg_time"],
        x: [ max_time, avg_time],
        type: 'bar',
        orientation: 'h',
        hoverinfo:'text',
        text: [max_time.toFixed(2) + " s", avg_time.toFixed(2) + " s"],
        marker: {
            line: {
                width: 1.5
            }
        }
    }];

    Plotly.newPlot("div-time", data, layout);
}

function plotSuccessRate(dataplot){
    const success = dataplot["success_rate"];
    const fail = dataplot["fail_rate"];
    let data=[{
        y: ["success", "fail"],
        x: [success*100, fail*100],
        domain: [0, 100],
        type: 'bar',
        orientation: 'h',
        hoverinfo:'text',
        text: [success.toFixed(2)*100, fail.toFixed(2)*100],
        marker: {
            color:[ green , red],
            line: {
                width: 1.5
            }
        }
    }];
    let mylayout =  {
        plot_bgcolor: '#040220',
        paper_bgcolor: '#040220',
        xaxis:{
            range:[0,100]
        },
        font: {
            color: "#f2f2f2"
        }    
    };
    Plotly.newPlot("div-success", data, mylayout);

}

function plotPathTime(dataplot){
    let paths = dataplot["paths"];
    let man_pages = JSON.stringify(dataplot["man_pages"]);
    let colors=[];
    let counter =0;
    let array_pages = man_pages.split(",");
    for(let i=0; i<array_pages.length; i++){
        let page=array_pages[i].replace("\"", "");
        let color = ring_color[counter];
        colors.push({"page" : page , "color" : color});
        counter++;
        if(counter>ring_color.length){
            counter=0;
        }
    }
    let allData = [];
    
    let used_page = [];
    let max_time={
        name: 'max_time',
        x: [],
        y: [],
        orientation: 'v',
        type: 'scatter',
        marker: {
            color: "#ffff00",
            
        }
    };
    for( let path of paths){
        let colorIndex=0;
        let time_path =0;
        let time_section =0;
        path["page_time"].forEach(element =>{
            if(element["page"]==colors[colorIndex].page){
                colorIndex++;
                time_section=0;
            }
            let col = colors[colorIndex];
            let regex = RegExp(",", "g");
            let name_path = path["path"].replace(regex, ",<br>");
            time_path+= element["avg_time"];
            time_section+= element["avg_time"];
            max_time.x.push(dataplot["max_time"]);
            max_time.y.push(name_path);
            
            let data = {
                y: [name_path],
                x: [element["avg_time"]],
                type: 'bar',
                name: col.page,
                hoverinfo: 'text',
                text: "page: " + element["page"] +  "<br>" +
                    "timepage: " + element["avg_time"] + "s <br>" +
                    "timesection: "+ time_section+"s <br>"+
                    "timepath: " +time_path+"s",
                orientation: 'h',
                marker: {
                    color: col.color,
                    line: {
                        width: 1.5
                    }
                }
            };
            if(!used_page.includes(col.page)){
                used_page.push(col.page);
                data.showlegend = true;
            }
            else{
                data.showlegend=false;
            }
            allData.push(data);
        });
    };
    let mylayout = layout;
    mylayout.barmode= 'stack';
    console.log(allData);
    
    allData.push(max_time);

    Plotly.newPlot("div-path-time", allData, mylayout);


}


function plotPathCount(dataplot){
    let paths = dataplot["paths"].reverse();
    let allData = [];
    let colorIndex =0;
    for(let path of paths){
        let regex = RegExp(",", "g");
        let name_path = path["path"].replace(regex, ",<br>");
        let trace ={
            y: [name_path],
            x: [path["count"]],
            type: 'bar',
            orientation: 'h',
            hoverinfo:'text',
            text: path["count"],
            marker: {
                line: {
                    width: 1.5
                }
            },
            showlegend: false,
        };
        allData.push(trace);
        colorIndex++;
        if(colorIndex >= ring_color.length){
            colorIndex=0;
        }

    }
    Plotly.newPlot("div-path-count", allData, layout);    
    
}