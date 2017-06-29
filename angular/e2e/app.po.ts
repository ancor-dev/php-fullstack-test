import { browser, by, element } from 'protractor';

export class AngularPage {
  navigateTo() {
    return browser.get('/');
  }

  getBrandText() {
    return element(by.css('.navbar-brand')).getText();
  }
}
