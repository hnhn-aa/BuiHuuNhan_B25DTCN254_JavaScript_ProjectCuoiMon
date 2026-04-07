let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){
  window.location.href = "../HTML/login.html";
}

let data = JSON.parse(localStorage.getItem("articles"));
let container = document.getElementById("post-list");

if(data){
  articles = data;
}

let saveData = () => {
  localStorage.setItem("articles", JSON.stringify(articles));
};

let checkUserId = (userId) => {
  articles = articles.filter(article => article.userId == userId);
  console.log(articles);
};
checkUserId(currentUser.id);

let renderArticle = () => {
  container.innerHTML = "";

  articles.forEach(article => {
    let div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <img src="${article.image}" alt="">
      <div>
        <p class="date">Date: ${article.date}</p>

        <div class="see-details">
          <h2>${article.title}</h2>
          <button class="button-see-detail" onclick="seeDetailArticle(${article.id})" ><img src="../assets/icons/arrow-up-right.png" alt=""></button>
        </div>

        <p class="description">${article.content}</p>

        <div class="btn-of-card">
          <button class="btn-name-card">${article.entries}</button>
          <button class="btn-edit">Edit your article</button>
        </div>
      </div>
    `;

    container.appendChild(div);
  });
};

renderArticle();

let seeDetailArticle = (id) => {
  let currentArticle = articles.find(article => article.id == id);

  localStorage.setItem("currentArticle", JSON.stringify(currentArticle));

  window.location.href = "../HTML/article_details.html";
};

let containerElement = document.getElementById("container");
let titleAddElement = document.getElementById("title-add");
let buttonCloseElement = document.getElementById("btnClose");

titleAddElement.addEventListener("click",() => {
  containerElement.style.display = "flex";
});

buttonCloseElement.addEventListener("click",() => {
  containerElement.style.display = "none";
});

let titleElement = document.getElementById("title");
let moodElement = document.getElementById("mood");
let contentElement = document.getElementById("content");
let statusElement = document.getElementById("status");
let fileElement = document.getElementById("file");
let buttonAddArticle = document.getElementById("btn-add-article");
let entriesElement = document.getElementById("entries");

let addNewArticle = (e) => {
  e.preventDefault();
  let newTitle = titleElement.value;
  let newEntries = entriesElement.value;
  let newMood = moodElement.value;
  let newContent = contentElement.value;
  let newStatus = document.querySelector('input[name="status"]:checked')?.value;
  let file = fileElement.files[0];

  if (newTitle === null || newTitle.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi...",
      text: "Chủ đề không được để trống",
    });
    return;
  }

  if (newEntries === null || newEntries.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi...",
      text: "Tiêu đề không được để trống",
    });
    return;
  }

  if (newContent === null || newContent.trim() === "") {
    Swal.fire({
      icon: "error",
      title: "Lỗi...",
      text: "Nội dung không được để trống",
    });
    return;
  }

  if (!newStatus) {
    Swal.fire({
      icon: "error",
      title: "Lỗi...",
      text: "Trạng thái cần được chọn",
    });
    return;
  }

  if (!file) {
    Swal.fire({
      icon: "error",
      title: "Lỗi...",
      text: "File cần được upload",
    });
    return;
  }

  let reader = new FileReader();

  reader.onload = (e) => {

  let newArticle = {
    id: Date.now(),
    userId: currentUser.id,
    title: newTitle,
    entries: newEntries,
    content: newContent,
    mood: newMood,
    status: newStatus,
    image: e.target.result,
    date: new Date().toISOString().split('T')[0]
  }

  articles.push(newArticle);
  
  saveData();
  renderArticle();
  Swal.fire({
    title: "Thêm bài viết thành công!",
    icon: "success",
    draggable: true
  });

  document.getElementById("articleForm").reset();
  };
  reader.readAsDataURL(file);
}

buttonAddArticle.addEventListener("click",addNewArticle);

let categories = JSON.parse(localStorage.getItem("categories"));
console.log(categories);

let renderEntries = () => {
  categories.forEach((category) => {
    let option = document.createElement("option");
    option.textContent = `
    ${category.category}
  `;
  option.value = `${category.category}`;
  entriesElement.appendChild(option);
  });
}

renderEntries();

const avatarBox = document.getElementById("avatarBox");
const dropdown = document.getElementById("dropdown");

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

let logoElement = document.getElementById("logo");

logoElement.addEventListener("click",() => {
    window.location.href = "../HTML/dashboard.html";
});
