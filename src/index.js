

//Grab each element from the DOM
const guestForm =document.getElementById("guest-form");
const guestName =document.getElementById("guest-name");
const guestListArea =document.getElementById("guest-list");

//This is where our guest list will be held
let guests = [];

//
guestForm.addEventListener("submit", handleForSubmit);

function handleForSubmit (event) {
    event.preventDefault()        //this ensuers page is !reloaded everytime
        
// The value the person typed in
const nameTyped = guestName.value.trim();

// When nothing is typed in, return nothing
if (nameTyped === "") return;

//here how to chek if number exceds the limit
if (guests.length >= 10) {
    alert("Too many peopele only 10 allowed");
    return;
}
const guest =createGuestObject(nameTyped)
guests.unshift(guest);    //adds guest to the front of the list
updatedGuestList()    //
guestName.value = ""    //this clears the for the input of nextperson
}

function createGuestObject(name){
    return{
        //Guest object with name and deafult RSVP status
    id: Date.now(),   
    name: name,
    attending: false ,   // this by default is false
    time:new Date().toLocaleTimeString()   // this one shows at wghat the person was logged in
    }
}

function updatedGuestList() {
    guestListArea.innerHTML="";       //this clears the input area
    for(const guest of guests) {
        const li = createGuestElement(guest)
        guestListArea.appendChild(li);     //this adds new guest to list
    }
}
// 
function createGuestElement(guest) {
    const li=document.createElement("li")
    const info =document.createElement("span")
    info.className = "guest-info";
    info.textContent = `${guest.name}-${guest.attending ? "Attending": "Not attending"} (added at ${guest.time})`;
    // CreateRSVP toggle button
const rsvpButton =document.createElement("button");         //Create a new button element
rsvpButton.textContent ="Toggle RSVP";                      //Adds the word toggle RSVP on it
rsvpButton.className = "rsvp-btn";                           //This for stylin purpose 
rsvpButton.addEventListener("click",  function () {
    if (guest.attending ===true){
        guest.attending = false;
    }else{
        guest.attending = true
    }
    updatedGuestList()        //reloads the page so we can see the changes
});
//here i crate the rwomve button
const removeButton =document.createElement("button");     //Create a new button element
removeButton.textContent = "Remove";                      //Adds the word remove on it
removeButton.className = "remove-btn";                   //a class for styling

//Add a click event to the remove button
removeButton.addEventListener("click", function() {   
guests =guests.filter(function (g){  
    if(g.id === guest.id) {
        return false;
    }else{
        return true;
    }    
});
updatedGuestList();    //Relods the page after removing the guest
});

// These are all the created elemnts and added to the list item
li.appendChild(info);
li.appendChild(rsvpButton);
li.appendChild(removeButton);

return li    //return the full built item
}


