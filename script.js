let container = document.querySelector('.mainContainer');
let addBtn = document.getElementById('add_btn');
let modal = document.getElementById('modalAddEmployee')
let closeBtn = document.getElementById('close');
let cancelBtn = document.getElementById('cancelBtn');
const submitBtn = document.getElementById('submitBtn')
const form = document.getElementById('formInput');
const totalEmp = document.getElementById('totalEmp');
const numToDisplay = document.getElementById('numToDisplay');

const pageContainer = document.getElementById('pagination');
let employeesArray =[];

// console.log(employeesArray);

let totalNo;
let currentPage = 1;
let startIndex;
let endIndex;
let paginatedData;

    let prevBtn = document.getElementById('prev');
    let backBtn = document.getElementById('back');
    let nextBtn = document.getElementById('next');
    let forwardBtn = document.getElementById('forward');

//fetching the local api of employee detailS to show the user details on the table
async function fetchApi()  {

    try{
        let data = await fetch('http://localhost:3000/employees');
        let response = await data.json();
        employeesArray = response;
        totalNo = response.length;
        let i;
        for(i=1;i<=totalNo;i++){
        let optionValue = document.createElement('option');
        optionValue.value= i;
        optionValue.innerText=i;
        numToDisplay.append(optionValue);
        }
        let defaultselect = totalNo;
        numToDisplay.value = defaultselect;
        totalEmp.innerText = `of ${totalNo}`;

        numToDisplay.addEventListener('change',()=>{
    
            let employeesPerPage = numToDisplay.value;
            console.log(employeesPerPage);
            
            let currentPage = 1;
            prevBtn.querySelector('i').style.color="#929093";
            backBtn.querySelector('i').style.color="#929093";
            startIndex= (currentPage-1)*employeesPerPage;
            endIndex = currentPage*employeesPerPage;
            paginatedData = response.slice(startIndex,endIndex);
            displayemployees(paginatedData);
            pagination(response);
        })

        

        displayemployees(response)
        pagination(response);
      
    }

    catch(error){
        console.log("error occured:", error)
    }
}

fetchApi();



function displayemployees(response){
    
        
        let tableBody = document.getElementById('table_employee');
        console.log(response);
        let row = "";


        response.forEach((element,index) => {
            let siNo;
            if(index<9){
                siNo = `#0${index+1}`;
            }
            else{
                siNo = `#${index+1}`;
            }
            row+=

            `<tr>
            <td scope = "row">${siNo}</td>
            <td style="display: flex; align-items:center; gap:3px"><div id="avatar">${element.firstName.charAt(0)}${element.lastName.charAt(0)}</div>${element.salutation} ${element.firstName} ${element.lastName}</td>
            <td>${element.email}</td>
            <td>${element.phone}</td>
            <td>${element.gender}</td>
            <td>${element.dob}</td>
            <td>${element.country}</td>
            <td><div  class="dropdown"><button class="btn btn-light options" type="button"
        data-bs-toggle="dropdown" aria-expanded="false">
       <i class="fa-solid fa-ellipsis text-primary" style="color: #4318FF">
       </i>
       </button>
    <ul id="dotmenu" class="dropdown-menu  rounded-4">  
       <li><button class="dropdown-item px-1" type="button" onclick="viewDetails('${element.id}')"> <i class="fa-regular px-2 fa-eye"></i> View Details </button></li>
       <li><button id="edit" data-bs-toggle="modal" data-bs-target="#exampleModal" class="dropdown-item px-1" type="button" onclick="editForm('${element.id}')"><i class="fa-solid px-2 fa-pen"></i>Edit </button></li>
       <li><button id="delete" class="dropdown-item px-1" type="button" onclick="deletePopup('${element.id}')"><i class="fa-regular px-2 fa-trash-can"></i>Delete</button>
       </li>
   </ul>
    </div></td>
            </tr>`;

            tableBody.innerHTML = row;

        })
    }

 



