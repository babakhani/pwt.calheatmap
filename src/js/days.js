/**
 *
 * @type {{label: {enabled: boolean, format: string, formatter: Function}, tooltip: {enabled: boolean}, startDate: string, endDate: string, underRenderDate: boolean, data: string, _basicRender: Function, getPersianDayOfweekIndex: Function, _renderDaysContent: Function, leftZeroFill: Function, _applyTooltip: Function, applyData: Function, _init: Function}}
 */
var Class_Days = {
        /**
         * @desc monthTitleFormat
         */
        monthTitleFormat: "MMMM",


        /**
         * #desc label config dixt
         */
        label: {
            enabled: true,
            format: "D",
            formatter: function (self, date) {
                return self.underRenderDate.format(self.label.format);
            }
        },


        /**
         * @desc tooltip
         */
        tooltip: {
            enabled: false
        },


        /**
         * @desc startDate
         */
        startDate: "",


        /**
         * @desc endDate
         */
        endDate: "",


        /**
         * @desc underRenderDate
         */
        underRenderDate: false,


        /**
         * @desc data
         */
        data: "",


        /**
         *
         * @returns {Class_Days}
         * @private
         */
        _basicRender: function () {
            var self = this;
            var weekLength = self.endDate.diff(self.startDate, 'week') + 1
            var i = 0;
            while (i < weekLength) {
                var $weekBox = $.mustache(TEMPLATE.weekBox, {});
                $weekBox.appendTo(self.$container);
                i++;
            }
            return this;
        },


        /**
         *
         * @param i
         * @returns {*}
         */
        getPersianDayOfweekIndex: function (i) {
            if (i == 7) {
                return 1;
            } else {
                return i + 1;
            }
        },


        /**
         *
         * @returns {Class_Days}
         * @private
         */
        _renderDaysContent: function () {
            var self = this, monthChange = "alternat", todayDate = new pDate();
            if (self.underRenderDate == false) {
                self.underRenderDate = self.startDate;
            }
            self.$container.find(".week-box").each(function () {
                var $weekBox = $(this);
                $(this).find("li").each(function (index) {
                    var weekDay = self.getPersianDayOfweekIndex(self.underRenderDate.days());
                    var monthDay = self.underRenderDate.date();
                    if (monthDay == 1) {
                        if (monthChange == "alternat") {
                            monthChange = "";
                        } else {
                            monthChange = "alternat";
                        }
                    }
                    if (weekDay == index + 1 && self.underRenderDate.unix() < self.endDate.unix()) {
                        var dateKey = self.underRenderDate.years()
                            + "" + self.leftZeroFill(self.underRenderDate.month(), 2)
                            + "" + self.leftZeroFill(self.underRenderDate.dates(), 2);
                        var dateUnix = self.underRenderDate.valueOf();
                        $(this).attr({
                            "dateKey": dateKey,
                            "dateUnix": dateUnix
                        }).addClass("have-day").addClass(monthChange);

                        if (self.label.enabled) {
                            $(this).html(self.label.formatter(self, self.underRenderDate));
                        }

                        if (self.underRenderDate.years() == todayDate.years() &&
                            self.underRenderDate.date() == todayDate.date() &&
                            self.underRenderDate.month() == todayDate.month()) {
                            $(this).addClass("today")
                        }
                        self.underRenderDate = self.underRenderDate.add("days", 1);
                    }
                    if (monthDay == 1 && $(this).is("[dateunix]")) {
                        var monthTitle = $('<div class="month-title" ></div>').text(self.underRenderDate.format(self.monthTitleFormat));
                        $weekBox.append(monthTitle);
                    }
                });
            });
            return this;
        },


        /**
         *
         * @param number
         * @param targetLength
         * @returns {string}
         */
        leftZeroFill: function (number, targetLength) {
            var output = number + '';
            while (output.length < targetLength) {
                output = '0' + output;
            }
            return output;
        },


        /**
         *
         * @private
         */
        _applyTooltip: function () {
            var self = this;
            //log("_applyTooltip");
            //log(self.data);
            $(self.$container).find(".week-box li.have-day").each(function () {
                var tooltipElem = this;
                var datyaKey = $(this).attr("dateKey");

                if (self.data[datyaKey]) {
                    new $.Zebra_Tooltips($(tooltipElem), $.extend(true,self.tooltip, {
                                'content': self.data[datyaKey].data
                            })
                    );
                }
            });
            return this;
        },


        /**
         *
         * @param $day
         * @param dayData
         */
        render: function ($day, dayData) {
            $day.css({
                background: dayData.color
            });
            return this;
        },


        /**
         *
         * @param data
         */
        applyData: function (data) {
            var self = this;
            $.each(data, function (key, dayData) {
                var $day = self.$container.find(".week-box li[datekey=" + key + "]");
                self.render($day, dayData);
            });
            return this;
        },


        /**
         *
         * @returns {Class_Days}
         * @private
         */
        _init: function () {
            var self = this;
            this._basicRender();
            this._renderDaysContent();
            if (self.tooltip.enabled) {
                this._applyTooltip();
            }
            this.applyData(self.data);
            return this;
        }
    },


    /**
     *
     * @param container
     * @param config
     * @param userConfig
     * @returns {Class_Days|Class_Persian_Hit_Chart|*}
     * @constructor
     */
    Days = function (container, config, userConfig) {
        $.extend(true, this, Class_Days, config, userConfig, {
            $container: container
        });
        this.startDate = config.startDate
        this.endDate = config.endDate
        return this._init();
    };