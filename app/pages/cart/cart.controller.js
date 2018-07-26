(function () {
    'use strict';
    var app = angular.module('myApp');
    app.controller('cartController', cartController);

    /** @ngInject */
    function cartController($rootScope, $scope, ngDialog, $localStorage, $window, cartService, $timeout) {
        $scope.DetailsTicket = [];
        $scope.showinputCart = false;
        $scope.PayOnline = false;
        $scope.numberClickPay = 0;
        $scope.validateInput = [];
        $scope.showinput = false;
        $scope.showinputPayOnline = true;
        $scope.totalPrice = 0;

        $scope.addressPay = {};

        $scope.listSelect = $localStorage.listSelect;
        if ($scope.listSelect.length==0) {
            $localStorage.Trains = null;
            $scope.message = "Không Có vé tàu nào";
            ngDialog.open({
                template: 'pages/dialogs/dialog-notification.html',
                className: 'ngdialog-theme-default',
                controller: 'DialogController',
                scope: $scope,
                width: 1000,
            });
            $timeout(function () {
                window.location = "/#/home";

            }, 150);
        }

        $scope.listSelect.forEach(value =>
            $scope.totalPrice += value.price
        );
        var socket = new SockJS(baseConfig.protocol + baseConfig.server + baseConfig.standardServicePort + baseConfig.baseUrlEnding + 'websocket');
        var stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            stompClient.subscribe('/topic/allSelectChair', function (greeting) {
                $localStorage.listSelectALL = JSON.parse(greeting.body);
                $scope.listSelectALL = $localStorage.listSelectALL;
            });
        });

        $scope.showInputClick = function () {
            $scope.showinputCart = !$scope.showinputCart;
        };

        $scope.clickHidePayOnline = function () {
            $scope.PayOnline = !$scope.PayOnline;
            if ($scope.numberClickPay == 1) {
                $scope.numberClickPay = 0;
                $scope.showinputPayOnline = false;
            }
            $timeout(function () {
                $scope.showinputPayOnline = true;
            }, 150);
        };

        $scope.deleteDetails = function (index) {
            $scope.objectSelect = $scope.listSelect[index];
            $scope.objectSelect['select'] = false;
            stompClient.send("/sub_topic/allSelectChair", {}, JSON.stringify($scope.objectSelect));
            $scope.totalPrice -= $scope.listSelect[index].price;
            $scope.listSelect.splice(index, 1);
            $localStorage.listSelect = $scope.listSelect;

        };

        $scope.clickPayOnline = function () {
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

            $(document).ready(function () {
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
                                        recipient_name: $scope.addressPay.name,
                                        line1: $scope.addressPay.address,
                                        line2: $scope.addressPay.address,
                                        city: 'San Jose',
                                        country_code: 'US',
                                        postal_code: '95131',
                                        phone: $scope.addressPay.phone,
                                        state: 'CA'
                                    }
                                }
                            }],
                        });
                    },
                    onAuthorize: function (data, actions) {
                        return actions.payment.execute()
                            .then(function () {
                                $scope.funcBuyTicket(2, true);
                            });
                    }
                }, '#paypal-button');
                $scope.numberClickPay = 1;
            });


        }

        $scope.funcBuyTicket = function (typePay) {
            var tickets = [];
            $scope.listSelect.forEach(function (searchData) {
                var ticket = {};
                ticket['id'] = searchData.id;
                ticket['name'] = searchData.name;
                ticket['nameADDre'] = searchData.nameADDre;
                ticket['soCMND'] = searchData.soCMND;
                ticket['numberCar'] = searchData.numberCar;
                ticket['numberChair'] = searchData.numberChair;
                ticket['price'] = searchData.price;
                ticket['tenGaDen'] = searchData.tenGaDen;
                ticket['tenGaDi'] = searchData.tenGaDi;
                ticket['timeEndFilter'] = searchData.timeEndFilter;
                ticket['timeStartFilter'] = searchData.timeStartFilter;
                tickets.push(ticket);
            });
            $scope.addressPay['buyTickets'] = tickets;
            $scope.addressPay['pay'] = typePay;
            cartService.funcBuyTicket($scope.addressPay).then(function (data) {
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
            })
        }
    }
})();

