window.addEventListener('DOMContentLoaded', () => {
    // option は使い回すので別に書く
    const options = {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      spaceBetween: 30,
      slidesPerView: "auto",
    }
    const breakPoint = 768;
    let swiper;
    if ( window.innerWidth <= breakPoint ) {
      swiper = new Swiper('.swiper', option);
    } else {
      swiper = undefined;
    }
    window.addEventListener('resize', () => {
      if ( window.innerWidth <= breakPoint ) {
        if( swiper ) return;
        swiper = new Swiper('.swiper', option);
      } else {
        if( !swiper ) return;
        swiper.destroy();
        swiper = undefined;
      }
    }, false);
  }, false);