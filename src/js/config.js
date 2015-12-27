/**
 *
 * @type {{startDate: pDate, endDate: *, weekDayTitle: string[], dayWidth: string, dayHeight: string, data: {}, days: {}}}
 */
var Class_Config = {
    /**
     * @desc monthTitleFormat
     */
    monthTitleFormat: "MMMM",

    /**
     * @desc startDate
     */
    startDate: new pDate([new pDate().year(), 1, 1, 1, 1, 1, 1]),


    /**
     * @desc  endDate
     */
    endDate: new pDate().endOf('year'),


    /**
     * @desc weekDayTitle
     */
    weekDayTitle: ["شنبه", "یکشنبه", "دوشنبه", "سشنبه", "چهارشنبه", "پنجشنبه", "جمعه"],


    /**
     * @desc dayWidth
     */
    dayWidth: "30",


    /**
     * @desc dayHeight
     */
    dayHeight: "30",


    /**
     * @desc data
     */
    data: {

    },


    /**
     * @desc days
     */
    days: {
        /**
         * @desc render data function()
         * @type function
         */
        renderData: function ($day, data) {
        },
        label: {
            enabled: true,
            format: "DD",
            formatter: function (Obj, date) {
                return date.format("DD");
            }
        },
        tooltip: {
            enabled: true,
            formatter: function (Obj, date) {

            },
            background_color: "#333333",
            color: "#ffffff",
            animation_speed: 250,
            animation_offset: 20,
            close_on_click: true,
            default_position: "above",
            hide_delay: 100,
            keep_visible: true,
            max_width: 200,
            opacity: 0.85,
            position: "center",
            prerender: false,
            show_delay: 100,
            vertical_offset: 0
        }
    }
}
