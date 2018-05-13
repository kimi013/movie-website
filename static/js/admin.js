$(function () {
    $('.del-btn').on('click', function (e) {
        var $target = $(e.target);
        var id = $target.data('id');
        var $tr = $('.item-id-' + id);

        $.ajax({
            url: '/admin/movie/list?id=' + id,
            type: 'delete',
            success: function (res) {
                if (res.success === 1 && $tr.length) {
                    $tr.remove();
                }
            }
        });
    });

    $('#douban').blur(function () {
        var $douban = $(this);
        var id = $douban.val();

        if (id) {
            $.ajax({
                url: 'https://api.douban.com/v2/movie/subject/' + id,
                cache:  true,
                type: 'get',
                dataType: 'jsonp',
                crossDomain: true,
                jsonp: 'callback',
                success: function (data) {
                    $('#inputTitle').val(data.title);
                    $('#inputDirector').val(data.directors[0].name);
                    $('#inputCountry').val(data.countries[0]);
                    // $('#inputLanguage').val(data.);
                    $('#inputPoster').val(data.images.large);
                    $('#inputYear').val(data.year);
                    $('#inputSummary').val(data.summary);
                }
            });
        }


    });
});