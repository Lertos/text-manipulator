var tabs;

function setup() {
    tabs = document.querySelectorAll(".tab");

    for(var i=0; i<tabs.length; i++){
        tabs[i].classList.remove("tab")
    
        if(i != 0)
            tabs[i].classList.add("hideDiv")
    }
}

function changeTab(index){
    for(var i=0; i<tabs.length; i++){
        if(i == index)
            tabs[i].classList.remove("hideDiv")
        else
            tabs[i].classList.add("hideDiv")
    }
}

function stripNewLineFromEnd(text){
    var textLen = text.length

    if(text.substr(textLen - 1, textLen) == '\n')
        return text.substr(0, textLen - 1)
    else
        return text
}

/*===================================

TAB 1 - Add text between tabbed data

===================================*/

function resetTab1(){
    document.getElementById('inputTab1Separator').value = '#'
    document.getElementById('tab1Separators').value = ''
    document.getElementById('tab1Input').value = ''
    document.getElementById('tab1Output').value = ''
}

function processTab1(){
    var separatorChar = document.getElementById('inputTab1Separator').value
    var separators = document.getElementById('tab1Separators').value.split(separatorChar)
    var input = document.getElementById('tab1Input').value
    var output = document.getElementById('tab1Output')
 
    output.value = ''

    //Split the lines based on new line symbols
    var arr = input.split(/\r?\n/g);

    //For each new line, split it up into the parts
    for(var i=0; i<arr.length; i++){

        //Check for empty lines - especially the last line which usually happens when pasting
        if(arr[i] != ''){

            //Split the parts based on tabs
            var partsArr = arr[i].split(/\t/g);
            var line = ''

            //For each part, add the text between the separators
            for(var j=0; j<partsArr.length; j++){
                if (separators.length > j)
                    line += separators[j] + partsArr[j]
                else
                    line += partsArr[j]

                if(j+1 == partsArr.length && separators.length > partsArr.length)
                    line += separators[j+1]
            }

            //Lastly, add the line to the output text area, adding a new line at the end
            output.value += line + '\n'
        }
    }

    output.value = stripNewLineFromEnd(output.value)
}

/*===================================

TAB 2 - Generate Global Scripts

===================================*/

function resetTab2(){
    document.getElementById('tab2AddUseCheckbox').checked = true
    document.getElementById('tab2AddGoCheckbox').checked = true
    document.getElementById('tab2DatabaseList').value = ''
    document.getElementById('tab2ScriptToPaste').value = ''
    document.getElementById('tab2Output').value = ''
}

function processTab2(){
    var addUseOption = document.getElementById('tab2AddUseCheckbox').checked
    var addGoOption = document.getElementById('tab2AddGoCheckbox').checked
    var input = document.getElementById('tab2DatabaseList').value
    var scriptToPaste = document.getElementById('tab2ScriptToPaste').value
    var output = document.getElementById('tab2Output')
 
    output.value = ''

    //Split the database list based on new line symbols
    var arr = input.split(/\r?\n/g);

    //For each new line (database), paste the script
    for(var i=0; i<arr.length; i++){

        //Check for empty lines - especially the last line which usually happens when pasting
        if(arr[i] != ''){

            //If desired, add the USE to the database name
            if(addUseOption == true)
                output.value += 'USE ' + arr[i] + '\n'
            else
                output.value += arr[i] + '\n'

            //If desired, add the GO around the script to paste
            if(addGoOption == true){
                output.value += 'GO\n'
                output.value += scriptToPaste + '\n'
                output.value += 'GO\n'
            }
            else{
                output.value += scriptToPaste + '\n'
            }
        }
    }

    output.value = stripNewLineFromEnd(output.value)
}

/*===================================

TAB 3 - Add Commas/Apostrophes to a List

===================================*/

function resetTab3(){
    document.getElementById('tab3AddApostrophesCheckbox').checked = true
    document.getElementById('tab3TrimWhiteSpaceCheckbox').checked = true
    document.getElementById('tab3IgnoreLastLineCheckbox').checked = true
    document.getElementById('tab3TextToAdd').value = ','
    document.getElementById('tab3List').value = ''
    document.getElementById('tab3Output').value = ''
}

function processTab3(){
    var addApostropheOption = document.getElementById('tab3AddApostrophesCheckbox').checked
    var trimWhiteOption = document.getElementById('tab3TrimWhiteSpaceCheckbox').checked
    var ignoreLastLineOption = document.getElementById('tab3IgnoreLastLineCheckbox').checked
    var textToAdd = document.getElementById('tab3TextToAdd').value
    var input = document.getElementById('tab3List').value
    var output = document.getElementById('tab3Output')
 
    output.value = ''

    //Split the list based on new line symbols
    var arr = input.split(/\r?\n/g);

    //For each new line, add the desired text
    for(var i=0; i<arr.length; i++){

        var line = arr[i]

        //Check for empty lines - especially the last line which usually happens when pasting
        if(line != ''){

            //If desired, trim the white space on both sides
            if(trimWhiteOption == true){
                line = line.trim()
            }

            //If desired, add apostrophes to both sides
            if(addApostropheOption == true){
                line = "'" + line + "'"
            }

            //If last line should be ignored, skip the last iteration
            if(i==arr.length-1){
                if(ignoreLastLineOption == false){
                    line = line + textToAdd
                }
            }
            else{
                line = line + textToAdd
            }

            //Add the full line to the output text area
            output.value += line + '\n'
        }
    }

    output.value = stripNewLineFromEnd(output.value)

    //Check if the last character is a comma - when it shouldn't be
    if(ignoreLastLineOption == true){
        var outputLen = output.value.length

        //Strip the textToAdd if it exists
        if(output.value.substr(outputLen - textToAdd.length, outputLen) == textToAdd)
            output.value = output.value.substr(0, outputLen - textToAdd.length)
    }
}

