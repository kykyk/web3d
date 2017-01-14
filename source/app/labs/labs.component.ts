import {Component, OnInit} from '@angular/core';

import {LabsService} from './labs.service';

@Component({
    selector: 'labs',
    templateUrl: 'app/labs/labs.html',
    providers: [LabsService],
})
export class LabsComponent implements OnInit {
    constructor(private labsService: LabsService) {
    }

    ngOnInit() {
        this.labsService.getLabs().subscribe(
            p => console.log(p),
            error => console.error('Error: ' + error),
            () => console.log('Completed!')
        );
    }

    text: string = 'test';

    getJson() {

        return 'HEAD';
        // let reader = new FileReader();
        // reader.onload = (e) => {
        //     this.text = reader.result;
        // };
        //
        // reader.readAsText();
        // $.getJSON("labs.json", function(result) {
        //     console.log(result);
        //     this.text = result;
        //     // $.each(result, function(i, field){
        //     //     $("div").append(field + " ");
        //     // });
        // });

        // if (window.File && window.FileReader && window.FileList && window.Blob) {
        //     return 'Great success! All the File APIs are supported.';
        // } else {
        //     return 'The File APIs are not fully supported in this browser.';
        // }
    }
}
