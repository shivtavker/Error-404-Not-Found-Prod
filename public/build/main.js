webpackJsonp([0],{

/***/ 113:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationModal; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_location_service__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LocationModal = (function () {
    function LocationModal(viewCtrl, zone, locationService, geolocation) {
        this.viewCtrl = viewCtrl;
        this.zone = zone;
        this.locationService = locationService;
        this.geolocation = geolocation;
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        // prettier-ignore-next-statement
        this.geocoder = new google.maps.Geocoder();
        this.autocomplete = { input: '' };
        this.autocompleteItems = [];
    }
    LocationModal.prototype.updateSearchResults = function () {
        var _this = this;
        if (this.autocomplete.input == '') {
            this.autocompleteItems = [];
            return;
        }
        this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input }, function (predictions, status) {
            _this.autocompleteItems = [];
            _this.zone.run(function () {
                predictions.forEach(function (prediction) {
                    _this.autocompleteItems.push(prediction);
                });
            });
        });
    };
    LocationModal.prototype.selectSearchResult = function (result) {
        var _this = this;
        this.geocoder.geocode({ placeId: result.place_id }, function (results, status) {
            if (status === 'OK' && results[0]) {
                var position = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                };
                console.log(results[0]);
                var address = results[0]['address_components'][1]['long_name'];
                _this.updateLocation(position, address);
            }
        });
    };
    LocationModal.prototype.updateLocation = function (position, address) {
        this.locationService.updateLocation(position, address);
        this.locationService.updateSafePlace(position);
        this.dismiss();
    };
    LocationModal.prototype.getCurrentLocation = function () {
        var _this = this;
        this.geolocation
            .getCurrentPosition()
            .then(function (location) {
            var position = {
                lat: location['coords']['latitude'],
                lng: location['coords']['longitude'],
            };
            _this.geocoder.geocode({ location: position }, function (results, status) {
                if (status === 'OK' && results[0]) {
                    var address = results[0]['address_components'][1]['long_name'];
                    _this.updateLocation(position, address);
                }
            });
        })
            .catch(function (err) {
            alert({ msg: 'Error getting Current Location', error: err });
        });
    };
    LocationModal.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    LocationModal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-location-modal',template:/*ion-inline-start:"C:\Users\Shiv Tavker\Documents\Error-404-Not-Found\Client\src\modals\location-modal\location-modal.html"*/`<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Select Your Location\n\n    </ion-title>\n\n     <span class="cancel-button" (click) = "dismiss()"><b>Cancel</b></span>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="no-scroll">\n\n    <button ion-button color="light" style="margin-bottom: 0px;" (click)="getCurrentLocation()" full>\n\n        <ion-icon name="pin" isActive="true" style="color: red;"></ion-icon>\n\n        <span style="margin: 15px;">Use Current Location</span>\n\n    </button>\n\n    <ion-toolbar color="light">\n\n        <ion-searchbar [(ngModel)]="autocomplete.input" (ionInput)="updateSearchResults()" placeholder="Search for a place"></ion-searchbar>\n\n    </ion-toolbar>\n\n    <ion-list [hidden]="autocompleteItems.length == 0">\n\n        <ion-item *ngFor="let item of autocompleteItems" tappable (click)="selectSearchResult(item)">\n\n            {{ item.description }}\n\n        </ion-item>\n\n    </ion-list>\n\n</ion-content>`/*ion-inline-end:"C:\Users\Shiv Tavker\Documents\Error-404-Not-Found\Client\src\modals\location-modal\location-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_3__services_location_service__["a" /* LocationService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
    ], LocationModal);
    return LocationModal;
}());