// NEWWW PAAGINATIONNNN HEREEEEE DOWNNNNN
function pagination(response) {
    let pageNumbers = document.getElementById("pageNumbers");
    let num = parseInt(numToDisplay.value); // numToDisplay must be defined globally or passed in
    let currentPage = 1;

    const totalPages = Math.ceil(response.length / num);

    function displayPageNumbers() {
        pageNumbers.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            let pagelist = document.createElement("li");
            let page = document.createElement("button");
            page.innerText = i;
            page.setAttribute("id", i);
            page.style.fontWeight = "500";
            pagelist.appendChild(page);
            pageNumbers.appendChild(pagelist);

            page.addEventListener("click", () => {
                currentPage = i;
                updateDisplay();
            });
        }
    }

    function updateDisplay() {
        const startIndex = (currentPage - 1) * num;
        const endIndex = currentPage * num;
        const paginatedData = response.slice(startIndex, endIndex);
        displayemployees(paginatedData);

        prevBtn.querySelector('i').style.color = currentPage > 1 ? "black" : "#929093";
        backBtn.querySelector('i').style.color = currentPage > 1 ? "black" : "#929093";
        nextBtn.querySelector('i').style.color = currentPage < totalPages ? "black" : "#929093";
        forwardBtn.querySelector('i').style.color = currentPage < totalPages ? "black" : "#929093";
    }

    backBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (currentPage > 1) {
            currentPage--;
            updateDisplay();
        }
    });

    prevBtn.addEventListener("click", () => {
        currentPage = 1;
        updateDisplay();
    });

    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            updateDisplay();
        }
    });

    forwardBtn.addEventListener("click", () => {
        currentPage = totalPages;
        updateDisplay();
    });

    displayPageNumbers();
    updateDisplay();
}

// const userdata =[];

//declaring all the input fields
const salutation = document.getElementById('salutation');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const username = document.getElementById('username');
const password = document.getElementById('password');
const email = document.getElementById('email');
const phone = document.getElementById('mobile');
const dob = document.getElementById('date');
const address = document.getElementById('address');
const qualifications = document.getElementById('qualification');
const country = document.getElementById('country');
const state = document.getElementById('state');
const city = document.getElementById('city');
const pincode = document.getElementById('pincode');




// <------------------POST EMPLOYEE DETAILS------------------------------->
const inputField = form.querySelectorAll('input');
const selectField = form.querySelectorAll('select');
//to display the modal
addBtn.addEventListener('click', function(){

    modal.style.background="rgba(0,0,0,0.7)";
    modal.style.display="block";
    modal.style.transition="all 3s ease-in-out";
    

// <---------------------------to post------------------------------------->
form.addEventListener("submit", (event)=>{
    
    event.preventDefault();
    
    let genderValidation = validateGender();
    let validate = validation();
    console.log(validate);
    
    if(validate&&genderValidation){
        addEmployee();

        // upload();
    }
    
})
oninput();
onselect()



})
function oninput(){
inputField.forEach((x)=>{
    x.addEventListener('input',()=>{
        validation();
        validateGender();
        if(x.value.trim!==''){
        x.style.color="#2B3674";
        }
    })
})
}
function onselect(){
selectField.forEach((x)=>{
    x.addEventListener('change',()=>{
        validation();
        validateGender();
        if(x.value=='select'||x.value=='select country'||x.value=='select state'){
            x.style.color="#949db9";
            }
            else{
                x.style.color="#2B3674"
                
            }
    })
})
}

closeBtn.addEventListener('click', ()=>{
    
    modal.style.display="none";
    modal.style.transition="all 3s ease-in-out"
    clearForm();
    form.reset();
})

cancelBtn.addEventListener('click',()=>{
    
    modal.style.display="none";
    modal.style.transition="all 3s ease-in-out"
    clearForm();
    form.reset();
})

// <------------------Function to post input details to api----------------------->
async function addEmployee(){
    const salutationVal = salutation.value;
    const firstNameVal = firstName.value;
    const lastNameVal = lastName.value;
    const usernameVal = username.value;
    const passwordVal = password.value;
    const emailVal = email.value;
    const mobileVal = phone.value;
    const dobVal = dob.value;
    const genderVal = getGenderValue();
    const addressVal = address.value;
    const qualificationVal = qualifications.value;
    const countryVal = country.value;
    const stateVal = state.value;
    const cityVal = city.value;
    const pincodeVal = pincode.value;


    const userInput={
        salutation : salutationVal,
        firstName: firstNameVal,
        lastName: lastNameVal,
        username: usernameVal,
        password: passwordVal,
        email: emailVal,
        phone: mobileVal,
        dob: dobVal.split('-').reverse().join('-'),
        gender: genderVal,
        address: addressVal,
        qualifications: qualificationVal,
        country: countryVal,
        state: stateVal,
        city: cityVal,
        pincode: pincodeVal
    }

    try{
        
    const response = await fetch ('http://localhost:3000/employees', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    })
    .then(response => 
    
        response.json(),
        


        
    

    ).then((data)=>{
        localStorage.setItem('editnot', 'added'),
        upload(data.id)
        
        console.log("success", data);
        console.log(data.id);
        employeesArray.push(userInput);

        


    })
    

}

    catch(error){
    console.error("Error in add employee:", error);

  }

  

}

