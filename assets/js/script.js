window.addEventListener('load', async e => {
    console.log("$$ IN window.addEventListener $$");

    let firstRunEverr = localStorage.getItem("demofe3-firstRunEv1");

    console.log("demofe3-FirstRunEv", firstRunEverr);
    if ((firstRunEverr == null) || (firstRunEverr == undefined)) {
        localStorage.clear();
        localStorage.setItem("demofe3-firstRunEv1", "1");

    }

    await initApp();
    await updateData();

});


function findManagerFromLS(ID) {
    // const objArray = employeedata; //await  JSON.parse(localStorage.getItem("local_employee"));
     //console.log("In  findManagerFromLS", objArray)
     return filterObj = employeedata.filter(function(e) {
         // console.log("objArray.filter", e.EMPID)
         return e.EMPID == ID;
     })[0];
 }
 
 
 function findTeamFromLS(PID) {
     const objArray = JSON.parse(localStorage.getItem("demofe3-local_data"));
     return filterObj = objArray.filter(function(e) {
         return e.PUUID == PID;
     });
 }
 


function initApp() {
    console.log("In Init App")
}

async function updateData() {
    console.log("In UPDATEDATA")
    //var res = await fetch(`./data1.json`);
    employeedata = await fetch('./employeeV2.json').then(emp=>emp.clone().json());
    metaFactdata = await fetch('./metaFactV2.json').then(met=>met.clone().json());
    console.log('look GEORGE1..employees...', employeedata);
    // metaFactdata
    console.log('look GEORGE2..files...', metaFactdata);


    //var localInfo = await res.json();
    var localemployeedata = employeedata;
    var localmetaFactdata = metaFactdata;
    //await localStorage.setItem(`demofe3-local_data`, JSON.stringify(localInfo));
    await localStorage.setItem(`demofe3-local_employee`, JSON.stringify(localemployeedata))
    await localStorage.setItem('demofe3-local_metaFact', JSON.stringify(localmetaFactdata))

    // debug asssistance below..
    //console.log(typeof(res))
    // console.log(typeof(localInfo))
    // console.log(typeof(localemployeedata))
    // console.log(typeof(localmetaFactdata))
    // //console.log(res)
    // console.log(localInfo)
    // console.log(localemployeedata)
    // console.log(localmetaFactdata)

    createEmployeeTable(localemployeedata)
}


function createEmployeeTable(str){
    // console.log("got a string", str)    
    //myUsers.innerHTML = "";
    var temp = `
    <table class="table">
                      <thead class=" text-primary">
                        <th>
                          User
                        </th>
                        <th>
                          Avatar
                        </th>
                        <th>
                          Name
                        </th>
                        <th>
                          Email
                        </th>
                        <th>
                          Manager
                        </th>
                      </thead>
                      <tbody>`;
    
    // console.log("in table is here, going to generate with following", str);
    
    //str.map( e => console.log (e))
    
    // str.map (( item, index ) => {
    //     console.log("index is ", index)
    //     console.log("item is ", item)
    
    // })
    
    temp += str.map( e => {
        var locMan = findManagerFromLS(e.managerID)
        RandomNumber = Math.floor((Math.random() * 10000) % 16) + 1
        let randomImage = "/assets/img/faces/" + RandomNumber + ".png"
    
        // console.log("locManID", locMan)
        if (locMan != null ) {
        return `
        <tr>
        <td>
        <a href="dashboard.html?id=${e.EMPID}"><span class="btn btn-block btn-primary">${e.firstName} <span class="fa fa-folder-open"></span></span></a>
        </td>
        <td>
        <img src="${randomImage}" alt="Avatar" class="avatar">
        </td>
        <td>
        ${e.firstName} ${e.lastName}
        </td>
        <td>
        ${e.email}
        </td>
        <td class="text-primary">
        ${locMan.email}
        </td>
        </tr>

    `}}).join('\n')
    
    //
    
      temp += `</tbody>
    </table>`
    
    ;
    
    // console.log(myUsers);
    
    //myUsers.innerHTML = temp;
    document.getElementById("user-table-list").innerHTML = temp
    }

