
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();
eventListener();

function eventListener() {

    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", gettAllSearched);
}


function getData(e) {

    let userName = nameInput.value.trim();

    if (userName === "") {
        alert("lütfen kullanıcı adı girin")
    }
    else {
        github.getGithubData(userName)
            .then(response => {
                if (response.user.message === "Not Found") {
                    ui.showError("Kullanıcı bulunamadı")
                }
                else {
                    ui.addSearchedUserToUI(userName);
                    Storage.addSearchedUserToStorage(userName);
                    ui.showUserInfo(response.user);
                    ui.showRepoInfo(response.repo);
                }
            })
            .catch(err => ui.showError(err));
    }
    ui.clearInput();
    e.preventDefault();
}

function clearAllSearched() {
    // tüm arananları temizleme
    if(confirm("Emin misiniz?")){

        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedUsersFromUI();
    }
}

function gettAllSearched() {
         let result = "";
        let users = Storage.getSearchedUsersFromStorage();
       
        users.forEach( function(user){
           result += `<li class="list-group-item">${user}</li>`;
        } )
    //arananları storageden al ve UI'ye ekle
    lastUsers.innerHTML = result;
}