define(['backbone'], function (Backbone) {
    var rowModel = Backbone.Model.extend({
        defaults: {
            'status': true,
            'name': 'no name outcome...',
            'betOverZero': 0
        }
    });

    return rowModel;
});

