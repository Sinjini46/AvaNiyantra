function createNewElement() {
    // create a DIV element.
    var txtNewInputBox1 = document.createElement('div');
    // Then add the content (a new input box) of the element with class.
    txtNewInputBox1.innerHTML = 
    `<div class="container">
    <div class="row g-2">
    <div class="col-lg-6">
    <label for="inputmedicinename" class="form-label">Medicine Name</label>
    <input type="text" class="form-control" id="inputmedicinename" required>
  </div>
  <div class="col-lg-6">
    <label for="inputmedicinedosage" class="form-label">Medicine Dosage</label>
    <input type="text" class="form-control" id="inputmedicinedosage" required>
  </div>
  </div>
  </div>
 </div> 
  <div id="newForm"></div>`

        // Final outpot print.
        document.getElementById("newForm").appendChild(txtNewInputBox1);

}