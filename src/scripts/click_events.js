//private
let goToTopButton = $('#c-go-top');
let goToTop = (event)=> {
  event.preventDefault();
  $('html, body').animate({
      scrollTop: 0
  }, 500);
}

export let attachClickEvents = () => {
  goToTopButton.on('click', goToTop);
}
