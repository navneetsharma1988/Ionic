(function () {
  'use strict';

  angular
    .module('eliteApp')
    .controller('RulesController', ['EliteApi',RulesController]);

  function RulesController(EliteApi) {
    var self = this;

    init();

    function init() {
      EliteApi.getLeagueData().then(function (data) {
        self.mainContent = data.league.rulesScreen;
      });
    }
  }
})();
