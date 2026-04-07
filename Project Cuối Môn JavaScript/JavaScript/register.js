let users = [
    {
        id: 1,
        firstname: "Lê",
        lastname: "Minh Thu",
        email: "minhthu@gmail.com",
        password: "123456",
        role: 1,
        name: "Lê Minh Thu",
        username: "@MinhThu",
        status: "hoạt động",
        avatar: "../assets/images/user-manager/avatar10.png"
    },
    {
        id: 2,
        firstname: "Vũ",
        lastname: "Hồng Vân",
        email: "hongvan@yahoo.com",
        password: "abc123",
        role: 0,
        name: "Vũ Hồng Vân",
        username: "@HongVan",
        status: "hoạt động",
        avatar: "../assets/images/user-manager/avatar1.png"
    },
    {
        id: 3,
        firstname: "Bùi",
        lastname: "Hữu Nhân",
        email: "huunhan@yahoo.com",
        password: "030224",
        role: 0,
        name: "Bùi Hữu Nhân",
        username: "@HuuNhan",
        status: "hoạt động",
        avatar: "../assets/images/user-manager/avatar.png"
    }
];

let getData = () => {
    let data = JSON.parse(localStorage.getItem("listUser"));
    if(data){
        users = data;
    }
}

let saveData = () => {
    localStorage.setItem("listUser",JSON.stringify(users));
}

let initData = () => {
    let data = localStorage.getItem("listUser");

    if (!data) {
        localStorage.setItem("listUser", JSON.stringify(users));
    } else {
        users = JSON.parse(data);
    }
}

let firstNameElement = document.getElementById("firstName");
let lastNameElement = document.getElementById("lastName");
let emailElement = document.getElementById("email");
let passwordElement = document.getElementById("password");
let confirmPasswordElement = document.getElementById("repassword");
let signInElement = document.getElementById("sign-up");

initData();

let checkEmail = (email) => {
    return users.some((user) => user.email === email);
}

signInElement.addEventListener("click",(e) => {
    e.preventDefault();

    let newFirstName = firstNameElement.value.trim();
    let newLastName = lastNameElement.value.trim();
    let newEmail = emailElement.value.trim();
    let newPassword = passwordElement.value.trim();
    let newConfirmPassword = confirmPasswordElement.value.trim();

    if(newFirstName == "" || newLastName == ""){
        Swal.fire({
        icon: "error",
        title: "Lỗiii...",
        text: "Họ và tên không được để trống",
        });
        return;
    }

    if(newEmail == ""){
        Swal.fire({
        icon: "error",
        title: "Lỗiii...",
        text: "Email không được để trống",
        });
        return;
    }

    if(!newEmail.includes("@gmail.com")){
        Swal.fire({
        icon: "error",
        title: "Lỗiii...",
        text: "Email phải đúng định dạng",
        });
        return;
    }

    if(checkEmail(newEmail)){
        Swal.fire({
            icon: "error",
            title: "Lỗiii...",
            text: "Email đã tồn tại",
        });
        return;
    }

    if(newPassword == ""){
        Swal.fire({
        icon: "error",
        title: "Lỗiii...",
        text: "Mật khẩu không được để trống",
        });
        return;
    }

    if(newPassword.length < 6){
        Swal.fire({
        icon: "error",
        title: "Lỗiii...",
        text: "Mật khẩu tối thiểu 6 ký tự",
        });
        return;
    }

    if(newConfirmPassword == ""){
        Swal.fire({
        icon: "error",
        title: "Lỗiii...",
        text: "Mật khẩu xác nhận không được để trống",
        });
        return;
    }

    if(newConfirmPassword !== newPassword) {
        Swal.fire({
        icon: "error",
        title: "Lỗiii...",
        text: "Mật khẩu phải trùng khớp",
        });
        return;
    }

    let newUser = {
        id: Date.now(),
        firstname: newFirstName,
        lastname: newLastName,
        email: newEmail,
        password: newPassword,
        role: 0
    }

    users.push(newUser);
    saveData();

    Swal.fire({
    title: "Success!",
    text: "Đăng ký thành công!",
    icon: "success",
    timer: 2000,
    showConfirmButton: false
    }).then(() => {
        window.location.href = "../HTML/login.html";
    });

    // setTimeout(() => {
    //     window.location.href = "../HTML/login.html";
    // }, 2000);
});