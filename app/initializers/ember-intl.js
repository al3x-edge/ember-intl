/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { instanceInitializer } from '../instance-initializers/ember-intl';
import FormatDate from 'ember-intl/helpers/format-date';
import FormatTime from 'ember-intl/helpers/format-time';
import FormatRelative from 'ember-intl/helpers/format-relative';
import FormatNumber from 'ember-intl/helpers/format-number';
import FormatHtmlMessage from 'ember-intl/helpers/format-html-message';
import FormatMessage from 'ember-intl/helpers/format-message';
import IntlAdapter from 'ember-intl/adapters/-intl-adapter';

export function initializer(registry, app) {
    registry.optionsForType('formats', {
        singleton:   true,
        instantiate: false
    });

    if (!registry.has('adapter:-intl-adapter')) {
        registry.register('adapter:-intl-adapter', IntlAdapter);
    }

    Ember.HTMLBars._registerHelper('format-date', FormatDate);
    Ember.HTMLBars._registerHelper('format-time', FormatTime);
    Ember.HTMLBars._registerHelper('format-relative', FormatRelative);
    Ember.HTMLBars._registerHelper('format-number', FormatNumber);
    Ember.HTMLBars._registerHelper('format-html-message', FormatHtmlMessage);
    Ember.HTMLBars._registerHelper('format-message', FormatMessage);

    if (app.instanceInitializer) {
        return;
    }

    instanceInitializer(app);
}

export default {
    name: 'ember-intl',
    initialize: initializer
};
