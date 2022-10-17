const validationFields = (form, fieldsArray) => {

  fieldsArray.forEach(field =>{
    field.removeClass("input-error");

    if(field.val().trim() === "") {
      field.addClass("input-error");
    }
  })

  const errorFields = form.find(".input-error")

  return errorFields.length === 0;
}

$('.form').submit(e => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");
  const street = form.find("[name='street']");
  const house = form.find("[name='house']");
  const building = form.find("[name='building']");
  const appartment = form.find("[name='appartment']");
  const floor = form.find("[name='floor']");

  const modal = $("#modal");
  const content = modal.find(".modal__content");

  modal.removeClass("error-modal");


  const isValid = validationFields(form, [name, phone, comment, to, street, house, building, appartment, floor])


  if (isValid) {
    const request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        street: street.val(),
        house: house.val(),
        building: building.val(),
        appartment: appartment.val(),
        floor: floor.val(),
        comment: comment.val(),
        to: to.val()
      },
    });

    request.done(data => {
      content.text(data.message);
    })


    request.fail(data => {
      const message = data?.responseJSON?.message || 'Ошибка на стороне сервера';
      content.text(message);
      modal.addClass("error-modal");
    })

    request.always(() => {
      Fancybox.show([{src: "#modal", type: "inline"}])
    })

  }

})

$(".app-close-modal").click(e => {
  e.preventDefault();

  Fancybox.close();
})