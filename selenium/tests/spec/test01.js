var selenium = require('selenium-webdriver');

describe('Example test', function() {

    beforeEach(function(done) {
        this.driver = new selenium.Builder()
            .forBrowser('chrome')
            .usingServer('http://selenium-hub:4444/wd/hub')
            .build();

        this.driver.get(process.env.APP_URL).then(done);
    });

    afterEach(function(done) {
        this.driver.quit().then(done);
    });

    // Check if page title contains "Google"
    it('Page title', function(done) {
        this.driver.getTitle().then(function (title) {
            expect(title).toContain('Google');
            done();
        });
    });

    // Check if search button exists in HTML code and has correct type
    it('Has search button', function(done) {
        var searchInput = this.driver.findElement(selenium.By.name('btnK'));
        searchInput.getAttribute('type').then(function(type) {
            expect(type).toBe('submit');
            done();
        });
    });
});