//# sourceMappingURL=loaction-modal.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__navigate_navigate__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__weather_weather__ = __webpack_require__(204);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__weather_weather__["a" /* WeatherPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__navigate_navigate__["a" /* NavigatePage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Shiv Tavker\Documents\Error-404-Not-Found\Client\src\pages\tabs\tabs.html"*/`<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Weather" tabIcon="cloudy-night"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Safe Place" tabIcon="navigate"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Guide Book" tabIcon="bookmarks"></ion-tab>\n</ion-tabs>\n`/*ion-inline-end:"C:\Users\Shiv Tavker\Documents\Error-404-Not-Found\Client\src\pages\tabs\tabs.html"*/,
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavigatePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_location_service__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavigatePage = (function () {
    function NavigatePage(navCtrl, locationService) {
        this.navCtrl = navCtrl;
        this.locationService = locationService;
    }
    NavigatePage.prototype.ionViewDidLoad = function () {
        this.loadMap();
        if (!this.locationService.atSafePlace)
            this.startNavigating();
    };
    NavigatePage.prototype.loadMap = function () {
        var mapOptions = {
            center: this.locationService.location,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            scaleControl: false,
            zoomControl: false,
            streetViewControl: false,
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    };
    NavigatePage.prototype.startNavigating = function () {
        // let safe_marker = new google.maps.Marker({
        //   map: this.map,
        //   animation: google.maps.Animation.DROP,
        //   position: this.locationService.safePlace,
        // });
        // let curr_marker = new google.maps.Marker({
        //   map: this.map,
        //   animation: google.maps.Animation.DROP,
        //   position: this.locationService.location,
        // });
        // safe_marker.setIcon(
        //   'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        // );
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer({
            preserveViewport: true,
        });
        directionsDisplay.setMap(this.map);
        directionsDisplay.setPanel(this.directionsPanel.nativeElement);
        directionsService.route({
            origin: this.locationService.location,
            destination: this.locationService.safePlace,
            travelMode: google.maps.TravelMode['DRIVING'],
        }, function (res, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(res);
            }
            else {
                console.warn(status);
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], NavigatePage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('directionsPanel'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], NavigatePage.prototype, "directionsPanel", void 0);
    NavigatePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-tab-navigation',template:/*ion-inline-start:"C:\Users\Shiv Tavker\Documents\Error-404-Not-Found\Client\src\pages\navigate\navigate.html"*/`<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Safe Place Navigation\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card *ngIf="!locationService.atSafePlace">\n    <ion-card-content>\n      <div #directionsPanel class="directionPanel">\n      </div>\n    </ion-card-content>\n  </ion-card>\n\n  <div class="safePanel" *ngIf="locationService.atSafePlace && !locationService.everywhereFlood">\n    <b style="font-size: 20px;">\n      You are at a Safe Place\n    </b>\n  </div>\n  <div class="alertPanel" *ngIf="locationService.atSafePlace && locationService.everywhereFlood">\n    <b style="font-size: 20px;">\n      No Safe Place Found, Read Guide Book and Take Utmost Care.\n    </b>\n  </div>\n  <div #map id="map"></div> \n</ion-content>\n`/*ion-inline-end:"C:\Users\Shiv Tavker\Documents\Error-404-Not-Found\Client\src\pages\navigate\navigate.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__services_location_service__["a" /* LocationService */]])
    ], NavigatePage);
    return NavigatePage;
}());

