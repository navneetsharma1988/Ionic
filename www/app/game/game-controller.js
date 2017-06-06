(function () {
  'use strict';

  angular
    .module('eliteApp')
    .controller('GameController', ['EliteApi', '$stateParams',GameController]);

  function GameController(EliteApi, $stateParams) {
    var self = this;

    init();

    function init() {
      var gameId = Number($stateParams.id);
      var data = EliteApi.getLeagueData();

      self.game = _.find(data.games, {"id": gameId});
    }
  }
})();
