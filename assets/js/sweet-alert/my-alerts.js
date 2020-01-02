function erro(titulo) {
    Swal.fire({
        icon: 'error',
        title: titulo,
        showConfirmButton: false,
        timer: 1500,
        showClass: {
            popup: 'animated fadeInDown faster'
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        }
    });
}

function sucesso(titulo) {
    Swal.fire({
        icon: 'success',
        title: titulo,
        showConfirmButton: false,
        timer: 1500,
        showClass: {
            popup: 'animated fadeInDown faster'
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        }
    });
}

async function getDadosDaCidadePrincipal(titulo) {
    const { value: formValues } = await Swal.fire({
        title: titulo,
        html: '<label class="text-left" for="swal-input1" > Introduza a cidade!! </label> <input id="swal-input1" class="swal2-input" required  value="Lisbon">' +
            '<label for="swal-input2" > Introduza o seu pais!! </label> <input id="swal-input2" class="swal2-input" required value="PT">',
        focusConfirm: false,
        icon: 'info',
        showCloseButton: false,
        allowOutsideClick: false,
        footer: 'Brefe information about the home city.',
        preConfirm: () => {
            if (document.getElementById('swal-input2').value && document.getElementById('swal-input2').value) {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            } else {
                Swal.showValidationMessage('Plese fill the imformation!! To get your city information!!')
            }
        }
    })
    if (formValues) {
        getHomeCityDataIfFail(formValues[0], formValues[1]);
    }
}