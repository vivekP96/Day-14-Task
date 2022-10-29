var global = [];
let currPage = 0;
const pageLimit = 5;
let VisiblePage = 1;

// h1
const h1Element = document.createElement("h1");
h1Element.id = "title";
h1Element.innerText = "Pagination";
document.body.appendChild(h1Element);

//crating P tag
const pElement = document.createElement("p");
pElement.id = "description";
pElement.innerText = "Pagination of Datas using DOM Manipulation";
document.body.appendChild(pElement);

//creating div tag
const divElement = document.createElement("div");
divElement.className = "table-responsive";
document.body.appendChild(divElement);

//creating table tag
const tableElement = document.createElement("table");
tableElement.className = "table table-bordered ";
tableElement.id = "table";
divElement.appendChild(tableElement);

//creating thead tag
const theadElement = document.createElement("thead");
theadElement.className = "table table-bordered table-dark";

//creating tr tag and th for table coloumns
const trElement = document.createElement("tr");
["id", "name", "email"].forEach((coloumn) => {
  const thElement = document.createElement("th");
  thElement.innerText = coloumn;
  trElement.appendChild(thElement);
});
theadElement.appendChild(trElement);

//creating tbody
const tbodyElement = document.createElement("tbody");
tableElement.append(theadElement, tbodyElement);

//crating buttonDiv
const btnDiv = document.createElement("div");
btnDiv.className = "d-flex justify-content-center";
btnDiv.id = "buttons";
document.body.appendChild(btnDiv);
//creating First button
const firstBtn = document.createElement("button");
firstBtn.innerText = "First";
firstBtn.id = "first";
btnDiv.appendChild(firstBtn);

//creating prev button
const prevBtn = document.createElement("button");
prevBtn.innerText = "Prev";
prevBtn.id = "previous";
btnDiv.appendChild(prevBtn);

//creating Next button
const nextBtn = document.createElement("button");
nextBtn.innerText = "Next";
nextBtn.id = "next";
// btnDiv.appendChild(nextBtn);

//creating Last button
const lastBtn = document.createElement("button");
lastBtn.innerText = "Last";
lastBtn.id = "last";
// btnDiv.appendChild(lastBtn);

const request = new XMLHttpRequest();
request.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
);
request.send(null);
request.onload = () => {
  const data = JSON.parse(request.responseText);
  global = data;
  CreatePagebuttons();
  data.slice(currPage, pageLimit).forEach(({ id, email, name }) => {
    //creating inner tr
    const innerTr = document.createElement("tr");
    //creating td's elements
    const innerTdId = document.createElement("td");
    innerTdId.innerText = id;
    
    const innerTdName = document.createElement("td");
    innerTdName.innerText = name;
    const innerTdEmail = document.createElement("td");
    innerTdEmail.innerText = email;
    innerTr.append(innerTdId, innerTdName, innerTdEmail);
    tbodyElement.appendChild(innerTr);
  });
};
document.body.style.textAlign = "center";
//next button function
const showNextSetOfData = () => {
  if (currPage != global.length / pageLimit - 1) {
    tbodyElement.innerHTML = "";
     currPage++;
     VisiblePage=currPage+1;
    const startIndex = currPage * pageLimit;
    const endIndex = currPage * pageLimit + pageLimit;
// console.log(VisiblePage);
// console.log(currPage);
    global.slice(startIndex, endIndex).forEach(({ id, email, name }) => {
      //creating inner tr
      const innerTr = document.createElement("tr");
      //creating td's elements
      const innerTdId = document.createElement("td");
      innerTdId.innerText = id;
      const innerTdName = document.createElement("td");
      innerTdName.innerText = name;
      const innerTdEmail = document.createElement("td");
      innerTdEmail.innerText = email;
      innerTr.append(innerTdId, innerTdName, innerTdEmail);
      tbodyElement.appendChild(innerTr);
    });

   // id frpom vis page let i=1;i<id-2         i=global/page   i>id+2   i-- 
   // id frpom vis page let i=1;i<id-2         i=global/page   i>id+2   i-- 
  
    
  }
};

nextBtn.addEventListener("click", showNextSetOfData);

const showPrevSetOfData = () => {
  if (currPage != 0) {
    currPage -= 1;
    tbodyElement.innerHTML = "";

    const startIndex = currPage * pageLimit;
    const endIndex = currPage * pageLimit + pageLimit;

    global.slice(startIndex, endIndex).forEach(({ id, email, name }) => {
      //creating inner tr
      const innerTr = document.createElement("tr");
      //creating td's elements
      const innerTdId = document.createElement("td");
      innerTdId.innerText = id;
      const innerTdName = document.createElement("td");
      innerTdName.innerText = name;
      const innerTdEmail = document.createElement("td");
      innerTdEmail.innerText = email;
      innerTr.append(innerTdId, innerTdName, innerTdEmail);
      tbodyElement.appendChild(innerTr);
    });

  }
};
prevBtn.addEventListener("click", showPrevSetOfData);

