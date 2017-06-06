(function () {
  'use strict';

  angular
    .module('eliteApp')
    .controller('StandingsController', ['EliteApi', TeamsController]);

  function TeamsController(EliteApi) {
    var self = this;

    init();

    function init() {
      EliteApi.getLeagueData().then(function (data) {
        self.standings = data.standings;
      });
    }
  }
})();
