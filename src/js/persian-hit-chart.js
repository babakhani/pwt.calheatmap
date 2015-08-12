/**
 *
 * @type {{startDate: pDate, endDate: *, weekDayTitle: string[], dayWidth: string, dayHeight: string, data: {}, days: {}, _basicRender: Function, _renderDays: Function, _setWeekDayTitle: Function, _setLayoutSize: Function, _init: Function}}
 */
var Class_Persian_Hit_Chart = {
        /**
         *
         * @returns {Class_Persian_Hit_Chart}
         * @private
         */
        _bootstrap: function () {
            var self = this;
            this.elem = $.mustache(TEMPLATE.basic, {});
            this.elem.appendTo(self.$container);
            this.startDate = new pDate(self.startDate);
            this.endDate = new pDate(self.endDate);
            return this;
        },


        /**
         *
         * @returns {Class_Persian_Hit_Chart}
         * @private
         */
        _renderDays: function () {
            var self = this;
            var conatiner = this.elem.find(".days-container > div");
            this._days = new Days(conatiner, {
                startDate: self.startDate,
                endDate: self.endDate,
                data: self.data,
                tooltipFormatter: self.tooltipFormatter,
                monthTitleFormat: self.monthTitleFormat
            }, self.days);
            return this;
        },


        /**
         *
         * @private
         */
        _setWeekDayTitle: function () {
            var self = this;
            self.$container.find(".week-box-title li").each(function (index) {
                if (self.weekDayTitle[index]) {
                    $(this).html(self.weekDayTitle[index])
                }
            });
            return this;
        },


        /**
         *
         * @private
         */
        _setLayoutSize: function () {
            var self = this;
            self.$container.find(".week-box-title li").height(self.dayHeight);//.width(self.dayWidth)
            self.$container.find(".week-box li").height(self.dayHeight).width(self.dayWidth).css({
                'line-height': self.dayHeight + 'px'
            });

            var weekBoxHight = self.$container.find(".week-box").height();
            var monthTitle = self.$container.find(".month-title").height();
            var $weekBox = self.$container.find(".week-box");
            var weekBoxWidth = $weekBox.outerWidth() * $weekBox.length;
            self.$container.find(".days-container > div").width(weekBoxWidth);
            var weekBoxContainerWidth = self.$container.find(".persian-hit-chart").width();
            var weekContainerHeight = (self.dayHeight * 7) + monthTitle;
            if (weekBoxContainerWidth < weekBoxWidth) {
                weekContainerHeight += 20;
            }
            self.$container.find(".days-container").height(weekContainerHeight);
            self.$container.find(".persian-heat-map-chart").height(weekContainerHeight);
            return this;
        },


        /**
         *
         */
        _attachEvents: function () {
            var self = this;
            var $scrollContainer = self.$container.find(".days-container");
            var $scrollElem = self.$container.find(".days-container >  div");
            var widthDelta = $scrollElem.width() - $scrollContainer.width();
            this.$container.on('mousewheel', function (event, delta) {
                val = this.scrollLeft - (delta * 50);
                jQuery(this).stop().animate({scrollLeft: val}, 500);
                //event.preventDefault();
            });
            return this;
        },


        /**
         *
         * @returns {Class_Persian_Hit_Chart}
         * @private
         */
        _init: function () {
            return this._bootstrap()
                ._setWeekDayTitle()
                ._renderDays()
                ._attachEvents()
                ._setLayoutSize();
        }
    },

    /**
     *
     * @param container
     * @param config
     * @returns {Class_Persian_Hit_Chart|*}
     * @constructor
     */
    PersianHitChart = function (container, config) {
        $.extend(true, this, Class_Persian_Hit_Chart, Class_Config, config, {
            $container: $(container)
        });
        return this._init();
    };