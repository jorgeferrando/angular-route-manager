angular-route-manager
=====================

a simple service to add routes dynamically to your app based on this fiddle I found [jsFiddle](http://jsfiddle.net/5FUQa/1/)

Just add to your angular app and use it inside a controller, directive or other service.

I think this is usefull if you want to load routes after you have been logged in an app.

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
