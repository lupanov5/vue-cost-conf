"use strict"

// Компонент наценки зоны доставки. В качестве props получает объект с id наценки.
// В компонент зоны передает событие для удаления наценки и данные инпутов.


const AreaMarkup = Vue.component('AreaMarkup', {
    data: function () {
        return {
            min_weight: '',
            max_weight: '',
            charge_value: '',
            chargeValid: true,
            minValid: true,
            maxValid: true
        }
    },
    props: ['markup'],
    methods: {
        // Удаление текущей наценки
        removeMarkup() {
            this.$emit('remove', this.markup)
        },
        // отправка события с данными всех инпутов в компонент зоны
        addValue() {
            this.$emit('addValue', this.markupSets)
            this.isMinValid()
            this.isMaxValid()
            this.isChargeValid()

        },
        // Проверка на валидность всех полей
        isChargeValid() {
            this.chargeValid = this.charge_value
        },
        isMinValid() {
            this.minValid = this.min_weight
        },
        isMaxValid() {
            this.maxValid = this.max_weight
        }
    },
    computed: {
        markupSets() {
            return {
                id: this.markup.id,
                min_weight: this.min_weight,
                max_weight: this.max_weight,
                charge_value: this.charge_value
            }
        },
        validator() {
            return this.chargeValid && this.minValid && this.maxValid
        }
    },
    template: `<div class="rate-list__block">
                   <div class="rate__input_field">
                       <input
                       v-model="min_weight"
                       @input="addValue"
                       type="number"
                       min="0"
                       step="0.001"
                       placeholder="0,000"
                       class="nx-form-element rate__input">
                       <template v-if="!minValid">
                           <div class="status">Укажите вес</div>
                       </template>
                   </div>
                   <span>кг -</span>
                   <div class="rate__input_field">
                       <input
                       v-model="max_weight"
                       @input="addValue"
                       type="number"
                       min="0"
                       step="0.001"
                       placeholder="0,000"
                       class="nx-form-element rate__input">
                       <template v-if="!maxValid">
                           <div class="status">Укажите вес</div>
                       </template>
                   </div>
                   <div class="rate-list__total">
                       <div class="rate__input_field">
                           <input
                           v-model="charge_value"
                           @input="addValue"
                           type="number"
                           min="0"
                           step="0.01"
                           placeholder="0,00"
                           class="nx-form-element rate__input">
                           <template v-if="!chargeValid">
                               <div class="status">Укажите наценку</div>
                           </template>
                       </div class="rate__total-cost">
                   </div>
                   <a
                   @click.prevent="removeMarkup"
                   href="#"
                   class="btn btn_lt rate__btn">Удалить</a>
               </div>`
})

export default AreaMarkup