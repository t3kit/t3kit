# Behat testing integration
### Provide testing environment with [behat](http://behat.org/en/latest/guides.html). Currently this integration works only with t3kit_composer. 

### Running behat in local

- Open your terminal
- Go to installation site: `cd /shared/site`
- Install dependencies: `composer install`
- Change the `base_url` in `behat.yml` to:

	1 - For `vagrant` : `base_url: http://localhost:8081`
	
	2 - For `docker` : `base_url: http://localhost:8082`

- Running behat testing with command: `vendor/bin/behat -c test/behaviour/behat.yml`
- If you want to run specific feature, provide an argument `--name` : `vendor/bin/behat -c test/behaviour/behat.yml --name="Homepage"`

### Running automated testing wth Selenium server

- Download Selenium server version [3.0.1](https://goo.gl/sLTIW7). For other versions check at `http://docs.seleniumhq.org/download/`
- Download the [chrome driver](http://chromedriver.storage.googleapis.com/index.html?path=2.27). For other versions check at `http://docs.seleniumhq.org/download/`
- Start Selenium server: `java -jar -Dwebdriver.chrome.driver=path-to-chromedriver path-to-selenium-server-standalone-jar-file`
- Running testing specific name with selenium: `vendor/bin/behat -c test/behaviour/behat.yml --name="Navigation" --profile=selenium`

Note:

	- Above steps are for Ubuntu 14.04
	- If you use other operating system, download the Selenium server and chrome driver that are compatible to each others and support with your running operating system.
