import { Angularcli2Page } from './app.po';

describe('angularcli2 App', function() {
  let page: Angularcli2Page;

  beforeEach(() => {
    page = new Angularcli2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
