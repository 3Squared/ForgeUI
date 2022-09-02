// import DatePickerPageObject from '../page-objects/date-picker-page-object';
// import ToastPageObject from '../../../page';
//
// const today = ({ date, hours = 0, minutes = 0 }: { date?: number; hours?: number; minutes?: number } = {}) => {
//   const now = new Date();
//
//   return new Date(now.getFullYear(), now.getMonth(), date ?? now.getDate(), hours, minutes, 0, 0).toISOString();
// };
//
// describe('DatePicker', () => {
//   let page: DatePickerPageObject;
//
//   describe('Attributes', () => {
//     beforeEach(() => {
//       page = new DatePickerPageObject('single');
//       page.visit();
//     });
//
//     describe('Boolean', () => {
//       it('are added', () => {
//         page.calendar.toggleDisabled();
//
//         page.input.should('have.attr', 'disabled');
//       });
//
//       it('ignore value when added', () => {
//         page.calendar.toggleDisabled();
//
//         page.input.should('have.attr', 'disabled', 'disabled');
//       });
//
//       it('are removed', () => {
//         page.calendar.toggleDisabled();
//         page.calendar.toggleDisabled();
//
//         page.input.should('not.have.attr', 'disabled');
//       });
//     });
//
//     describe('Other', () => {
//       it('are updated', () => {
//         const placeholder = 'test';
//
//         page.setPlaceholder(placeholder);
//
//         page.input.should('have.attr', 'placeholder', placeholder);
//       });
//     });
//   });
//
//   describe('Calendar Icon', () => {
//     it('can be hidden', () => {
//       page = new DatePickerPageObject('slots');
//       page.visit();
//
//       page.slots.calendarIcon.should('not.exist');
//     });
//
//     it('toggles calendar', () => {
//       page = new DatePickerPageObject('single');
//       page.visit();
//
//       page.slots.calendarIcon
//         .children()
//         .first()
//         .click();
//
//       page.calendar.el.should('exist');
//     });
//   });
//
//   describe('Events', () => {
//     const toast = new ToastPageObject();
//
//     beforeEach(() => {
//       page = new DatePickerPageObject('events');
//       page.visit();
//     });
//
//     it("are handled when declared without 'on-' prefix", () => {
//       page.calendar.open();
//
//       toast.title.should('contain.text', 'DatePicker opened');
//     });
//
//     it("are handled when declared with 'on-' prefix", () => {
//       page.calendar.open();
//       page.calendar.dismiss();
//
//       toast.title.should('contain.text', 'DatePicker closed');
//     });
//   });
//
//   describe('Mode', () => {
//     describe('Single', () => {
//       it('emits a value when date selected', () => {
//         const hours = 10;
//         const minutes = 30;
//
//         page = new DatePickerPageObject('single');
//         page.visit();
//
//         page.calendar.open();
//         page.calendar.today.click();
//         page.calendar.hours.clear().type(`${hours}`);
//         page.calendar.minutes.clear().type(`${minutes}`);
//         page.calendar.confirm();
//
//         page.root.should('contain.text', `${today({ hours, minutes })}`);
//       });
//     });
//
//     describe('Range', () => {
//       beforeEach(() => {
//         page = new DatePickerPageObject('range');
//         page.visit();
//       });
//
//       it('emits a single value when first date selected', () => {
//         page.calendar.open();
//         page.calendar.today.click();
//         page.calendar.dismiss();
//
//         page.root.should('contain.text', `${today()}`);
//       });
//
//       it('emits a second value when second date selected', () => {
//         page.calendar.open();
//         page.calendar.monthDays
//           .eq(0)
//           .then((day ) => {
//             const date = today({ date: parseInt(day.text()) });
//             day.click();
//             return date;
//           })
//           .then(first => {
//             page.calendar.monthDays
//               .eq(1)
//               .then(day => {
//                 const date = today({ date: parseInt(day.text()) });
//                 day.click();
//                 return [first, date];
//               })
//               .then(([first, second] : string[]) => page.root.should('contain.text', `${first}`).should('contain.text', `${second}`));
//           });
//       });
//     });
//   });
//
//   describe('Validation', () => {
//     beforeEach(() => {
//       page = new DatePickerPageObject('single');
//       page.visit();
//     });
//
//     it('displays as valid when provided date', () => {
//       page.calendar.open();
//       page.calendar.monthDays.first().click();
//       page.calendar.confirm();
//
//       // Component
//       page.input.should('not.have.class', 'is-invalid');
//
//       // Styleguide
//       page.root
//         .get('.text-success')
//         .should('exist')
//         .should('not.contain.text', 'This field is required');
//     });
//
//     it('displays as invalid when missing date', () => {
//       page.calendar.open();
//       page.calendar.monthDays.first().click();
//       page.calendar.confirm();
//       page.calendar.clear();
//
//       // Component
//       page.input.should('have.class', 'is-invalid');
//
//       // Styleguide
//       page.root
//         .get('.text-danger')
//         .should('exist')
//         .should('contain.text', 'This field is required');
//     });
//   });
//
//   describe('Slots', () => {
//     beforeEach(() => {
//       page = new DatePickerPageObject('slots');
//       page.visit();
//     });
//
//     it('can place elements before', () => {
//       page.slots.before.children().should('have.length.gt', 0);
//     });
//
//     it('can place elements after', () => {
//       page.slots.after.children().should('have.length.gt', 0);
//     });
//
//     it('can extend calendar toggling', () => {
//       page.slots.before.find('[data-toggle]').click();
//       page.calendar.el.should('exist');
//     });
//
//     it('can extend date clearing', () => {
//       page.calendar.open();
//       page.calendar.today.click();
//
//       page.slots.after.find('[data-clear]').click();
//
//       page.root.should('not.contain.text', `${today()}`);
//     });
//   });
// });
