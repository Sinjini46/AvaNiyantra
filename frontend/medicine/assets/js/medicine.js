type = localStorage.getItem("type");
if (type != "Manufacturer") {
    document.getElementById("man").remove()
}



btn = document.getElementById('submit')

btn.addEventListener('click', () => {
    n = document.getElementById('name').value
    c = document.getElementById('narcotics_level').value
    q = document.getElementById('quantity').value

    console.log(c)
    user = {
        "id": localStorage.getItem("user"),
        "name": n,
        "level": c,
        "quantity": q
    }

    console.log(user)

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    }

    let fetchRes = fetch(url = "https://sih2022.herokuapp.com/medicine/add", options);
    fetchRes.then(res => res.json())
        .then(d => {
            location.reload();
        })
})