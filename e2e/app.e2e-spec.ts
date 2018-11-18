import { boilerplateTemplatePage } from './app.po';

describe('boilerplate App', function() {
  let page: boilerplateTemplatePage;

  beforeEach(() => {
    page = new boilerplateTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