function setError(element, message){
    const input = element.parentElement;
    const errordisplay = input.querySelector('.error');
    errordisplay.innerText = message;
    

}
function setSuccess(element){
    const input = element.parentElement;
    const errordisplay= input.querySelector('.error');
    errordisplay.innerText = "";
   
    
}

function validation(){

    const salutationValue= salutation.value.trim();
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    const emailValue = email.value.trim();
    const mobileValue = phone.value.trim();
    const dobValue = dob.value.trim();
    // const gender= document.querySelector('input[name="gender"]:checked').value;
    const addressValue = address.value.trim();
    const qualificationValue = qualifications.value.trim();
    const countryValue = country.value.trim();
    const stateValue = state.value.trim();
    const cityValue = city.value.trim();
    const pincodeValue = pincode.value.trim();

    let valid = true;


    //salutation validation

    if(salutationValue==""||salutationValue==null||salutationValue=="select"){
        setError(salutation, "Choose a salutation");
        valid = false;
    }
    else{
        setSuccess(salutation);
    }


    //usernamevalidation

    if(usernameValue==""||usernameValue==null){
        setError(username, "Username is required");
        valid= false;
    }
    else{
        setSuccess(username)
    }


    //password validation

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    
    if(passwordValue==""||passwordValue==null){
        setError(password, "Password is required");
        valid= false;
    }
    else if(passwordValue.length<8){
        setError(password, "password must contain atleast 8 characters")
        valid= false;
    }
    else if(!passwordRegex.test(passwordValue)){
        setError(password, "Password must contain special characters, alphabets and numbers");
        valid= false;
    }
    else{
        setSuccess(password);
    }


    //firstname validation
    const nameRegex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;

    if(firstNameValue==""||firstNameValue==null){
        setError(firstName, "Field is required")
        valid= false;
    }
    else if(!nameRegex.test(firstNameValue)){
        setError(firstName, "Invalid");
        valid= false;
    }
    else{
        setSuccess(firstName)
    }


    //lastname validation
    if(lastNameValue==""||lastNameValue==null){
        setError(lastName, "Field is required");
        valid= false;
    }
    else if(!nameRegex.test(lastNameValue)){
        setError(lastName, "Invalid")
    }
    else{
        setSuccess(lastName)
    }
    
    

    //email validation

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if( emailValue==""|| emailValue==null){
        setError(email, "Email is required");
        valid= false;
    }
    else if(!emailRegex.test(emailValue)){
        setError(email, "Please enter a valid email id");
        valid=false;
    }
    else{
        setSuccess(email);
    }

    //mobile number validation

    const mobileNumberRegex = /^[0-9]{10}$/;
    if(mobileValue==""||mobileValue==null){
        setError(phone, "Phone number is required");
        valid=false;
    }
    else if(!mobileNumberRegex.test(mobileValue)){
        setError(phone, "Please enter a valid phone number");
        valid=false;
    }
    else{
        setSuccess(phone);
    }

    //dob validation
    if(dobValue==""||dobValue==null){
        setError(dob, "Enter a date");
        valid=false;
    }
    else{
        setSuccess(dob)
    }

    //address validation
    if(addressValue==""||addressValue==null){
        setError(address, "Address is required");
        valid=false;
    }
    else{
        setSuccess(address)
    }

    //<----------------------------------qualification validation--------------------------------->

    const qualificationRegex = /^[A-Za-z\s]+(?:[\s-][A-Za-z]+)*$/;
    if(qualificationValue==""||qualificationValue==null){
        setError(qualifications, "Please enter your qualification");
        valid=false;
    }
    else if(!qualificationRegex.test(qualificationValue)){
        setError(qualifications, "Invalid");
        valid = false;

    }
    else{
        setSuccess(qualifications)
    }
 
    //<-----------------------------------country validation-------------------------------------->
    if(countryValue==""||countryValue==null||countryValue=="select country"){
        setError(country, "Please select a country");
        valid= false;
    }
    else{
        setSuccess(country);
    }

    //<--------------------------state validation------------------------------------------>
    if(stateValue==""||stateValue==null||stateValue=="select state"){
        setError(state, "Please select a state");
        valid=false;
    }
    else{
        setSuccess(state)
    }

    //<-------------------------city validation-------------------------------->
    const cityRegex = /^[A-Za-z]+(?:[\s-][A-Za-z]+)*$/;
    if(cityValue==""||cityValue==null){
        setError(city, "City is required");
        valid=false;
    }
    else if(!cityRegex.test(cityValue)){
        setError(city, "Invalid")
    }
    else{
        setSuccess(city)
    }

    //<---------------------------pincode validation---------------------------------->
    if(pincodeValue.length<5){
        setError(pincode, "Please enter a valid pincode");
        valid= false;
    }
    else if(pincodeValue==""||pincodeValue==null){
        setError(pincode, "Pincode is required");
        valid=false;
    }
    else{
        setSuccess(pincode)
    }

    return valid;
}

