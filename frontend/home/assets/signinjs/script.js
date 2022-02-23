btn = document.getElementById('submit')

btn.addEventListener('click', () => {

    n = document.getElementById('name').value
    c = document.getElementById('category').value
    r = document.getElementById('registration').value
    e = document.getElementById('email').value
    p = document.getElementById('password-field').value
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

    let fetchRes = fetch(url = "https://sih2022.herokuapp.com/user/createuser", options);
    fetchRes.then(res => res.json())
        .then(d => {
            alert("SignUp Completed")
            location.replace('http://127.0.0.1:5500/frontend/home/login.html')
            console.log(d)
        })
})