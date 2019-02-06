var urlid = $_GET('id')

var metaFactdata = []

var team = null
var mainFileList = []
var selectedFilter = ''
var selectedLevel = ''
var PCIFiles = []
var PIIFiles = []
var SPECFiles = []
var RETFiles = []
var SecClassFiles = []
var SenClassFiles = []
var ClaClassFiles  = [] 
var PubClassFiles = [] 
var IntClassFiles = []
var files = []
var user = ''
var users = []
var managerLevel = 0
var fileNotedata = []
//var team = []


console.log("From URL", urlid)

function $_GET(param) {
    var vars = {};
    window.location.href.replace(location.hash, '').replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function(m, key, value) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if (param) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}

window.addEventListener('load', async e => {
  console.log("$$ IN window.addEventListener $$");

  let firstRunEverr = localStorage.getItem("demofe3-firstRunEv1");

  console.log("FirstRunEv", firstRunEverr);
  if ((firstRunEverr == null) || (firstRunEverr == undefined)) {
      localStorage.clear();
      localStorage.setItem("demofe3-firstRunEv1", "1");

  }

  //await initApp();
  await updateData();
  user = findUserFromStorage(urlid)
  files = findUserFilesFromStorage(urlid)
  users = loadAllUsersFromStorage()
  fileNotedata = JSON.parse(localStorage.getItem("demofe3-filenotes"))  || []
  console.log("FOUND USER",users)
  console.log("FOUND FILES", files)
  console.log("FOUND FILES", fileNotedata)
  fixData()
  updatePage()
  allClicked()


});


var toggler = document.getElementsByClassName("caret");
var iCaret;

for (iCaret = 0; iCaret < toggler.length; iCaret++) {
  toggler[iCaret].addEventListener("click", function() {
    this.parentElement.querySelector(".nested").classList.toggle("active");
    this.classList.toggle("caret-down");
  });
}


function loadAllUsersFromStorage() {
  
    const objArray = JSON.parse(localStorage.getItem("local_data"));
  //   return filterObj = metaFactdata.filter(function(e) {
  //       return e.employeeFKID == ID;
  //   });
  // }
  return objArray
}

function allClicked() {
  console.log("you clicked ALL BUTTON")
  selectedFilter = "ALL"
  updatePage()
  makeFileTable(files)
  chart.load({
    columns: [
      //[ 'x', 'sec', 'sen', 'cla', 'int', 'pub', 'six'],
        ['PCI', 30, 20, 50, 40, 60, 50],
        ['PII', 200, 130, 90, 240, 130, 220],
        ['SPE', 300, 200, 160, 400, 250, 250],
        ['RET', 200, 130, 90, 240, 130, 220],
        ['Secret', 130, 120, 150, 140, 160, 150],
        ['Sensitive', 190, 70, 20, 50, 60, 120],
        ['Internal', 90, 170, 20, 50, 360, 120],
        ['Classified', 90, 70, 20, 50, 60, 120],
        ['Public', 90, 70, 120, 50, 60, 120]
    ]
});
}

function piiClicked() {
  console.log("you clicked ALL BUTTON")
  selectedFilter = "PII"
  updatePage()
  makeFileTable(PIIFiles)
  chart.load({
    columns: [
       ['PII', 200, 130, 90, 240, 130, 220]
    ],
    unload: [ 'PCI', 'SPE', 'RET', 'Secret', 'Sensitive', 'Internal', 'Classified', 'Public' ]
    
});
}

function pciClicked() {
  console.log("you clicked ALL BUTTON")
  selectedFilter = "PCI"
  updatePage()
  makeFileTable(PCIFiles)
  chart.load({
    columns: [
      ['PCI', 30, 20, 50, 40, 60, 50],
    ],
    unload: [ 'PII', 'SPE', 'RET', 'Secret', 'Sensitive', 'Internal', 'Classified', 'Public' ]
    
});
}

function specClicked() {
  console.log("you clicked ALL BUTTON")
  selectedFilter = "SPEC"
  updatePage()
  makeFileTable(SPECFiles)
  chart.load({
    columns: [
      ['SPE', 300, 200, 160, 400, 250, 250],
    ],
    unload: [ 'PII', 'PCI', 'RET', 'Secret', 'Sensitive', 'Internal', 'Classified', 'Public' ]
    
});
}

function retClicked() {
  console.log("you clicked ALL BUTTON")
  selectedFilter = "RET"
  updatePage()
  makeFileTable(RETFiles)
  chart.load({
    columns: [
      ['RET', 200, 130, 90, 240, 130, 220],
    ],
    unload: [ 'PII', 'SPE', 'PCI', 'Secret', 'Sensitive', 'Internal', 'Classified', 'Public' ]
    
});
}



function secretClicked() {
  console.log("you clicked ALL BUTTON")
  selectedFilter = "secretClicked - can run customised function for selecting secretFiles"
  updatePage()
  // SecClassFiles 
  makeFileTable(SecClassFiles)
  chart.load({
    columns: [
      ['Secret', 130, 120, 150, 140, 160, 150],
    ],
    unload: [ 'PII', 'SPE', 'RET', 'PCI', 'Sensitive', 'Internal', 'Classified', 'Public' ]
    
});
}


function senClassClicked() {
  console.log("you clicked SEN BUTTON")
  selectedFilter = "senClassClicked"
  updatePage()
  makeFileTable(SenClassFiles)
  chart.load({
    columns: [
      ['Sensitive', 90, 70, 20, 50, 60, 120],
    ],
    unload: [ 'PII', 'SPE', 'RET', 'Secret', 'PCI', 'Internal', 'Classified', 'Public' ]
    
});
} 


function ClassClicked() {
  console.log("you clicked ALL BUTTON")
  selectedFilter = "ClassClicked"
  updatePage()
  makeFileTable(ClaClassFiles)
  chart.load({
    columns: [
      ['Classified', 90, 70, 20, 50, 60, 120]
    ],
    unload: [ 'PII', 'SPE', 'RET', 'Secret', 'PCI', 'Internal', 'Sensitive', 'Public' ]
    
});
  
}

function intClicked() {
  console.log("you clicked ALL BUTTON")
  selectedFilter = "intClicked"
  updatePage()
  makeFileTable(IntClassFiles)
  chart.load({
    columns: [
      ['Internal', 90, 70, 20, 50, 60, 120],
    ],
    unload: [ 'PII', 'SPE', 'RET', 'Secret', 'PCI', 'Internal', 'Classified', 'Public' ]
    
});
} 

function pubClicked() {
  console.log("you clicked ALL BUTTON")
  selectedFilter = "pubClicked"
  updatePage()
  // ClaClassFiles PubClassFiles IntClassFiles
  makeFileTable(PubClassFiles)
  chart.load({
    columns: [
      ['Public', 90, 70, 20, 50, 60, 120],
    ],
    unload: [ 'PII', 'SPE', 'RET', 'Secret', 'PCI', 'Internal', 'Classified', 'Sensitive' ]
    
});
}



function fixData() {
  console.log("oppourtunity to fix the data", files)
  PCIFiles = files.filter( f => f.filter == "PCI") 
  PIIFiles = files.filter( f => f.filter == "PII")
  SPECFiles = files.filter(function(f) {
    return f.filter == "SPE";
  })
  RETFiles = files.filter(function(f) {
    return f.filter == "RET";
  })
  SecClassFiles = files.filter(function(f) {
    return f.securityClass == "Secret";
  })
  SenClassFiles = files.filter(function(f) {
    return f.securityClass == "ClassifiedSen";
  })
  ClaClassFiles = files.filter(function(f) {
    return f.securityClass == "Classified";
  })
  IntClassFiles = files.filter(function(f) {
    return f.securityClass == "Internal";
  })
  PubClassFiles = files.filter(function(f) {
    return f.securityClass == "Public";
  })
  
  makeTeamList()
  makeOwnTeam(user[0])
  makePieChart()
  makeRadialBar()
  makechart3()
}


function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


// function randomNum() {
//     return Math.floor((Math.random() * 1000) + 4) * Math.floor((Math.random() * 10000) + 4)
// }

function addJsonTags() {
  // add some missing json tags
  //"size":2840125,"ctime":"10/6/2018","mtime":"4/16/2018","atime":"1/13/2018","hasSeenCount":0,
  console.log("in JSON tags")
  console.log("")

  employeedata.map( user => {
    user.fixedIssues = randomIntFromInterval(3, 50)
    user.totalUsage = randomIntFromInterval(300, 500000000)
    user.teamDelete = randomIntFromInterval(1, 150)
    user.teamFilesUsed = randomIntFromInterval(1, 150)
    user.teamFilesTotals = randomIntFromInterval(300, 500000000)
    user.teamEscalation = randomIntFromInterval(1, 150)

  })


  metaFactdata.map( file => {
    file.size = Math.floor((Math.random() * 1000) + 4) * Math.floor((Math.random() * 10000) + 4)
    file.ctime = "10/6/2018"
    file.mtime = "4/16/2018"
    file.atime = "1/13/2018"
    file.hasSeenCount = 0



  })

  console.log("Finished file", metaFactdata)
  console.log("Finished file", users)
}

function makeOwnTeam(teamLeader) {
  //  { id: 7, name: "Sales and Events", hasChild: true, expanded: true },
   console.log("OWN TEAM", teamLeader)
var res = []  
  //  res = teamLeader.map( e => {
  //    var hasCHILD = e.children > 0 ? true : false 
  //   return ({
  //     id: e.EMPID,
  //     name: e.firstName + " "  + e.lastName,
  //     hasChild: hasCHILD,
  //     expanded : true
  //   })

  //  })

//    $(function () {

//     $("#treeView").ejTreeView({

//         fields: { id: "id", parentId: "pid", text: "name", hasChild: "hasChild", dataSource: res, expanded: "expanded" },

//     });

//     //Creates Object for TreeView.

//     treeObj = $("#treeView").data("ejTreeView");

// });
   console.log("res", res)

  

  var locLev = teamLeader.level
  teamLeader.managerID = null


  possibleUserList = employeedata.filter( (emp, index) => {
           return emp.level > locLev
  })

  console.log("PossUserList",possibleUserList)

    var data = [ teamLeader, ...possibleUserList ] 
    console.log("data after mashup", data)
    var obj = {};
    obj.rootElements = [];
    for (i in data) {
        var _elem = data[i];
        if (_elem.managerID) {
            var _parentId = _elem.managerID;
            if (_parentId == _elem.EMPID) {
                // check children, if false - add
                if (!_elem.children) {
                    _elem.children = [];
                }
                _elem.children.push(_elem);
            }
            else {
               //  addChildToParent(_elem, _parentId);
            }
        }
        else // is root
        {
            obj.rootElements.push(_elem);
        }
    }
    // function addChildToParent(child, managerID, root) {
    //     for (j in data) {
    //         if (data[j].EMPID.toString() == managerID.toString()) {
    //             if (!data[j].children) {
    //                 data[j].children = [];
    //             }
    //             data[j].children.push(child);
    //         }
    //     }
    // }
    console.log("Own TEAM TREE", obj.rootElements);


      //console.log("Possible list", possibleUserList)
      console.log("teamLeader list", teamLeader)
      team = teamLeader
    
      console.log("team", JSON.stringify(team))

      //var treeview = team
    //   const iterate = (treeview) => {
    //     Object.keys(treeview).forEach(key => {
    
    //     console.log(`key: ${key}, value: ${treeview[key]}`)
    
    //     if (typeof treeview[key] === 'object') {
    //             iterate(treeview[key])
    //         }
    //     })
    // }


   

      if (team[0] != null) {
        
      }


      

}


