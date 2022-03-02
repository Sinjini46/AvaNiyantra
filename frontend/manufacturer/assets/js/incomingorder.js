user = {
    "receiver_id": localStorage.getItem('user')

}

let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
}

let fetchRes = fetch(url = "https://sih2022.herokuapp.com/batch/get_recv", options);
fetchRes.then(res => res.json()).then(d => {
    prev = []
    container = document.getElementById("container")
    for (i = 0; i < d.data.length; i++) {
        a = d.data[i].parcel_id
        if (!prev.includes(a)) {
            prev.push(a)
            sender_id = d.data[i].sender_id

            tn1 = document.createTextNode(d.data[i].parcel_id)
            sender = {
                "_id": sender_id
            }
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(sender)
            }

            let userData = fetch(url = "https://sih2022.herokuapp.com/user/get_user_by_id", options);
            userData.then(res => res.json())
                .then(res => {
                    n = res.data.name
                    tn0 = document.createTextNode(i)
                    tn2 = document.createTextNode(n)

                    td0 = document.createElement("td")
                    td0.appendChild(tn0)

                    anchor = document.createElement("a")
                    anchor.setAttribute("href", a);
                    anchor.appendChild(tn1)
                    td1 = document.createElement("td")
                    td1.appendChild(anchor)


                    td2 = document.createElement("td")
                    td2.appendChild(tn2)

                    tr1 = document.createElement("tr")

                    tr1.appendChild(td0)
                    tr1.appendChild(td2)
                    tr1.appendChild(td1)

                    container.appendChild(tr1)
                })
        }
    }
})