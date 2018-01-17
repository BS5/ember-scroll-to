import Em from 'ember';

export default Em.Component.extend({

  // ----- Arguments -----
  href:     null,      // Required
  scrollable: undefined,
  label:    undefined,
  duration: undefined,
  easing:   undefined,
  offset:   undefined,


  // ----- Overridden properties -----
  tagName:           'a',
  attributeBindings: ['href'],


  // ----- Services -----
  scroller: Em.inject.service(),


  // ----- Computed properties -----
  jQueryElement: Em.computed('href', function() {
    const href = this.get('href');

    return this
      .get('scroller')
      .getJQueryElement(href);
  }),

  jQueryScrollable: Em.computed('scrollable', function() {
    const scrollable = this.get('scrollable');

    return this
      .get('scroller')
      .getJQueryElement(scrollable);
  }),

  // ----- Events -----
  scroll: Em.on('click', function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this
      .get('scroller')
      .scrollVertical(
        scrollable,
        this.get('jQueryElement'), {
        duration: this.get('duration'),
        offset:   this.get('offset'),
        easing:   this.get('easing'),
        complete: () => Em.run(this, this.sendAction, 'afterScroll')
      });
  })
});
