'use strict';
var app = angular.module('myApp');
app.controller('searchController', controller);

function controller($scope, $rootScope, searchService, $location, $localStorage, ngDialog, $timeout) {
    $scope.listSelectALL = [];
    var socket = new SockJS(baseConfig.protocol + baseConfig.server + baseConfig.standardServicePort + baseConfig.baseUrlEnding + 'websocket');
    var stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/allSelectChair', function (greeting) {
            $localStorage.listSelectALL = JSON.parse(greeting.body);
            $scope.listSelectALL = $localStorage.listSelectALL;

            //get data mới nhất
            searchService.getListTrain($scope.searchData).then(function (data) {
                if (data == null || data == undefined || data == '') {
                    $scope.mess = mess.not_find;
                } else {
                    $localStorage.searchData = $scope.searchData;
                    $localStorage.Trains = data;


                    //set data mới nhất vào
                    $scope.Trains_ONE_WAY = $localStorage.Trains['ONE_WAY'];
                    $scope.Trains_Multil = $localStorage.Trains['Multil_WAY'];
                    //set value tìm kiếm
                    $scope.searchData = $localStorage.searchData;

                    $scope.DetailsTicket = [];
                    //set time hiển thị
                    $scope.Trains_ONE_WAY.forEach(function (entry) {
                        entry.timeStartFilter = entry.scheduleTrainSet.filter(function (item) {
                            return item.locationStart == $scope.searchData.tenGaDi;
                        })[0].timeStart;

                        entry.timeEndFilter = entry.scheduleTrainSet.filter(function (item) {
                            return item.locationEnd == $scope.searchData.tenGaDen;
                        })[0].timeEnd;
                    });
                    if ($scope.infoDoiChuyen != null) {
                        //lấy về index Train
                        var indexTrain = $scope.Trains_ONE_WAY.map(function (object) {
                            return object.id;
                        }).indexOf($scope.infoDoiChuyen['tau'].id);
                        var train_Trains_ONE_WAY = $scope.Trains_ONE_WAY[indexTrain];
                        $scope.doiChuyen(train_Trains_ONE_WAY);

                        var indexTrainDetail = train_Trains_ONE_WAY.trainDetailSet.map(function (object) {
                            return object.numberCar;
                        }).indexOf($scope.chairTrainDetails.numberCar);
                        $scope.showDetails(train_Trains_ONE_WAY.trainDetailSet[indexTrainDetail]);
                        //

                    }

                    //

                    if ($scope.Trains_Multil != undefined && $scope.Trains_Multil != null) {

                        $scope.Trains_Multil.forEach(function (entry) {
                            entry.timeStartFilter = entry.scheduleTrainSet.filter(function (item) {
                                return item.locationStart == $scope.searchData.tenGaDen;
                            })[0].timeStart;

                            entry.timeEndFilter = entry.scheduleTrainSet.filter(function (item) {
                                return item.locationEnd == $scope.searchData.tenGaDi;
                            })[0].timeEnd;

                        });
                        if ($scope.infoDoiChuyenMultil != null) {

                            //lấy về index Train
                            var indexTrain = $scope.Trains_Multil.map(function (object) {
                                return object.id;
                            }).indexOf($scope.infoDoiChuyenMultil['tau'].id);
                            var train_Trains_MULTIL_WAY = $scope.Trains_Multil[indexTrain];
                            $scope.doiChuyenMultil(train_Trains_MULTIL_WAY);

                            var indexTrainDetail = train_Trains_MULTIL_WAY.trainDetailSet.map(function (object) {
                                return object.numberCar;
                            }).indexOf($scope.chairTrainDetailsMultil.numberCar);
                            $scope.showDetailsMultil(train_Trains_MULTIL_WAY.trainDetailSet[indexTrainDetail]);
                        }

                    }


                }


            });


        });
    });
    if ($localStorage.listSelect == undefined) {
        $scope.listSelect = [];
    }
    if ($localStorage.Trains == undefined || $localStorage.Trains['ONE_WAY'] == undefined || $localStorage.Trains['ONE_WAY'] == null) {
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
    if ($scope.Trains_Multil != undefined && $scope.Trains_Multil != null) {
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

    $scope.doiChuyen = function (tau, isClick) {
        if (isClick != undefined && isClick == true) {
            $scope.chairTrainDetails = null;
        }

        $scope.infoDoiChuyen = [];
        $scope.infoDoiChuyen['tau'] = tau;
        $scope.selectTau = tau.id;
        $scope.TrainDetail = tau.trainDetailSet;

    };

    $scope.doiChuyenMultil = function (tau, isClick) {
        if (isClick != undefined && isClick == true) {
            $scope.chairTrainDetailsMultil = null;
        }

        $scope.infoDoiChuyenMultil = [];
        $scope.infoDoiChuyenMultil['tau'] = tau;

        $scope.selectTauMultil = tau.id;
        $scope.TrainDetailMultil = tau.trainDetailSet;

    };

    $scope.checkChair = function (id, numberCar, numberChair) {
        var index = $scope.listSelect.map(function (object) {
            return object.id + "" + object.numberCar + "" + object.numberChair;
        }).indexOf(id + "" + numberCar + "" + numberChair);
        if (index >= 0) {
            return true;
        } else {
            return false;
        }
    };
    /*    setInterval(function () {
            stompClient.send("/app/hello", {}, JSON.stringify({"get": true}));
        }, 800);*/


    $scope.clickChair = function (chair, chairTrainDetails) {
        var isSelect;
        $scope.chairSelect = chair;
        $scope.chairTrainDetails = chairTrainDetails;
        var details = $scope.getDetailsTicket();
        var index1 = $scope.listSelect.map(function (object) {
            return object.id + "" + object.numberCar + "" + object.numberChair;
        }).indexOf(details.id + "" + details.numberCar + "" + details.numberChair);
        if (index1 < 0) {
            isSelect = true;
        }
        var checkIsSelect = $scope.checkChair(chairTrainDetails.idTrain, chairTrainDetails.numberCar, chair.numberChair)

        if (chair.byTicket == true && (checkIsSelect || chair.status == 0)) {

            var index = $scope.listSelect.map(function (object) {
                return object.id + "" + object.numberCar + "" + object.numberChair;
            }).indexOf(details.id + "" + details.numberCar + "" + details.numberChair);

            if (isSelect) {
                details['select'] = true;
                details['nameToa'] = chairTrainDetails.name;
                stompClient.send("/sub_topic/allSelectChair", {}, JSON.stringify(details));
                var date = new Date();
                details['timeCreate'] = date;
                $scope.listSelect.push(details);
                chair.select = true;
            } else {
                if (index >= 0) {
                    chair.select = false;

                    $scope.objectSelect = $scope.listSelect[index];
                    $scope.objectSelect['select'] = false;
                    stompClient.send("/sub_topic/allSelectChair", {}, JSON.stringify($scope.objectSelect));
                    $scope.listSelect.splice(index, 1);
                }
            }
            $localStorage.listSelect = $scope.listSelect;
        }
    };
    setInterval(function () {
        $scope.listSelect.forEach(function (object, index) {
            var date = new Date();
            var datse = new Date(object['timeCreate']);
            if (date.getTime() - datse.getTime() > 300000) {
                $scope.objectSelect = $scope.listSelect[index];
                $scope.objectSelect['select'] = false;
                stompClient.send("/sub_topic/allSelectChair", {}, JSON.stringify($scope.objectSelect));
                $scope.listSelect.splice(index, 1);
            }
        })
    }, 800);
    $scope.clickChairMultil = function (chair, chairTrainDetailsMultil) {
        var isSelect;
        $scope.listSelect = $localStorage.listSelect;
        if ($scope.listSelect == undefined) {
            $scope.listSelect = [];
        }

        var checkIsSelect = $scope.checkChair(chairTrainDetailsMultil.idTrain, chairTrainDetailsMultil.numberCar, chair.numberChair)

        if (chair.byTicket == true && (checkIsSelect || chair.status == 0)) {


            $scope.chairSelectMultil = chair;
            $scope.chairTrainDetailsMultil = chairTrainDetailsMultil;
            var details = $scope.getDetailsTicketMultil();

            var index1 = $scope.listSelect.map(function (object) {
                return object.id + "" + object.numberCar + "" + object.numberChair;
            }).indexOf(details.id + "" + details.numberCar + "" + details.numberChair);
            if (index1 < 0) {
                isSelect = true;
            }

            if ($localStorage.listSelect == undefined && $localStorage.listSelect == null) {
                $localStorage.listSelect = [];
            }
            var index = $scope.listSelect.map(function (object) {
                return object.id + "" + object.numberCar + "" + object.numberChair;
            }).indexOf(details.id + "" + details.numberCar + "" + details.numberChair);

            if (isSelect) {
                details['select'] = true;
                details['nameToa'] = chairTrainDetailsMultil.name;
                $scope.listSelect.push(details);
                stompClient.send("/sub_topic/allSelectChair", {}, JSON.stringify(details));
                chair.select = true;
            } else {
                if (index >= 0) {
                    chair.select = false;

                    $scope.objectSelect = $scope.listSelect[index];
                    $scope.objectSelect['select'] = false;

                    stompClient.send("/sub_topic/allSelectChair", {}, JSON.stringify($scope.objectSelect));
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

    $(document).ready(function () {

        var date_input = $('#dateStart'); //our date input has the name "date"
        var dateEnd = $('#dateEnd'); //our date input has the name "date"
        var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
        var options = {
            format: 'dd/mm/yyyy',
            container: container,
            todayHighlight: true,
            autoclose: true,
        };
        date_input.datepicker(options);
        dateEnd.datepicker(options);
    });
    $scope.validateInput = function () {
        if ($scope.validateSearchData($scope.searchDataAtSearch)) {
            $scope.message = "Vui lòng đợi trong giây lát";
            $scope.Dialog = ngDialog.open({
                template: 'pages/dialogs/dialog-notification.html',
                className: 'ngdialog-theme-default',
                controller: 'DialogController',
                scope: $scope,
                width: 1000,
            });

            searchService.getListTrain($scope.searchDataAtSearch).then(function (data) {
                $scope.Dialog.close();
                $scope.TrainDetail = null;
                $scope.chairTrainDetails = null;
                $scope.TrainDetailMultil = null;
                $scope.chairTrainDetailsMultil = null;

                if (data == null || data == undefined || data == '') {
                    $scope.mess = mess.not_find;
                } else {

                    $localStorage.searchData = angular.copy($scope.searchDataAtSearch);
                    $localStorage.Trains = data;

                    window.location = "/#/search";
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
                    if ($scope.Trains_Multil != undefined && $scope.Trains_Multil != null) {
                        $scope.Trains_Multil.forEach(function (entry) {
                            entry.timeStartFilter = entry.scheduleTrainSet.filter(function (item) {
                                return item.locationStart == $scope.searchData.tenGaDen;
                            })[0].timeStart;

                            entry.timeEndFilter = entry.scheduleTrainSet.filter(function (item) {
                                return item.locationEnd == $scope.searchData.tenGaDi;
                            })[0].timeEnd;

                        });
                    }

                }
            }, function (data) {
                $scope.Dialog.close();
            });
        } else {
            $scope.mess = "vui long nhap day du cac value";

        }

    };
    $scope.validateSearchData = function (value) {
        if (value == null) {
            isValidate = false;
            return isValidate;
        }
        var isValidate = false;
        if (value.dateStart == null || value.dateEnd == null || value.tenGaDi == null || value.tenGaDen == null) {
            isValidate = false;
        } else {
            isValidate = true;

        }
        return isValidate;
    }
    $scope.changeDataStart = function () {
        if ($scope.searchDataAtSearch.isOneWay == 0) {
            $scope.searchDataAtSearch.dateEnd = $scope.searchDataAtSearch.dateStart;
        }
    };
    $scope.click1Chieu = function () {
        $scope.searchDataAtSearch.dateEnd = $scope.searchDataAtSearch.dateStart;
    }
}