function walkTree (t) {

 
 for( node in t) {
   console.log("node", t[node])
   console.log("node name", t[node].firstName + " " + t[node].lastName)
   if (t[node].children) {
     console.log("GOt CHildren: t[node].children.length: ", t[node].children)
     walkTree(t[node].children)
    //  if (t[node].children.length > 0) {
    //    //for (child in t[node].children) {
        

    //    //}
    //  } 
       console.log("In Walktree", t)

     
   }
 }

}



function makeTeamList() {


  var mydata = employeedata  // [{"id":1,"name":"X","parentId":null},{"id":2,"name":"Y","parentId":1},{"id":3,"name":"D","parentId":2},{"id":2,"name":"S","parentId":1},{"id":5,"name":"K","parentId":4}]
    // var obj = {};
    // obj.rootElements = [];
    // for (i in data) {
    //     var _elem = data[i];
    //     if (_elem.managerID) {
    //         var _parentId = _elem.managerID;
    //         if (_parentId == _elem.EMPID) {
    //             // check children, if false - add
    //             if (!_elem.children) {
    //                 _elem.children = [];
    //             }
    //             _elem.children.push(_elem);
    //         }
    //         else {
    //             addChildToParent(_elem, _parentId);
    //         }
    //     }
    //     else // is root
    //     {
    //         obj.rootElements.push(_elem);
    //     }
    // }
    // function addChildToParent(child, managerID, root) {
    //     for (j in data) {
    //         if (data[j].EMPID.toString() == managerID.toString()) {
    //             if (!data[j].children) {
    //                 data[j].children = [];
    //             }
    //             // double check its not already there !
    //             let exists = 0
    //             for(let ii=0;ii<data[j].children.length;ii++){
    //               // console.log("child", child.EMPID)
    //               console.log("cecking data[j].children[ii]", data[j].children[ii].EMPID + " " + child.EMPID)
    //               if ( data[j].children[ii].EMPID ==  child.EMPID) { console.log("already Exists");  exists = 1 }
    //             }
    //             if (!exists) { console.log("pushing", child); data[j].children.push(child); }
                
    //         }
    //     }
    // }
    //console.log("MASTER TREE", obj.rootElements);
    
    
    
    // res.send(obj.rootElements);


  // gett root users id info
  // rootManagerLevel = user[0].level
  // rootManagerID = user[0].EMPID
  // let MAXLEVEL = 5
  // var currentLevel = rootManagerLevel

  // var possList = []
  // possList[0] = user

  // //console.log("p1", possList)
  // var roundList = []
  // var i = 0


  // roundList[i] = employeedata.filter( emp => {
  //   console.log("emp.level", emp.level)
  //   console.log("rootManagerLevel", rootManagerLevel)
  //     console.log("emp.managerID", emp.managerID)
  //     console.log("rootManagerID", rootManagerID)
  //   return emp.managerID == rootManagerID
  // })

  // roundList[1] = employeedata.filter( emp => {

  //  // return roundList[0].filter(e => { 
  //     return emp.managerID == roundList[0].EMPID
  //  // })

  //   // console.log("emp.level", emp.level)
  //   // console.log("rootManagerLevel", rootManagerLevel)
  //   //   console.log("emp.managerID", emp.managerID)
  //   //   console.log("rootManagerID", rootManagerID)
    
  // })

  //i++

  // while( currentLevel <= MAXLEVEL) {
  //   roundList[i+1] = roundList[i].map( emp => {
  //       return employeedata.filter( e => {
  //         console.log("IN EMP", emp)
  //         console.log("IN E", e)
  //         return emp.managerID == e.EMPID 
  //       })
  //   })
  //   currentLevel++
  //   i++

  // }

  // console.log ("roundList", roundList)


//  while( currentLevel <= MAXLEVEL) {
//     // let i = 1
//     // increment level to get member info
//     currentLevel++

//     possList[i] = employeedata.filter( emp => {
//       console.log("currentLevel", currentLevel)
//       console.log("emp.level", emp.level)
//       console.log("emp.managerID", emp.managerID)
//        console.log("possList[i-1].EMPID", possList[(i-1)][0].EMPID)
       
    
//       console.log("EMP", emp)
//       return emp.level == currentLevel && emp.managerID == possList[i-1].EMPID
//     })

//     i++




//  }
  
  // for(let i=0;i<MAXLEVEL;i++) {
  //   possList[i] = employeedata.filter( emp => {
  //     console.log("emp", emp)
  //     console.log("user[0].EMPID", user)
  //     console.log("possList[i-1].level+1", possList[i-1])
  //     return emp.level == possList[i-1].level+1 &&  emp.managerID == possList[i-1].EMPID
  //   });
  //   // roundList[i] = possList[i].filter( e => e.managerID == possList[i-1].EMPID)
  // }
  //console.log("PossList", possList, i)
//

  // console.log("roundList", roundList)
  // // set a root member to build team from recursively
  // var locManLevel = managerLevel
  // var possibleUserList = []
  // possibleUserList[0] = user
  // while (locManLevel < 8) {
  //   console.log("locman", locManLevel)
    
  //   locManLevel++
  //   possibleUserList[locManLevel] = employeedata.filter( (emp, index) => {
  //     console.log("emp ",emp)
      
  //     //emp.managerID == user[0].EMPID
  //     console.log("emp.managerID", emp.managerID)
  //     console.log("emplevel", emp.level)
  //     console.log("locManL", locManLevel)
  //     //console.log("user[0].EMPID", user[0].EMPID ) 
  //     console.log("index", index)
  //     return emp.managerID == possibleUserList[locManLevel]
  //   })
  // }
  // for (i=0;i<8;i++) {

  // }
  unflattenToObject = function(array, parent) {
    var tree = {};
    parent = typeof parent !== 'undefined' ? parent : {EMPID: 0};
  
    var childrenArray = array.filter(function(child) {
      return child.managerID == parent.EMPID;
    });
  
    if (childrenArray.length > 0) {
      var childrenObject = {};
      // Transform children into a hash/object keyed on token
      childrenArray.forEach(function(child) {
        childrenObject[child.EMPID] = child;
      });
      if (parent.EMPID == 0) {
        tree = childrenObject;
      } else {
        parent['children'] = childrenObject;
      }
      childrenArray.forEach(function(child) {
        unflattenToObject(array, child);
      })
    }
  
    return tree;
  };
  
  var arr = [
      {'id':1 ,'parentid': 0},
      {'id':2 ,'parentid': 1},
      {'id':3 ,'parentid': 1},
      {'id':4 ,'parentid': 2},
      {'id':5 ,'parentid': 2},
      {'id':6 ,'parentid': 3},
      {'id':7 ,'parentid': 4}
  ];
  tree = unflattenToObject(mydata);
  console.log("NEW TREE", tree)

  walkTree(tree)

  // console.log("Possible List", possList)
  document.getElementById("user-name").innerHTML = "<h2>" + user[0].lastName.toUpperCase() + ", " + user[0].firstName + "</h2>"
  document.getElementById("user-fixed-issues").innerHTML = user[0].fixedIssues 
  document.getElementById("user-total-usage").innerHTML = user[0].totalUsage 
  document.getElementById("team-delete").innerHTML = user[0].teamDelete 
  document.getElementById("team-files-used").innerHTML = user[0].teamFilesUsed 
  document.getElementById("team-files-total").innerHTML = user[0].teamFilesTotals 
  document.getElementById("team-escalate").innerHTML = user[0].teamEscalation 

  

 //  document.getElementById("user-message").innerHTML = roundList[0].length + " direct team members "
}

function updatePage() {
  console.log("Update web page")
  files = findUserFilesFromStorage(urlid)
 

  if( (files.length > 0)) {
    makeFileTable(files)
  }

  document.getElementById("user-total1").innerHTML = files.length
  document.getElementById("user-total").innerHTML = files.length
  
  document.getElementById("pci-total").innerHTML = PCIFiles.length

  
  document.getElementById("pii-total").innerHTML = PIIFiles.length
  
  document.getElementById("spec-total").innerHTML = SPECFiles.length

  
  document.getElementById("ret-total").innerHTML = RETFiles.length

  //securityClass
 
  document.getElementById("sec-class-total").innerHTML = SecClassFiles.length

  
  document.getElementById("sen-class-total").innerHTML = SenClassFiles.length

  
  document.getElementById("cla-class-total").innerHTML = ClaClassFiles.length

  
  document.getElementById("int-class-total").innerHTML = IntClassFiles.length

  
  document.getElementById("pub-class-total").innerHTML = PubClassFiles.length

  var elem = document.getElementById("message");
  elem.innerHTML = selectedFilter

 
  
  
}


function makeFileTable(fileList) {
  var table = `<table class="table table-hover">
  <thead class="text-warning">
      <tr>
        <th>Action</th>
        <th>FileName</th>
        <th>Security Level</th>
        <th>Filter</th>
        <th>Path</th>
        <th>MD5</th>
        <th>FileNote</th>
      </tr>
    </thead>
    <tbody >`;

    table += fileList.map( e => `
      <tr id="row-${e.MD5}" onchange="changedSelect(this)">
        <td>
        <select id="${e.MD5}" onchange="changedSelect(this)" class="btn btn-primary dropdown-toggle">
        <option value="#ccc" style="background-color: #ccc;"><i class="fa fa-file"></i>please select</option>
        <option value="lightgreen" style="background-color: lightgreen"><i class="fa fa-file"></i>No Action</option>
        <option value="lightblue" style="background-color: lightblue"><i class="fa fa-file"></i>Moved</option>
        <option value="#f5ca8f" style="background-color: #f5ca8f"><i class="fa fa-file"></i>Archived</option>
        <option value="lightpink" style="background-color: lightpink"><i class="fa fa-file"></i>Lost/unknown</option>
      </select>
      </td>
        <td>${e.fileName}</td>
        <td>${e.securityClass}</td>
        <td>${e.filter}</td>
        <td>${e.filePath}</td>
        <td ><span title="${e.MD5}">${e.MD5.substring(0, 6)}...</span></td>
        <td ><button id="btn-${e.MD5}" onClick="fileNoteSelected(this)"  type="button" class="btn btn-info">FileNote <span class="badge badge-warning"><span class="" id="badge-${ e.MD5 }">${ findFileNoteFromStorage(e.MD5).length || "0" }</span></span></button></td>
      </tr>
    `).join("\n")

    table += `</tbody>
    </table>
    </div>`

    document.getElementById("main-file-list").innerHTML = table  

}

async function updateData() {
  employeedata = await fetch('./employeeV2.json').then(emp=>emp.clone().json());
  metaFactdata = await fetch('./metaFactV2.json').then(met=>met.clone().json());
  fileNotedata = localStorage.getItem("demofe3")
  addJsonTags()
  console.log('GEORGE1', employeedata);
  // metaFactdata
  console.log('GEORGE2', metaFactdata);


}

