$(document).ready(function() {
    var wordlist = [];
    var wordlist2 = [];
    //init word lists
    var romaji = {'あ': ['a', 'b'], 'う': ['i'], 'ん': ['n'], 'す': ['su']}; // the list of kana -> romaji translations. used both ways


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
    });
    // get the dictionaries of common words

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
            errBox.html("Error: None of the checkboxes were checked.")
            return;
        }
        else {
            errBox.html("");
        }

        var wlength; // the length of both word lists, made it like that because can't be bothered to do an realistic approach to the percentages of katakana it should spew out (~2800 to ~130)

        var kana = 0; //init kana - hiragana is 1, katakana is 2, both is 3
        if (hira == true) kana = kana + 1;
        if (kata == true) kana = kana + 2;

        var area = $('#genWordsArea');
        area.val(""); // clear textarea for next use

        for (var i = 0; i < n; i++) {
            if (kana == 3) wlength = wordlist.length + wordlist2.length; // choices opeople, choices
            else if (kana == 2) wlength = wordlist2.length;//               literally cant think of what
            else if (kana == 1) wlength = wordlist.length;//                i could do except this (please help)
            var r = Math.floor(Math.random() * (wlength));// leftover randomization from previous guy, didnt touch 
            if (kana == 3) { 
                if(r > wordlist.length) {
                    area.val(area.val() + wordlist2[(r - wordlist.length)] + " ");// if the number spills over to the list of katakana, spew it out, else hiragana
                }
                else if (r < wordlist.length){ 
                    area.val(area.val() + wordlist[r] + " ");
                }
            } else if (kana == 2) {
                area.val(area.val() + wordlist2[r] + " ");// katakana only gen
            } else if (kana == 1) {
                area.val(area.val() + wordlist[r] + " ");// hiragana only gen
            }
        }
        //this code is so shit
        //to do, random() of kana: hiragana ~ 70%, katakana ~ 10%, so random out of 80, and if it's less than ten get random of katakana, else random of hiragana
    });

    $('#romajiCheckBtn').click(function(){
        var wordLength = $('#genWordsArea').val().length;
        var words = $('#genWordsArea').val().replace(/\s/g,'');
        var area = $('#romajiCheck');
        var test = `b`

        area.val(``)
        // if (romaji['あ'].length !== 1) {
        //     area.val(romaji[`う`][1])
        // }
        // else {
        //     area.val(romaji[`う`][0])
        // }
        for (i in romaji){
            var aeiou = `su`
            for (n in romaji[i]){
                console.log(romaji[i][n])
                if (romaji[i][n] == aeiou) {
                    area.val(aeiou)
                }
            }
        }
        
        // area.val(romaji['あ'])
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
