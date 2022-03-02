btn = document.getElementById("send")

btn.addEventListener("click", () => {
    const email = document.getElementById("email").value
    console.log(email)

    const sender_id = localStorage.getItem("user")
        //get email
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ "email": email })
    }
    const gen_recv_id = fetch(url = "http://sih2022.herokuapp.com/user/getuser_by_email", options);
    gen_recv_id.then(res => res.json())
        .then(d => {
            if (d.msg == "No user") {
                alert("No user found")
            } else {
                recv_id = d.data._id

                let options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({ "id": sender_id })
                }

                const gen_pk_id = fetch(url = "http://sih2022.herokuapp.com/parcel/add_parcel_id", options);
                gen_pk_id.then(res => res.json())
                    .then(d => {

                        let uopt = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify({
                                _id: localStorage.getItem('user')
                            })
                        }
                        const gen_name = fetch(url = "http://sih2022.herokuapp.com/user/get_user_by_id", uopt);
                        gen_name.then(res => res.json())
                            .then(uname => {
                                const pk_id = d.data

                                let opt = {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json;charset=utf-8'
                                    },
                                    body: JSON.stringify({
                                        "receiver_id": recv_id,
                                        "sender_id": sender_id,
                                        "name": uname.data.name,
                                        "parcel_id": pk_id
                                    })
                                }
                                const gen_batch = fetch(url = "http://sih2022.herokuapp.com/batch/create_batch", opt);
                                gen_batch.then(res => res.json())
                                    .then(d => {
                                        console.log(d)
                                    })
                            })













                    })


            }
        })

})