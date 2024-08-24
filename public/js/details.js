


function previousPage(){
    window.location.href = "/index";
}
function reloadPage(){
    window.location.href="/index";
}
function markAsPaid(invoice){
    let dataId = invoice.getAttribute("data-id");
    console.log(dataId);
    fetch("/details",{
        method:"POST",
        body: JSON.stringify({
            id : dataId,
        }),
        headers:{
            "Content-Type": "application/json ; charset=utf-8",
        }
    })
    window.location.href="/index";  
}
let invoiceID = "";
function showRemoveBox(id){
    invoiceID = id;
    document.getElementById("removeInvoiceBoxDiv").querySelectorAll("h6")[0].innerText=`Are you sure you want to delete invoice #${id}? This action cannot be undone.`;
    document.getElementById("removeInvoiceBoxDiv").style.transform="translateX(0px)";
    document.querySelector("#messageDiv").style.display="flex";
}
function removeInvoice(confirmation){
    if(confirmation=="yes"){
    fetch("/details",{
        method:"POST",
        body: JSON.stringify({
            RemoveId : invoiceID,
        }),
        headers:{
            "Content-Type": "application/json ; charset=utf-8",
        }
    })
    window.location.href="/index"; 
    }
    else{
        document.getElementById("removeInvoiceBoxDiv").style.transform="translateX(-1850px)";    
    }
}

