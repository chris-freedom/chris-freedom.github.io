define(['backbone', 'app/models/rowModel'], function(Backbone, rowModel) {
    var rowsCollection = Backbone.Collection.extend({
        model: rowModel
    });

    return rowsCollection;
});