function fileNoteSelected(e) {
    //e.preventDefaults()
    //console.log("selected", btn.value)
    var MD5id = e.id.substring(4)
    console.log("this select", e.id)
    console.log("MD5 found ", MD5id)
    var fileInfo = findFileFromStorage(MD5id)
    console.log("fileInfo", fileInfo[0])
    document.getElementById("file-note-md5").innerHTML = MD5id
    document.getElementById("file-note-name").innerHTML = fileInfo[0].fileName
    document.getElementById("file-note-path").innerHTML = fileInfo[0].filePath
    document.getElementById("file-note-busclass").innerHTML = fileInfo[0].businessClass
    document.getElementById("file-note-sec").innerHTML = fileInfo[0].securityClass
    document.getElementById("file-note-email").innerHTML = fileInfo[0].employeeEmail

    document.getElementById("file-note-class").innerHTML = fileInfo[0].filter
    document.getElementById("file-note-ext").innerHTML = fileInfo[0].extension
    document.getElementById("file-note-access").innerHTML = fileInfo[0].atime
    document.getElementById("file-note-size").innerHTML = fileInfo[0].size
    document.getElementById("save-note-btn").value = MD5id
    var fileNoteHist = document.getElementById("file-note-history") //.innerHTML = fileInfo[0].size
    var lfileNotedata = findFileNoteFromStorage(MD5id)

    var tmpTable = `<table class="table table-active table-sm text-dark"><thead><tr><td>id</td><td>date</td><td>Note</td></tr></thead>`
    
    tmpTable += lfileNotedata.map( note => `<tr><td>${(note.ID).substring(0, 6)}</td><td>${note.date}</td><td>${note.note}</td></tr>`).join("\n")
    
    tmpTable += `</table>`
    fileNoteHist.innerHTML = tmpTable

    $('#exampleModalCenter').modal('show')
    var temp = `
    
       
`

}

function addFileNotetoLS(anID) {
    console.log("AnID", anID.value)
    var elem = document.getElementById("exampleFormControlTextarea1")
    console.log("message", elem.value)
   
    var d = new Date();
    var datetxt = d.getDay() + "/" + d.getMonth()+1 + "/" +d.getFullYear();
    var badgeElem = document.getElementById( "badge-" + anID.value )
    var elemValue = parseInt(badgeElem.innerHTML)
    console.log("badgeElem", badgeElem)
    //var lfileNotedata = findFileNoteFromStorage(anID.value)
    elemValue++
    //console.log("lfileNotedata from storage", lfileNotedata )
    console.log("fileNotedata from storage", fileNotedata )
    if (elem.value != "") {
      fileNotedata.push({ date: datetxt, ID: anID.value, note: elem.value })
    }
    localStorage.setItem("demofe3-filenotes", JSON.stringify(fileNotedata))
    $('#exampleModalCenter').modal('hide')
    badgeElem.innerHTML = elemValue
    elem.value = ""

}
function findUserFromStorage(ID) {
  //const objArray = JSON.parse(localStorage.getItem("local_data"));
  return filterObj = employeedata.filter(function(e) {
      return e.EMPID == ID;
  });
}

function findFileNoteFromStorage(ID) {
    //const objArray = JSON.parse(localStorage.getItem("local_data"));
    return filterObj = fileNotedata.filter( f =>  f.ID == ID );
  }


// function findUserFromStorage(ID) {
//   //const objArray = JSON.parse(localStorage.getItem("local_data"));
//   return filterObj = employeedata.filter(function(e) {
//       return e.EMPID == ID;
//   })[0];
// }


// const rebels = pilots.filter(pilot => pilot.faction === "Rebels");

function findUserFilesFromStorage(ID) {
  //const objArray = JSON.parse(localStorage.getItem("local_data"));
  return filterObj = metaFactdata.filter(function(e) {
      return e.employeeFKID == ID;
  });
}

function findFileFromStorage(ID) {
    //const objArray = JSON.parse(localStorage.getItem("local_data"));
    return filterObj = metaFactdata.filter(function(e) {
        return e.MD5 == ID;
    });
  }

//console.log ("lengths", SecClassFiles.length)

function makePieChart() {
  //var PCI = PCIFiles.length
  //console.log("We GOt PCI", PCIFiles)

  var chart = c3.generate({
    size: {
      height: 280
    },
    bindto: '#chart',
    data: {
        columns: [
          // [PCIFiles.length, PIIFiles.length, SPECFiles.length, RETFiles.length]
            ['PCI', PCIFiles.length ],
            ['PII', PIIFiles.length ],
            ['SPEC', SPECFiles.length ],
            ['RET', RETFiles.length ],

        ],
        type : 'donut',
        onclick: function (d, i) { console.log("onclick", d, i); },
        //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    donut: {
        title: "Filters"
    }
});



//setTimeout(function () {
//     chart.load({
//         columns: [
//             ["setosa", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
//             ["versicolor", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
//             ["virginica", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
//         ]
//     });
// }, 3500);

// setTimeout(function () {
//     chart.unload({
//         ids: 'data1'
//     });
//     chart.unload({
//         ids: 'data2'
//     });
// }, 2500);
}

function makeRadialBar() {

  var chart = c3.generate({
    size: {
      height: 280
    },
    bindto: '#pie-chart',
    data: {
        columns: [
          //   labels: ['Secret', 'Sensitive', 'Classified', 'Internal', 'Public'],
  //   series: [ SecClassFiles.length, SecClassFiles.length, ClaClassFiles.length, IntClassFiles.length, PubClassFiles.length],
          // [PCIFiles.length, PIIFiles.length, SPECFiles.length, RETFiles.length]
           
            ['Secret', SecClassFiles.length ],
            ['Sensitive', SecClassFiles.length ],
            ['Classified', ClaClassFiles.length ],
            ['Internal', IntClassFiles.length ],
            ['Public', PubClassFiles.length ],
            

        ],
        type : 'donut',
        onclick: function (d, i) { console.log("onclick", d, i); },
        //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    donut: {
        title: "Security"
    }
});


}

function makechart3() {
//   var chart = c3.generate({
//     bindto: '#chart3',
//     data: {
//         columns: [
//             ['All', 91.4]
//         ],
//         type: 'gauge',
//         onclick: function (d, i) { console.log("onclick", d, i); },
//         onmouseover: function (d, i) { console.log("onmouseover", d, i); },
//         onmouseout: function (d, i) { console.log("onmouseout", d, i); }
//     },
//     gauge: {
// //        label: {
// //            format: function(value, ratio) {
// //                return value;
// //            },
// //            show: false // to turn off the min/max labels.
// //        },
// //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
// //    max: 100, // 100 is default
// //    units: ' %',
// //    width: 39 // for adjusting arc thickness
//     },
//     color: {
//         pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
//         threshold: {
// //            unit: 'value', // percentage is default
// //            max: 200, // 100 is default
//             values: [30, 60, 90, 100]
//         }
//     },
//     size: {
//         height: 380
//     }
// });

// setTimeout(function () {
//     chart.load({
//         columns: [['Secret', 10]]
//     });
// }, 1000);

// setTimeout(function () {
//     chart.load({
//         columns: [['CLassified', 50]]
//     });
// }, 2000);

// setTimeout(function () {
//     chart.load({
//         columns: [['Sensitive Classified', 70]]
//     });
// }, 3000);

// setTimeout(function () {
//     chart.load({
//         columns: [['Internal', 0]]
//     });
// }, 4000);

// setTimeout(function () {
//     chart.load({
//         columns: [['Public', 45]]
//     });
// }, 5000);

  chart = c3.generate({
  bindto: '#chart3',
  size: {
    height: 280
  },
  data: {
      x : 'x',
      columns: [
          [ 'x', 'sec', 'sen', 'cla', 'int', 'pub', 'six'],
          ['PCI', 30, 20, 50, 40, 60, 50],
          ['PII', 200, 130, 90, 240, 130, 220],
          ['SPE', 300, 200, 160, 400, 250, 250],
          ['RET', 200, 130, 90, 240, 130, 220],
          ['Secret', 130, 120, 150, 140, 160, 150],
          ['Sensitive', 90, 70, 20, 50, 60, 120],
          ['Internal', 90, 70, 20, 50, 60, 120],
          ['Classified', 90, 70, 20, 50, 60, 120],
          ['Public', 90, 70, 20, 50, 60, 120],
      ],
      type: 'bar',
      types: {
          Secret: 'spline',
          Sensitive: 'spline',
          Internal: 'area',
          Classified: 'spline',
          Public: 'area',
      },
      groups: [
          ['PCI','PII']
      ],
      axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    }
  }
});


// var chart = c3.generate({
//   bindto: '#chart3',
//   size: {
//     height: 280
// },
//   data: {
//       columns: [
//         ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
//           ['PCI', 300, 350, 300, 0, 0, 120],
//           ['PII', 130, 100, 140, 200, 150, 50],
//           ['SPE', 200, 330, 220, 450, 260, 120],
//           ['RET', 130, 200, 440, 200, 350, 550]
//       ],
//       axis: {
//         x: {
//             type: 'timeseries',
//             tick: {
//                 format: '%Y-%m-%d'
//             }
//         }
//     },
//       types: {
//           data1: 'area-spline',
//           data2: 'area-spline'
//           // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
//       },
//       groups: [['PCI', 'PII', 'SPE', 'RET']]
//   }
// });


// var chart = c3.generate({
//   bindto: '#chart3',
//   size: {
//     height: 380
// },
//   data: {
//       columns: [
//           ['data1', 30, 200, 100, 400, 150, 250],
//           ['data2', 130, 100, 140, 200, 150, 50]
//       ],
//       type: 'spline'
//   }
// });


}

function changedSelect(e) {
  console.log("selected", e.value)
  console.log("this select", e.id)
  var random = Math.random()
  console.log(random*1000 + 1000)
  setTimeout(function(){ document.getElementById("row-" + e.id).setAttribute('style', `background-color:${e.value}`); }, 1500);
  //document.getElementById("row-" + e.id).setAttribute('style', `background-color:${e.value}`); // += e.value
}



