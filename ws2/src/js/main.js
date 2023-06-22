// фиксированная шапка
window.onscroll = function showHeader() {
    var header = document.querySelector('.header');
    if(window.pageYOffset > 650){
        header.classList.add('header-fixed');
    } else{
        header.classList.remove('header-fixed');
    }
}

// Ввод только букв в строке имени
$('body').on('input', '.input-name', function(){
	this.value = this.value.replace(/[^a-zа-яё\1s]/gi, '');
});
// Ввод только чисел в графе номера
$('body').on('input', '.input-number-phone', function(){
	this.value = this.value.replace(/[^0-9]/g, '');
});
// Проверка на соответствие email'а
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}

// Валидация формы
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-action');
    form.addEventListener('submit', formSend);
    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
        let formData = new FormData(form);
        FormData.append('image', formImage.files[0]);
        if (error === 0) {
            alert('Заявка отправлена!');
        } else {
            alert('Заполните необходимые поля!');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');
        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);
            if (input.classList.contains('input-email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
  
    // Получаем input file в переменную
    const formImage = document.getElementById('formImage');

    //Получаем див для превью в переменную
    const formPreview = document.getElementById('formPreview');

    //Изменения в input file
    formImage.addEventListener('change', () => {
        uploadFile(formImage.files[0]);
    });
    
    //Проверка на размер файла
    function uploadFile(file) {
        if (file.size > 50 * 1024 * 1024) {
            alert('Файл должен весить менее 50 МБ.');
            return;
        }
    }
});