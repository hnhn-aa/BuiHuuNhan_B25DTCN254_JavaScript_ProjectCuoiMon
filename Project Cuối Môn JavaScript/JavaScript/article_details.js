let currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser){
  window.location.href = "../HTML/login.html";
}

let images = [
  "https://tse4.mm.bing.net/th/id/OIP.kie-Vu0MF2bJOZrUL3tkfgHaHa?pid=Api&P=0&h=180",
  "https://tse1.mm.bing.net/th/id/OIP.5wi-9CMJUigDUKCvv56yfQHaHa?pid=Api&P=0&h=180",
  "https://tse2.mm.bing.net/th/id/OIP.KMh7jiRqiGInQryreHc-UwHaHa?pid=Api&P=0&h=180",
  "https://tse2.mm.bing.net/th/id/OIP.pCXuykpgO4g8QkPcrOvw8AHaHa?pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th/id/OIP.KrXo-GOZrmleYXUYObpcPAHaHa?pid=Api&P=0&h=180",
  "https://tse3.mm.bing.net/th/id/OIP.2vL6gfx6B1SpZRCruBvGywHaHa?pid=Api&P=0&h=180",
  "https://tse2.mm.bing.net/th/id/OIP.gIY2zFXyzM6sPatl9Z4GoAHaHa?pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th/id/OIP.f1QxGekvfjcylWtHSOJGiAHaHM?pid=Api&P=0&h=180",
  "https://tse4.mm.bing.net/th/id/OIP.tT7yAFHIAGMN7x-A6bExqQHaHa?pid=Api&P=0&h=180",
  "https://tse3.mm.bing.net/th/id/OIP.vvIB0GulmCzAhUxzlqLERAHaHa?pid=Api&P=0&h=180"
];

let randomImage1 = images[Math.floor(Math.random() * images.length)];
let randomImage2 = images[Math.floor(Math.random() * images.length)];

let texts = [
  "Hôm nay là một ngày tuyệt vời 😄",
  "Cảm thấy hơi mệt nhưng vẫn cố gắng 💪",
  "Không biết nên ăn gì nữa 🤔",
  "Một ngày bận rộn nhưng rất đáng giá 🔥",
  "Chỉ muốn ngủ thêm một chút thôi 😴",
  "Đang học code mà đau đầu quá 🤯",
  "Cuối cùng cũng xong việc rồi 🎉",
  "Thời tiết hôm nay đẹp thật 🌤️",
  "Tự nhiên thấy nhớ ai đó 🥲",
  "Hôm nay làm việc hiệu quả ghê 😎",
  "Mọi thứ đang dần ổn hơn rồi 💖",
  "Chạy deadline mà muốn xỉu luôn 😵",
  "Một ngày chill nhẹ nhàng ☕",
  "Lại một ngày cố gắng hết mình 🚀",
  "Tự thưởng cho bản thân chút gì đó 🍔"
];

let randomText1 = texts[Math.floor(Math.random() * texts.length)];
let randomText2 = texts[Math.floor(Math.random() * texts.length)];

let article = JSON.parse(localStorage.getItem("currentArticle"));

if (!article) {
    window.location.href = "../HTML/dashboard.html";
}

let articleDetailsElement = document.getElementById("article-details");

let like1 = Math.floor(Math.random() * 100);
let comment1 = Math.floor(Math.random() * 50);
let like2 = Math.floor(Math.random() * 100);
let comment2 = Math.floor(Math.random() * 50);

let totalLike = like1 + like2;
let totalComment = comment1 + comment2;

articleDetailsElement.innerHTML = `
<div class="line"></div>
<button class="back-btn" id="btn-back">←</button>

<img src="${article.image}" class="avatar" id="poisition">

<div class="timeline">
    <div class="item-big">
        <div class="content main-post">
            <h3>${article.title}</h3>
            <p>${article.content}</p>

            <div class="actions">
                <span>${totalLike} 👍</span>
                <span>${totalComment} 💬</span>
            </div>
        </div>
    </div>
    <div class="view-comments">
        View all 2 comments ▼
    </div>
    <div class="item">
        <img src="${randomImage1}" class="avatar">
        <div class="content comment">
            <p>${randomText1}</p>
            <div class="actions">
                <span>${like1} Like 👍</span>
                <span>${comment1} Replies 💬</span>
            </div>
        </div>
    </div>
    
    <div class="item">
        <img src="${randomImage2}" class="avatar">
        <div class="content comment">
            <p>${randomText2}</p>
            <div class="actions">
                <span>${like2} Like 👍</span>
                <span>${comment2} Replies 💬</span>
            </div>
        </div>
    </div>
</div>
`;

let buttonBackElement = document.getElementById("btn-back");
buttonBackElement.addEventListener("click", () => {
    localStorage.removeItem("currentArticle");
    window.history.back();
});