import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})

export class CustomTranslateService{
    constructor(private translate:TranslateService){

        
    }

    setLanguage(language:string)
    {
        console.log(language);
        this.translate.setDefaultLang(language);
        this.translate.use(language);
    }
    getKey(key :string):string{
        let translatedstring:string='';
        this.translate
        this.translate.get(key).subscribe(
            value=>{
                console.log('getkey');
                console.log(value);
                translatedstring=value;
                return translatedstring;
            }
        );
        return translatedstring;
    }

}