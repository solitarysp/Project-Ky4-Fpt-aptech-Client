(function () {
    'use strict';
    var app = angular.module('myApp');
    app.controller('DialogController', DialogController);

    /** @ngInject */

    function DialogController($rootScope, $scope, ngDialog, $localStorage, dialogService,$window) {

        if ($scope.type == 1) {
            $scope.dataCreate = $scope.dataCreate;
            $scope.chooseDetailNumber = $scope.chooseDetailNumberParam;
            $scope.dataTrainDetailSet = $scope.dataCreate.trainDetailSet[$scope.chooseDetailNumber];
        }

        if ($scope.message != null) {
            $scope.message = $scope.message;
        }


        if ($scope.type == 2) {
            $scope.changeDatailChair = $scope.changeDatailChair;

        }


        if ($scope.type == 3) {
            $scope.dataTicket = angular.copy($scope.dataParam);
        }
        if ($scope.type == 4) {
            $scope.ParamAddress = angular.copy($scope.dataParamAddress);
        }


        $scope.updateTicket = function () {
            $scope.message = "Vui lòng đợi trong giây lát";
            $scope.Dialog = ngDialog.open({
                template: 'pages/dialogs/dialog-notification.html',
                className: 'ngdialog-theme-default',
                controller: 'DialogController',
                scope: $scope,
                width: 1000,
            });
            dialogService.updateTicket($scope.dataTicket).then(function (data) {
                $scope.Dialog.close();
                $window.location.reload();

            },function (data) {
                $scope.Dialog.close();
                $window.location.reload();
            })
        };

        $scope.updateAddress = function () {
            $scope.message = "Vui lòng đợi trong giây lát";
            $scope.Dialog = ngDialog.open({
                template: 'pages/dialogs/dialog-notification.html',
                className: 'ngdialog-theme-default',
                controller: 'DialogController',
                scope: $scope,
                width: 1000,
            });
            dialogService.updateAddress($scope.ParamAddress).then(function (data) {
                $scope.Dialog.close();

                $window.location.reload();

            },function (data) {
                $scope.Dialog.close();
                $window.location.reload();

            })
        };

        $scope.changeNumberChair = function () {
            $scope.chairTrainSet = [];
            for (let i = 1; i <= $scope.dataTrainDetailSet.totalChair; i++) {
                $scope.DetailChair = {};
                $scope.DetailChair.numberChair = i;
                $scope.chairTrainSet.push($scope.DetailChair);
            }
            $scope.dataTrainDetailSet.chairTrainSet = $scope.chairTrainSet;
        }


    }

    function tepm($rootScope, $scope, ngDialog, $localStorage, dialogService) {
        $scope.DetailsTicket = [];
        $scope.validateInput = [];
        $scope.showinput = false;
        $scope.showinputPayOnline = true;
        $scope.totalPrice = 0;
        $scope.listSelect = $localStorage.listSelect;


        $scope.showinputClick = function () {
            $scope.showinputPayOnline = true;
            $scope.showinput = !$scope.showinput;
        };
        /*       $scope.currentDate = new Date();
               setInterval(function () {
                $scope.currentDate = new Date();
               }, 10);*/
        $scope.deleteDetails = function (index) {

            $scope.objectSelect = $scope.listSelect[index];
            $scope.objectSelect['select'] = false;
            stompClient.send("/sub_topic/allSelectChair", {}, JSON.stringify($scope.objectSelect));

            $scope.listSelect.splice(index, 1);
            $localStorage.listSelect = $scope.listSelect;


        };
        $scope.isPayVisa = false;
        $scope.clickChangeSsPayVisa = function () {
            if ($scope.validateValue()) {
                $scope.isPayVisa = !$scope.isPayVisa;
            }

        };
        if ($scope.message != null) {
            $scope.message = $scope.message;
        }
        ;
        if ($scope.status != null) {
            $scope.status = $scope.status;
        }

        var socket = new SockJS(baseConfig.protocol + baseConfig.server + baseConfig.standardServicePort + baseConfig.baseUrlEnding + 'websocket');
        var stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe('/topic/allSelectChair', function (greeting) {
                $localStorage.listSelectALL = JSON.parse(greeting.body);
                $scope.listSelectALL = $localStorage.listSelectALL;
            });
        });

        $scope.funcBuyTicket = function (isPay, isonline) {
            if ($scope.validateValue(isPay) || isonline) {
                $scope.listSelect = $localStorage.listSelect;
                $scope.listSelect.forEach(function (value) {
                    if (isPay == 1) {
                        value['pay'] = 1;
                    } else {
                        value['pay'] = 0;
                    }
                });
                dialogService.funcBuyTicket($scope.listSelect).then(function (data) {
                    $scope.message = data.message;
                    if ($localStorage.DetailsTicket == null) {
                        $localStorage.DetailsTicket = [];
                    }
                    $localStorage.DetailsTicket['dataResponse'] = data;
                    switch ($localStorage.DetailsTicket['dataResponse'].status) {
                        case '900':
                            ngDialog.open({
                                template: 'pages/dialogs/dialog-notification.html',
                                className: 'ngdialog-theme-default',
                                controller: 'DialogController',
                                scope: $scope,
                                controllerAs: 'dialogCtrl',
                                width: 1000,
                            });
                            break;
                        case '200':
                            $scope.listSelect = [];
                            $localStorage.listSelect = [];
                            $localStorage.thanhcongmuave = $localStorage.Trains;

                            $localStorage.Trains = null;
                            $localStorage.DetailsTicket = data.data;
                            $localStorage.DetailsTicket1 = $localStorage.DetailsTicket;
                            window.location = "/#/showMessgarPayTicket";
                            $localStorage.DetailsTicket = null;
                            ngDialog.close();
                            break;
                    }
                    stompClient.send("/sub_topic/allSelectChair", {}, JSON.stringify({"get": true}));
                });
            } else {
                console.log('null')
            }


        };
        $scope.validateValue = function (isPay) {
            var isValidate = true;
            if ($scope.DetailsTicket['nameADDre'] == null || $scope.DetailsTicket['nameADDre'].length < 1) {
                $scope.validateInput['name'] = false;
                var isValidate = false;
            } else {
                $scope.validateInput['name'] = true;

            }
            if ($scope.DetailsTicket['diaChi'] == null || $scope.DetailsTicket['diaChi'].length < 1) {
                $scope.validateInput['diaChi'] = false;
                var isValidate = false;
            } else {
                $scope.validateInput['diaChi'] = true;

            }
            if ($scope.DetailsTicket['phone'] == null || $scope.DetailsTicket['phone'].length < 1) {
                $scope.validateInput['phone'] = false;
                var isValidate = false;
            } else {
                $scope.validateInput['phone'] = true;
            }

            if ($scope.DetailsTicket['postalcode'] == null || $scope.DetailsTicket['postalcode'].length < 1) {
                $scope.validateInput['postalcode'] = false;
                var isValidate = false;
            } else {
                $scope.validateInput['postalcode'] = true;
            }

            if ($scope.DetailsTicket['City'] == null || $scope.DetailsTicket['City'].length < 1) {
                $scope.validateInput['City'] = false;
                var isValidate = false;
            } else {
                $scope.validateInput['City'] = true;
            }
            if (isPay == 1) {
                if ($scope.DetailsTicket['numberCart'] == null || $scope.DetailsTicket['numberCart'].length < 1) {
                    $scope.validateInput['numberCart'] = false;
                    var isValidate = false;
                } else {
                    $scope.validateInput['numberCart'] = true;
                }

                if ($scope.DetailsTicket['thangHetHan'] == null || $scope.DetailsTicket['thangHetHan'].length < 1) {
                    $scope.validateInput['thangHetHan'] = false;
                    var isValidate = false;
                } else {
                    $scope.validateInput['thangHetHan'] = true;
                }
                if ($scope.DetailsTicket['namHetHan'] == null || $scope.DetailsTicket['namHetHan'].length < 1) {
                    $scope.validateInput['namHetHan'] = false;
                    var isValidate = false;
                } else {
                    $scope.validateInput['namHetHan'] = true;
                }
                if ($scope.DetailsTicket['CVV'] == null || $scope.DetailsTicket['CVV'].length < 1) {
                    $scope.validateInput['CVV'] = false;
                    var isValidate = false;
                } else {
                    $scope.validateInput['CVV'] = true;
                }
            }
            return isValidate;
        };
        $scope.clickPay = function () {
            if ($scope.validateValue()) {
                var totalCurr = 0;
                var mappingAll = [];
                $scope.listSelect.forEach(function (entry) {
                    var mapping = {};
                    mapping['name'] = 'vé đi tàu tàu:' + entry['name'];
                    mapping['description'] = 'nơi đi: ' + entry['tenGaDi'] + " ;  Nơi đến :" + entry['tenGaDen'];
                    mapping['quantity'] = '1';
                    mapping['price'] = entry['price'];
                    mapping['currency'] = 'USD';
                    totalCurr += entry['price'];
                    mappingAll.push(mapping);
                });

                paypal.Button.render({
                    env: 'sandbox',
                    client: {
                        sandbox: 'AeaAdSa-S7DDI2K7TpSr8Xwyo8D2H2-BMjaKBuDlM8HD9coVd7d5XKenhiYOlP5Lo-Sej8mVEDImfLmf',
                        production: 'AeaAdSa-S7DDI2K7TpSr8Xwyo8D2H2-BMjaKBuDlM8HD9coVd7d5XKenhiYOlP5Lo-Sej8mVEDImfLmf'
                    },
                    payment: function (data, actions) {
                        return actions.payment.create({
                            transactions: [{
                                amount: {
                                    total: totalCurr,
                                    currency: 'USD',
                                    details: {
                                        subtotal: totalCurr
                                    }
                                },
                                description: 'The payment transaction description.',
                                custom: '90048630024435',
                                payment_options: {
                                    allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
                                },
                                soft_descriptor: 'ECHI5786786',
                                item_list: {
                                    items: mappingAll,
                                    shipping_address: {
                                        recipient_name: $scope.DetailsTicket['nameADDre'],
                                        line1: $scope.DetailsTicket['diaChi'],
                                        line2: $scope.DetailsTicket['diaChi'],
                                        city: 'San Jose',
                                        country_code: 'US',
                                        postal_code: '95131',
                                        phone: $scope.DetailsTicket['phone'],
                                        state: 'CA'
                                    }
                                }
                            }],
                        });
                    },
                    onAuthorize: function (data, actions) {
                        return actions.payment.execute()
                            .then(function () {
                                $scope.funcBuyTicket(1, true);
                            });
                    }
                }, '#paypal-button');
                $scope.showinputPayOnline = false
            }

        }


    }

})();

