$(document).ready(function() {
    var wordlist = [];
    var wordlist2 = [];
    //init word lists

    $.ajax({
        type: "GET",
        url: "https://thepiotug.github.io/Kana_Word_Gen_Check/data/hiragana_words.txt",
        contentType: 'text/plain; charset=utf-8',
        dataType: "text",
        cache: false,
        success: function(data) {
            wordlist = data.split("\n");
        }
    });
    $.ajax({
        type: "GET",
        url: "https://thepiotug.github.io/Kana_Word_Gen_Check/data/katakana_words.txt",
        contentType: 'text/plain; charset=utf-8',
        dataType: "text",
        cache: false,
        success: function(data) {
            wordlist2 = data.split("\n");
        }
    }); // get the dictionaries of common words

    $('#generateBtn').click(function() {
        var n = $('#numWordsTxt').val();
        var hira = document.getElementById('hiragana').checked;
        var kata = document.getElementById('katakana').checked;
        var errBox = $('#errBox');

        if (n < 0 || n > 1000) {
            errBox.html("Error: Value must be between 0 and 1000.");
            return;
        } // how many words the code should "generate"
        if (hira == false && kata == false ) {
            errBox.html("Error: None of the checkboxes were checked.");
            return;
        }

        var kana = 0; //init kana - hiragana is 1, katakana is 2, both is 3
        if (hira === true) { kana = kana + 1; }
        if (kata === true) { kana = kana + 2; }

        var area = $('#genWordsArea');
        area.val(""); // clear textarea for next use

        for (i = 0; i < n; i += 1) {
            switch (kana) {
                case 1:
                    var r = Math.floor(Math.random() * (wordlist.length));
                    area.val(area.val() + wordlist[r] + " ");
                    break;
                case 2:
                    var r = Math.floor(Math.random() * (wordlist2.length));
                    area.val(area.val() + wordlist2[r] + " ");
                    break;
                case 3:
                    if ((Math.floor(Math.random() * 80)) < 10) { // explanation: 10% of written japanese is katakana, 70% is hiragana, and ~20% is kanji, so the randomisation in the if makes it more realistic
                        var r = Math.floor(Math.random() * (wordlist2.length));
                        area.val(area.val() + wordlist2[r] + " ");
                    }
                    else {
                        var r = Math.floor(Math.random() * (wordlist.length));
                        area.val(area.val() + wordlist[r] + " ")
                    };
            }
        } //new, somewhat cleaner randomisation algorithm
    });

    $('#romajiCheckBtn').click(function(){
        var words = $('#genWordsArea').val().replace(/\s/g,'');
        var area = $('#romajiCheck');
        var areaWords = String(area.val());

        function compare(generated, written){
            var diff = []
            for (i in generated){
                // console.log(generated[i])

                switch (generated[i] == written[i]) {
                    case true:
                        break;
                    case false:
                        diff.push([i,generated[i]])
                }
            }
            return diff;
        }
        let err = compare(wanakana.toRomaji(words), wanakana.toRomaji(areaWords))
        if(err.length == 0) {
            console.log("No errors")
        }
        else {
            console.log("errors:" + err)
        }
        for (i in err){
            for(x in err[i]){
                if (err[i][1] == err[i-1][1]){
                    console.log("s")
                }
            }

        }
    });
});
