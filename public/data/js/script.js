$.fn.stars = function(val) {
    return $(this).each(function() {
        console.log("stars: ", val);
        val = Math.round(val * 4) / 4; 
        var size = Math.max(0, (Math.min(5, val))) * 16;
        var $span = $('<span />').width(size);
        $(this).html($span);
    });
}