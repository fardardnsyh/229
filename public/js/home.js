


if(!(localStorage.getItem("theme"))){
    localStorage.setItem("theme","light");
}

function openSortOption(){
    if(document.getElementById("sort-Div").style.display=="flex"){
        document.getElementById("sort-Div").style.display="none";
    }
    else{
        document.getElementById("sort-Div").style.display="flex";
    }
}
function reloadPage(){
    window.location.reload();
}
function sortInvoice(ele){
    if(ele.innerText=="All"){
        for(let i = 0 ; i<document.getElementsByClassName("sortOption").length ; i++){
            if(document.getElementsByClassName("sortOption")[i] == ele)document.getElementsByClassName("sortOption")[i].style.color="#7C5DFA";
            else document.getElementsByClassName("sortOption")[i].style.color="#1E2139";
        } 
        for(let i = 0 ; i < document.getElementsByClassName("status").length ; i++){
        document.getElementsByClassName("status")[i].parentNode.style.display="flex";
        }
    }
    else{
    for(let i = 0 ; i<document.getElementsByClassName("sortOption").length ; i++){
        if(document.getElementsByClassName("sortOption")[i] == ele)document.getElementsByClassName("sortOption")[i].style.color="#7C5DFA";
        else document.getElementsByClassName("sortOption")[i].style.color="#1E2139";
    } 
    for(let i = 0 ; i < document.getElementsByClassName("status").length ; i++){
        if(document.getElementsByClassName("status")[i].innerHTML.includes(ele.innerText)) document.getElementsByClassName("status")[i].parentNode.style.display="flex";
        else document.getElementsByClassName("status")[i].parentNode.style.display="none";
    }
    }
}

function invoiceInfo(ele){
    console.log(ele.firstElementChild.firstElementChild.innerText);
    window.location.href= `/details?id=${ele.firstElementChild.firstElementChild.innerText}`;
}

function CreateNewInvoice(){
    document.getElementById("newInvoiceDiv").style.transform="translateX(0px)";
}

function addNewItem(){
    document.getElementById("itemListDiv").innerHTML += (`<div class="itemDiv"> <input type="text" name="ItemName" class="clsForItemName"><input type="number" value="" name="ItemQTY" class="clsForItemQTY" oninput="changeItemTotalPrice(this)"><input type="number" value="" name="ItemPrice" oninput="changeItemTotalPrice(this)" class="clsForItemPrice"><div class="clsForItemTotalPrice" ></div><button class="clsForDeleteItemButton" onclick="deleteItem(this)"><svg width="13" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z" fill="#888EB0" fill-rule="nonzero"/></svg></button></div>`);
}
function changeItemTotalPrice(ele){
    let quantity = ele.parentNode.querySelectorAll("input")[1].value;
    let price = ele.parentNode.querySelectorAll("input")[2].value;
    ele.parentNode.querySelectorAll("div")[0].innerText = (quantity*price).toFixed(2);
}
function deleteItem(ele){
    ele.parentNode.remove();
}

let proceedCheck = true ;


