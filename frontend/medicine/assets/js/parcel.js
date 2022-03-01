user = {
    "id": localStorage.getItem("user")
}
let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
}

let fetchRes = fetch(url = "http://sih2022.herokuapp.com/medicine/", options);
fetchRes
    .then(res => res.json())
    .then(d => {
        container = document.getElementById("container")
        console.log(d)
        if (d.msg == "done") {
            for (i = 0; i < d.data.length; i++) {
                tr = document.createElement("tr")
                td1 = document.createElement("td")
                td2 = document.createElement("td")
                td2.setAttribute("id", `name-${d.data[i]['_id']}`)
                td3 = document.createElement("td")
                tq = document.createElement("td")
                tq.setAttribute("id", `max-${d.data[i]['_id']}`)
                value = document.createElement("td")
                td4 = document.createElement("td")

                count = document.createTextNode(i + 1)
                n = document.createTextNode(d.data[i]['name'])
                l = document.createTextNode(d.data[i]['level'])
                q = document.createTextNode(d.data[i]['quantity'])

                edit = document.createElement('i')
                edit.appendChild(document.createTextNode("+"))
                edit.setAttribute("id", d.data[i]['_id'])


                edit.addEventListener("click", (e) => {
                    if (Number(document.getElementById(`quantity-${e.target.id}`).value) > Number(document.getElementById(`max-${e.target.id}`).innerHTML)) {
                        alert("Max Limit exceed")
                    } else {
                        parcel = {
                            "user_id": localStorage.getItem("user"),
                            "med_id": e.target.id,
                            "name": document.getElementById(`name-${e.target.id}`).innerHTML,
                            "quantity": Number(document.getElementById(`quantity-${e.target.id}`).value),
                            "active": true
                        }
                        console.log(parcel)
                        let options = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify(parcel)
                        }

                        let fetchRes = fetch(url = "http://sih2022.herokuapp.com/parcel/create_parcel", options);
                        fetchRes.then(res => res.json())
                            .then(d => {
                                console.log(d)
                            })
                    }
                })


                td1.appendChild(count)
                td2.appendChild(n)
                td3.appendChild(l)
                tq.append(q)

                a = document.createElement("input")
                a.setAttribute("id", `quantity-${d.data[i]['_id']}`)
                value.appendChild(a)

                td4.appendChild(edit)

                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.appendChild(tq)
                tr.appendChild(value)
                tr.appendChild(td4)

                container.appendChild(tr)
            }
        }

    })