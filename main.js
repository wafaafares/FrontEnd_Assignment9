var siteName = document.getElementById('siteName')
var siteURL = document.getElementById('siteURL')
var booksArray = []; // To store the book objects
var regex = {
    siteName : {
        pattern : /^.{3,}/ ,
        isValid : false
    },
    siteURL : {
        pattern : /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
        isValid : false
    }
}

if(localStorage.getItem("booksArray") != null){
    booksArray = JSON.parse(localStorage.getItem("booksArray"));
    display(booksArray)
}

function updateStorage(){
    localStorage.setItem("booksArray",JSON.stringify(booksArray))
}

function submitBook(){
    if(regex.siteName.isValid && regex.siteURL.isValid){
        var bookObject = {
            name : siteName.value,
            url : siteURL.value,
        }
        booksArray.push(bookObject)
        updateStorage();
        display(booksArray)
        clearForm();
        siteName.classList.remove('is-valid')
        siteURL.classList.remove('is-valid')
    }else{
        document.getElementById('warning').innerHTML = `
            <div class="warningBackground position-absolute start-0 top-0 vh-100 w-100 d-flex flex-column justify-content-center align-items-center" >
            <div class="box-content bg-white p-4 rounded-2">
                <div class="icons d-flex justify-content-between align-items-center mb-3">
                    <div class="circles">
                        <span class="rounded-circle circle-1 me-1"></span>
                        <span class="rounded-circle circle-2 me-1"></span>
                        <span class="rounded-circle circle-3 me-1"></span>
                    </div>
                    <button onclick="closeWarning()" id="closeBtn" class=" btn "><i class="fa-solid fa-xmark fa-2x"></i></button>
                </div>
                <div class="box-info">
                    <p class="fw-bold pb-2 first-line">Site Name or Url is not valid, Please follow the rules below :</p>
                    <p class="pb-2">
                        <i class="fa-regular fa-circle-right me-1"></i>
                        <span>Site name must contain at least 3 characters</span>
                    </p>
                    <p class="pb-2">
                        <i class="fa-regular fa-circle-right me-1"></i>
                        <span>Site URL must be a valid one</span>
                    </p>
                </div>
            </div>
            
        </div>
`
        document.getElementById('warning').classList.remove('d-none')
    }
    regex.siteName.isValid = false; // To change the value of isValid after it become true
    regex.siteURL.isValid = false;
}

function display(list){
    var cartona = '';
    for(var i = 0; i < list.length; i++){
        cartona += `<tr>
           <td>${i+1}</td>
            <td>${booksArray[i].name}</td>
            <td>
                <button class="btn text-white" id="visitBtn" onclick="visitBook(${i})">
                    <i class="fa-solid fa-eye"></i>
                        Visit
                    </button>
            </td>
                        
            <td>
                <button class="btn text-white" id="deleteBtn" onclick="deleteBook(${i})">
                    <i class="fa-solid fa-trash-can"></i>
                        Delete
                </button>
            </td>
            </tr>`
    }
    document.getElementById("tableRows").innerHTML = cartona;
}

function clearForm(){
    siteName.value = '';
    siteURL.value = '';
}

function deleteBook(index){
    booksArray.splice(index,1);
    updateStorage(); //Update local storage as we update the array
    display(booksArray);//display again after deleting
}

function visitBook(index){
    window.open(booksArray[index].url) // It takes the url and open it in a new tab
}

function validateBook(element){
    if(regex[element.id].pattern.test(element.value)){
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        regex[element.id].isValid = true
    }else{
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        regex[element.id].isValid = false
    }  
}

function closeWarning(){
    document.getElementById('warning').classList.add('d-none')
}