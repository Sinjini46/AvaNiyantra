type = localStorage.getItem("type");
if (type != "Manufacturer") {
    document.getElementById("man").remove();
}

btn = document.getElementById('submit');

btn.addEventListener('click', () => {
    n = document.getElementById('name').value;
    c = document.getElementById('narcotics_level').value;
    q = document.getElementById('quantity').value;

    console.log(c);
    user = {
        "id": localStorage.getItem("user"),
        "name": n,
        "level": c,
        "quantity": q
    };

    console.log(user);

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    };

    let fetchRes = fetch(url = "http://127.0.0.1:8000/medicine/add", options);
    fetchRes.then(res => res.json())
        .then(d => {
            swal("Success", "Medicine added successfully.", "success").then(() => {
                location.reload();
            });
        });
});
