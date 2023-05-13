const email = document.querySelector(".email");
const password = document.querySelector(".password");
const login = document.querySelector(".login");
const noAccount = document.querySelector(".noAccount");
console.log(email);

noAccount.addEventListener("click", async () => {
  console.log("hi");
  window.location.href = "../signUp/signup.html";
});

login.addEventListener("click", async () => {
  const account = {
    email: email.value,
    password: password.value,
  };

  console.log(account);

  const res = await fetch("/signinUser", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email: account.email,
      password: account.password,
    }),
  }).then((res) => {
    console.log(res);
    if (res.status === 404) {
      alert("Wrong account! Please type again");
    } else {
      window.location.href = "../index.html";
    }
  });
});
