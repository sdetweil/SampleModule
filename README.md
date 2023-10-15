# SampleModule
sample MM module:

this module shows the basics as documented in the MM development spec. 

add this to the modules list in config/config.js

```
{
   module:"SampleModule",
   position:"middle_center",
   config:{
      message:"some message to be displayed by this module, this is optional as the module provides a default"
   }
}
```
the module naming rules are 

 everything in MM is case sensitive  Test is not the same as test
 module name = folder name in MagicMirror/modules = filename of the main js (modulename.js, here SampleModulejs) = the name used in the register statement
```
    Module.register("SampleModule", {
```
