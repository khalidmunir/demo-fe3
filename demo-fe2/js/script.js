//var myButton = document.getElementById("clickButton");
var myText = document.getElementById("helloText");
var myUsers = document.getElementById("user-list");
// console.log(myUsers)

var employeedata;
var metaFactdata;

function findManagerFromLS(ID) {
   // const objArray = employeedata; //await  JSON.parse(localStorage.getItem("local_employee"));
    //console.log("In  findManagerFromLS", objArray)
    return filterObj = employeedata.filter(function(e) {
        // console.log("objArray.filter", e.EMPID)
        return e.EMPID == ID;
    })[0];
}


function findTeamFromLS(PID) {
    const objArray = JSON.parse(localStorage.getItem("local_data"));
    return filterObj = objArray.filter(function(e) {
        return e.PUUID == PID;
    });
}



function createEmployeeTable(str){
// console.log("got a string", str)    
myUsers.innerHTML = "";
var temp = `<table class="table table-sm">
<thead>
  <tr>
    <th scope="col"> </th>
    <th scope="col">Avatar</th>
    <th scope="col">First</th>
    <th scope="col">Last</th>
    <th scope="col">Email</th>
    <th scope="col">ManagerID</th>
  </tr>
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
    let randomImage = "images/" + RandomNumber + ".png"

    // console.log("locManID", locMan)
    if (locMan != null ) {
    return `
<tr> 
<td class="align-middle"><a href="detail3.html?id=${e.EMPID}"><span class="btn btn-block btn-primary">${e.firstName} <span class="fa fa-folder-open"></span></span></a></td>
<td class="align-middle"> <img src="${randomImage}" alt="Avatar" class="avatar"> </td>
<td class="align-middle">${e.firstName}</td>
<td class="align-middle">${e.lastName}</td>
<td class="align-middle">${e.email}</td>
<td class="align-middle">${locMan.email}</td>
</tr>`}}).join('\n')

//

  temp += `</tbody>
</table>`

;

// console.log(myUsers);

myUsers.innerHTML = temp;
}

//myButton.addEventListener('click', doSomething, false)



async function doSomething() {
    var results = await fetch(`./data1.json`);


    await console.log("results", results)
    await console.log("results stringify", JSON.stringify(results))


    await localStorage.setItem(`fetchedData`, JSON.stringify(results))

    myText.textContent = "hello, world!";

    // 	myText.textContent += results.map((src, index) => `

    //                 <div class="">
    //                     <div class="col-lg-4 col-md-4 col-sm-6 col-12" class="card">
    //                         <img class="event-image" src="https://go2masjid.com/site/masjid-admin/${src.fimg}">
    //                         <h4 class="text-center" style="color:#2c3e50">${src.fname}</h4>
    //                         <p class="text-center" style="color:#2c3e50">${src.fdate}</p>
    //                         <p class="text-center" style="color:#2c3e50">${src.fdesc}</p>

    //                     </div>
    //                 </div>

    //             `).join('\n')

    console.log("i and item ", index)
    console.log("i and src ", src)

}





window.addEventListener('load', async e => {
    console.log("$$ IN window.addEventListener $$");

    let firstRunEverr = localStorage.getItem("firstRunEv1");

    console.log("FirstRunEv", firstRunEverr);
    if ((firstRunEverr == null) || (firstRunEverr == undefined)) {
        localStorage.clear();
        localStorage.setItem("firstRunEv1", "1");

    }

    //await initApp();
    await updateData();

});

function initApp() {
    console.log("In Init App")
}



async function updateData() {
    console.log("In UPDATEDATA")
    var res = await fetch(`./data1.json`);
    employeedata = await fetch('./employeeV2.json').then(emp=>emp.clone().json());
    metaFactdata = await fetch('./metaFactV2.json').then(met=>met.clone().json());
    console.log('GEORGE1', employeedata);
    // metaFactdata
    console.log('GEORGE2', metaFactdata);


    var localInfo = await res.json();
    var localemployeedata = employeedata;
    var localmetaFactdata = metaFactdata;
    await localStorage.setItem(`local_data`, JSON.stringify(localInfo));
    await localStorage.setItem(`local_employee`, JSON.stringify(localemployeedata))
    await localStorage.setItem('local_metaFact', JSON.stringify(localmetaFactdata))

    console.log(typeof(res))
    console.log(typeof(localInfo))
    console.log(typeof(localemployeedata))
    console.log(typeof(localmetaFactdata))
    console.log(res)
    console.log(localInfo)
    console.log(localemployeedata)
    console.log(localmetaFactdata)
    createEmployeeTable(localemployeedata)
}


