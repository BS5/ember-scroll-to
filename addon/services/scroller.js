import Em from 'ember';

const DURATION = 750;
const EASING   = 'swing';
const OFFSET   = 0;
const SCROLLABLE = 'html, body';

const { RSVP } = Em;

export default Em.Service.extend({

  // ----- Static properties -----
  duration: DURATION,
  easing:   EASING,
  offset:   OFFSET,
  scrollable: SCROLLABLE,


  // ----- Computed properties -----
  // scrollable: Em.computed(function() {
    // return Em.$('html, body');
  // }),

  getScrollable (scrollable) {
    const elem = Em.$(scrollable || SCROLLABLE);
    this.set('scrollable', Em.$(scrollable));
    return elem;
  },

  // ----- Methods -----
  getJQueryElement (target) {
    const jQueryElement = Em.$(target);

    if (!jQueryElement) {
      Em.Logger.warn("element couldn't be found:", target);
      return;
    }

    return jQueryElement;
  },

  getVerticalCoord (target, offset = 0) {
    const  jQueryElement = this.getJQueryElement(target);
    return jQueryElement.offset().top + offset;
  },

  scrollVertical (target, opts = {}) {
    return new RSVP.Promise((resolve, reject) => {
      this.getScrollable(opts.scrollable)
        .animate(
          {
            scrollTop: this.get('scrollable').scrollTop() - this.get('scrollable').offset().top + this.getVerticalCoord(target, opts.offset)
          },
          opts.duration || this.get('duration'),
          opts.easing || this.get('easing'),
          opts.complete
        )
        .promise()
        .then(resolve, reject);
    });
  },

  stop (scrollable) {
    this.getScrollable(scrollable).stop();
  }
});
