user = {
    "id" : localStorage.getItem("user")
}
let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
}
     
let fetchRes = fetch(url = "https://sih2022.herokuapp.com/medicine/", options);
fetchRes.then(res => res.json())
    .then(d => {
        
        console.log(d)
        
    })