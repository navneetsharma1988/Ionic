(function () {
  'use strict';

  angular
    .module('eliteApp')
    .factory('EliteApi', ['$http', '$q', '$ionicLoading', '$timeout', EliteApi]);

  function EliteApi($http, $q, $ionicLoading, $timeout) {

    var currentLeagueId;

    function getLeagues() {
      var deferred = $q.defer();

      $ionicLoading.show({template: 'Loading...'});
      $http.get("http://elite-schedule.net/api/leaguedata")
        .success(function (data) {
          $ionicLoading.hide();
          deferred.resolve(data);
        })
        .error(function () {
          console.log("Error while making HTTP call.");
          $ionicLoading.hide();
          deferred.reject(data);
        });
      return deferred.promise;
    }

    function getLeagueData() {
      var deferred = $q.defer();
      $ionicLoading.show({template: 'Loading...'});
      $http.get("http://elite-schedule.net/api/leaguedata/" + currentLeagueId)
        .success(function (data, status) {
          console.log("Received schedule data via HTTP.", data, status);
          $timeout(function () {
            $ionicLoading.hide();
            deferred.resolve(data);
          }, 3000);

        })
        .error(function () {
          console.log("Error while making HTTP call.");
          $ionicLoading.hide();
          deferred.reject();
        });
      return deferred.promise;
    }

    function setLeagueId(leagueId) {
      currentLeagueId = leagueId;
    }

    return {
      getLeagues: getLeagues,
      getLeagueData: getLeagueData,
      setLeagueId: setLeagueId
    }
  }

})();
