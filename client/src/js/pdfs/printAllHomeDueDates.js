import * as jsPDF from 'jspdf';
import * as autoTable from 'jspdf-autotable';
import { checkDate, getSorting, stableSort, today } from '../functions';

const printAllHomeDueDates = (homes, selected) => {
   
    const generateData = (orderedHomes) => {
        let body = [];
        let lengths = [];
        orderedHomes.forEach(home => {
            
            let length = 0;
            const homeValues = Object.entries(home);

            homeValues.forEach(homeValue => {
                if(homeValue[0] != 'home_id' && homeValue[0] != 'home_name'){
                    let data = {};
                    data['name'] = homeValue[0];
                    data['date'] = homeValue[1];
                    body.push(data);
                    length++;
                }
            });

            if(length === 0) {
                body.push({'name': 'up to date', 'date': '-'});
                length++;
            }

            lengths.push(length);
        });

        return { body, lengths };
    };

    const headRows = () => {
        return [{'row_info': 'Row Info', name: 'Name', date: 'Date' }];
    }

    //Save selected homes in new data format. Save only home_id, home_name and any documents that are almost expired / expired -----------
    let tempArray = [];

    homes.forEach((home) => {
        let tempObj = {};

        if(selected.includes(home.home_id)){
            const homeValues = Object.entries(home);
            homeValues.forEach((homeValue) => {
                if((homeValue[0] === "home_id") || (homeValue[0] === "home_name")){
                    tempObj[homeValue[0]] = homeValue[1];
                } else if(isNaN(homeValue[1]) && homeValue[0]!="home_opened"){
                    const dt = new Date(homeValue[1]);
                    if(!isNaN(dt.getTime())){
                        const dateStatus = checkDate(homeValue[1]);
                        if(dateStatus == "almost-expired" || dateStatus == "expired"){
                            tempObj[homeValue[0]] = homeValue[1];
                        }
                    }
                }
            });
            tempArray.push(tempObj);
        }
    });

    //Order homes ascending ---------------------------------------------------------------------------------------------------------------
    const orderedHomes = stableSort(tempArray, getSorting('asc', 'home_name'));
    

    //Alter orderedHomes data format to turn each home's document name and document due date into an object
    const { body, lengths } = generateData(orderedHomes);

    //Alter body to insert an 'outer row' for each home
    let homeIndex = 0;
    let homeValueCount = 0;

    for (var i = 0; i < body.length; i++) {
        
        while(lengths[homeIndex] == 0) {
            homeIndex++;
        }
        var row = body[i];
        
        if(homeValueCount === 0){
            row['row_info'] = {rowSpan: lengths[homeIndex], content: orderedHomes[homeIndex].home_name, styles: {valign: 'middle', halign: 'center'}};
        } 
        
        if(homeValueCount == (lengths[homeIndex]-1)){
            homeIndex++;
            homeValueCount = 0;
        } else {
            homeValueCount++;
        }
    }

    //Create jsPDF and configure --------------------------------------------------------------------------------------------------------
    const pdf = new jsPDF('p', 'pt');
    const text = `Home Docs (Almost Due/Overdue) - ${today()}`;
    let head = headRows();
    head[0]['row_info'] = {content: text, colSpan: 5, styles: {fillColor: [33, 150, 243]}};
    
    pdf.autoTable({
        startY: 60,
        head: head,
        body: body,
        theme: 'grid'
    });

    pdf.save('home-docs.pdf');
};

export default printAllHomeDueDates;