Vue.createApp({
    data() {
        return {
            selected: '',
            city: '',
            loading: false,
            err: false,
            citydata: [],
            weatherdata: [],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            windspeed: ['0.3m/s ', '0.3-3.4m/s', '3.4-8.0m/s', '8.0-10.8m/s', '10.8-17.2m/s', '17.2-24.5m/s', '24.5-32.6m/s', ' > 32.6m/s'],
            weather: {
                "lightrain": "Light Rain",
                "cloudy": "Cloudy",
                "lightsnow": "Light Snow",
                "ishower": "Isolated Shower",
                "0shower": "Occasional Shower",
                "pcloudy": "Partially Cloudy",
                "mcloudy": "Mostly Cloudy",
                "clear": "Clear",
                "humid": "Humid",
            }
        };

    },
    mounted() {
        this.$nextTick(() => {
            this.getCities();
        });
    },
    methods: {
        getCities() {

            fetch("data.json")
                .then(response => response.json())
                .then(data => {
                    this.citydata = data;
                    console.table(this.citydata)
                })
                .catch((err) => this.err = !this.err)

        },
        getCity(value) {
            this.weatherdata = [];
            this.err = false;
            this.loading = true;
            fetch("https://www.7timer.info/bin/api.pl?lon=" + value.longitude + "&lat=" + value.latitude + "&product=civillight&output=json")
                .then(response => response.json())
                .then(data => {
                    this.weatherdata = data
                    console.log(data)
                })
                .catch((err) => this.err = !this.err)

            this.loading = false;

        }
    }
}).mount('#demo');