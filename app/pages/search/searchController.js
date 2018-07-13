'use strict';
var app = angular.module('myApp');
app.controller('searchController', controller);

function controller($scope, $rootScope, searchService, $location, $localStorage, ngDialog) {
    $scope.listSelect = $localStorage.listSelect;
    if($localStorage.listSelect==undefined){
        $scope.listSelect=[];
    }
    if($localStorage.Trains==undefined||$localStorage.Trains['ONE_WAY']==undefined||$localStorage.Trains['ONE_WAY']==null){
        window.location = "/#/home";
    }
    $scope.Trains_ONE_WAY = $localStorage.Trains['ONE_WAY'];
    $scope.Trains_Multil = $localStorage.Trains['Multil_WAY'];
    $scope.searchData = $localStorage.searchData;

    $scope.DetailsTicket = [];
    $scope.Trains_ONE_WAY.forEach(function (entry) {
        entry.timeStartFilter = entry.scheduleTrainSet.filter(function (item) {
            return item.locationStart == $scope.searchData.tenGaDi;
        })[0].timeStart;

        entry.timeEndFilter = entry.scheduleTrainSet.filter(function (item) {
            return item.locationEnd == $scope.searchData.tenGaDen;
        })[0].timeEnd;

    });
    if($scope.Trains_Multil!=undefined&&$scope.Trains_Multil!=null){
        $scope.Trains_Multil.forEach(function (entry) {
            entry.timeStartFilter = entry.scheduleTrainSet.filter(function (item) {
                return item.locationStart == $scope.searchData.tenGaDen;
            })[0].timeStart;

            entry.timeEndFilter = entry.scheduleTrainSet.filter(function (item) {
                return item.locationEnd == $scope.searchData.tenGaDi;
            })[0].timeEnd;

        });
    }

    $scope.showDetails = function (train) {
        $scope.chairTrainDetails = train;
    };

    $scope.showDetailsMultil = function (train) {
        $scope.chairTrainDetailsMultil = train;
    };

    $scope.doiChuyen = function (tau) {
        $scope.selectTau = tau.id;
        $scope.TrainDetail = tau.trainDetailSet;
        console.log($scope.TrainDetail)


    };

    $scope.doiChuyenMultil = function (tau) {
        $scope.selectTauMultil = tau.id;
        $scope.TrainDetailMultil = tau.trainDetailSet;

    };


    $scope.clickChair = function (chair, chairTrainDetails, isSelect) {

        if (chair.byTicket == true) {
            $scope.chairSelect = chair;
            $scope.chairTrainDetails = chairTrainDetails;
            var details = $scope.getDetailsTicket();
            var index = $scope.listSelect.map(function (object) {
                return object.id + object.numberCar + object.numberChair;
            }).indexOf(details.id + details.numberCar + details.numberChair);

            if (isSelect) {
                $scope.listSelect.push(details);
                chair.select = true;
            } else {
                if (index >= 0) {
                    chair.select = false;
                    $scope.listSelect.splice(index, 1);
                }
            }
            $localStorage.listSelect = $scope.listSelect;
        }
    };

    $scope.clickChairMultil = function (chair, chairTrainDetailsMultil, isSelect) {
        $scope.listSelect = $localStorage.listSelect;
        if ($scope.listSelect == undefined) {
            $scope.listSelect = [];
        }
        if (chair.byTicket == true) {
            $scope.chairSelectMultil = chair;
            $scope.chairTrainDetailsMultil = chairTrainDetailsMultil;
            var details = $scope.getDetailsTicketMultil();
            if ($localStorage.listSelect == undefined && $localStorage.listSelect == null) {
                $localStorage.listSelect = [];
            }
            var index = $scope.listSelect.map(function (object) {
                return object.id + object.numberCar + object.numberChair;
            }).indexOf(details.id + details.numberCar + details.numberChair);

            if (isSelect) {
                $scope.listSelect.push(details);
                chair.select = true;
            } else {
                if (index >= 0) {
                    chair.select = false;
                    $scope.listSelect.splice(index, 1);
                }
            }
            $localStorage.listSelect = $scope.listSelect;
        }
    };
    $scope.getDetailsTicket = function () {
        $scope.DetailsTicket = {};
        if ($scope.chairSelect != null) {
            $scope.chairSelect = $scope.chairSelect;
            $scope.DetailsTicket['numberChair'] = $scope.chairSelect.numberChair;
            $scope.DetailsTicket['price'] = $scope.chairSelect.price;
        }
        if ($scope.chairTrainDetails != null) {
            $scope.chairTrainDetails = $scope.chairTrainDetails;
            $scope.DetailsTicket['numberCar'] = $scope.chairTrainDetails.numberCar;
        }
        if ($localStorage.searchData != null) {
            $scope.searchData = $localStorage.searchData;
            $scope.DetailsTicket['tenGaDi'] = $scope.searchData.tenGaDi;
            $scope.DetailsTicket['tenGaDen'] = $scope.searchData.tenGaDen;
        }
        if ($localStorage.Trains != null) {
            $scope.Trains = $localStorage.Trains;

            var index = $scope.Trains_ONE_WAY.map(function (object) {
                return object.id;
            }).indexOf($scope.chairTrainDetails.idTrain);
            $scope.train = $scope.Trains_ONE_WAY[index];

            $scope.DetailsTicket['id'] = $scope.train.id;
            $scope.DetailsTicket['name'] = $scope.train.name;

            $scope.DetailsTicket['timeStartFilter'] = $scope.train.scheduleTrainSet.filter(function (item) {
                return item.locationStart == $scope.searchData.tenGaDi;
            })[0].timeStart;

            $scope.DetailsTicket['timeEndFilter'] = $scope.train.scheduleTrainSet.filter(function (item) {
                return item.locationEnd == $scope.searchData.tenGaDen;
            })[0].timeEnd;
        }
        return $scope.DetailsTicket;
    };


    $scope.getDetailsTicketMultil = function () {
        $scope.DetailsTicket = {};
        if ($scope.chairSelectMultil != null) {
            $scope.DetailsTicket['numberChair'] = $scope.chairSelectMultil.numberChair;
            $scope.DetailsTicket['price'] = $scope.chairSelectMultil.price;
        }
        if ($scope.chairTrainDetailsMultil != null) {
            $scope.chairTrainDetailsMultil = $scope.chairTrainDetailsMultil;
            $scope.DetailsTicket['numberCar'] = $scope.chairTrainDetailsMultil.numberCar;
        }
        if ($localStorage.searchData != null) {
            $scope.searchData = $localStorage.searchData;
            $scope.DetailsTicket['tenGaDi'] = $scope.searchData.tenGaDen;
            $scope.DetailsTicket['tenGaDen'] = $scope.searchData.tenGaDi;
        }
        if ($localStorage.Trains['Multil_WAY'] != null) {
            $scope.Trains_Multil = $localStorage.Trains['Multil_WAY'];

            var index = $scope.Trains_Multil.map(function (object) {
                return object.id;
            }).indexOf($scope.chairTrainDetailsMultil.idTrain)
            $scope.train = $scope.Trains_Multil[index];

            $scope.DetailsTicket['id'] = $scope.train.id;
            $scope.DetailsTicket['name'] = $scope.train.name;

            $scope.DetailsTicket['timeStartFilter'] = $scope.train.scheduleTrainSet.filter(function (item) {
                return item.locationStart == $scope.searchData.tenGaDen;
            })[0].timeStart;

            $scope.DetailsTicket['timeEndFilter'] = $scope.train.scheduleTrainSet.filter(function (item) {
                return item.locationEnd == $scope.searchData.tenGaDi;
            })[0].timeEnd;
        }
        return $scope.DetailsTicket;
    };
    $scope.testShow = function () {
        ngDialog.open({
            template: 'pages/dialogs/dialog-detail-chair.html',
            className: 'ngdialog-theme-default',
            controller: 'DialogController',
            scope: $scope,
            controllerAs: 'dialogCtrl',
            width: 1000,

        });
    }

}