//     myText.innerHTML = `<div class="container">
//         <div class="row">`
//     myText.innerHTML += localInfo.map((src, index) => `
    
    
//             <div class="col-md-6">
//                 <div class="well well-sm">
//                     <div class="row">
//                         <div class="col-xs-3 col-md-3 text-center">
//                             <img src="${src.Image}" alt="${src.FirstName} ${src.LastName}"
//                                 class="img-rounded img-responsive" />
//                         </div>
//                         <div class="col-xs-9 col-md-9 section-box">
//                             <h2>
//                                 <a href="detail.html?id=${src.UUID}"><button class="btn btn-primary">${src.UserName} <span class="fa fa-folder-open"></span></button></a> <a href="detail.html?id=${src.UUID}" target="_blank">
//                                 </a>
//                             </h2>
//                             <p>
//                                 <a href="detail.html?id=${src.UUID}"><label class="name lead">${src.FirstName} ${src.LastName}</label></a>
//                             </p>
//                             <p>
//                                 <a href="detail.html?id=${src.UUID}"><label class="name lead">${ !(src.PUUID) ? '<button class="btn btn-success ">Team Leader</button>' : '<button class="btn btn-warning">Team Member</button>' } </label></a>
//                             </p>
//                             <hr />
//                             <div class="row rating-desc">
//                                 <div class="col-md-12 ">
//                                     <span class="fa fa-database"></span> <span class="green fa fa-check"></span> <span class="separator">|</span>
//                                     <span class="red fa fa-file"></span> <span class="red fa fa-times-circle">
//                                     </span> <span class="separator">|</span>
//                                     <span class="fa skull-crossbones"></span>(${src.TotalFiles} Total)
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
    
    

//             `).join('\n')
// }



//     myText.innerHTML += `        </div>
//     </div>
// `



/* 


<div class="container">
    <!-- contacts card -->
    <div class="card card-default" id="card_contacts">
        <div id="contacts" class="panel-collapse collapse show" aria-expanded="true" style="">
            <ul class="list-group pull-down" id="contact-list">
                <li class="list-group-item">
                    <div class="row w-100">
                        <div class="col-12 col-sm-6 col-md-3 px-0">
                            <a href="detail.html?id=${src.UUID}"><img class="user-image" src="${src.Image}" alt="${src.Image}" class="rounded-circle mx-auto d-block img-fluid"></a>
                        </div>
                        
                        <div class="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                            <span class="fa fa-mobile fa-2x text-success float-right pulse" title="online now"></span>
                            <a href="detail.html?id=${src.UUID}"><label class="name lead">${src.FirstName} ${src.LastName}</label></a>
                            <br> 
                            <span class="fa fa-map-marker fa-fw text-muted" data-toggle="tooltip" title="" data-original-title="5842 Hillcrest Rd"></span>
                            <a href="detail.html?id=${src.UUID}"><span class="text-muted">${src.UserName}</span></a>
                            <br>
                            <span class="fa fa-phone fa-fw text-muted" data-toggle="tooltip" title="" data-original-title="(870) 288-4149"></span>
                            <a href="detail.html?id=${src.UUID}"><span class="text-muted small">${(src.files ? src.files.length : 0 ) } Files</span></a>
                            <br>
                            <span class="fa fa-envelope fa-fw text-muted" data-toggle="tooltip" data-original-title="" title=""></span>
                            <span class="text-muted small text-truncate">${src.email}</span>
                        </div>
                        </a>
                    </div>
                </li>
                
            </ul>
            <!--/contacts list-->
        </div>
    </div>
</div>

*/