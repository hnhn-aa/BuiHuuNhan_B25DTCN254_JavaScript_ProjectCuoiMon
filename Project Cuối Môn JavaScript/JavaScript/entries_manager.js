let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){
  window.location.href = "../HTML/login.html";
}

let categories = [
  {
    id: 1,
    category: "Daily Journal",
  },
  {
    id: 2,
    category: "Work & Career",
  },
  {
    id: 3,
    category: "Personal Thoughts",
  },
  {
    id: 4,
    category: "Emotions & Feelings",
  },
  {
    id: 5,
    category: "Technology",
  },
  {
    id: 6,
    category: "Lifestyle",
  }
];
saveData = () => {
  localStorage.setItem("categories", JSON.stringify(categories));
};

let getData = () => {
  let data = JSON.parse(localStorage.getItem("categories"));
  if (data) {
    categories = data;
  }
};

let initData = () => {
  let data = localStorage.getItem("categories");

  if (!data) {
      localStorage.setItem("categories", JSON.stringify(categories));
  } else {
      categories = JSON.parse(data);
  }
}
initData();
let tbodyElement = document.getElementById("tbody");
let inputAddCategoryElement = document.getElementById("input-add");
let buttonAddCategoryElement = document.getElementById("add-category");
let buttonUpdateCategoryElement = document.getElementById("update-category");

let renderCategories = () => {
  tbodyElement.innerHTML = "";

  categories.forEach((item, index) => {
    let tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.category}</td>
      <td>
        <button onclick="editCategory(${item.id})" class="btn-fix-category">Edit</button>
        <button onclick="deleteCategory(${item.id})" class = "btn-delete-category">Delete</button>
      </td>
    `;

    tbodyElement.appendChild(tr);
  });
};

renderCategories();

let addNewCategory = () => {
  let value = inputAddCategoryElement.value.trim();

  if (value === "") {
    Swal.fire({
    icon: "error",
    title: "Lỗiii...",
    text: "Category không được để trống",
    });
    return;
  }
  let newCategory = {
    id: Date.now(),
    category: value,
  }

  categories.push(newCategory);
  saveData();
  renderCategories();

  inputAddCategoryElement.value = "";
  Swal.fire({
    title: "Đã thêm thành công!",
    icon: "success",
    draggable: true
  });
}

buttonAddCategoryElement.addEventListener("click",addNewCategory);
inputAddCategoryElement.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addNewCategory();
  }
});

let deleteCategory = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed){ 
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      categories = categories.filter(item => item.id !== id);
      saveData();
      renderCategories();
    }
  });
}

let categoryIndex;

let editCategory = (id) => {
  categoryIndex = categories.findIndex(
    category => category.id === id
  );
  inputAddCategoryElement.value = categories[categoryIndex].category;
  buttonUpdateCategoryElement.style.display = "inline";
  buttonAddCategoryElement.style.display = "none";
};
buttonUpdateCategoryElement.addEventListener("click", () => {
  categories[categoryIndex].category = inputAddCategoryElement.value.trim();
  saveData();
  renderCategories();
  Swal.fire({
    title: "Good job!",
    text: "Cập nhật thành công",
    icon: "success"
  });
  inputAddCategoryElement.value = "";
  buttonUpdateCategoryElement.style.display = "none";
  buttonAddCategoryElement.style.display = "inline";
});


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
