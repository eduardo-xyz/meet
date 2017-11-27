import { ValuationJsPage } from './app.po';

describe('Meet App', function() {
  let page: ValuationJsPage;

  beforeEach(() => {
    page = new ValuationJsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
