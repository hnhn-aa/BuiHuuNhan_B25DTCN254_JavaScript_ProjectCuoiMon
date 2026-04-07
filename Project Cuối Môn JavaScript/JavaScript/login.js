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

initData();

let emailElement = document.getElementById("email");
let passwordElement = document.getElementById("password");
let buttonLoginElement = document.getElementById("btn-login");

buttonLoginElement.addEventListener("click", (e) => {
    e.preventDefault();
    
    let emailInput = emailElement.value.trim();
    let passwordInput = passwordElement.value.trim();

    if(emailInput == ""){
        Swal.fire({
        icon: "error",
        title: "Lỗiii...",
        text: "Email không được để trống",
        });
        return;
    }

    if(passwordInput == ""){
        Swal.fire({
        icon: "error",
        title: "Lỗiii...",
        text: "Mật khẩu không được để trống",
        });
        return;
    }
    let user = users.find(user => 
        user.email === emailInput && user.password === passwordInput
    );

    if(!user){
        Swal.fire({
            icon: "error",
            title: "Lỗiii...",
            text: "Email hoặc mật khẩu không đúng",
        });
        return;
    }

    localStorage.setItem("currentUser",JSON.stringify(user));

    Swal.fire({
    title: "Success!",
    text: "Đăng nhập thành công!",
    icon: "success",
    timer: 2000,
    showConfirmButton: false
    }).then(() => {
        if(user.role == 0){
            window.location.href = "../HTML/dashboard.html";
        }else if(user.role == 1){
            window.location.href = "../HTML/user_manager.html";
        }
    });
});