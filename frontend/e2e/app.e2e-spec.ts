import { NgDmsMaterialPage } from './app.po';

describe('ng-dms-material App', () => {
  let page: NgDmsMaterialPage;

  beforeEach(() => {
    page = new NgDmsMaterialPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
