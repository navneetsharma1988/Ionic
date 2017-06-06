(function () {
  'use strict';

  angular
    .module('eliteApp')
    .controller('LocationsController', ['EliteApi',LocationsController]);

  function LocationsController(EliteApi) {
    var self = this;

    init();

    function init() {
      var data = EliteApi.getLeagueData();
      self.locations = data.locations;
    }


  }
})();
