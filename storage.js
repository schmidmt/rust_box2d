var resourcesSuffix="";var darkThemes=["dark","ayu"];var currentTheme=document.getElementById("themeStyle");var mainTheme=document.getElementById("mainThemeStyle");var localStoredTheme=getCurrentValue("rustdoc-theme");var savedHref=[];function hasClass(elem,className){return elem&&elem.classList&&elem.classList.contains(className)}function addClass(elem,className){if(!elem||!elem.classList){return}elem.classList.add(className)}function removeClass(elem,className){if(!elem||!elem.classList){return}elem.classList.remove(className)}function onEach(arr,func,reversed){if(arr&&arr.length>0&&func){var length=arr.length;var i;if(reversed!==true){for(i=0;i<length;++i){if(func(arr[i])===true){return true}}}else{for(i=length-1;i>=0;--i){if(func(arr[i])===true){return true}}}}return false}function onEachLazy(lazyArray,func,reversed){return onEach(Array.prototype.slice.call(lazyArray),func,reversed)}function hasOwnProperty(obj,property){return Object.prototype.hasOwnProperty.call(obj,property)}function usableLocalStorage(){if(typeof Storage==="undefined"){return false}try{return window.localStorage!==null&&window.localStorage!==undefined}catch(err){return false}}function updateLocalStorage(name,value){if(usableLocalStorage()){localStorage[name]=value}else{}}function getCurrentValue(name){if(usableLocalStorage()&&localStorage[name]!==undefined){return localStorage[name]}return null}function switchTheme(styleElem,mainStyleElem,newTheme,saveTheme){var fullBasicCss="rustdoc"+resourcesSuffix+".css";var fullNewTheme=newTheme+resourcesSuffix+".css";var newHref=mainStyleElem.href.replace(fullBasicCss,fullNewTheme);if(saveTheme===true){updateLocalStorage("rustdoc-theme",newTheme)}if(styleElem.href===newHref){return}var found=false;if(savedHref.length===0){onEachLazy(document.getElementsByTagName("link"),function(el){savedHref.push(el.href)})}onEach(savedHref,function(el){if(el===newHref){found=true;return true}});if(found===true){styleElem.href=newHref}}function useSystemTheme(value){if(value===undefined){value=true}updateLocalStorage("rustdoc-use-system-theme",value);var toggle=document.getElementById("use-system-theme");if(toggle&&toggle instanceof HTMLInputElement){toggle.checked=value}}var updateSystemTheme=(function(){if(!window.matchMedia){return function(){let cssTheme=getComputedStyle(document.documentElement).getPropertyValue('content');switchTheme(currentTheme,mainTheme,JSON.parse(cssTheme)||light,true)}}var mql=window.matchMedia("(prefers-color-scheme: dark)");function handlePreferenceChange(mql){if(getCurrentValue("rustdoc-use-system-theme")!=="false"){var lightTheme=getCurrentValue("rustdoc-preferred-light-theme")||"light";var darkTheme=getCurrentValue("rustdoc-preferred-dark-theme")||"dark";if(mql.matches){switchTheme(currentTheme,mainTheme,darkTheme,true)}else{switchTheme(currentTheme,mainTheme,lightTheme,true)}}}mql.addListener(handlePreferenceChange);return function(){handlePreferenceChange(mql)}})();if(getCurrentValue("rustdoc-use-system-theme")!=="false"&&window.matchMedia){if(getCurrentValue("rustdoc-use-system-theme")===null&&getCurrentValue("rustdoc-preferred-dark-theme")===null&&darkThemes.indexOf(localStoredTheme)>=0){updateLocalStorage("rustdoc-preferred-dark-theme",localStoredTheme)}updateSystemTheme()}else{switchTheme(currentTheme,mainTheme,getCurrentValue("rustdoc-theme")||"light",false)}