define(['jquery', 'backbone', 'app/views/rowView'],

    function ($, Backbone, rowView) {

        var mainView = Backbone.View.extend({
            el: '#application',

            events: {
                'click #add': 'addModel',
                'change #bet': 'bet'
            },

            initialize: function () {
                _.bindAll(this, 'addRow', 'setResidue');
                App.rowsCollection.bind('add', this.addRow);
                App.mainModel.bind('change:residue', this.setResidue);
            },

            setResidue: function (model) {
                $('#residue').val(model.get('residue').toFixed(2));
            },

            bet: function (e) {
                App.mainModel.set({'bet': $(e.target).val()});
            },

            addRow: function (model) {
                var view = new rowView({'model': model});
                $('tbody').append(view.render());
            },

            addModel: function () {
                App.rowsCollection.add({});
            }
        });

        return mainView;
    });