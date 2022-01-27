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
            baseValid: true,
            mainValid: true,
            markupSets: [],
            extraCharges: [],
            notValid: 0
        }
    },
    components: {
        'AreaMarkup': AreaMarkup
    },
    props: ['area'],
    methods: {
        // Удаление зоны
        removeArea() {
            this.$emit('remove', this.area)
        },
        // Добавление наценки
        addMarkup() {
            this.markupList.push({
                id: this.id++
            })
        },
        // Удаление наценки
        removeMarkup(markup) {
            this.markupList = this.markupList.filter(el => el.id !== markup.id)
        },
        // Добавление настроек наценки тарифной зоны
        addValue(val) {
            this.markupSets = this.markupSets.filter(el => el.id !== val.id)
            this.markupSets.push(val)
        },
        // Проверка на валидность базовой наценки
        isBaseValid() {
            this.baseValid = this.baseCharge
        },
        // Проверка на валидность всей зоны
        isMainValid() {
            this.mainValid = this.baseCharge && this.markupList
        },
        // Проверка на валидность всех наценок
        isMarkupValid() {
            if (this.markupList.length) {
                this.$refs.areaMarkup.forEach(el => {
                    el.isMinValid()
                    el.isMaxValid()
                    el.isChargeValid()
                })
            }
        }
    },
    computed: {
        extra_charges() {
            this.markupSets.map(el => {
                delete el.id
            })
            return this.markupSets
        },
        getRareAreaData() {
            return {
                rate_area_id: this.area.id,
                base_charge_value: this.baseCharge,
                extra_charges: this.extra_charges
            }
        },
        total() {
            return (Number(this.sumChargeValue) + Number(this.baseCharge)).toFixed(2)
        },
        ready() {
            if (this.markupList.length) {
                this.$refs.areaMarkup.forEach(el => {
                    if (!el.chargeValid || !el.minValid || !el.maxValid) {
                        this.notValid++
                    }
                    if (!this.baseValid || !this.mainValid) {
                        this.notValid++
                    }
                })
            }
            return this.notValid
        },
        sumChargeValue() {
            let sum = 0
            this.markupSets.forEach(el => {
                sum += Number(el.charge_value)
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
                            @input="isBaseValid"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0,00"
                            name="base_charge_value"
                            class="nx-form-element rate__input">
                            <template v-if="!baseValid">
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
                            ref="areaMarkup"
                            @remove="removeMarkup"
                            @addValue="addValue"></area-markup>
                        </li>
                    </ul>
                    <template v-if="markupList.length">
                        <div class="rate__total-cost">Итоговая стоимость доставки: {{ total }}</div>
                    </template>
                    <template v-if="!mainValid">
                        <div class="status">Доставка не настроена</div>
                    </template>
                    
                </div>`
})

export default RareArea
