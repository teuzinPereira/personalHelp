$(function () {
      $('#inputTelefone')
              .mask("9999-9999?9")
              .keydown(function () {
                  var $elem = $(this);
                  var tamanhoAnterior = this.value.replace(/\D/g, '').length;
                  setTimeout(function () {
                      var novoTamanho = $elem.val().replace(/\D/g, '').length;
                      if (novoTamanho !== tamanhoAnterior) {
                          if (novoTamanho === 11) {
                              $elem.unmask();
                              $elem.mask("99999-9999");
                          } else if (novoTamanho === 10) {
                              $elem.unmask();
                              $elem.mask("9999-9999?9");
                          }
                      }
                  }, 1);
              });
      
      //First import datepicker plugin
      $('#data-evento').datepicker({
          dateFormat: 'dd/mm/yy',
          dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
          dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
          dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
          monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      });
      
      //get cep
      var inputsCEP = $('#logradouro, #bairro, #localidade');
      var inputsRUA = $('#cep, #bairro, #ibge');
      var validacep = /^[0-9]{8}$/;
      
      $('#logradouro, #localidade, #uf').on('blur', function (e) {
            if ($('#logradouro').val() !== '' && $('#logradouro').val() !== $('#logradouro').attr('info') && $('#localidade').val() !== '' && $('#localidade').val() !== $('#localidade').attr('info') && $('#uf').val() !== '' && $('#uf').val() !== $('#uf').attr('info')) {
                inputsRUA.val('...');
                get('https://viacep.com.br/ws/' + $('#uf').val() + '/' + $('#localidade').val() + '/' + $('#logradouro').val() + '/json/');
            }

      });

      // Digitando CEP
      $('#cep').on('blur', function (e) {
            var cep = $('#cep').val().replace(/\D/g, '');
            if (cep !== "" && validacep.test(cep)) {
                inputsCEP.val('...');
                get('https://viacep.com.br/ws/' + cep + '/json/');
            } else {
                limpa_formulário_cep(cep == "" ? undefined : "Formato de CEP inválido.");
            }
      });
      
      function limpa_formulário_cep(alerta) {
            if (alerta !== undefined) {
                alert(alerta);
            }
            inputsCEP.val('');
      }

      function get(url) {
            $.get(url, function (data) {
                if (!("erro" in data)) {
                    if (Object.prototype.toString.call(data) === '[object Array]') {
                        var data = data[0];
                    }

                    $.each(data, function (nome, info) {
                        $('#' + nome).val(nome === 'cep' ? info.replace(/\D/g, '') : info).attr('info', nome === 'cep' ? info.replace(/\D/g, '') : info);
                    });

                } else {
                    limpa_formulário_cep("CEP não encontrado.");
                }
            });
      }
  });
