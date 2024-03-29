


class Modal {
  constructor(selector) {
    this.menu = document.querySelector(selector);
  }

    open() {
      this.menu.classList.add('fullscreen-menu--opened');
    }

    close() {
      this.menu.classList.remove('fullscreen-menu--opened');
    }

    setEventListener(){
      document.addEventListener('click', (e) => {
        const targetButtonEvent = e.target.closest('[data-event]');
        if(targetButtonEvent) {
          e.preventDefault();
          const event = targetButtonEvent.dataset.event;
          this[event]();
        }
      })
    }

  }

const menu = new Modal('#full-menu');
menu.setEventListener();



const initial_number_slide = 1;
class Slider {
  constructor (selector, settings = {}) {
    this.slider = document.querySelector(selector);
    this.current = initial_number_slide;
    this.slideCount = this.slider.children.length;
    this.settings = settings;
  }

  next () {
    if(this.current < this.slideCount) {
        this.current++;
    } else {
      this.current = initial_number_slide;
    }

    this.translate ();
  }

  prev () {
    if(this.current > 1) {
        this.current--;
    } else {
      this.current = this.slideCount;
    }

    this.translate ();
  }

  translate() {
    this.slider.style.transform = `translateX(-${(this.current - 1) * 100 }%)`;

  }

  setEventListener(){
    const buttonSlideRight = document.querySelector('.products__slide-arrow--right');
    const buttonSlideLeft = document.querySelector('.products__slide-arrow--left');
    
    buttonSlideRight.addEventListener('click', () => {
      this.next ();
    });

    buttonSlideLeft.addEventListener('click', () => {
      this.prev ();
    });
  }

  init() {
    if(this.settings.transition) {
        this.slider.style.transition = `${this.settings.transition}ms`
    }

    if(this.settings.auto) {
      setInterval(()=>{
          this.next()
      }, this.settings.autoInterval)
    }

    this.setEventListener();
  }

}

const slider = new Slider('#slider', {
    transition: 1000,
    auto: true,
    autoInterval: 10000
});

slider.init();

console.log(slider) 

