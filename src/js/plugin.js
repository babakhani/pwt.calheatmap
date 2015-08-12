/**
 * @desc plugin code block
 */

$.fn.persianHitChart = $.fn.persianHitChart = function (options) {
    var args = Array.prototype.slice.call(arguments), output = this;
    if (!this) {
        $.error("Invalid selector");
    }
    $(this).each(function () {
        // encapsulation Args
        var emptyArr = new Array, tempArg = args.concat(emptyArr), dp = $(this).data("persianHitChart");
        if (dp && typeof tempArg[0] == "string") {
            var funcName = tempArg[0], funcArgs = tempArg.splice(0, 1);
            output = dp[funcName](tempArg);
        } else {
            this.persianHitChart = new PersianHitChart(this, options);
        }
    });
    return output;
};