// document.getElementById("main-file-list").innerHTML = `<div class="table-responsive">
// <table class="table table-striped">
//   <thead>
//     <tr>
//       <th>#</th>
//       <th>Header</th>
//       <th>Header</th>
//       <th>Header</th>
//       <th>Header</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>1,001</td>
//       <td>Lorem</td>
//       <td>ipsum</td>
//       <td>dolor</td>
//       <td>sit</td>
//     </tr>
//     <tr>
//       <td>1,002</td>
//       <td>amet</td>
//       <td>consectetur</td>
//       <td>adipiscing</td>
//       <td>elit</td>
//     </tr>
//     <tr>
//       <td>1,003</td>
//       <td>Integer</td>
//       <td>nec</td>
//       <td>odio</td>
//       <td>Praesent</td>
//     </tr>
//     <tr>
//       <td>1,003</td>
//       <td>libero</td>
//       <td>Sed</td>
//       <td>cursus</td>
//       <td>ante</td>
//     </tr>
//     <tr>
//       <td>1,004</td>
//       <td>dapibus</td>
//       <td>diam</td>
//       <td>Sed</td>
//       <td>nisi</td>
//     </tr>
//     <tr>
//       <td>1,005</td>
//       <td>Nulla</td>
//       <td>quis</td>
//       <td>sem</td>
//       <td>at</td>
//     </tr>
//     <tr>
//       <td>1,006</td>
//       <td>nibh</td>
//       <td>elementum</td>
//       <td>imperdiet</td>
//       <td>Duis</td>
//     </tr>
//     <tr>
//       <td>1,007</td>
//       <td>sagittis</td>
//       <td>ipsum</td>
//       <td>Praesent</td>
//       <td>mauris</td>
//     </tr>
//     <tr>
//       <td>1,008</td>
//       <td>Fusce</td>
//       <td>nec</td>
//       <td>tellus</td>
//       <td>sed</td>
//     </tr>
//     <tr>
//       <td>1,009</td>
//       <td>augue</td>
//       <td>semper</td>
//       <td>porta</td>
//       <td>Mauris</td>
//     </tr>
//     <tr>
//       <td>1,010</td>
//       <td>massa</td>
//       <td>Vestibulum</td>
//       <td>lacinia</td>
//       <td>arcu</td>
//     </tr>
//     <tr>
//       <td>1,011</td>
//       <td>eget</td>
//       <td>nulla</td>
//       <td>Class</td>
//       <td>aptent</td>
//     </tr>
//     <tr>
//       <td>1,012</td>
//       <td>taciti</td>
//       <td>sociosqu</td>
//       <td>ad</td>
//       <td>litora</td>
//     </tr>
//     <tr>
//       <td>1,013</td>
//       <td>torquent</td>
//       <td>per</td>
//       <td>conubia</td>
//       <td>nostra</td>
//     </tr>
//     <tr>
//       <td>1,014</td>
//       <td>per</td>
//       <td>inceptos</td>
//       <td>himenaeos</td>
//       <td>Curabitur</td>
//     </tr>
//     <tr>
//       <td>1,015</td>
//       <td>sodales</td>
//       <td>ligula</td>
//       <td>in</td>
//       <td>libero</td>
//     </tr>
//   </tbody>
// </table>
// </div>`









// await localStorage.setItem(`local_data`, JSON.stringify(localInfo));
// await localStorage.setItem(`local_employee`, JSON.stringify(localemployeedata))
// await localStorage.setItem('local_metaFact', JSON.stringify(localmetaFactdata))

/*
const dataSource = JSON.parse(localStorage.getItem("local_data"))


console.log("Wow : new data source ::", dataSource)
console.log("Wow : data source type ::", typeof(dataSource))




function findTeamFromLS(PID) {
    const objArray = JSON.parse(localStorage.getItem("local_data"));
    return filterObj = objArray.filter(function(e) {
        return e.PUUID == PID;
    });
}



  //   // mapReduce = (a -> b, (b,a) -> b, (b,a) -> b)
  // const mapReduce = (m,r) =>
  //   (acc,x) => r (acc, m (x))
  
  // // concatMap :: (a -> [b]) -> [a] -> [b]
  // const concatMap = f => xs =>
  //   xs.reduce (mapReduce (f, concat), [])
  
  // // concat :: ([a],[a]) -> [a]
  // const concat = (xs,ys) =>
  //   xs.concat (ys)
  
  // // id :: a -> a
  // const id = x =>
  //   x
  
  // // flatten :: [[a]] -> [a]
  // const flatten =
  //   concatMap (id)



// mapReduce = (a -> b, (b,a) -> b, (b,a) -> b)
const mapReduce = (m,r) =>
  (acc,x) => r (acc, m (x))

// concatMap :: (a -> [b]) -> [a] -> [b]
const concatMap = f => xs =>
  xs.reduce (mapReduce (f, concat), [])

// concat :: ([a],[a]) -> [a]
const concat = (xs,ys) =>
  xs.concat (ys)

// id :: a -> a
const id = x =>
  x

// flatten :: [[a]] -> [a]
const flatten =
  concatMap (id)
  
// deepFlatten :: [[a]] -> [a]
const deepFlatten =
  concatMap (x =>
    Array.isArray (x) ? deepFlatten (x) : x)



var dataObj = findDataFromLS(urlid)

// var image = id="user-image-cont"




var img = document.createElement("img");
img.src = dataObj.Image;


console.log(img)
var div = document.getElementById("user-image-cont");
console.log(div)

div.appendChild(img);

console.log("We are dealing with ..", dataObj)

document.getElementById("user-name-title").innerHTML = dataObj.FirstName + " " + dataObj.LastName
document.getElementById("nextUrgent").innerHTML = dataObj.nextAction
document.getElementById("nextActionIcon").innerHTML = dataObj.nextAction
document.getElementById("nextActionIcon1").innerHTML = dataObj.nextAction


document.getElementById("next3Urgent").innerHTML = dataObj.next3Action
document.getElementById("next6Urgent").innerHTML = dataObj.next6Action
/* team leader stuff  */ 

  
/*  
  if (dataObj.PUUID == null ) { /* this means a team leader */
    //console.log("We got a Team Leader Here")


