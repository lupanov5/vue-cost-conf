"use strict"

// Компонент наценки зоны доставки. В качестве props получает объект со свойствами наценки и базовую стоимость.
// В компонент зоны передает событие для удаления наценки и текущую итоговую стоимость.


const AreaMarkup = Vue.component('AreaMarkup', {
    data: function () {
        return {
            min_weight: '',
            max_weight: '',
            charge_value: ''
        }
    },
    props: ['markup', 'base'],
    methods: {
        removeMarkup() {
            this.$emit('remove', this.markup)
        },
        addChargeValue() {
            this.$emit('chargeValue', this.total)
        }
    },
    computed: {
        total() {
            return (Number(this.base) + Number(this.charge_value)).toFixed(2)
        }
    },
    template: `<div class="rate-list__block">
                   <div class="rate__input_field">
                       <input
                       v-model="min_weight"
                       name="min_weight"
                       type="number"
                       min="0"
                       step="0.001"
                       placeholder="0,000"
                       class="nx-form-element rate__input">
                   </div>
                   <span>кг -</span>
                   <div class="rate__input_field">
                       <input
                       v-model="max_weight"
                       name="max_weight"
                       type="number"
                       min="0"
                       step="0.001"
                       placeholder="0,000"
                       class="nx-form-element rate__input">
                   </div>
                   <div class="rate-list__total">
                       <div class="rate__input_field">
                           <input
                           v-model="charge_value"
                           @input="addChargeValue"
                           name="charge_value"
                           type="number"
                           min="0"
                           step="0.01"
                           placeholder="0,00"
                           class="nx-form-element rate__input">
                       </div class="rate__total-cost">
                       <span class="rate__total-cost_text">Итоговая стоимость доставки: {{ total }}</span>
                       <span data-sum class="rate__total-cost_value"></span>
                   </div>
                   <a
                   @click.prevent="removeMarkup"
                   href="#"
                   class="btn btn_lt rate__btn">Удалить</a>
               </div>`
})

export default AreaMarkup