window.onload = function () {
    let data = new Date();
    let dia = data.getDate();
    let mes = data.getMonth() +1;
    let ano = data.getFullYear();

    if (mes <= 9) {
        mes = `0${mes}`;
    }

    if (dia <= 9) {
        dia = `0${dia}`;
    }

    let calendario = `${ano}-${mes}-${dia}`;
    $('#data').val(calendario);
}

$(".botao").click(function(date) {
    setApod();
});

$(".atualizar").click(function() {
    location.reload();
});

function setApod() {    
    var date = $("#data").val();
    console.log(date);
    var link = `https://api.nasa.gov/planetary/apod?api_key=j3gAcBzYdK0oGQdLD6Eaj9SF9Dq6NTIplK9ybvZi&date=${date}`;

    $.ajax({url: link,
        success: function(apod){
            $('.caixa').addClass('oculto');
            $('.atualizar').removeClass('oculto');
            $('.descricao').removeClass('oculto');
            $('.descricao').text(apod.explanation);
            $('.identificar').removeClass('oculto');
            $('.copyright').text(apod.copyright);
            $('.copyright').removeClass('oculto');
            $('.imagem').attr('src', apod.url);
            $('.imagem').removeClass('oculto');
            
            var oTitulo = apod.title;
            var oTipo = apod.media_type;

            function getTitle() {
                if (oTitulo.includes(':') == true && oTipo === "image") {
                var titleSubtitle = oTitulo.split(': ');
                $('.titulo').text(titleSubtitle[0]);
                $('.subtitulo').text(titleSubtitle[1]);
                $('.subtitulo').removeClass('oculto');
            } else {
                $('.titulo').text(oTitulo);
                $('.subtitulo').addClass('oculto');
            }}
            getTitle();
            
            if (apod.media_type === "video") {
                $('.video').attr('src', apod.url);
                $('.video').removeClass('oculto');
            } else if (apod.media_type === "image") {
                $('.img').attr('src', apod.url);
                $('.img').removeClass('oculto');
            }
        }, error: function() {
            $('.caixa-titulo').text("Data não disponível.");
        }
    })
}