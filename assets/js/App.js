"use strict"
import RareArea from "./components/RareArea";


const app = new Vue({
    el: '#app',
    components: {
        'RareArea': RareArea
    },
    data: {
        city: [],
        areaList: [],
        markupList: [],
        search: '',
        finalData: [],
        notValid: 0,
        title: 'Конфигуратор стоимости доставки'
    },
    methods: {
        // Добавление/удаление города в список выбранных зон из листа поиска
        toggleCityToAreaList(el) {
            this.areaList.includes(el) ? this.removeArea(el) : this.addArea(el)
        },
        // Добавление выбранной зоны
        addArea(area) {
            this.areaList.push(area)
            this.areaList.sort(this.sortArray)
            this.citySearch.map(city => {
                if (city.name === area.name) city.add = !city.add
            })
        },
        // Удаление выбранной зоны
        removeArea(area) {
            this.areaList = this.areaList.filter(n => n.name !== area.name)
            this.citySearch.map(city => {
                if (city.name === area.name) city.add = !city.add
            })
        },
        // Проверка всей формы на валидность
        isValid() {
            if (this.areaList.length) {
                this.$refs.rareArea.forEach(el => {
                    el.isBaseValid()
                    el.isMainValid()
                    el.isMarkupValid()
                })
                this.$refs.rareArea.forEach(el => {
                    if(el.ready) {
                        this.notValid++
                    }
                    el.notValid = 0
                })
                if (!this.notValid) {
                    this.getData()
                }
                this.notValid = 0
            }
        },
        // Вывод финальных данных
        getData() {
            this.$refs.rareArea.forEach(el => {
                this.finalData.push(el.getRareAreaData)
            })
            console.log(JSON.stringify(this.finalData))
            this.finalData = []
        },
        requestToServer: async () => {
            let response = await fetch('/rate-areas.json', {method: "GET"});
            if (response.ok) {
                return await response.json()
            }
        },
        sortArray(x, y) {
            if (x.name < y.name) {return -1;}
            if (x.name > y.name) {return 1;}
            return 0;
        },
    },
    computed: {
        // Реализация живого поиска
        citySearch() {
            let arr = this.city
            let newArray = []
            const search = this.search.toLowerCase()
            arr.forEach(el => {
                if (el.name.toLowerCase().indexOf(search) !== -1) {
                    newArray.push(el)
                }
            })
            return newArray
        }
    },
    created() {
        this.requestToServer()
            .then(response => {
                this.city = response
                this.city.map(el => {
                    el.add = true
                    el.extra_charges = []
                })
            })
    }
})