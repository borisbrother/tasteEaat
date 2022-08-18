import $ from 'jquery';
const countries = {
  ru: {
    1: 'Все страны за исключением США, Канады, Японии и Австралии',
    2: 'США, Канада, Япония и Австралия',
  },
  tj: {
    1: 'Ҳама давлатҳо ғайр аз ИМА, Канада, Ҷопон ва Австралия',
    2: 'ИМА, Канада, Ҷопон ва Австралия',
  },
  en: {
    1: 'Ҳама давлатҳо ғайр аз ИМА, Канада, Ҷопон ва Австралия',
    2: 'ИМА, Канада, Ҷопон ва Австралия',
  },
};
const periods = {
  ru: {
    1: '5 дней',
    2: '7 дней',
    3: '10 дней',
    4: '15 дней',
    5: '21 день',
    6: '31 день',
    7: '62 дня',
    8: '92 дня',
    9: '184 дня',
    10: '365 дней',
  },
  tj: {
    1: '5 рӯз',
    2: '7 рӯз',
    3: '10 рӯз',
    4: '15 рӯз',
    5: '21 рӯз',
    6: '31 рӯз',
    7: '62 рӯз',
    8: '92 рӯз',
    9: '184 рӯз',
    10: '365 рӯз',
  },
  en: {
    1: '5 days',
    2: '7 days',
    3: '10 days',
    4: '15 days',
    5: '21 days',
    6: '31 days',
    7: '62 days',
    8: '92 days',
    9: '184 days',
    10: '365 days',
  },
};
const ages = {
  ru: {
    1: 'до 65 лет',
    2: 'от 66 до 70 лет',
    3: 'от 71 до 75 лет',
    4: 'от 76 до 80 лет',
  },
  tj: {
    1: 'то 65 сол',
    2: 'аз 66 то 70 сол',
    3: 'аз 71 то 75 сол',
    4: 'аз 76 то 80 сол',
  },
  en: {
    1: 'to 65 years',
    2: 'from 66 to 70 years',
    3: 'from 71 to 75 years',
    4: 'from 76 to 80 years',
  },
};
const calculation = {
  1: {
    // страна
    1: {
      // возраст
      1: 8.29,
      2: 9.56,
      3: 10.84,
      4: 12.12,
      5: 14.03,
      6: 17.21,
      7: 25.5,
      8: 38.25,
      9: 63.76,
      10: 89.26,
    },
    2: {
      1: 8.92,
      2: 10.2,
      3: 11.48,
      4: 13.39,
      5: 15.93,
      6: 20.4,
      7: 28.05,
      8: 33.44,
      9: 70.13,
      10: 95.63,
    },
    3: {
      1: 12.76,
      2: 14.67,
      3: 17.85,
      4: 20.4,
      5: 25.5,
      6: 33.16,
      7: 40.81,
      8: 57.38,
      9: 102.02,
      10: 140.27,
    },
    4: {
      1: 25.5,
      2: 29.33,
      3: 38.7,
      4: 40.81,
      5: 51.01,
      6: 66.3,
      7: 81.61,
      8: 114.77,
      9: 204.03,
      10: 280.54,
    },
  },
  2: {
    // страна
    1: {
      // возраст
      1: 13.39,
      2: 14.67,
      3: 18.49,
      4: 20.4,
      5: 24.24,
      6: 29.33,
      7: 40.81,
      8: 51.01,
      9: 89.26,
      10: 127.51,
    },
    2: {
      1: 14.67,
      2: 16.57,
      3: 19.76,
      4: 22.96,
      5: 28.05,
      6: 34.44,
      7: 51.01,
      8: 89.26,
      9: 108.39,
      10: 140.27,
    },
    3: {
      1: 19.13,
      2: 22.32,
      3: 27.41,
      4: 29.97,
      5: 35.06,
      6: 44.64,
      7: 57.38,
      8: 114.77,
      9: 121.14,
      10: 165.76,
    },
    4: {
      1: 38.25,
      2: 44.64,
      3: 54.84,
      4: 59.93,
      5: 70.13,
      6: 89.26,
      7: 114.77,
      8: 204.03,
      9: 242.29,
      10: 331.55,
    },
  },
};

export default class Calc {
  constructor($formJQEl, lang) {
    this.lang = lang;
    this.$form = $formJQEl;
    this.$countries = this.$form.find('select[name="country"]');
    this.$duration = this.$form.find('select[name="duration"]');
    this.$age = this.$form.find('select[name="age"]');
    this.$resBox = this.$form
      .siblings('.calc-overlay')
      .find('.calc-overlay__wrapper');
    this.$resField = this.$resBox.find('#result');
    this.$closeResBoxBtn = this.$resBox.find('.calc-res__btn');
  }
  init() {
    this.fillCountries();
    this.fillDuration();
    this.fillAge();

    this.$form.on('submit', (e) => this.formSubmit(e));
    this.$closeResBoxBtn.on('click', (e) => {
      e.preventDefault();
      this.$resBox.removeClass('active');
    });
  }
  fillCountries() {
    this.$countries.html('');

    for (let key in countries[this.lang]) {
      let $item = $('<option>', {
        value: key,
        text: countries[this.lang][key],
      });
      this.$countries.append($item);
    }
  }
  fillDuration() {
    this.$duration.html('');

    for (let key in periods[this.lang]) {
      let $item = $('<option>', {
        value: key,
        text: periods[this.lang][key],
      });
      if (key === '7') $item.attr('selected', true);
      this.$duration.append($item);
    }
  }
  fillAge() {
    this.$age.html('');

    for (let key in ages[this.lang]) {
      let $item = $('<option>', {
        value: key,
        text: ages[this.lang][key],
      });
      this.$age.append($item);
    }
  }
  formSubmit(e) {
    e.preventDefault();
    const country = this.$countries.val();
    const period = this.$duration.val();
    const age = this.$age.val();
    let res = calculation[country][age][period];
    // this.$resField.val(0);
    this.$resField.text(res);
    this.$resBox.addClass('active');
    // console.log(this.$resBox);
  }
}
