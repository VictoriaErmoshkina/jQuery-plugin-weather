/**
 * Created by Виктория on 08.11.2017.
 */
var cities = ["Paris", "Oslo", "Zurich", "London", "Bangkok", "New York", "Honk Kong", "Los Angeles", "Tokyo", "San Francisco", "Vatican City"];
var documentLists = $("ul");
if (documentLists.eq(0)) {
    documentLists.eq(0).weatherPlugin({
        cities: cities,
        direction: "down"
    });
} else
    console.log("Warning: Lists were not found on the page.");