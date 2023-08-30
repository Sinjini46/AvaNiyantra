user = {
    "_id": localStorage.getItem("user")
  }
  let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
}
let fetchRes1 = fetch(url = "http://127.0.0.1:8000/user/get_user_by_id", options);
fetchRes1.then(res => res.json())
      .then(d => {
if(d.msg== "done"){
      console.log(d.data)}
else{
console.log(d.msg)}
})