function createNewInvoice(statusValue){
    let messageDiv = document.getElementById("messageDiv");
    let messageBox  = document.getElementById("messageBox");
    let id = generateRandomId();
    let createdAt = document.getElementById("InvoiceDate").value;
    if(createdAt == ""){
    messageDiv.style.display="flex"
    messageBox.innerText="Please Enter Invoice Date"
        proceedCheck = false ;
}
    let paymentDue = document.getElementById("PaymentTerms").value;
    if(paymentDue == ""){
        messageDiv.style.display="flex"
        messageBox.innerText="Please Enter paymentDue Date"
        proceedCheck = false ;
    }
    if(createdAt > paymentDue){
        messageDiv.style.display="flex"
        messageBox.innerText="Please Enter correct Date"
        proceedCheck = false ;
    }
    let description = document.getElementById("ProjectDescription").value;
    if(description == ""){
        messageDiv.style.display="flex"
        messageBox.innerText="Please Enter Project Description"
        proceedCheck = false ;
    }
    let clientName = document.getElementById("ClientName").value;
    if(clientName == ""){
        messageDiv.style.display="flex"
        messageBox.innerText="Please Enter client name"
        proceedCheck = false ;
    }
    let ClientEmail = document.getElementById("ClientEmail").value;
    if(ClientEmail == ""){
        messageDiv.style.display="flex"
        messageBox.innerText="Please Enter client Email"
        proceedCheck = false ;
    }
    let status = statusValue ;
    let StreetAddress = document.getElementById("StreetAddress").value;
    if(StreetAddress == ""){
        messageDiv.style.display="flex"
        messageBox.innerText="Please Enter Sender's street address";
        proceedCheck = false ;
    }
    let City = document.getElementById("City").value;
    if(City == ""){
        messageDiv.style.display="flex"
        messageBox.innerText="Please Enter Sender's City";
        proceedCheck = false ;
    }
    let PostCode = document.getElementById("PostCode").value;
    if(PostCode == ""){
        messageDiv.style.display="flex"
        messageBox.innerText="Please Enter Sender's Post Code";
        proceedCheck = false ;
    }
    let Country = document.getElementById("Country").value;
    if(Country == ""){
        messageDiv.style.display="flex"
        messageBox.innerText="Please Enter Sender's Country";
        proceedCheck = false ;
    }
    let ClientStreetAddress = document.getElementById("ClientStreetAddress").value;
    if(ClientStreetAddress == ""){
        messageDiv.style.display="flex"
        messageBox.innerText="Please Enter Client street address";
        proceedCheck = false ;
    }
    let ClientCity = document.getElementById("ClientCity").value;
    if(ClientCity == ""){
        messageDiv.style.display="flex"
        messageBox.innerText="Please Enter Client City";
        proceedCheck = false ;
    }
    let ClientPostCode = document.getElementById("ClientPostCode").value;
    if(ClientPostCode == ""){
        messageDiv.style.display="flex"
        messageBox.innerText="Please Enter Client Post Code";
        proceedCheck = false ;
    }
    let ClientCountry = document.getElementById("ClientCountry").value;
    if(ClientCountry == ""){
        messageDiv.style.display="flex"
        messageBox.innerText="Please Enter Client Country";
        proceedCheck = false ;
    }
    let itemArr = [];
    for(let i=0 ; i<document.getElementsByClassName("itemDiv").length ; i++){
        let obj = {
            name : document.getElementsByClassName("itemDiv")[i].querySelectorAll("input")[0].value!=""?document.getElementsByClassName("itemDiv")[i].querySelectorAll("input")[0].value : incorrectItemDetails("Item Name")  ,
            quantity : document.getElementsByClassName("itemDiv")[i].querySelectorAll("input")[1].value!=""?document.getElementsByClassName("itemDiv")[i].querySelectorAll("input")[1].value:incorrectItemDetails("Item Quantity") ,
            price : document.getElementsByClassName("itemDiv")[i].querySelectorAll("input")[2].value!=""?document.getElementsByClassName("itemDiv")[i].querySelectorAll("input")[2].value:incorrectItemDetails("Item Price"),
            total : document.getElementsByClassName("itemDiv")[i].querySelectorAll("div")[0].innerText!=""?document.getElementsByClassName("itemDiv")[i].querySelectorAll("div")[0].innerText:incorrectItemDetails("Item Total Price"),
        }
        itemArr.push(obj);
    }
    let total = 0 ;
    itemArr.forEach((element, index) => {total  += Number(element.total)})

    let obj = {
        id : id ,
        createdAt : createdAt ,
        paymentDue : paymentDue ,
        description : description ,
        clientName : clientName ,
        clientEmail : ClientEmail ,
        status : status ,
        senderAddress : {
            street : StreetAddress,
            city : City,
            postCode : PostCode,
            country : Country
        },
        clientAddress : {
            street : ClientStreetAddress,
            city : ClientCity,
            postCode : ClientPostCode,
            country : ClientCountry
        },
        items : itemArr,
        total : total
    }
    if(proceedCheck){
    fetch("/index",{
        method:"POST",
        body: JSON.stringify({
            newInvoice : obj,
        }),
        headers:{
            "Content-Type": "application/json ; charset=utf-8",
        }
    })
    window.location.reload();
    }
}

function incorrectItemDetails(reason){
    let messageDiv = document.getElementById("messageDiv");
    let messageBox  = document.getElementById("messageBox");
    messageDiv.style.display="flex"
    messageBox.innerText=`Please Enter ${reason}`;
    proceedCheck = false ;
}

function generateRandomId() {
    const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
    const firstIndex = Math.floor(Math.random() * 26);
    const secondIndex = Math.floor(Math.random() * 26);
    const prefix = alphabet[firstIndex]+alphabet[secondIndex];
    const suffix = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    return prefix + suffix;
}

function closeMessageBox(){
    document.getElementById("messageDiv").style.display="none";
}
function cancelChanges(){
    window.location.reload();
}