//# sourceMappingURL=navigate.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"C:\Users\Shiv Tavker\Documents\Error-404-Not-Found\Client\src\pages\contact\contact.html"*/`<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Guide Book\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content class="home" scrollbar-y-auto>\n  <ion-grid>\n    <ion-row>\n      <ion-col width-50 offset-25>\n        <h2 class="location">Flood</h2>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n        <ul class="custom-list">\n          <li class="custom-item">Pack a bag with important items in case you need to evacuate. Don\'t forget to include needed medications.</li>\n          <li class="custom-item">If there is any possibility of a flash flood, move immediately to higher ground.</li>\n          <li class="custom-item">If possible, bring in outdoor furniture and move essential items to an upper floor.</li>\n          <li class="custom-item">Turn off utilities at the main switches or valves if instructed to do so. Disconnect electrical appliances.</li>\n          <li class="custom-item">If you have to walk in water, wherever possible, walk where the water is not moving. Use a stick to check the firmness of the ground in front of you.</li>\n          <li class="custom-item">Do not drive into flooded areas. If floodwaters rise around your car, abandon the car and move to higher ground if you can do so safely.</li>\n          <li class="custom-item">Be aware of areas where floodwaters have receded. Roads may have weakened and could collapse under the weight of a car.</li>\n          <li class="custom-item">Stay away from downed power lines, and report them to the power company.</li>\n          <li class="custom-item">Clean and disinfect everything that got wet. Mud left from flood water can contain sewage and chemicals.</li>\n        </ul>\n    </ion-row>\n    <ion-row>\n      <ion-col width-50 offset-25>\n        <h2 class="location">Earthquake</h2>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n        <ul class="custom-list">\n          <li class="custom-item">Keep several flashlights in easily accessible places around the house.</li>\n          <li class="custom-item">Determine safe spaces away from windows in each room of your home. Choose spots where it is unlikely something will fall on you.</li>\n          <li class="custom-item">Prepare a disaster kit. Stock up on canned food, a first-aid kit, few gallons of water, dust masks, goggles, battery-operated radio and flashlights.</li>\n          <li class="custom-item">Drop down and take cover under a desk or table. Be prepared to hold on until the shaking stops.</li>\n          <li class="custom-item">Stay inside until the shaking stops and it is safe to exit.</li>\n          <li class="custom-item">Stay away from bookcases and other furniture that can fall on you.</li>\n          <li class="custom-item">If you are in bed – hold on and stay there. Protect your head with a pillow to protect yourself from flying glass and other debris.</li>\n          <li class="custom-item">If you are in a wheelchair – go to a safe position and lock the wheels. Stay where you are and cover your head and neck with your arms.</li>\n          <li class="custom-item">Drop to the ground in a clear spot away from buildings, trees and power lines.</li>\n        </ul>\n    </ion-row>\n    <ion-row>\n      <ion-col width-50 offset-25>\n        <h2 class="location">Lightning</h2>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n        <ul class="custom-list">\n          <li class="custom-item">If the weather forecast calls for thunderstorms, postpone your trip or activity.</li>\n          <li class="custom-item">When thunder roars, go indoors. Find a safe, enclosed shelter.</li>\n          <li class="custom-item">After you see lightning, start counting to 30. If you hear thunder before you reach 30, go indoors. Suspend activities for at least 30 minutes after the last clap of thunder.</li>\n          <li class="custom-item">If no shelter is available, crouch low, with as little of your body touching the ground as possible.</li>\n          <li class="custom-item">Stay away from concrete floors or walls. Lightning can travel through any metal wires or bars in concrete walls or flooring.</li>\n          <li class="custom-item">Avoid water during a thunderstorm. Lightning can travel through plumbing.</li>\n          <li class="custom-item">Avoid electronic equipment of all types. Lightning can travel through electrical systems and radio and television reception systems.</li>\n          <li class="custom-item">Avoid corded phones. Cordless or cellular phones are safe to use during a storm.</li>\n          <li class="custom-item">Drop to the ground in a clear spot away from buildings, trees and power lines.</li>\n        </ul>\n    </ion-row>\n  </ion-grid>\n</ion-content>`/*ion-inline-end:"C:\Users\Shiv Tavker\Documents\Error-404-Not-Found\Client\src\pages\contact\contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WeatherPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_location_service__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WeatherPage = (function () {
    function WeatherPage(navCtrl, locationService) {
        this.navCtrl = navCtrl;
        this.locationService = locationService;
    }
    WeatherPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-weather-tab',template:/*ion-inline-start:"C:\Users\Shiv Tavker\Documents\Error-404-Not-Found\Client\src\pages\weather\weather.html"*/`<ion-header>\n  <ion-navbar>\n    <ion-title>Weather Predictions</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="home" >\n  <div class="alertPanel" *ngIf="locationService.locationWeatherAvailable && locationService.locationWeather.flood">\n    <strong>Flood Alert</strong>\n  </div>\n  <ion-grid *ngIf="locationService.locationWeatherAvailable">\n    <ion-row>\n      <ion-col width-50 offset-25>\n        <h2 class="location"> {{locationService[\'address\']}}</h2>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col width-100>\n        <ion-list>\n          <ion-item>\n            <strong>Temperature:</strong> &nbsp; {{locationService[\'locationWeather\'][\'temp\']}} &#8451;\n             <!--&#8451-->\n          </ion-item>\n          <ion-item>\n              <strong>Relative Humidity:</strong> &nbsp; {{locationService[\'locationWeather\'][\'humidity\']}}\n          </ion-item>\n          <ion-item>\n              <strong>Precip Intensity for a Week:</strong> &nbsp; {{locationService[\'locationWeather\'][\'precipint\']}} <strong>mm/Hr</strong>\n          </ion-item>\n          <ion-item class="safe-place-item" *ngIf="!locationService.atSafePlace">\n              <strong>Safe Place:</strong> &nbsp; {{locationService[\'safePlaceAddress\']}}\n          </ion-item>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n`/*ion-inline-end:"C:\Users\Shiv Tavker\Documents\Error-404-Not-Found\Client\src\pages\weather\weather.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__services_location_service__["a" /* LocationService */]])
    ], WeatherPage);
    return WeatherPage;
}());

