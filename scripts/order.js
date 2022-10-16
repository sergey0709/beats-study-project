class AjaxForm{
  constructor(selector, settings) {
      this.settings = settings
      this.form = document.querySelector(selector)
      this.fields = this.form.elements
      this.errors = []

      this.form.addEventListener('submit', (e) => {
          e.preventDefault()

          if (this.isValid()) {
              this.submit()
          }
      })

      this.form.addEventListener('input', (e) => this.validationField(e.target.name))
  }

  isValid() {
      const validators = this.settings.validators

      if (validators) {
          for (const fieldName in validators) {
              this.validationField(fieldName)
          }
      }

      console.log(this.errors)

      if (!this.errors.length) {
          return true
      } else {
          return false
      }
  }

  validationField(fieldName) {
      console.log(fieldName)
      if (fieldName && this.settings.validators[fieldName]) {
          try {
              this.settings.validators[fieldName](this.fields[fieldName])
              this.hideError(fieldName)
          } catch (error) {
              this.showError(fieldName, error.message)
          }
      }
  }

  hideError(fieldName) {
      if (this.errors.length) {
          const field = this.fields[fieldName].closest ? this.fields[fieldName] : this.fields[fieldName][0]
          this.errors = this.errors.filter((field) => field !== fieldName)
          field.closest('label').classList.remove('error')
      }
  }

  showError(fieldName, text) {
      if (fieldName) {
          const field = this.fields[fieldName].closest ? this.fields[fieldName] : this.fields[fieldName][0]
          this.errors.push(fieldName)
          field.closest('label').classList.add('error')

          if (this.settings.paceholder) {
              field.placeholder = text
          }
      }
  }

  getJSON() {
      return JSON.stringify(Object.fromEntries(new FormData(this.form)))  
  }

  async submit() {
      try {
          var response = await fetch(this.settings.url, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: this.getJSON()
          })

          console.log(response)

          var body = await response.json()

          if (response.status >= 400) {
              throw new Error('Ошибка сервера!')
          }

          this.settings.success(body)
          this.form.reset()
      } catch (error) {
          this.settings.error(error.message)
      }
  }
}

console.log(new AjaxForm('#form', {
  url: 'https://webdev-api.loftschool.com/sendmail',
  validators: {
      name: function(field) {
          if (field.value.length < 2) {
              throw new Error('Имя не валидное')
          }
      },
      phone: function(field) {
          if (!field.value.length) {
              throw new Error('Телефон не валиден')
          }
      },
      isCall: function(field) {
          if (!field.checked) {
              throw new Error('не чек')
          }
      },
      option: function(field) {
         if (field.value === 'card') {
              alert('Оплата картой не доступна')
         }
      },
      comment: function(field) {
          if (!field.value.length) {
              throw new Error('Телефон не валиден')
          }
      }
  },
  error:(body) => {
      alert(body)
  },
  success: (body) => {
      alert(body.message)
  }
}))