/*
    
  team = findTeamFromLS(dataObj.UUID)
  
  var arrTeamFiles = team.map( member => member.files )
  var arrNextAction = team.map( member => member.nextAction )
  var arrNext3Action = team.map( member => member.next3Action )
  var arrNext6Action = team.map( member => member.next6Action )
  var arrNextActionDay = team.map( member => member.nextActionDay )
  // nextActionDay
      
  console.log("Got the arrTeamFiles here", arrTeamFiles)
  var newArrTeam = flatten( arrTeamFiles )
  console.log("Got the FLat arrTeamFiles here", newArrTeam)
  console.log("Got the arrNext6Action here", arrNext6Action)
  
  let teamMoments = newArrTeam.map(d => moment(d.ctime, 'MM/DD/YYYY'))
  let teamMinDate = moment.min(teamMoments)
  //arrNextActionDay = arrNextActionDay.sort((a, b) => a - b)
  
  console.log("smallest num was",  arrNextActionDay[0])
 // document.getElementById("team-urgent-sum").innerHTML = arrNextAction.reduce(getSum, 0)
  
   //let arrActionDay = arrNextActionDay
   // sort action days and get min number 
   // use min number to make a date in correct format
   // display on page in team section
   
   
 
   
   
   
// let maxDate = moment.max(moments)
// let minDate = moment.min(moments)
// // numArray = numArray.sort((a, b) => a - b);
// var sizes = dataFile.map(s => s.size )


// sizes = sizes.sort((a, b) => a - b)

// console.log(sizes)
// if(sizes.length == 0) {
//   sizes = [0]  
// } 

// function getSum(total, num) {
//   return total + num;
// }

  
  
  
  
  
  console.log("we reckon this is an sum of 17 0 40 0 & 3 !! ", arrNextAction.reduce(getSum, 0))
  
  var userTableHeader = `
      <div class="row user-block">

        <section class="content">

          <div class="col-md-12">
            <div class="panel panel-default">
              <h2>Team Members</h2>
              <div class="panel-body">
                <div class="pull-right"> 
                  <div class="btn-group">
                    <button type="button" class="btn btn-success btn-filter" data-target="items-clear">Clear</button>
                    <button type="button" class="btn btn-warning btn-filter" data-target="items-pending">3 Month Warning</button>
                    <button type="button" class="btn btn-danger btn-filter" data-target="items-overdue">Overdue</button>
                    <button type="button" class="btn btn-default btn-filter" data-target="all">All</button>
                  </div>
                </div>
                <div class="table-container">
                  <table class="table table-filter">
                    <tbody>
                    
    `
  
  var userTable = team.map( user => `
                    <tr data-status="items-overdue">
                        <td>
                          <div class="ckbox">
                            <input type="checkbox" id="checkbox2">
                            <label for="checkbox2"></label>
                          </div>
                        </td>
                        <td>
                          <a href="javascript:;" class="star">
												<i class="glyphicon glyphicon-star"></i>
											</a>
                        </td>
                        <td>
                        
                        
                        
                          <div class="media">
                            <a href="detail.html?id=${user.UUID}" class="pull-left">
													<img src="${user.Image}" class="media-photo">
												</a>
                            <div class="media-body">
                              <span class="media-meta pull-right"><i>last login</i>Febrero 13, 2016</span>
                              <h4 class="title">
                                <a href="detail.html?id=${user.UUID}">${user.FirstName} ${user.LastName} (${user.UserName})</a>
                                <span class="pull-right items-overdue">(items-overdue)</span>
                              </h4>
                              </br>
                              <p class="summary">| Total Files: ${user.TotalFiles} | | <span class="red"><b>Next Action URGENT : ${user.nextAction}</b></span> | | <span class="purple">Next Action 3 months : ${user.next3Action}</span> | | <span class="green">Next Action 6 months : ${user.next6Action} |</p>
                            </div>
                          </div>
                        </td>
                      </tr>
  
  `).join('\n')


  var userTableFooter = `<tr data-status="items-clear">
                        <td>
                          <div class="ckbox">
                            <input type="checkbox" id="checkbox1">
                            <label for="checkbox1"></label>
                          </div>
                        </td>
                        <td>
                          <a href="javascript:;" class="star">
												<i class="glyphicon glyphicon-star"></i>
											</a>
                        </td>
                        <td>
                          <div class="media">
                            <a href="#" class="pull-left">
													<img src="https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg" class="media-photo">
												</a>
                            <div class="media-body">
                              <span class="media-meta pull-right">Febrero 13, 2016</span>
                              <h4 class="title">
                                Lorem Impsum
                                <span class="pull-right items-clear">(Review Soon)</span>
                              </h4>
                              <p class="summary">Has files that should be reviewed within 3 months.</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr data-status="items-pending">
                        <td>
                          <div class="ckbox">
                            <input type="checkbox" id="checkbox3">
                            <label for="checkbox3"></label>
                          </div>
                        </td>
                        <td>
                          <a href="javascript:;" class="star">
												<i class="glyphicon glyphicon-star"></i>
											</a>
                        </td>
                        <td>
                          <div class="media">
                            <a href="#" class="pull-left">
													<img src="https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg" class="media-photo">
												</a>
                            <div class="media-body">
                              <span class="media-meta pull-right">Febrero 13, 2016</span>
                              <h4 class="title">
                                Lorem Impsum
                                <span class="pull-right items-pending">(items-pending)</span>
                              </h4>
                              <p class="summary">Ut enim ad minim veniam, quis nostrud exercitation...</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr data-status="items-overdue">
                        <td>
                          <div class="ckbox">
                            <input type="checkbox" id="checkbox2">
                            <label for="checkbox2"></label>
                          </div>
                        </td>
                        <td>
                          <a href="javascript:;" class="star">
												<i class="glyphicon glyphicon-star"></i>
											</a>
                        </td>
                        <td>
                          <div class="media">
                            <a href="#" class="pull-left">
													<img src="https://s3.amazonaws.com/uifaces/faces/twitter/fffabs/128.jpg" class="media-photo">
												</a>
                            <div class="media-body">
                              <span class="media-meta pull-right">Febrero 13, 2016</span>
                              <h4 class="title">
                                Lorem Impsum
                                <span class="pull-right items-overdue">(items-overdue)</span>
                              </h4>
                              <p class="summary">Ut enim ad minim veniam, quis nostrud exercitation...</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                      
                    </tbody>
                </table>
              </div>
            </div>
          </div>
          
        </div>
      </section>

    </div>`


  //document.getElementById("team-block-list"). innerHTML
  
  var teamTable = userTableHeader + userTable + userTableFooter

  let elem = document.getElementById("team-block")
  
  let localTeamFiles = team.map( (src, index) => {
    if(src.files == undefined) {
          src.files = []  
    } 
    let FileArray  = src.files.map( file =>  file.size )
    return FileArray 
  })
  
  console.log("LocalFIles Before Butchers", localTeamFiles)
  
  
  // concatMap :: (a -> [b]) -> [a] -> [b]
// const concatMap = f => xs =>
//   xs.reduce (mapReduce (f, concat), [])

  // mapReduce = (a -> b, (b,a) -> b, (b,a) -> b)
// const mapReduce = (m,r) =>
//   (acc,x) => r (acc, m (x))

// // concat :: ([a],[a]) -> [a]
// const concat = (xs,ys) =>
//   xs.concat (ys)

  
  
  // deepFlatten :: [[a]] -> [a]
const deepFlatten =
  concatMap (x =>
    Array.isArray (x) ? deepFlatten (x) : x)
    
    
    //console.log (deepFlatten (localTeamFiles))
  
  var newArr = deepFlatten (localTeamFiles)
  
  console.log("localTeamFiles", localTeamFiles)
  
  newArr = newArr.sort((a, b) => a - b)
  console.log("newArr", newArr)

  
  
  // const teamFileTotal = localTeam.files.map( (src, index) => {
  //   //console.log(src.files.length)
    
  // })
    
  
  
  
  let teamNextAction = arrNextAction.reduce(getSum, 0)
  let teamNext3Action = arrNext3Action.reduce(getSum, 0)
  let teamNext6Action = arrNext6Action.reduce(getSum, 0)
  
  console.log("TNA", teamNextAction)
  
  elem.innerHTML = `
  <div class="row team-div-main tile_count team_tile_count">
      

      <h3>Team Members (${(team.length) ? (team.length) : 0})</h3>
      
      ${(team.length) ? '<div class="container"> \
        <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo">Toggle Team Details</button> \
        <div id="demo" class="collapse"> \
            <div id="team-block-list" class="container">' + teamTable + ' \
            </div> \
        </div> \
      </div>': 0}
      
      
      
      <div class="col-md-2 col-sm-6 col-xs-12 tile_stats_count">
        <span class="count_top"><i class="fa fa-file"></i><b>Team </b> Total Files</span>
        <div id="team-total-files" class="count">${newArr.length}</div>
  <!--       <span class="count_bottom"><i class="green">4% </i> From last Week</span> -->
      </div>
      <div class="col-md-2 col-sm-6 col-xs-12 tile_stats_count">
        <span class="count_top"><i class="fa fa-clock-o"></i><b>Team </b> Oldest File</span>
        <div id="team-oldest-file" class="count">25 Mar 99</div>
        <span id="team-human-oldest" class="count_bottom red">......</span>
      </div>
      <div class="col-md-2 col-sm-6 col-xs-12 tile_stats_count">
        <span class="count_top"><i class="fa fa-file"></i><b>Team </b> Largest File</span>
        <div id="team-largest-file" class="count green">${ humanFileSize(newArr[newArr.length - 1], true) } </div>
        <!-- <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>34% </i> From last Week</span>  --> 
      </div>
      <div class="col-md-2 col-sm-6 col-xs-12 tile_stats_count">
        <span class="count_top"><i class="fa fa-file"></i><b>Team </b> Total Usage</span>
        <div id="team-total-usage" class="count">${ humanFileSize(newArr.reduce(getSum, 0), true) }</div>
        <!-- <span class="count_bottom"><i class="red"><i class="fa fa-sort-desc"></i>12% </i> From last Week</span> --> 
      </div>
      <div class="col-md-2 col-sm-6 col-xs-12 tile_stats_count">
        <span class="count_top"><i class="fa fa-clock-o"></i> Next Action</span>
        <div id="team-total-next-action" class="count">......</div>
        <!-- <span class="count_bottom"><i class="green"><i class="fa fa-sort-asc"></i>34% </i> From last Week</span> --> 
      </div>
      <div class="col-md-2 col-sm-6 col-xs-12 tile_stats_count">
        <span class="count_top"><i class="fa fa-clock-o"></i><b>Team </b> Next Action</span></br>
        <span style="color:coral" class="count_top"><i class="fa fa-calendar"></i> ${teamNextAction} Actions Urgent </span></br>
        <span class="purple"><i class=" fa fa-calendar"></i> ${teamNext3Action} Action in next 3 months </span></br>
        <span class="green"><i class=" fa fa-calendar"></i> ${teamNext6Action} action in next 6 months </span></br>
        <span class="green"></span>
        
      </div>
      
  </div>
  `
  
  //console.log(team)
   if ( arrNextActionDay[0] >= 7 ) {
    document.getElementById("team-total-next-action").classList.add("green")
    document.getElementById("team-total-next-action").innerHTML =  moment().add( arrNextActionDay[0], 'days' ).format("DD MMM YY")   
        
      // document.getElementById("oldest-file").innerHTML = minDate.format("DD MMM YY")
      // document.getElementById("human-oldest").innerHTML = minDate.fromNow()
      
      // console.log("Max Date", maxDate.format('DD-MM-YYYY'))
      // console.log("Min Date", minDate)
      
    // document.getElementById("next-footer-date").innerHTML =  moment().add( dataObj.nextActionDay, 'days' ).fromNow('days') + " from Now"  // moment( dataObj.nextActionDay ).fromNow()
    // document.getElementById("nextActionDay").innerHTML = dataObj.nextActionDay + " days time"
    
    
  } else {
    document.getElementById("team-total-next-action").classList.add("red") 
    document.getElementById("team-total-next-action").innerHTML = moment().add( arrNextActionDay[0], 'days' ).format("DD MMM YY")   // format("DD MMM YY")moment( dataObj.nextActionDay ).fromNow()
    // document.getElementById("next-footer-date").innerHTML = "<span class='red'><i class='red fa fa-ban'></i>" + moment().add( dataObj.nextActionDay, 'days' ).fromNow('days') + " overdue </span>"
    // document.getElementById("nextActionDay").innerHTML = dataObj.nextActionDay + " days overdue"
    
  
  }
  
  document.getElementById("team-oldest-file").innerHTML = teamMinDate.format("DD MMM YY")
  document.getElementById("team-human-oldest").innerHTML = teamMinDate.fromNow()
}


 










if ( dataObj.nextActionDay >= 7 ) {
  document.getElementById("total-file-date").classList.add("green")
  document.getElementById("total-file-date").innerHTML =  moment().add( dataObj.nextActionDay, 'days' ).format("DD MMM YY")   // moment( dataObj.nextActionDay ).fromNow()
  // next-footer-date
      
    // document.getElementById("oldest-file").innerHTML = minDate.format("DD MMM YY")
    // document.getElementById("human-oldest").innerHTML = minDate.fromNow()
    
    // console.log("Max Date", maxDate.format('DD-MM-YYYY'))
    // console.log("Min Date", minDate)
    
  document.getElementById("next-footer-date").innerHTML =  moment().add( dataObj.nextActionDay, 'days' ).fromNow('days') + " from Now"  // moment( dataObj.nextActionDay ).fromNow()
  document.getElementById("nextActionDay").innerHTML = dataObj.nextActionDay + " days time"
  
  
} else {
  document.getElementById("total-file-date").classList.add("red") 
  document.getElementById("total-file-date").innerHTML = moment().add( dataObj.nextActionDay, 'days' ).format("DD MMM YY")   // format("DD MMM YY")moment( dataObj.nextActionDay ).fromNow()
  document.getElementById("next-footer-date").innerHTML = "<span class='red'><i class='red fa fa-ban'></i>" + moment().add( dataObj.nextActionDay, 'days' ).fromNow('days') + " overdue </span>"
  document.getElementById("nextActionDay").innerHTML = dataObj.nextActionDay + " days overdue"
  

}


if(dataObj.files == undefined) {
  dataObj.files = []  
} 
var dataFile = dataObj.files 


var top20 = dataFile.slice(0, 15)

var remain = dataFile.slice(15, dataFile.length)



console.log("DataFiles Array length ", dataFile.length)
document.getElementById("total-files").innerHTML = dataFile.length
// 
document.getElementById("btn-open-more").innerHTML = remain.length
console.log("Actual File Info", dataFile)

console.log("top20", top20)

console.log("remain", remain)

/*
var string = "this is a string";
var length = 7;
var trimmedString = string.substring(0, length);
*/