//<--------------------------- gender validation----------------------------------->

function getGenderValue(){
    const genderRadios = document.getElementsByName("gender");
    for (let i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].checked) {
            return genderRadios[i].value;
        }
        
    }
    return null; 

}
function validateGender(){
    const genderErr = document.getElementById('genderErr');
    let selectedGender = getGenderValue();
    let isvalid;
    if(!selectedGender){
        genderErr.innerText="Please select a gender"
        return false
    }
    else{
        genderErr.innerText="";
        return true
    }
   

}

// <------------------- Function to clear error messages-------------------------->

function clearForm() {
    let small = form.querySelectorAll('.error');
    small.forEach((x) => {
        x.innerText = "";
    });
    
}

// <------------------------------------------------DELETE EMPLOYEE------------------------------------------------------------------>

const modalDelete = document.getElementById('modalDelete');

const canceldlt = document.getElementById('cancelDlt');
const closedlt = document.getElementById('closedlt');

// <---------------------------Popup for confirmation to delete--------------------------------------------->
function deletePopup(x){
    const dltEmployeeBtn = document.getElementById('dlt_btn');
    modalDelete.style.background=" rgba(0, 0, 0, 0.5)";
    modalDelete.style.display="block";
    modalDelete.style.transition="all 2s ease-in-out";
    dltEmployeeBtn.addEventListener('click',()=>{
    deleteUser(x);
 })


}
// <----------------------------------Function to delete user----------------------------------------------->