const ShowFirstPageData = () => {
  tbodyElement.innerHTML = "";
  currPage = 0;
  global.slice(0, pageLimit).forEach(({ id, email, name }) => {
    //creating inner tr
    const innerTr = document.createElement("tr");
    //creating td's elements
    const innerTdId = document.createElement("td");
    innerTdId.innerText = id;
    const innerTdName = document.createElement("td");
    innerTdName.innerText = name;
    const innerTdEmail = document.createElement("td");
    innerTdEmail.innerText = email;
    innerTr.append(innerTdId, innerTdName, innerTdEmail);
    tbodyElement.appendChild(innerTr);
    // console.log(VisiblePage)
    if(VisiblePage>2){
      document.getElementById(`btn-${VisiblePage}`).style.display="none";
    }
    if(VisiblePage-2>0){
    document.getElementById(`btn-${VisiblePage-2}`).style.display="none";
    }
    if(VisiblePage-1 > 0){
    document.getElementById(`btn-${VisiblePage-1}`).style.display="none";
    }
    if(VisiblePage+1 <global.length/pageLimit)
    document.getElementById(`btn-${VisiblePage+1}`).style.display="none";
    
    if(VisiblePage+2 <=global.length/pageLimit )
    document.getElementById(`btn-${VisiblePage+2}`).style.display="none";
    const FinalPage= global.length/pageLimit;
    document.getElementById(`btn-${FinalPage}`).style.display='none';
    document.getElementById(`btn-${FinalPage-1}`).style.display='none';
    document.getElementById(`btn-${FinalPage-2}`).style.display='none';

  
    document.getElementById(`btn-1`).style.display="inline-block";
    document.getElementById(`btn-2`).style.display="inline-block";
    
    
  });
};

firstBtn.addEventListener("click", ShowFirstPageData);

const ShowLastPageData = () => {
  tbodyElement.innerHTML = "";
  currPage = global.length / pageLimit - 1;
  const startIndex = global.length - pageLimit;
  const endIndex = global.length;
  const FinalPage= global.length/pageLimit;

  global.slice(startIndex, endIndex).forEach(({ id, email, name }) => {
    //creating inner tr
    const innerTr = document.createElement("tr");
    //creating td's elements
    const innerTdId = document.createElement("td");
    innerTdId.innerText = id;
    const innerTdName = document.createElement("td");
    innerTdName.innerText = name;
    const innerTdEmail = document.createElement("td");
    innerTdEmail.innerText = email;
    innerTr.append(innerTdId, innerTdName, innerTdEmail);
    tbodyElement.appendChild(innerTr);
    if(VisiblePage>2){
      document.getElementById(`btn-${VisiblePage}`).style.display="none";
    }
    if(VisiblePage-2>0){
    document.getElementById(`btn-${VisiblePage-2}`).style.display="none";
    }
    if(VisiblePage-1 > 0){
    document.getElementById(`btn-${VisiblePage-1}`).style.display="none";
    }
    if(VisiblePage+1 <global.length/pageLimit)
    document.getElementById(`btn-${VisiblePage+1}`).style.display="none";
    
    if(VisiblePage+2 <=global.length/pageLimit )
    document.getElementById(`btn-${VisiblePage+2}`).style.display="none";

    document.getElementById(`btn-1`).style.display="none";
    document.getElementById(`btn-2`).style.display="none";
    

    document.getElementById(`btn-${FinalPage}`).style.display='inline-block';
    document.getElementById(`btn-${FinalPage-1}`).style.display='inline-block';
    document.getElementById(`btn-${FinalPage-2}`).style.display='inline-block';

    
  });
};

lastBtn.addEventListener("click", ShowLastPageData);

const CreatePagebuttons = () => {
  const Buttoncount = global.length / pageLimit;
  const PagebtnDiv = document.createElement("div");
  PagebtnDiv.id = "pagebtnDiv";
  for (let i = 1; i <= Buttoncount; i++) {
    const pgbtn = document.createElement("button");
    pgbtn.id = `btn-${i}`;
    pgbtn.innerText = i;
    pgbtn.style.display = "none";
    if (i == 1 || i == 2) {
      pgbtn.style.display = "inline-block";
    }

    pgbtn.addEventListener("click", () => HandlePageNOClick(i));
    console.log(pgbtn);
    btnDiv.appendChild(pgbtn);
  }
  btnDiv.appendChild(nextBtn);
  btnDiv.appendChild(lastBtn);
};
const HandlePageNOClick = (id) => {
  tbodyElement.innerHTML = "";
  currPage = id-1;
  VisiblePage=id;
  
  const startIndex = currPage * pageLimit;
  const endIndex = currPage * pageLimit + pageLimit;
  global.slice(startIndex, endIndex).forEach(({ id, email, name }) => {
    //creating inner tr
    const innerTr = document.createElement("tr");
    //creating td's elements
    const innerTdId = document.createElement("td");
    innerTdId.innerText = id;
    const innerTdName = document.createElement("td");
    innerTdName.innerText = name;
    const innerTdEmail = document.createElement("td");
    innerTdEmail.innerText = email;
    innerTr.append(innerTdId, innerTdName, innerTdEmail);
    tbodyElement.appendChild(innerTr);
  });
  //Dynamic page No Handling from Left to Right
  //id=6;

  const Nextpgno = id + 1;
  const Finalpgno = id + 2;
  for (let i = 1; i < id - 2; i++) 
  {
    const Prevpgno = `btn-${i}`;

    document.getElementById(Prevpgno).style.display = "none";
  }
  if(id - 1> 0){
  document.getElementById(`btn-${id - 1}`).style.display = "inline-block";
  }
  if(id-2 >0){
  document.getElementById(`btn-${id - 2}`).style.display = "inline-block";
  }
  for(let i=global.length/pageLimit;i > id +2;i--){
    const lastPageNo=`btn-${i}`;
    document.getElementById(lastPageNo).style.display='none';
  }
  if(id - 1> 0){
  document.getElementById(`btn-${id - 1}`).style.display = "inline-block";
  }
if(Nextpgno <= global.length/pageLimit){
  document.getElementById(`btn-${Nextpgno}`).style.display = "inline-block";
}
  if(Finalpgno < (global.length/pageLimit)-1){
  document.getElementById(`btn-${Finalpgno}`).style.display = "inline-block";
  }

};


