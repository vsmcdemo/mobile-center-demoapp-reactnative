import { PixelRatio } from 'react-native';

//Set different sizes of fonts depending on phone screen resolution

export default class FontSizes{
    static get FONT_TODAY_LOWER_LABELS(){
        if(PixelRatio.get() <=2){
            return 23;
        }
        return 32;
    }
    static get FONT_TODAY_STEPS_LABEL(){
        if(PixelRatio.get() <= 2){
            return 80;
        }
        return 100;
    }
    
}