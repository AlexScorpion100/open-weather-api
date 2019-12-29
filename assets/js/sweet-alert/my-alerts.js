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
        html: '<label for="swal-input1" > Introduza a cidade!! </label> <input id="swal-input1" class="swal2-input" placeholder="Lisbon">' +
            '<label for="swal-input2" > Introduza o seu pais!! </label> <input id="swal-input2" class="swal2-input" placeholder="PT">',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value
            ]
        }
    })

    if (formValues) {
        getHomeCityDataIfFail(formValues[0], formValues[1]);
    }
}