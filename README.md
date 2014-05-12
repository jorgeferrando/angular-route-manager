angular-route-manager
=====================

a simple service to add routes dynamically to your app

Just add to your angular app and use it, for example, in a controller.

```javascript
define(["route-manager"],function(routeManager){
    var app = angular.module('sampleApp', ['ngRoute']);

    app.factory("routeManager",routeManager);
    
    app.controller("sampleCtrl",function($scope,routeManager) {
    
        routeManager.addRoute("/dynamicroute",{template:"<p>Dynamic template</p>"});
    
    });
    
    return app;
});

```