//# sourceMappingURL=weather.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(227);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_navigate_navigate__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_weather_weather__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modals_location_modal_loaction_modal__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_location_service__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_navigate_navigate__["a" /* NavigatePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_weather_weather__["a" /* WeatherPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_10__modals_location_modal_loaction_modal__["a" /* LocationModal */],
            ],
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                })],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_navigate_navigate__["a" /* NavigatePage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_weather_weather__["a" /* WeatherPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_10__modals_location_modal_loaction_modal__["a" /* LocationModal */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_11__services_location_service__["a" /* LocationService */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
            ],
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modals_location_modal_loaction_modal__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(201);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, modalCtrl) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            _this.presentLocationModal();
        });
    }
    MyApp.prototype.presentLocationModal = function () {
        var locationModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modals_location_modal_loaction_modal__["a" /* LocationModal */]);
        locationModal.present();
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Shiv Tavker\Documents\Error-404-Not-Found\Client\src\app\app.html"*/`<ion-nav [root]="rootPage"></ion-nav>\n`/*ion-inline-end:"C:\Users\Shiv Tavker\Documents\Error-404-Not-Found\Client\src\app\app.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DomainUrl = 'https://error-404-not-found.azurewebsites.net/api/';
var LocationService = (function () {
    function LocationService(httpClient, loadingCtrl) {
        this.httpClient = httpClient;
        this.loadingCtrl = loadingCtrl;
        this.location = {
            lat: 0,
            lng: 0,
        };
        this.safePlace = {
            lat: 0,
            lng: 0,
        };
        this.locationWeatherAvailable = false;
        this.atSafePlace = true;
        this.everywhereFlood = false;
        this.loading = this.loadingCtrl.create({
            spinner: 'crescent',
            content: 'Loading Please Wait...',
        });
        this.geocoder = new google.maps.Geocoder();
    }
    LocationService.prototype.updateLocation = function (position, address) {
        this.location = position;
        this.address = address;
        this.locationWeatherAvailable = false;
        this.loading.present();
        this.getLocationWeather(this.location);
    };
    LocationService.prototype.updateSafePlace = function (position) {
        this.safePlace = position;
    };
    LocationService.prototype.getLocationWeather = function (location) {
        var _this = this;
        var queryUrl = DomainUrl + ("mldata/?location=" + location.lat + "," + location.lng);
        this.httpClient.get(queryUrl).subscribe(function (weathers) {
            weathers.forEach(function (weather) {
                if (weather.lat == location.lat && weather.lng == location.lng) {
                    _this.locationWeather = weather;
                    _this.locationWeatherAvailable = true;
                }
            });
            if (_this.locationWeather.flood) {
                weathers.forEach(function (weather) {
                    if (!weather.flood) {
                        _this.safePlace = {
                            lat: weather.lat,
                            lng: weather.lng,
                        };
                        _this.atSafePlace = false;
                        _this.geocoder.geocode({ location: _this.safePlace }, function (results, status) {
                            if (status === 'OK' && results[0]) {
                                _this.safePlaceAddress =
                                    results[0]['address_components'][1]['long_name'] +
                                        ', ' +
                                        results[0]['address_components'][1]['long_name'] +
                                        ', ' +
                                        results[0]['address_components'][2]['long_name'];
                            }
                        });
                    }
                    else
                        _this.everywhereFlood = true;
                });
            }
            _this.loading.dismiss();
        });
    };
    LocationService.prototype.safePlaceAddressAvail = function () {
        if (this.safePlaceAddress)
            return true;
        return false;
    };
    LocationService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* LoadingController */]) === "function" && _b || Object])
    ], LocationService);
    return LocationService;
    var _a, _b;
}());

//# sourceMappingURL=location.service.js.map

/***/ })

},[205]);
//# sourceMappingURL=main.js.map