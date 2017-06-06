(function () {
  'use strict';

  angular
    .module('eliteApp')
    .controller('LocationsController', ['EliteApi',LocationsController]);

  function LocationsController(EliteApi) {
    var self = this;

    init();

    function init() {
      EliteApi.getLeagueData().then(function (data) {
        self.locations = data.locations;
      });
    }
  }
})();
