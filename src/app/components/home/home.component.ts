import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  public errorMsg: string;
  public tableHeadArray: Array<string>;
  public tableBodyArray: Array<object>;

  constructor() {}

  ngOnInit() {}

  public onSelectFile(event) {
    if (window.FileReader) {
      const fileList: FileList = event.target.files;
      if (fileList && fileList.length === 1) {
        this.errorMsg = null;
        if (fileList[0].name.split(".")[1] === "csv") {
          this.errorMsg = null;
          this.readFile(fileList);
        } else {
          this.errorMsg = "Filetype not supported";
        }
      } else {
        this.errorMsg = "Multiple file selection not supported";
      }
    } else {
      this.errorMsg = "FileReader are not supported in this browser";
    }
  }

  public readFile(fileList: FileList) {
    const file = fileList[0];
    let fileReader: FileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = this.loadHandler.bind(this);
  }

  public loadHandler(event) {
    if (event.target.result) {
      let contents = event.target.result;

      // spliting the result by new line
      let contArrayLines = contents.split(/\r\n|\n/);

      // removing empty line
      contArrayLines = contArrayLines.filter((m) => { return m != ""});

      // assuming first line(first array) as table header 
      this.tableHeadArray = [];
      this.tableHeadArray = this.trimArrayString(contArrayLines[0].split(','));
      
      this.tableBodyArray = [];
      for (let i = 1; i < contArrayLines.length; i++){
        const obj = {};

        const currentline = contArrayLines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

        for (let j = 0; j < this.tableHeadArray.length; j++){
          obj[this.tableHeadArray[j]] = currentline[j].replace(/['"]+/g, '');
        }
        this.tableBodyArray.push(obj);
      }
    }
  }

  public trimArrayString(arr: Array<string>): Array<string> {
    const tempArray = [];
    arr.forEach((el) => {
      tempArray.push(el.replace(/['"]+/g, ''));
    });
    return tempArray;
  }
}