if(!(document.getElementById("invoice-div").innerHTML).trim()){   
    document.getElementById("invoice-div").style.backgroundImage="url('images/bgImgLight.png')";
    document.getElementById("invoice-div").style.backgroundPosition="300px 50px"
    document.getElementById("invoice-div").style.backgroundSize = "450px 700px"
    document.getElementById("invoice-div").style.backgroundRepeat="no-repeat";
}

function changeTheme(){
    if(localStorage.getItem("theme")=="light"){
        localStorage.setItem("theme","dark");
        document.getElementById("whole-Div").style.backgroundColor="#141625";
        document.getElementById("nav-div").style.backgroundColor="#1E2139";
        if(!(document.getElementById("invoice-div").innerHTML).trim()){   
            document.getElementById("invoice-div").style.backgroundImage="url('images/bgImgDark.png')";
            document.getElementById("invoice-div").style.backgroundPosition="300px 50px"
            document.getElementById("invoice-div").style.backgroundSize = "450px 700px"
            document.getElementById("invoice-div").style.backgroundRe
            function themeForStart(){
           
            }     peat="no-repeat";
        }
        document.getElementById("themeImg").src="http://172.17.55.102:5056/images/sun.png";
        document.getElementById("main-div").style.backgroundColor="#141625";
        document.getElementById("head-div1").querySelector("h1").style.color="#FFFFFF";
        document.getElementById("head-div1").querySelector("h3").style.color="#DFE3FA";
        document.getElementById("head-div2").style.color="#FFFFFF";
        document.getElementById("head-div2").querySelector("button").style.color="7C5DFA";
        for(let i = 0 ; i < document.getElementsByClassName("mainInvoiceDiv").length ; i++){
            document.getElementsByClassName("mainInvoiceDiv")[i].style.backgroundColor="#1E2139";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelector("h3").style.color = "#7E88C3";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelector("h3").querySelector("customerid").style.color="#FFFFFF";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelector("duedate").style.color = "#7E88C3";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelector("customername").style.color = "#FFFFFF";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[0].style.color = "#FFFFFF";
            if((document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].innerText).includes("Paid")){
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.color = "#33D69F";
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.backgroundColor = "#33d69f1f";
            }
            else if((document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].innerText).includes("Pending")){
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.color = "#FF8F00";
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.backgroundColor = "#FF8F001f";
            }
            else{
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.color = "#DFE3FA";
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.backgroundColor = "#DFE3FA1f";
            }
            document.getElementById("invoiceDivChild").style.backgroundColor="#141625";
            document.getElementById("invoiceIdDiv").style.color="#FFFFFF";
            for(let j=0 ; j<document.getElementsByClassName("clsForLabel").length ; j++){document.getElementsByClassName("clsForLabel")[j].style.color="#DFE3FA"}
            for(let k = 0 ; k<document.getElementsByTagName("input").length ; k++){
                document.getElementsByTagName("input")[k].style.color="#FFFFFF";
                document.getElementsByTagName("input")[k].style.backgroundColor="#1E2139";
                document.getElementsByTagName("input")[k].style.borderColor="#1E2139";
            }
            for( let l=0 ; l<document.getElementsByClassName("clsForItemTotalPrice").length ; l++){document.getElementsByClassName("clsForItemTotalPrice")[l].style.color="#DFE3FA"}
            document.getElementById("addNewItemButton").style.backgroundColor="#252945";
            document.getElementById("addNewItemButton").style.color="#DFE3FA";
            document.getElementById("messageDiv").style.backgroundColor="#1E2139"
            document.getElementById("messageBox").style.color="#FFFFFF"
        }
    }   
    else{
        localStorage.setItem("theme","light");
        document.getElementById("whole-Div").style.backgroundColor="#F8F8FB";
        document.getElementById("nav-div").style.backgroundColor="#373B53";
        if(!(document.getElementById("invoice-div").innerHTML).trim()){   
            document.getElementById("invoice-div").style.backgroundImage="url('images/bgImgLight.png')";
            document.getElementById("invoice-div").style.backgroundPosition="300px 50px"
            document.getElementById("invoice-div").style.backgroundSize = "450px 700px"
            document.getElementById("invoice-div").style.backgroundRe
            function themeForStart(){
           
            }     peat="no-repeat";
        }
        document.getElementById("themeImg").src="http://172.17.55.102:5056/images/moon.png"
        document.getElementById("main-div").style.backgroundColor="#F8F8FB";
        document.getElementById("head-div1").querySelector("h1").style.color="#0C0E16";
        document.getElementById("head-div1").querySelector("h3").style.color="#888EB0";
        document.getElementById("head-div2").style.color="#0C0E16";
        document.getElementById("head-div2").querySelector("button").style.color="7C5DFA";
        for(let i = 0 ; i < document.getElementsByClassName("mainInvoiceDiv").length ; i++){
            document.getElementsByClassName("mainInvoiceDiv")[i].style.backgroundColor="#FFFFFF";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelector("h3").style.color = "#7E88C3";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelector("h3").querySelector("customerid").style.color="#0C0E16";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelector("duedate").style.color = "#888EB0";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelector("customername").style.color = "#858BB2";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[0].style.color = "#0C0E16";
            if((document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].innerText).includes("Paid")){
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.color = "#33D69F";
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.backgroundColor = "#33d69f1f";
            }
            else if((document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].innerText).includes("Pending")){
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.color = "#FF8F00";
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.backgroundColor = "#FF8F001f";
            }
            else{
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.color = "#373B53";
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.backgroundColor = "#373B531f";
            }
            document.getElementById("invoiceDivChild").style.backgroundColor="#FFFFFF";
            document.getElementById("invoiceIdDiv").style.color="#0C0E16";
            for(let j=0 ; j<document.getElementsByClassName("clsForLabel").length ; j++){document.getElementsByClassName("clsForLabel")[j].style.color="#7E88C3"}
            for(let k = 0 ; k<document.getElementsByTagName("input").length ; k++){
                document.getElementsByTagName("input")[k].style.color="#0C0E16";
                document.getElementsByTagName("input")[k].style.backgroundColor="#FFFFFF";
                document.getElementsByTagName("input")[k].style.borderColor="#DFE3FA";
            }
            for( let l=0 ; l<document.getElementsByClassName("clsForItemTotalPrice").length ; l++){document.getElementsByClassName("clsForItemTotalPrice")[l].style.color="#888EB0"}
            document.getElementById("addNewItemButton").style.backgroundColor="#F9FAFE";
            document.getElementById("addNewItemButton").style.color="#7E88C3";
            document.getElementById("messageDiv").style.backgroundColor="#FFFFFF";
            document.getElementById("messageBox").style.color="#0C0E16"
        }
    }
}

