import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import { runAppend, runDestroy } from '../helpers/run-append';
import formatDateHelper from 'ember-intl/helpers/format-date';

var view;
var dateStr   = 'Thu Jan 23 2014 18:00:44 GMT-0500 (EST)';
var timeStamp = 1390518044403;

moduleFor('ember-intl@formatter:format-date', {
    needs: ['service:intl'],
    beforeEach: function () {
        this.service = this.container.lookup('service:intl');
        this.container.injection('formatter', 'intl', 'service:intl');
        this.container.register('helper:format-date', formatDateHelper);

        var container = this.container;
        var service = this.service;

        this.intlBlock = function intlBlock(template, serviceContext) {
            if (typeof serviceContext === 'object') {
                Ember.run(function () {
                    service.setProperties(serviceContext);
                });
            }

            return Ember.View.create({
              template: Ember.HTMLBars.compile(template),
              container: container,
              context: {}
            });
        };
    },
    afterEach: function () {
        runDestroy(view);
    }
});

test('exists', function(assert) {
    assert.expect(1);
    assert.ok(formatDateHelper);
});

test('invoke the formatDate directly', function(assert) {
    assert.expect(1);
    assert.equal(this.service.formatDate(dateStr, {
        timeZone: 'UTC',
        locale: 'en-US'
    }), '1/23/2014');
});

test('should throw if called with out a value', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-date}}');
    assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-date');
});

test('it should return a formatted string from a date string', function(assert) {
    assert.expect(1);
    // Must provide `timeZone` because: https://github.com/yahoo/ember-intl/issues/21
    view = this.intlBlock('{{format-date "' + dateStr + '" timeZone="UTC"}}', {locale: 'en-US'});
    runAppend(view);
    assert.equal(view.$().text(), '1/23/2014');
});

test('it should return a formatted string from a timestamp', function(assert) {
    assert.expect(1);
    // Must provide `timeZone` because: https://github.com/yahoo/ember-intl/issues/21
    view = this.intlBlock('{{format-date ' + timeStamp + ' timeZone="UTC"}}', {locale: 'en-US'});
    runAppend(view);
    assert.equal(view.$().text(), '1/23/2014');
});

test('it should return a formatted string of just the time', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-date ' + timeStamp + ' hour="numeric" minute="numeric" timeZone="UTC"}}', {locale: 'en-US'});
    runAppend(view);
    assert.equal(view.$().text(), '11:00 PM');
});

test('it should format the epoch timestamp', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-date 0}}', {locale: 'en-US'});
    runAppend(view);
    assert.equal(view.$().text(), new Intl.DateTimeFormat('en').format(0));
});
