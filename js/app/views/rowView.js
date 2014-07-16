define(['backbone',
    'jquery',
    'underscore',
    'handlebars',
    'text!app/templates/row.handlebars'],

    function (Backbone, $, _, Handlebars, rowTemplate) {

        var rowView = Backbone.View.extend({
            tagName: 'tr',
            template: Handlebars.default.compile(rowTemplate),


            events: {
                'change .bet-coefficient': 'coefficientEvt',
                'keyup .bet-coefficient': 'coefficientEvt',
                'change .bet-over-zero': 'betOverZeroEvt',
                'keyup .bet-over-zero': 'betOverZeroEvt',
                'click .status': 'status',
                'dblclick .outcome-name': 'editName',
                'focusout .outcome-name': 'saveName'
            },

            initialize: function () {
                _.bindAll(this, 'setZeroBet', 'setIncome', 'setIncomePercentage', 'setFinalBet', 'bet', 'setResidue');
                this.model.bind('change:coefficient', this.setZeroBet);
                this.model.bind('change:coefficient', this.setIncome);
                this.model.bind('change:betOverZero', this.setIncome);
                this.model.bind('change:betOverZero', this.setFinalBet);
                this.model.bind('change:income', this.setIncomePercentage);
                this.model.bind('change:zeroBet', this.setFinalBet);
                this.model.bind('change:finalBet', this.setResidue);
                this.model.bind('change:status', this.setResidue);
                App.mainModel.bind('change:bet', this.bet);

            },

            editName: function (e) {
                $(e.target).attr('contenteditable', 'true').focus();
            },

            saveName: function (e) {
                $(e.target).attr('contenteditable', 'false');
            },

            status: function (e) {
                this.model.set({'status': $(e.target).is(':checked')});
            },

            bet: function () {
                var events = ['coefficient', 'betOverZero', 'income', 'zeroBet'],
                    that = this;
                _.each(events, function (e) {
                    that.model.trigger('change:' + e);
                });
            },

            setResidue: function () {
                var residue = App.mainModel.get('bet');

                _.each(App.rowsCollection.models, function (model) {
                    if (model.get('status')) {
                        var finalBet = model.get('finalBet');
                        if (finalBet)    residue -= finalBet;
                    }
                });

                App.mainModel.set({'residue': residue});
            },

            coefficientEvt: function (e) {
                var coefficient = parseFloat($(e.target).val());

                if (isNaN(coefficient) || coefficient < 1) coefficient = 1;
                this.model.set({'coefficient': coefficient});
            },

            betOverZeroEvt: function (e) {
                var betOverZero = parseFloat($(e.target).val());

                if (isNaN(betOverZero) || betOverZero < 0) betOverZero = 0;
                this.model.set({'betOverZero': betOverZero});
            },

            setZeroBet: function () {
                var coefficient = this.model.get('coefficient'),
                    bet = $('#bet').val(),
                    zeroBet = +(bet / coefficient).toFixed(2);

                this.model.set({'zeroBet': zeroBet});
                $('.zero-bet', this.$el).html(zeroBet);
            },

            setIncome: function () {
                var income = +(this.model.get('betOverZero') * this.model.get('coefficient')).toFixed(2);

                this.model.set({'income': income});
                $('.income', this.$el).html(income);
            },

            setIncomePercentage: function () {
                var bet = $('#bet').val(),
                    income = this.model.get('income'),
                    incomePercentage = ((income * 100) / bet).toFixed(2) + ' %';

                this.model.set({'incomePercentage': incomePercentage});
                $('.income-percentage', this.$el).html(incomePercentage);
            },

            setFinalBet: function () {
                var finalBet = (this.model.get('zeroBet') + this.model.get('betOverZero')).toFixed(2);

                this.model.set({'finalBet': finalBet});
                $('.final-bet', this.$el).html(finalBet);
            },

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this.el;
            }
        });

        return rowView;
    });