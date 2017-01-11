import { Component } from '@angular/core';

@Component({
    selector: 'labs',
    templateUrl: 'app/labs/labs.html'
})
export class LabsComponent {
    text: string;

    getJson() {
        // let reader = new FileReader();
        // reader.onload = (e) => {
        //     this.text = reader.result;
        // };
        //
        // reader.readAsText();
        $.getJSON("labs.json", function(result) {
            console.log(result);
            this.text = result;
            // $.each(result, function(i, field){
            //     $("div").append(field + " ");
            // });
        });

        if (window.File && window.FileReader && window.FileList && window.Blob) {
            return 'Great success! All the File APIs are supported.';
        } else {
            return 'The File APIs are not fully supported in this browser.';
        }
    }
}
