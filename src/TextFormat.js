export function abbreviateNumber({difference}) {
    var differenceNormalized = difference;
    if (difference >= 1000000000) {
        var suffixes = ["", "K", "M", "B","T"];
        var suffixNum = Math.floor( (""+difference).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (difference / Math.pow(1000,suffixNum) ) : difference).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
        differenceNormalized = shortValue+suffixes[suffixNum];
    }
    return get_beatiful(String(differenceNormalized));
}

export const get_beatiful=(revenue)=>{
    var revenu_readable=String(revenue).split("").reverse();
    var final="";
     for(let i=0;i<revenu_readable.length;i++){
          if(i%3==0)
              final=final+" "+String(revenu_readable[i]);
            else
              final=final+String(revenu_readable[i]);  

     }
     return final.split("").reverse().join("");
}

export function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    if(rhours == 0) {
        return rminutes + "min";
    } 
    return rhours + "h " + rminutes + "min";
}
