id = {
    "user_id": localStorage.getItem("user")
}

let opt = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(id)
}

let f = fetch(url = "http://sih2022.herokuapp.com/parcel/get_parcels_id", opt);
f
    .then(res => res.json())
    .then(d => {
        a = document.getElementById("cart")

        for (i = 0; i < d.data.length; i++) {
            tr = document.createElement("tr")
            td_name = document.createElement("td")
            td_quantity = document.createElement("td")

            n = document.createTextNode(d.data[i].name)
            q = document.createTextNode(d.data[i].quantity)

            td_name.appendChild(n)
            td_quantity.appendChild(q)

            tr.appendChild(td_name)
            tr.appendChild(td_quantity)
            a.appendChild(tr)
        }

        console.log(d)
    })