/* 

var fileListHtml = top20.map((src, index) => `

        <tr id="row-${src.uuid}" class="${ (index%2) ? "odd" : "even" } pointer">
            <td class="a-center ">
            
            
           
                
            	<select id="${src.uuid}" onchange="changedSelect(this)" class="form-control">
            	    <option value="#f9f9f9" style="background-color: #f9f9f9;"><i class="fa fa-file"></i>please select</option>
                  <option value="lightgreen" style="background-color: lightgreen"><i class="fa fa-file"></i>No Action</option>
                  <option value="lightblue" style="background-color: lightblue"><i class="fa fa-file"></i>Moved</option>
                  <option value="yellow" style="background-color: yellow"><i class="fa fa-file"></i>Archived</option>
                  <option value="lightpink" style="background-color: lightpink"><i class="fa fa-file"></i>Lost/unknown</option>
                </select>
         
            
            
            
            
            <!--    <div class="icheckbox_flat-green" style="position: relative;"><input type="checkbox" class="flat" name="table_records" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>
            -->
            </td>
            <td class=" ">
                ${src.atime}
            </td>
            <td title="${src.fullpath}" class=" ">
                ${src.fullpath.substring(0,20)}...
            </td>
            <td class=" ">${humanFileSize(src.size, true)}</td>
            <td class=" " title="${src.uuid}">${src.uuid.substring(0, 8)}...</td>
            <td class=" ">${src.extension}</td>
            <td class="a-right a-right ">${src.mimetype}</td>
            <td class=" last"><a href="#">${src.filename}</a>
            </td>
        </tr>

            `).join('\n')
            
function changedSelect(e) {
  console.log("selected", e.value)
  console.log("this select", e.id)
  var random = Math.random()
  console.log(random*1000 + 1000)
  setTimeout(function(){ document.getElementById("row-" + e.id).setAttribute('style', `background-color:${e.value}`); }, 1500);
  //document.getElementById("row-" + e.id).setAttribute('style', `background-color:${e.value}`); // += e.value
}

function myFunction() {
  setTimeout(function(){ alert("Hello"); }, 3000);
}

var fileListHtmlex = remain.map((src, index) => `

        <tr id="row-${src.uuid}" class="${ (index % 2) ? "odd" : "even" } pointer">
            <td class="a-center ">
            
            
           
                
            	<select id="${src.uuid}" onchange="changedSelect(this)" class="form-control">
            	    <option value="#f9f9f9" style="background-color: #f9f9f9;"><i class="fa fa-file"></i>please select</option>
                  <option value="lightgreen" style="background-color: lightgreen"><i class="fa fa-file"></i>No Action</option>
                  <option value="lightblue" style="background-color: lightblue"><i class="fa fa-file"></i>Moved</option>
                  <option value="yellow" style="background-color: yellow"><i class="fa fa-file"></i>Archived</option>
                  <option value="lightpink" style="background-color: lightpink"><i class="fa fa-file"></i>Lost/unknown</option>
                </select>
         
            
            
            
            
            <!--    <div class="icheckbox_flat-green" style="position: relative;"><input type="checkbox" class="flat" name="table_records" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>
            -->
            </td>
            <td class=" ">
                ${src.atime}
            </td>
            <td title="${src.fullpath}" class=" ">
                ${src.fullpath.substring(0,20)}...
            </td>
            <td class=" ">${humanFileSize(src.size, true)}</td>
            <td class=" " title="${src.uuid}">${src.uuid.substring(0, 8)}...</td>
            <td class=" ">${src.extension}</td>
            <td class="a-right a-right ">${src.mimetype}</td>
            <td class=" last"><a href="#">${src.filename}</a>
            </td>
        </tr>

            `).join('\n')



var theader = `<table class="table table-striped jambo_table bulk_action"> 
                        <thead> 
                            <tr class="headings$"> 
                                
                                <th class="column-title" style="display: table-cell;">Action Type</th>
                                <th class="column-title" style="display: table-cell;">Acessed Date</th>
                                <th class="column-title" style="display: table-cell;">Full Path</th>
                                <th class="column-title" style="display: table-cell;">Size (bytes)</th>
                                <th class="column-title" style="display: table-cell;">MD5 Hash </th>
                                <th class="column-title" style="display: table-cell;">Extension </th>
                                <th class="column-title" style="display: table-cell;">Extension Desc </th>
                                <th class="column-title no-link last" style="display: table-cell;"><span class="nobr">File Name</span>
                                </th>
                                <th class="bulk-actions" colspan="7" style="display: none;">
                                    <a class="antoo" style="color:#fff; font-weight:500;">Bulk Actions ( <span class="action-cnt">1 Records Selected</span> ) <i class="fa fa-chevron-down"></i></a>
                                </th>
                            </tr>
                        </thead>
                        <tbody>`; 
                        
                        
                        
                            
                            
                            // <tr class="odd pointer">
                            //     <td class="a-center ">
                            //         <div class="icheckbox_flat-green" style="position: relative;"><input type="checkbox" class="flat" name="table_records" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>
                            //     </td>
                            //     <td class=" ">121000039</td>
                            //     <td class=" ">May 28, 2014 11:30:12 PM</td>
                            //     <td class=" ">121000208</td>
                            //     <td class=" ">John Blank L</td>
                            //     <td class=" ">Paid</td>
                            //     <td class="a-right a-right ">$741.20</td>
                            //     <td class=" last"><a href="#">View</a>
                            //     </td>
                            // </tr>
                        


var tableFooter = `</tbody> 
                    </table>`

var fullTable  = theader + fileListHtml  + tableFooter   
var extraTable = theader + fileListHtmlex  + tableFooter   
            
console.log("The FileList ", fileListHtml)   

document.getElementById("table-block").innerHTML = fullTable
document.getElementById("table-block-ex").innerHTML = extraTable

let moments = dataFile.map(d => moment(d.ctime, 'MM/DD/YYYY'))
let maxDate = moment.max(moments)
let minDate = moment.min(moments)
// numArray = numArray.sort((a, b) => a - b);
var sizes = dataFile.map(s => s.size )


sizes = sizes.sort((a, b) => a - b)

console.log(sizes)
if(sizes.length == 0) {
  sizes = [0]  
} 

function getSum(total, num) {
  return total + num;
}

document.getElementById("total-usage").innerHTML = humanFileSize(sizes.reduce(getSum, 0), true)



console.log("sizes", sizes[sizes.length - 1])

document.getElementById("largest-file").innerHTML = humanFileSize(sizes[sizes.length - 1], true)

    
    document.getElementById("oldest-file").innerHTML = minDate.format("DD MMM YY")
    document.getElementById("human-oldest").innerHTML = minDate.fromNow()
    
    console.log("Max Date", maxDate.format('DD-MM-YYYY'))
    console.log("Min Date", minDate)
    
    
    
// Graph stuff start paste     
    let myChart = document.getElementById("myChart").getContext("2d");

  // Global Options
  // Chart.defaults.global.defaultFontFamily = "Lato";
  // Chart.defaults.global.defaultFontSize = 18;
  // Chart.defaults.global.defaultFontColor = "#777";
  
  function genRandom() {
    return Math.floor((Math.random() * 10) + 4);
  }

  let massPopChart = new Chart(myChart, {
    type: "line", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      labels: [
        "type1",
        "type2",
        "type3",
        "type4"
      ],
      datasets: [
        {
          // label: "Population",
          data: [ genRandom(), genRandom(), genRandom(), genRandom() ],
          //backgroundColor:'green',
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)"
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#000"
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Absolute classification",
        fontSize: 12
      },
      legend: {
        display: true,
        position: "bottom",
        labels: {
          fontColor: "#000"
        }
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0
        }
      },
      tooltips: {
        enabled: true
      }
    }
  });
  // Graph stuff end paste 
    
    

/* 

<tr class="even pointer">
                                <td class="a-center ">
                                    <div class="icheckbox_flat-green" style="position: relative;"><input type="checkbox" class="flat" name="table_records" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>
                                </td>
                                <td class=" ">121000040</td>
                                <td class=" ">May 23, 2014 11:47:56 PM </td>
                                <td class=" ">121000210 <i class="success fa fa-long-arrow-up"></i></td>
                                <td class=" ">John Blank L</td>
                                <td class=" ">Paid</td>
                                <td class="a-right a-right ">$7.45</td>
                                <td class=" last"><a href="#">View</a>
                                </td>
                            </tr>
                            
                            
                            
                            
<tr class="odd pointer">
                                <td class="a-center ">
                                    <div class="icheckbox_flat-green" style="position: relative;"><input type="checkbox" class="flat" name="table_records" style="position: absolute; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div>
                                </td>
                                <td class=" ">121000039</td>
                                <td class=" ">May 23, 2014 11:30:12 PM</td>
                                <td class=" ">121000208 <i class="success fa fa-long-arrow-up"></i>
                                </td>
                                <td class=" ">John Blank L</td>
                                <td class=" ">Paid</td>
                                <td class="a-right a-right ">$741.20</td>
                                <td class=" last"><a href="#">View</a>
                                </td>
                            </tr>

*/

// // Chart options
// const options = {
//   chart: {
//     height: 350,
//     width: "35%",
//     type: "bar",
//     background: "#f4f4f4",
//     foreColor: "#333"
//   },
//   plotOptions: {
//     bar: {
//       horizontal: false
//     }
//   },
//   series: [
//     {
//       name: "Population",
//       data: [
//         8550405,
//         3971883,
//         2720546,
//         2296224,
//         1567442,
//         1563025,
//         1469845,
//         1394928,
//         1300092,
//         1026908
//       ]
//     }
//   ],
//   xaxis: {
//     categories: [
//       "New York",
//       "Los Angeles",
//       "Chicago",
//       "Houston",
//       "Philadelphia",
//       "Phoenix",
//       "San Antonio",
//       "San Diego",
//       "Dallas",
//       "San Jose"
//     ]
//   },
//   fill: {
//     colors: ["#00ff00", "#ffff00", "#00ffff", "#0000ff", "#ff00ff",        "#00ff00", "#ffff00", "#00ffff", "#0000ff", "#ff00ff"  ]
//   },
//   dataLabels: {
//     enabled: false
//   },

//   title: {
//     text: "Absolute classification",
//     align: "center",
//     margin: 20,
//     offsetY: 20,
//     style: {
//       fontSize: "25px"
//     }
//   }
// };

// // Init chart
// const chart = new ApexCharts(document.querySelector("#chart"), options);

// // Render chart
// chart.render();

// // Event example
// document.querySelector("#change").addEventListener("click", () =>
//   chart.updateOptions({
//     plotOptions: {
//       bar: {
//         horizontal: true
//       }
//     }
//   })
// );


// document.querySelector("#change2").addEventListener("click", () =>
//   chart.updateOptions({
//     plotOptions: {
//       bar: {
//         horizontal: false
//       }
//     }
//   })
// );





// var optionsGauge1 = {
//             chart: {
//                 type: 'radialBar',
//                 height: 316
//             },
//             plotOptions: {
//                 radialBar: {
//                     startAngle: -90,
//                     endAngle: 90,
//                     track: {
//                         background: "#e7e7e7",
//                         strokeWidth: '97%',
//                         margin: 5, // margin is in pixels
//                         shadow: {
//                             enabled: true,
//                             top: 2,
//                             left: 0,
//                             color: '#999',
//                             opacity: 1,
//                             blur: 2
//                         }
//                     },
//                     dataLabels: {
//                         name: {
//                             show: false
//                         },   
//                         value: {
//                             offsetY: 15,
//                             fontSize: '22px'
//                         }                     
//                     }
//                 }
//             },
//             fill: {
//                 gradient: {
//                     enabled: true,
//                     shade: 'light',
//                     shadeIntensity: 0.4,
//                     inverseColors: false,
//                     opacityFrom: 1,
//                     opacityTo: 1,
//                     stops: [0, 50, 53, 91]
//                 },
//             },
//             series: [ genRandom() ],
//             labels: ['Average Results'],
//             height: '100px'
           
//         }
        
// var optionsGauge2 = {
//             chart: {
//                 type: 'radialBar',
//                 height: 316
//             },
//             plotOptions: {
//                 radialBar: {
//                     startAngle: -90,
//                     endAngle: 90,
//                     track: {
//                         background: "#e7e7e7",
//                         strokeWidth: '97%',
//                         margin: 5, // margin is in pixels
//                         shadow: {
//                             enabled: true,
//                             top: 2,
//                             left: 0,
//                             color: '#999',
//                             opacity: 1,
//                             blur: 2
//                         }
//                     },
//                     dataLabels: {
//                         name: {
//                             show: false
//                         },   
//                         value: {
//                             offsetY: 15,
//                             fontSize: '22px'
//                         }                     
//                     }
//                 }
//             },
//             fill: {
//                 gradient: {
//                     enabled: true,
//                     shade: 'light',
//                     shadeIntensity: 0.4,
//                     inverseColors: false,
//                     opacityFrom: 1,
//                     opacityTo: 1,
//                     stops: [0, 50, 53, 91]
//                 },
//             },
//             series: [ genRandom() ],
//             labels: ['Average Results'],
//             height: '100px'
           
//         }
        
// var optionsGauge3 = {
//             chart: {
//                 type: 'radialBar',
//                 height: 316
//             },
//             plotOptions: {
//                 radialBar: {
//                     startAngle: -90,
//                     endAngle: 90,
//                     track: {
//                         background: "#e7e7e7",
//                         strokeWidth: '97%',
//                         margin: 5, // margin is in pixels
//                         shadow: {
//                             enabled: true,
//                             top: 2,
//                             left: 0,
//                             color: '#999',
//                             opacity: 1,
//                             blur: 2
//                         }
//                     },
//                     dataLabels: {
//                         name: {
//                             show: false
//                         },   
//                         value: {
//                             offsetY: 15,
//                             fontSize: '22px'
//                         }                     
//                     }
//                 }
//             },
//             fill: {
//                 gradient: {
//                     enabled: true,
//                     shade: 'light',
//                     shadeIntensity: 0.4,
//                     inverseColors: false,
//                     opacityFrom: 1,
//                     opacityTo: 1,
//                     stops: [0, 50, 53, 91]
//                 },
//             },
//             series: [ genRandom() ],
//             labels: ['Average Results'],
//             height: '100px'
           
