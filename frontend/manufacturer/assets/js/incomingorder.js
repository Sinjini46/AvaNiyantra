let options = 
{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ "receiver_id": localStorage.getItem('user') })
}

let fetchRes = fetch(url = "https://sih2022.herokuapp.com/batch/get_recv", options);
fetchRes
    .then(async res => res.json())
    .then(async d => {
        arr = []
        container = document.getElementById("container")
        for (i = 0; i < d.data.length; i++) {
            console.log(d)
            a = d.data[i].parcel_id
            if (!arr.includes(a)) {
                arr.push(a)
                n = d.data[i].sender_name
                tn1 = document.createTextNode(a)
                tn0 = document.createTextNode(i + 1)
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
            }
        }
    })