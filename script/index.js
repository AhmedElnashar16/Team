const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('email');
const userData = JSON.parse(localStorage.getItem(myParam));
const profileContainer = document.getElementById('sidebar-menu__profile__container');
const profileLink = document.querySelector(".sidebar-menue__profile")
profileContainer.addEventListener('mouseover',()=>{
    profileLink.style.color = 'rgb(29, 160, 242)';
})
profileContainer.addEventListener('mouseleave',()=>{
    profileLink.style.color = 'rgb(15, 20, 26)';
})
const ApplyUserName = () =>{
    const names = document.querySelectorAll('.tweet__author-name');
    const emails = document.querySelectorAll('.tweet__author-slug');
    names.forEach(i=>i.innerHTML = userData.name);
    emails.forEach(i=>i.innerHTML = userData.eaddress);
    profileLink.href = `profile.html?email=${myParam}`;
}


window.onload = ()=>{
    ApplyUserName();
}

