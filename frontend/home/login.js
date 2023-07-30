const button = document.getElementById('login')
button.addEventListener('click', () => {


    user = {
        "email": document.getElementById('username').value,
        "password": document.getElementById('password').value
    }

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    }

    let fetchRes = fetch(url = "https://sih2022.herokuapp.com/user/authenticate", options);
    fetchRes.then(res => res.json()).then(d => {
        console.log(d)
        alert(d.msg)
        if (d.msg == 'Login successful') {
            localStorage.setItem('user', d.data._id)
            localStorage.setItem('type', d.data.category)
            const category = d.data.category
            console.log(category)
            if (category == 'Manufacturer') {
                location.replace('../manufacturer/manufacturer.html')
            } else if (category == 'Wholesaler') {
                location.replace('../wholesaler/wholesaler.html')
            } else if (category == 'Pharmacist') {
                location.replace('../pharmasist/pharmasist.html')
            }
        }
    })
})