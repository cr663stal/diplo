window.onscroll = function showHeader() {
    var header = document.querySelector('.header-hidden');
    if(window.pageYOffset > 650){
        header.classList.add('header-fixed');
    } else{
        header.classList.remove('header-fixed');
    }
}