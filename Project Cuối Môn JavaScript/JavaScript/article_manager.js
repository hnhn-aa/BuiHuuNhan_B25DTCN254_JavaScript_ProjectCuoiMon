let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){
  window.location.href = "../HTML/login.html";
}
let articles = [
    {
      id: 1,
      userId: 3,
      title: "A Productive Day at Work",
      entries: "Daily Journal",
      content: "Today was a really productive day at work. I managed to finish a report ahead of schedule and received positive feedback from my manager.",
      image: "../assets/images/entries_manager/image1.jpg",
      date: "2025-02-25",
      author: "system",
      mood: "🙂 Happy",
      status: "public"
    },
    {
      id: 2,
      userId: 3,
      title: "My First Job Interview Experience",
      entries: "Work & Career",
      content: "I had my first job interview today! I was nervous at first, but as the conversation went on, I felt more confident. ",
      image: "../assets/images/entries_manager/image2.jpg",
      date: "2025-02-24",
      author: "system",
      mood: "🙂 Happy",
      status: "public"
    },
    {
      id: 3,
      userId: 3,
      title: "Overthinking Everything",
      entries: "Personal Thoughts",
      content: "Lately, I have been overthinking everything, from small decisions to bigger life choices. I know I should trust myself.",
      image: "../assets/images/entries_manager/image3.jpg",
      date: "2025-02-23",
      author: "system",
      mood: "🙂 Happy",
      status: "private"
    },
    {
      id: 4,
      userId: 2,
      title: "How collaboration makes us better designers",
      entries: "Work & Career",
      content: "Collaboration can make our teams stronger, and our individual designs better.",
      image: "../assets/images/entries_manager/image4.jpg",
      date: "2025-02-16",
      author: "system",
      mood: "🙂 Happy",
      status: "private"
    },
    {
      id: 5,
      userId: 2,
      title: "Podcast: Creating a better CX Community",
      entries: "Emotions & Feelings",
      content: "Starting a community doesn’t need to be complicated, but how do you get started?",
      image: "../assets/images/entries_manager/image6.jpg",
      date: "2025-02-05",
      author: "system",
      mood: "🙂 Happy",
      status: "public"
    },
    {
      id: 6,
      userId: 2,
      title: "Our top 10 Javascript frameworks to use",
      entries: "Work & Career",
      content: "JavaScript frameworks make development easy with extensive features and functionalities.",
      image: "../assets/images/entries_manager/image5.jpg",
      date: "2025-02-15",
      author: "system",
      mood: "🙂 Happy",
      status: "public"
    }
];

let saveData = () => {
  localStorage.setItem("articles", JSON.stringify(articles));
};

let getData = () => {
  let data = localStorage.getItem("articles");

  if (data === null) {
    localStorage.setItem("articles", JSON.stringify(articles));
  } else {
    articles = JSON.parse(data);
  }
};

let containerElement = document.getElementById("container");
let buttonAddElement = document.getElementById("btnAdd");
let buttonCloseElement = document.getElementById("btnClose");
let articleListElement = document.getElementById("article-list");


getData();

buttonAddElement.addEventListener("click", () => {
  containerElement.style.display = "flex";
});

buttonCloseElement.addEventListener("click", () => {
  containerElement.style.display = "none";
});

let getStatusBadge = (status) => {
  if (status === "public") {
    return `<span class="status public">Public</span>`;
  } else {
    return `<span class="status private">Private</span>`;
  }
};

let changeStatus = (id, value) => {
  let article = articles.find(item => item.id === id);
  article.status = value;
  saveData();
  renderArticle();
};

let getStatusSelect = (status, id) => {
  return `
    <select onclick="event.stopPropagation()" 
            onchange="changeStatus(${id}, this.value)">
      <option value="public" ${status === "public" ? "selected" : ""}>Public</option>
      <option value="private" ${status === "private" ? "selected" : ""}>Private</option>
    </select>
  `;
};

let currentPage = 1;
let itemsPerPage = 2;

