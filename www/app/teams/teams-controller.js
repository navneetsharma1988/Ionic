(function () {
  'use strict';

  angular
    .module('eliteApp')
    .controller('TeamsController', ['EliteApi', '$scope', TeamsController]);

  function TeamsController(EliteApi, $scope) {
    var self = this;

        self.loadList = function(forceRefresh) {
          EliteApi.getLeagueData(forceRefresh).then(function(data) {
                self.teams = data.teams;
            }).finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        self.loadList(false);
    };
})();
