const jpdbBaseURL = "http://api.login2explore.com:5577";
const jpdbIRL = jpdbBaseURL + "/api/irl";
const jpdbIML = jpdbBaseURL + "/api/iml";
const dbName = "SCHOOL-DB";
const relName = "STUDENT-TABLE";
const connToken = "90935000|-31949211016459911|90959283";

function resetForm() {
  $("#rollno").val("").prop("disabled", false).focus();
  $("#fullname, #class, #birthdate, #address, #enrollmentdate").val("").prop("disabled", true);
  $("#saveBtn, #updateBtn").prop("disabled", true);
}

function validateFields() {
  return (
    $("#rollno").val() &&
    $("#fullname").val() &&
    $("#class").val() &&
    $("#birthdate").val() &&
    $("#address").val() &&
    $("#enrollmentdate").val()
  );
}

function createStudentJSON() {
  return {
    rollno: $("#rollno").val(),
    fullname: $("#fullname").val(),
    class: $("#class").val(),
    birthdate: $("#birthdate").val(),
    address: $("#address").val(),
    enrollmentdate: $("#enrollmentdate").val()
  };
}

function saveData() {
  if (!validateFields()) {
    alert("⚠️ Please fill all fields before saving.");
    return;
  }

  const data = createStudentJSON();
  const req = {
    token: connToken,
    dbName: dbName,
    rel: relName,
    jsonStr: JSON.stringify(data)
  };

  $.ajax({
    url: jpdbIML + "/put",
    type: "POST",
    data: JSON.stringify(req),
    contentType: "application/json",
    success: function () {
      alert("✅ Student data saved successfully!");
      resetForm();
    },
    error: function (xhr, status, error) {
      console.error("Error saving student:", xhr.status, xhr.responseText);
      alert("❌ Save failed: " + (xhr.responseText || error || "Unknown error"));
    }
  });
}

function updateData() {
  if (!validateFields()) {
    alert("⚠️ Please fill all fields before updating.");
    return;
  }

  const data = createStudentJSON();
  const req = {
    token: connToken,
    dbName: dbName,
    rel: relName,
    cmd: "UPDATE",
    relKey: "rollno",
    jsonStr: JSON.stringify(data)
  };

  $.ajax({
    url: jpdbIML + "/set",
    type: "POST",
    data: JSON.stringify(req),
    contentType: "application/json",
    success: function () {
      alert("🔁 Student data updated successfully!");
      resetForm();
    },
    error: function (xhr) {
      alert("❌ Update failed: " + xhr.responseText);
    }
  });
}

function checkRollNoExists() {
  const rollNo = $("#rollno").val().trim();
  if (rollNo === "") return;

  const req = {
    token: connToken,
    dbName: dbName,
    rel: relName,
    cmd: "GET_BY_KEY",
    relKey: "rollno",
    keyVal: rollNo
  };

  $.ajax({
    url: jpdbIRL,
    type: "POST",
    data: JSON.stringify(req),
    contentType: "application/json",
    success: function (result) {
      try {
        const parsed = JSON.parse(result.data);
        const record = parsed.record;

        $("#fullname").val(record.fullname);
        $("#class").val(record.class);
        $("#birthdate").val(record.birthdate);
        $("#address").val(record.address);
        $("#enrollmentdate").val(record.enrollmentdate);

        $("#rollno").prop("disabled", true);
        $("#fullname, #class, #birthdate, #address, #enrollmentdate").prop("disabled", false);
        $("#updateBtn").prop("disabled", false);
        $("#fullname").focus();
      } catch (e) {
        console.warn("No data found for roll no.", e);
        $("#fullname, #class, #birthdate, #address, #enrollmentdate").prop("disabled", false);
        $("#saveBtn").prop("disabled", false);
        $("#fullname").focus();
      }
    },
    error: function () {
      $("#fullname, #class, #birthdate, #address, #enrollmentdate").prop("disabled", false);
      $("#saveBtn").prop("disabled", false);
      $("#fullname").focus();
    }
  });
}

$(document).ready(function () {
  resetForm();
  $("#resetBtn").click(resetForm);
  $("#saveBtn").click(saveData);
  $("#updateBtn").click(updateData);
  $("#rollno").on("blur change", checkRollNoExists);
});
