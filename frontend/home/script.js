btn = document.getElementById('submit')

btn.addEventListener('click', () => {

    n = document.getElementById('name').value
    c = document.getElementById('category').value
    r = document.getElementById('registration').value
    e = document.getElementById('email').value
    p = document.getElementById('password-field').value
    if (!n || !c || !r || !e || !p) {
        swal("Error", "Please fill out all fields", "error");
        return;
    }
    console.log(c)
    user = {
        "name": n,
        "category": c,
        "registration": r,
        "email": e,
        "password": p,
    }

    console.log(user)

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    }

    let fetchRes = fetch(url = "http://127.0.0.1:8000/user/createuser", options);
    fetchRes.then(res => res.json())
        .then(d => {

            console.log(d)
            if(d.msg == "An account with same email is present") {
                swal("Error", "An account with the same email is already present", "error");
            } else {
                swal("Success", "Signup completed", "success").then(() => {
                    location.replace('./login.html');
                });
            }
        })
})