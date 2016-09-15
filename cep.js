$(document).ready(function() {

    var inputsCEP = $('#logradouro, #bairro, #cidade, #estado');
    var inputsRUA = $('#cep, #bairro');
    var validacep = /^[0-9]{8}$/;

    function limpa_formulário_cep(alerta) {
      if (alerta !== undefined) {
        alert(alerta);
      }

      inputsCEP.val('');
    }

    function get(url) {

      $.get(url, function(data) {

        if (!("erro" in data)) {

          if (Object.prototype.toString.call(data) === '[object Array]') {
            var data = data[0];
          }

          $.each(data, function(nome, info) {
            $('#' + nome).val(nome === 'cep' ? info.replace(/\D/g, '') : info).attr('info', nome === 'cep' ? info.replace(/\D/g, '') : info);
          });



        } else {
          limpa_formulário_cep("CEP não encontrado.");
        }

      });
    }

    // Digitando RUA/CIDADE/estado
    $('#logradouro, #cidade, #estado').on('blur', function(e) {

      if ($('#logradouro').val() !== '' && $('#logradouro').val() !== $('#logradouro').attr('info') && $('#cidade').val() !== '' && $('#cidade').val() !== $('#cidade').attr('info') && $('#estado').val() !== '' && $('#estado').val() !== $('#estado').attr('info')) {

        inputsRUA.val('...');
        get('https://viacep.com.br/ws/' + $('#estado').val() + '/' + $('#cidade').val() + '/' + $('#logradouro').val() + '/json/');
      }

    });

    // Digitando CEP
    $('#cep').on('blur', function(e) {

      var cep = $('#cep').val().replace(/\D/g, '');

      if (cep !== "" && validacep.test(cep)) {

        inputsCEP.val('...');
        get('https://viacep.com.br/ws/' + cep + '/json/');

      } else {
        limpa_formulário_cep(cep == "" ? undefined : "Formato de CEP inválido.");
      }
    });
});
