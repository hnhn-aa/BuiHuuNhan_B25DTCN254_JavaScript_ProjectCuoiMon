let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){
    window.location.href = "../HTML/login.html";
}

let headerElement = document.getElementById("header");
console.log(headerElement);

let renderHeader = () => {
    headerElement.innerHTML = `
        <div class="logo" id="logo">RIKKEI_EDU_BLOG</div>
            <div class="right">
                <div class="avatar-box" id="avatarBox">
                <img src="${currentUser.avatar}" alt="avatar" class="avatar">
                
                <div class="dropdown" id="dropdown">
                    <div class="user-info" id="avatar-box">
                    <img src="${currentUser.avatar}" alt="avatar">
                    <div>
                        <p class="name">${currentUser.name}</p>
                        <p class="email">${currentUser.email}</p>
                    </div>
                    </div>

                    <ul>
                        <li id="view-profile">View profile</li>
                        <li id="update-profile-picture">Update profile picture</li>
                        <li id="change-password">Change password</li>
                        <li class="logout" id="logout">Log out</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}
renderHeader();

let avatarBox = document.getElementById("avatarBox");
let dropdown = document.getElementById("dropdown");

avatarBox.addEventListener("click",  (e) => {
dropdown.classList.toggle("show");
e.stopPropagation(); 
});

document.addEventListener("click",  () => {
dropdown.classList.remove("show");
});



let logoutElement = document.getElementById("logout");
logoutElement.addEventListener("click",() => {
  Swal.fire({
    title: "Are you sure?",
    text: "Bạn có muốn đăng xuất",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, I agree!"
  }).then((result) => {
    if (result.isConfirmed) {
      let timerInterval;
      Swal.fire({
        title: "Đang đăng xuất",
        html: "Sẽ đăng xuất sau <b></b> milliseconds.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) console.log("I was closed by the timer");
        localStorage.removeItem("currentUser");
        window.location.href = "../HTML/login.html";
      }); 
    }
  });
})

let logoElement = document.getElementById("logo");

logoElement.addEventListener("click",() => {
    window.history.back();
});

let profileContainerElement = document.getElementById("profile-container");

let renderUserInfo = () => {
  profileContainerElement.innerHTML = "";
  let userInfoHTML = document.createElement("div");
  userInfoHTML.classList.add("profile-card");
  userInfoHTML.innerHTML = `
    <div class="profile-header">
      <img id="avatarPreview" src="${currentUser.avatar}" class="avatar-profile" alt="Avatar">
      
      <input type="file" id="uploadAvatar" hidden>
      <button onclick="updateAvatar()" class="upload-btn">
      Cập nhật ảnh
      </button>

      <h2>${currentUser.name}</h2>
      <p class="role" id="role">User</p>
  </div>

  <div class="profile-info">
      <div class="info-item">
      <label>Email</label>
      <p>${currentUser.email}</p>
      </div>

      <div class="info-item">
      <label>Trạng thái</label>
      <p>${currentUser.status}</p>
      </div>
  </div>

  <div class="profile-actions">
      <button onclick="togglePasswordForm()" class="edit-btn">Đổi mật khẩu</button>
  </div>

  <div id="passwordForm" class="password-form">
      <input type="password" placeholder="Mật khẩu cũ" id="oldPassword">
      <input type="password" placeholder="Mật khẩu mới" id="newPassword">
      <input type="password" placeholder="Xác nhận mật khẩu" id="confirmPassword">
      <button class="save-btn" onclick="savePassword()">Lưu mật khẩu</button>
  </div>

  `;
  profileContainerElement.appendChild(userInfoHTML);
};
renderUserInfo();

let renderRole = () => {
  let roleElement = document.getElementById("role");
  console.log(roleElement);
  
  if(currentUser.role == 1){
    roleElement.textContent = "Admin";
  } else {
    roleElement.textContent = "User";
  }
}
renderRole();

let uploadAvatarElement = document.getElementById("uploadAvatar");
let avatarPreviewElement = document.getElementById("avatarPreview");

let updateAvatar = () => {
  uploadAvatarElement.click();
};

uploadAvatarElement.addEventListener("change", (e) => {
  let file = e.target.files[0];

  if (file) {
    let reader = new FileReader();

    reader.onload = (event) => {
      let newAvatar = event.target.result;

      currentUser.avatar = newAvatar;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      let users = JSON.parse(localStorage.getItem("listUser")) || [];
      let index = users.findIndex(user => user.id === currentUser.id);

      if (index !== -1) {
        users[index].avatar = newAvatar;
      }

      localStorage.setItem("listUser", JSON.stringify(users));

      avatarPreviewElement.src = newAvatar;
    };

    reader.readAsDataURL(file);
  }
});

let form = document.getElementById("passwordForm");
let oldPasswordElement = document.getElementById("oldPassword");
let newPasswordElement = document.getElementById("newPassword");
let confirmPasswordElement = document.getElementById("confirmPassword");

let togglePasswordForm = () => {
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
};

let savePassword = () => {
  let oldPassword = oldPasswordElement.value.trim();
  let newPassword = newPasswordElement.value.trim();
  let confirmPassword = confirmPasswordElement.value.trim();

  if(oldPassword == "" || newPassword == "" || confirmPassword == ""){
    Swal.fire({
      icon: "error",
      title: "Lỗiii...",
      text: "Vui lòng điền đầy đủ thông tin",
    });
    return;
  }

  if(oldPassword.length < 6 || newPassword.length < 6 || confirmPassword.length < 6){
    Swal.fire({
      icon: "error",
      title: "Lỗiii...",
      text: "Mật khẩu tối thiểu 6 ký tự",
      });
    return;
  }

  if(oldPassword !== currentUser.password){
    Swal.fire({
      icon: "error",
      title: "Lỗiii...",
      text: "Mật khẩu cũ không đúng",
      });
    return;
  }

  if(newPassword !== confirmPassword){
    Swal.fire({
      icon: "error",
      title: "Lỗiii...",
      text: "Mật khẩu mới và xác nhận mật khẩu không khớp",
      });
    return;
  }

  if(newPassword === oldPassword){
    Swal.fire({
      icon: "error",
      title: "Lỗiii...",
      text: "Mật khẩu mới không được trùng với mật khẩu cũ",
      });
    return;
  }

  currentUser.password = newPassword;
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  Swal.fire({
    icon: "success",
    title: "Thành công",
    text: "Mật khẩu đã được cập nhật",
    });
  form.style.display = "none";
  oldPasswordElement.value = "";
  newPasswordElement.value = "";
  confirmPasswordElement.value = "";
}