function edit() {
    console.log('edit')
}

function med_delete(id) {
    data = {
        "_id": id
    }
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }

    let fetchRes = fetch(url = "https://sih2022.herokuapp.com/medicine/delete", options);
    fetchRes.then(res => res.json())
        .then(d => {
            if (d.msg == "done") {
                location.reload();
            }
        })
}



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

let fetchRes = fetch(url = "https://sih2022.herokuapp.com/medicine/", options);
fetchRes.then(res => res.json())
    .then(d => {
        container = document.getElementById("medicine-list")
        console.log(d)
        if (d.msg == "done") {
            for (i = 0; i < d.data.length; i++) {
                tr = document.createElement("tr")
                td1 = document.createElement("td")
                td2 = document.createElement("td")
                td3 = document.createElement("td")
                tq = document.createElement("td")
                td4 = document.createElement("td")

                count = document.createTextNode(i + 1)
                n = document.createTextNode(d.data[i]['name'])
                l = document.createTextNode(d.data[i]['level'])
                q = document.createTextNode(d.data[i]['quantity'])

                edit = document.createElement('i')
                edit.setAttribute("class", "fa fa-edit")
                edit.setAttribute("style", "font-size: 24px; margin-right: 20px;")
                edit.setAttribute("id", d.data[i]['_id'])
                edit.addEventListener("click", (e) => {
                    console.log(e.target.id)
                })

                del = document.createElement('i')
                del.setAttribute("class", "fa fa-trash")
                del.setAttribute("style", "font-size: 24px; margin-right: 20px;")
                del.setAttribute("id", d.data[i]['_id'])
                del.addEventListener("click", (e) => {
                    id = e.target.id
                    med_delete(id)
                })

                td1.appendChild(count)
                td2.appendChild(n)
                td3.appendChild(l)
                tq.append(q)
                td4.appendChild(edit)
                td4.appendChild(del)

                tr.appendChild(td1)
                tr.appendChild(td2)
                tr.appendChild(td3)
                tr.append(tq)
                tr.appendChild(td4)

                container.appendChild(tr)
            }
        }

    })