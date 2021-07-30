function fazGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function closeModal() {
    const modal = document.getElementById("modal");
    
    modal.setAttribute("class", "close-modal");
}

function openModal(userToOpen) {
    const modal = document.getElementById("modal");
    modal.innerHTML = "";
    
    modal.setAttribute("class", "open-modal");

    const headerContainer = document.createElement("div");
    headerContainer.setAttribute("class", "header");
    
    const close = document.createElement("span");
    close.innerHTML = "X";
    
    const title = document.createElement("span");
    title.innerHTML = "VIEW PROFILE"

    const closeContainer = document.createElement("div");
    closeContainer.setAttribute("class", "closeContainer");

    const titleContainer = document.createElement("div");
    titleContainer.setAttribute("class", "titleContainer");
    
    closeContainer.appendChild(close);
    titleContainer.appendChild(title);

    closeContainer.addEventListener("click", ()=>closeModal())

    headerContainer.style.display = "flex";

    headerContainer.appendChild(closeContainer);
    headerContainer.appendChild(titleContainer);

    modal.appendChild(headerContainer);

    const imageContainer = document.createElement("div");
    imageContainer.setAttribute("class", "avatar-container");
    
    const avatarImage = document.createElement("img");
    avatarImage.setAttribute("src", userToOpen.picture.large);

    const name = document.createElement("span");
    name.innerHTML = `${String(userToOpen.name.first)} ${String(userToOpen.name.last)}`;

    const state = document.createElement("span");
    state.innerHTML = `${String(userToOpen.location.state)}, ${String(userToOpen.location.country)}`;
    state.setAttribute("class", "state");

    imageContainer.appendChild(avatarImage);
    imageContainer.appendChild(name);
    imageContainer.appendChild(state);

    modal.appendChild(imageContainer);

    const infoContainer = document.createElement("div");
    infoContainer.setAttribute("class", "modalInfoContainer");

    const emailContainer = document.createElement("div");
    const emailTitle = document.createElement("span");
    emailTitle.setAttribute("class", "titleInfo")
    emailTitle.innerHTML = `Email`;
    

    const email = document.createElement("span");
    email.innerHTML = `${String(userToOpen.email)}`;
    email.setAttribute("class", "dataInfo")
    
    emailContainer.appendChild(emailTitle);
    emailContainer.appendChild(email);

    const phoneContainer = document.createElement("div");
    const phoneTitle = document.createElement("span");
    phoneTitle.setAttribute("class", "titleInfo")
    phoneTitle.innerHTML = `Phone`;


    const phone = document.createElement("span");
    phone.innerHTML = `${String(userToOpen.phone)}`;
    phone.setAttribute("class", "dataInfo")
    
    phoneContainer.appendChild(phoneTitle);
    phoneContainer.appendChild(phone);

    const dobContainer = document.createElement("div");
    const dobTitle = document.createElement("span");
    dobTitle.setAttribute("class", "titleInfo")
    dobTitle.innerHTML = `Birth date`;

    const dob = document.createElement("span");
    dob.innerHTML = `${String(userToOpen.dob.date)}`;
    dob.setAttribute("class", "dataInfo")
    
    dobContainer.appendChild(dobTitle);
    dobContainer.appendChild(dob);

   
    infoContainer.appendChild(emailContainer);
    infoContainer.appendChild(phoneContainer);
    infoContainer.appendChild(dobContainer);

    modal.appendChild(infoContainer);
}

function criaItem(result) {
    const item = document.createElement("div");
    const avatarImage = document.createElement("img");
    const name = document.createElement("span");
    const city = document.createElement("span");

    const ageContainer = document.createElement("div");
    const genderContainer = document.createElement("div");
    const stateContainer = document.createElement("div");

    const age = document.createElement("span");
    const gender = document.createElement("span");
    const state = document.createElement("span");

    const ageTitle = document.createElement("span");
    const genderTitle = document.createElement("span");
    const stateTitle = document.createElement("span");

    const infoContainer = document.createElement("div");

    avatarImage.setAttribute("src", result.picture.medium);
    name.innerHTML = `${String(result.name.first)} ${String(result.name.last)}`;
    city.innerHTML = `${String(result.location.city)}`;

    age.innerHTML = `${String(result.dob.age)}`;
    gender.innerHTML = `${String(result.gender)}`;
    state.innerHTML = `${String(result.location.state)}`;
    ageTitle.innerHTML = `AGE`;
    genderTitle.innerHTML = `GENDER`;
    stateTitle.innerHTML = `STATE`;

    ageContainer.appendChild(age);
    genderContainer.appendChild(gender);
    stateContainer.appendChild(state);

    ageContainer.appendChild(ageTitle);
    genderContainer.appendChild(genderTitle);
    stateContainer.appendChild(stateTitle);

    infoContainer.appendChild(ageContainer);
    infoContainer.appendChild(genderContainer);
    infoContainer.appendChild(stateContainer);

    const viewProfileButton = document.createElement("button");
    viewProfileButton.innerHTML = `VIEW PROFILE`;
    viewProfileButton.addEventListener("click", () => openModal(result));

    item.appendChild(avatarImage);
    item.appendChild(name);
    item.appendChild(city);

    infoContainer.setAttribute("id", "infoContainer");
    
    item.appendChild(infoContainer);

    item.appendChild(viewProfileButton);

    item.setAttribute("id", "userBox");
    avatarImage.setAttribute("id", "avatarImage");
    name.setAttribute("id", "name");
    city.setAttribute("id", "city");
    age.setAttribute("id", "age");
    gender.setAttribute("id", "gender");
    state.setAttribute("id", "state");
    viewProfileButton.setAttribute("id", "viewProfileButton");
    
    return item;
}


function main() {
    let data = fazGet("https://api.randomuser.me/?results=3");
    
    let {results: users} = JSON.parse(data); 

    console.log(users);

    let container = document.getElementById("usersContainer");
    
    container.innerHTML = "";

    users.forEach(user => {
        let newItem = criaItem(user);
        container.appendChild(newItem);
    }); 
}

main()