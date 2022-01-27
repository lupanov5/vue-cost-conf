<!DOCTYPE HTML>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="author" content="Контент">
    <meta name="keywords" content="keywords">
    <meta name="description" content="description">

    <title>Конфигуратор стоимости</title>

    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>

    <link rel="icon" type="image/png" href="favicon.png">
    <link rel="stylesheet" href="assets/vendor.css">
    <link rel="stylesheet" href="assets/app.min.css">

    <meta property="og:title" content="title"/>
    <meta property="og:description" content="description"/>
    <meta property="og:image" content="favicon.png">

</head>
<body>


<div class="wrapper" id="app">
    <div class="wrapper__content">
        <section class="search container">

            <div class="search__wrapper">
                <h6 class="app__title">{{ title }}</h6>
                <div class="search__panel">
                    <input
                            v-model="search"
                            type="text"
                            class="search__input nx-form-element"
                            placeholder="Искать тарифную зону по названию...">
                </div>
                <template
                        v-if="search.length">
                    <ul class="city-list">
                        <li
                                v-for="city in citySearch"
                                :key="city.id"
                                class="city-list__item">
                            <span class="city-list__city">{{ city.name }}</span>
                            <a
                                    @click.prevent="toggleCityToAreaList(city)"
                                    href="#"
                                    class="btn btn_lt city-list__btn">{{ city.add ? 'Добавить' : 'Удалить' }}</a>
                        </li>
                    </ul>
                </template>
            </div>

            <ul class="rate__wrapper">
                <li
                        v-for="area in areaList"
                        class="rate__def">
                    <rare-area
                            v-bind:area="area"
                            ref="rareArea"
                            @remove="removeArea"></rare-area>
                </li>
            </ul>
            <template
                    v-if="areaList.length">
                <div
                    @click="isValid"
                    class="save-btn btn btn_lt">Сохранить изменения</div>
            </template>

        </section>
    </div>
</div>


<script src="/assets/app.min.js"></script>
</body>
</html>
