// TODO:
// 1) Check that the language matches before merge.
// 2) Pick up the language type for options!!
// 3) Output the result file
// 4) How to copy the comments also, not just the json content!!
// 5)

'use strict';

module.exports = function(grunt) {

    /**
     * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
     * @param obj1
     * @param obj2
     * @returns obj3 a new object based on obj1 and obj2
     */
    function mergeTranslations(obj1, obj2){
        var obj3 = {};
        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
        return obj3;
    }

    // table running total of entries
    var runningTotal;

    function merge(filepath, options) {

        console.log("This is my angular-translate-merge grunt task!!");
        console.log(filepath);
        console.log(options);

        var obj = grunt.file.readJSON(filepath);

        if (obj) {
            if (obj.language === options.language) {
                if (runningTotal) {
                    runningTotal.table = mergeTranslations(runningTotal.table, obj.table);
                }
                else
                {
                    console.log("Total setup now........");
                    runningTotal = obj;
                }
            }
            else {
                console.log('Error: file found containing language which does not match!!');
            }
        }
    }

    grunt.task.registerMultiTask('mergeAngularTranslate', 'Build Locale files.', function () {

        var options = this.options({
            force: grunt.option('force') === true,
            'no-write': grunt.option('no-write') === true
        });

        grunt.verbose.writeflags(options, 'Options');


        this.filesSrc.forEach(function(filepath) {
            merge(filepath, options);
        });

        // TODO: pick this up from the grunt configuration file
        var outputFile = "c:/typhoon/webServer/build/release/en.json";

        if (runningTotal) {
            grunt.file.write(outputFile, JSON.stringify(runningTotal));
        }
    });

}