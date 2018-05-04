$(function () {
    $('.comment').on('click', function (e) {
        var $target = $(this);
        var toId = $target.data('tid');
        var commentId = $target.data('cid');

        var $commentForm = $('#commentForm');

        var $toIdInput = $('#toId');
        var $commentIdInput = $('#commentIdInput');

        if ($toIdInput[0]) {
            $toIdInput.val(toId);
        } else {
            $('<input>').attr({
                type: 'hidden',
                id: 'toId',
                name: 'comment[tid]',
                value: toId
            }).appendTo($commentForm);
        }

        if ($commentIdInput[0]) {
            $commentIdInput.val(commentId);
        } else {
            $('<input>').attr({
                type: 'hidden',
                id: 'commentId',
                name: 'comment[cid]',
                value: commentId
            }).appendTo($commentForm);
        }

    });
});