function editCurrentInvoice(invoice){
    document.getElementById("formdivElem").style.transform="translateX(0px)";
}
function closeMessageBox(){
    console.log("hello");
    document.getElementById("messageDivForIncorrectValue").style.display="none";
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

function changeInvoice(){
    let messageDiv = document.getElementById("messageDivForIncorrectValue");
    let messageBox  = document.getElementById("messageBox");
    let id = document.getElementById("idDiv").innerText;
    console.log(id);
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
    let status = document.getElementsByClassName("status")[0].innerText ;
    status=status.split("•");
    status= status[1].trim().toLowerCase();
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
    fetch("/details",{
        method:"POST",
        body: JSON.stringify({
            changeId : id,
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
    let messageDiv = document.getElementById("messageDivForIncorrectValue");
    let messageBox  = document.getElementById("messageBox");
    messageDiv.style.display="flex"
    messageBox.innerText=`Please Enter ${reason}`;
    proceedCheck = false ;
}
function cancelChanges(){
    window.location.reload();
}

function changeTheme(){
    if(localStorage.getItem("theme")=="dark"){
        // localStorage.setItem("theme","light");
        document.getElementById("whole-div").style.backgroundColor="#141625";
        document.getElementById("nav-div").style.backgroundColor="#1E2139";
        // document.getElementById("themeImg").src="http://172.17.55.102:5056/images/sun.png";
        document.getElementById("main-div").style.backgroundColor="#141625";
        document.getElementById("go-back").style.color="#FFFFFF"
        document.getElementById("go-back").querySelector("i").style.color="#7C5DFA"
        document.getElementById("main-div2").style.backgroundColor="#1E2139";
        document.getElementById("status-div").style.color="#DFE3FA"
        if((document.getElementById("status-div").querySelectorAll("div")[0].innerText).includes("Paid")){
            document.getElementById("status-div").querySelectorAll("div")[0].style.color = "#33D69F";
            document.getElementById("status-div").querySelectorAll("div")[0].style.backgroundColor = "#33d69f1f";
        }
        else if((document.getElementById("status-div").querySelectorAll("div")[0].innerText).includes("Pending")){
            document.getElementById("status-div").querySelectorAll("div")[0].style.color = "#FF8F00";
            document.getElementById("status-div").querySelectorAll("div")[0].style.backgroundColor = "#FF8F001f";
        }
        else{
            document.getElementById("status-div").querySelectorAll("div")[0].style.color = "#DFE3FA";
            document.getElementById("status-div").querySelectorAll("div")[0].style.backgroundColor = "#DFE3FA1f";
        }
        document.getElementById("edit-button").style.backgroundColor="#252945";
        document.getElementById("edit-button").style.color="#DFE3FA";
        document.getElementById("main-div3").style.backgroundColor="#0C0E16"
        document.getElementById("child-div1").querySelector("h3").style.color="#888EB0"
        document.getElementsByTagName("customerid")[0].style.color="#FFFFFF"
        document.getElementsByTagName("customerdescription")[0].style.color="#DFE3FA"
        for(let i = 0; i <document.getElementById("child-div2").children.length ; i++){document.getElementById("child-div2").children[i].style.color="#DFE3FA"} 
        document.getElementById("invoiceDataDiv").style.color="#DFE3FA"
        document.getElementsByTagName("invoicedate")[0].style.color="#FFFFFF"
        document.getElementById("paymentDateDiv").style.color="#DFE3FA"
        document.getElementsByTagName("paymentdate")[0].style.color="#FFFFFF"
        document.getElementById("child-div4").style.color="#DFE3FA"
        document.getElementsByTagName("clientname")[0].style.color="#FFFFFF"
        for(let j = 0; j <document.getElementById("child-div2").children.length ; j++){document.getElementsByTagName("clientaddress")[0].children[j].style.color="#DFE3FA"} 
        document.getElementById("child-div5").style.color="#DFE3FA"
        document.getElementsByTagName("clientmail")[0].style.color="#FFFFFF";
        document.getElementById("item-list").style.backgroundColor="#252945"
        for(let k = 0; k <document.getElementById("MainitemTitle").children.length ; k++){document.getElementById("MainitemTitle").children[k].style.color="#DFE3FA"} 
        for(let l = 1 ; l <document.getElementById("item-list").children.length ; l++){
            document.getElementById("item-list").children[l].querySelectorAll("div")[0].style.color="#FFFFFF"
            document.getElementById("item-list").children[l].querySelectorAll("div")[1].style.color="#DFE3FA"
            document.getElementById("item-list").children[l].querySelectorAll("div")[2].style.color="#DFE3FA"
            document.getElementById("item-list").children[l].querySelectorAll("div")[3].style.color="#FFFFFF"
        }
        document.getElementById("item-Totalprice").style.backgroundColor="#0C0E16";
        document.getElementById("formDivChild").style.backgroundColor="#141625";
        document.getElementById("invoiceIdDiv").style.color="#FFFFFF";
        for(let m=0 ; m<document.getElementsByClassName("clsForLabel").length ; m++){document.getElementsByClassName("clsForLabel")[m].style.color="#DFE3FA"}
            for(let n = 0 ; n<document.getElementsByTagName("input").length ; n++){
                document.getElementsByTagName("input")[n].style.color="#FFFFFF";
                document.getElementsByTagName("input")[n].style.backgroundColor="#1E2139";
                document.getElementsByTagName("input")[n].style.borderColor="#1E2139";
            }
            for( let o=0 ; o<document.getElementsByClassName("clsForItemTotalPrice").length ; o++){document.getElementsByClassName("clsForItemTotalPrice")[o].style.color="#DFE3FA"}
            document.getElementById("addNewItemButton").style.backgroundColor="#252945";
            document.getElementById("addNewItemButton").style.color="#DFE3FA";
            document.getElementById("messageDiv").style.backgroundColor="#1E2139"
            document.getElementById("messageBox").style.color="#FFFFFF"
            document.getElementById("messageDiv").querySelector("h1").style.color="#FFFFFF";
            document.getElementById("messageDiv").querySelector("h6").style.color="#DFE3FA";
            document.getElementById("messageDiv").style.boxShadow="0px 0px 0px 0px rgb(0,0,0)"
    }
    else{
        // localStorage.setItem("theme","dark");
        document.getElementById("whole-div").style.backgroundColor="#F8F8FB";
        document.getElementById("nav-div").style.backgroundColor="#373B53";
        // document.getElementById("themeImg").src="http://172.17.55.102:5056/images/moon.png"
        document.getElementById("main-div").style.backgroundColor="#F8F8FB";
        document.getElementById("go-back").style.color="#0C0E16"
        document.getElementById("go-back").querySelector("i").style.color="#7C5DFA"
        document.getElementById("main-div2").style.backgroundColor="#FFFFFF";
        document.getElementById("status-div").style.color="#858BB2"
        if((document.getElementById("status-div").querySelectorAll("div")[0].innerText).includes("Paid")){
            document.getElementById("status-div").querySelectorAll("div")[0].style.color = "#33D69F";
            document.getElementById("status-div").querySelectorAll("div")[0].style.backgroundColor = "#33d69f1f";
        }
        else if((document.getElementById("status-div").querySelectorAll("div")[0].innerText).includes("Pending")){
            document.getElementById("status-div").querySelectorAll("div")[0].style.color = "#FF8F00";
            document.getElementById("status-div").querySelectorAll("div")[0].style.backgroundColor = "#FF8F001f";
        }
        else{
            document.getElementById("status-div").querySelectorAll("div")[0].style.color = "#DFE3FA";
            document.getElementById("status-div").querySelectorAll("div")[0].style.backgroundColor = "#DFE3FA1f";
        }
        document.getElementById("edit-button").style.backgroundColor="#F9FAFE";
        document.getElementById("edit-button").style.color="#7E88C3";
        document.getElementById("main-div3").style.backgroundColor="#FFFFFF"
        document.getElementById("child-div1").querySelector("h3").style.color="#888EB0"
        document.getElementsByTagName("customerid")[0].style.color="#0C0E16"
        document.getElementsByTagName("customerdescription")[0].style.color="#7E88C3"
        for(let i = 0; i <document.getElementById("child-div2").children.length ; i++){document.getElementById("child-div2").children[i].style.color="#7E88C3"}
        document.getElementById("invoiceDataDiv").style.color="#7E88C3"
        document.getElementsByTagName("invoicedate")[0].style.color="#0C0E16"
        document.getElementById("paymentDateDiv").style.color="#7E88C3"
        document.getElementsByTagName("paymentdate")[0].style.color="#0C0E16"
        document.getElementById("child-div4").style.color="#7E88C3"
        document.getElementsByTagName("clientname")[0].style.color="#0C0E16"
        for(let j = 0; j <document.getElementById("child-div2").children.length ; j++){document.getElementsByTagName("clientaddress")[0].children[j].style.color="#7E88C3"}
        document.getElementById("child-div5").style.color="#7E88C3"
        document.getElementsByTagName("clientmail")[0].style.color="#0C0E16";
        document.getElementById("item-list").style.backgroundColor="#F9FAFE";
        for(let k = 0; k <document.getElementById("MainitemTitle").children.length ; k++){document.getElementById("MainitemTitle").children[k].style.color="#7E88C3"} 
        for(let l = 1 ; l <document.getElementById("item-list").children.length ; l++){
            document.getElementById("item-list").children[l].querySelectorAll("div")[0].style.color="#0C0E16"
            document.getElementById("item-list").children[l].querySelectorAll("div")[1].style.color="#7E88C3"
            document.getElementById("item-list").children[l].querySelectorAll("div")[2].style.color="#7E88C3"
            document.getElementById("item-list").children[l].querySelectorAll("div")[3].style.color="#0C0E16"
        }
        document.getElementById("item-Totalprice").style.backgroundColor="#373B53";
        document.getElementById("formDivChild").style.backgroundColor="#FFFFFF";
        document.getElementById("invoiceIdDiv").style.color="#0C0E16";
        for(let m=0 ; m<document.getElementsByClassName("clsForLabel").length ; m++){document.getElementsByClassName("clsForLabel")[m].style.color="#7E88C3"}
        for(let n = 0 ; n<document.getElementsByTagName("input").length ; n++){
            document.getElementsByTagName("input")[n].style.color="#0C0E16";
            document.getElementsByTagName("input")[n].style.backgroundColor="#FFFFFF";
            document.getElementsByTagName("input")[n].style.borderColor="#DFE3FA";
        }
        for( let o=0 ; o<document.getElementsByClassName("clsForItemTotalPrice").length ; o++){document.getElementsByClassName("clsForItemTotalPrice")[o].style.color="#888EB0"}
        document.getElementById("addNewItemButton").style.backgroundColor="#F9FAFE";
        document.getElementById("addNewItemButton").style.color="#7E88C3";
        document.getElementById("messageDiv").style.backgroundColor="#FFFFFF"
        document.getElementById("messageBox").style.color="#0C0E16"
        document.getElementById("messageDiv").querySelector("h1").style.color="#0C0E16";
        document.getElementById("messageDiv").querySelector("h6").style.color="#888EB0";
        document.getElementById("messageDiv").style.boxShadow="0px 15px 20px 10px rgb(152 152 152 / 40%)";
    }
}

window.onload = (() => {changeTheme()});
// changeTheme();

const socket = io("ws://172.17.55.102:5050/");

//Send msg to server
socket.emit("Hello from client");

//Receive msg from server
socket.on("hello from server",(...args) => {
    console.log("Hello from the server",...args);
})