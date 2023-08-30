var counter = 0
function createNewElement() {
  // Incremental counter for unique IDs
 // let counter = 1;

  // create a DIV element.
  var txtNewInputBox1 = document.createElement('div');
  txtNewInputBox1.innerHTML = `
    <div class="container">
      <div class="row g-2">
        <div class="col-lg-6">
          <label for="inputmedicinename${counter}" class="form-label">Medicine Name</label>
          <input type="text" class="form-control" id="inputmedicinename${counter}" required>
        </div>
        <div class="col-lg-6">
          <label for="inputmedicinedosage${counter}" class="form-label">Medicine Dosage</label>
          <input type="number" class="form-control" id="inputmedicinedosage${counter}" required>
        </div>
      </div>
    </div>`;

  // Increment the counter for the next set of elements
  counter++;

  // Append the new input fields
  document.getElementById("newForm").appendChild(txtNewInputBox1);
  console.log(counter);
}

function removeLastElement() {
  if (counter > 0) {
    // Decrement the counter
    counter--;

    // Remove the last added input fields
    const newForm = document.getElementById("newForm");
    newForm.removeChild(newForm.lastChild);
    console.log(counter);
  }
}

function update_medicine(update_med){
  let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(update_med)
  }
  fetchRes = fetch(url = "http://127.0.0.1:8000/medicine/update", options);
  fetchRes.then(res => res.json())
        .then(d => {
            console.log("Update:",d.msg);
        })
}
function check_elements_present(required_data, user_data, user_id){
  var status  = 0
  required_data.forEach(itemA=> {
    var flag =0;

    for (let i=0;i<user_data.length;i++){
      if(user_data[i].name.toLowerCase() === itemA.med_name.toLowerCase()){
        flag = 1;
        if(user_data[i].quantity < itemA.dose){
          alert(user_data[i].name+ " is not in sufficient amount");
          status = 1;
          return 0;
        }
        else{
          user_data[i].quantity = user_data[i].quantity-itemA.dose
          updated_data = {
            "_id": user_data[i]._id,
            "quantity": user_data[i].quantity
          }
          console.log(user_id)
         // console.log(updated_data)
          update_medicine(updated_data)
        }

      }
    }
    if(flag == 0){
      alert(itemA.med_name + " is not there in our stock");
      status = 1;
      return 0;
    }
  })
  if(status==1){
    return 0;
  }
  return 1;
}
function add_details(requestData){
  let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(requestData)
  }
  let fetchRes = fetch(url = "http://127.0.0.1:8000/pharma/add", options);
  fetchRes.then(res => res.json())
        .then(d => {
            console.log("Addition of Patient Details :",d.msg);
        })
}

const button = document.getElementById('pharmacistorder')
button.addEventListener('click', (e) => {
  e.preventDefault()
  const patientName = document.getElementById('patientName').value
  const patientContactNumber = document.getElementById('inputphone').value
  const doctorName = document.getElementById('doctorName').value
  const doctorRegNumber = document.getElementById('inputdocreg').value
  const medicines = []
  const medicineNames = [];
  const medicineDosages = [];
  for(let i=0;i<counter;i++){
    medicines.push({"med_name" : document.getElementById('inputmedicinename'+i).value, "dose" : document.getElementById('inputmedicinedosage'+i).value})
   // medicineNames.push(document.getElementById('inputmedicinename'+i).value)
   // medicineDosages.push(document.getElementById('inputmedicinedosage'+i).value)
  }
  user = {
    "id": localStorage.getItem("user")
  }

  const requestData = {
    patientName,
    patientContactNumber,
    doctorName,
    doctorRegNumber,
    medicines
  };

  let options1 = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(user)
}

  console.log(requestData)
  console.log(counter)
  var flag = 0
  let fetchRes1 = fetch(url = "http://127.0.0.1:8000/medicine/", options1);
  fetchRes1.then(res => res.json())
      .then(d => {
        //console.log(d)
        if(d.msg=="done"){
          console.log(d.data)
          console.log(user.id)
          flag = check_elements_present(medicines, d.data, user.id)
          console.log("Flag:", flag)
          if(flag==1){
            add_details(requestData)
            alert("Orders Processed")
            location.reload()
          }
        }
      })


      //console.log(user_med)
 // flag = check_elements_present(medicines, user_med)
  //Validating the medicines
})



//Everything is done except for updating the medicine list{ We can easily do using teh update option}