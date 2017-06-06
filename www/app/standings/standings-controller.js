(function () {
  'use strict';

  angular
    .module('eliteApp')
    .controller('StandingsController', ['EliteApi',TeamsController]);

  function TeamsController(EliteApi) {
    var self = this;

    init();

    function init() {
      var data = EliteApi.getLeagueData();
      self.standings = data.standings;
    }


  }
})();