// changeTheme(document.getElementById("themeImg"));

function themeForStart(){
    console.log(localStorage.getItem("theme") ==='light');
    if(localStorage.getItem("theme")=="dark"){
        document.getElementById("whole-Div").style.backgroundColor="#141625";
        document.getElementById("nav-div").style.backgroundColor="#1E2139";
        if(!(document.getElementById("invoice-div").innerHTML).trim()){   
            document.getElementById("invoice-div").style.backgroundImage="url('images/bgImgDark.png')";
            document.getElementById("invoice-div").style.backgroundPosition="300px 50px"
            document.getElementById("invoice-div").style.backgroundSize = "450px 700px"
            document.getElementById("invoice-div").style.backgroundRepeat="no-repeat";
        }
        document.getElementById("themeImg").src="http://172.17.55.102:5056/images/sun.png";
        document.getElementById("main-div").style.backgroundColor="#141625";
        document.getElementById("head-div1").querySelector("h1").style.color="#FFFFFF";
        document.getElementById("head-div1").querySelector("h3").style.color="#DFE3FA";
        document.getElementById("head-div2").style.color="#FFFFFF";
        document.getElementById("head-div2").querySelector("button").style.color="7C5DFA";
        for(let i = 0 ; i < document.getElementsByClassName("mainInvoiceDiv").length ; i++){
            document.getElementsByClassName("mainInvoiceDiv")[i].style.backgroundColor="#1E2139";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelector("h3").style.color = "#7E88C3";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelector("h3").querySelector("customerid").style.color="#FFFFFF";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelector("duedate").style.color = "#7E88C3";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelector("customername").style.color = "#FFFFFF";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[0].style.color = "#FFFFFF";
            if((document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].innerText).includes("Paid")){
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.color = "#33D69F";
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.backgroundColor = "#33d69f1f";
            }
            else if((document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].innerText).includes("Pending")){
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.color = "#FF8F00";
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.backgroundColor = "#FF8F001f";
            }
            else{
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.color = "#DFE3FA";
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.backgroundColor = "#DFE3FA1f";
            }
            document.getElementById("invoiceDivChild").style.backgroundColor="#141625";
            document.getElementById("invoiceIdDiv").style.color="#FFFFFF";
            for(let j=0 ; j<document.getElementsByClassName("clsForLabel").length ; j++){document.getElementsByClassName("clsForLabel")[j].style.color="#DFE3FA"}
            for(let k = 0 ; k<document.getElementsByTagName("input").length ; k++){
                document.getElementsByTagName("input")[k].style.color="#FFFFFF";
                document.getElementsByTagName("input")[k].style.backgroundColor="#1E2139";
                document.getElementsByTagName("input")[k].style.borderColor="#1E2139";
            }
            for( let l=0 ; l<document.getElementsByClassName("clsForItemTotalPrice").length ; l++){document.getElementsByClassName("clsForItemTotalPrice")[l].style.color="#DFE3FA"}
            document.getElementById("addNewItemButton").style.backgroundColor="#252945";
            document.getElementById("addNewItemButton").style.color="#DFE3FA";
            document.getElementById("messageDiv").style.backgroundColor="#1E2139"
            document.getElementById("messageBox").style.color="#FFFFFF"
        }
    }   
    else{
        document.getElementById("whole-Div").style.backgroundColor="#F8F8FB";
        document.getElementById("nav-div").style.backgroundColor="#373B53";
        if(!(document.getElementById("invoice-div").innerHTML).trim()){   
            document.getElementById("invoice-div").style.backgroundImage="url('images/bgImgLight.png')";
            document.getElementById("invoice-div").style.backgroundPosition="300px 50px"
            document.getElementById("invoice-div").style.backgroundSize = "450px 700px"
            document.getElementById("invoice-div").style.backgroundRepeat="no-repeat";
        }
        document.getElementById("themeImg").src="http://172.17.55.102:5056/images/moon.png"
        document.getElementById("main-div").style.backgroundColor="#F8F8FB";
        document.getElementById("head-div1").querySelector("h1").style.color="#0C0E16";
        document.getElementById("head-div1").querySelector("h3").style.color="#888EB0";
        document.getElementById("head-div2").style.color="#0C0E16";
        document.getElementById("head-div2").querySelector("button").style.color="7C5DFA";
        for(let i = 0 ; i < document.getElementsByClassName("mainInvoiceDiv").length ; i++){
            document.getElementsByClassName("mainInvoiceDiv")[i].style.backgroundColor="#FFFFFF";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelector("h3").style.color = "#7E88C3";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelector("h3").querySelector("customerid").style.color="#0C0E16";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelector("duedate").style.color = "#888EB0";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelector("customername").style.color = "#858BB2";
            document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[0].style.color = "#0C0E16";
            if((document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].innerText).includes("Paid")){
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.color = "#33D69F";
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.backgroundColor = "#33d69f1f";
            }
            else if((document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].innerText).includes("Pending")){
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.color = "#FF8F00";
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.backgroundColor = "#FF8F001f";
            }
            else{
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.color = "#373B53";
                document.getElementsByClassName("mainInvoiceDiv")[i].querySelectorAll("div")[1].style.backgroundColor = "#373B531f";
            }
            document.getElementById("invoiceDivChild").style.backgroundColor="#FFFFFF";
            document.getElementById("invoiceIdDiv").style.color="#0C0E16";
            for(let j=0 ; j<document.getElementsByClassName("clsForLabel").length ; j++){document.getElementsByClassName("clsForLabel")[j].style.color="#7E88C3"}
            for(let k = 0 ; k<document.getElementsByTagName("input").length ; k++){
                document.getElementsByTagName("input")[k].style.color="#0C0E16";
                document.getElementsByTagName("input")[k].style.backgroundColor="#FFFFFF";
                document.getElementsByTagName("input")[k].style.borderColor="#DFE3FA";
            }
            for( let l=0 ; l<document.getElementsByClassName("clsForItemTotalPrice").length ; l++){document.getElementsByClassName("clsForItemTotalPrice")[l].style.color="#888EB0"}
            document.getElementById("addNewItemButton").style.backgroundColor="#F9FAFE";
            document.getElementById("addNewItemButton").style.color="#7E88C3";
            document.getElementById("messageDiv").style.backgroundColor="#FFFFFF";
            document.getElementById("messageBox").style.color="#0C0E16"
        }
    }
}

window.onload = (() => {themeForStart()});

const socket = io("ws://172.17.55.102:5050/");


//Send msg to server
socket.emit("Hello from client");

//Receive msg from server
socket.on("hello from server",(...args) => {
    console.log("Hello from the server",...args);
})