(function () {
  'use strict';

  angular
    .module('eliteApp')
    .controller('LocationMapController', ['$stateParams', 'EliteApi', LocationMapController]);

  function LocationMapController($stateParams, EliteApi) {
    var self = this;

    init();

    function init() {
      self.locationId = Number($stateParams.id);

      self.map = {
        center: {
          latitude: 38.897677,
          longitude: -77.036530
        },
        zoom: 12
      };

      self.marker = {};

      EliteApi.getLeagueData().then(function (data) {
        self.location = _.find(data.locations, {id: self.locationId});

        self.marker = {
          latitude: self.location.latitude,
          longitude: self.location.longitude,
          title: self.location.name + "<br/>(Tap for direction)",
          showWindow: true
        };

        self.map.center.latitude = self.location.latitude;
        self.map.center.longitude = self.location.longitude;
      });
    }

    self.locationClicked = function (marker) {
      window.location = "geo:" + marker.latitude + "," + marker.longitude + ";u=35";
    };
  }
})();