//         }
        
// var optionsGauge4 = {
//             chart: {
//                 type: 'radialBar',
//                 height: 316
//             },
//             plotOptions: {
//                 radialBar: {
//                     startAngle: -90,
//                     endAngle: 90,
//                     track: {
//                         background: "#e7e7e7",
//                         strokeWidth: '97%',
//                         margin: 5, // margin is in pixels
//                         shadow: {
//                             enabled: true,
//                             top: 2,
//                             left: 0,
//                             color: '#999',
//                             opacity: 1,
//                             blur: 2
//                         }
//                     },
//                     dataLabels: {
//                         name: {
//                             show: false
//                         },   
//                         value: {
//                             offsetY: 15,
//                             fontSize: '22px'
//                         }                     
//                     }
//                 }
//             },
//             fill: {
//                 gradient: {
//                     enabled: true,
//                     shade: 'light',
//                     shadeIntensity: 0.4,
//                     inverseColors: false,
//                     opacityFrom: 1,
//                     opacityTo: 1,
//                     stops: [0, 50, 53, 91]
//                 },
//             },
//             series: [ genRandom() ],
//             labels: ['Average Results'],
//             height: '100px'
           
//         }        

//         var chartGauge1 = new ApexCharts(
//             document.querySelector("#chartGuage1"),
//             optionsGauge1
//         );
        
//         var chartGauge2 = new ApexCharts(
//             document.querySelector("#chartGuage2"),
//             optionsGauge2
//         );

//         var chartGauge3 = new ApexCharts(
//             document.querySelector("#chartGuage3"),
//             optionsGauge3
//         );

//         // var chartGauge4 = new ApexCharts(
//         //     document.querySelector("#chartGuage4"),
//         //     optionsGauge4
//         // );
        
        
//         chartGauge1.render();
//         chartGauge2.render();
//         chartGauge3.render();
//         //chartGauge4.render();
        
// function humanFileSize(bytes, si) {
//     var thresh = si ? 1000 : 1024;
//     if(Math.abs(bytes) < thresh) {
//         return bytes + ' B';
//     }
//     var units = si
//         ? ['kB','MB','GB','TB','PB','EB','ZB','YB']
//         : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
//     var u = -1;
//     do {
//         bytes /= thresh;
//         ++u;
//     } while(Math.abs(bytes) >= thresh && u < units.length - 1);
//     return bytes.toFixed(1)+' '+units[u];
// }




//     var optionsarea2 = {
//       chart: {
//         id: 'chartyear',
//         type: 'area',
//         height: 320,
//         background: '#F6F8FA',
//         toolbar: {
//           show: false,
//           autoSelected: 'pan'
//         },
//         events: {
//           mounted: function (chart) {
//             var commitsEl = document.querySelector('div span.commits');
//             var commits = chart.getSeriesTotalXRange(chart.w.globals.minX, chart.w.globals.maxX)

//             commitsEl.innerHTML = commits
//           },
//           updated: function (chart) {
//             var commitsEl = document.querySelector('.cmeta span.commits');
//             var commits = chart.getSeriesTotalXRange(chart.w.globals.minX, chart.w.globals.maxX)

//             commitsEl.innerHTML = commits
//           }
//         }
//       },
//       colors: ['#FF7F00'],
//       stroke: {
//         width: 0,
//         curve: 'smooth'
//       },
//       dataLabels: {
//         enabled: false
//       },
//       fill: {
//         opacity: 1,
//         type: 'solid'
//       },
//       series: [{
//         name: 'files',
//         data: githubdata.series
//       }],
//       yaxis: {
//         tickAmount: 3,
//         labels: {
//           show: false
//         }
//       },
//       xaxis: {
//         type: 'datetime',
//       }
//     }

//     var chartarea2 = new ApexCharts(
//       document.querySelector("#chart-area2"),
//       optionsarea2
//     );

//     chartarea2.render();

//     var optionsArea = {
//       chart: {
//         height: 360,
//         type: 'area',
//         background: '#F6F8FA',
//         toolbar: {
//           autoSelected: 'selection',
//         },
//         brush: {
//           enabled: true,
//           target: 'chartyear'
//         },
//         selection: {
//           enabled: true,
//           xaxis: {
//             min: new Date('05 Jan 2014').getTime(),
//             max: new Date('04 Jan 2015').getTime()
//           }
//         },
//       },
//       colors: ['#7BD39A'],
//       dataLabels: {
//         enabled: false
//       },
//       stroke: {
//         width: 0,
//         curve: 'smooth'
//       },

//       series: [{
//         name: 'files',
//         data: githubdata.series
//       }],
//       fill: {
//         opacity: 1,
//         type: 'solid'
//       },
//       legend: {
//         position: 'top',
//         horizontalAlign: 'left'
//       },
//       xaxis: {
//         type: 'datetime'
//       },
//     }

//     var chartArea = new ApexCharts(
//       document.querySelector("#chart-area"),
//       optionsArea
//     );

//     chartArea.render();
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//     var products = [
// 			{
//             	"name": "Burnify 1",
// 	            "points": 120,
//     	        "lastSprint": 13,
//         	    "mvpSprint": 10,
//             	"sprints": [
// 					{
//                     	"planned": 10,
// 	                    "done": 10
//     	    	    }, {
//         	            "planned": 12,
//             	        "done": 10
// 		            }, {
//     	                "planned": 10,
//         	            "done": 10
//     	        	}, {
//                 	    "planned": 10,
// 	                    "done": 6,
//     	                "added": 52
//         		    }, {
//             	        "planned": 14,
//                 	    "done": 8,
//                     	"added": 12
// 	        	    }, {
//     	                "planned": 14,
//         	            "done": 8,
//             	        "added": 2,
//                 	    "removed": 20
// 	            	}, {
//     	                "planned": 12,
//         	            "done": 4
// 	            	}, {
//                 	    "planned": 10,
// 	                    "done": 6,
//     	                "added": 2
//     	    	    }
//         	    ]
// 			}, {
// 		        "name": "Burnify 2",
// 		        "points": 220,
// 		        "lastSprint": 10,
// 		        "mvpSprint": 8,
// 		        "sprints": [{
// 		                "done": 18
// 		        }, {
// 		                "done": 24
// 		        }, {
// 		                "done": 16
// 		        }, {
// 		                "done": 22
// 		        }, {
// 		                "done": 8,
// 		                "added": 32
// 		        }, {
// 		                "done": 20,
// 		                "removed": 20
// 		        }, {
// 		                "done": 30,
// 		                "added": 2
// 		        }
// 		    ]
// 		}, {
// 		        "name": "Burnify 3",
// 		        "points": 120,
// 		        "lastSprint": 10,
// 		        "mvpSprint": 10,
// 		        "sprints": [{
// 		                "done": 10
// 		        }, {
// 		                "done": 10
// 		        }, {
// 		                "done": 10
// 		        }
// 		    ]
// 		}, {
// 		        "name": "Burnify 4",
// 		        "points": 200,
// 		        "lastSprint": 10,
// 		        "mvpSprint": 8,
// 		        "sprints": [{
// 		                "done": 20
// 		        }, {
// 		                "done": 20
// 		        }, {
// 		                "done": 20
// 		        }
// 		    ]
// 		}
//         ];
        	
// //        b1 = new Burnify("#product1", products[0], 800, 550);
//         b1 = new Burnify("#product1", products[0], 400, 250);
//         b1.onSprintBarClick = function(sprintNumber, sprint) { alert('Sprint ' + sprintNumber + ' (done: '+ sprint.done + ')'); };
//         b1.onFullScopeAreaClick = function(p) { alert('Project ' + p.name + ' full scope area!'); };
//         b1.onDoneScopeAreaClick = function(p) { alert('Project ' + p.name + ' done scope area!'); };
//         b1.onOutScopeAreaClick = function(p) { alert('Project ' + p.name + ' out scope area!'); };
//         b1.draw();
//         new Burnify("#product2", products[1], 400, 250).draw();
//         new Burnify("#product3", products[2], 400, 250).draw();
//         new Burnify("#product4", products[3], 400, 250).draw();
        
        
        
        
//       function generateData(count, yrange) {
//             var i = 0;
//             var series = [];
//             while (i < count) {
//                 var x = 'w' + (i + 1).toString();
//                 var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

//                 series.push({
//                     x: x,
//                     y: y
//                 });
//                 i++;
//             }
//             return series;
//         }


//         var optionsHeat = {
//             chart: {
//                 height: 350,
//                 type: 'heatmap',
//             },
//             dataLabels: {
//                 enabled: false
//             },
//             colors: ["#008FFB"],
//             series: [{
//                     name: 'Old Files',
//                     data: generateData(12, {
//                         min: 0,
//                         max: 90
//                     })
//                 },
//                 {
//                     name: 'Secure Files',
//                     data: generateData(12, {
//                         min: 0,
//                         max: 90
//                     })
//                 },
//                 {
//                     name: 'Large Files',
//                     data: generateData(12, {
//                         min: 0,
//                         max: 90
//                     })
//                 },
//                 {
//                     name: 'System Files',
//                     data: generateData(12, {
//                         min: 0,
//                         max: 90
//                     })
//                 },
//                 {
//                     name: 'config Files',
//                     data: generateData(12, {
//                         min: 0,
//                         max: 90
//                     })
//                 },
//                 {
//                     name: 'Doc Files',
//                     data: generateData(12, {
//                         min: 0,
//                         max: 90
//                     })
//                 },
//                 {
//                     name: 'Files',
//                     data: generateData(12, {
//                         min: 0,
//                         max: 90
//                     })
//                 },
//                 {
//                     name: 'Directories',
//                     data: generateData(12, {
//                         min: 0,
//                         max: 90
//                     })
//                 },
//                 {
//                     name: 'Archives',
//                     data: generateData(12, {
//                         min: 0,
//                         max: 90
//                     })
//                 }
//             ],
//             title: {
//                 text: ''
//             },

//         }

//         var chartHeat = new ApexCharts(
//             document.querySelector("#chartHeat"),
//             optionsHeat
//         );

//         chartHeat.render();
  
//             window.Apex = {
//       stroke: {
//         width: 3
//       },
//       markers: {
//         size: 0
//       },
//       tooltip: {
//         fixed: {
//           enabled: true,
//         }
//       }
//     };
    
//     var randomizeArray = function (arg) {
//       var array = arg.slice();
//       var currentIndex = array.length,
//         temporaryValue, randomIndex;

//       while (0 !== currentIndex) {

//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;

//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//       }

