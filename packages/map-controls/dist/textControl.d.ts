interface TextSave {
    text: string;
    style: string;
    latLng: any;
    _leaflet_id: string;
}
export declare const texts: TextSave[];
export declare const textControl: any;
export declare function loadText(_texts: TextSave[]): void;
export {};
