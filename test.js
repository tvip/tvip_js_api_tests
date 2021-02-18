
function TestResult(name) {
  this.name = name
  this.status = "failed"
  this.input = null
  this.output = null
  this.populated = null
  this.expected = null
  this.strict = false // check type only
}

function TvipApiTest(startedCallback, passedCallback, failedCallback) {
  this.started = startedCallback
  this.passed = passedCallback
  this.failed = failedCallback

  this.spatial = false
  this.prefs = false
  this.browser = false
  this.homeScreen = false
  this.reboot = false
  this.standby = false
  this.keyboard = false
  this.windowResize = false
  this.windowScroll = false
  this.uri = false;
  this.setlang = false;

  this.networkInterfaces = null
  this.smbWorkgroups = null

  this.run = function() {
    var props = Object.getOwnPropertyNames(this)
    var that = this

    props.forEach(function(prop){
    
    if(typeof that[prop] === "function" && prop.indexOf("test_") === 0) {
        console.log(prop)
        that[prop]() 
      }
    })
  }

  this.onStart = function(name) {
    if(typeof name === String && typeof this.started === "function") {
      result = new TestResult(name, "in_progress", null, null, null)
      this.started(result)
    }
  }

  this.onPassed = function(result) {
    if(result instanceof TestResult && typeof this.passed === "function") {
      this.passed(result)
    }
  }

  this.onFailed = function(result) {
    if(result instanceof TestResult && typeof this.failed === "function") {
      this.failed(result)
    }
  }

  this.test = function(result) {
    if(result instanceof TestResult) {
      if(result.output === result.expected || (result.strict === false && typeof result.output === typeof result.expected)) {
        result.status = "passed"
      }
    }
  }

  this.checkTestResult = function(result) {
    if(result instanceof TestResult) {
      if(result.status === "passed") {
        console.log("Test " + result.name +" passed!")
        this.onPassed(result)
      } else {
        console.log("Test " + result.name +" failed!")
        this.onFailed(result)
      } 
    }
  }

  //
  //TESTS
  //

  this.test_getApiVersion = function() {
    // window.TvipStb.getApiVersion()  
    var result = new TestResult("window.TvipStb.getApiVersion")
    console.log("get Api getApiVersion")
    try {
      result.expected = 4
      result.output = window.TvipStb.getApiVersion()
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_addMountPoint = function() {
    console.log("mount point start")
    var result = new TestResult("window.TvipStb.addMountPoint")
    // window.TvipStb.addMountPoint(int id, bool temp, int type, String name, Object options)  
    try {
      result.input = null
      result.expected = "defined"
      result.output = typeof window.TvipStb.addMountPoint === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
    console.log("mount point end")
  }

  this.test_enableCas = function() {
    // window.TvipStb.enableCas(String name, Object options) 
    console.log("test_enableCas start")
    var result = new TestResult("window.TvipStb.enableCas")
    try {
      result.input = null
      result.expected = "defined"
      result.output = typeof window.TvipStb.enableCas === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
    console.log(result)
  }

  this.test_enableSpatialNavigation = function() {
    // window.TvipStb.enableSpatialNavigation(bool enable) 
    var result = new TestResult("window.TvipStb.enableSpatialNavigation")
    try {
      result.input = null
      result.expected = "defined"
      result.output = typeof window.TvipStb.enableSpatialNavigation === "function"  ? "defined" : null
      result.populated = result.output
      this.spatial = true
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getCurrentLanguageCode = function() {
    // window.TvipStb.getCurrentLanguageCode()
    var result = new TestResult("window.TvipStb.getCurrentLanguageCode")
    try {
      result.input = null
      result.expected = "String"
      result.output = window.TvipStb.getCurrentLanguageCode()
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }
  
  this.test_setCurrentLanguageCode = function() {
    // window.TvipStb.setCurrentLanguageCode()
    var result = new TestResult("window.TvipStb.setCurrentLanguageCode")
    try {
      result.input = null
      result.expected = "defined"
      result.output = typeof window.TvipStb.setCurrentLanguageCode === "function" ? "defined" : null
      result.populated = result.output
      this.setlang = true;
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getCurrentTimezone = function() {
    // window.TvipStb.getCurrentTimezone()
    var result = new TestResult("window.TvipStb.getCurrentTimezone")
    try {
      result.input = null
      result.expected = "String"
      result.output = window.TvipStb.getCurrentTimezone()
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getDeviceId = function() {
    // window.TvipStb.getDeviceId() 
    var result = new TestResult("window.TvipStb.getDeviceId")
    try {
      result.input = null 
      result.expected = "String"
      result.output = window.TvipStb.getDeviceId()
      result.populated = result.output
      this.test(result)  
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getDisplayMode = function() {
    // window.TvipStb.getDisplayMode() 
    var result = new TestResult("window.TvipStb.getDisplayMode")
    try {
      result.input = null 
      result.expected = "String"
      result.output = window.TvipStb.getDisplayMode()
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getDirectoryDirs = function() {
    // window.TvipStb.getDirectoryDirs(String directory) 
    var result = new TestResult("window.TvipStb.getDirectoryDirs")
    try {
      result.input = "/"
      result.expected = "Array"
      result.output = window.TvipStb.getDirectoryDirs(result.input)
      result.populated = JSON.stringify(result.output)
      result.output = Array.isArray(result.output) ? "Array" : null
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getDirectoryFiles = function() {
    // window.TvipStb.getDirectoryFiles(String directory) 
    var result = new TestResult("window.TvipStb.getDirectoryFiles")
    try {
      result.input = "/"
      result.expected = "Array"
      result.output = window.TvipStb.getDirectoryFiles(result.input)
      result.populated = JSON.stringify(result.output)
      result.output = Array.isArray(result.output) ? "Array" : null
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_setEnvValue = function() {
    // window.TvipStb.setEnvValue(String name, String value) 
    var result = new TestResult("window.TvipStb.setEnvValue")
    try {
      result.input = JSON.stringify({ "name" : "test", "value" : "test" })
      result.expected =  "defined"
      window.TvipStb.setEnvValue("test", "test")
      result.output = "defined"
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getEnvValue = function() {
    // window.TvipStb.getEnvValue(String name) 
    var result = new TestResult("window.TvipStb.getEnvValue")
    try {
      result.input = "test"
      result.expected = "test"
      result.output = window.TvipStb.getEnvValue(result.input)
      result.populated = result.output
      result.strict = true
      this.test(result)  
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getMainMacAddress = function() {
    // window.TvipStb.getMainMacAddress() 
    var result = new TestResult("window.TvipStb.getMainMacAddress")
    try {
      result.input = null 
      result.expected = "String"
      result.output = window.TvipStb.getMainMacAddress()
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getNetworkDefaultRouteConfig = function() {
    // window.TvipStb.getNetworkDefaultRouteConfig() 
    var result = new TestResult("window.TvipStb.getNetworkDefaultRouteConfig")
    try {
      result.input =  null
      result.expected = {}
      result.output = window.TvipStb.getNetworkDefaultRouteConfig()
      result.populated = JSON.stringify(result.output)
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getNetworkInterfaces = function() {
    // window.TvipStb.getNetworkInterfaces() 
    var result = new TestResult("window.TvipStb.getNetworkInterfaces")
    try {
      result.input =  null
      result.expected = "Array"
      result.output = Array.isArray(window.TvipStb.getNetworkInterfaces()) ? "Array" : null
      result.populated = window.TvipStb.getNetworkInterfaces()
      this.networkInterfaces = result.populated
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getNetworkInterfaceStatus = function() {
  // window.TvipStb.getNetworkInterfaceStatus(String name) 
    var result = new TestResult("window.TvipStb.getNetworkInterfaceStatus")
    try {
      result.input = this.networkInterfaces
      result.expected = "Array"
      result.output = []
      this.networkInterfaces.forEach(function(iface) {
        result.output.push(window.TvipStb.getNetworkInterfaceStatus(iface))
      })
      result.populated = JSON.stringify(result.output)
      result.output = Array.isArray(result.output) ? "Array" : null
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getNetworkStatistics = function() {
  // window.TvipStb.getNetworkStatistics(String name) 
    var result = new TestResult("window.TvipStb.getNetworkStatistics")
    try {
      result.input = this.networkInterfaces
      result.expected =  "Array"
      result.output = []
      result.input.forEach(function(iface) {
        result.output.push(window.TvipStb.getNetworkStatistics(iface))
      })
      result.populated = JSON.stringify(result.output)
      result.output = Array.isArray(result.output) ? "Array" : null
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getSmbWorkgroups = function() {
  // window.TvipStb.getSmbWorkgroups() 
    var result = new TestResult("window.TvipStb.getSmbWorkgroups")
    try {
      result.input = null
      result.expected =  "Array"
      result.output =  window.TvipStb.getSmbWorkgroups()
      result.populated = JSON.stringify(result.output)
      this.smbWorkgroups = result.output
      result.output = Array.isArray(result.output) ? "Array" : null
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getSmbServers = function() {
  // window.TvipStb.getSmbServers(String group) 
    var result = new TestResult("window.TvipStb.getSmbServers")
    try {
      result.input = this.smbWorkgroups
      result.expected = "Array"
      result.output = []
      result.input.forEach(function(workgroup) {
        result.output.push(window.TvipStb.getSmbServers(workgroup))
      })
      result.populated = JSON.stringify(result.output)
      result.output = Array.isArray(result.output) ? "Array" : null
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getSmbServerShares = function() {
  // window.TvipStb.getSmbServerShares(String server) 
    var result = new TestResult("window.TvipStb.getSmbServerShares")
    try {
      result.input = null
      result.expected = "defined"
      result.output =  typeof window.TvipStb.getSmbServerShares === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getStandBy = function() {
  // window.TvipStb.getStandBy() 
    var result = new TestResult("window.TvipStb.getStandBy")
    try {
      result.input = null 
      result.expected = false
      result.output = window.TvipStb.getStandBy()
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getStorageValues = function() {
  // window.TvipStb.getStorageValues() 
    var result = new TestResult("window.TvipStb.getStorageValues")
    try {
      result.input = null 
      result.expected = "Array"   
      result.output = window.TvipStb.getStorageValues()
      result.populated = JSON.stringify(result.output)
      result.output = Array.isArray(result.output) ? "Array" : null
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getUdpProxyAddress = function() {
  // window.TvipStb.getUdpProxyAddress() 
    var result = new TestResult("window.TvipStb.getUdpProxyAddress")
    try {
      result.input = null 
      result.expected = "String"
      result.output = window.TvipStb.getUdpProxyAddress()
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getSecurityCode = function() {
  // window.TvipStb.getSecurityCode() 
    var result = new TestResult("window.TvipStb.getSecurityCode")
    try {
      result.input = null 
      result.expected = "String"
      result.output = window.TvipStb.getSecurityCode()
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_hasDirectoryFound = function() {
  // window.TvipStb.hasDirectory(String osPath) 
    var result = new TestResult("window.TvipStb.hasDirectory(Found)")
    try {
      result.input = "/proc"
      result.expected = true
      result.output = window.TvipStb.hasDirectory(result.input)
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_hasDirectoryNotFound = function() {
  // window.TvipStb.hasDirectory(String osPath) 
    var result = new TestResult("window.TvipStb.hasDirectory(NotFound)")
    try {
      result.input = "/proc/linux_has_no_dirs"
      result.expected = false
      result.output = window.TvipStb.hasDirectory(result.input)
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_hasFileFound = function() {
  // window.TvipStb.hasFile(String osPath) 
    var result = new TestResult("window.TvipStb.hasFile(Found)")
    try {
      result.input = "/proc/meminfo"
      result.expected = true
      result.output = window.TvipStb.hasFile(result.input)
      result.populated = result.output
      result.strict = true
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_hasFileNotFound = function() {
  // window.TvipStb.hasFile(String osPath) 
    var result = new TestResult("window.TvipStb.hasFile(Not Found)")
    try {
      result.input = "/proc/linux_has_no_files"
      result.expected = false
      result.output = window.TvipStb.hasFile(result.input)
      result.populated = result.output
      result.strict = true
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_removeFile = function() {
  // window.TvipStb.removeFile(String path) 
    var result = new TestResult("window.TvipStb.removeFile")
    try {
      result.input = null
      result.expected =  "defined"
      result.output =  typeof window.TvipStb.removeFile === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_execSystemUri = function() {
    var result = new TestResult("window.TvipStb.execSystemUri")
    try {
      result.input = null
      result.expected =  "defined"
      result.output =  typeof window.TvipStb.launchPreferences === "function" ? "defined" : null
      result.populated = result.output
      this.uri = true
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_launchPreferences = function() {
  // window.TvipStb.launchPreferences() 
    var result = new TestResult("window.TvipStb.launchPreferences")
    try {
      
      result.input = null 
      result.expected =  "defined"
      result.output =  typeof window.TvipStb.launchPreferences === "function" ? "defined" : null
      result.populated = result.output
      this.prefs = true
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_launchBrowser = function() {
  // window.TvipStb.launchBrowser(String url, String backUrl) 
    var result = new TestResult("window.TvipStb.launchBrowser")
    try {
      result.input = null
      result.expected =  "defined"
      result.output =  typeof window.TvipStb.launchBrowser === "function" ? "defined" : null
      result.populated = result.output
      this.browser = true
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_launchHomeScreen = function() {
  // window.TvipStb.launchHomeScreen() 
    var result = new TestResult("window.TvipStb.launchHomeScreen")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output =  typeof window.TvipStb.launchHomeScreen === "function" ? "defined" : null
      result.populated = result.output
      this.homeScreen = true
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_logDebug = function() {
    // window.TvipStb.logDebug(String message) 
    var result = new TestResult("window.TvipStb.logDebug")
    try {
      result.input = null
      result.expected =  "defined"
      result.output = typeof window.TvipStb.logDebug === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_rebootSystem = function() {
    // window.TvipStb.rebootSystem() 
    var result = new TestResult("window.TvipStb.rebootSystem")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output =  typeof window.TvipStb.rebootSystem === "function" ? "defined" : null
      result.populated = result.output
      this.reboot = true
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_removeMountPoint = function() {
    // window.TvipStb.removeMountPoint(int id) 
    var result = new TestResult("window.TvipStb.removeMountPoint ")
    try {
      result.input = null
      result.expected =  "defined"
      result.output =  typeof window.TvipStb.removeMountPoint === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_setColorKey = function() {
    // window.TvipStb.setColorKey(int color) 
    var result = new TestResult("window.TvipStb.setColorKey")
    try {
      result.input = null
      result.expected =  "defined"
      result.output = typeof window.TvipStb.setColorKey === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_setCustomHeader = function() {
    // window.TvipStb.setCustomHeader(String header, String value) 
    var result = new TestResult("window.TvipStb.setCustomHeader")
    try {
      result.input = null
      result.expected =  "defined"
      result.output = typeof window.TvipStb.setCustomHeader === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_setDirectoryListFilters = function() {
    // window.TvipStb.setDirectoryListFilters(String filters) 
    var result = new TestResult("window.TvipStb.setDirectoryListFilters")
    try {
      result.input = null
      result.expected =  "defined"
      result.output = typeof window.TvipStb.setDirectoryListFilters === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_setHomeKeyUrl = function() {
    // window.TvipStb.setHomeKeyUrl(String url) 
    var result = new TestResult("window.TvipStb.setHomeKeyUrl")
    try {
      result.input = null
      result.expected =  "defined"
      result.output = typeof window.TvipStb.setHomeKeyUrl === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_setOverrideErrorUrl = function() {
    // window.TvipStb.setOverrideErrorUrl(String url) 
    var result = new TestResult("window.TvipStb.setOverrideErrorUrl")
    try {
      result.input = null
      result.expected =  "defined"
      result.output = typeof window.TvipStb.setOverrideErrorUrl === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_setPassKeyKeyboard = function() {
    // window.TvipStb.setPassKeyKeyboard(bool enabled) 
    var result = new TestResult("window.TvipStb.setPassKeyKeyboard")
    try {
      result.input = null
      result.expected =  "defined"
      result.output =  typeof window.TvipStb.setPassKeyKeyboard === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_setPassKeyMenu = function() {
    // window.TvipStb.setPassKeyMenu(bool enabled) 
    var result = new TestResult("window.TvipStb.setPassKeyMenu")
    try {
      result.input = null
      result.expected =  "defined"
      result.output =  typeof window.TvipStb.setPassKeyMenu === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_setPassKeySysInfo = function() {
    // window.TvipStb.setPassKeySysInfo(bool enabled) 
    var result = new TestResult("window.TvipStb.setPassKeySysInfo")
    try {
      result.input = null
      result.expected =  "defined"
      result.output =  typeof window.TvipStb.setPassKeySysInfo === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_setPassKeySettings = function() {
    // window.TvipStb.setPassKeySettings(bool enabled) 
    var result = new TestResult("window.TvipStb.addMountPoint")
     try {
      result.input = null
      result.expected = "defined"
      result.output =  typeof window.TvipStb.setPassKeySettings === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_setStandBy = function() {
    // window.TvipStb.setStandBy(bool enabled) 
    var result = new TestResult("window.TvipStb.setStandBy")
    try {
      result.input = null
      result.expected =  "defined"
      result.output =  typeof window.TvipStb.setStandBy === "function" ? "defined" : null
      result.populated = result.output
      this.standby = true
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_setWebProxy = function() {
    // window.TvipStb.setWebProxy(String proxy, Array exclude)  
    var result = new TestResult("window.TvipStb.setWebProxy")
    try {
      result.input = null
      result.expected =  "defined"
      result.output =  typeof window.TvipStb.setWebProxy === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_showVirtualKeyboard = function() {
    // window.TvipStb.showVirtualKeyboard(bool show) 
    var result = new TestResult("window.TvipStb.showVirtualKeyboard")
    try {
      result.input = null
      result.expected =  "defined"
      result.output =  typeof window.TvipStb.showVirtualKeyboard === "function" ? "defined" : null
      result.populated = result.output
      this.keyboard = true
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_reset = function() {
    // window.TvipStb.reset() 
    var result = new TestResult("window.TvipStb.reset")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output = typeof window.TvipStb.reset === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_getSoftwareVersion = function() {
    var result = new TestResult("window.TvipStb.getSoftwareVersion")
    try {
      result.input = null 
      result.expected =  "String"
      result.output = window.TvipStb.getSoftwareVersion()
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }
  this.test_windowClose = function() {
    var result = new TestResult("window.TvipStb.windowClose")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output = typeof window.TvipStb.windowClose === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }
  this.test_windowGetActiveUrl = function() {
    var result = new TestResult("window.TvipStb.windowGetActiveUrl")
    try {
      result.input = null 
      result.expected =  "String"
      result.output =  window.TvipStb.windowGetActiveUrl()
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }
  this.test_windowGetUrl = function() {
    var result = new TestResult("window.TvipStb.windowGetUrl")
    try {
      result.input = null 
      result.expected =  "String"
      result.output = window.TvipStb.windowGetUrl(1)
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }
  this.test_windowOpenNew = function() {
    var result = new TestResult("window.TvipStb.windowOpenNew")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output = typeof window.TvipStb.windowOpenNew === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }
  this.test_windowOpenNewNavigator = function() {
    var result = new TestResult("window.TvipStb.windowOpenNewNavigator")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output = typeof window.TvipStb.windowOpenNewNavigator === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }
  this.test_windowResize = function() {
    var result = new TestResult("window.TvipStb.windowResize")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output = typeof window.TvipStb.windowResize === "function" ? "defined" : null
      result.populated = result.output
      this.windowResize = true
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }
  this.test_windowSendSystemMessage = function() {
    var result = new TestResult("window.TvipStb.windowSendSystemMessage")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output = typeof window.TvipStb.windowSendSystemMessage === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }
  this.test_windowSetFocus = function() {
    var result = new TestResult("window.TvipStb.windowSetFocus")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output = typeof window.TvipStb.windowSetFocus === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_windowSetNavigatorEventReceiverWindow = function() {
    var result = new TestResult("window.TvipStb.windowSetNavigatorEventReceiverWindow")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output = typeof window.TvipStb.windowSetNavigatorEventReceiverWindow === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_windowSetScrollPosition = function() {
    var result = new TestResult("window.TvipStb.windowSetScrollPosition")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output = typeof window.TvipStb.windowSetScrollPosition === "function" ? "defined" : null
      result.populated = result.output
      this.windowScroll = true
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_windowSetUrl = function() {
    var result = new TestResult("window.TvipStb.windowSetUrl")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output = typeof window.TvipStb.windowSetUrl === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  //
  // Recorder
  //

  this.test_recorder_addRecord = function() {
    // String addRecord(String name, String url, String path, String start, String end)
    var result = new TestResult("window.TvipRecorder.addRecord")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output = typeof window.TvipRecorder.addRecord === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_recorder_cancelRecord = function() {
    // bool cancelRecord(String id, bool removeFile);
    var result = new TestResult("window.TvipRecorder.cancelRecord")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output = typeof window.TvipRecorder.cancelRecord === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_recorder_updateStartEndTime = function() {
    // void updateStartEndTime(String id, String start, String end);
    var result = new TestResult("window.TvipRecorder.updateStartEndTime")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output = typeof window.TvipRecorder.updateStartEndTime === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_recorder_getRecordIds = function() {
    // List getRecordIds();
    var result = new TestResult("window.TvipRecorder.getRecordIds")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output = typeof window.TvipRecorder.getRecordIds === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }

  this.test_recorder_getRecord = function() {
    // Object getRecord(id);
    var result = new TestResult("window.TvipRecorder.getRecord")
    try {
      result.input = null 
      result.expected =  "defined"
      result.output = typeof window.TvipRecorder.getRecord === "function" ? "defined" : null
      result.populated = result.output
      this.test(result)
    } catch(error) {}
    this.checkTestResult(result)
  }
}
