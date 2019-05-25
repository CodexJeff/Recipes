function getRecipies(){

	let ingredientName = document.getElementById('text').value
	if(ingredientName === '') {
		return alert('Please enter an Ingredient')
	}

	let ingredientDiv = document.getElementById('gallery')
	ingredientDiv.innerHTML = ''

	let xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () =>{
		if(xhr.readyState == 4 && xhr.status == 200) {
			let response = JSON.parse(xhr.responseText);
			let obj = JSON.parse(JSON.parse(response));
			ingredientDiv.innerHTML = ingredientDiv.innerHTML

			for(var i = 0; i < 30; i++){
				ingredientDiv.innerHTML = ingredientDiv.innerHTML + `
				<div class = "slide" style = "float:left">
				<a target = "_blank" href = "${obj.recipes[i].f2f_url}">
				<img src = "${obj.recipes[i].image_url}" width = "350" height = "250">
				</a>
				<div class = "title" style = "text-align:center">${obj.recipes[i].title}</div>
				</div>
				`
			}
		}
	}
	xhr.open('GET', `/recipes?ingredient=${ingredientName}`, true);
	xhr.send();
}

//Attach Enter-key Handler
const ENTER=13
document.getElementById("text")
.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === ENTER) {
		document.getElementById("submit").click();
	}
});
