import Ember from 'ember';
import computed from 'ember-new-computed';

var now        = new Date();
var yesterday  = new Date(now).setDate(now.getDate() - 1);

export default Ember.Controller.extend({
  intl:       Ember.inject.service(),
  locales:    ['en-US', 'fr-FR', 'es'],
  num:        1000,
  yesterday:  yesterday,

  actions: {
      changeLocale(localeName) {
          this.set('intl.locale', localeName);
      }
  },

  currentLocale: computed('intl.locale', {
      get() {
          return this.get('intl.locale.firstObject') || this.get('intl.locale');
      }
  })
});
