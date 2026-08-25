let main = document.querySelector("#main");
let mainstuff = document.querySelector("#mainstuff");
let leftBtns = document.querySelector("#left-btns");

let addBtn = document.querySelector("#addbtn");
let upBtn = document.querySelector("#upbtn");
let dwnBtn = document.querySelector("#dwnbtn");

let cardsContainer = document.querySelector("#cards");
let rightBtns = document.querySelector("#right-btns");

let cards = document.querySelectorAll(".card");

let dp = document.querySelectorAll(".dp");
let names = document.querySelectorAll(".name");
let locs = document.querySelectorAll(".loc");
let kaam = document.querySelectorAll(".kaam");
let phones = document.querySelectorAll(".phone");

let callBtns = document.querySelectorAll(".call");
let messageBtns = document.querySelectorAll(".message");

//form qs
let form = document.querySelector("#contact-form");

let imageUrl = document.querySelector("#imageurl");
let fullName = document.querySelector("#fullname");
let hometown = document.querySelector("#hometown");
let purpose = document.querySelector("#purpose");



let createNote = document.querySelector("#create-note");
let closeForm = document.querySelector("#close-form");

// let addBtn = document.querySelector("#addbtn");
// let show = document.querySelector(".show");

//form btn
addBtn.addEventListener("click", function () {
    form.classList.remove("show");
});
closeForm.addEventListener("click", function () {
    form.classList.add("show");
});

function saveToLocalstorage(obj) {
    //tasks is where we store our data
    if (localStorage.getItem("tasks") === null) {
        let oldTasks = [];
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    }
    else {
        let oldTasks = localStorage.getItem("tasks");
        oldTasks = JSON.parse(oldTasks);
        oldTasks.push(obj);
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
    }
}

function showCards() {
    cardsContainer.innerHTML = "";
    let allcards = localStorage.getItem("tasks");
    allcards = JSON.parse(allcards);

    let cards = document.querySelector("#cards");

    allcards.forEach(obj => {
        let card = document.createElement("div");
        card.classList.add("card");

        let dp = document.createElement("div");
        dp.classList.add("dp");

        let img = document.createElement("img");
        img.src = obj.imgval;
        dp.appendChild(img);


        let name = document.createElement("div");
        name.classList.add("name");
        name.textContent = obj.nameval;


        let loc = document.createElement("div");
        loc.classList.add("loc");

        let locc = document.createElement("div");
        locc.classList.add("locc");
        locc.textContent = "HomeTown";

        let addrs = document.createElement("div");
        addrs.classList.add("addrs");
        addrs.textContent = obj.townval;

        loc.appendChild(locc);
        loc.appendChild(addrs);


        let kaam = document.createElement("div");
        kaam.classList.add("kaam");

        let purpose = document.createElement("div");
        purpose.textContent = "Purpose";

        let kyaHai = document.createElement("div");
        kyaHai.classList.add("kya-hai");
        kyaHai.textContent = obj.purposeval;

        kaam.appendChild(purpose);
        kaam.appendChild(kyaHai);


        let phone = document.createElement("div");
        phone.classList.add("phone");

        let call = document.createElement("button");
        call.classList.add("call");
        call.textContent = "Call";

        let message = document.createElement("button");
        message.classList.add("message");
        message.textContent = "Message";

        phone.appendChild(call);
        phone.appendChild(message);
        card.appendChild(dp);
        card.appendChild(name);
        card.appendChild(loc);
        card.appendChild(kaam);
        card.appendChild(phone);
        cards.appendChild(card);
    });
}

form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let priority = document.querySelector('input[name="priority"]:checked');

    if (priority === null) {
        alert("Please select a Priority");
    }

    saveToLocalstorage({
        imgval: imageUrl.value,
        nameval: fullName.value,
        townval: hometown.value,
        purposeval: purpose.value,
        radioval: priority.value,
    });

    form.reset();
    form.classList.add("show");
    showCards();
});

showCards();


function updatecards(){
    for(let i=0;i< Math.min(3, cardsContainer.children.length);i++){
        let card = cardsContainer.children[i];
        card.style.zIndex = 3 - i;
        card.style.transform = `translateY(${i * 12}px) scale(${1 - i*0.02})`;
    }
}

function pressCards() {
        cardsContainer.classList.remove("cards-press");

    // Restart animation
    void cardsContainer.offsetWidth;

    cardsContainer.classList.add("cards-press");
}

upBtn.addEventListener("click" , function(){
    let firstchild = cardsContainer.firstElementChild;
    if(firstchild){
         cardsContainer.append(firstchild);
    }

    // ab cards ko apne position me to la diya .cards mein ab unko show karna padega.
    updatecards();
    pressCards();
})
dwnBtn.addEventListener("click" , function(){
    let lastchild = cardsContainer.lastElementChild;
    if(lastchild){
         cardsContainer.prepend(lastchild);
    }
    updatecards();
    pressCards();

})
setTimeout(() => {
    pressCards();
}, 1000);