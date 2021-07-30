$(document).ready(function() {
    var wordlist = [];
    var wordlist2 = [];
    //init word lists
    var romaji = {'あ': ['a', 'b'], 'う': ['i'], 'ん': ['n'], 'す': ['su'], 'ぎゃ':['gya']}; // the list of kana -> romaji translations. used both ways


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
        else {
            errBox.html("");
        }

        var kana = 0; //init kana - hiragana is 1, katakana is 2, both is 3
        if (hira == true) kana = kana + 1;
        if (kata == true) kana = kana + 2;

        var area = $('#genWordsArea');
        area.val(""); // clear textarea for next use

        for (var i = 0; i < n; i++) {
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
        var wordLength = $('#genWordsArea').val().length;
        var words = $('#genWordsArea').val().replace(/\s/g,'');
        var area = $('#romajiCheck');
        var test = `b`

        area.val(``)
        // if (romaji['あ'].length !== 1) {
        //     area.val(romaji[`う`][1])
        // }                                                                                            TESTING CODE, DO NOT TOUCH
        // else {
        //     area.val(romaji[`う`][0])
        // }

        // for (i in romaji){
        //     var aeiou = `su`
        //     for (n in romaji[i]){
        //         console.log(romaji[i][n])
        //         if (romaji[i][n] == aeiou) {
        //             area.val(aeiou)
        //         }
        //     }
        // }
        for (e in words) {
            b = parseInt(e-1)
            if (words[b+1] == 'あ'){
                console.log(words[b])
                console.log(words[b+1])
                console.log('a')
                console.log(b)
            }//testing code for recognition of characters, that are like gyo(ぎょ), gya(ぎゃ) etc., so that if combined kana is in the words, it can be skipped
            
        }
        
        // area.val(romaji['あ'])                                                                       TESTING CODE, DO NOT TOUCH
        // for (var letter in words){
        //     console.log(words[letter])
        // }
        // for(word in words){
        //     for (rword in romaji){
        //         // console.log(rword)
        //         if (rword == words[word]){
        //             area.val(area.val() + 'A! ' + rword + ' is ' + romaji[rword] + '\n')
        //         }
                // else {
                //     area.val(area.val() + words[word] + ' IS NOT ' + rword + '\n')
                // }
        //     }
        // }
    });
});
