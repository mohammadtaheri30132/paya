
## Install and run on ios

##### Install these tools

 * brew install node
 * npm install --global yarn
 * sudo gem install cocoapods
 * create account on mapbox or use the following token XXX
 * create ~/.netrc file and copy the following content
````
machine api.mapbox.com
login mapbox
password sk.eyJ1IjoiYWxpZ2VyYW1pIiwiYSI6ImNsOWFkdzRoczNwZHIzdW9pZjRzcWhkd20ifQ.c2rHwzmbW0MyMHA9PQrcQA
````

# build for IOS

````
* yarn install
* cd ios
* pod install
* cd ..
* yarn ios

````

# build for android
 
make sure you have following settings 

* JAVA_HOME is pointed to Java 11 or higher version
* add local.properties to android folder
	* sdk.dir=/Users/aligerami/Library/Android/sdk  
* install CMAKE 
	* Open the Settings (Android Studio);
	* Search by "Android SDK";
	* On the right side, go to the "SDK Tools" pallet|tab;
	* Check the "CMake" item on the list;
	* Press OK button;
 

````
* yarn install
* cd android
* chmod +x gradlew 
* ./gradlew assembleDebug or ./gradlew assembleRelease

````
