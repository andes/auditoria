import { AuditoriaPage } from './app.po';

describe('auditoria App', function() {
  let page: AuditoriaPage;

  beforeEach(() => {
    page = new AuditoriaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
