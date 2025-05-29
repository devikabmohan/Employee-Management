let employeeId = localStorage.getItem('userid');
console.log(employeeId);

fetchApi(employeeId);

let employeeDetailsDisplay = document.getElementById('employeeDetailsDisplay');
employeeDetailsDisplay.onclick = function(){
    window.location.href = "index.html";
}


async function fetchApi(id){
    try{
        const response = await fetch(`http://localhost:3000/employees/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          let data = await response.json();
            console.log(data);
          displayData(data);

    }
    catch(error){
        console.log("error:",error)

    }

    
}

function displayData(employee){

 let agedata = employee.dob
console.log(agedata);
let year = agedata.split("-").pop()
console.log(year)
let currentyear = new Date().getFullYear()
console.log(currentyear);
let currentage = currentyear-year
console.log(currentage);

    // document.getElementById('img').src = `http://localhost:3000/employees/${employee.id}/avatar`;
    document.getElementById('viewName').innerText = `${employee.firstName} ${employee.lastName}`;
    document.getElementById('viewEmail').innerText = `${employee.email}`;
    document.getElementById('gender').innerText = `${employee.gender}`;
    document.getElementById('age').innerText = currentage;
    document.getElementById('dob').innerText = `${employee.dob}`;
    document.getElementById('mobile').innerText = `${employee.phone}`;
    document.getElementById('qualification').innerText = `${employee.qualifications}`;
    document.getElementById('address').innerText = `${employee.address}`;
    document.getElementById('username').innerText = `${employee.username}`;

}


// -------------------Delete Employee-------------------
const modalDelete = document.getElementById('modalDelete');
const canceldlt = document.getElementById('cancelDlt');
const closedlt = document.getElementById('closedlt');

function deletePopup(x){
  const dltEmployeeBtn = document.getElementById('dlt_btn');
  modalDelete.style.background=" rgba(0, 0, 0, 0.5)";
  modalDelete.style.display="block";
  modalDelete.style.transition="all 2s ease-in-out";
  dltEmployeeBtn.addEventListener('click',()=>{
  deleteEmployee(x);
})
}

let deleteBtn = document.getElementById('dltBtn');
deleteBtn.addEventListener('click',()=>{
    deletePopup(employeeId);
});
canceldlt.addEventListener('click',()=>{
  modalDelete.style.display= "none";
  modalDelete.style.transition="all 2s ease-in-out";
});
closedlt.addEventListener('click',()=>{
  modalDelete.style.display= "none";
  modalDelete.style.transition="all 2s ease-in-out";
});

async function deleteEmployee(id){
    try{
        const response = await fetch(`http://localhost:3000/employees/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
            
          }
          localStorage.setItem('editnot','deleted');
          data = await response.json();
          
          console.log(data);
          window.location.href = "index.html";
        }
        catch(error){
            console.log("error:",error)
    
        }
    }

let editBtn = document.getElementById('editBtn');
editBtn.addEventListener('click',()=>{
    localStorage.setItem('editId',employeeId);
    window.location.href = "index.html";
})
          