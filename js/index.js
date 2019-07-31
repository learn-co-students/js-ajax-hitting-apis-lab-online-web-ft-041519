// your code here

function getRepositories() {
    let username = document.querySelector("#username").value;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories)
    req.open('GET', "https://api.github.com/users/" + username + "/repos");
    req.send();
    return false;
}

function displayRepositories() {
    let repos = JSON.parse(this.responseText);
    console.log(repos);
    const repoList =`<ul>${repos
        .map(
            r => 
                '<li>' +
                r.name +
                ' - <a href="#" data-repo="' +
                r.name +
                '" onclick="getCommits(this)">Get Commits</a></li>' + 
                '<li>' +
                r.name +
                ' - <a href="#" data-repo="' +
                r.name +
                '" onclick="getBranches(this)">Get Branches</a></li>'
            )
        .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList; 
}

function getCommits(el) {
    let username = document.querySelector("#username").value;
    const name = el.dataset.repo;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayCommits);
    req.open('GET', "http://api.github.com/repos/" + username + "/" + name + "/commits");
    req.send();
}

function displayCommits() {
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits
        .map(
            commit =>
                '<li><h3>' +
                commit.commit.author.name +
                ' (' +
                commit.author.login +
                ')</h3>' +
                commit.commit.message +
                '</li>'
          )
          .join('')}</ul>`;
      document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
    let username = document.querySelector("#username").value;
    const name = el.dataset.repo;
    const req = new XMLHttpRequest();
    req.addEventListener('load', displayBranches);
    req.open('GET', "http://api.github.com/repos/" + username + "/" + name + "/branches");
    req.send();
}

function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchesList = `<ul>${branches
        .map(
            branch =>
                '<li><strong>' +
                branch.name +
                '</strong>' +
                '</li>'
          )
          .join('')}</ul>`;
      document.getElementById('details').innerHTML = branchesList;
}