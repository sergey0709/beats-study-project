const sections = $("section");
const display = $(".maincontent");
const sideLink = $(".fixed-menu__link");
const sideMenu = $(".fixed-menu__list");
const sideMenuItem = $(".fixed-menu__item")

//подключение библиотеки для работы OPS на мобильном
/* const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile(); */

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = sectionEq => {
  const position = sectionEq * -100;

  if (isNaN(position)) {
    console.error("передано неверное значение в countSectionPosition");
    return 0;
  }

  return position;
}

const changeMenuThemeForSection = sectionEq => {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const clarifiedClass = "fixed-menu__link--clarified";

    if (menuTheme === "clarified") {
      sideLink.addClass(clarifiedClass);
    } else {
      sideLink.removeClass(clarifiedClass);
    }
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = sectionEq => {
  if (inScroll) return;
  
    const transitionOver = 1000;
    const mouseInertiaOver = 300;

    const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);

    display.css({
    transform: `translateY(${position}%)`
    })

    /* sections.eq(sectionEq).addClass("active").siblings().removeClass("active"); */
    resetActiveClassForItem(sections, sectionEq, "active");

    setTimeout(() => {
      inScroll = false;
      resetActiveClassForItem(sideMenuItem, sectionEq, "fixed-menu__item--active");
      /* sideMenu.find(".fixed-menu__item").eq(sectionEq).addClass("fixed-menu__item--active").siblings().removeClass("fixed-menu__item--active"); */
    }, mouseInertiaOver + transitionOver);
  
}

const viewportScroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    }
  }

}

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }

  if(deltaY < 0) {
    scroller.prev();
  }

});

$(window).on("keydown", e => {
  
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === "input" || tagName === "textarea";
  const scroller = viewportScroller();

  if (userTypingInInputs) return
    switch (e.keyCode) {
      case 38: //prev
        scroller.prev();
        break;
      
      case 40: //next
        scroller.next();
        break;
    }

})

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
})


/* if (isMobile) {

  //https://github.com/mattbryson/TouchSwipe-Jquery-Plugin?ysclid=l9vzx1bxjr167038958

  $("body").swipe( {

   swipe:function(event,direction) {
      const scroller = viewportScroller();
      let scrollDirection = "";

      if(direction === "up") scrollDirection = "next";
      if(direction === "down") scrollDirection = "prev";

      scroller[scrollDirection]();
   },
  })
} */