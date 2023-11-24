import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrCustomService } from 'src/app/services/toastr-custom.service';
import { DatePipe } from '@angular/common';
import { CrimeService } from 'src/app/services/crime.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignalrService } from 'src/app/services/signalr.service';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';

@Component({
  selector: 'app-crime',
  templateUrl: './crime.page.html',
  styleUrls: ['./crime.page.scss'],
})
export class CrimePage implements OnInit {

  //for input type file
  // @ViewChild('inputFile', { static: true }) inputFileVar: ElementRef;
  files: File[] = [];
  currentPage: number = 1;
  resultPerPage: number = 10;
  crimeCompliantList: any[];

  crimeForm: FormGroup = new FormGroup({
    crimeCompliantId: new FormControl('', [Validators.required]),

    description: new FormControl('', [Validators.required]),

    isCrimeImageVideo: new FormControl(false, [Validators.required]),
  });

  constructor(
    private toastrCustomService: ToastrCustomService,
    private crimeService: CrimeService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe,
    private signalRService: SignalrService
  ) {}

  ngOnInit() {
    this.initialCrime();
    this.notification();
  }

  notification(): void {
    this.signalRService.message$.subscribe((message) => {
      let options: ScheduleOptions = {
        notifications: [
          {
            id: 111,
            title: 'reminder Notification',
            body: message,
            largeBody: message,
            summaryText: 'Exciting offers !!!',
          },
        ],
      };

      try {
        LocalNotifications.schedule(options);
      } catch (ex) {}
    });
  }

  initialCrime(
    currentPageVal: number = 1,
    resultPerPageVal: number = 14
  ): void {
    this.spinner.show();

    this.crimeService
      .crimeCompliantList(
        '',
        currentPageVal == 0 ? this.currentPage : currentPageVal,
        resultPerPageVal == 0 ? this.resultPerPage : resultPerPageVal
      )
      .subscribe(
        (res) => {
          let result: any = res;
          // console.log("result: ", result)
          this.crimeCompliantList = result;
          this.spinner.hide();
        },
        (error) => {
          this.spinner.hide();
          Swal.fire({
            title: 'Error',
            text: error,
            icon: 'warning',
            customClass: 'smaller-swal', // Apply the custom class here
            showCancelButton: true,
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            heightAuto: false,
          }).then((result) => {
            if (result.isConfirmed) {
              // Handle the OK button click
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              // Handle the Cancel button click
            }
          });
        }
      );
  }

  onSelectMultipleFile(event: any) {
    if (event.addedFiles.length < 6) {
      switch (event.addedFiles[0].type) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/jpg':
        case 'video/mp4':
        case 'video/3g2':
        case 'video/3gp':
        case 'video/asf':
        case 'video/avi':
        case 'video/f4v':
        case 'video/flv':
        case 'video/m2t':
        case 'video/m2ts':
        case 'video/m2v':
        case 'video/m4v':
        case 'video/mjpeg':
        case 'video/mts':
        case 'video/mxf':
        case 'video/ogv':
        case 'video/rm':
        case 'video/swf':
        case 'video/ts':
        case 'video/vob':
        case 'video/webm':
        case 'video/wmv':
        case 'video/wtv':
        case 'audio/aac':
        case 'audio/ac3':
        case 'audio/aif':
        case 'audio/aifc':
        case 'audio/aiff':
        case 'audio/au':
        case 'audio/caf':
        case 'audio/dts':
        case 'audio/flac':
        case 'audio/gsm':
        case 'audio/m4a':
        case 'audio/m4b':
        case 'audio/m4r':
        case 'audio/mmf':
        case 'audio/mp2':
        case 'audio/mp3':
        case 'audio/mpa':
        case 'audio/oga':
        case 'audio/ogg':
        case 'audio/opus':
        case 'audio/ra':
        case 'audio/snd':
        case 'audio/voc':
        case 'audio/wav':
        case 'audio/wma':
          this.files.push(...event.addedFiles);
          if (this.files.length <= 5) {
            let crimeFormValue = {
              isCrimeImageVideo: true,
            };

            this.crimeForm.patchValue(crimeFormValue);
          } else {
            this.files.splice(5 - this.files.length);
            let crimeFormValue = {
              isCrimeImageVideo: false,
            };

            this.crimeForm.patchValue(crimeFormValue);
            this.toastrCustomService.showError(
              'more then 5 images and videos selected'
            );
          }
          break;
        default:
          this.toastrCustomService.showError(
            'Please upload images, videos, and audios only.'
          );
          break;
      }
    } else {
      let crimeFormValue = {
        isCrimeImageVideo: false,
      };

      this.crimeForm.patchValue(crimeFormValue);
      this.toastrCustomService.showError(
        'more then 5 images and videos selected'
      );
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onCreateCrime(): void {

    let fileParams: any = {

      Files: this.files

    };

    if(this.crimeForm.valid) {

        this.spinner.show();
        //Create asset
        this.crimeService.createCaseReport(fileParams, this.crimeForm.getRawValue()).subscribe(res => {


          this.resetFields();
          this.toastrCustomService.showSuccess('Your report is successully created! please proceed in location to pin the location of your report.');
          this.spinner.hide();

        }, error => {

          console.log("error: ", error);
          this.spinner.hide();
          this.toastrCustomService.showError('Something went wrong');

        });

    } else {

      this.spinner.hide();
      Swal.fire({
        title: 'Error',
        text: 'check all validations',
        icon: 'warning',
        customClass: 'smaller-swal', // Apply the custom class here
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        heightAuto: false,
      }).then((result) => {
        if (result.isConfirmed) {
          // Handle the OK button click
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Handle the Cancel button click
        }
      });

    }

  }

  resetFields() {

    //for input type file
    // this.inputFileVar.nativeElement.value = "";
    this.crimeForm.setValue(
      {
        crimeCompliantId: '', description: '', isCrimeImageVideo: false
      }
    );
    this.files = null;
  }

  get isCrimeImageVideo() {
    return this.crimeForm.get('isCrimeImageVideo');
  }

}
