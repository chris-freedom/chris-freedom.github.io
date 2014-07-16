require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'vendor/jquery/dist/jquery.min',
        underscore: 'vendor/underscore-amd/underscore-min',
        backbone: 'vendor/backbone-amd/backbone-min',
        handlebars: 'vendor/handlebars/handlebars.amd.min',
        text: 'vendor/requirejs-text/text'
    }
});

var App = App || {};

require(['jquery',
    'app/views/mainView',
    'app/collections/rowsCollection',
    'app/models/mainModel'],
    function($, mainView, rowsCollection, mainModel) {

    App.rowsCollection = new rowsCollection;
    App.mainModel = new mainModel;
    new mainView;
});