//       return array;
//     }

    // // data for the sparklines that appear below header area
    // var sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];

    // var spark1 = {
    //   chart: {
    //     type: 'area',
    //     height: 160,
    //     sparkline: {
    //       enabled: true
    //     },
    //   },
    //   stroke: {
    //     curve: 'straight'
    //   },
    //   fill: {
    //     opacity: 0.3,
    //     gradient: {
    //       enabled: false
    //     }
    //   },
    //   series: [{
    //     data: randomizeArray(sparklineData)
    //   }],
    //   yaxis: {
    //     min: 0
    //   },
    //   colors: ['#DCE6EC'],
    //   title: {
    //     text: '$424,652',
    //     offsetX: 0,
    //     style: {
    //       fontSize: '24px',
    //       cssClass: 'apexcharts-yaxis-title'
    //     }
    //   },
    //   subtitle: {
    //     text: 'Sales',
    //     offsetX: 0,
    //     style: {
    //       fontSize: '14px',
    //       cssClass: 'apexcharts-yaxis-title'
    //     }
    //   }
    // }

    // var spark2 = {
    //   chart: {
    //     type: 'area',
    //     height: 160,
    //     sparkline: {
    //       enabled: true
    //     },
    //   },
    //   stroke: {
    //     curve: 'straight'
    //   },
    //   fill: {
    //     opacity: 0.3,
    //     gradient: {
    //       enabled: false
    //     }
    //   },
    //   series: [{
    //     data: randomizeArray(sparklineData)
    //   }],
    //   yaxis: {
    //     min: 0
    //   },
    //   colors: ['#DCE6EC'],
    //   title: {
    //     text: '$235,312',
    //     offsetX: 0,
    //     style: {
    //       fontSize: '24px',
    //       cssClass: 'apexcharts-yaxis-title'
    //     }
    //   },
    //   subtitle: {
    //     text: 'Expenses',
    //     offsetX: 0,
    //     style: {
    //       fontSize: '14px',
    //       cssClass: 'apexcharts-yaxis-title'
    //     }
    //   }
    // }

    // var spark3 = {
    //   chart: {
    //     type: 'area',
    //     height: 160,
    //     sparkline: {
    //       enabled: true
    //     },
    //   },
    //   stroke: {
    //     curve: 'straight'
    //   },
    //   fill: {
    //     opacity: 0.3,
    //     gradient: {
    //       enabled: false
    //     }
    //   },
    //   series: [{
    //     data: randomizeArray(sparklineData)
    //   }],
    //   xaxis: {
    //     crosshairs: {
    //       width: 1
    //     },
    //   },
    //   yaxis: {
    //     min: 0
    //   },
    //   title: {
    //     text: '$135,965',
    //     offsetX: 0,
    //     style: {
    //       fontSize: '24px',
    //       cssClass: 'apexcharts-yaxis-title'
    //     }
    //   },
    //   subtitle: {
    //     text: 'Profits',
    //     offsetX: 0,
    //     style: {
    //       fontSize: '14px',
    //       cssClass: 'apexcharts-yaxis-title'
    //     }
    //   }
    // }

    // var spark1 = new ApexCharts(document.querySelector("#spark1"), spark1);
    // spark1.render();
    // var spark2 = new ApexCharts(document.querySelector("#spark2"), spark2);
    // spark2.render();
    // var spark3 = new ApexCharts(document.querySelector("#spark3"), spark3);
    // spark3.render();

    // var options1 = {
    //   chart: {
    //     type: 'line',
    //     width: 100,
    //     height: 35,
    //     sparkline: {
    //       enabled: true
    //     }
    //   },
    //   series: [{
    //     data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
    //   }],
    //   tooltip: {
    //     fixed: {
    //       enabled: false
    //     },
    //     x: {
    //       show: false
    //     },
    //     y: {
    //       title: {
    //         formatter: function (seriesName) {
    //           return ''
    //         }
    //       }
    //     },
    //     marker: {
    //       show: false
    //     }
    //   }
    // }

    // var options2 = {
    //   chart: {
    //     type: 'line',
    //     width: 100,
    //     height: 35,
    //     sparkline: {
    //       enabled: true
    //     }
    //   },
    //   series: [{
    //     data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
    //   }],
    //   tooltip: {
    //     fixed: {
    //       enabled: false
    //     },
    //     x: {
    //       show: false
    //     },
    //     y: {
    //       title: {
    //         formatter: function (seriesName) {
    //           return ''
    //         }
    //       }
    //     },
    //     marker: {
    //       show: false
    //     }
    //   }
    // }

    // var options3 = {
    //   chart: {
    //     type: 'line',
    //     width: 100,
    //     height: 35,
    //     sparkline: {
    //       enabled: true
    //     }
    //   },
    //   series: [{
    //     data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]
    //   }],
    //   tooltip: {
    //     fixed: {
    //       enabled: false
    //     },
    //     x: {
    //       show: false
    //     },
    //     y: {
    //       title: {
    //         formatter: function (seriesName) {
    //           return ''
    //         }
    //       }
    //     },
    //     marker: {
    //       show: false
    //     }
    //   }
    // }

    // var options4 = {
    //   chart: {
    //     type: 'line',
    //     width: 100,
    //     height: 35,
    //     sparkline: {
    //       enabled: true
    //     }
    //   },
    //   series: [{
    //     data: [15, 75, 47, 65, 14, 2, 41, 54, 4, 27, 15]
    //   }],
    //   tooltip: {
    //     fixed: {
    //       enabled: false
    //     },
    //     x: {
    //       show: false
    //     },
    //     y: {
    //       title: {
    //         formatter: function (seriesName) {
    //           return ''
    //         }
    //       }
    //     },
    //     marker: {
    //       show: false
    //     }
    //   }
    // }

    // var options5 = {
    //   chart: {
    //     type: 'bar',
    //     width: 100,
    //     height: 35,
    //     sparkline: {
    //       enabled: true
    //     }
    //   },
    //   plotOptions: {
    //     bar: {
    //       columnWidth: '80%'
    //     }
    //   },
    //   series: [{
    //     data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
    //   }],
    //   labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    //   xaxis: {
    //     crosshairs: {
    //       width: 1
    //     },
    //   },
    //   tooltip: {
    //     fixed: {
    //       enabled: false
    //     },
    //     x: {
    //       show: false
    //     },
    //     y: {
    //       title: {
    //         formatter: function (seriesName) {
    //           return ''
    //         }
    //       }
    //     },
    //     marker: {
    //       show: false
    //     }
    //   }
    // }

    // var options6 = {
    //   chart: {
    //     type: 'bar',
    //     width: 100,
    //     height: 35,
    //     sparkline: {
    //       enabled: true
    //     }
    //   },
    //   plotOptions: {
    //     bar: {
    //       columnWidth: '80%'
    //     }
    //   },
    //   series: [{
    //     data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
    //   }],
    //   labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    //   xaxis: {
    //     crosshairs: {
    //       width: 1
    //     },
    //   },
    //   tooltip: {
    //     fixed: {
    //       enabled: false
    //     },
    //     x: {
    //       show: false
    //     },
    //     y: {
    //       title: {
    //         formatter: function (seriesName) {
    //           return ''
    //         }
    //       }
    //     },
    //     marker: {
    //       show: false
    //     }
    //   }
    // }

    // var options7 = {
    //   chart: {
    //     type: 'bar',
    //     width: 100,
    //     height: 35,
    //     sparkline: {
    //       enabled: true
    //     }
    //   },
    //   plotOptions: {
    //     bar: {
    //       columnWidth: '80%'
    //     }
    //   },
    //   series: [{
    //     data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]
    //   }],
    //   labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    //   xaxis: {
    //     crosshairs: {
    //       width: 1
    //     },
    //   },
    //   tooltip: {
    //     fixed: {
    //       enabled: false
    //     },
    //     x: {
    //       show: false
    //     },
    //     y: {
    //       title: {
    //         formatter: function (seriesName) {
    //           return ''
    //         }
    //       }
    //     },
    //     marker: {
    //       show: false
    //     }
    //   }
    // }

    // var options8 = {
    //   chart: {
    //     type: 'bar',
    //     width: 100,
    //     height: 35,
    //     sparkline: {
    //       enabled: true
    //     }
    //   },
    //   plotOptions: {
    //     bar: {
    //       columnWidth: '80%'
    //     }
    //   },
    //   series: [{
    //     data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
    //   }],
    //   labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    //   xaxis: {
    //     crosshairs: {
    //       width: 1
    //     },
    //   },
    //   tooltip: {
    //     fixed: {
    //       enabled: false
    //     },
    //     x: {
    //       show: false
    //     },
    //     y: {
    //       title: {
    //         formatter: function (seriesName) {
    //           return ''
    //         }
    //       }
    //     },
    //     marker: {
    //       show: false
    //     }
    //   }
    // }

    // new ApexCharts(document.querySelector("#schart1"), options1).render();
    // new ApexCharts(document.querySelector("#schart2"), options2).render();
    // new ApexCharts(document.querySelector("#schart3"), options3).render();
    // new ApexCharts(document.querySelector("#schart4"), options4).render();
    // new ApexCharts(document.querySelector("#schart5"), options5).render();
    // new ApexCharts(document.querySelector("#schart6"), options6).render();
    // new ApexCharts(document.querySelector("#schart7"), options7).render();
    // new ApexCharts(document.querySelector("#schart8"), options8).render();
  
        
        
        
        
        
        
        
//   var optionsRadialBar = {
//             chart: {
//                 height: 350,
//                 type: 'radialBar',
//             },
//             plotOptions: {
//                 radialBar: {
//                     dataLabels: {
//                         name: {
//                             fontSize: '22px',
//                         },
//                         value: {
//                             fontSize: '16px',
//                         },
//                         total: {
//                             show: true,
//                             label: 'Total',
//                             formatter: function (w) {
//                                 // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
//                                 return 249
//                             }
//                         }
//                     }
//                 }
//             },
//             series: [44, 55, 67, 83],
//             labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
            
//         }

//        var chartRadialBar = new ApexCharts(
//             document.querySelector("#chartRadialBar"),
//             optionsRadialBar
//         );
        
//         chartRadialBar.render();
        
// $( "#btn-toggle-table" ).click(function() {
//     $( "#table-block-ex" ).toggle();
// });

// $("#table-block-ex").css("display", "none");




//  var radarOptions = {
//             chart: {
//                 height: 350,
//                 type: 'radar',
//                 dropShadow: {
//                     enabled: true,
//                     blur: 1,
//                     left: 1,
//                     top: 1
//                 }
//             },
//             series: [{
//                 name: 'Series 1',
//                 data: [80, 50, 30, 40, 100, 20],
//             }, {
//                 name: 'Series 2',
//                 data: [20, 30, 40, 80, 20, 80],
//             }, {
//                 name: 'Series 3',
//                 data: [44, 76, 78, 13, 43, 10],
//             }],
//             title: {
//                 text: 'Radar Chart - Multi Series'
//             },
//             stroke: {
//                 width: 0
//             },
//             fill: {
//                 opacity: 0.4
//             },
//             markers: {
//                 size: 0
//             },
//             labels: ['2011', '2012', '2013', '2014', '2015', '2016']
//         }

//         var radarChart = new ApexCharts(
//             document.querySelector("#radarChart"),
//             radarOptions
//         );

//         radarChart.render();

//         function update() {

//             function randomSeries() {
//                 var arr = []
//                 for(var i = 0; i < 6; i++) {
//                     arr.push(Math.floor(Math.random() * 100)) 
//                 }

//                 return arr
//             }
            

//             radarChart.updateSeries([{
//                 name: 'Series 1',
//                 data: randomSeries(),
//             }, {
//                 name: 'Series 2',
//                 data: randomSeries(),
//             }, {
//                 name: 'Series 3',
//                 data: randomSeries(),
//             }])
//         }