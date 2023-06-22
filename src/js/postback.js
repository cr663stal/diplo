const chatId = '443339961';

async function errorToast(text) {
    Toastify({
        text: text,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        style: {
            background: "#f25a5a",
        },
        stopOnFocus: true,
        onClick: function () {
        }
    }).showToast();
}

document.getElementById("myForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const number = document.getElementById("phoneNumber").value;
    const message = document.getElementById("message").value;
    const fileInput = document.getElementById("formImage");
    const file = fileInput.files[0];
    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    let botToken = '6076605432:AAHeYViOu1C3u8XsmG_FJvisAL6RsdD03Mw';

    const sendMessageUrl = "https://api.telegram.org/bot" + botToken + "/sendMessage";

    let messageData = {
        chat_id: chatId,
        text: `Новая заявка 🪙
    👤 Имя: ${name}
    ☎️ Номер телефона: ${number}
    📧 Почта: ${email}
    📄 Сообщение: ${message}
    📁 Файл: 👇🏻`
    };


    fetch(sendMessageUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                let fileInput = document.getElementById("formImage");
                let file = fileInput.files[0];

                const sendDocumentUrl = "https://api.telegram.org/bot" + botToken + "/sendDocument";

                let formData = new FormData();
                formData.append("chat_id", chatId);
                formData.append("document", file);

                fetch(sendDocumentUrl, {
                    method: "POST",
                    body: formData
                })
                    .then(response => {
                        if (response.ok) {
                            Toastify({
                                text: "Заявка успешно отправлена",
                                duration: 3000,
                                newWindow: true,
                                close: true,
                                gravity: "top",
                                position: "center",
                                stopOnFocus: true,
                                onClick: function () {
                                }
                            }).showToast();
                            document.getElementById("name").value = "";
                            document.getElementById("email").value = "";
                            document.getElementById("message").value = "";
                            document.getElementById("formImage").value = null;
                            document.getElementById("phoneNumber").value = null;
                        } else {
                            errorToast('Ошибка при отправке')
                        }
                    })
                    .catch(error => {
                        errorToast('Ошибка при отправке')
                    });
            } else {
                errorToast('Ошибка при отправке')
            }
        })
        .catch(error => {
            errorToast('Ошибка при отправке')
        });
});