async function deleteUser(userId) {
    try {
        
        const response = await fetch(`http://localhost:3000/employees/${userId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            localStorage.setItem('editnot', 'deleted');
            console.log(`User with ID ${userId} has been deleted successfully.`);
            deleteAvatar(userId);
            // fetchApi(); 
        } else {
            console.error(`Failed to delete user with ID ${userId}. Status: ${response.status}`);
        }
    } catch (error) {
        console.error(`An error occurred while deleting user with ID ${userId}:`, error);
    }
}



canceldlt.addEventListener('click',()=>{
    modalDelete.style.display="none";
     modalDelete.style.transition="all 2s ease-in-out"
})


closedlt.addEventListener('click',()=>{
    modalDelete.style.display="none";
    modalDelete.style.transition="all 2s ease-in-out"
})

// <----------------------------------------------------EDIT EMPLOYEE------------------------------------------------------------>
//to display edit employee modal
async function editForm(id){
    const formHeader = document.getElementById('formHeader');


    modal.style.background="rgba(0,0,0,0.7)";
    modal.style.display="block";
    modal.style.transition="all 3s ease-in-out";
    formHeader.innerText="Edit Employee";
    submitBtn.innerText="Save Changes";

     const response= await fetch(`http://localhost:3000/employees/${id}`);
     const data = await response.json();
     console.log(data);
     
     let employee = data;
     
     
     salutation.value = employee.salutation;
     firstName.value = employee.firstName;
     lastName.value = employee.lastName;
     username.value = employee.username;
     password.value = employee.password;
     email.value = employee.email;
     phone.value = employee.phone;
     document.querySelector(`input[name="gender"][value = "${employee.gender}"]`).checked = true;
     dob.value = employee.dob.split('-').reverse('').join('-');
     address.value = employee.address;
     qualifications.value = employee.qualifications;
     country.value = employee.country;
     state.value = employee.state;
     city.value = employee.city;
     pincode.value = employee.pincode;

     inputField.forEach((x)=>{
        
            x.style.color="#2B3674";
            x.style.fontWeight="500"
            
        
     })
     selectField.forEach((x)=>{
       
            x.style.color="#2B3674";
            x.style.fontWeight="500"
     })

     form.addEventListener('submit',(event)=>{
        event.preventDefault();
        
        let genderValidation= validateGender();
        
        let validate = validation();
        if (validate&&genderValidation){
            editEmployee(id);
            upload(id);
        }
     })
  
}
//function to update the user details in local api
 async function editEmployee(user) {
    const salutationEdit =salutation.value;
    const firstNameEdit = firstName.value;
    const lastNameEdit = lastName.value;
    const usernameEdit = username.value;
    const passwordEdit = password.value;
    const emailEdit = email.value;
    const mobileEdit = phone.value;
    const dobEdit = dob.value;
    const genderEdit = getGenderValue();
    const addressEdit = address.value;
    const qualificationEdit = qualifications.value;
    const countryEdit = country.value;
    const stateEdit = state.value;
    const cityEdit = city.value;
    const pincodeEdit = pincode.value;

    const editInput={
        salutation : salutationEdit,
        firstName: firstNameEdit,
        lastName: lastNameEdit,
        username: usernameEdit,
        password: passwordEdit,
        email: emailEdit,
        phone: mobileEdit,
        dob: dobEdit.split('-').reverse().join('-'),
        gender: genderEdit,
        address: addressEdit,
        qualifications: qualificationEdit,
        country: countryEdit,
        state: stateEdit,
        city: cityEdit,
        pincode: pincodeEdit
    }

    try {
        const result = await fetch(`http://localhost:3000/employees/${user}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editInput)
        });
    
        if (result.ok) {
            localStorage.setItem('editnot', 'edited');

          const updatedUser = await result.json();
          console.log('User updated successfully:', updatedUser);
          upload(user);
          
          fetchApi();
        } else {
          console.error('Failed to update user:', result.status);
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    
 }
 
 

 if (localStorage.getItem('editnot')) {
    let color;
    if (localStorage.getItem('editnot') == 'deleted') {
        color = 'red';
    }
    else{
        color = 'green';
    }

    Swal.fire({
        icon: 'success',
        iconColor: `${color}`,
        title: `User ${localStorage.getItem('editnot')} successfully`,
        showConfirmButton: false,
        timer: 1800
    });
   localStorage.removeItem('editnot');
  }


//----------------------------------UPLOAD AVATAR----------------------------------------------
const imageContainer = document.getElementById('avatar');

async function upload(id) {
    const imageUpload = document.getElementById('imageUpload');
    if (!imageUpload) {
        console.error("Image upload input not found");
        return;
    }

    

    const file = imageUpload.files[0];
    if (!file) {
        console.log("No image was uploaded");
        return;
    }

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
        console.log("Invalid file type. Please upload a JPEG or PNG image.");
        return;
    }

    if (file.size > 5 * 1024 * 1024) { 
        console.log("File size exceeds 5 MB.");
        return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    console.log("Uploading avatar for ID:", id);

    try {
        const response = await fetch(`http://localhost:3000/employees/${id}/avatar`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Image uploaded successfully:", result);

            // imageContainer.classList.remove('no_avatar');
            imageContainer.innerHTML = ""; // Clear previous content

            const img = document.createElement('img');
            // img.src = URL.createObjectURL(file);
            img.src = `http://localhost:3000${result.imagePath}`;
            console.log("Image source set to:", img.src);
            img.style.width = "100%";
            img.alt = "Avatar";
            // img.onload = () => URL.revokeObjectURL(img.src); // Prevent memory leak
            imageContainer.appendChild(img);
        } else {
            console.log('Failed to upload image:', response.status);
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
}

// ----------------------------------DELETE AVATAR----------------------------------------------
async function deleteAvatar(x){
    try{
        
        const response = await fetch(`http://localhost:3000/employees/${x}/avatar`,{
            method: "DELETE",
        });
        if(response.ok){
            console.log("Avatar deleted successfully");
        }
        else{
            console.log(`Failed to delete avatar:${x}`, response.status);
        }
    }
    catch(error){
        console.error("Error deleting avatar:", error);
    }
}


//---------------------------Navigate to VIEW DETAILS--------------------
function viewDetails(userid){
    localStorage.setItem('userid',`${userid}`);
    window.location.href="index-view.html";
    

}
//---------------------------Navigate from VIEW DETAILS to edit--------------------
let editID= localStorage.getItem('editId');
if(editID){
    editForm(editID);
    localStorage.removeItem('editId');
    form.addEventListener('submit',(event)=>{ 
    window.location.href="index-view.html";
    })
}


// <---------------------------------SEARCH FUNCTION------------------------------------>
let search = document.getElementById('searchbar');
console.log(search);


search.addEventListener('keyup',()=>{
    let searchValue = search.value.trim().toLowerCase();
    let searchResult = employeesArray.filter((x)=>{
        return  x.firstName.toLowerCase().includes(searchValue)||x.lastName.toLowerCase().includes(searchValue)||x.email.toLowerCase().includes(searchValue)||x.phone.toLowerCase().includes(searchValue);
        
    })
    if(searchResult.length==0){
        displayemployees(searchResult);
        alert("No results found");
    }
    
    displayemployees(searchResult);
})

