let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){
  window.location.href = "../HTML/login.html";
}

let users = [];
let saveData = () => {
  localStorage.setItem("listUser", JSON.stringify(users));
};

let getData = () => {
  let data = JSON.parse(localStorage.getItem("listUser"));
  if (data) {
    users = data;
  }
};

let userListElement = document.getElementById("user-list");
let searchInput = document.querySelector(".search input");
let sortSelect = document.getElementById("sort-name");

getData();

let currentPage = 1;
let itemsPerPage = 2;
let searchQuery = "";
let sortOrder = "none";

let getFilteredUsers = () => {
  let filtered = users.filter((user) => {
    let lowerName = user.name.toLowerCase();
    let lowerUsername = user.username.toLowerCase();
    let lowerEmail = user.email.toLowerCase();
    let lowerQuery = searchQuery.toLowerCase();
    return (
      lowerName.includes(lowerQuery) ||
      lowerUsername.includes(lowerQuery) ||
      lowerEmail.includes(lowerQuery)
    );
  });

  if (sortOrder === "asc") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === "desc") {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  return filtered;
};

let renderUsers = () => {
  userListElement.innerHTML = "";

  let filteredUsers = getFilteredUsers();
  let totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let start = (currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage;

  let paginatedUsers = filteredUsers.slice(start, end);

  if (paginatedUsers.length === 0) {
    userListElement.innerHTML = "<tr><td colspan='4'>Không có dữ liệu</td></tr>";
    renderPagination(totalPages);
    return;
  }

  paginatedUsers.forEach((user) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="user">
          <img src="${user.avatar}">
          <div>
              ${user.name} <br><span>${user.username}</span>
          </div>
      </td>
      <td>${user.status}</td>
      <td>${user.email}</td>
      <td>
          <a href="#" class="block">block</a>
          <a href="#" class="unblock">unblock</a>
      </td>
    `;
    userListElement.appendChild(tr);
  });

  renderPagination(totalPages);
};

let renderPagination = (totalPages) => {
  let pagesContainer = document.querySelector(".pages");
  pagesContainer.innerHTML = "";

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    let span = document.createElement("span");
    span.innerText = i;

    if (i === currentPage) {
      span.classList.add("active");
    }

    span.addEventListener("click", () => {
      currentPage = i;
      renderUsers();
    });

    pagesContainer.appendChild(span);
  }

  updateButtons(totalPages);
};

let prevBtn = document.querySelector(".pagination button:first-child");
let nextBtn = document.querySelector(".pagination button:last-child");

let updateButtons = (totalPages) => {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
};

searchInput.addEventListener("input", () => {
  searchQuery = searchInput.value.trim();
  currentPage = 1;
  renderUsers();
});

sortSelect.addEventListener("change", () => {
  sortOrder = sortSelect.value;
  currentPage = 1;
  renderUsers();
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderUsers();
  }
});

nextBtn.addEventListener("click", () => {
  let totalPages = Math.ceil(getFilteredUsers().length / itemsPerPage) || 1;

  if (currentPage < totalPages) {
    currentPage++;
    renderUsers();
  }
});
renderUsers();

let buttonLogoutElement = document.getElementById("logout");
buttonLogoutElement.addEventListener("click",() => {
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
});

let buttonManagerUserElement = document.getElementById("manager-user");

buttonManagerUserElement.addEventListener("click", () => {
  window.location.href = "user_manager.html";
});

let buttonManagerEntriesElement = document.getElementById("manager-entries");

buttonManagerEntriesElement.addEventListener("click", () => {
  window.location.href = "entries_manager.html";
});

let buttonManagerArticlesElement = document.getElementById("manager-articles");

buttonManagerArticlesElement.addEventListener("click", () => {
  window.location.href = "article_manager.html";
});

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
                        <li class="logout" id="logout1">Log out</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}
renderHeader();

let logout1Element = document.getElementById("logout1");
logout1Element.addEventListener("click",() => {
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
});

let avatarBox = document.getElementById("avatarBox");
let dropdown = document.getElementById("dropdown");

avatarBox.addEventListener("click",  (e) => {
    dropdown.classList.toggle("show");
    e.stopPropagation(); 
});

document.addEventListener("click",  () => {
    dropdown.classList.remove("show");
});

let viewProfileElement = document.getElementById("view-profile");
let updateProfilePictureElement = document.getElementById("update-profile-picture");
let changePasswordElement = document.getElementById("change-password");

viewProfileElement.addEventListener("click",() => {
    let timerInterval;
    Swal.fire({
    title: "Đang chuyển trang!",
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
    window.location.href = "../HTML/profile_user.html";
    });
});

updateProfilePictureElement.addEventListener("click",() => {
    let timerInterval;
    Swal.fire({
    title: "Đang chuyển trang!",
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
    window.location.href = "../HTML/profile_user.html";
    });
});

changePasswordElement.addEventListener("click",() => {
    let timerInterval;
    Swal.fire({
    title: "Đang chuyển trang!",
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
    window.location.href = "../HTML/profile_user.html";
    });
});