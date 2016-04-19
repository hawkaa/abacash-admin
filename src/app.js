var abacashAdmin = angular.module('abacashAdmin', ['ng-admin']);
abacashAdmin.config(function(NgAdminConfigurationProvider, $stateProvider) {
    const nga = NgAdminConfigurationProvider; 
    // create an admin application
    var admin = nga.application('Abacash Administrator Panel')
        .baseApiUrl('http://localhost:9000/');


    // system
    var systems = nga.entity('systems'); 
    systems.listView().fields(
        nga.field('name', 'string'),
        nga.field('info', 'string'),
        nga.field('status', 'boolean'),
        nga.field('email', 'email'),
        nga.field('productTypes', 'wysiwyg'),
        nga.field('needSeller', 'boolean'),
        nga.field('allowExternalCustomers', 'boolean'),
        nga.field('internalSales', 'boolean')
    );
    systems.creationView().fields(systems.listView().fields());  
    systems.editionView().fields(systems.listView().fields());  
    systems.deletionView().fields(systems.listView().fields());  
    admin.addEntity(systems);
    
    nga.configure(admin);


    // routes
    $stateProvider
        .state('login', {
            parent: 'main',
            url: '/login',
            template: require('./login/index.html'),
            controller: ($scope, $http, $rootScope) => {
                $scope.user = {
                    email: 'test@abakus.no',
                    password: 'test'
                }
                $scope.update = (user) => {
                    $http({
                        method: 'POST',
                        url: 'http://localhost:9000/authenticate/',
                        data: user
                    }).then(res => {
                        $rootScope.jwt = res.data.token;
                    });
                }

            }
        })
});

abacashAdmin.run((Restangular, $rootScope, $location) => {
    Restangular.setDefaultHeaders({
        Authorization: () => 'Bearer ' + $rootScope.jwt
    });
  
    $rootScope.$on('$stateChangeStart', (event, next, current) => {
        if (next.url !== '/login' && !$rootScope.jwt) {
            $location.path('/login');
        }
    });
})
