
    // Khởi tạo TonConnectUI
    const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://bmasshd.click/tonconnect-manifest.json',
        buttonRootId: 'ton-connect' // Nút kết nối sẽ hiển thị tại đây
    });

    // Cấu hình thêm tuỳ chọn nếu cần
    tonConnectUI.uiOptions = {
        twaReturnUrl: 'https://t.me/bmassk3_bot/BmassK3'
    };

    // Hàm kết nối với ví
    async function connectToWallet() {
        try {
            const connectedWallet = await tonConnectUI.connectWallet();
            console.log("Connected Wallet:", connectedWallet);

            // Hiển thị thông tin ví
            document.getElementById('wallet-info').style.display = 'block';
            document.getElementById('balance').innerText = `Số dư: Đang tải...`;

            // Lấy số dư và cập nhật giao diện
            const address = connectedWallet.account.address;
            const balance = await tonConnectUI.getBalance(address); // Dùng API để lấy số dư thật
            document.getElementById('balance').innerText = `Số dư: ${balance} TON`;
        } catch (error) {
            console.error("Lỗi khi kết nối ví:", error);
        }
    }

    // Hàm ngắt kết nối ví
    async function disconnectWallet() {
        try {
            await tonConnectUI.disconnect();
            document.getElementById('wallet-info').style.display = 'none';
            console.log("Đã ngắt kết nối ví.");
        } catch (error) {
            console.error("Lỗi khi ngắt kết nối ví:", error);
        }
    }





    // Lấy số dư BMC từ localStorage hoặc mặc định là 0
    let balance = localStorage.getItem('bmcBalance') ? parseInt(localStorage.getItem('bmcBalance')) : 0;

    // Hiển thị số dư trên trang
    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = `${balance} $BMC `;

    // Gọi hàm kết nối khi tải trang
    connectToWallet();

    // Payload giao dịch
    const transaction = {
        valid_until: Math.floor(Date.now() / 1000) + 3600, // Expiration time (1 hour)
        messages: [
            {
                address: "UQDu8vyZSZbAYvRRQ_jW4_0EiBGibAGq72wSZjYWRmNAGhRD", // Thay thế bằng địa chỉ đích
                amount: "100000", // 0.02 TON in nanotons
                text: "claim_BMCoin",
            }
        ]
    };

    // Xử lý gửi giao dịch
    document.getElementById('send-now').addEventListener('click', async () => {
        try {
            // Disable button và thay đổi trạng thái thành Sending...
            const sendNowBtn = document.getElementById('send-now');
            sendNowBtn.disabled = true;
            sendNowBtn.innerHTML = '<div class="spinner"></div><span> Sending...</span>';

            // Gửi giao dịch
            await tonConnectUI.sendTransaction(transaction);

            // Nếu giao dịch thành công, cập nhật trạng thái và cộng 1000 BMC
            sendNowBtn.innerHTML = '<span>Done</span>';
            sendNowBtn.disabled = true;
            
            // Cộng 1000 BMC
            balance += 1000000000;

            // Lưu số dư mới vào localStorage
            localStorage.setItem('bmcBalance', balance);

            // Cập nhật hiển thị số dư trên trang
            balanceElement.textContent = `${balance} $BMC`;

            console.log("Transaction sent successfully:", transaction);
        } catch (error) {
            console.error("Error sending message:", error);
            const sendNowBtn = document.getElementById('send-now');
            sendNowBtn.innerHTML = '<span>Trade again</span>';
            sendNowBtn.disabled = false; // Cho phép người dùng gửi lại giao dịch nếu có lỗi
        }
    });

    // Hàm giả lập connectToWallet (cần thay bằng hàm kết nối thực tế)
    function connectToWallet() {
        console.log("Đã kết nối ví thành công!");
    }

    // Kiểm tra và lấy thông tin từ Telegram WebApp API
    window.addEventListener('load', () => {
        if (window.Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe) {
            let user = Telegram.WebApp.initDataUnsafe.user;

            if (user) {
                let userName = user.first_name + " " + (user.last_name || "");
                let username = user.username || "No Username"; // Thay thế nếu không có username

                // Cập nhật thông tin vào HTML
                document.getElementById('user-name').textContent = userName;
                document.getElementById('user-username').textContent = `@${username}`;
                
            } else {
                console.log("Không có thông tin người dùng.");
            }
        } else {
            console.error("Telegram WebApp API không khả dụng hoặc không có thông tin người dùng.");
        }
    });





    window.addEventListener('load', () => {
    if (window.Telegram && Telegram.WebApp && Telegram.WebApp.initDataUnsafe) {
        // Lấy thông tin từ Telegram WebApp
        const user = Telegram.WebApp.initDataUnsafe.user;

        if (user) {
            const username = user.username || 'default'; // Sử dụng 'default' nếu không có username
            const avatarUrl = `https://t.me/i/userpic/160/${username}.jpg`;

            // Hiển thị username và ảnh đại diện
            document.getElementById('user-username').innerText = `@${username}`;
            document.getElementById('user-avatar').src = avatarUrl;

            console.log("Thông tin người dùng:", user);
        } else {
            console.warn("Không tìm thấy thông tin người dùng.");
        }
    } else {
        console.warn("Telegram WebApp API không khả dụng.");
    }
});






// Hàm cập nhật thanh tiến trình và thời gian đếm ngược
function updateCountdown() {
    var countDownDate = new Date("January 31, 2025 23:59:59").getTime();  // Đặt ngày kết thúc
    var startDate = new Date();  // Ngày bắt đầu (hiện tại)

    // Tính tổng số ngày giữa ngày bắt đầu và ngày kết thúc
    var totalDays = Math.floor((countDownDate - startDate) / (1000 * 60 * 60 * 24));

    var x = setInterval(function() {
        var now = new Date().getTime();  // Lấy thời gian hiện tại
        var distance = countDownDate - now;  // Tính thời gian còn lại

        // Tính toán số ngày còn lại
        var daysRemaining = Math.floor(distance / (1000 * 60 * 60 * 24));

        // Cập nhật thông điệp
        document.getElementById("countdown-message").innerHTML =
            "Time left: " + daysRemaining + " Days";

        // Tính toán và cập nhật chiều rộng của thanh tiến trình
        var progress = ((totalDays - daysRemaining) / totalDays) * 100;
        document.getElementById("countdown-progress").style.width = progress + "%";

        // Nếu thời gian hết, dừng đếm và thay đổi thông điệp
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown-message").innerHTML = "BMC đã được niêm yết!";
        }
    }, 1000);  // Cập nhật mỗi giây
}

// Bắt đầu đếm ngược khi trang tải
updateCountdown();