/*===================================

TAB 4 - Remove Empty Lines

===================================*/

function resetTab4(){
    document.getElementById('tab4Input').value = ''
    document.getElementById('tab4Output').value = ''
}

function processTab4(){
    var input = document.getElementById('tab4Input').value
    var output = document.getElementById('tab4Output')
 
    output.value = ''

    //Split the list based on new line symbols
    var arr = input.split(/\r?\n/g);

    //For each new line, check if the line is empty
    for(var i=0; i<arr.length; i++){

        if(arr[i] === '')
            continue
        else
            output.value += arr[i] + '\n'
    }

    output.value = stripNewLineFromEnd(output.value)
}

/*===================================

TAB 5 - If Exists Drop Block

===================================*/

function resetTab5(){
    document.getElementById('radioProcedure').checked = true
    document.getElementById('radioFunction').checked = false
    document.getElementById('radioView').checked = false

    document.getElementById('tab5EntityName').value = ''
    document.getElementById('tab5Output').value = ''
}

function processTab5(){
    var entityName = document.getElementById('tab5EntityName').value
    var output = document.getElementById('tab5Output')
 
    output.value = ''

    //Trim the entity name
    entityName = entityName.trim()
    
    //Get the entity type
    var entityType = ''

    if(document.getElementById('radioProcedure').checked)
        entityType = 'PROCEDURE'
    else if(document.getElementById('radioFunction').checked)
        entityType = 'FUNCTION'
    else if(document.getElementById('radioView').checked)
        entityType = 'VIEW'

    output.value += "GO\n"
    output.value += "IF OBJECT_ID('[dbo].[" + entityName + "]') IS NOT NULL\n"
    output.value += "BEGIN\n"
    output.value += "\tDROP " + entityType + " [dbo].[" + entityName + "]\n"
    output.value += "END\n"
    output.value += "GO\n"
}

/*===================================

TAB 6 - Sort a List

===================================*/

function resetTab6(){
    document.getElementById('tab6AlphabeticalCheck').checked = true
    document.getElementById('tab6NumericalCheck').checked = true

    document.getElementById('radioAlphabetical').checked = true
    document.getElementById('radioNumerical').checked = false
    document.getElementById('radioBoth').checked = false

    document.getElementById('tab6Alphabetical').classList.remove("hideDiv")
    document.getElementById('tab6Numerical').classList.add("hideDiv")

    document.getElementById('tab6List').value = ''
    document.getElementById('tab6Output').value = ''
}

function processTab6(){
    var input = document.getElementById('tab6List').value
    var output = document.getElementById('tab6Output')
 
    output.value = ''

    //Split the list based on new line symbols
    var arr = input.split(/\r?\n/g);

    //If the list only has alphabetical characters
    if(document.getElementById('radioAlphabetical').checked){
        arr.sort()

        //If its Z-A, reverse the order
        if(document.getElementById('tab6AlphabeticalCheck').checked == false)
            arr.reverse()
    }

    //If the list only has numbers
    else if(document.getElementById('radioNumerical').checked){
        //If 1-9
        if(document.getElementById('tab6NumericalCheck').checked){
            arr.sort(function(a, b){return a-b});
        }
        //If 9-1
        else{
            arr.sort(function(a, b){return b-a});
        }
    }

    //If the list is alphanumerical
    else if(document.getElementById('radioBoth').checked){
        arr.sort(function(a,b){
            // convert to strings and force lowercase
            a = typeof a === 'string' ? a.toLowerCase() : a.toString();
            b = typeof b === 'string' ? b.toLowerCase() : b.toString();
        
            return a.localeCompare(b);
        });
    }

    //For each new line, add the desired text
    for(var i=0; i<arr.length; i++){

        //Add the full line to the output text area
        output.value += arr[i] + '\n'
    }

    output.value = stripNewLineFromEnd(output.value)
}

function changeTheText(type){
    var alphabetical = document.getElementById('tab6Alphabetical')
    var numerical = document.getElementById('tab6Numerical')


    if(type == 'both'){
        alphabetical.classList.add("hideDiv")
        numerical.classList.add("hideDiv")
    }
    else if(type == 'alphabetical'){
        alphabetical.classList.remove("hideDiv")
        numerical.classList.add("hideDiv")
    }
    else if(type == 'numerical'){
        alphabetical.classList.add("hideDiv")
        numerical.classList.remove("hideDiv")
    }

}

/*===================================

TAB 7 - Create an Incremental List

===================================*/

function resetTab7(){
    document.getElementById('tab7StartNumber').value = '1'
    document.getElementById('tab7IncrementBy').value = '1'
    document.getElementById('tab7Iterations').value = '10'
    document.getElementById('tab7Output').value = ''
}

function processTab7(){
    var startNumber = parseInt(document.getElementById('tab7StartNumber').value)
    var incrementBy = parseInt(document.getElementById('tab7IncrementBy').value)
    var iterations = parseInt(document.getElementById('tab7Iterations').value)
    var output = document.getElementById('tab7Output')
 
    output.value = ''
    output.value += startNumber + '\n'

    for(var i=0; i<iterations-1; i++){
        startNumber += incrementBy

        //Add the full line to the output text area
        output.value += startNumber + '\n'
    }

    output.value = stripNewLineFromEnd(output.value)
}