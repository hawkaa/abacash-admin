import 'ng-admin';
import 'ng-admin/build/ng-admin.min.css';
var abacashAdmin = angular.module('abacashAdmin', ['ng-admin']);
abacashAdmin.config(['NgAdminConfigurationProvider', function(nga) {
    // create an admin application
    var admin = nga.application('Abacash Administrator Panel')
        .baseApiUrl('http://localhost:9000/');

    // system
    var systems = nga.entity('systems'); 
    var systemsFields = [
        nga.field('name'),
        nga.field('info'),
        nga.field('status'),
        nga.field('email'),
        nga.field('needSeller'),
        nga.field('allowExternalCustomers'),
        nga.field('internalSales')
    ];
    systems.listView().fields(systemsFields);
    systems.creationView().fields([
        nga.field('name'),
        nga.field('info'),
        nga.field('status')
    ]);
      
    admin.addEntity(systems);
    
    nga.configure(admin);
}]);
