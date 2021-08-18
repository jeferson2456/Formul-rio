let PrevineEnvio = {
  handleSubmit: e => {
    e.preventDefault();
    let envio = true;

    let inputs = form.querySelectorAll('input');

    PrevineEnvio.clearErros();

    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      let check = PrevineEnvio.checkInput(input);
      if (check !== true) {
        envio = false;
        PrevineEnvio.exibirError(input, check);
      }
    }

    if (envio) {
      form.submit();
    }
  },
  checkInput: (input) => {
    let rules = input.getAttribute('data-rules');

    if (rules !== null) {
      rules = rules.split('|');
      for (let r in rules) {
        let detalheRules = rules[r].split('=');
        switch (detalheRules[0]) {
          case 'required':
            if (input.value == '') {
              return 'Este campo não pode ser vazio.';
            }

            break;
          case 'min':
            if (input.value.length < detalheRules[1]) {
              return `Este campo tem que ter pelo menos ${detalheRules} caracteres`;
            }
            break;
          case 'email':
            if (input.value != '') {
              let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (!regex.test(input.value.toLowerCase())) {
                return 'E-mail digitado não é válido!';
              }
            }
            break;
        }
      }
    }
    return true;
  },
  exibirError: (input, error) => {
    input.style.borderColor = '#ff0000';

    let errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.innerHTML = error;

    input.parentElement.insertBefore(errorElement, input.nextElementSibling);

  },
  clearErros: () => {
    let inputs = form.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style = '';
    }

    let errorElements = document.querySelectorAll('.error');
    for (let i = 0; i < errorElements.length; i++) {
      errorElements[i].remove();
    }
  }
};


let form = document.querySelector('.formulario');
form.addEventListener('submit', PrevineEnvio.handleSubmit);