let renderArticle = () => {
  articleListElement.innerHTML = "";

  let start = (currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  let paginatedArticles = articles.slice(start, end);

  if (paginatedArticles.length === 0) {
    articleListElement.innerHTML = "<tr><td colspan='7'>Không có dữ liệu</td></tr>";
    return;
  }

  paginatedArticles.forEach((article) => {
    let tr = document.createElement("tr");
    tr.classList.add("article-item");

    tr.addEventListener("click", () => {
      seeArticleDetails(article.id);
    });
    tr.innerHTML = `
      <td><img src="${article.image}" width="80"></td>
      <td>${article.title}</td>
      <td>${article.entries}</td>
      <td>${article.content}</td>
      <td>${getStatusBadge(article.status)}</td>
      <td>${getStatusSelect(article.status, article.id)}</td>
      <td>
        <button onclick="event.stopPropagation(); editArticle(${article.id})" class="btn-fix-article">Sửa</button>
        <button onclick="event.stopPropagation(); deleteArticle(${article.id})" class="btn-delete-article">Xóa</button>
      </td>
    `;

    articleListElement.appendChild(tr);
  });

  renderPagination();
};

let renderPagination = () => {
  let pagesContainer = document.querySelector(".pages");
  pagesContainer.innerHTML = "";
  let totalPages = Math.ceil(articles.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    let span = document.createElement("span");
    span.innerText = i;
    if (i === currentPage) {
      span.classList.add("active");
    }
    span.addEventListener("click", () => {
      currentPage = i;
      renderArticle();
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

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderArticle();
  }
});

nextBtn.addEventListener("click", () => {
  let totalPages = Math.ceil(articles.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderArticle();
  }
});

renderArticle();

let deleteArticle = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {

      articles = articles.filter(article => article.id !== id);
      saveData();
      renderArticle();

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
};

// Sửa bài viết

let articleIndex = -1;

let editArticle = (id) => {
  articleIndex = articles.findIndex(article => article.id === id);

  containerElement.style.display = "flex";

  titleElement.value = articles[articleIndex].title;
  entriesElement.value = articles[articleIndex].entries;
  moodElement.value = articles[articleIndex].mood;
  contentElement.value = articles[articleIndex].content;

  let statusRadio = document.querySelector(
    `input[name="status"][value="${articles[articleIndex].status}"]`
  );
  if (statusRadio) statusRadio.checked = true;

  let titleArticleElement = document.getElementById("Title");

  titleArticleElement.textContent = "📝 Update Article";

  buttonAddArticle.style.display = "none";
  buttonUpdateArticle.style.display = "inline";
};

let buttonUpdateArticle = document.getElementById("btn-update-article");

buttonUpdateArticle.addEventListener("click", (e) => {
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

  articles[articleIndex].title = newTitle;
  articles[articleIndex].entries = newEntries;
  articles[articleIndex].content = newContent;
  articles[articleIndex].mood = newMood;
  articles[articleIndex].status = newStatus;

  if (file) {
    articles[articleIndex].image = URL.createObjectURL(file);
  }

  saveData();
  renderArticle();

  Swal.fire("Good job!", "Cập nhật thành công", "success");

  // reset + đóng form
  document.getElementById("articleForm").reset();
  containerElement.style.display = "none";

  // trả lại trạng thái nút
  buttonUpdateArticle.style.display = "none";
  buttonAddArticle.style.display = "inline";
});

// Thêm bài viết

let titleElement = document.getElementById("title");
let moodElement = document.getElementById("mood");
let contentElement = document.getElementById("content");
let statusElement = document.getElementById("status");
let fileElement = document.getElementById("file");
let buttonAddArticle = document.getElementById("btn-add-article");
let entriesElement = document.getElementById("entries");

let categories = JSON.parse(localStorage.getItem("categories")) || [];

let renderEntries = () => {
  categories.forEach((category) => {
    let option = document.createElement("option");
    option.textContent = category.category;
    option.value = `${category.category}`;
    entriesElement.appendChild(option);
  });
}

renderEntries();

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

let seeArticleDetails = (id) => {
    let currentArticle = articles.find(article => article.id == id);

    localStorage.setItem("currentArticle", JSON.stringify(currentArticle));

    window.location.href = "../HTML/article_details.html";
};