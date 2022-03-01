 user = { 
        "receiver_id": localStorage.getItem('user') 
        
    }

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 
                'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    }
    
    let fetchRes = fetch(url = "https://sih2022.herokuapp.com/batch/get_recv", options);
    fetchRes.then(res =>res.json()).then(d => {
        const parcel_id = d.data[0].parcel_id
        
        user = { 
            "_id": d.data[0].sender_id 
            
        }
    
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 
                    'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        }
        
        let fetchRes = fetch(url = "https://sih2022.herokuapp.com/user/getuser", options);
        fetchRes.then(res =>res.json()).then(de => {
            console.log(de)})
        
        console.log(d)})