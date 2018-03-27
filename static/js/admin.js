$(function () {
    $('.del-btn').on('click', function (e) {
        var $target = $(e.target);
        var id = $target.data('id');
        var $tr = $('.item-id-' + id);

        $.ajax({
            url: '/admin/list?id=' + id,
            type: 'delete',
            success: function (res) {
                if (res.success === 1 && $tr.length) {
                    $tr.remove();
                }
            }
        });
    });
});