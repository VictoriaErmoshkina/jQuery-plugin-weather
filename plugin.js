(function ($) {
    const defaultCities = ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan", "Ufa", "Saratov",
        "Rostov-on-Don", "Ivanovo", "Vologda", "Kaliningrad", "Vladivostok", "Kiev", "Paris", "Oslo", "Zurich",
        "London", "Bangkok", "New York", "Honk Kong", "Los Angeles", "Tokyo", "San Francisco", "Vatican City"];
    $.fn.weatherPlugin = function (options) {
        var parameters = $.extend({
            cities: defaultCities,
            direction: "up"
        }, options);
        const parentElement = this;
        const listItems = parentElement.find("li");
        const listLength = listItems.length;
        const citiesLength = parameters.cities.length;
        for (let i = 0; i < listLength; i++) {
            let liText = listItems.eq(i).text();
            for (let j = 0; j < citiesLength; j++) {
                if (liText.search(parameters.cities[j], 'i') != -1) {
                    findForecast(parameters.cities[j], listItems.eq(i));
                }
            }
        }
        listItems.click(function () {
            const item = $(this);
            changeElementPosition(item, parentElement, parameters.direction);
        });
    };

    //посылается запрос XMLHttpRequest, формируется строка с погодой, вставляется в элемент в документ
    function findForecast(city, item) {
        const APIKey = '13994b00561a33c084b28f8cd7e87b98';
        const XHR = ('onload' in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
        const xhr = new XHR();
        let url = makeURL(city, APIKey);
        xhr.open('GET', url);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (xhr.status != 200) {
                console.log(xhr.status + ": " + xhr.statusText + " -> " + city);
                appendToPage("Can't get weather in " + city, item);
            } else {
                let response = JSON.parse(xhr.responseText);
                let forecastStr = getForecastStr(response, city);
                appendToPage(forecastStr, item);
            }
        };
    }

    //формируется строка с погодой
    function getForecastStr(response, city) {
        let forecast = "";
        let degrees = "";
        if (response)
            if (response.list)
                degrees = Math.ceil(response.list[0].main.temp);
        if (degrees > 0)
            forecast += "+ ";
        forecast += (degrees + " in " + city + ".");
        return forecast;
    }

    //к элементу списка добавляется строка, обернутая в тег <a></a>
    function appendToPage(str, item) {
        if (str)
            if (str.length > 0) {
                item.append("<a class=\"forecast\"> " + str + "</a>");
            }
    }

    function makeURL(city, apiKey) {
        let citySnakeCase = city.replace(/\s+/g, '_').toLowerCase();
        let url = 'http://api.openweathermap.org/data/2.5/forecast?appid=' + apiKey
            + '&q=' + citySnakeCase + '&units=metric';
        return url;
    }

    function changeElementPosition(item, parent, direction) {
        item.hide(500, function () {
            if (direction == "up"){
                parent.prepend(item);
            }
            else if (direction == "down") {
                parent.append(item);
            }
            item.fadeIn("slow");
        });
    }
})(jQuery);
