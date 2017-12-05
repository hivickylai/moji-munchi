const ingredient = {
    name: 'ingredient',
    1: { code: '&#x1f35e', keyword: 'bread' },
    2: { code: '&#x1f950', keyword: 'croissant pastry' },
    3: { code: '&#x1f956', keyword: 'baguette' },
    4: { code: '&#x1f968', keyword: 'pretzel' },
    5: { code: '&#x1f95e', keyword: 'pancakes' },
    6: { code: '&#x1f9c0', keyword: 'cheese' },
    7: { code: '&#x1f356', keyword: 'meat' },
    8: { code: '&#x1f357', keyword: 'chicken' },
    9: { code: '&#x1f953', keyword: 'bacon' },
    10: { code: '&#x1f969', keyword: 'steak' },
    11: { code: '&#x1f354', keyword: 'burger' },
    12: { code: '&#x1f35f', keyword: 'fries' },
    13: { code: '&#x1f355', keyword: 'pizza' },
    14: { code: '&#x1f32d', keyword: 'hotdog' },
    15: { code: '&#x1f96a', keyword: 'sandwich' },
    16: { code: '&#x1f32e', keyword: 'taco' },
    17: { code: '&#x1f32f', keyword: 'burrito' },
    18: { code: '&#x1f959', keyword: 'pita' },
    19: { code: '&#x1f95a', keyword: 'egg' },
    20: { code: '&#x1f373', keyword: 'fried egg' },
    21: { code: '&#x1f958', keyword: 'paella' },
    22: { code: '&#x1f372', keyword: 'hotpot' },
    23: { code: '&#x1f963', keyword: 'soup' },
    24: { code: '&#x1f957', keyword: 'salad' },
    25: { code: '&#x1f37f', keyword: 'popcorn' }
}

const method = {
    name: 'method',
    1: { code: '&#x1f962', keyword: 'chopsticks' },
    2: { code: '&#x1f37d', keyword: 'place setting' },
    3: { code: '&#x1f374', keyword: 'fork and knife' },
    4: { code: '&#x1f944', keyword: 'spoon' },
    5: { code: '&#x1f52a', keyword: 'knife' }
}

const pairing = {
    name: 'pairing',
    1: { code: '&#x1f95b', keyword: 'milk' },
    2: { code: '&#x2615', keyword: 'coffee' },
    3: { code: '&#x1f375', keyword: 'tea' },
    4: { code: '&#x1f376', keyword: 'sake' },
    5: { code: '&#x1f37e', keyword: 'champagne' },
    6: { code: '&#x1f377', keyword: 'red wine' },
    7: { code: '&#x1f378', keyword: 'martini' },
    8: { code: '&#x1f379', keyword: 'cocktail' },
    9: { code: '&#x1f37a', keyword: 'beer' },
    10: { code: '&#x1f943', keyword: 'liquor' },
    11: { code: '&#x1f964', keyword: 'pop' }
}

const dessert = {
    name: 'dessert',
    1: { code: '&#x1f366', keyword: 'soft ice cream' },
    2: { code: '&#x1f367', keyword: 'snow cone' },
    3: { code: '&#x1f368', keyword: 'ice cream' },
    4: { code: '&#x1f369', keyword: 'donut' },
    5: { code: '&#x1f36a', keyword: 'cookie' },
    6: { code: '&#x1f382', keyword: 'ice cream cake' },
    7: { code: '&#x1f370', keyword: 'cake' },
    8: { code: '&#x1f967', keyword: 'pie' },
    9: { code: '&#x1f36b', keyword: 'chocolate' },
    10: { code: '&#x1f36c', keyword: 'candy' },
    11: { code: '&#x1f36d', keyword: 'lollipop' },
    12: { code: '&#x1f36e', keyword: 'custard' }
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const generate = (type) => {
    //console.log('generating ' + type.name);
    let list = document.getElementById(type.name);
    // Handle object length conundrum
    let num = Math.ceil(Math.random() * Object.keys(type).length - 1);
    if (num < 1) {
        num = 1;
    }
    let emoji = document.createElement('span');
    emoji.setAttribute('class', 'search emoji');
    emoji.innerHTML = type[num]['code'];
    emoji.setAttribute('keyword', type[num]['keyword']);
    list.appendChild(emoji);

    //console.log(type.name, num, type[num]['keyword']);
}

function findMe(keyword) {
    console.log('finding you...');
    var searchTerm = keyword;
    if (!navigator.geolocation) {
        output.innerHTML = "(geolocation is not supported by your browser)";
        return;
    }
    function success(position) {
        console.log('found you');
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 12
        });
        // Search Google Maps nearby
        var infoWindow = new google.maps.InfoWindow({
            content: 'You are here.'
        });
        infoWindow.setPosition(pos);
        infoWindow.open(map);
        map.setCenter(pos);
        var service = new google.maps.places.PlacesService(map, pos);
        console.log('I\'m searching with: ' + keyword);
        service.textSearch({
            location: pos,
            radius: 500,
            query: keyword,
            openNow: true
        }, showPlaces)

        function showPlaces(results) {
            for (result in results) {
                createMarker(results[result]);
            }
        }

        // marker can be emoji?
        function createMarker(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });

            google.maps.event.addListener(marker, 'click', function () {
                var infoWindow = new google.maps.InfoWindow({
                    content: '<span class="placename">' + place.name + '</span><br /><span class="placeaddress">' + place.formatted_address + '</span><br /><span class="opennow">Open now</span>'
                });
                infoWindow.open(map, this);
            });
        }
    }

    function error(error) {
        console.log(error)
    }
    navigator.geolocation.getCurrentPosition(success, error);
}

$(document).ready(() => {
    let times = 1;
    $('.number').click(function (event) {
        let num = parseInt($(this).attr('value'));
        switch (num) {
            case 1: times = 1; break;
            case 2: times = 2; break;
            case 3: times = 3; break;
            case 4: times = 4; break;
        }
        $('.number').removeClass('selected');
        $(this).addClass('selected');
        console.log(this);
        return times;
    })

    $('#go').click(function (event) {
        console.log('Ok, go!');
        $('.ask').slideUp(500);
        [...Array(times)].forEach((_, i) => {
            generate(ingredient);
        });
        generate(method);
        generate(pairing);
        generate(dessert);
    });

    $('.result').on('click', '.search', function (event) {
        //console.log('click!');
        let keyword = $(this).attr('keyword');
        $('#map').slideDown(500);
        findMe(keyword);
    });

    $('#reset').on('click', async function refresh(e) {
        e.preventDefault();
        let target = $('#top');
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 500);
        await sleep(500);
        $('.ask').slideDown(500);
        $('.result').empty();
    })
});