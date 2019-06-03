const inputValue = document.querySelector("#search");
const searchButton = document.querySelector(".searchButton");
const imgContainer = document.querySelector(".img_box");
const unContainer = document.querySelector(".username");
const nameContainer = document.querySelector(".name");
const bioContainer = document.querySelector(".bio");
const repoNameContainer = document.querySelector(".repo_name");
const repoStarsContainer = document.querySelector(".stars");
const repoForksContainer = document.querySelector(".forks");


const client_id = "v1.28ca1a5d5264c14f";
const client_secret = "4ab18db26c8483719c7802948d769ae3d8bdce19";

const fetchUsers = async (user) => {
    const api_call = await fetch(`https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`);
    
    const data = await api_call.json();
    return { data }
};

const fetchRepos = async (user) => {
    const api_call = await fetch (`https://api.github.com/users/${user}/repos?client_id=${client_id}&client_secret=${client_secret}`)

    const data = await api_call.json();
    return { data }

}

const showData = () => {
    fetchUsers(inputValue.value).then((res) => {
        imgContainer.innerHTML = `<span><img src=${res.data.avatar_url} style="width:127px;border:solid 1px; border-radius:7px"></span>`
        unContainer.innerHTML = `@<span>${res.data.login}</span>`;
        nameContainer.innerHTML = `<a target="_blank" rel="noopener noreferrer" href=${res.data.html_url}>${res.data.name}</a>`;
        bioContainer.innerHTML = `Bio: <span>${res.data.bio}</span>`;
    })
    fetchRepos(inputValue.value).then((res) => {
        let returned = res.data;
        let repoInfo = [];
            returned.forEach(ele =>{
                repoInfo.push({name:ele.name,
                               stars: ele.watchers_count,
                               forks: ele.forks_count,
                               repoUrl: ele.html_url
                })
            })
            let name = '<div>';
            let stars = '<div>';
            let forks = '<div>';


            repoInfo.forEach(ele =>{
                name += `<div> <a target="_blank" rel="noopener noreferrer" href=${ele.repoUrl}>${ele.name}</a> </div>`;
                stars += '<div>' +'<img src="icons/star.svg" class="star_img">' +ele.stars +'</div>';
                forks += '<div>' +'<img src="icons/forked.svg" class="fork_img">'+ ele.forks +'</div>';
            })
            repoNameContainer.innerHTML = name;
            repoStarsContainer.innerHTML = stars;
            repoForksContainer.innerHTML = forks;

    })
}

const toggleHide = () => {
    fetchUsers(inputValue.value).then((res) =>{
        let error = document.getElementById('err');
        let content = document.getElementById('hide');

            if(res.data.message == 'Not Found'){
                error.className = 'showError';
                content.className = 'hidden';
            } else {
                if(res.data.message == undefined){
                    content.className = 'show';
                    error.className = 'hideError';
                }
            }
    })
}

searchButton.addEventListener("click", () => {
    showData();
    toggleHide();
})