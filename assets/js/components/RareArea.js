"use strict"
import AreaMarkup from "./AreaMarkup";

// Компонент зоны доставки. В качестве props получает объект со свойствами выбранной зоны.
// В главный компонент передает событие для удаления выбранной зоны.


const RareArea = Vue.component('RareArea', {
    data: function () {
        return {
            markupList: [],
            id: 0,
            baseCharge: '',
            prevValue: '',
            chargeValue: [],
            valid: true
        }
    },
    components: {
        'AreaMarkup': AreaMarkup
    },
    props: ['area'],
    methods: {
        removeArea() {
            this.$emit('remove', this.area)
        },
        addMarkup() {
            this.markupList.push({
                id: this.id++,
                base: this.base
            })
        },
        removeMarkup(markup) {
            this.markupList = this.markupList.filter(el => el.id !== markup.id)
        },
        addChargeValue(value) {
            this.chargeValue.push(value)
            this.chargeValue.forEach(el => {
                if (el.id === value.id) {
                    el.val = value.val
                    //this.chargeValue.pop()
                }
            })

            console.log(this.setChargeValue)
        }
    },
    computed: {
        base() {
            return Number(this.baseCharge)
        },
        setChargeValue() {
            let sum = 0
            this.chargeValue.forEach(el => {
                sum += Number(el.val)
            })
            return sum
        }
    },
    template: `<div>
                    <div class="rate__head">
                        <h5 class="rate__title">{{ area.name }}</h5>
                        <a
                        @click.prevent="removeArea"
                        href="#"
                        class="btn btn_lt rate__btn">Удалить</a>
                    </div>
                    <div class="rate__head">
                        <span class="rate__title">Базовая стоимость доставки:</span>
                        <div class="rate__input_field">
                            <input
                            v-model="baseCharge"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0,00"
                            name="base_charge_value"
                            class="nx-form-element rate__input">
                            <template v-if="!valid">
                                <div class="status">Укажите базовую стоимость</div>
                            </template>
                        </div>
                        <a
                        @click.prevent="addMarkup(area)"
                        href="#"
                        class="btn btn_lt rate__btn">Добавить наценку</a>
                    </div>
                    <ul class="rate-list">
                        <li
                        v-for="markup in markupList"
                        :key="markup.id"
                        class="rate-list__item">
                            <area-markup
                            v-bind:markup="markup"
                            @remove="removeMarkup"
                            @chargeValue="addChargeValue"></area-markup>
                        </li>
                    </ul>
                </div>`
})

export default RareArea
