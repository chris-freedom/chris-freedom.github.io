define(['backbone'], function(Backbone){
    var mainModel = Backbone.Model.extend({
        defaults: {
            'bet': 1
        }
    });

    return mainModel;
});

