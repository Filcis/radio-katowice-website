"use strict";!function(e){/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||e("#player-main-call-to-action").click(function(e){return e.preventDefault(),window.open(this.href,"RK_Player","width=360,height=680"),console.log("player popup"),!1}),e("#stream-dropdown").click(function(t){e(t.currentTarget).toggleClass("is-active"),e(t.currentTarget.dataset.target).slideToggle("slow")}),e(".navbar-burger").click(function(t){e(t.currentTarget).toggleClass("is-active"),console.log(t.currentTarget.dataset),e(t.currentTarget.dataset.target).toggleClass("is-active")});var t=e("a.tab");t.click(function(a){t.each(function(t,a){e(a).parent().removeClass("is-active"),e(a.dataset.target).removeClass("is-active")}),e(a.currentTarget.dataset.target).addClass("is-active"),e(a.currentTarget).parent().addClass("is-active")});var a=e(".video-carousel"),r=a.children(),n=function(e){return e.next().length>0?e.next():r.first()},i=function(e){return e.prev().length>0?e.prev():r.last()};e(".carousel-toggle").on("click",function(t){var a=e(".is-ref");if("next"===e(t.currentTarget).data("toggle")){n(a)}else{i(a)}})}(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIiQiLCJ0ZXN0IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiY2xpY2siLCJlIiwicHJldmVudERlZmF1bHQiLCJ3aW5kb3ciLCJvcGVuIiwidGhpcyIsImhyZWYiLCJjb25zb2xlIiwibG9nIiwiY3VycmVudFRhcmdldCIsInRvZ2dsZUNsYXNzIiwiZGF0YXNldCIsInRhcmdldCIsInNsaWRlVG9nZ2xlIiwidGFicyIsImVhY2giLCJpIiwicGFyZW50IiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsImNhcm91c2VsIiwiY2Fyb3VzZWxJdGVtcyIsImNoaWxkcmVuIiwibmV4dEl0ZW0iLCJlbCIsIm5leHQiLCJsZW5ndGgiLCJmaXJzdCIsInByZXZJdGVtIiwicHJldiIsImxhc3QiLCJvbiIsImRhdGEiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiJBQUFBLGNBTUEsU0FBQUEsR0FDQSxpRUFBQUMsS0FBQUMsVUFBQUMsWUFDQUgsRUFBQSwrQkFBQUksTUFBQSxTQUFBQyxHQUlBLE1BSEFBLEdBQUFDLGlCQUNBQyxPQUFBQyxLQUFBQyxLQUFBQyxLQUFBLFlBQUEsd0JBQ0FDLFFBQUFDLElBQUEsaUJBQ0EsSUFJQVosRUFBQSxvQkFDQUksTUFBQSxTQUFBQyxHQUNBTCxFQUFBSyxFQUFBUSxlQUFBQyxZQUFBLGFBQ0FkLEVBQUFLLEVBQUFRLGNBQUFFLFFBQUFDLFFBQUFDLFlBQUEsVUFHQWpCLEVBQUEsa0JBQ0FJLE1BQUEsU0FBQUMsR0FDQUwsRUFBQUssRUFBQVEsZUFBQUMsWUFBQSxhQUNBSCxRQUFBQyxJQUFBUCxFQUFBUSxjQUFBRSxTQUNBZixFQUFBSyxFQUFBUSxjQUFBRSxRQUFBQyxRQUFBRixZQUFBLGNBR0EsSUFBQUksR0FBQWxCLEVBQUEsUUFDQWtCLEdBQUFkLE1BQUEsU0FBQUMsR0FDQWEsRUFBQUMsS0FBQSxTQUFBQyxFQUFBZixHQUNBTCxFQUFBSyxHQUFBZ0IsU0FBQUMsWUFBQSxhQUNBdEIsRUFBQUssRUFBQVUsUUFBQUMsUUFBQU0sWUFBQSxlQUVBdEIsRUFBQUssRUFBQVEsY0FBQUUsUUFBQUMsUUFBQU8sU0FBQSxhQUNBdkIsRUFBQUssRUFBQVEsZUFBQVEsU0FBQUUsU0FBQSxjQUdBLElBQUFDLEdBQUF4QixFQUFBLG1CQUNBeUIsRUFBQUQsRUFBQUUsV0FFQUMsRUFBQSxTQUFBQyxHQUFBLE1BQUFBLEdBQUFDLE9BQUFDLE9BQUEsRUFBQUYsRUFBQUMsT0FBQUosRUFBQU0sU0FDQUMsRUFBQSxTQUFBSixHQUFBLE1BQUFBLEdBQUFLLE9BQUFILE9BQUEsRUFBQUYsRUFBQUssT0FBQVIsRUFBQVMsT0FFQWxDLEdBQUEsb0JBQUFtQyxHQUFBLFFBQUEsU0FBQTlCLEdBQ0EsR0FBQXVCLEdBQUE1QixFQUFBLFVBQ0EsSUFBQSxTQUFBQSxFQUFBSyxFQUFBUSxlQUFBdUIsS0FBQSxVQUNBLENBQUFULEVBQUFDLE9BRUEsQ0FBQUksRUFBQUosT0FJQVMiLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyBUT0RPOiBPcmdhbml6ZSBjb2RlIGFzIGRpZmZlcmVudCBtb2R1bGVzLCBjcmVhdGUgbmFtZXNwYWNlcyBmb3IgZGlmZmVyZW50IGZ1bmN0aW9uYWxpdGllc1xuLy8gbm8gbmVlZCBmb3IgZG9jdW1lbnQucmVhZHlcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuKGZ1bmN0aW9uKCQpIHtcbiAgICBpZiAoIS9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8QmxhY2tCZXJyeXxJRU1vYmlsZXxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICAkKCcjcGxheWVyLW1haW4tY2FsbC10by1hY3Rpb24nKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB3aW5kb3cub3Blbih0aGlzLmhyZWYsIFwiUktfUGxheWVyXCIsIFwid2lkdGg9MzYwLGhlaWdodD02ODBcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncGxheWVyIHBvcHVwJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGRyb3Bkb3duID0gJCgnI3N0cmVhbS1kcm9wZG93bicpO1xuICAgIGRyb3Bkb3duLmNsaWNrKChlKSA9PiB7XG4gICAgICAgICQoZS5jdXJyZW50VGFyZ2V0KS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XG4gICAgICAgICQoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudGFyZ2V0KS5zbGlkZVRvZ2dsZShcInNsb3dcIik7XG4gICAgfSk7XG4gICAgLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIGNvbnN0IG5hdmJhckJ1cmdlcnMgPSAkKCcubmF2YmFyLWJ1cmdlcicpO1xuICAgIG5hdmJhckJ1cmdlcnMuY2xpY2soKGUpID0+IHtcbiAgICAgICAgJChlLmN1cnJlbnRUYXJnZXQpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQpO1xuICAgICAgICAkKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnRhcmdldCkudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgIH0pO1xuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBjb25zdCB0YWJzID0gJCgnYS50YWInKTtcbiAgICB0YWJzLmNsaWNrKChlKSA9PiB7XG4gICAgICAgIHRhYnMuZWFjaCgoaSwgZSkgPT4ge1xuICAgICAgICAgICAgJChlKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJylcbiAgICAgICAgICAgICQoZS5kYXRhc2V0LnRhcmdldCkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9KTtcbiAgICAgICAgJChlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50YXJnZXQpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgJChlLmN1cnJlbnRUYXJnZXQpLnBhcmVudCgpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICB9KTtcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgY29uc3QgY2Fyb3VzZWwgPSAkKCcudmlkZW8tY2Fyb3VzZWwnKTtcbiAgICBjb25zdCBjYXJvdXNlbEl0ZW1zID0gY2Fyb3VzZWwuY2hpbGRyZW4oKTtcblxuICAgIHZhciBuZXh0SXRlbSA9IChlbCkgPT4gZWwubmV4dCgpLmxlbmd0aCA+IDAgPyBlbC5uZXh0KCkgOiBjYXJvdXNlbEl0ZW1zLmZpcnN0KCk7XG4gICAgdmFyIHByZXZJdGVtID0gKGVsKSA9PiBlbC5wcmV2KCkubGVuZ3RoID4gMCA/IGVsLnByZXYoKSA6IGNhcm91c2VsSXRlbXMubGFzdCgpO1xuXG4gICAgJCgnLmNhcm91c2VsLXRvZ2dsZScpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIHZhciBlbCA9ICQoJy5pcy1yZWYnKTtcbiAgICAgICAgaWYgKCQoZS5jdXJyZW50VGFyZ2V0KS5kYXRhKCd0b2dnbGUnKSA9PT0gJ25leHQnKSB7XG4gICAgICAgICAgICB2YXIgbmV3SXRlbSA9IG5leHRJdGVtKGVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBuZXdJdGVtID0gcHJldkl0ZW0oZWwpO1xuICAgICAgICB9XG4gICAgfSlcblxufSkoalF1ZXJ5KTtcbiJdfQ==
