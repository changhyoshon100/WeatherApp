let email = document.querySelector(".email");
let password = document.querySelector(".password");
let repassword = document.querySelector(".repassword");
const signupBtn = document.querySelector(".signupbtn");
const cancelBtn = document.querySelector(".cancelbtn");
console.log("signup js outside");
signupBtn.addEventListener("click", async function () {
  console.log("hey man!");
  let chkEmail = true,
    chkSamePassword = true,
    lenPassword = true;
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  try {
    if (!email.value.match(mailformat)) {
      chkEmail = false;
      throw new Error(chkEmail);
    }

    if (password.value != repassword.value) {
      chkSamePassword = false;
      throw new Error(chkSamePassword);
    }
    if (password.value < 8 || repassword.value < 8) {
      lenPassword = false;
      throw new Error(lenPassword);
    }
    // email = email.value;
    // password = password.value;
    // repassword = repassword.value;
    // console.log(email, password, repassword);
    const res = await fetch("/createUser", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        repassword: repassword.value,
      }),
    })
      .then((res) => {
        console.log("!@#");
        window.location.href = "../index.html";
      })
      .catch((error) => {
        console.error("There was an error with the fetch request:", error);
      });
  } catch (e) {
    if (!chkEmail) alert("You have entered an invalid email address!");
    if (!chkSamePassword) alert("The password is not the same!");
    if (!lenPassword) alert("The length of password must be above 7!");
  }
});
