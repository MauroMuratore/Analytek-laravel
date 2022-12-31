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
        x: [success, fail],
        type: 'bar',
        orientation: 'h',
        marker: {
            color:[ green , red],
            line: {
                width: 1.5
            }
        }
    }];
    Plotly.newPlot("div-success", data, layout);

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
    for( let path of paths){
        let colorIndex=0;
        path["page_time"].forEach(element =>{
            if(element["page"]==colors[colorIndex].page){
                colorIndex++;
            }
            let col = colors[colorIndex];
            let regex = RegExp(",", "g");
            let name_path = path["path"].replace(regex, ",<br>");
            console.log(name_path);
            let data = {
                y: [name_path],
                x: [element["avg_time"]],
                type: 'bar',
                name: col.page,
                text: element["page"] + " " + element["avg_time"] + "s",
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
    Plotly.newPlot("div-path-time", allData, mylayout);


}


function plotPathCount(dataplot){
    let paths = dataplot["paths"];
    console.log(paths);
    let allData = [];
    for(let path of paths){
        let trace ={
            y: path["path"],
            x: path["count"],
            type: 'bar',
            orientation: 'h',
            marker: {
                line: {
                    width: 1.5
                }
            }
        };
        console.log(path["path"]);
        console.log(path["count"]);
        console.log(trace);

        allData.push(trace);
    }
    console.log(allData);
    Plotly.newPlot("div-path-count", allData);    
    /* let paths = dataplot["paths"];
    let allData = [];
    let colorIndex=0;
    for( let path of paths){
        const color = ring_color[colorIndex];
        colorIndex++;
        let regex = RegExp(",", "g");
        let name_path = path["path"].replace(regex, ",<br>");
        console.log(path["count"]);
        let data = {
            y: path["path"],
            x: path["count"],
            type: "bar",
            orientation: "h",
            marker: {
                color: color,
                line: {
                    width: 1.5
                }
            }
        };
        allData.push(data);
        break;
    };
    Plotly.newPlot("div-path-count", allData); */
    
}