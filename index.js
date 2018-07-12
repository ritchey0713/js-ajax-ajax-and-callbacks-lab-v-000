
function displayError(){
  $("#errors").html("I'm sorry, there's been an error. Please try again.")
}

function renderCommit(commit){
  return `<li><h3>${commit.sha}</h3><p>${commit.commit.message}</p></li>`
}

function renderCommits(data){
  let result = data.map((commit)=>renderCommit(commit)).join('')
  return `<ul>${result}</ul>`
}

function showCommits(el){
  $.get(`https://api.github.com/repos/${el.dataset.owner}/${el.dataset.repository}/commits`, data => {
    $('#details').html(renderCommits(data))
  }).fail(error => {
    displayError()
  })
}

function searchRepositories(){
  let query = $("#searchTerms").val()
  let url = `https://api.github.com/search/repositories?q=${query}`

  $.get(url, function(response){
    const repos = response.items
    reposList = `<ul>${repos.map(r => '<li><h4><a href="' + r.htmlurl + '">' + r.name + '</a></h4><section><header><h4>Created by <a href="' + r.owner.html_url + '">' + r.owner.login + '</a></h4></header><img src="' + r.owner.avatar_url + '" height="32" width="32"></section><p>Description: ' + r.description + '</p><a href="#" data-repository="' + r.name + '" data-owner="' + r.owner.login + '" onclick="showCommits(this)">Commits</a></li>').join('')}</ul>`
    $("#results").html(reposList)
  })
    .fail(displayError)
}
