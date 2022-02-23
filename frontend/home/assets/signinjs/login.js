// function user_data(id)
// {
//     user = { 
//         "_id": id 
        
//     }

//     let options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 
//                 'application/json;charset=utf-8'
//         },
//         body: JSON.stringify(user)
//     }
//     let fetchRes = fetch(url = "http://sih2022.herokuapp.com/user/getuser", options);
//     fetchRes.then(res =>res.json()).then(d => { 
//         console.log(d)
//         return d.data.category
//     })
    
// }

const button = document.getElementById('login')
button.addEventListener('click', ()=>{
    

    user = { 
        "email": document.getElementById('username').value, 
        "password": document.getElementById('password').value
    }

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 
                'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    }
    
    let fetchRes = fetch(url = "https://sih2022.herokuapp.com/user/authenticate", options);
    fetchRes.then(res =>res.json()).then(d => {
        console.log(d)
        alert(d.msg)
        if (d.msg == 'Login successful')
        {
            localStorage.setItem('user',d.data._id) 
            const category = d.data.category
            console.log(category)
            if( category == 'Manufacturer')
            {
                location.replace('http://127.0.0.1:5500/frontend/manufacturer/manufacturer.html')
            }
            else if( category == 'Wholesaler')
            {
                location.replace('http://127.0.0.1:5500/frontend/wholesaler/wholesaler.html')
            }
            else if( category == 'Pharmacist')
            {
                location.replace('http://127.0.0.1:5500/frontend/pharmasist/pharmasist.html')
            }
        }                 
    })
})