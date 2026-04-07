let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){
    window.location.href = "../HTML/login.html";
}

let data = JSON.parse(localStorage.getItem("articles"));

if(data){
    articles = data;
}
console.log(articles);

let postList = document.getElementById("post-list");
let newArticles = [];
let checkUserId = (userId) => {
    newArticles = articles.filter(article => article.userId == userId);
    console.log(newArticles);
};
checkUserId(currentUser.id);

let categoriesElement = document.getElementById("categories");
let categories = JSON.parse(localStorage.getItem("categories"));
console.log(categories);

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

let renderArticles = (articles) => {
    postList.innerHTML = "";

    if (articles.length === 0) {
        postList.innerHTML = "<p>Không có bài viết</p>";
        return;
    }

    articles.forEach(article => {
        let div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${article.image}" alt="">
            <div>
                <p class="date">Date: ${article.date}</p>

            <div class="see-details">
                <h2>${article.title}</h2>
                <button onclick="seeDetailArticle(${article.id})" ><img src="../assets/icons/arrow-up-right.png" alt=""></button>
            </div>

                <p class="description">${article.content}</p>

            <div class="btn-of-card">
                <button class="btn-name-card">${article.entries}</button>
                <button class="btn-edit">Edit your post</button>
                </div>
            </div>
        `;

        postList.appendChild(div);
    });
}

renderArticles(articles);

let filterByCategory = (categoryName) => {
    let filteredarticles = articles.filter(article => article.entries === categoryName);
    renderArticles(filteredarticles);
}

let renderCategories = () => {
    if(!categories) return;

    categories.forEach((category) => {
        let span = document.createElement("span");
        span.innerText = category.category;

        span.addEventListener("click",() => {
            filterByCategory(category.category);
        });

        categoriesElement.appendChild(span);
    });
}
renderCategories();

let allMyPostElement = document.getElementById("all-my-post");
let allBlogPostElement = document.getElementById("all-blog-post");

allBlogPostElement.addEventListener("click", () => {
    renderArticles(articles);
    });

allMyPostElement.addEventListener("click", () => {
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
    window.location.href = "total_articles.html";
    });
});

let seeDetailArticle = (id) => {
    let currentArticle = articles.find(article => article.id == id);

    localStorage.setItem("currentArticle", JSON.stringify(currentArticle));

    window.location.href = "../HTML/article_details.html";
};

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

let recentContainer = document.getElementById("recent-posts");

let renderRecentPosts = () => {
    if (!articles || articles.length === 0) {
        recentContainer.innerHTML = "<p>Không có bài viết</p>";
        return;
    }

    let sorted = [...articles].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    let recentPosts = sorted.slice(0, 3);

    let firstPost = recentPosts[0];

    let html = `
        <div class="recent-left">
            <img src="${firstPost.image}">
            <span class="date">Date: ${firstPost.date}</span>
            <h2>${firstPost.title}</h2>
            <p>${firstPost.content}</p>
            <span class="tag">${firstPost.entries}</span>
        </div>

        <div class="recent-right">
    `;

    for (let i = 1; i < recentPosts.length; i++) {
        let post = recentPosts[i];

        html += `
            <div class="recent-item">
                <img src="${post.image}">
                <div>
                    <span class="date">Date: ${post.date}</span>
                    <h4>${post.title}</h4>
                    <p>${post.content}</p>
                    <span class="tag">${post.entries}</span>
                </div>
            </div>
        `;
    }

    html += `</div>`;

    recentContainer.innerHTML = html;
};

renderRecentPosts();