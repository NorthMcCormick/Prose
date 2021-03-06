import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from './file-item';
import * as _ from 'lodash';


/**
 * Generated class for the NgDropFilesDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[ng-drop-files]' // Attribute selector
})
export class NgDropFilesDirective {
  
  private element: ElementRef;
  
  @Input() public files:Array<FileItem> = [];
  @Output() public fileOver:EventEmitter<any> = new EventEmitter();
  @Output() public onFileDrop:EventEmitter<FileItem[]> = new EventEmitter<FileItem[]>();

  constructor(element: ElementRef) {
    console.log('Hello NgDropFilesDirective Directive');
    this.element = element;
  }

  @HostListener('drop', ['$event'])
  public onDrop(event:any):void {
    let transfer = this._getTransfer(event);
    if (!transfer) return;

    this._preventAndStop(event);
    this._addFiles(transfer.files);
    this.fileOver.emit(false);
    this.onFileDrop.emit(this.files);
  }  

  @HostListener('draenter', ['$event'])
  public onDragEnter(event:any):void {
    this._preventAndStop(event);
    this.fileOver.emit(true);
  }

  @HostListener('dragover', ['$event'])
  public onDragOver(event:any):void {
    let transfer = this._getTransfer(event);

    transfer.dropEffect = 'copy';
    this._preventAndStop(event);
    this.fileOver.emit(true);
  }


  @HostListener('dragleave', ['$event'])
  public onDragLeave(event:any):any {
    this._preventAndStop(event);
    this.fileOver.emit(false);
  }



  private _getTransfer(event:any):any {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _preventAndStop(event:any):any {
    event.preventDefault();
    event.stopPropagation();
  }

  private _addFiles(files: FileList):void {
    _.each(files, (file) => { if (this._fileCanBeAdded(file)) this.files.push(new FileItem(file)) });
  }

  private _fileCanBeAdded(file:File):boolean {
    return (!this._fileIsAlreadyDropped(file) && this._fileTypeIsPO(file.name));
  }

  private _fileIsAlreadyDropped(file:File):boolean {
    return _.filter(this.files, _.iteratee(['name', file.name])).length > 0;
  }

  private _fileTypeIsImage(fileType:string):boolean {
    console.log('FIle type:', fileType);
    return (fileType == ''? false: fileType.startsWith('image'));
  }

  private _fileTypeIsPO(name: string) {
    if(name.indexOf('.po') > -1) {
      return true;
    }

    return false;
  }
}
